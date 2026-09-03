/**
 * Creates (or updates the password of) an admin panel user.
 *
 *   npm run admin:create -- --email you@vectrae.com --name "Your Name" --role owner
 *
 * Omit --password to have a strong one generated and printed once. Re-running
 * for an existing email resets that user's password and revokes their sessions.
 */
import { randomBytes } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, sql } from "drizzle-orm";
import { adminUsers } from "../src/db/schema";
import { describePasswordProblem, hashPassword } from "../src/lib/admin/password";

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

function generatePassword(): string {
  // base64url of 18 bytes: 24 chars, mixed case + digits, satisfies the policy.
  return `${randomBytes(18).toString("base64url")}Aa1`;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` first.");
  }

  const email = arg("email")?.trim().toLowerCase();
  const name = arg("name")?.trim();
  const role = (arg("role") ?? "owner").trim();

  if (!email || !name) {
    throw new Error('Usage: npm run admin:create -- --email you@vectrae.com --name "Your Name" [--role owner|admin|editor] [--password ...]');
  }

  if (!["owner", "admin", "editor"].includes(role)) {
    throw new Error(`Invalid role "${role}". Use owner, admin, or editor.`);
  }

  const provided = arg("password");
  const password = provided ?? generatePassword();
  const problem = describePasswordProblem(password);

  if (problem) {
    throw new Error(problem);
  }

  const db = drizzle(neon(connectionString));
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(adminUsers)
    .values({ email, name, role, passwordHash })
    .onConflictDoUpdate({
      target: adminUsers.email,
      set: {
        name,
        role,
        passwordHash,
        // Invalidate any session issued against the old password.
        sessionVersion: sql`${adminUsers.sessionVersion} + 1`,
      },
    })
    .returning({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role });

  console.log(`\n✓ Admin user ready: ${user.email} (${user.role})`);

  if (!provided) {
    console.log(`\n  Password: ${password}`);
    console.log("  Save it now — it is not stored anywhere in readable form.\n");
  }

  console.log("Sign in at /admin/login\n");
}

main().catch((error) => {
  console.error("\nFailed to create admin user:", error instanceof Error ? error.message : error);
  process.exit(1);
});
