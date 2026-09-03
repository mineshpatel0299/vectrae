"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building, MapPin, ShieldCheck, Users } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { siteImages } from "@/lib/site-images";

const metrics = [
  { label: "Enterprise Clients", value: "2,300+", icon: Building },
  { label: "Technology Experts", value: "250+", icon: Users },
  { label: "OEM & Tech Partners", value: "43", icon: ShieldCheck },
  { label: "Years of Experience", value: "25+", icon: MapPin },
];

type Node = {
  id: string;
  label: string;
  svgX: number;
  svgY: number;
  hub?: boolean;
  side: "left" | "right";
};

const nodes: Node[] = [
  // Central / HQ
  {
    id: "delhi",
    label: "Delhi NCR",
    svgX: 189,
    svgY: 215,
    hub: true,
    side: "right",
  },

  // North — 7
  { id: "chandigarh", label: "Chandigarh", svgX: 185, svgY: 165, side: "left" },
  { id: "jaipur", label: "Jaipur", svgX: 135, svgY: 270, side: "left" },
  { id: "lucknow", label: "Lucknow", svgX: 255, svgY: 260, side: "right" },
  { id: "dehradun", label: "Dehradun", svgX: 230, svgY: 145, side: "right" },
  { id: "amritsar", label: "Amritsar", svgX: 125, svgY: 125, side: "left" },
  { id: "jammu", label: "Jammu", svgX: 145, svgY: 90, side: "left" },
  { id: "kanpur", label: "Kanpur", svgX: 275, svgY: 290, side: "right" },

  // West — 2
  { id: "ahmedabad", label: "Ahmedabad", svgX: 97, svgY: 345, side: "left" },
  { id: "mumbai", label: "Mumbai", svgX: 101, svgY: 436, side: "left" },

  // South — 5
  { id: "pune", label: "Pune", svgX: 122, svgY: 449, side: "right" },
  { id: "hyderabad", label: "Hyderabad", svgX: 214, svgY: 476, side: "right" },
  { id: "bangalore", label: "Bangalore", svgX: 196, svgY: 579, side: "left" },
  { id: "chennai", label: "Chennai", svgX: 250, svgY: 576, side: "right" },
  { id: "kochi", label: "Kochi", svgX: 165, svgY: 625, side: "left" },
];

const SVG_W = 612;
const SVG_H = 696;
const hub = nodes.find((n) => n.hub)!;
const spokes = nodes.filter((n) => !n.hub);

function curvePath(x1: number, y1: number, x2: number, y2: number, bow = 0.18) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * len * bow;
  const cy = my + (dx / len) * len * bow;
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}` };
}

export default function FootprintMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCycleIndex((v) => (v + 1) % spokes.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  const activeSpoke = spokes[cycleIndex % spokes.length];
  const activeId = hoveredId ?? activeSpoke?.id ?? spokes[0]?.id;

  return (
    <section className="relative overflow-hidden border-t border-neutral-200 bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D9C7]/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-16">
          {/* Left: text + stats */}
          <div>
            <div data-aos="fade-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#25D9C7]">
                National Coverage
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                A Live Network Across India
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                Every delivery hub connects back to our Delhi command center,
                from initial consultation to long-term managed support,
                PAN-India.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-300 hover:border-neutral-300 hover:shadow-md"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <metric.icon className="h-4 w-4 text-neutral-400 transition duration-300 group-hover:text-[#25D9C7]" />
                  <div
                    className="mt-2 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    {metric.value}
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: live network map, large */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50/60 shadow-sm">
              {/* Static dot grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative mx-auto w-full max-w-2xl px-14 pb-8 pt-12 sm:px-16">
                <div
                  className="relative mx-auto w-full"
                  style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}
                >
                  {/* Gradient-filled silhouette with a true drop shadow (follows the shape, not a blurred ghost copy) */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      WebkitMaskImage: `url(${siteImages.indiaMap})`,
                      maskImage: `url(${siteImages.indiaMap})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      background:
                        "linear-gradient(160deg, #29B9F2 0%, #25D9C7 55%, #84D96C 100%)",
                      filter:
                        "drop-shadow(0 18px 28px rgba(15,23,42,0.18)) drop-shadow(0 4px 10px rgba(15,23,42,0.10))",
                    }}
                  />

                  {/* Connection paths */}
                  <svg
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    {spokes.map((node) => {
                      const { d } = curvePath(
                        hub.svgX,
                        hub.svgY,
                        node.svgX,
                        node.svgY,
                      );
                      const isActive = activeId === node.id;
                      return (
                        <g key={node.id}>
                          <motion.path
                            d={d}
                            fill="none"
                            stroke="#ffffff"
                            strokeOpacity={isActive ? 0.95 : 0.35}
                            strokeWidth={isActive ? 2 : 1.25}
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.1 }}
                          />
                          {isActive && (
                            <circle
                              r={3}
                              fill="#ffffff"
                              className="animate-travel-dot"
                              style={{ offsetPath: `path("${d}")` }}
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* City nodes */}
                  {nodes.map((node) => {
                    const leftPct = (node.svgX / SVG_W) * 100;
                    const topPct = (node.svgY / SVG_H) * 100;
                    const isActive = node.hub || activeId === node.id;

                    return (
                      <div
                        key={node.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${leftPct}%`,
                          top: `${topPct}%`,
                          zIndex: isActive ? 30 : 10,
                        }}
                        onMouseEnter={() => setHoveredId(node.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {isActive && (
                          <span
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/60"
                            style={{
                              width: node.hub ? 26 : 20,
                              height: node.hub ? 26 : 20,
                            }}
                          />
                        )}
                        <span
                          className="relative block cursor-pointer rounded-full border-2 border-white transition-all duration-300"
                          style={{
                            width: node.hub ? 13 : isActive ? 12 : 7,
                            height: node.hub ? 13 : isActive ? 12 : 7,
                            backgroundColor: node.hub ? "#0f9ac9" : "#ffffff",
                            boxShadow: isActive
                              ? "0 0 0 4px rgba(255,255,255,0.3), 0 2px 10px rgba(0,0,0,0.25)"
                              : "0 1px 4px rgba(0,0,0,0.2)",
                          }}
                        />

                        {/* City label, always a legible chip so it reads over map or card background alike */}
                        <span
                          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 ${
                            node.side === "left"
                              ? "right-full mr-2 text-right"
                              : "left-full ml-2"
                          } ${
                            isActive
                              ? "border-neutral-200 bg-white px-2 py-1 text-neutral-900 shadow-md"
                              : "border-transparent bg-white/70 px-1.5 py-0.5 text-neutral-600"
                          }`}
                        >
                          {node.label}
                          {node.hub && (
                            <span className="ml-1 text-[#0f9ac9]">HQ</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex items-center gap-2 border-t border-neutral-200 bg-white px-6 py-3.5 text-[11px] font-semibold text-neutral-500">
                <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#25D9C7]/50" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#25D9C7]" />
                Live delivery network, {nodes.length} active hubs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
