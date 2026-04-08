import { NextResponse } from "next/server";

import { env } from "@/lib/config/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "discussion-companion",
    environment: env.nodeEnv,
    dataSource: "bundled_feed",
    note:
      "v0 uses a bundled static feed in-repo. Authenticated Reddit read access is the next milestone.",
  });
}
