"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { blogCategories, blogPosts } from "@/data/blogPosts";
import { categoryIcons, DEFAULT_CATEGORY_ICON } from "@/lib/blogCategoryIcon";

const ALL = "All";

export default function BlogGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory && blogCategories.includes(initialCategory) ? initialCategory : ALL,
  );

  function selectCategory(category: string) {
    setActiveCategory(category);
    const query = category === ALL ? "" : `?category=${encodeURIComponent(category)}`;
    router.replace(`/blog${query}`, { scroll: false });
  }

  const filtered = useMemo(
    () => (activeCategory === ALL ? blogPosts : blogPosts.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  const featured = filtered.find((p) => p.featured) ?? null;
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute bottom-0 right-0 h-150 w-150 translate-x-1/3 translate-y-1/3 rounded-full bg-[#25D9C7]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => selectCategory(ALL)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeCategory === ALL
                ? "bg-black text-white"
                : "border border-black/10 bg-black/5 text-neutral-600 hover:border-black/20 hover:text-neutral-900"
            }`}
          >
            All Articles
          </button>
          {blogCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "border border-black/10 bg-black/5 text-neutral-600 hover:border-black/20 hover:text-neutral-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative mt-10 flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-neutral-50 shadow-sm transition duration-500 hover:border-black/20 hover:shadow-md lg:flex-row"
          >
            <div className="relative h-64 w-full overflow-hidden lg:h-auto lg:w-1/2">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: featured.color,
                    borderColor: `${featured.color}40`,
                    backgroundColor: `${featured.color}10`,
                  }}
                >
                  Featured
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  {featured.category}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold leading-snug text-neutral-900 transition duration-300 group-hover:text-[#0f9ac9] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                {featured.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-black/10 pt-6 text-xs font-medium text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[10px] font-bold text-neutral-700">
                    {featured.author.initials}
                  </span>
                  <span>{featured.author.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {featured.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-neutral-900 transition group-hover:gap-2.5">
                  Read Article
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => {
            const CategoryIcon = categoryIcons[post.category] ?? DEFAULT_CATEGORY_ICON;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative h-full">
                <SpotlightCard className="flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition duration-500 hover:border-black/20 hover:shadow-md">
                  <div className="relative h-52 w-full overflow-hidden border-b border-black/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span
                      className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
                      style={{
                        color: post.color,
                        borderColor: `${post.color}40`,
                        backgroundColor: `${post.color}15`,
                      }}
                    >
                      <CategoryIcon className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <h3 className="text-lg font-semibold leading-snug text-neutral-900 transition duration-300 group-hover:text-[#0f9ac9]">
                      {post.title}
                    </h3>

                    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-xs font-medium text-neutral-500">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[9px] font-bold text-neutral-600">
                          {post.author.initials}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </div>

        {rest.length === 0 && !featured && (
          <p className="mt-16 text-center text-sm text-neutral-400">
            No articles in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
