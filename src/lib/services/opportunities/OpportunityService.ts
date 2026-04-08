import type { DiscussionOpportunity } from "@/lib/types/opportunities";
import type { RedditPostSummary } from "@/lib/types/reddit";
import { logger } from "@/lib/utils/logger";

import type { RedditContentProvider } from "../reddit/RedditContentProvider";

const KEYWORDS = ["question", "help", "advice", "discuss", "thoughts", "how do"];

function scorePost(post: RedditPostSummary): {
  score: number;
  reason: string;
} {
  const title = post.title.toLowerCase();
  let score = 0.35;
  let reason = "Recent public thread in a tracked subreddit.";

  for (const kw of KEYWORDS) {
    if (title.includes(kw)) {
      score += 0.12;
      reason = `Title suggests an open discussion (${kw}).`;
      break;
    }
  }

  if (post.title.length > 40 && post.title.includes("?")) {
    score += 0.1;
    reason = "Question-style thread may welcome thoughtful replies.";
  }

  score = Math.min(0.95, Math.round(score * 100) / 100);
  return { score, reason };
}

function toOpportunity(post: RedditPostSummary): DiscussionOpportunity {
  const { score, reason } = scorePost(post);
  return {
    subreddit: post.subreddit,
    postTitle: post.title,
    postUrl: `https://www.reddit.com${post.permalink}`,
    reasonRelevant: reason,
    relevanceScore: score,
    createdAt: post.createdUtc,
  };
}

export class OpportunityService {
  constructor(private readonly reddit: RedditContentProvider) {}

  async listOpportunities(subredditNames: string[]): Promise<DiscussionOpportunity[]> {
    const posts = await this.reddit.listRecentPosts({
      subredditNames,
      limitPerSubreddit: 25,
    });

    logger.info("opportunities: ranked posts from content provider", {
      count: posts.length,
    });

    return posts.map(toOpportunity).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}
