"use client";

import Image from "next/image";
import { Handshake, Layers, MapPin, ShieldCheck, Workflow, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { whyChooseUs } from "@/data/whyChooseUs";
import { BRAND_GRADIENT } from "@/lib/brand";

const icons = [Layers, Workflow, Handshake, MapPin, ShieldCheck];

const tags = [
  "SINGLE WINDOW",
  "FULL LIFECYCLE",
  "OEM DIRECT",
  "NATIONWIDE",
  "250+ CERTIFIED",
];

const highlights = [
  "Unified SLA across AV, IT & Critical Power",
  "From preliminary audit to continuous AMC",
  "Tier-1 direct relationships with global leaders",
  "On-ground presence spanning every major metro",
  "Enterprise-grade engineering precision",
];

function TriangularCard({
  item,
  index,
  total,
  scrollYProgress,
  Icon,
  tag,
  highlight,
}: {
  item: (typeof whyChooseUs)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  Icon: (typeof icons)[number];
  tag: string;
  highlight: string;
}) {
  const centerP = total > 1 ? index / (total - 1) : 0;
  const rangeSpan = 0.28;

  // Triangular apex motion computed via pure functions to avoid WAAPI keyframe offset issues
  const y = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - centerP);
    const t = Math.max(0, 1 - dist / rangeSpan);
    // At apex (t = 1) -> y = -24px, at base (t = 0) -> y = +26px
    return 26 - t * 50;
  });

  const scale = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - centerP);
    const t = Math.max(0, 1 - dist / rangeSpan);
    return 0.91 + t * 0.14; // 0.91 -> 1.05
  });

  const rotateZ = useTransform(scrollYProgress, (p) => {
    const diff = p - centerP; // negative when entering from right, positive when exiting to left
    const clampedDiff = Math.max(-rangeSpan, Math.min(rangeSpan, diff));
    return (clampedDiff / rangeSpan) * 2.5; // tilts smoothly along triangular flank
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - centerP);
    const t = Math.max(0, 1 - dist / rangeSpan);
    return 0.45 + t * 0.55; // 0.45 -> 1.0
  });

  const activeGlow = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - centerP);
    const t = Math.max(0, 1 - dist / 0.14);
    return t; // 1 at center apex, 0 outside 0.14
  });

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateZ,
        opacity,
      }}
      className="relative w-[86vw] max-w-[480px] shrink-0 sm:w-[480px] lg:w-[540px] select-none"
    >
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-5 sm:p-7 backdrop-blur-xl shadow-2xl transition-colors duration-300">
        
        {/* Luminous Triangular Apex Glow */}
        <motion.div
          style={{ opacity: activeGlow }}
          className="pointer-events-none absolute inset-0 rounded-3xl border border-[#25D9C7]/60 shadow-[inset_0_0_30px_rgba(37,217,199,0.18),0_0_40px_rgba(37,217,199,0.22)]"
        />

        {/* Ambient Card Corner Light */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#29B9F2]/15 blur-3xl" />

        {/* Top Header Row */}
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {/* Triangular Geometric Icon */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#25D9C7]/30 bg-[#25D9C7]/10">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#25D9C7]">
                <polygon points="12,2 22,20 2,20" />
              </svg>
            </div>
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-[#25D9C7]">
                0{index + 1}
              </span>
              <span className="mx-2 text-white/20">/</span>
              <span className="font-mono text-[10px] tracking-widest text-white/40">
                0{total}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white/70">
              {tag}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#29B9F2] shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Image Showcase */}
        <div className="relative mt-4 h-44 sm:h-52 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          {/* Triangular badge overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-[#B6D93B]">
              <polygon points="12,2 22,20 2,20" />
            </svg>
            <span className="text-[11px] font-medium text-white/90">
              {highlight}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative mt-5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/65">
            {item.description}
          </p>
        </div>

        {/* Bottom Decorative Micro-Track */}
        <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25D9C7]" />
            Enterprise Caliber
          </div>
          <span className="font-mono text-[11px] text-white/30">VECTRAE ADVANTAGE</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate pixel translation distance so each card centers accurately
  useEffect(() => {
    const calculateScroll = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const first = trackRef.current.children[0] as HTMLElement;
        const second = trackRef.current.children[1] as HTMLElement;
        if (first && second) {
          const stride = second.offsetLeft - first.offsetLeft;
          setMaxScroll(stride * (whyChooseUs.length - 1));
        }
      }
    };

    calculateScroll();
    window.addEventListener("resize", calculateScroll);
    return () => window.removeEventListener("resize", calculateScroll);
  }, []);

  // Update active index indicator based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        whyChooseUs.length - 1,
        Math.max(0, Math.round(latest * (whyChooseUs.length - 1)))
      );
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Horizontal motion transform
  const x = useTransform(scrollYProgress, (p) => -p * maxScroll);

  // Triangular pointer progress along bottom indicator bar
  const pointerLeft = useTransform(scrollYProgress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);

  // Scroll to a specific card
  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollableDistance = containerHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (whyChooseUs.length - 1)) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] bg-black text-white"
    >
      {/* Sticky Single-View Viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-6 sm:py-8 lg:py-10">
        
        {/* Ambient Atmosphere Lights */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D9C7]/10 blur-[150px]" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[380px] w-[380px] rounded-full bg-[#29B9F2]/10 blur-[140px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#84D96C]/10 blur-[140px]" />

        {/* Section Header (Single-View Top) */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#25D9C7]/30 bg-[#25D9C7]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#25D9C7]">
            {/* Mini Triangular Icon */}
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
              <polygon points="12,2 22,20 2,20" />
            </svg>
            Why Choose Us
          </div>

          <h2 className="mt-5 sm:mt-6 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Five Reasons Enterprises Choose{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Vectrae
            </span>
          </h2>
        </div>

        {/* Horizontal Triangular Cards Track */}
        <div className="relative z-10 my-auto w-full overflow-visible py-4">
          <motion.div
            ref={trackRef}
            style={{
              x,
              paddingLeft: "calc(50vw - min(43vw, 240px))",
              paddingRight: "calc(50vw - min(43vw, 240px))",
            }}
            className="flex items-center gap-6 sm:gap-10 lg:gap-14"
          >
            {whyChooseUs.map((item, i) => (
              <TriangularCard
                key={item.title}
                item={item}
                index={i}
                total={whyChooseUs.length}
                scrollYProgress={scrollYProgress}
                Icon={icons[i]}
                tag={tags[i]}
                highlight={highlights[i]}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Navigation & Triangular Apex Progress Indicator */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
          <div className="flex flex-col items-center gap-3">
            
            {/* Triangular Apex Pointer Indicator Bar */}
            <div className="relative w-full max-w-md pt-2">
              {/* Sliding Triangular Pointer */}
              <div className="relative h-3 w-full">
                <motion.div
                  style={{ left: pointerLeft }}
                  className="absolute -top-1 -translate-x-1/2 text-[#25D9C7]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current drop-shadow-[0_0_8px_rgba(37,217,199,0.8)]">
                    <polygon points="12,4 22,20 2,20" />
                  </svg>
                </motion.div>
              </div>

              {/* Progress Line */}
              <div className="relative h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  style={{ width: pointerLeft }}
                  className="h-full bg-gradient-to-r from-[#29B9F2] via-[#25D9C7] to-[#B6D93B]"
                />
              </div>
            </div>

            {/* Stepper Buttons & Arrows */}
            <div className="flex w-full items-center justify-between pt-1">
              <button
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Previous reason"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Numbered Pills */}
              <div className="flex items-center gap-2">
                {whyChooseUs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className={`group relative flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-mono transition-all ${
                      activeIndex === i
                        ? "border border-[#25D9C7]/50 bg-[#25D9C7]/15 text-[#25D9C7] font-bold shadow-[0_0_12px_rgba(37,217,199,0.25)]"
                        : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {activeIndex === i && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#25D9C7] animate-pulse" />
                    )}
                    0{i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollToCard(Math.min(whyChooseUs.length - 1, activeIndex + 1))}
                disabled={activeIndex === whyChooseUs.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Next reason"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Scroll hint */}
            <p className="text-[11px] uppercase tracking-widest text-white/35">
              Scroll down to traverse reasons
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

