import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseWorkflowText, renderPrompt, resolveServiceConfig, validateDispatchConfig } from "../src/workflow.js";
import type { WorkflowDefinition } from "../src/types.js";

function workflow(config: Record<string, unknown>, prompt = "Hello {{ issue.identifier }} {{ attempt }}"): WorkflowDefinition {
  return {
    path: path.join(os.tmpdir(), "repo", "WORKFLOW.md"),
    mtimeMs: 1,
    config,
    prompt_template: prompt
  };
}

describe("workflow parsing", () => {
  it("parses YAML front matter and trims prompt body", () => {
    const parsed = parseWorkflowText("---\ntracker:\n  kind: linear\n---\n\nDo work.\n");
    expect(parsed.config).toEqual({ tracker: { kind: "linear" } });
    expect(parsed.prompt_template).toBe("Do work.");
  });

  it("treats files without front matter as prompt-only", () => {
    const parsed = parseWorkflowText("Just a prompt");
    expect(parsed.config).toEqual({});
    expect(parsed.prompt_template).toBe("Just a prompt");
  });

  it("rejects non-map YAML front matter", () => {
    expect(() => parseWorkflowText("---\n- nope\n---\nPrompt")).toThrow(/front matter/i);
  });
});

describe("service config", () => {
  it("applies defaults and resolves environment-backed values", () => {
    const config = resolveServiceConfig(
      workflow({
        tracker: { kind: "linear", api_key: "$LINEAR_API_KEY", project_slug: "demo", team_key: "ZAP2" },
        workspace: { root: "$WORKSPACE_ROOT/work" },
        agent: { max_concurrent_agents_by_state: { Todo: 2, Bad: 0 } }
      }),
      { LINEAR_API_KEY: "token", WORKSPACE_ROOT: "/tmp/symphony" }
    );
    expect(config.tracker.apiKey).toBe("token");
    expect(config.tracker.teamKey).toBe("ZAP2");
    expect(config.workspace.root).toBe("/tmp/symphony/work");
    expect(config.polling.intervalMs).toBe(30000);
    expect(config.agent.maxConcurrentAgentsByState.get("todo")).toBe(2);
    expect(config.agent.maxConcurrentAgentsByState.has("bad")).toBe(false);
  });

  it("reads optional server port extension config", () => {
    const config = resolveServiceConfig(workflow({ tracker: { kind: "linear" }, server: { port: 0 } }));
    expect(config.server.port).toBe(0);
  });

  it("validates required dispatch fields", () => {
    const config = resolveServiceConfig(workflow({ tracker: { kind: "linear", api_key: "$MISSING", project_slug: "demo" } }), {});
    expect(() => validateDispatchConfig(config)).toThrow(/api_key/i);
  });
});

describe("prompt rendering", () => {
  it("renders issue and attempt with strict variables", async () => {
    await expect(
      renderPrompt("Fix {{ issue.identifier }} attempt={{ attempt }}", {
        id: "1",
        identifier: "ABC-1",
        title: "Title",
        description: null,
        priority: null,
        state: "Todo",
        branch_name: null,
        url: null,
        labels: [],
        blocked_by: [],
        created_at: null,
        updated_at: null
      }, 2)
    ).resolves.toBe("Fix ABC-1 attempt=2");
  });

  it("fails on unknown variables", async () => {
    await expect(renderPrompt("{{ missing.value }}", {
      id: "1",
      identifier: "ABC-1",
      title: "Title",
      description: null,
      priority: null,
      state: "Todo",
      branch_name: null,
      url: null,
      labels: [],
      blocked_by: [],
      created_at: null,
      updated_at: null
    }, null)).rejects.toThrow(/render/i);
  });
});
