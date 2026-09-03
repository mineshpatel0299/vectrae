import type { Metadata } from "next";
import { Suspense } from "react";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogGrid from "@/components/sections/blog/BlogGrid";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import { getPublishedPosts } from "@/lib/blog";
import { categoriesOf } from "@/lib/blog-types";

export const metadata: Metadata = {
  title: "Blog | Vectrae Enterprise Technology Insights",
  description:
    "Practical insights on Audio Visual, Networking & Security, Data Center, Power, and Managed IT, from Vectrae's enterprise technology practice leads.",
};

// Rebuilt on demand by the admin panel via `revalidatePath`, with an hourly
// backstop so a missed revalidation can never strand the listing for long.
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const categories = categoriesOf(posts);

  return (
    <>
      <BlogHero postCount={posts.length} categories={categories} />
      <Suspense fallback={null}>
        <BlogGrid posts={posts} categories={categories} />
      </Suspense>
      <CTA />
      <Footer />
    </>
  );
}
