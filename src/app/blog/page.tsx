import type { Metadata } from "next";
import { Suspense } from "react";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogGrid from "@/components/sections/blog/BlogGrid";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Blog | Vectrae Enterprise Technology Insights",
  description:
    "Practical insights on Audio Visual, Networking & Security, Data Center, Power, and Managed IT, from Vectrae's enterprise technology practice leads.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <Suspense fallback={null}>
        <BlogGrid />
      </Suspense>
      <CTA />
      <Footer />
    </>
  );
}
