/**
 * Shared blog shapes. Safe to import from client components (types are erased,
 * and the helpers here are pure) — the database access lives in `src/lib/blog.ts`.
 */

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Human-formatted publish date, e.g. "March 12, 2026". */
  date: string;
  readTime: string;
  color: string;
  image: string;
  featured?: boolean;
  author: BlogAuthor;
  tags: string[];
  content: BlogBlock[];
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export { slugifyTitle } from "./slug";

export function categoriesOf(posts: BlogPost[]): string[] {
  return Array.from(new Set(posts.map((post) => post.category)));
}

export function formatPostDate(value: Date | null): string {
  if (!value) {
    return "Unpublished";
  }

  return value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Rough reading-time estimate from the block content, at ~200 wpm. */
export function estimateReadTime(content: BlogBlock[]): string {
  const words = content.reduce((total, block) => {
    const text =
      block.type === "list" ? block.items.join(" ") : `${block.text} ${"attribution" in block ? block.attribution ?? "" : ""}`;

    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);

  return `${Math.max(1, Math.round(words / 200))} min read`;
}
