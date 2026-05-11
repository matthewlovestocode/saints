import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createLogger } from "../src/logger.js";
import { ensureInsideRoot, sanitizeWorkspaceKey, WorkspaceManager } from "../src/workspace.js";
import type { ServiceConfig } from "../src/types.js";

function config(root: string, hooks: Partial<ServiceConfig["hooks"]> = {}): ServiceConfig {
  return {
    workflowPath: path.join(root, "WORKFLOW.md"),
    workflowDir: root,
    tracker: { kind: "linear", endpoint: "x", apiKey: "t", projectSlug: "p", teamKey: null, teamId: null, activeStates: ["Todo"], terminalStates: ["Done"] },
    polling: { intervalMs: 1 },
    workspace: { root },
    hooks: { afterCreate: null, beforeRun: null, afterRun: null, beforeRemove: null, timeoutMs: 1000, ...hooks },
    agent: { maxConcurrentAgents: 1, maxTurns: 1, maxRetryBackoffMs: 1000, maxConcurrentAgentsByState: new Map() },
    codex: { command: "true", approvalPolicy: null, threadSandbox: null, turnSandboxPolicy: null, turnTimeoutMs: 1000, readTimeoutMs: 1000, stallTimeoutMs: 0 },
    server: { port: null }
  };
}

describe("workspace manager", () => {
  it("sanitizes issue identifiers", () => {
    expect(sanitizeWorkspaceKey("ABC/1 test")).toBe("ABC_1_test");
  });

  it("rejects paths outside the root", () => {
    expect(() => ensureInsideRoot("/tmp/root", "/tmp/elsewhere")).toThrow(/inside root/i);
  });

  it("creates and reuses deterministic workspaces", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "symphony-test-"));
    const manager = new WorkspaceManager(() => config(root), createLogger("info"));
    const first = await manager.createForIssue("ABC-1");
    const second = await manager.createForIssue("ABC-1");
    expect(first.path).toBe(path.join(root, "ABC-1"));
    expect(first.createdNow).toBe(true);
    expect(second.createdNow).toBe(false);
  });

  it("runs after_create hook only for new workspaces", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "symphony-test-"));
    const manager = new WorkspaceManager(() => config(root, { afterCreate: "echo created > marker.txt" }), createLogger("info"));
    const workspace = await manager.createForIssue("ABC-2");
    await manager.createForIssue("ABC-2");
    await expect(fs.readFile(path.join(workspace.path, "marker.txt"), "utf8")).resolves.toBe("created\n");
  });
});
