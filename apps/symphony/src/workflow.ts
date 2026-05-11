import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import yaml from "js-yaml";
import { Liquid } from "liquidjs";
import { SymphonyError } from "./errors.js";
import type { ConfigBundle, Issue, JsonObject, ServiceConfig, WorkflowDefinition } from "./types.js";

const DEFAULT_ACTIVE_STATES = ["Todo", "In Progress"];
const DEFAULT_TERMINAL_STATES = ["Closed", "Cancelled", "Canceled", "Duplicate", "Done"];
const DEFAULT_PROMPT = "You are working on an issue from Linear.";

export async function loadWorkflow(workflowPath?: string, cwd = process.cwd()): Promise<WorkflowDefinition> {
  const selectedPath = workflowPath ? path.resolve(cwd, workflowPath) : path.resolve(cwd, "WORKFLOW.md");
  let text: string;
  let stat: { mtimeMs: number };

  try {
    [text, stat] = await Promise.all([fs.readFile(selectedPath, "utf8"), fs.stat(selectedPath)]);
  } catch (error) {
    throw new SymphonyError("missing_workflow_file", `Unable to read workflow file at ${selectedPath}`, error);
  }

  try {
    const parsed = parseWorkflowText(text);
    return { path: selectedPath, mtimeMs: stat.mtimeMs, ...parsed };
  } catch (error) {
    if (error instanceof SymphonyError) throw error;
    throw new SymphonyError("workflow_parse_error", `Unable to parse workflow file at ${selectedPath}`, error);
  }
}

export function parseWorkflowText(text: string): Pick<WorkflowDefinition, "config" | "prompt_template"> {
  if (!text.startsWith("---")) {
    return { config: {}, prompt_template: text.trim() };
  }

  const lines = text.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) {
    throw new SymphonyError("workflow_parse_error", "YAML front matter was opened but not closed");
  }

  let config: unknown;
  try {
    config = yaml.load(lines.slice(1, end).join("\n")) ?? {};
  } catch (error) {
    throw new SymphonyError("workflow_parse_error", "Invalid YAML front matter", error);
  }

  if (!isPlainObject(config)) {
    throw new SymphonyError("workflow_front_matter_not_a_map", "Workflow front matter must decode to an object");
  }

  return {
    config: config as JsonObject,
    prompt_template: lines.slice(end + 1).join("\n").trim()
  };
}

export async function loadConfigBundle(workflowPath?: string, cwd = process.cwd()): Promise<ConfigBundle> {
  const workflow = await loadWorkflow(workflowPath, cwd);
  return { workflow, config: resolveServiceConfig(workflow) };
}

export function resolveServiceConfig(workflow: WorkflowDefinition, env = process.env): ServiceConfig {
  const workflowDir = path.dirname(workflow.path);
  const tracker = objectAt(workflow.config, "tracker");
  const polling = objectAt(workflow.config, "polling");
  const workspace = objectAt(workflow.config, "workspace");
  const hooks = objectAt(workflow.config, "hooks");
  const agent = objectAt(workflow.config, "agent");
  const codex = objectAt(workflow.config, "codex");
  const server = objectAt(workflow.config, "server");

  const kind = stringAt(tracker, "kind");
  const trackerKind = kind === "linear" ? "linear" : kind;
  const apiKeyRaw = stringAt(tracker, "api_key") ?? (kind === "linear" ? "$LINEAR_API_KEY" : null);
  const activeStates = stringArrayAt(tracker, "active_states") ?? DEFAULT_ACTIVE_STATES;
  const terminalStates = stringArrayAt(tracker, "terminal_states") ?? DEFAULT_TERMINAL_STATES;

  return {
    workflowPath: workflow.path,
    workflowDir,
    tracker: {
      kind: trackerKind as "linear",
      endpoint: stringAt(tracker, "endpoint") ?? "https://api.linear.app/graphql",
      apiKey: apiKeyRaw ? resolveDollarValue(apiKeyRaw, env) || null : null,
      projectSlug: stringAt(tracker, "project_slug"),
      teamKey: stringAt(tracker, "team_key"),
      teamId: stringAt(tracker, "team_id"),
      activeStates,
      terminalStates
    },
    polling: {
      intervalMs: positiveIntegerAt(polling, "interval_ms", 30_000)
    },
    workspace: {
      root: resolvePathValue(stringAt(workspace, "root") ?? path.join(os.tmpdir(), "symphony_workspaces"), workflowDir, env)
    },
    hooks: {
      afterCreate: stringAt(hooks, "after_create"),
      beforeRun: stringAt(hooks, "before_run"),
      afterRun: stringAt(hooks, "after_run"),
      beforeRemove: stringAt(hooks, "before_remove"),
      timeoutMs: positiveIntegerAt(hooks, "timeout_ms", 60_000)
    },
    agent: {
      maxConcurrentAgents: positiveIntegerAt(agent, "max_concurrent_agents", 10),
      maxTurns: positiveIntegerAt(agent, "max_turns", 20),
      maxRetryBackoffMs: positiveIntegerAt(agent, "max_retry_backoff_ms", 300_000),
      maxConcurrentAgentsByState: positiveIntegerMapAt(agent, "max_concurrent_agents_by_state")
    },
    codex: {
      command: stringAt(codex, "command") ?? "codex app-server",
      approvalPolicy: valueAt(codex, "approval_policy") ?? null,
      threadSandbox: valueAt(codex, "thread_sandbox") ?? null,
      turnSandboxPolicy: valueAt(codex, "turn_sandbox_policy") ?? null,
      turnTimeoutMs: positiveIntegerAt(codex, "turn_timeout_ms", 3_600_000),
      readTimeoutMs: positiveIntegerAt(codex, "read_timeout_ms", 5_000),
      stallTimeoutMs: integerAt(codex, "stall_timeout_ms", 300_000)
    },
    server: {
      port: nonNegativeIntegerOrNullAt(server, "port")
    }
  };
}

