# Discussion Companion

A web app for Reddit users who want calmer discovery and structured draft feedback: notice threads that fit your interests, shape what you want to say, then participate on Reddit when you are ready.

## Overview

Discussion Companion is a TypeScript app on **Next.js (App Router)**. **v0** ships with bundled JSON that looks like Reddit posts so ranking, APIs, and UI work end to end without a network dependency. The same service layout will accept a live `RedditContentProvider` when you add account-based reads.

### Client and server in one dev command

`npm run dev` starts Next.js, which serves the React UI and `src/app/api/` route handlers together. The homepage loads `/api/health` so you can see the browser talking to your server on the same origin. Environment values used only in server code are not exposed to the client unless you return them in JSON.

## v0 at a glance

- Landing page plus **sample data pipeline** (`mocks/recent-posts.json` through `JsonDatasetRedditProvider`).
- **Opportunity ranking** and **draft feedback** heuristics behind versioned HTTP routes (`/api/.../sample`).
- **No** live Reddit requests in this build; sign-in and sync are the next engineering milestone.

## Focus

Subreddits the user cares about, ranked thread suggestions, and draft feedback before they post or comment on Reddit.

## Stack

Node.js 20+, Next.js, React, TypeScript, ESLint, Prettier. Deploy like any Node app (for example Vercel).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Try [http://localhost:3000/api/health](http://localhost:3000/api/health).

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Runs the development server. |
| `npm run build` | Creates a production build. |
| `npm run start` | Runs the production server after a build. |
| `npm run lint` | Runs ESLint. |
| `npm run typecheck` | Runs TypeScript with no emit. |

Copy `.env.example` to `.env.local` when you configure OAuth or other secrets for a live provider.

## HTTP API (v0)

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Service metadata, environment, `dataSource: bundled_sample`. |
| `GET` | `/api/opportunities/sample` | Ranked opportunities from `mocks/recent-posts.json`. Optional `?subreddits=test,learnprogramming`. |
| `POST` | `/api/feedback/sample` | JSON `{ "draft": "string", "context"?: string }`. Heuristic structured feedback (no hosted LLM). |

## Repository layout

- `src/app/` — App Router pages and API routes.
- `src/lib/` — Types, config, logging, services (`OpportunityService`, `DraftFeedbackService`, `RedditContentProvider`).
- `mocks/` — Bundled JSON feed and helper fixtures.
- `docs/` — Overview, architecture, modules, HTTP reference, roadmap.

## Roadmap

1. **v0 (now):** sample dataset, HTTP API, landing UI (this repo).
2. **v1:** sign-in and live `RedditContentProvider` for real reads.
3. **v2:** richer relevance UX and draft workspace.
4. **Hardening:** observability, rate limits, privacy documentation.

See [`docs/ROADMAP.md`](docs/ROADMAP.md).

## GitHub

**https://github.com/BrendenMcKee/discussion-companion**

## Documentation

- [`docs/OVERVIEW.md`](docs/OVERVIEW.md): Product summary and what ships in v0.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): System diagram and layers.
- [`docs/MODULES.md`](docs/MODULES.md): `src/lib` and fixture reference.
- [`docs/HTTP_API.md`](docs/HTTP_API.md): Request and response shapes with examples.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): Near-term and later milestones.

## License

MIT. See [`LICENSE`](LICENSE).
