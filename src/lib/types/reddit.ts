/** Post summaries used by the Reddit content provider and opportunity pipeline. */
export interface RedditPostSummary {
  id: string;
  subreddit: string;
  title: string;
  permalink: string;
  createdUtc: string;
  selftextPreview?: string;
}

export interface SubredditSnapshot {
  name: string;
  fetchedAt: string;
  posts: RedditPostSummary[];
}
