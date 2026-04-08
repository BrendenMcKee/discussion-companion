# Reddit content provider

Read-only boundary for recent public posts from subreddits the user cares about.

## What ships today

- **`RedditContentProvider`** defines `listRecentPosts` for the opportunity pipeline.
- **`JsonDatasetRedditProvider`** reads `mocks/recent-posts.json` so the app runs fully offline and in tests.

## What comes next

- A provider backed by signed-in Reddit reads (OAuth or your chosen auth), same interface.
- Pagination and caching tuned for production traffic.

The bundled JSON adapter stays useful for demos, fixtures, and CI without hitting the network.
