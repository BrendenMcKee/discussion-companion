export interface DiscussionOpportunity {
  subreddit: string;
  postTitle: string;
  postUrl: string;
  reasonRelevant: string;
  relevanceScore: number;
  createdAt: string;
}

export interface OpportunitiesResponse {
  /** `sample` means rows came from the bundled JSON dataset, not a live sync. */
  source: "sample";
  generatedAt: string;
  opportunities: DiscussionOpportunity[];
}
