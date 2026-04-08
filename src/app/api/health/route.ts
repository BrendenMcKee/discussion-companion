import { NextResponse } from "next/server";

import { env } from "@/lib/config/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "discussion-companion",
    environment: env.nodeEnv,
    dataSource: "bundled_sample",
    note:
      "v0 build using bundled sample Reddit-shaped data. Live account sync is on the roadmap.",
  });
}
