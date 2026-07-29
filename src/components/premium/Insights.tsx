"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Reveal from "./Reveal";

const posts = [
  {
    id: "av-tech-2026",
    title: "Top 10 AV Technologies for Enterprise Meeting Rooms in 2026",
    category: "Audio Visual",
    date: "March 12, 2026",
    readTime: "6 min read",
    color: "#29B9F2",
  },
  {
    id: "managed-it",
    title: "Why Every Enterprise Needs a Managed IT Services Provider",
    category: "Managed Services",
    date: "March 08, 2026",
    readTime: "5 min read",
    color: "#25D9C7",
  },
  {
    id: "teams-vs-zoom",
    title: "Microsoft Teams Rooms vs Zoom Rooms — Which Is Right for Your Enterprise?",
    category: "Collaboration",
    date: "March 02, 2026",
    readTime: "8 min read",
    color: "#29B9F2",
  },
  {
    id: "choose-ups",
    title: "How to Choose the Right UPS for Your Data Center",
    category: "Power Solutions",
    date: "February 25, 2026",
    readTime: "7 min read",
    color: "#25D9C7",
  },
  {
    id: "network-security",
    title: "5 Signs Your Enterprise Network Needs a Security Overhaul",
    category: "Networking & Security",
    date: "February 18, 2026",
    readTime: "5 min read",
    color: "#29B9F2",
  },
  {
    id: "dc-decision",
    title: "Greenfield vs Brownfield Data Center — Decision Guide",
    category: "Data Center",
    date: "February 10, 2026",
    readTime: "9 min read",
    color: "#25D9C7",
  },
];

export default function Insights() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#29B9F2]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
              Industry Insights
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Latest from Vectrae
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scrollbar-none pb-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post, i) => (
            <motion.div
              data-card
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
              className="w-80 shrink-0 snap-start sm:w-96"
            >
              <Link
                href="#"
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/2 p-8 transition duration-500 hover:border-white/20 hover:bg-white/4"
              >
                <div>
                  <span
                    className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: post.color, borderColor: `${post.color}40`, backgroundColor: `${post.color}10` }}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold leading-snug text-white transition duration-300 group-hover:text-[#29B9F2]">
                    {post.title}
                  </h3>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6 text-xs font-medium text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
