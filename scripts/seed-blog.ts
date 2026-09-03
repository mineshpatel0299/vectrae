/**
 * One-time migration of the static posts in `src/data/blogPosts.ts` into the
 * `blog_posts` table.
 *
 * Safe to re-run: existing slugs are skipped, so posts already edited in the
 * admin panel are never clobbered. Pass `--force` to overwrite them anyway.
 *
 *   npm run db:seed
 *   npm run db:seed -- --force
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts as blogPostsTable } from "../src/db/schema";
import { blogPosts } from "../src/data/blogPosts";

const force = process.argv.includes("--force");

function parsePublishedAt(value: string): Date {
  const parsed = new Date(`${value} UTC`);

  if (Number.isNaN(parsed.getTime())) {
    console.warn(`  ! Unparseable date "${value}", falling back to now.`);
    return new Date();
  }

  return parsed;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` first.");
  }

  const db = drizzle(neon(connectionString));

  console.log(`Seeding ${blogPosts.length} posts${force ? " (force overwrite)" : ""}…`);

  let inserted = 0;
  let skipped = 0;

  for (const post of blogPosts) {
    const values = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readTime,
      color: post.color,
      image: post.image,
      featured: post.featured ?? false,
      status: "published" as const,
      authorName: post.author.name,
      authorRole: post.author.role,
      authorInitials: post.author.initials,
      tags: post.tags,
      content: post.content,
      publishedAt: parsePublishedAt(post.date),
      updatedAt: new Date(),
    };

    const query = db.insert(blogPostsTable).values(values);

    const result = force
      ? await query
          .onConflictDoUpdate({ target: blogPostsTable.slug, set: values })
          .returning({ slug: blogPostsTable.slug })
      : await query.onConflictDoNothing().returning({ slug: blogPostsTable.slug });

    if (result.length > 0) {
      inserted += 1;
      console.log(`  + ${post.slug}`);
    } else {
      skipped += 1;
      console.log(`  = ${post.slug} (already present, left untouched)`);
    }
  }

  console.log(`\nDone. ${inserted} written, ${skipped} skipped.`);
}

main().catch((error) => {
  console.error("\nSeed failed:", error);
  process.exit(1);
});
