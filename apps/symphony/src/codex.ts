import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { createInterface } from "node:readline";
import { SymphonyError, errorMessage } from "./errors.js";
import { LinearClient } from "./linear.js";
import { renderPrompt } from "./workflow.js";
import { ensureInsideRoot } from "./workspace.js";
import type { AgentEvent, AgentRunner, Issue, JsonObject, Logger, ServiceConfig, TrackerClient } from "./types.js";

type PendingRequest = {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  timeout: NodeJS.Timeout;
};

export class CodexAppServerClient {
  private child: ChildProcessWithoutNullStreams | null = null;
  private nextId = 1;
  private pending = new Map<string | number, PendingRequest>();
  private notificationHandlers = new Set<(message: any) => void>();

  constructor(
    private readonly config: ServiceConfig,
    private readonly cwd: string,
    private readonly logger: Logger,
    private readonly linearClient?: LinearClient
  ) {}

  start(): void {
    ensureInsideRoot(this.config.workspace.root, this.cwd);
    this.child = spawn("bash", ["-lc", this.config.codex.command], {
      cwd: this.cwd,
      stdio: ["pipe", "pipe", "pipe"]
    });
    this.child.stderr.on("data", (chunk) => {
      this.logger.debug("codex stderr", { message: String(chunk).slice(0, 4000) });
    });
    this.child.on("exit", (code, signal) => {
      for (const pending of this.pending.values()) {
        clearTimeout(pending.timeout);
        pending.reject(new SymphonyError("port_exit", `codex app-server exited code=${code} signal=${signal}`));
      }
      this.pending.clear();
    });

    const rl = createInterface({ input: this.child.stdout });
    rl.on("line", (line) => this.handleLine(line));
  }

  async initialize(): Promise<void> {
    await this.request("initialize", {
      clientInfo: { name: "symphony", title: "Symphony", version: "0.1.0" },
      capabilities: { experimentalApi: true }
    });
  }

  async startThread(issue: Issue): Promise<string> {
    const params: JsonObject = {
      cwd: this.cwd,
      serviceName: "symphony",
      ephemeral: false,
      baseInstructions: `You are running inside Symphony for ${issue.identifier}: ${issue.title}. Work only inside ${this.cwd}.`,
      approvalPolicy: this.config.codex.approvalPolicy,
      sandbox: this.config.codex.threadSandbox
    };
    const response = await this.request("thread/start", omitNullish(params));
    const threadId = response?.thread?.id;
    if (typeof threadId !== "string") {
      throw new SymphonyError("response_error", "thread/start response did not include thread.id");
    }
    return threadId;
  }

