import type { RedditPostSummary } from "@/lib/types/reddit";

export interface ListRecentPostsOptions {
  /** Normalized subreddit names without the `r/` prefix. */
  subredditNames: string[];
  /** Soft cap per community; live sync can map this to paging. */
  limitPerSubreddit?: number;
}

/**
 * Contract for loading recent public posts from chosen subreddits.
 * Implementations can read from disk, cache, or a live Reddit sync layer.
 */
export interface RedditContentProvider {
  listRecentPosts(options: ListRecentPostsOptions): Promise<RedditPostSummary[]>;
}
