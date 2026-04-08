# Overview

Discussion Companion is a browser app for people who use Reddit a lot. It surfaces discussion threads from **user-selected subreddits** and gives structured feedback while you draft, away from the default feed.

**v0** is a full vertical slice: UI, HTTP API, ranking, and draft analysis running on a **bundled static feed** (`data/recent-posts.json`) that mirrors Reddit post shape. That keeps demos and local work deterministic. A later release swaps in authenticated Reddit read access behind the same provider interface.

## What ships in v0

- **Homepage** (`src/app/page.tsx`) and **global styles**.
- **API routes** for health, opportunities, and draft feedback (`src/app/api/`).
- **Services** for opportunity scoring and draft heuristics (`src/lib/services/`).
- **`RedditContentProvider`** with **`JsonDatasetRedditProvider`**, which reads `data/recent-posts.json`.

## Tech stack

Next.js App Router, React, TypeScript, ESLint, Prettier. One dev server serves UI and API together.

## Product shape

A **standalone companion**: you use it alongside Reddit on your own terms. The app centers on **discovery and drafting**, not bulk automation or a shared operator account.

Repository paths are summarized in the root `README.md` under **Repository layout**.
