"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { industries } from "@/data/industries";

const AUTO_ADVANCE_MS = 4500;

export default function IndustriesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = industries[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-[#f5f5f0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]">
            Nine Verticals
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            Technology matched to your industry
          </h2>
        </div>

        <div
          className="mt-16 grid gap-3 lg:grid-cols-[300px_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* List */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              const isActive = i === activeIndex;
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left shadow-sm transition-colors duration-300 lg:shrink ${
                    isActive ? "bg-black" : "bg-white hover:bg-black/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="industry-active-bar"
                      className="absolute inset-y-0 left-0 w-1"
                      style={{ backgroundImage: BRAND_GRADIENT }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-white/10 text-[#29B9F2]" : "bg-black/5 text-neutral-400 group-hover:text-neutral-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm font-semibold lg:whitespace-normal ${
                      isActive ? "text-white" : "text-neutral-700"
                    }`}
                  >
                    {industry.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Stage */}
          <Link
            href={`/industries/${active.slug}`}
            className="group relative block min-h-[440px] overflow-hidden rounded-3xl bg-black p-8 sm:p-14"
          >
            <span className="pointer-events-none absolute -right-4 -top-12 select-none text-[200px] font-bold leading-none text-white/[0.04] sm:text-[260px]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D9C7]/10 blur-[120px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col justify-between"
              >
                <div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#29B9F2] transition-transform duration-500 group-hover:scale-105">
                    <ActiveIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">{active.title}</h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-white/50">
                    {active.headline}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.focusAreas.slice(0, 3).map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  style={{ backgroundImage: BRAND_GRADIENT }}
                  className="mt-10 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 group-hover:gap-3 group-hover:shadow-[0_8px_30px_rgba(37,217,199,0.35)]"
                >
                  Explore {active.title}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute bottom-8 right-8 flex items-center gap-1.5 sm:bottom-14 sm:right-14">
              {industries.map((industry, i) => (
                <span
                  key={industry.slug}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "w-6 bg-[#25D9C7]" : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
