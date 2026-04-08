# HTTP API

v0 routes run on the same origin as the UI. Local base URL: `http://localhost:3000`.

## `GET /api/health`

JSON metadata for the running instance.

**Example response**

```json
{
  "ok": true,
  "service": "discussion-companion",
  "environment": "development",
  "dataSource": "bundled_sample",
  "note": "v0 build using bundled sample Reddit-shaped data. Live account sync is on the roadmap."
}
```

## `GET /api/opportunities/sample`

Returns ranked discussion opportunities built from `mocks/recent-posts.json`. Responses use `source: sample`.

**Query parameters**

| Name | Required | Description |
| --- | --- | --- |
| `subreddits` | No | Comma-separated names without `r/`. Defaults: `src/lib/constants/defaults.ts`. |

**Example**

```http
GET /api/opportunities/sample?subreddits=test,learnprogramming
```

**Response shape** (abbreviated)

```json
{
  "source": "sample",
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

## `POST /api/feedback/sample`

Heuristic feedback on a draft. Responses use `source: sample`.

**Request body**

```json
{
  "draft": "Your draft text here.",
  "context": "optional string, e.g. post vs comment"
}
```

**Example**

```bash
curl -s -X POST http://localhost:3000/api/feedback/sample \
  -H "Content-Type: application/json" \
  -d "{\"draft\":\"Hello world\"}"
```

**Response shape** (abbreviated)

```json
{
  "source": "sample",
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
