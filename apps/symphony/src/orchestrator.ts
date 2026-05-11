import { EventEmitter } from "node:events";
import { errorMessage, SymphonyError } from "./errors.js";
import { LinearClient } from "./linear.js";
import { validateDispatchConfig, hasWorkflowChanged, loadConfigBundle } from "./workflow.js";
import { WorkspaceManager } from "./workspace.js";
import type { AgentEvent, AgentRunner, ConfigBundle, Issue, Logger, ServiceConfig, TrackerClient } from "./types.js";

type RunningEntry = {
  issue: Issue;
  identifier: string;
  startedAt: number;
  abortController: AbortController;
  worker: Promise<void>;
  retryAttempt: number | null;
  sessionId: string | null;
  codexAppServerPid: number | null;
  lastCodexEvent: string | null;
  lastCodexTimestamp: number | null;
  lastCodexMessage: string | null;
  codexInputTokens: number;
  codexOutputTokens: number;
  codexTotalTokens: number;
  lastReportedInputTokens: number;
  lastReportedOutputTokens: number;
  lastReportedTotalTokens: number;
  turnCount: number;
};

type RetryEntry = {
  issueId: string;
  identifier: string;
  attempt: number;
  dueAtMs: number;
  timerHandle: NodeJS.Timeout;
  error: string | null;
};

export type OrchestratorState = {
  pollIntervalMs: number;
  maxConcurrentAgents: number;
  running: Map<string, RunningEntry>;
  claimed: Set<string>;
  retryAttempts: Map<string, RetryEntry>;
  completed: Set<string>;
  codexTotals: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    seconds_running: number;
  };
  codexRateLimits: unknown;
};

type AgentRunnerFactory = (issue: Issue, workspacePath: string) => AgentRunner;

export class Orchestrator extends EventEmitter {
  readonly state: OrchestratorState;
  private timer: NodeJS.Timeout | null = null;
  private tickActive = false;
  private stopped = false;
  private tracker: TrackerClient;
  private workspaceManager: WorkspaceManager;
  private bundle: ConfigBundle;

  constructor(
    initialBundle: ConfigBundle,
    private readonly workflowPath: string | undefined,
    private readonly logger: Logger,
    private readonly createRunner: AgentRunnerFactory
  ) {
    super();
    this.bundle = initialBundle;
    this.tracker = new LinearClient(() => this.config);
    this.workspaceManager = new WorkspaceManager(() => this.config, this.logger);
    this.state = {
      pollIntervalMs: initialBundle.config.polling.intervalMs,
      maxConcurrentAgents: initialBundle.config.agent.maxConcurrentAgents,
      running: new Map(),
      claimed: new Set(),
      retryAttempts: new Map(),
      completed: new Set(),
      codexTotals: { input_tokens: 0, output_tokens: 0, total_tokens: 0, seconds_running: 0 },
      codexRateLimits: null
    };
  }

  get config(): ServiceConfig {
    return this.bundle.config;
  }

  get promptTemplate(): string {
    return this.bundle.workflow.prompt_template;
  }

  async start(): Promise<void> {
    validateDispatchConfig(this.config);
    await this.startupTerminalWorkspaceCleanup();
    this.scheduleTick(0);
  }

  async stop(): Promise<void> {
    this.stopped = true;
    if (this.timer) clearTimeout(this.timer);
    for (const [issueId, running] of this.state.running) {
      this.terminateRunningIssue(issueId, false, "service stopping");
      running.abortController.abort();
    }
    await Promise.allSettled([...this.state.running.values()].map((entry) => entry.worker));
  }

  async tickNow(): Promise<void> {
    await this.onTick();
  }

