export interface DiscussionOpportunity {
  subreddit: string;
  postTitle: string;
  postUrl: string;
  reasonRelevant: string;
  relevanceScore: number;
  createdAt: string;
}

export interface OpportunitiesResponse {
  /** `bundle` means rows were built from the on-disk seed feed (v0); authenticated reads will use other values later. */
  source: "bundle";
  generatedAt: string;
  opportunities: DiscussionOpportunity[];
}
