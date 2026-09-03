import "server-only";

import { and, desc, eq, ne } from "drizzle-orm";
import { getDb, withRetry } from "@/db";
import { blogPosts as blogPostsTable, type BlogPostRow } from "@/db/schema";
import { formatPostDate, type BlogPost } from "./blog-types";
import { siteImages } from "./site-images";

// `next/image` throws on an empty `src`, so a post saved without a cover still
// needs something to render.
const FALLBACK_COVER: string = siteImages.blog.avTech;

export function rowToPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: formatPostDate(row.publishedAt),
    readTime: row.readTime,
    color: row.color,
    image: row.image || FALLBACK_COVER,
    featured: row.featured,
    author: {
      name: row.authorName,
      role: row.authorRole,
      initials: row.authorInitials,
    },
    tags: row.tags,
    content: row.content,
  };
}

/**
 * Published posts, newest first. Returns an empty list rather than throwing if
 * the database is unreachable — a transient Neon blip should degrade the blog
 * listing, not take down the marketing site.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const rows = await withRetry(() =>
      getDb()
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.status, "published"))
        .orderBy(desc(blogPostsTable.publishedAt)),
    );

    return rows.map(rowToPost);
  } catch (error) {
    console.error("[blog] Failed to load published posts:", error);
    return [];
  }
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  try {
    const [row] = await withRetry(() =>
      getDb()
        .select()
        .from(blogPostsTable)
        .where(and(eq(blogPostsTable.slug, slug), eq(blogPostsTable.status, "published")))
        .limit(1),
    );

    return row ? rowToPost(row) : null;
  } catch (error) {
    console.error(`[blog] Failed to load post "${slug}":`, error);
    return null;
  }
}

export async function getPublishedSlugs(): Promise<string[]> {
  try {
    const rows = await withRetry(() =>
      getDb()
        .select({ slug: blogPostsTable.slug })
        .from(blogPostsTable)
        .where(eq(blogPostsTable.status, "published")),
    );

    return rows.map((row) => row.slug);
  } catch (error) {
    console.error("[blog] Failed to load slugs:", error);
    return [];
  }
}

/** Same-category posts first, then the rest, excluding the current post. */
export async function getRelatedPosts(
  slug: string,
  category: string,
  limit = 3,
): Promise<BlogPost[]> {
  try {
    const rows = await withRetry(() =>
      getDb()
        .select()
        .from(blogPostsTable)
        .where(and(eq(blogPostsTable.status, "published"), ne(blogPostsTable.slug, slug)))
        .orderBy(desc(blogPostsTable.publishedAt)),
    );

    const posts = rows.map(rowToPost);
    const sameCategory = posts.filter((post) => post.category === category);
    const rest = posts.filter((post) => post.category !== category);

    return [...sameCategory, ...rest].slice(0, limit);
  } catch (error) {
    console.error(`[blog] Failed to load related posts for "${slug}":`, error);
    return [];
  }
}
