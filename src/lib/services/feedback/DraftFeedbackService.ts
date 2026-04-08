import type {
  DraftFeedbackRequest,
  DraftFeedbackResult,
} from "@/lib/types/feedback";

/**
 * Deterministic draft feedback from heuristics (length, punctuation, word choice).
 * No external model calls in this version.
 */
export class DraftFeedbackService {
  analyze(request: DraftFeedbackRequest): DraftFeedbackResult {
    const text = request.draft.trim();
    const words = text.length ? text.split(/\s+/) : [];

    const clarity =
      text.length < 20
        ? "Very short. Add a clear ask or point so readers know what you mean."
        : text.length < 80
          ? "Readable. Consider one more sentence of context for strangers."
          : "Structure looks clear enough for a typical thread.";

    const specificity =
      words.length < 8
        ? "Light on specifics. A concrete example or constraint usually helps."
        : "Includes enough detail to ground the discussion.";

    const tone =
      /\b(obviously|clearly|just)\b/i.test(text) && text.length < 120
        ? "A few words may read as abrupt; soften if the subreddit values neutral tone."
        : "Tone reads neutral; adjust to match community norms before posting.";

    const communityFit =
      "Heuristic pass only. A future version can weigh subreddit rules and recent tone when synced data is available.";

    const suggestedImprovements: string[] = [];
    if (!/\?/.test(text) && request.context !== "post") {
      suggestedImprovements.push(
        "If you want replies, consider ending with a specific question.",
      );
    }
    if (text.length > 600) {
      suggestedImprovements.push(
        "Long draft. Break into paragraphs or trim to the essential question.",
      );
    }
    if (suggestedImprovements.length === 0) {
      suggestedImprovements.push(
        "Re-read once for typos. Automated hints do not replace your own pass.",
      );
    }

    return {
      clarity,
      specificity,
      tone,
      communityFit,
      suggestedImprovements,
      finalNote:
        "Feedback here comes from built-in rules, not a hosted language model.",
    };
  }
}
