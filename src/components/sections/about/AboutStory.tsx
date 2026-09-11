"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND_GRADIENT } from "@/lib/brand";

const chapters = [
  {
    n: "01",
    kicker: "The Foundation",
    title: "A simple premise.",
    body: "Founded in 2014 on the belief that businesses don't want to think about their IT infrastructure, as long as it works, we're an IT infrastructure company based in Delhi, built to source, deploy, secure, and maintain the technology that forms the backbone of the enterprises we serve.",
  },
  {
    n: "02",
    kicker: "The Growth",
    title: "From Nehru Place, outward.",
    body: "The start-up team has grown from a small unit based out of Nehru Place to a full-fledged organization, partnering with some of the world's most recognizable tech brands to get things done, while staying accessible and reactive to client demands.",
  },
  {
    n: "03",
    kicker: "The Reach",
    title: "One partner, every layer.",
    body: "From end-devices to data centers, our verticals are built around the full lifecycle of enterprise IT infrastructure, so our clients don't have to deal with the fragmented ecosystem that comes with working with multiple vendors.",
  },
  {
    n: "04",
    kicker: "Today",
    title: "A full-spectrum partner.",
    body: "More than a decade later, the philosophy remains the same: a deep, hands-on, client-centric approach to infrastructure, backed by a team of 250+ professionals and an annual turnover of over ₹400 crores.",
  },
];

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(chapters.length - 1) * 100}%`],
  );
  const railWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${chapters.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden border-t border-black/5">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#84D96C]/8 blur-[150px]" />

        <p className="absolute left-6 top-10 z-10 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:left-10">
          Our Story
        </p>
        <p className="absolute right-6 top-10 z-10 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:right-10">
          {String(chapters.length).padStart(2, "0")} Chapters
        </p>

        <motion.div style={{ x }} className="flex h-full">
          {chapters.map((c) => (
            <div
              key={c.n}
              className="relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[14rem] font-bold leading-none text-black/4 sm:text-[24rem]"
              >
                {c.n}
              </span>
              <div className="relative max-w-2xl">
                <span
                  className="bg-clip-text text-sm font-semibold uppercase tracking-[0.25em] text-transparent"
                  style={{ backgroundImage: BRAND_GRADIENT }}
                >
                  {c.n}, {c.kicker}
                </span>
                <h3 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-6xl">
                  {c.title}
                </h3>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-10 left-1/2 z-10 h-px w-48 -translate-x-1/2 bg-black/10 sm:w-64">
          <motion.div
            style={{ width: railWidth, backgroundImage: BRAND_GRADIENT }}
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
}
