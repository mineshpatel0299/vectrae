import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof createDb>;

function createDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Run `vercel env pull .env.local` after provisioning Neon.",
    );
  }

  return drizzle(neon(connectionString), { schema });
}

// Lazy singleton: `neon()` throws without DATABASE_URL, and Next evaluates
// top-level module code at build time, so the client must not be constructed
// on import. A plain function is used deliberately instead of a Proxy wrapper.
let cached: Db | null = null;

export function getDb(): Db {
  if (!cached) {
    cached = createDb();
  }

  return cached;
}

/**
 * Connection-level failures — the request never reached Postgres, so no query
 * ran. These are distinct from SQL errors (constraint violations, syntax), which
 * would fail identically on every attempt and must not be retried.
 */
const TRANSIENT_SIGNATURES = [
  "fetch failed",
  "Error connecting to database",
  "ETIMEDOUT",
  "ECONNRESET",
  "ECONNREFUSED",
  "EAI_AGAIN",
  "socket hang up",
  "network",
];

function isTransient(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  // The useful signal is often on `cause` rather than the top-level message.
  const haystack = `${error.message} ${String(error.cause ?? "")}`;

  return TRANSIENT_SIGNATURES.some((signature) => haystack.includes(signature));
}

/**
 * Retries an operation across transient connection failures.
 *
 * Neon is reached over HTTPS, and a dropped connection surfaces as a generic
 * `fetch failed` rather than a database error. Since the query never executed,
 * replaying it is safe. Anything that looks like a real SQL error is rethrown
 * immediately.
 */
export async function withRetry<T>(operation: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isTransient(error) || attempt === attempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 120 * 2 ** (attempt - 1)));
    }
  }

  throw lastError;
}

export { schema };