  async runTurn(threadId: string, prompt: string, onNotification: (message: any) => void): Promise<string> {
    let turnId: string | null = null;
    const completion = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new SymphonyError("turn_timeout", "Codex turn timed out"));
      }, this.config.codex.turnTimeoutMs);
      const handler = (message: any) => {
        onNotification(message);
        if (message.method === "turn/started" && message.params?.turn?.id) {
          turnId = message.params.turn.id;
        }
        if (message.method === "turn/completed") {
          cleanup();
          resolve();
        }
        if (message.method === "turn/failed" || message.method === "turn/cancelled" || message.method === "error") {
          cleanup();
          reject(new SymphonyError("turn_failed", `${message.method}: ${JSON.stringify(message.params ?? {})}`));
        }
      };
      const cleanup = () => {
        clearTimeout(timeout);
        this.notificationHandlers.delete(handler);
      };
      this.notificationHandlers.add(handler);
    });

    const response = await this.request("turn/start", omitNullish({
      threadId,
      cwd: this.cwd,
      input: [{ type: "text", text: prompt }],
      approvalPolicy: this.config.codex.approvalPolicy,
      sandboxPolicy: this.config.codex.turnSandboxPolicy
    }));
    turnId = response?.turn?.id ?? turnId;
    await completion;
    if (!turnId) throw new SymphonyError("response_error", "turn/start did not expose turn.id");
    return turnId;
  }

  stop(): void {
    if (!this.child) return;
    this.child.kill("SIGTERM");
    this.child = null;
  }

  private async request(method: string, params: JsonObject): Promise<any> {
    if (!this.child) throw new SymphonyError("codex_not_found", "Codex app-server was not started");
    const id = this.nextId++;
    const payload = { id, method, params };
    const promise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new SymphonyError("response_timeout", `${method} response timed out`));
      }, this.config.codex.readTimeoutMs);
      this.pending.set(id, { resolve, reject, timeout });
    });
    this.child.stdin.write(`${JSON.stringify(payload)}\n`);
    return promise;
  }

  private handleLine(line: string): void {
    let message: any;
    try {
      message = JSON.parse(line);
    } catch {
      this.logger.warn("codex emitted malformed json", { line: line.slice(0, 4000) });
      return;
    }

    if ("id" in message && ("result" in message || "error" in message)) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      clearTimeout(pending.timeout);
      this.pending.delete(message.id);
      if (message.error) pending.reject(new SymphonyError("response_error", JSON.stringify(message.error)));
      else pending.resolve(message.result);
      return;
    }

    if ("id" in message && typeof message.method === "string") {
      void this.respondToServerRequest(message);
      return;
    }

    for (const handler of this.notificationHandlers) {
      handler(message);
    }
  }

  private async respondToServerRequest(message: any): Promise<void> {
    let result: JsonObject;
    try {
      result = await this.resolveServerRequest(message.method, message.params);
    } catch (error) {
      result = { contentItems: [{ type: "inputText", text: errorMessage(error) }], success: false };
    }
    this.child?.stdin.write(`${JSON.stringify({ id: message.id, result })}\n`);
  }

  private async resolveServerRequest(method: string, params: any): Promise<JsonObject> {
    switch (method) {
      case "item/commandExecution/requestApproval":
        return { decision: "acceptForSession" };
      case "item/fileChange/requestApproval":
        return { decision: "acceptForSession" };
      case "execCommandApproval":
        return { decision: "approved_for_session" };
      case "applyPatchApproval":
        return { decision: "approved_for_session" };
      case "item/tool/requestUserInput":
        throw new SymphonyError("turn_input_required", "Symphony high-trust policy fails user-input-required requests");
      case "mcpServer/elicitation/request":
        return { action: "cancel", content: null };
      case "item/tool/call":
        return this.dynamicToolCall(params);
      default:
        return { contentItems: [{ type: "inputText", text: `Unsupported client-side request: ${method}` }], success: false };
    }
  }

  private async dynamicToolCall(params: any): Promise<JsonObject> {
    const name = params?.name ?? params?.toolName;
    if (name !== "linear_graphql") {
      return { contentItems: [{ type: "inputText", text: `Unsupported tool: ${String(name)}` }], success: false };
    }
    if (!this.linearClient) {
      return { contentItems: [{ type: "inputText", text: "Linear client is unavailable" }], success: false };
    }

    const input = params?.input ?? params?.arguments ?? params?.args;
    const parsed = typeof input === "string" ? safeJsonOrQuery(input) : input;
    const query = typeof parsed === "string" ? parsed : parsed?.query;
    const variables = typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed.variables ?? {} : {};
    if (typeof query !== "string" || !query.trim()) {
      return { contentItems: [{ type: "inputText", text: "linear_graphql requires a non-empty query" }], success: false };
    }
    if ((query.match(/\b(query|mutation|subscription)\b/g) ?? []).length > 1) {
      return { contentItems: [{ type: "inputText", text: "linear_graphql accepts exactly one operation" }], success: false };
    }
    if (typeof variables !== "object" || variables === null || Array.isArray(variables)) {
      return { contentItems: [{ type: "inputText", text: "linear_graphql variables must be an object" }], success: false };
    }

    try {
      const response = await this.linearClient.rawGraphql(query, variables as JsonObject);
      return { contentItems: [{ type: "inputText", text: JSON.stringify(response) }], success: true };
    } catch (error) {
      return { contentItems: [{ type: "inputText", text: errorMessage(error) }], success: false };
    }
  }
}

