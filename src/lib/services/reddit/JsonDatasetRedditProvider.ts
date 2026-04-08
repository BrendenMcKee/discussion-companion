import { readFile } from "fs/promises";
import path from "path";

import type { RedditPostSummary } from "@/lib/types/reddit";
import { logger } from "@/lib/utils/logger";

import type { ListRecentPostsOptions, RedditContentProvider } from "./RedditContentProvider";

interface PostsFile {
  posts: RedditPostSummary[];
}

/**
 * Loads recent-post rows from `data/recent-posts.json` (bundled seed feed for v0).
 * Replace with a live `RedditContentProvider` when authenticated read access is enabled.
 */
export class JsonDatasetRedditProvider implements RedditContentProvider {
  async listRecentPosts(
    options: ListRecentPostsOptions,
  ): Promise<RedditPostSummary[]> {
    const filePath = path.join(process.cwd(), "data", "recent-posts.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as PostsFile;
    const limit = options.limitPerSubreddit ?? 25;
    const wanted = new Set(
      options.subredditNames.map((s) => s.toLowerCase().replace(/^r\//, "")),
    );

    const filtered = data.posts.filter((p) =>
      wanted.has(p.subreddit.toLowerCase()),
    );

    if (filtered.length === 0) {
      logger.debug("json dataset: no posts for requested subreddits, using full bundled feed slice", {
        requested: [...wanted],
      });
      return data.posts.slice(0, limit);
    }

    return filtered.slice(0, limit);
  }
}
