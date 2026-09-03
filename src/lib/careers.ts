import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { getDb, withRetry } from "@/db";
import { jobOpenings as jobOpeningsTable, type JobOpeningRow } from "@/db/schema";
import type { Department, JobOpening, JobType } from "./careers-types";

function rowToJob(row: JobOpeningRow): JobOpening {
  return {
    slug: row.slug,
    title: row.title,
    department: row.department as Department,
    location: row.location,
    type: row.type as JobType,
    experience: row.experience,
    summary: row.summary,
    responsibilities: row.responsibilities,
    requirements: row.requirements,
  };
}

/**
 * Published job openings, newest first. Returns an empty list rather than
 * throwing if the database is unreachable — a transient Neon blip should
 * degrade the careers listing, not take down the page.
 */
export async function getPublishedJobs(): Promise<JobOpening[]> {
  try {
    const rows = await withRetry(() =>
      getDb()
        .select()
        .from(jobOpeningsTable)
        .where(eq(jobOpeningsTable.status, "published"))
        .orderBy(desc(jobOpeningsTable.publishedAt)),
    );

    return rows.map(rowToJob);
  } catch (error) {
    console.error("[careers] Failed to load published jobs:", error);
    return [];
  }
}

export async function getPublishedJob(slug: string): Promise<JobOpening | null> {
  try {
    const [row] = await withRetry(() =>
      getDb()
        .select()
        .from(jobOpeningsTable)
        .where(and(eq(jobOpeningsTable.slug, slug), eq(jobOpeningsTable.status, "published")))
        .limit(1),
    );

    return row ? rowToJob(row) : null;
  } catch (error) {
    console.error(`[careers] Failed to load job "${slug}":`, error);
    return null;
  }
}

export async function getPublishedJobSlugs(): Promise<string[]> {
  try {
    const rows = await withRetry(() =>
      getDb()
        .select({ slug: jobOpeningsTable.slug })
        .from(jobOpeningsTable)
        .where(eq(jobOpeningsTable.status, "published")),
    );

    return rows.map((row) => row.slug);
  } catch (error) {
    console.error("[careers] Failed to load job slugs:", error);
    return [];
  }
}
