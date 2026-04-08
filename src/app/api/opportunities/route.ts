import { NextResponse } from "next/server";

import { DEFAULT_FEED_SUBREDDITS } from "@/lib/constants/defaults";
import type { OpportunitiesResponse } from "@/lib/types/opportunities";
import { OpportunityService } from "@/lib/services/opportunities/OpportunityService";
import { JsonDatasetRedditProvider } from "@/lib/services/reddit/JsonDatasetRedditProvider";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("subreddits");
  const subredditNames = raw
    ? raw
        .split(",")
        .map((s) => s.trim().replace(/^r\//i, ""))
        .filter(Boolean)
    : [...DEFAULT_FEED_SUBREDDITS];

  const service = new OpportunityService(new JsonDatasetRedditProvider());
  const opportunities = await service.listOpportunities(subredditNames);

  const body: OpportunitiesResponse = {
    source: "bundle",
    generatedAt: new Date().toISOString(),
    opportunities,
  };

  return NextResponse.json(body);
}
