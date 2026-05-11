import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { SymphonyError, errorMessage } from "./errors.js";
import type { Logger, ServiceConfig, Workspace } from "./types.js";

const execFileAsync = promisify(execFile);

export function sanitizeWorkspaceKey(identifier: string): string {
  return identifier.replace(/[^A-Za-z0-9._-]/g, "_");
}

export function ensureInsideRoot(workspaceRoot: string, workspacePath: string): void {
  const root = path.resolve(workspaceRoot);
  const child = path.resolve(workspacePath);
  const relative = path.relative(root, child);
  if (relative.startsWith("..") || path.isAbsolute(relative) || relative === "") {
    if (relative !== "") {
      throw new SymphonyError("invalid_workspace_path", `Workspace path must stay inside root: ${child}`);
    }
  }
}

export class WorkspaceManager {
  constructor(
    private readonly getConfig: () => ServiceConfig,
    private readonly logger: Logger
  ) {}

  pathForIdentifier(identifier: string): string {
    const config = this.getConfig();
    const workspacePath = path.join(config.workspace.root, sanitizeWorkspaceKey(identifier));
    ensureInsideRoot(config.workspace.root, workspacePath);
    return workspacePath;
  }

  async createForIssue(identifier: string): Promise<Workspace> {
    const config = this.getConfig();
    const workspaceKey = sanitizeWorkspaceKey(identifier);
    const workspacePath = path.join(config.workspace.root, workspaceKey);
    ensureInsideRoot(config.workspace.root, workspacePath);

    await fs.mkdir(config.workspace.root, { recursive: true });
    let createdNow = false;
    try {
      const stat = await fs.stat(workspacePath);
      if (!stat.isDirectory()) {
        throw new SymphonyError("workspace_not_directory", `Workspace path exists but is not a directory: ${workspacePath}`);
      }
    } catch (error) {
      if (error instanceof SymphonyError) throw error;
      createdNow = true;
      await fs.mkdir(workspacePath, { recursive: true });
    }

    if (createdNow && config.hooks.afterCreate) {
      await runHook("after_create", config.hooks.afterCreate, workspacePath, config.hooks.timeoutMs, this.logger, true);
    }

    return { path: workspacePath, workspaceKey, createdNow };
  }

  async beforeRun(workspacePath: string): Promise<void> {
    const config = this.getConfig();
    ensureInsideRoot(config.workspace.root, workspacePath);
    if (config.hooks.beforeRun) {
      await runHook("before_run", config.hooks.beforeRun, workspacePath, config.hooks.timeoutMs, this.logger, true);
    }
  }

  async afterRun(workspacePath: string): Promise<void> {
    const config = this.getConfig();
    if (config.hooks.afterRun) {
      await runHook("after_run", config.hooks.afterRun, workspacePath, config.hooks.timeoutMs, this.logger, false);
    }
  }

  async removeForIssue(identifier: string): Promise<void> {
    const config = this.getConfig();
    const workspacePath = this.pathForIdentifier(identifier);
    try {
      const stat = await fs.stat(workspacePath);
      if (!stat.isDirectory()) return;
    } catch {
      return;
    }

    if (config.hooks.beforeRemove) {
      await runHook("before_remove", config.hooks.beforeRemove, workspacePath, config.hooks.timeoutMs, this.logger, false);
    }
    await fs.rm(workspacePath, { recursive: true, force: true });
    this.logger.info("workspace cleanup completed", { workspace_path: workspacePath, issue_identifier: identifier });
  }
}

async function runHook(
  name: string,
  script: string,
  cwd: string,
  timeoutMs: number,
  logger: Logger,
  fatal: boolean
): Promise<void> {
  logger.info("hook started", { hook: name, cwd });
  try {
    const result = await execFileAsync("sh", ["-lc", script], {
      cwd,
      timeout: timeoutMs,
      maxBuffer: 128 * 1024
    });
    logger.info("hook completed", {
      hook: name,
      cwd,
      stdout: truncate(result.stdout),
      stderr: truncate(result.stderr)
    });
  } catch (error) {
    logger.warn("hook failed", { hook: name, cwd, error: errorMessage(error) });
    if (fatal) {
      throw new SymphonyError("hook_failed", `${name} hook failed`, error);
    }
  }
}

function truncate(value: string): string {
  return value.length > 4000 ? `${value.slice(0, 4000)}...` : value;
}
