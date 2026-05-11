import type { JsonObject, Logger } from "./types.js";

function serialize(fields: JsonObject = {}): string {
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join(" ");
}

export function createLogger(level: "debug" | "info" = "info"): Logger {
  const enabled = new Set(level === "debug" ? ["debug", "info", "warn", "error"] : ["info", "warn", "error"]);

  function write(kind: string, message: string, fields?: JsonObject) {
    if (!enabled.has(kind)) return;
    const suffix = fields && Object.keys(fields).length > 0 ? ` ${serialize(fields)}` : "";
    const line = `time=${JSON.stringify(new Date().toISOString())} level=${kind} msg=${JSON.stringify(message)}${suffix}`;
    const stream = kind === "error" || kind === "warn" ? process.stderr : process.stdout;
    stream.write(`${line}\n`);
  }

  return {
    debug: (message, fields) => write("debug", message, fields),
    info: (message, fields) => write("info", message, fields),
    warn: (message, fields) => write("warn", message, fields),
    error: (message, fields) => write("error", message, fields)
  };
}
