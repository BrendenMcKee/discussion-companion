export interface DraftFeedbackRequest {
  draft: string;
  /** Optional hint (e.g. post vs comment); lightly used by heuristic scoring. */
  context?: string;
}

export interface DraftFeedbackResult {
  clarity: string;
  specificity: string;
  tone: string;
  communityFit: string;
  suggestedImprovements: string[];
  finalNote: string;
}

export interface DraftFeedbackResponse {
  source: "sample";
  draftLength: number;
  feedback: DraftFeedbackResult;
}
