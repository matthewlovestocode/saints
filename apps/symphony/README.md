# Symphony

This package implements the draft Symphony service specification:

- `WORKFLOW.md` loading with optional YAML front matter.
- Typed runtime config with defaults, `$VAR` indirection, and path normalization.
- Dynamic workflow reload with last-known-good behavior.
- Linear tracker reads for active candidates, terminal cleanup, and running-state refresh.
- Deterministic per-issue workspaces with lifecycle hooks and root containment checks.
- Single-authority orchestration with bounded concurrency, retries, reconciliation, and snapshots.
- Codex app-server subprocess execution over stdio JSON-RPC using the locally generated v2 schema shape.
- Structured `key=value` logs and an optional loopback HTTP status/API extension.

## Run

```sh
npm run symphony -- path/to/WORKFLOW.md --port 0
```

If no path is provided, Symphony uses `./WORKFLOW.md`.

The CLI loads `.env` from the current working directory and from the directory containing the
selected workflow file. Existing exported environment variables take precedence.

## Trust And Safety Posture

This implementation is intended for trusted automation environments. It launches hooks from
`WORKFLOW.md` and starts Codex inside the per-issue workspace. It passes through configured Codex
approval and sandbox policy values, and its built-in high-trust client policy auto-approves Codex
command and file-change approvals for the current session.

User-input-required and MCP elicitation requests are not allowed to wait forever: user-input tool
requests fail the run, and MCP elicitations are cancelled. Unsupported dynamic tool calls return a
structured tool failure instead of stalling the turn.

Workspace safety invariants are enforced before launch: issue identifiers are sanitized for
directory names, workspace paths must remain inside `workspace.root`, and Codex is spawned with the
per-issue workspace as `cwd`.

## Optional HTTP Extension

Passing `--port <port>` starts a loopback server:

- `GET /`
- `GET /api/v1/state`
- `GET /api/v1/<issue_identifier>`
- `POST /api/v1/refresh`
