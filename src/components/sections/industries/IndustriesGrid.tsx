"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Users,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { industries } from "@/data/industries";

const AUTO_ADVANCE_MS = 4500;

const featureIcons = [Users, ShieldCheck, MonitorSmartphone];

export default function IndustriesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = industries[activeIndex];
  const ActiveIcon = active.icon;

  // ---- mobile carousel refs ----
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const scrollSettleTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [paused]);

  // Keep the carousel scrolled to whichever card is active (covers
  // autoplay advancing while off-screen, and dot-click navigation).
  useEffect(() => {
    const card = cardRefs.current[activeIndex];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  function handleCarouselScroll() {
    setPaused(true);
    if (scrollSettleTimeout.current) clearTimeout(scrollSettleTimeout.current);

    scrollSettleTimeout.current = setTimeout(() => {
      const el = carouselRef.current;
      if (!el) return;

      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      let closestIndex = activeIndex;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
      setPaused(false);
    }, 120);
  }

  return (
    <section className="relative overflow-hidden bg-[#f5f5f0] py-14 sm:py-20 lg:py-28">
      {/* =========================================================
          AMBIENT PAGE GLOW
      ========================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[120px] sm:h-[500px] sm:w-[700px] sm:blur-[140px]" />

      <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADER
        ========================================================== */}

        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <div className="mb-4 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-px w-5 bg-cyan-400 sm:w-8" />

            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#29B9F2] sm:text-xs sm:tracking-[0.35em]">
              Nine Verticals
            </p>

            <span className="h-px w-5 bg-cyan-400 sm:w-8" />
          </div>

          <h2 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-6xl">
            Technology matched
            <br />
            <span className="text-neutral-400">to your industry</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[13px] leading-6 text-neutral-500 sm:mt-5 sm:text-base sm:leading-7">
            Purpose-built technology solutions designed around the unique
            challenges, scale, and opportunities of every industry we serve.
          </p>
        </div>

        {/* =========================================================
            MAIN EXPERIENCE
        ========================================================== */}

        <div
          className="mt-9 grid gap-3 sm:mt-12 lg:mt-16 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* =====================================================
              SIDEBAR / INDUSTRY SELECTOR
              - below lg: swipeable snap carousel + dots
              - lg and up: original vertical list
          ====================================================== */}

          <div>
            <div className="rounded-[22px] bg-[#070909] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:rounded-[28px] sm:p-2.5">
              {/* ---- Mobile / tablet carousel ---- */}
              <div
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-3 pb-1 scrollbar-hide lg:hidden"
              >
                {industries.map((industry, i) => {
                  const Icon = industry.icon;
                  const isActive = i === activeIndex;

                  return (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      onClick={(e) => {
                        // First tap on a non-active card just previews it,
                        // like hover does on desktop. Tap again to navigate.
                        if (!isActive) {
                          e.preventDefault();
                          setActiveIndex(i);
                        }
                      }}
                      className="group relative w-[62%] shrink-0 snap-center min-[420px]:w-[46%] sm:w-[34%]"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.075)"
                            : "rgba(255,255,255,0.025)",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative flex min-h-[108px] flex-col justify-between overflow-hidden rounded-[15px] border p-3 min-[420px]:min-h-[128px] min-[420px]:rounded-[17px] min-[420px]:p-3.5 ${
                          isActive
                            ? "border-cyan-400/50"
                            : "border-white/[0.035] active:border-white/15"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="industry-active-bar-mobile"
                            className="absolute inset-x-0 top-0 h-[2px]"
                            style={{ backgroundImage: BRAND_GRADIENT }}
                            transition={{
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        )}

                        <motion.span
                          animate={{
                            backgroundColor: isActive
                              ? "rgba(41,185,242,0.10)"
                              : "rgba(255,255,255,0.035)",
                            color: isActive ? "#29B9F2" : "#73777a",
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.04] min-[420px]:h-10 min-[420px]:w-10 min-[420px]:rounded-xl"
                        >
                          <Icon
                            className="h-4 w-4 min-[420px]:h-[18px] min-[420px]:w-[18px]"
                            strokeWidth={1.7}
                          />
                        </motion.span>

                        <span
                          className={`mt-3 text-[12px] font-semibold leading-[15px] transition-colors duration-300 min-[420px]:mt-4 min-[420px]:text-sm min-[420px]:leading-5 ${
                            isActive ? "text-white" : "text-white/55"
                          }`}
                        >
                          {industry.title}
                        </span>

                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#29B9F2] shadow-[0_0_12px_rgba(41,185,242,0.9)] min-[420px]:right-3.5 min-[420px]:top-3.5"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* ---- Desktop vertical list (unchanged) ---- */}
              <div className="hidden lg:flex lg:flex-col lg:gap-2">
                {industries.map((industry, i) => {
                  const Icon = industry.icon;
                  const isActive = i === activeIndex;

                  return (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="group relative"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.075)"
                            : "rgba(255,255,255,0.025)",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative flex min-h-[58px] items-center gap-3 overflow-hidden rounded-[17px] border px-3 py-2.5 ${
                          isActive
                            ? "border-cyan-400/50"
                            : "border-white/[0.035] hover:border-white/10"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="industry-active-bar"
                            className="absolute inset-y-0 left-0 w-[2px]"
                            style={{ backgroundImage: BRAND_GRADIENT }}
                            transition={{
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        )}

                        <motion.span
                          animate={{
                            backgroundColor: isActive
                              ? "rgba(41,185,242,0.10)"
                              : "rgba(255,255,255,0.035)",
                            color: isActive ? "#29B9F2" : "#73777a",
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.04]"
                        >
                          <Icon
                            className="h-[17px] w-[17px]"
                            strokeWidth={1.7}
                          />
                        </motion.span>

                        <span
                          className={`min-w-0 text-sm font-semibold leading-5 transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-white/55 group-hover:text-white/80"
                          }`}
                        >
                          {industry.title}
                        </span>

                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-auto hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[#29B9F2] shadow-[0_0_12px_rgba(41,185,242,0.9)] lg:block"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Carousel dot pagination (mobile / tablet only) — outside the card */}
            <div className="mt-3 flex items-center justify-center gap-1.5 lg:hidden">
              {industries.map((industry, i) => (
                <button
                  key={industry.slug}
                  type="button"
                  aria-label={`Go to ${industry.title}`}
                  onClick={() => setActiveIndex(i)}
                  className="py-2"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-5 bg-[#29B9F2] shadow-[0_0_8px_rgba(41,185,242,0.6)]"
                        : "w-1.5 bg-white/15"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* =====================================================
              HERO STAGE
          ====================================================== */}

          <Link
            href={`/industries/${active.slug}`}
            className="
              group
              relative
              min-h-[680px]
              overflow-hidden
              rounded-[22px]
              bg-[#020505]
              shadow-[0_25px_70px_rgba(0,0,0,0.15)]
              sm:min-h-[650px]
              sm:rounded-[28px]
              md:min-h-[620px]
              lg:min-h-[650px]
            "
          >
            {/* ===================================================
                BACKGROUND RADIAL GLOW
            ==================================================== */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-[10%] top-[30%] h-[240px] w-[240px] rounded-full bg-cyan-400/[0.055] blur-[80px] sm:right-[18%] sm:top-[38%] sm:h-[350px] sm:w-[350px] sm:blur-[110px]" />

              <div className="absolute right-[-5%] top-[25%] h-[200px] w-[200px] rounded-full bg-blue-500/[0.04] blur-[75px] sm:right-[4%] sm:top-[35%] sm:h-[280px] sm:w-[280px] sm:blur-[100px]" />

              <div className="absolute bottom-0 left-[20%] h-[200px] w-[240px] rounded-full bg-emerald-400/[0.025] blur-[80px] sm:h-[250px] sm:w-[300px] sm:blur-[100px]" />
            </div>

            {/* ===================================================
                BACKGROUND GRID
            ==================================================== */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] sm:opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)
                `,
                backgroundSize: "55px 55px",
                maskImage:
                  "linear-gradient(to bottom, transparent 10%, black 45%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 10%, black 45%, transparent 100%)",
              }}
            />

            {/* ===================================================
                HUGE NUMBER
            ==================================================== */}

            <AnimatePresence mode="wait">
              <motion.span
                key={`number-${active.slug}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-[-5px]
                  select-none
                  text-[110px]
                  font-bold
                  leading-none
                  tracking-[-0.08em]
                  text-white/[0.035]
                  sm:right-10
                  sm:text-[180px]
                  md:text-[200px]
                  lg:right-14
                  lg:text-[220px]
                "
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>

            {/* ===================================================
                CONTENT
            ==================================================== */}

            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="
                  relative
                  z-10
                  flex
                  min-h-[680px]
                  flex-col
                  p-6
                  sm:min-h-[650px]
                  sm:p-10
                  md:min-h-[620px]
                  md:p-11
                  lg:min-h-[650px]
                  lg:p-14
                "
              >
                {/* =================================================
                    TOP CONTENT
                ================================================== */}

                <div className="max-w-[650px]">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-[17px]
                      border
                      border-cyan-400/25
                      bg-white/[0.035]
                      text-[#29B9F2]
                      shadow-[0_0_40px_rgba(41,185,242,0.08)]
                      sm:h-16
                      sm:w-16
                      sm:rounded-[20px]
                    "
                  >
                    <ActiveIcon
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <h3
                    className="
                      mt-6
                      max-w-[600px]
                      text-[2.5rem]
                      font-semibold
                      leading-[0.94]
                      tracking-[-0.05em]
                      text-white
                      sm:mt-7
                      sm:text-5xl
                      lg:text-[54px]
                    "
                  >
                    {active.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-[560px]
                      text-sm
                      font-medium
                      leading-6
                      text-white/50
                      sm:text-base
                      sm:leading-7
                      lg:text-lg
                    "
                  >
                    {active.headline}
                  </p>

                  <div
                    className="mt-4 h-[2px] w-20 rounded-full opacity-90 sm:mt-5 sm:w-28"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  />

                  <p
                    className="
                      mt-4
                      max-w-[570px]
                      text-[13px]
                      leading-5
                      text-white/35
                      sm:mt-5
                      sm:text-sm
                      sm:leading-6
                      lg:text-[15px]
                    "
                  >
                    We empower businesses in the{" "}
                    <span className="text-white/60">{active.title}</span> sector
                    with reliable, scalable, and future-ready technology
                    solutions built for growth and efficiency.
                  </p>
                </div>

                {/* =================================================
                    BOTTOM CONTENT
                ================================================== */}

                <div className="mt-auto pt-5 sm:pt-8">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
                    {active.focusAreas.slice(0, 3).map((area, index) => {
                      const FeatureIcon = featureIcons[index] ?? Sparkles;

                      return (
                        <motion.div
                          key={area}
                          whileHover={{
                            y: -4,
                            borderColor: "rgba(41,185,242,0.25)",
                          }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="
                              transform-gpu
                              rounded-[14px]
                              border
                              border-white/[0.09]
                              bg-[#080d0d]/80
                              p-3
                              will-change-transform
                              min-[420px]:rounded-[16px]
                              min-[420px]:p-3.5
                              sm:rounded-[18px]
                              sm:p-4
                            "
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-cyan-400/20 bg-cyan-400/[0.04] text-[#29B9F2] min-[420px]:h-8 min-[420px]:w-8 min-[420px]:rounded-[10px] sm:h-9 sm:w-9 sm:rounded-xl">
                            <FeatureIcon
                              className="h-3 w-3 min-[420px]:h-3.5 min-[420px]:w-3.5 sm:h-4 sm:w-4"
                              strokeWidth={1.6}
                            />
                          </div>

                          <p className="mt-2.5 text-[10px] font-medium leading-[14px] text-white/65 min-[420px]:mt-3 min-[420px]:text-[11px] min-[420px]:leading-4 sm:mt-4 sm:text-xs sm:leading-5">
                            {area}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.span
                    whileHover={{
                      scale: 1.025,
                      boxShadow: "0 12px 45px rgba(37,217,199,0.28)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ backgroundImage: BRAND_GRADIENT }}
                    className="
                      mt-5
                      inline-flex
                      w-fit
                      items-center
                      gap-2.5
                      rounded-full
                      px-5
                      py-3.5
                      text-xs
                      font-bold
                      text-black
                      shadow-[0_8px_25px_rgba(37,217,199,0.12)]
                      transition-all
                      duration-300
                      sm:mt-8
                      sm:gap-3
                      sm:px-7
                      sm:py-4
                      sm:text-sm
                    "
                  >
                    Explore {active.title}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      strokeWidth={2.5}
                    />
                  </motion.span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* =====================================================
                DESKTOP TECHNOLOGY VISUAL
            ====================================================== */}

            <div className="pointer-events-none absolute bottom-[95px] right-[5%] hidden h-[330px] w-[390px] lg:block">
              <div className="absolute bottom-5 left-1/2 h-24 w-72 -translate-x-1/2 rounded-full bg-cyan-400/[0.12] blur-[55px]" />

              <div
                className="absolute -bottom-48 -right-24 h-124 w-[590px] -rotate-[18deg] opacity-50"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(41,185,242,0.25) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(41,185,242,0.25) 1px, transparent 1px)
                  `,
                  backgroundSize: "35px 35px",
                  maskImage: "linear-gradient(to top, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to top, black, transparent)",
                }}
              />

              <motion.div
                animate={{ y: [0, -9, 0], rotateZ: [0, 1.5, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-[55px] h-[170px] w-[170px] -translate-x-1/2"
              >
                <div className="absolute inset-[25%] rounded-full bg-cyan-400/20 blur-[45px]" />

                <div className="absolute inset-0 rotate-45 rounded-[7px] border border-cyan-400/50 bg-gradient-to-br from-cyan-400/[0.08] via-blue-500/[0.035] to-transparent shadow-[inset_0_0_45px_rgba(41,185,242,0.05)]" />

                <div className="absolute left-1/2 top-1/2 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[5px] border border-cyan-400/60 bg-cyan-400/[0.12]" />

                <div className="absolute left-1/2 top-1/2 z-20 flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden">
                  <img
                    src="/cursor-original.png"
                    alt="Company Logo"
                    className="relative z-10 h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              <motion.span
                animate={{ y: [0, -12, 0], opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[30%] top-[100px] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(41,185,242,1)]"
              />

              <motion.span
                animate={{ y: [0, 10, 0], opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: 0.7,
                  ease: "easeInOut",
                }}
                className="absolute right-[23%] top-[150px] h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,255,70,1)]"
              />

              <motion.span
                animate={{ y: [0, -8, 0], opacity: [0.15, 0.9, 0.15] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
                className="absolute right-[8%] top-[210px] h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(41,185,242,1)]"
              />
            </div>

            {/* =====================================================
                PROGRESS DOTS
            ====================================================== */}

            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1 sm:bottom-8 sm:right-8 sm:gap-1.5 lg:bottom-10 lg:right-12">
              {industries.map((industry, i) => (
                <button
                  key={industry.slug}
                  type="button"
                  aria-label={`Go to ${industry.title}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(i);
                  }}
                  className="group/dot py-2"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-6 bg-[#25D9C7] shadow-[0_0_10px_rgba(37,217,199,0.5)] sm:w-8"
                        : "w-1.5 bg-white/15 group-hover/dot:bg-white/35"
                    }`}
                  />
                </button>
              ))}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
