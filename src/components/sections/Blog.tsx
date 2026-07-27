"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { BRAND_GRADIENT } from "@/lib/brand";

type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  href: string;
  color: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "av-tech-2026",
    title: "Top 10 AV Technologies for Enterprise Meeting Rooms in 2026",
    category: "Audio Visual",
    date: "March 12, 2026",
    readTime: "6 min read",
    href: "#",
    color: "#29B9F2",
  },
  {
    id: "managed-it",
    title: "Why Every Enterprise Needs a Managed IT Services Provider",
    category: "Managed Services",
    date: "March 08, 2026",
    readTime: "5 min read",
    href: "#",
    color: "#25D9C7",
  },
  {
    id: "teams-vs-zoom",
    title: "Microsoft Teams Rooms vs Zoom Rooms — Which Is Right for Your Enterprise?",
    category: "Collaboration",
    date: "March 02, 2026",
    readTime: "8 min read",
    href: "#",
    color: "#29B9F2",
  },
  {
    id: "choose-ups",
    title: "How to Choose the Right UPS for Your Data Center",
    category: "Power Solutions",
    date: "February 25, 2026",
    readTime: "7 min read",
    href: "#",
    color: "#25D9C7",
  },
  {
    id: "network-security",
    title: "5 Signs Your Enterprise Network Needs a Security Overhaul",
    category: "Networking & Security",
    date: "February 18, 2026",
    readTime: "5 min read",
    href: "#",
    color: "#29B9F2",
  },
  {
    id: "dc-decision",
    title: "Greenfield vs Brownfield Data Center — Decision Guide",
    category: "Data Center",
    date: "February 10, 2026",
    readTime: "9 min read",
    href: "#",
    color: "#25D9C7",
  },
];

export default function Blog() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32">
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#29B9F2]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-150 w-150 translate-x-1/3 translate-y-1/3 rounded-full bg-[#25D9C7]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            Industry Insights
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Latest from Vectrae
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Stay updated with the latest trends, technologies, and strategies driving modern enterprise IT infrastructure.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, i) => (
            <div
              key={post.id}
              className="group relative h-full"
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 100, 300)}
            >
              <SpotlightCard className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition duration-500 hover:border-white/20 hover:bg-white/[0.04]">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        color: post.color,
                        borderColor: `${post.color}40`,
                        backgroundColor: `${post.color}10`,
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold leading-snug text-white transition duration-300 group-hover:text-[#29B9F2]">
                    <Link href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 text-xs font-medium text-white/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center" data-aos="fade-up" data-aos-delay="400">
          <Link
            href="/blog"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
          >
            <span>View All Articles</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
