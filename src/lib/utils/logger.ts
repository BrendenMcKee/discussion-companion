type Level = "debug" | "info" | "warn" | "error";

const PREFIX = "[discussion-companion]";

function log(level: Level, message: string, meta?: Record<string, unknown>) {
  const line = meta ? `${message} ${JSON.stringify(meta)}` : message;
  const fn =
    level === "error"
      ? console.error
      : level === "warn"
        ? console.warn
        : console.log;
  fn(`${PREFIX} [${level}] ${line}`);
}

export const logger = {
  debug: (m: string, meta?: Record<string, unknown>) => log("debug", m, meta),
  info: (m: string, meta?: Record<string, unknown>) => log("info", m, meta),
  warn: (m: string, meta?: Record<string, unknown>) => log("warn", m, meta),
  error: (m: string, meta?: Record<string, unknown>) => log("error", m, meta),
};
