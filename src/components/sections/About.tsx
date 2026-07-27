"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import StatCounter from "@/components/ui/StatCounter";
import Reveal from "@/components/ui/Reveal";
import { BRAND_GRADIENT } from "@/lib/brand";
import { stats } from "@/data/stats";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/5 bg-black py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#29B9F2]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Label */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]">
            About Vectrae
          </p>
        </Reveal>

        {/* Big editorial statement */}
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-6xl">
            India&apos;s most trusted full-spectrum{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              enterprise technology
            </span>{" "}
            partner.
          </h2>
        </Reveal>

        {/* Animated horizontal rule */}
        <div className="relative mt-10 h-px w-full bg-white/8">
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-0 top-0 h-px bg-gradient-to-r from-[#29B9F2] to-[#25D9C7]"
          />
        </div>

        {/* Stats row + mission — single clean row */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-0">

          {/* Stats — 4-col grid, consistent alignment */}
          <div className="grid grid-cols-2 gap-x-0 gap-y-8 lg:flex lg:flex-1 lg:divide-x lg:divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col lg:px-8 lg:py-2 lg:first:pl-0">
                <span
                  className="bg-clip-text text-4xl font-bold tabular-nums text-transparent sm:text-5xl"
                  style={{ backgroundImage: BRAND_GRADIENT }}
                >
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 max-w-[120px] text-xs font-semibold uppercase leading-snug tracking-wider text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mission pull-quote — right side */}
          <Reveal delay={0.2} className="lg:max-w-xs lg:pb-2 lg:pl-12">
            <p className="border-l border-[#29B9F2]/40 pl-5 text-sm leading-relaxed text-white/50">
              Delivering the right solutions, the right partners, and the right outcomes — from initial consultation through long-term managed support.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
