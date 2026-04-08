import { readFile } from "fs/promises";
import path from "path";

import type { RedditPostSummary } from "@/lib/types/reddit";
import { logger } from "@/lib/utils/logger";

import type { ListRecentPostsOptions, RedditContentProvider } from "./RedditContentProvider";

interface PostsFile {
  posts: RedditPostSummary[];
}

/**
 * Loads recent-post style rows from `mocks/recent-posts.json` for offline and CI runs.
 * Swap in another `RedditContentProvider` when the app syncs live Reddit data.
 */
export class JsonDatasetRedditProvider implements RedditContentProvider {
  async listRecentPosts(
    options: ListRecentPostsOptions,
  ): Promise<RedditPostSummary[]> {
    const filePath = path.join(process.cwd(), "mocks", "recent-posts.json");
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
      logger.debug("json dataset: no posts for requested subreddits, using full sample set", {
        requested: [...wanted],
      });
      return data.posts.slice(0, limit);
    }

    return filtered.slice(0, limit);
  }
}
