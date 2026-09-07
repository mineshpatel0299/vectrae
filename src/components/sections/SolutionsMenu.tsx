"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Crown, ArrowRight, BadgeCheck } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { solutions, Solution } from "@/data/solutions";

const FEATURED_SLUG = "av-solutions";

export default function SolutionsMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string>(FEATURED_SLUG);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = pathname.startsWith("/solutions");

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const hide = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setActiveSlug(FEATURED_SLUG);
    }, 150);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const activeSolution: Solution =
    solutions.find((s) => s.slug === activeSlug) ?? solutions[0];
  const avSolution =
    solutions.find((s) => s.slug === FEATURED_SLUG) ?? solutions[0];
  const otherSolutions = solutions.filter((s) => s.slug !== FEATURED_SLUG);

  return (
    <div ref={wrapperRef} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <div
        className={`flex items-center whitespace-nowrap rounded-full pl-3.5 pr-1.5 py-1 text-sm font-medium transition ${
          isActive || open ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
        }`}
      >
        <Link href="/solutions" onClick={() => setOpen(false)} className="py-1">
          Solutions
        </Link>
        <button
          type="button"
          aria-label="Toggle solutions menu"
          aria-expanded={open}
          onClick={(event) => {
            event.preventDefault();
            setOpen((previous) => !previous);
          }}
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-white/10"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div
        className={`absolute left-1/2 top-full z-30 w-[760px] max-w-[95vw] -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {/* Solid Background Dropdown Container */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#090a0f] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          {/* Top Brand Accent Line */}
          <div className="h-[2.5px] w-full shrink-0" style={{ backgroundImage: BRAND_GRADIENT }} />

          <div className="grid grid-cols-[minmax(0,1.18fr)_minmax(0,1fr)]">
            {/* Left Column: All Solutions List */}
            <div className="min-w-0 p-3.5 bg-[#090a0f]">
              {/* AV Solution (Main Product Highlight Card) */}
              <div className="mb-3">
                <div className="flex items-center justify-between px-1 pb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#25D9C7] flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Main Product
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black shadow-sm"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    Flagship
                  </span>
                </div>

                <Link
                  href={`/solutions/${avSolution.slug}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setActiveSlug(avSolution.slug)}
                  className={`group relative flex min-w-0 items-start gap-3 rounded-xl p-3 transition-all ${
                    activeSlug === avSolution.slug
                      ? "bg-gradient-to-r from-[#25D9C7]/20 via-[#25D9C7]/10 to-transparent border border-[#25D9C7]/40 shadow-[0_0_20px_rgba(37,217,199,0.15)]"
                      : "bg-gradient-to-r from-[#25D9C7]/10 via-[#25D9C7]/5 to-transparent border border-[#25D9C7]/25 hover:border-[#25D9C7]/40"
                  }`}
                >
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black font-bold shadow-[0_0_12px_rgba(37,217,199,0.4)]"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    <avSolution.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-1">
                      <span className="truncate text-sm font-bold text-white group-hover:text-[#25D9C7] transition-colors">
                        {avSolution.title}
                      </span>
                    </span>
                    <span className="mt-0.5 block line-clamp-2 text-xs text-white/70">
                      {avSolution.tagline}
                    </span>
                  </span>
                </Link>
              </div>

              {/* Other Solutions Header */}
              <p className="px-1 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Other Solutions
              </p>

              {/* Other Solutions List */}
              <div className="space-y-0.5">
                {otherSolutions.map((solution) => {
                  const Icon = solution.icon;
                  const isSelected = activeSlug === solution.slug;

                  return (
                    <Link
                      key={solution.slug}
                      href={`/solutions/${solution.slug}`}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveSlug(solution.slug)}
                      className={`group flex min-w-0 items-center gap-3 rounded-lg px-2.5 py-2 transition-all ${
                        isSelected
                          ? "bg-white/10 text-white border border-white/10"
                          : "text-white/70 hover:bg-white/[0.06] hover:text-white border border-transparent"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs font-medium">
                        {solution.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Spotlight Card (Solid Background) */}
            <div className="min-w-0 border-l border-white/10 bg-[#0e1017] p-4 flex flex-col justify-between">
              <div>
                {/* Spotlight Header Badge */}
                <div className="mb-3 flex items-center justify-between">
                  {activeSolution.slug === FEATURED_SLUG ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#25D9C7]/40 bg-[#25D9C7]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#25D9C7]">
                      <BadgeCheck className="h-3.5 w-3.5 text-[#25D9C7]" /> Main Enterprise Solution
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                      Solution Details
                    </span>
                  )}
                </div>

                {/* Active Solution Title & Tagline */}
                <div className="mb-3 flex items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-md ${
                      activeSolution.slug === FEATURED_SLUG
                        ? "text-black"
                        : "bg-white/10 text-white"
                    }`}
                    style={
                      activeSolution.slug === FEATURED_SLUG
                        ? { backgroundImage: BRAND_GRADIENT }
                        : undefined
                    }
                  >
                    <activeSolution.icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-white">
                      {activeSolution.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-white/60 line-clamp-2">
                      {activeSolution.tagline}
                    </p>
                  </div>
                </div>

                {/* Sub-services or Key Capabilities */}
                <div className="mt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    {activeSolution.subServices.length > 0
                      ? "Featured Offerings"
                      : "Key Capabilities"}
                  </p>
                  <div className="space-y-1">
                    {activeSolution.subServices.length > 0
                      ? activeSolution.subServices.slice(0, 5).map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.slug}
                              href={`/solutions/${activeSolution.slug}/${sub.slug}`}
                              onClick={() => setOpen(false)}
                              className="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                            >
                              <SubIcon className="h-3.5 w-3.5 shrink-0 text-[#25D9C7]" />
                              <span className="min-w-0 flex-1 truncate transition-transform duration-150 group-hover:translate-x-0.5">
                                {sub.title}
                              </span>
                            </Link>
                          );
                        })
                      : activeSolution.capabilities.slice(0, 4).map((cap) => {
                          const CapIcon = cap.icon;
                          return (
                            <div
                              key={cap.title}
                              className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/70"
                            >
                              <CapIcon className="h-3.5 w-3.5 shrink-0 text-[#25D9C7]" />
                              <span className="min-w-0 flex-1 truncate">{cap.title}</span>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <Link
                  href={`/solutions/${activeSolution.slug}`}
                  onClick={() => setOpen(false)}
                  className={`group flex w-full items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition-all shadow-md ${
                    activeSolution.slug === FEATURED_SLUG
                      ? "text-black hover:brightness-110 shadow-[0_4px_16px_rgba(37,217,199,0.3)]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  style={
                    activeSolution.slug === FEATURED_SLUG
                      ? { backgroundImage: BRAND_GRADIENT }
                      : undefined
                  }
                >
                  <span>
                    {activeSolution.slug === FEATURED_SLUG
                      ? "Explore AV Solutions"
                      : `View ${activeSolution.title}`}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
