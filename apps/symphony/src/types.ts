export type JsonObject = Record<string, unknown>;

export type BlockerRef = {
  id: string | null;
  identifier: string | null;
  state: string | null;
};

export type Issue = {
  id: string;
  identifier: string;
  title: string;
  description: string | null;
  priority: number | null;
  state: string;
  branch_name: string | null;
  url: string | null;
  labels: string[];
  blocked_by: BlockerRef[];
  created_at: string | null;
  updated_at: string | null;
};

export type WorkflowDefinition = {
  path: string;
  mtimeMs: number;
  config: JsonObject;
  prompt_template: string;
};

export type ServiceConfig = {
  workflowPath: string;
  workflowDir: string;
  tracker: {
    kind: "linear";
    endpoint: string;
    apiKey: string | null;
    projectSlug: string | null;
    teamKey: string | null;
    teamId: string | null;
    activeStates: string[];
    terminalStates: string[];
  };
  polling: {
    intervalMs: number;
  };
  workspace: {
    root: string;
  };
  hooks: {
    afterCreate: string | null;
    beforeRun: string | null;
    afterRun: string | null;
    beforeRemove: string | null;
    timeoutMs: number;
  };
  agent: {
    maxConcurrentAgents: number;
    maxTurns: number;
    maxRetryBackoffMs: number;
    maxConcurrentAgentsByState: Map<string, number>;
  };
  codex: {
    command: string;
    approvalPolicy: unknown | null;
    threadSandbox: unknown | null;
    turnSandboxPolicy: unknown | null;
    turnTimeoutMs: number;
    readTimeoutMs: number;
    stallTimeoutMs: number;
  };
  server: {
    port: number | null;
  };
  github: {
    autoPr: boolean;
    autoMerge: boolean;
    baseBranch: string;
    remote: string;
    draft: boolean;
    checks: string[];
  };
};

export type ConfigBundle = {
  workflow: WorkflowDefinition;
  config: ServiceConfig;
};

export type Logger = {
  info(message: string, fields?: JsonObject): void;
  warn(message: string, fields?: JsonObject): void;
  error(message: string, fields?: JsonObject): void;
  debug(message: string, fields?: JsonObject): void;
};

export type Workspace = {
  path: string;
  workspaceKey: string;
  createdNow: boolean;
};

export type AgentEvent = {
  event: string;
  timestamp: string;
  codex_app_server_pid?: number;
  thread_id?: string;
  turn_id?: string;
  session_id?: string;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
  };
  rate_limits?: unknown;
  message?: string;
  payload?: unknown;
};

export type AgentRunner = {
  run(input: {
    issue: Issue;
    attempt: number | null;
    signal: AbortSignal;
    onEvent: (event: AgentEvent) => void;
  }): Promise<void>;
};

export type TrackerClient = {
  fetchCandidateIssues(): Promise<Issue[]>;
  fetchIssuesByStates(stateNames: string[]): Promise<Issue[]>;
  fetchIssueStatesByIds(issueIds: string[]): Promise<Issue[]>;
  updateIssueState?(issueId: string, stateName: string): Promise<void>;
  createIssueComment?(issueId: string, body: string): Promise<void>;
};
