# HTTP API

Routes are served by Next.js route handlers on the same origin as the UI. Local base URL: `http://localhost:3000`.

## `GET /api/health`

JSON metadata for the running instance.

**Example response**

```json
{
  "ok": true,
  "service": "discussion-companion",
  "environment": "development",
  "dataSource": "bundled_feed",
  "note": "v0 uses a bundled static feed in-repo. Signed-in Reddit sync is the next milestone."
}
```

## `GET /api/opportunities`

Returns ranked discussion opportunities from `data/recent-posts.json`. In v0 the JSON body includes `source: "bundle"` to mark the bundled seed feed.

**Query parameters**

| Name | Required | Description |
| --- | --- | --- |
| `subreddits` | No | Comma-separated names without `r/`. Defaults: `src/lib/constants/defaults.ts`. |

**Example**

```http
GET /api/opportunities?subreddits=test,learnprogramming
```

**Response shape** (abbreviated)

```json
{
  "source": "bundle",
  "generatedAt": "2026-04-08T12:00:00.000Z",
  "opportunities": [
    {
      "subreddit": "test",
      "postTitle": "...",
      "postUrl": "https://www.reddit.com/...",
      "reasonRelevant": "...",
      "relevanceScore": 0.47,
      "createdAt": "2026-04-01T14:22:00.000Z"
    }
  ]
}
```

## `POST /api/feedback`

Structured heuristic feedback on a draft. v0 responses use `source: "bundle"`.

**Request body**

```json
{
  "draft": "Your draft text here.",
  "context": "optional string, e.g. post vs comment"
}
```

**Example**

```bash
curl -s -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d "{\"draft\":\"Hello world\"}"
```

**Response shape** (abbreviated)

```json
{
  "source": "bundle",
  "draftLength": 11,
  "feedback": {
    "clarity": "...",
    "specificity": "...",
    "tone": "...",
    "communityFit": "...",
    "suggestedImprovements": ["..."],
    "finalNote": "..."
  }
}
```

**Errors**

- `400` if the body is not JSON or `draft` is not a string.
