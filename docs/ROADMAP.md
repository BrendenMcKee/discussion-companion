# Roadmap

## v0 (current)

- Next.js app with landing page and live `/api/health` check from the client.
- `JsonDatasetRedditProvider` plus `data/recent-posts.json` for a bundled static feed.
- Opportunity ranking and draft feedback at `GET /api/opportunities` and `POST /api/feedback`.

## v1

- User **sign-in** and a **live** `RedditContentProvider` (OAuth or your chosen model).
- Read path scoped to subreddits the user selects.
- Basic screens for opportunity lists and draft editing beyond the landing page.

## Later

- Clearer relevance controls and user-visible ranking signals.
- Observability, rate limiting, and published privacy practices.
- Persistence when there is a concrete product need (still none required for v0).
