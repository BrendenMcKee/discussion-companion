import { ApiStatus } from "@/components/ApiStatus";

export default function HomePage() {
  return (
    <main>
      <span className="badge">v0 · bundled static feed</span>
      <h1>Discussion Companion</h1>
      <p className="muted">
        Surface discussion ideas from <strong>user-selected subreddits</strong> and
        get structured feedback while you draft posts or comments.
      </p>

      <h2>This release</h2>
      <p>
        Discussion Companion v0 runs as a Next.js web app with a bundled JSON
        feed shaped like Reddit posts, ranking and draft feedback on the server,
        and a small UI.{" "}
        <strong>Authenticated Reddit read access is not in this build.</strong>{" "}
        The next milestone is a <code>RedditContentProvider</code> that calls
        Reddit&apos;s Data API with a registered OAuth token, scoped to recent
        public content from user-selected subreddits.
      </p>

      <h2>Server API from the browser</h2>
      <p className="muted">
        The panel below calls <code>GET /api/health</code> on the same host. Route
        handlers run on the server, so secrets and server-only logic stay off the
        client bundle.
      </p>
      <ApiStatus />

      <h2>Product direction</h2>
      <ul>
        <li>Highlight recent public threads from subreddits the user selects</li>
        <li>Rank discussion opportunities from user-selected subreddits</li>
        <li>Iterate on drafts with structured feedback before posting on Reddit</li>
      </ul>

      <h2>HTTP API (v0)</h2>
      <p className="muted">
        These routes back the v0 product surface. Responses include{" "}
        <code>source: &quot;bundle&quot;</code> when built from the on-disk seed
        feed; that field will distinguish authenticated read responses later.
      </p>
      <ul>
        <li>
          <code>GET /api/health</code>: service metadata
        </li>
        <li>
          <code>GET /api/opportunities</code>: ranked opportunities
        </li>
        <li>
          <code>POST /api/feedback</code>: JSON body{" "}
          <code>{`{ "draft": "..." }`}</code>
        </li>
      </ul>

      <p className="muted">
        See <code>README.md</code> and <code>docs/</code> for architecture and API
        details.
      </p>
    </main>
  );
}
