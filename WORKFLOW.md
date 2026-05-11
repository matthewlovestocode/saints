---
tracker:
  kind: linear
  api_key: $LINEAR_API_KEY
  project_slug: orthodox-saints-0816d0d1722a
  team_key: ZAP2
  active_states:
    - Todo
    - In Progress
  terminal_states:
    - Closed
    - Cancelled
    - Canceled
    - Duplicate
    - Done

workspace:
  root: .symphony-workspaces

hooks:
  after_create: |
    git clone https://github.com/matthewlovestocode/saints.git .
  before_run: |
    git fetch origin
  timeout_ms: 60000

agent:
  max_concurrent_agents: 2
  max_turns: 20
  max_retry_backoff_ms: 300000

codex:
  command: codex app-server
  approval_policy: never
  turn_timeout_ms: 3600000
  read_timeout_ms: 5000
  stall_timeout_ms: 300000

github:
  auto_pr: true
  auto_merge: true
  base_branch: main
  remote: origin
  draft: false
  checks:
    - npm test
    - npm run build
---

You are working on a Linear issue for the Orthodox Saints repository.

Issue: {{ issue.identifier }} — {{ issue.title }}
State: {{ issue.state }}
URL: {{ issue.url }}
Attempt: {{ attempt }}

Description:
{{ issue.description }}

Work in the current repository workspace only. Implement the requested change, run the relevant
checks, and leave a concise handoff that explains what changed, what passed, and any remaining
blockers.
