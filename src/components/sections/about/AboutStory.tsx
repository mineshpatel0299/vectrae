"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND_GRADIENT } from "@/lib/brand";

const chapters = [
  {
    n: "01",
    kicker: "The Foundation",
    title: "A specialist AV integrator.",
    body: "Vectrae began by engineering precision boardrooms and command centres for enterprise clients across Delhi NCR.",
  },
  {
    n: "02",
    kicker: "The Expansion",
    title: "Into Networking & Security.",
    body: "As client needs grew, so did we — building the resilient, secure infrastructure enterprises depend on every day.",
  },
  {
    n: "03",
    kicker: "The Scale",
    title: "Data Center. End Computing. Power.",
    body: "One partner, every layer — from the server room to the boardroom, delivered PAN-India.",
  },
  {
    n: "04",
    kicker: "Today",
    title: "A full-spectrum partner.",
    body: "25+ years. 250+ certified experts. 2,300+ enterprises trust Vectrae with their technology backbone.",
  },
];

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(chapters.length - 1) * 100}%`]);
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
                  {c.n} — {c.kicker}
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
          <motion.div style={{ width: railWidth, backgroundImage: BRAND_GRADIENT }} className="h-full" />
        </div>
      </div>
    </section>
  );
}
