import "server-only";

import { getDb, withRetry } from "@/db";
import { blogPosts } from "@/db/schema";

const FALLBACK = [
  "Audio Visual",
  "Networking & Security",
  "Data Center",
  "Power & Cooling",
  "Managed IT",
];

/** Existing categories, so the editor can suggest rather than force free text. */
export async function getBlogCategories(): Promise<string[]> {
  try {
    const rows = await withRetry(() =>
      getDb().selectDistinct({ category: blogPosts.category }).from(blogPosts),
    );

    const found = rows.map((row) => row.category).filter(Boolean).sort();

    return found.length > 0 ? found : FALLBACK;
  } catch (error) {
    console.error("[admin] Failed to load categories:", error);
    return FALLBACK;
  }
}
