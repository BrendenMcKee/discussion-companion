/**
 * Typed view of environment variables. Reddit keys are optional until a live
 * provider and OAuth (or other auth) are wired up.
 */
export const env = {
  port: process.env.PORT ?? "3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
  redditClientId: process.env.REDDIT_CLIENT_ID,
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET,
  redditUserAgent: process.env.REDDIT_USER_AGENT,
  redditRedirectUri: process.env.REDDIT_REDIRECT_URI,
} as const;
