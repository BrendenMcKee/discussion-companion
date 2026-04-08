# Modules

Reference for `src/lib/` and related app code.

## Types (`src/lib/types/`)

| File | Contents |
| --- | --- |
| `reddit.ts` | `RedditPostSummary`, `SubredditSnapshot` for the content provider and opportunities pipeline. |
| `opportunities.ts` | `DiscussionOpportunity` and `OpportunitiesResponse` (`source: bundle` in v0). |
| `feedback.ts` | Request and response types for draft feedback (`source: bundle` in v0). |

## Reddit content (`src/lib/services/reddit/`)

- **`RedditContentProvider.ts`** — `listRecentPosts({ subredditNames, limitPerSubreddit })` returns `RedditPostSummary[]`.
- **`JsonDatasetRedditProvider.ts`** — Reads `data/recent-posts.json`, filters by subreddit, falls back to a slice of the full file when nothing matches.
- **`README.md`** — Short folder note.

## Opportunities (`src/lib/services/opportunities/`)

- **`OpportunityService.ts`** — Uses a `RedditContentProvider`, scores each post with heuristics, sorts by score.

## Draft feedback (`src/lib/services/feedback/`)

- **`DraftFeedbackService.ts`** — Produces structured fields from the draft string using rules only (no external models in v0).

## Config and logging

- **`src/lib/config/env.ts`** — Typed `process.env` access including Reddit-related keys for future OAuth.
- **`src/lib/utils/logger.ts`** — Prefixed stdout logging.
- **`src/instrumentation.ts`** — Optional `dotenv` load on the Node runtime.

## Defaults (`src/lib/constants/defaults.ts`)

- **`DEFAULT_FEED_SUBREDDITS`** — Used when `GET /api/opportunities` has no `subreddits` query.

## UI (`src/components/`)

- **`ApiStatus.tsx`** — Fetches `GET /api/health` and displays `service`, `environment`, `dataSource`, and `note`.

## Data (`data/`)

| File | Role |
| --- | --- |
| `recent-posts.json` | Primary seed feed for `JsonDatasetRedditProvider`. |
| `subreddit-snapshots.json` | Illustrative metadata for documentation. |
| `draft-examples.json` | Example strings for manual API checks. |
