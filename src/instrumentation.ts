/**
 * Optional dotenv load for local development (Next.js also loads .env* automatically).
 * Keeps the `dotenv` dependency exercised for future scripts and non-Next tooling.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { config } = await import("dotenv");
    config({ path: ".env.local" });
    config();
  }
}
