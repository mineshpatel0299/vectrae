"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Odometer from "@/components/ui/Odometer";
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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-bg.png"
          alt="About Vectrae Background"
          fill
          className="object-cover opacity-100"
          priority
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#29B9F2]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Label */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]"
          data-aos="fade-right"
        >
          About Vectrae
        </p>

        {/* Big editorial statement */}
        <h2
          className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-6xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          India&apos;s most trusted full-spectrum{" "}
          <span className="relative inline-block text-[#29B9F2]">
            <span className="relative z-10">enterprise technology</span>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0, backgroundImage: BRAND_GRADIENT }}
              className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm opacity-25 sm:bottom-2 sm:h-4"
            />
          </span>{" "}
          partner.
        </h2>

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
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col lg:px-8 lg:py-2 lg:first:pl-0"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <Odometer
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl font-bold text-white sm:text-5xl"
                />
                <span className="mt-1 max-w-[120px] text-xs font-semibold uppercase leading-snug tracking-wider text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mission pull-quote — right side */}
          <div
            className="lg:max-w-xs lg:pb-2 lg:pl-12"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <p className="border-l border-[#29B9F2]/40 pl-5 text-sm leading-relaxed text-white/50">
              Delivering the right solutions, the right partners, and the right outcomes — from initial consultation through long-term managed support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