  snapshot() {
    const now = Date.now();
    const running = [...this.state.running.values()].map((entry) => ({
      issue_id: entry.issue.id,
      issue_identifier: entry.identifier,
      state: entry.issue.state,
      session_id: entry.sessionId,
      turn_count: entry.turnCount,
      last_event: entry.lastCodexEvent,
      last_message: entry.lastCodexMessage,
      started_at: new Date(entry.startedAt).toISOString(),
      last_event_at: entry.lastCodexTimestamp ? new Date(entry.lastCodexTimestamp).toISOString() : null,
      tokens: {
        input_tokens: entry.codexInputTokens,
        output_tokens: entry.codexOutputTokens,
        total_tokens: entry.codexTotalTokens
      }
    }));
    const retrying = [...this.state.retryAttempts.values()].map((entry) => ({
      issue_id: entry.issueId,
      issue_identifier: entry.identifier,
      attempt: entry.attempt,
      due_at: new Date(entry.dueAtMs).toISOString(),
      error: entry.error
    }));
    const activeSeconds = [...this.state.running.values()].reduce((sum, entry) => sum + (now - entry.startedAt) / 1000, 0);
    return {
      generated_at: new Date(now).toISOString(),
      counts: { running: running.length, retrying: retrying.length },
      running,
      retrying,
      codex_totals: {
        ...this.state.codexTotals,
        seconds_running: this.state.codexTotals.seconds_running + activeSeconds
      },
      rate_limits: this.state.codexRateLimits
    };
  }

