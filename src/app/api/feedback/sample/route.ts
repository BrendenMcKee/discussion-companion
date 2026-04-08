import { NextResponse } from "next/server";

import type {
  DraftFeedbackRequest,
  DraftFeedbackResponse,
} from "@/lib/types/feedback";
import { DraftFeedbackService } from "@/lib/services/feedback/DraftFeedbackService";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as DraftFeedbackRequest).draft !== "string"
  ) {
    return NextResponse.json(
      { error: 'Expected JSON object with string field "draft"' },
      { status: 400 },
    );
  }

  const req = body as DraftFeedbackRequest;
  const service = new DraftFeedbackService();
  const feedback = service.analyze({
    draft: req.draft,
    context: req.context,
  });

  const res: DraftFeedbackResponse = {
    source: "sample",
    draftLength: req.draft.length,
    feedback,
  };

  return NextResponse.json(res);
}
