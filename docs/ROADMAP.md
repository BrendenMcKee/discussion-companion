# Roadmap

## v0 (current)

- Next.js app with landing page and live `/api/health` check from the client.
- `JsonDatasetRedditProvider` plus `mocks/recent-posts.json` for offline-friendly data.
- Opportunity ranking and draft feedback exposed as `/api/opportunities/sample` and `/api/feedback/sample`.

## v1

- User **sign-in** and a **live** `RedditContentProvider` (OAuth or your chosen model).
- Read path scoped to subreddits the user selects.
- Basic screens for opportunity lists and draft editing beyond the landing page.

## Later

- Clearer relevance controls and user-visible ranking signals.
- Observability, rate limiting, and published privacy practices.
- Persistence when there is a concrete product need (still none required for v0).
