import http from "node:http";
import type { Orchestrator } from "./orchestrator.js";
import type { Logger } from "./types.js";

export async function startHttpServer(orchestrator: Orchestrator, port: number, logger: Logger): Promise<http.Server> {
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    try {
      if (request.method === "GET" && url.pathname === "/") {
        const snapshot = orchestrator.snapshot();
        response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        response.end(renderDashboard(snapshot));
        return;
      }
      if (request.method === "GET" && url.pathname === "/api/v1/state") {
        json(response, 200, orchestrator.snapshot());
        return;
      }
      if (request.method === "POST" && url.pathname === "/api/v1/refresh") {
        void orchestrator.tickNow();
        json(response, 202, {
          queued: true,
          coalesced: false,
          requested_at: new Date().toISOString(),
          operations: ["poll", "reconcile"]
        });
        return;
      }
      const issueMatch = url.pathname.match(/^\/api\/v1\/([^/]+)$/);
      if (request.method === "GET" && issueMatch) {
        const identifier = decodeURIComponent(issueMatch[1]);
        const snapshot = orchestrator.snapshot();
        const running = snapshot.running.find((row) => row.issue_identifier === identifier);
        const retry = snapshot.retrying.find((row) => row.issue_identifier === identifier);
        if (!running && !retry) {
          json(response, 404, { error: { code: "issue_not_found", message: `No runtime state for ${identifier}` } });
          return;
        }
        json(response, 200, {
          issue_identifier: identifier,
          issue_id: running?.issue_id ?? retry?.issue_id,
          status: running ? "running" : "retrying",
          running: running ?? null,
          retry: retry ?? null,
          last_error: retry?.error ?? null
        });
        return;
      }
      if (["GET", "POST"].includes(request.method ?? "")) {
        json(response, 404, { error: { code: "not_found", message: "Route not found" } });
      } else {
        json(response, 405, { error: { code: "method_not_allowed", message: "Method not allowed" } });
      }
    } catch (error) {
      logger.error("http handler failed", { error: error instanceof Error ? error.message : String(error) });
      json(response, 500, { error: { code: "internal_error", message: "Internal error" } });
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  const actualPort = typeof address === "object" && address ? address.port : port;
  logger.info("symphony http server started", { url: `http://127.0.0.1:${actualPort}` });
  return server;
}

function json(response: http.ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function renderDashboard(snapshot: ReturnType<Orchestrator["snapshot"]>): string {
  const runningRows = snapshot.running
    .map((row) => `<tr><td>${escapeHtml(row.issue_identifier)}</td><td>${escapeHtml(row.state)}</td><td>${escapeHtml(row.last_event ?? "")}</td><td>${row.turn_count}</td></tr>`)
    .join("");
  const retryRows = snapshot.retrying
    .map((row) => `<tr><td>${escapeHtml(row.issue_identifier)}</td><td>${row.attempt}</td><td>${escapeHtml(row.due_at)}</td><td>${escapeHtml(row.error ?? "")}</td></tr>`)
    .join("");
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Symphony</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 32px; color: #1f2933; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 32px; }
    th, td { border-bottom: 1px solid #d9e2ec; padding: 8px; text-align: left; }
    .metrics { display: flex; gap: 24px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>Symphony</h1>
  <div class="metrics">
    <div>Running: ${snapshot.counts.running}</div>
    <div>Retrying: ${snapshot.counts.retrying}</div>
    <div>Tokens: ${snapshot.codex_totals.total_tokens}</div>
  </div>
  <h2>Running</h2>
  <table><thead><tr><th>Issue</th><th>State</th><th>Last event</th><th>Turns</th></tr></thead><tbody>${runningRows}</tbody></table>
  <h2>Retrying</h2>
  <table><thead><tr><th>Issue</th><th>Attempt</th><th>Due</th><th>Error</th></tr></thead><tbody>${retryRows}</tbody></table>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}
