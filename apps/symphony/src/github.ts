import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { SymphonyError } from "./errors.js";
import type { Issue, Logger, ServiceConfig } from "./types.js";

const execFileAsync = promisify(execFile);

export type PublishResult =
  | {
      status: "no_changes";
    }
  | {
      status: "merged" | "opened";
      branch: string;
      commit: string;
      prUrl: string;
    };

export class GitHubPublisher {
  constructor(
    private readonly getConfig: () => ServiceConfig,
    private readonly logger: Logger
  ) {}

  async publishIssueWorkspace(issue: Issue, workspacePath: string): Promise<PublishResult> {
    const status = await git(workspacePath, ["status", "--porcelain"]);
    if (!status.stdout.trim()) {
      return { status: "no_changes" };
    }

    const config = this.getConfig();
    const branch = `codex/${issue.identifier.toLowerCase()}-${slugify(issue.title)}`.slice(0, 100);
    await git(workspacePath, ["switch", "-C", branch]);
    await git(workspacePath, ["add", "-A"]);
    await git(workspacePath, ["commit", "-m", `${issue.identifier}: ${issue.title}`]);
    await git(workspacePath, ["fetch", config.github.remote, config.github.baseBranch]);
    await git(workspacePath, ["rebase", `FETCH_HEAD`]);

    for (const check of config.github.checks) {
      this.logger.info("github handoff check started", { issue_id: issue.id, issue_identifier: issue.identifier, command: check });
      await shell(workspacePath, check);
      this.logger.info("github handoff check completed", { issue_id: issue.id, issue_identifier: issue.identifier, command: check });
    }

    await git(workspacePath, ["push", "-u", config.github.remote, branch, "--force-with-lease"]);
    const commit = (await git(workspacePath, ["rev-parse", "HEAD"])).stdout.trim();
    const prUrl = (
      await gh(workspacePath, [
        "pr",
        "create",
        "--title",
        `${issue.identifier}: ${issue.title}`,
        "--body",
        prBody(issue, config.github.checks),
        "--base",
        config.github.baseBranch,
        "--head",
        branch,
        ...(config.github.draft ? ["--draft"] : [])
      ])
    ).stdout.trim();

    if (!config.github.autoMerge) {
      return { status: "opened", branch, commit, prUrl };
    }

    await gh(workspacePath, ["pr", "merge", prUrl, "--squash", "--delete-branch", "--admin"]);
    return { status: "merged", branch, commit, prUrl };
  }
}

function prBody(issue: Issue, checks: string[]): string {
  return [
    "## Summary",
    `Automated Symphony handoff for ${issue.identifier}.`,
    "",
    "## Linear",
    `Closes ${issue.identifier}`,
    "",
    "## Checks",
    ...checks.map((check) => `- \`${check}\``)
  ].join("\n");
}

async function git(cwd: string, args: string[]) {
  return execFileAsync("git", args, { cwd, maxBuffer: 10 * 1024 * 1024 });
}

async function gh(cwd: string, args: string[]) {
  try {
    return await execFileAsync("gh", args, { cwd, maxBuffer: 10 * 1024 * 1024 });
  } catch (error) {
    throw new SymphonyError("github_handoff_failed", `gh ${args.join(" ")} failed`, error);
  }
}

async function shell(cwd: string, command: string) {
  return execFileAsync("sh", ["-lc", command], { cwd, maxBuffer: 20 * 1024 * 1024 });
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}