  private scheduleTick(delayMs: number): void {
    if (this.stopped) return;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.onTick(), delayMs);
  }

  private async reloadIfChanged(): Promise<void> {
    if (!(await hasWorkflowChanged(this.bundle))) return;
    try {
      const reloaded = await loadConfigBundle(this.workflowPath);
      validateDispatchConfig(reloaded.config);
      this.bundle = reloaded;
      this.state.pollIntervalMs = reloaded.config.polling.intervalMs;
      this.state.maxConcurrentAgents = reloaded.config.agent.maxConcurrentAgents;
      this.logger.info("workflow reload completed", { workflow_path: reloaded.workflow.path });
    } catch (error) {
      this.logger.error("workflow reload failed; keeping last known good config", { error: errorMessage(error) });
    }
  }

  private async onTick(): Promise<void> {
    if (this.tickActive || this.stopped) return;
    this.tickActive = true;
    try {
      await this.reloadIfChanged();
      await this.reconcileRunningIssues();
      try {
        validateDispatchConfig(this.config);
      } catch (error) {
        this.logger.error("dispatch validation failed", { error: errorMessage(error) });
        return;
      }

      let issues: Issue[];
      try {
        issues = await this.tracker.fetchCandidateIssues();
      } catch (error) {
        this.logger.error("candidate issue fetch failed", { error: errorMessage(error) });
        return;
      }

      for (const issue of sortForDispatch(issues)) {
        if (this.availableSlots() <= 0) break;
        if (this.shouldDispatch(issue)) {
          await this.dispatchIssue(issue, null);
        }
      }
      this.emit("change", this.snapshot());
    } finally {
      this.tickActive = false;
      this.scheduleTick(this.state.pollIntervalMs);
    }
  }

  private async reconcileRunningIssues(): Promise<void> {
    const config = this.config;
    if (config.codex.stallTimeoutMs > 0) {
      for (const [issueId, entry] of this.state.running) {
        const reference = entry.lastCodexTimestamp ?? entry.startedAt;
        if (Date.now() - reference > config.codex.stallTimeoutMs) {
          this.logger.warn("running issue stalled", { issue_id: issueId, issue_identifier: entry.identifier });
          this.terminateRunningIssue(issueId, false, "stalled");
          this.scheduleRetry(issueId, this.nextAttempt(entry.retryAttempt), entry.identifier, "stalled");
        }
      }
    }

    const runningIds = [...this.state.running.keys()];
    if (runningIds.length === 0) return;

    let refreshed: Issue[];
    try {
      refreshed = await this.tracker.fetchIssueStatesByIds(runningIds);
    } catch (error) {
      this.logger.warn("running state refresh failed; keeping workers running", { error: errorMessage(error) });
      return;
    }

    const byId = new Map(refreshed.map((issue) => [issue.id, issue]));
    for (const [issueId, entry] of this.state.running) {
      const issue = byId.get(issueId);
      if (!issue) continue;
      if (isState(issue.state, config.tracker.terminalStates)) {
        this.terminateRunningIssue(issueId, true, "terminal tracker state");
      } else if (isState(issue.state, config.tracker.activeStates)) {
        entry.issue = issue;
      } else {
        this.terminateRunningIssue(issueId, false, "non-active tracker state");
      }
    }
  }

  private shouldDispatch(issue: Issue): boolean {
    if (!issue.id || !issue.identifier || !issue.title || !issue.state) return false;
    if (!isState(issue.state, this.config.tracker.activeStates)) return false;
    if (isState(issue.state, this.config.tracker.terminalStates)) return false;
    if (this.state.running.has(issue.id) || this.state.claimed.has(issue.id)) return false;
    if (this.availableSlots() <= 0) return false;
    if (this.availableStateSlots(issue.state) <= 0) return false;
    if (issue.state.toLowerCase() === "todo") {
      return issue.blocked_by.every((blocker) => blocker.state && isState(blocker.state, this.config.tracker.terminalStates));
    }
    return true;
  }

  private async dispatchIssue(issue: Issue, attempt: number | null): Promise<void> {
    this.state.claimed.add(issue.id);
    const abortController = new AbortController();
    let workspacePath = "";
    try {
      const workspace = await this.workspaceManager.createForIssue(issue.identifier);
      workspacePath = workspace.path;
      await this.workspaceManager.beforeRun(workspacePath);
    } catch (error) {
      this.logger.error("workspace preparation failed", { issue_id: issue.id, issue_identifier: issue.identifier, error: errorMessage(error) });
      this.scheduleRetry(issue.id, this.nextAttempt(attempt), issue.identifier, errorMessage(error));
      return;
    }

    const runner = this.createRunner(issue, workspacePath);
    const entry: RunningEntry = {
      issue,
      identifier: issue.identifier,
      startedAt: Date.now(),
      abortController,
      worker: Promise.resolve(),
      retryAttempt: attempt,
      sessionId: null,
      codexAppServerPid: null,
      lastCodexEvent: null,
      lastCodexTimestamp: null,
      lastCodexMessage: null,
      codexInputTokens: 0,
      codexOutputTokens: 0,
      codexTotalTokens: 0,
      lastReportedInputTokens: 0,
      lastReportedOutputTokens: 0,
      lastReportedTotalTokens: 0,
      turnCount: 0
    };
    this.state.running.set(issue.id, entry);
    this.state.retryAttempts.delete(issue.id);
    this.logger.info("issue dispatch started", { issue_id: issue.id, issue_identifier: issue.identifier, attempt });
    await this.noteDispatchStarted(issue, attempt);

    entry.worker = runner
      .run({
        issue,
        attempt,
        signal: abortController.signal,
        onEvent: (event) => this.onAgentEvent(issue.id, event)
      })
      .then(async () => {
        await this.workspaceManager.afterRun(workspacePath);
        this.onWorkerExit(issue.id, "normal");
      })
      .catch(async (error) => {
        await this.workspaceManager.afterRun(workspacePath);
        this.onWorkerExit(issue.id, "abnormal", errorMessage(error));
      });
  }

  private onAgentEvent(issueId: string, event: AgentEvent): void {
    const entry = this.state.running.get(issueId);
    if (!entry) return;
    entry.lastCodexEvent = event.event;
    entry.lastCodexTimestamp = Date.parse(event.timestamp);
    entry.lastCodexMessage = event.message ?? null;
    entry.codexAppServerPid = event.codex_app_server_pid ?? entry.codexAppServerPid;
    if (event.session_id) entry.sessionId = event.session_id;
    if (event.event === "turn/started" || event.event === "turn_started") entry.turnCount += 1;
    if (event.usage) {
      this.applyUsage(entry, event.usage);
    }
    if (event.rate_limits) this.state.codexRateLimits = event.rate_limits;
    this.logger.info("codex event received", {
      issue_id: issueId,
      issue_identifier: entry.identifier,
      session_id: entry.sessionId,
      event: event.event
    });
  }

  private applyUsage(entry: RunningEntry, usage: NonNullable<AgentEvent["usage"]>): void {
    const input = usage.input_tokens ?? entry.lastReportedInputTokens;
    const output = usage.output_tokens ?? entry.lastReportedOutputTokens;
    const total = usage.total_tokens ?? entry.lastReportedTotalTokens;
    const inputDelta = Math.max(input - entry.lastReportedInputTokens, 0);
    const outputDelta = Math.max(output - entry.lastReportedOutputTokens, 0);
    const totalDelta = Math.max(total - entry.lastReportedTotalTokens, 0);
    entry.lastReportedInputTokens = input;
    entry.lastReportedOutputTokens = output;
    entry.lastReportedTotalTokens = total;
    entry.codexInputTokens = input;
    entry.codexOutputTokens = output;
    entry.codexTotalTokens = total;
    this.state.codexTotals.input_tokens += inputDelta;
    this.state.codexTotals.output_tokens += outputDelta;
    this.state.codexTotals.total_tokens += totalDelta;
  }

  private onWorkerExit(issueId: string, reason: "normal" | "abnormal", error?: string): void {
    const entry = this.state.running.get(issueId);
    if (!entry) return;
    this.state.running.delete(issueId);
    this.state.codexTotals.seconds_running += (Date.now() - entry.startedAt) / 1000;
    if (reason === "normal") {
      this.state.completed.add(issueId);
      this.scheduleRetry(issueId, 1, entry.identifier, null, "continuation");
    } else {
      this.scheduleRetry(issueId, this.nextAttempt(entry.retryAttempt), entry.identifier, error ?? reason);
    }
    void this.noteWorkerExit(entry.issue, reason, error);
    this.logger.info("worker exited", { issue_id: issueId, issue_identifier: entry.identifier, reason, error });
  }

  private terminateRunningIssue(issueId: string, cleanupWorkspace: boolean, reason: string): void {
    const entry = this.state.running.get(issueId);
    if (!entry) return;
    entry.abortController.abort();
    this.state.running.delete(issueId);
    this.state.claimed.delete(issueId);
    this.state.codexTotals.seconds_running += (Date.now() - entry.startedAt) / 1000;
    if (cleanupWorkspace) {
      void this.workspaceManager.removeForIssue(entry.identifier);
    }
    void this.noteIssueComment(entry.issue.id, `Symphony stopped this run: ${reason}.`);
    this.logger.warn("running issue terminated", { issue_id: issueId, issue_identifier: entry.identifier, reason, cleanup_workspace: cleanupWorkspace });
  }

  private async noteDispatchStarted(issue: Issue, attempt: number | null): Promise<void> {
    try {
      if (issue.state.toLowerCase() === "todo") {
        await this.tracker.updateIssueState?.(issue.id, "In Progress");
      }
      await this.noteIssueComment(
        issue.id,
        `Symphony started a Codex run for ${issue.identifier}.${attempt === null ? "" : ` Retry attempt: ${attempt}.`}`
      );
    } catch (error) {
      this.logger.warn("linear dispatch update failed", { issue_id: issue.id, issue_identifier: issue.identifier, error: errorMessage(error) });
    }
  }

  private async noteWorkerExit(issue: Issue, reason: "normal" | "abnormal", error?: string): Promise<void> {
    const body =
      reason === "normal"
        ? "Symphony completed a Codex worker session. If the issue is still active, Symphony will re-check it for continuation."
        : `Symphony Codex worker session failed and will be retried. Error: ${error ?? "unknown"}`;
    await this.noteIssueComment(issue.id, body);
  }

  private async noteIssueComment(issueId: string, body: string): Promise<void> {
    try {
      await this.tracker.createIssueComment?.(issueId, body);
    } catch (error) {
      this.logger.warn("linear comment update failed", { issue_id: issueId, error: errorMessage(error) });
    }
  }

  private scheduleRetry(issueId: string, attempt: number, identifier: string, error: string | null, kind: "failure" | "continuation" = "failure"): void {
    const prior = this.state.retryAttempts.get(issueId);
    if (prior) clearTimeout(prior.timerHandle);
    const delay = kind === "continuation" ? 1000 : Math.min(10_000 * 2 ** (attempt - 1), this.config.agent.maxRetryBackoffMs);
    const dueAtMs = Date.now() + delay;
    const timerHandle = setTimeout(() => void this.onRetryTimer(issueId), delay);
    this.state.retryAttempts.set(issueId, { issueId, identifier, attempt, dueAtMs, timerHandle, error });
    this.state.claimed.add(issueId);
    this.logger.info("retry scheduled", { issue_id: issueId, issue_identifier: identifier, attempt, delay_ms: delay, error });
  }

  private async onRetryTimer(issueId: string): Promise<void> {
    const retry = this.state.retryAttempts.get(issueId);
    if (!retry) return;
    this.state.retryAttempts.delete(issueId);
    let candidates: Issue[];
    try {
      candidates = await this.tracker.fetchCandidateIssues();
    } catch (error) {
      this.scheduleRetry(issueId, retry.attempt + 1, retry.identifier, `retry poll failed: ${errorMessage(error)}`);
      return;
    }
    const issue = candidates.find((candidate) => candidate.id === issueId);
    if (!issue) {
      this.state.claimed.delete(issueId);
      return;
    }
    this.state.claimed.delete(issueId);
    if (!this.shouldDispatch(issue)) {
      if (this.availableSlots() <= 0) {
        this.scheduleRetry(issueId, retry.attempt + 1, issue.identifier, "no available orchestrator slots");
      }
      return;
    }
    await this.dispatchIssue(issue, retry.attempt);
  }

  private async startupTerminalWorkspaceCleanup(): Promise<void> {
    try {
      const terminalIssues = await this.tracker.fetchIssuesByStates(this.config.tracker.terminalStates);
      await Promise.all(terminalIssues.map((issue) => this.workspaceManager.removeForIssue(issue.identifier)));
    } catch (error) {
      this.logger.warn("startup terminal workspace cleanup failed", { error: errorMessage(error) });
    }
  }

  private availableSlots(): number {
    return Math.max(this.config.agent.maxConcurrentAgents - this.state.running.size, 0);
  }

  private availableStateSlots(state: string): number {
    const normalized = state.toLowerCase();
    const limit = this.config.agent.maxConcurrentAgentsByState.get(normalized) ?? this.config.agent.maxConcurrentAgents;
    const current = [...this.state.running.values()].filter((entry) => entry.issue.state.toLowerCase() === normalized).length;
    return Math.max(limit - current, 0);
  }

  private nextAttempt(attempt: number | null): number {
    return attempt === null ? 1 : attempt + 1;
  }
}

