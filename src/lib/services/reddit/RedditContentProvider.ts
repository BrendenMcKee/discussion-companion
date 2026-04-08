import type { RedditPostSummary } from "@/lib/types/reddit";

export interface ListRecentPostsOptions {
  /** Normalized subreddit names without the `r/` prefix. */
  subredditNames: string[];
  /** Soft cap per community; live API paging can map to this later. */
  limitPerSubreddit?: number;
}

/**
 * Contract for loading recent public posts from chosen subreddits.
 * Implementations can read from disk, cache, or Reddit’s authenticated Data API.
 */
export interface RedditContentProvider {
  listRecentPosts(options: ListRecentPostsOptions): Promise<RedditPostSummary[]>;
}
