#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createLogger } from "./logger.js";
import { createOrchestrator } from "./orchestrator.js";
import { startHttpServer } from "./server.js";

type CliOptions = {
  workflowPath?: string;
  port?: number;
  debug: boolean;
};

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const workflowPath = resolveWorkflowPath(options.workflowPath);
  const launchCwd = process.env.INIT_CWD ?? process.cwd();
  loadDotEnv(launchCwd);
  loadDotEnv(process.cwd());
  if (workflowPath) {
    loadDotEnv(path.dirname(workflowPath));
  }
  const logger = createLogger(options.debug ? "debug" : "info");
  const orchestrator = await createOrchestrator(workflowPath, logger);
  await orchestrator.start();

  const port = options.port ?? orchestrator.config.server.port;
  if (port !== null && port !== undefined) {
    await startHttpServer(orchestrator, port, logger);
  }

  logger.info("symphony started", { workflow_path: orchestrator.config.workflowPath });
  const shutdown = async () => {
    logger.info("symphony stopping");
    await orchestrator.stop();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown());
  process.on("SIGTERM", () => void shutdown());
}

function resolveWorkflowPath(workflowPath: string | undefined): string | undefined {
  const launchCwd = process.env.INIT_CWD ?? process.cwd();
  if (workflowPath) {
    return path.isAbsolute(workflowPath) ? workflowPath : path.resolve(launchCwd, workflowPath);
  }
  const launchDefault = path.join(launchCwd, "WORKFLOW.md");
  if (fs.existsSync(launchDefault)) return launchDefault;
  return undefined;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = { debug: false };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--debug") {
      options.debug = true;
    } else if (arg === "--port") {
      const raw = args[++i];
      const port = Number(raw);
      if (!Number.isInteger(port) || port < 0) throw new Error("--port requires a non-negative integer");
      options.port = port;
    } else if (arg.startsWith("--port=")) {
      const port = Number(arg.slice("--port=".length));
      if (!Number.isInteger(port) || port < 0) throw new Error("--port requires a non-negative integer");
      options.port = port;
    } else if (arg === "--help" || arg === "-h") {
      process.stdout.write("Usage: symphony [path-to-WORKFLOW.md] [--port <port>] [--debug]\n");
      process.exit(0);
    } else if (!options.workflowPath) {
      options.workflowPath = arg;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function loadDotEnv(directory: string): void {
  const envPath = path.join(directory, ".env");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = unquoteEnvValue(rawValue);
  }
}

function unquoteEnvValue(value: string): string {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

main().catch((error) => {
  const logger = createLogger("info");
  logger.error("symphony startup failed", { error: error instanceof Error ? error.message : String(error) });
  process.exit(1);
});
