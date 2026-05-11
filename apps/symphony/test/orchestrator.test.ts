import { describe, expect, it } from "vitest";
import { sortForDispatch } from "../src/orchestrator.js";
import type { Issue } from "../src/types.js";

function issue(identifier: string, priority: number | null, created_at: string | null): Issue {
  return {
    id: identifier,
    identifier,
    title: identifier,
    description: null,
    priority,
    state: "Todo",
    branch_name: null,
    url: null,
    labels: [],
    blocked_by: [],
    created_at,
    updated_at: null
  };
}

describe("dispatch sorting", () => {
  it("sorts by priority, created_at, then identifier", () => {
    const sorted = sortForDispatch([
      issue("C", null, "2024-01-01T00:00:00Z"),
      issue("B", 2, "2024-01-02T00:00:00Z"),
      issue("A", 1, "2024-01-03T00:00:00Z"),
      issue("D", 1, "2024-01-01T00:00:00Z")
    ]);
    expect(sorted.map((item) => item.identifier)).toEqual(["D", "A", "B", "C"]);
  });
});