export class CodexAgentRunner implements AgentRunner {
  constructor(
    private readonly getConfig: () => ServiceConfig,
    private readonly tracker: TrackerClient,
    private readonly workspacePath: string,
    private readonly workflowTemplate: () => string,
    private readonly logger: Logger,
    private readonly linearClient?: LinearClient
  ) {}

  async run(input: {
    issue: Issue;
    attempt: number | null;
    signal: AbortSignal;
    onEvent: (event: AgentEvent) => void;
  }): Promise<void> {
    const config = this.getConfig();
    ensureInsideRoot(config.workspace.root, this.workspacePath);
    const client = new CodexAppServerClient(config, this.workspacePath, this.logger, this.linearClient);
    let threadId: string | null = null;
    let turnId: string | null = null;
    let issue = input.issue;

    input.signal.addEventListener("abort", () => client.stop(), { once: true });
    try {
      client.start();
      await client.initialize();
      threadId = await client.startThread(issue);

      for (let turnNumber = 1; turnNumber <= config.agent.maxTurns; turnNumber += 1) {
        const prompt =
          turnNumber === 1
            ? await renderPrompt(this.workflowTemplate(), issue, input.attempt)
            : `Continue working on ${issue.identifier}. Do not repeat the original task; continue from the existing thread context and move the issue toward its workflow handoff.`;

        turnId = await client.runTurn(threadId, prompt, (message) => {
          input.onEvent(toAgentEvent(message, clientPid(client), threadId, turnId));
        });
        input.onEvent({
          event: "turn_completed",
          timestamp: new Date().toISOString(),
          codex_app_server_pid: clientPid(client),
          thread_id: threadId,
          turn_id: turnId,
          session_id: `${threadId}-${turnId}`
        });

        const refreshed = await this.tracker.fetchIssueStatesByIds([issue.id]);
        issue = refreshed[0] ?? issue;
        if (!isActive(issue.state, config.tracker.activeStates)) break;
      }
    } finally {
      client.stop();
    }
  }
}

function toAgentEvent(message: any, pid: number | undefined, threadId: string | null, turnId: string | null): AgentEvent {
  const usage = extractUsage(message);
  return {
    event: String(message.method ?? "other_message"),
    timestamp: new Date().toISOString(),
    codex_app_server_pid: pid,
    thread_id: String(message.params?.threadId ?? threadId ?? ""),
    turn_id: String(message.params?.turn?.id ?? turnId ?? ""),
    session_id: threadId && turnId ? `${threadId}-${turnId}` : undefined,
    usage,
    rate_limits: message.method === "account/rateLimits/updated" ? message.params : undefined,
    message: summarizeMessage(message),
    payload: message.params
  };
}

function extractUsage(message: any): AgentEvent["usage"] {
  const candidates = [message.params?.usage, message.params?.tokenUsage, message.params?.totalTokenUsage, message.params?.total_token_usage];
  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    const input = numberAt(candidate, ["input_tokens", "inputTokens", "input"]);
    const output = numberAt(candidate, ["output_tokens", "outputTokens", "output"]);
    const total = numberAt(candidate, ["total_tokens", "totalTokens", "total"]);
    if (input !== undefined || output !== undefined || total !== undefined) {
      return { input_tokens: input, output_tokens: output, total_tokens: total };
    }
  }
  return undefined;
}

function numberAt(object: any, keys: string[]): number | undefined {
  for (const key of keys) {
    if (typeof object[key] === "number") return object[key];
  }
  return undefined;
}

function summarizeMessage(message: any): string {
  if (typeof message.params?.message === "string") return message.params.message.slice(0, 500);
  if (typeof message.params?.text === "string") return message.params.text.slice(0, 500);
  return String(message.method ?? "message");
}

function safeJsonOrQuery(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function omitNullish(input: JsonObject): JsonObject {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== null && value !== undefined));
}

function isActive(state: string, activeStates: string[]): boolean {
  return activeStates.map((item) => item.toLowerCase()).includes(state.toLowerCase());
}

function clientPid(client: CodexAppServerClient): number | undefined {
  return (client as unknown as { child?: { pid?: number } }).child?.pid;
}
