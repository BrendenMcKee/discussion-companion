"use client";

import { useEffect, useState } from "react";

interface HealthPayload {
  ok: boolean;
  service: string;
  environment: string;
  dataSource: string;
  note?: string;
}

export function ApiStatus() {
  const [data, setData] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthPayload>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "unavailable");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="muted">
        Could not reach the local API ({error}). Is <code>npm run dev</code>{" "}
        running?
      </p>
    );
  }

  if (!data) {
    return (
      <p className="muted" role="status" aria-live="polite">
        Contacting server API...
      </p>
    );
  }

  return (
    <div className="card" role="region" aria-label="API health response">
      <p className="muted" style={{ margin: "0 0 0.5rem" }}>
        Browser UI to server API (same machine, same origin in dev)
      </p>
      <p style={{ margin: 0 }}>
        <code>{data.service}</code> &middot; {data.environment} &middot;{" "}
        <code>{data.dataSource}</code>
      </p>
      {data.note ? (
        <p className="muted" style={{ margin: "0.5rem 0 0", fontSize: "0.9em" }}>
          {data.note}
        </p>
      ) : null}
    </div>
  );
}