export async function createOrchestrator(workflowPath: string | undefined, logger: Logger): Promise<Orchestrator> {
  const bundle = await loadConfigBundle(workflowPath);
  let orchestrator: Orchestrator;
  const tracker = new LinearClient(() => orchestrator.config);
  orchestrator = new Orchestrator(bundle, workflowPath, logger, (issue, workspacePath) => {
    return {
      run: async (input) => {
        const { CodexAgentRunner } = await import("./codex.js");
        return new CodexAgentRunner(
          () => orchestrator.config,
          tracker,
          workspacePath,
          () => orchestrator.promptTemplate,
          logger,
          tracker
        ).run(input);
      }
    };
  });
  return orchestrator;
}

export function sortForDispatch(issues: Issue[]): Issue[] {
  return [...issues].sort((a, b) => {
    const priorityA = a.priority ?? Number.POSITIVE_INFINITY;
    const priorityB = b.priority ?? Number.POSITIVE_INFINITY;
    if (priorityA !== priorityB) return priorityA - priorityB;
    const createdA = a.created_at ? Date.parse(a.created_at) : Number.POSITIVE_INFINITY;
    const createdB = b.created_at ? Date.parse(b.created_at) : Number.POSITIVE_INFINITY;
    if (createdA !== createdB) return createdA - createdB;
    return a.identifier.localeCompare(b.identifier);
  });
}

function isState(state: string, states: string[]): boolean {
  return states.some((candidate) => candidate.toLowerCase() === state.toLowerCase());
}
