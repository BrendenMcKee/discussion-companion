# Reddit content provider

Read-only boundary for recent public posts from subreddits the user cares about.

## What ships today

- **`RedditContentProvider`** defines `listRecentPosts` for the opportunity pipeline.
- **`JsonDatasetRedditProvider`** reads `data/recent-posts.json` so the app runs without calling Reddit (local development, tests, and offline use).

## What comes next

- A provider backed by signed-in Reddit reads, same interface.
- Pagination and caching tuned for production traffic.

The JSON file adapter remains useful for fixtures and CI after live read access exists.
