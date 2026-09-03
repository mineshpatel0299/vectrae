/**
 * One-time migration of the static openings in `src/data/careers.ts` into the
 * `job_openings` table, published immediately (they were already live).
 *
 * Safe to re-run: existing slugs are skipped, so postings already edited in
 * the admin panel are never clobbered. Pass `--force` to overwrite them anyway.
 *
 *   npm run db:seed-careers
 *   npm run db:seed-careers -- --force
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { jobOpenings as jobOpeningsTable } from "../src/db/schema";
import { seedJobOpenings } from "../src/data/careers";

const force = process.argv.includes("--force");

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` first.");
  }

  const db = drizzle(neon(connectionString));

  console.log(`Seeding ${seedJobOpenings.length} job openings${force ? " (force overwrite)" : ""}…`);

  let inserted = 0;
  let skipped = 0;

  for (const job of seedJobOpenings) {
    const values = {
      slug: job.slug,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      summary: job.summary,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      status: "published" as const,
      publishedAt: new Date(),
      updatedAt: new Date(),
    };

    const query = db.insert(jobOpeningsTable).values(values);

    const result = force
      ? await query
          .onConflictDoUpdate({ target: jobOpeningsTable.slug, set: values })
          .returning({ slug: jobOpeningsTable.slug })
      : await query.onConflictDoNothing().returning({ slug: jobOpeningsTable.slug });

    if (result.length > 0) {
      inserted += 1;
      console.log(`  + ${job.slug}`);
    } else {
      skipped += 1;
      console.log(`  = ${job.slug} (already present, left untouched)`);
    }
  }

  console.log(`\nDone. ${inserted} written, ${skipped} skipped.`);
}

main().catch((error) => {
  console.error("\nSeed failed:", error);
  process.exit(1);
});