export function validateDispatchConfig(config: ServiceConfig): void {
  if (config.tracker.kind !== "linear") {
    throw new SymphonyError("unsupported_tracker_kind", "tracker.kind must be linear");
  }
  if (!config.tracker.apiKey) {
    throw new SymphonyError("missing_tracker_api_key", "tracker.api_key is required after environment resolution");
  }
  if (!config.tracker.projectSlug) {
    throw new SymphonyError("missing_tracker_project_slug", "tracker.project_slug is required for Linear");
  }
  if (!config.codex.command.trim()) {
    throw new SymphonyError("missing_codex_command", "codex.command must be non-empty");
  }
}

export async function hasWorkflowChanged(bundle: ConfigBundle): Promise<boolean> {
  try {
    const stat = await fs.stat(bundle.workflow.path);
    return stat.mtimeMs !== bundle.workflow.mtimeMs;
  } catch {
    return true;
  }
}

export async function renderPrompt(template: string, issue: Issue, attempt: number | null): Promise<string> {
  const promptTemplate = template.trim() || DEFAULT_PROMPT;
  const engine = new Liquid({ strictVariables: true, strictFilters: true });
  try {
    return await engine.parseAndRender(promptTemplate, { issue, attempt });
  } catch (error) {
    throw new SymphonyError("template_render_error", "Unable to render workflow prompt", error);
  }
}

function valueAt(object: JsonObject | null, key: string): unknown {
  return object?.[key];
}

function objectAt(object: JsonObject, key: string): JsonObject | null {
  const value = object[key];
  return isPlainObject(value) ? (value as JsonObject) : null;
}

function stringAt(object: JsonObject | null, key: string): string | null {
  const value = valueAt(object, key);
  return typeof value === "string" ? value : null;
}

function integerAt(object: JsonObject | null, key: string, fallback: number): number {
  const value = valueAt(object, key);
  return typeof value === "number" && Number.isInteger(value) ? value : fallback;
}

function positiveIntegerAt(object: JsonObject | null, key: string, fallback: number): number {
  const value = integerAt(object, key, fallback);
  if (value <= 0) throw new SymphonyError("workflow_parse_error", `${key} must be a positive integer`);
  return value;
}

function nonNegativeIntegerOrNullAt(object: JsonObject | null, key: string): number | null {
  const value = valueAt(object, key);
  if (value === undefined || value === null) return null;
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) return value;
  throw new SymphonyError("workflow_parse_error", `${key} must be a non-negative integer`);
}

function stringArrayAt(object: JsonObject | null, key: string): string[] | null {
  const value = valueAt(object, key);
  if (!Array.isArray(value)) return null;
  const strings = value.filter((item): item is string => typeof item === "string");
  return strings.length === value.length ? strings : null;
}

function positiveIntegerMapAt(object: JsonObject | null, key: string): Map<string, number> {
  const value = valueAt(object, key);
  const result = new Map<string, number>();
  if (!isPlainObject(value)) return result;
  for (const [state, rawLimit] of Object.entries(value)) {
    if (typeof rawLimit === "number" && Number.isInteger(rawLimit) && rawLimit > 0) {
      result.set(state.toLowerCase(), rawLimit);
    }
  }
  return result;
}

function resolveDollarValue(value: string, env: NodeJS.ProcessEnv): string {
  const exact = value.match(/^\$([A-Za-z_][A-Za-z0-9_]*)$/);
  if (exact) return env[exact[1]] ?? "";
  return value;
}

function resolvePathValue(value: string, workflowDir: string, env: NodeJS.ProcessEnv): string {
  let expanded = value.replace(/^~(?=$|\/|\\)/, os.homedir());
  expanded = expanded.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, name: string) => env[name] ?? "");
  const absolute = path.isAbsolute(expanded) ? expanded : path.resolve(workflowDir, expanded);
  return path.normalize(absolute);
}

function isPlainObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
