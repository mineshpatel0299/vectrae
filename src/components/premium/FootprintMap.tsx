"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building, MapPin, ShieldCheck, Users } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "./Reveal";

const metrics = [
  { label: "Enterprise Clients", value: "2,300+", icon: Building },
  { label: "Technology Experts", value: "250+", icon: Users },
  { label: "OEM & Tech Partners", value: "43", icon: ShieldCheck },
  { label: "Years of Experience", value: "25+", icon: MapPin },
];

const nodes = [
  { id: "delhi",     label: "Delhi NCR (HQ)", svgX: 189, svgY: 215, hub: true },
  { id: "mumbai",    label: "Mumbai",     svgX: 101, svgY: 436 },
  { id: "bangalore", label: "Bangalore",  svgX: 196, svgY: 579 },
  { id: "hyderabad", label: "Hyderabad",  svgX: 214, svgY: 476 },
  { id: "chennai",   label: "Chennai",    svgX: 250, svgY: 576 },
  { id: "pune",      label: "Pune",       svgX: 122, svgY: 449 },
  { id: "kolkata",   label: "Kolkata",    svgX: 410, svgY: 355 },
  { id: "ahmedabad", label: "Ahmedabad",  svgX:  97, svgY: 345 },
];

const SVG_W = 612;
const SVG_H = 696;
const hub = nodes.find((n) => n.hub)!;
const spokes = nodes.filter((n) => !n.hub);

export default function FootprintMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycleIndex((v) => (v + 1) % spokes.length), 2200);
    return () => clearInterval(id);
  }, []);

  const activeId = hoveredId ?? spokes[cycleIndex].id;

  return (
    <section id="footprint" className="relative overflow-hidden border-t border-black/5 bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D9C7]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f9ac9]">
                National Coverage
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                A Live Network, Not Just a Map
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                Every delivery hub connects back to our Delhi command center — from initial
                consultation to long-term managed support, PAN-India.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => (
                <Reveal key={metric.label} delay={i * 0.08}>
                  <TiltCard className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm" strength={5}>
                    <div style={{ transform: "translateZ(20px)" }}>
                      <metric.icon className="h-4 w-4 text-neutral-400" />
                      <div className="mt-2 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl bg-[linear-gradient(90deg,#29B9F2,#25D9C7)]">
                        {metric.value}
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                        {metric.label}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-neutral-50 shadow-sm">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative mx-auto w-full max-w-80" style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}>
                <img
                  src="/india-map.svg"
                  alt="Map of India"
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                  style={{ objectFit: "fill" }}
                />

                <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="pointer-events-none absolute inset-0 h-full w-full">
                  {spokes.map((node) => (
                    <motion.line
                      key={node.id}
                      x1={hub.svgX}
                      y1={hub.svgY}
                      x2={node.svgX}
                      y2={node.svgY}
                      stroke={activeId === node.id ? "#29B9F2" : "#29B9F2"}
                      strokeOpacity={activeId === node.id ? 0.7 : 0.15}
                      strokeWidth={activeId === node.id ? 1.5 : 1}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                  ))}
                </svg>

                {nodes.map((node) => {
                  const leftPct = (node.svgX / SVG_W) * 100;
                  const topPct = (node.svgY / SVG_H) * 100;
                  const isActive = node.hub || activeId === node.id;

                  return (
                    <div
                      key={node.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${leftPct}%`, top: `${topPct}%`, zIndex: isActive ? 30 : 10 }}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {isActive && (
                        <span
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                          style={{ width: node.hub ? 22 : 16, height: node.hub ? 22 : 16, backgroundColor: "rgba(41,185,242,0.3)" }}
                        />
                      )}
                      <span
                        className="relative block cursor-pointer rounded-full transition-all duration-300"
                        style={{
                          width: node.hub ? 12 : isActive ? 11 : 7,
                          height: node.hub ? 12 : isActive ? 11 : 7,
                          backgroundColor: node.hub ? "#25D9C7" : "#29B9F2",
                          boxShadow: isActive
                            ? "0 0 0 3px rgba(41,185,242,0.2), 0 0 14px rgba(41,185,242,0.8)"
                            : "0 0 6px rgba(41,185,242,0.4)",
                        }}
                      />
                      <div
                        className="pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-lg border border-black/10 bg-white px-2.5 py-1 text-[10px] font-bold text-neutral-900 shadow-md transition-all duration-200"
                        style={{
                          transform: `translateX(-50%) translateY(${isActive ? 0 : 4}px)`,
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        {node.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 border-t border-black/5 px-5 py-3 text-[11px] font-semibold text-neutral-400">
                <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#29B9F2]/50" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#29B9F2]" />
                Live delivery network — cycling active locations
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
