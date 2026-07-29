"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/data/stats";
import { BRAND_GRADIENT } from "@/lib/brand";
import Reveal from "./Reveal";

const RING_FILL = [88, 72, 58, 95];
const RING_COLORS = ["#29B9F2", "#25D9C7", "#84D96C", "#B6D93B"];

function useCountUp(target: number, active: boolean, duration = 1.6) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;
    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatRing({
  value,
  suffix,
  label,
  fill,
  color,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  fill: number;
  color: string;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(value, active);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (active ? fill / 100 : 0) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white sm:text-3xl">
            {count.toLocaleString("en-US")}
            {suffix}
          </span>
        </div>
      </div>
      <span className="max-w-28 text-[11px] font-semibold uppercase leading-snug tracking-wider text-white/40">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/5 bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-200 -translate-x-1/2 rounded-full bg-[#29B9F2]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]">About Vectrae</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-6xl">
            India&apos;s most trusted full-spectrum{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: BRAND_GRADIENT }}>
              enterprise technology
            </span>{" "}
            partner.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-0">
          <div className="grid flex-1 grid-cols-2 gap-y-12 sm:flex sm:flex-wrap sm:justify-between sm:gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                <StatRing
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  fill={RING_FILL[i]}
                  color={RING_COLORS[i]}
                  active={inView}
                  delay={0.2 + i * 0.1}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4} className="lg:max-w-xs lg:pl-14">
            <p className="border-l border-[#29B9F2]/30 pl-5 text-sm leading-relaxed text-white/50">
              Delivering the right solutions, the right partners, and the right outcomes — from
              initial consultation through long-term managed support.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
