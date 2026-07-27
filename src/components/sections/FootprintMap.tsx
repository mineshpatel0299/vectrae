"use client";

import { useState } from "react";
import { MapPin, Users, Building, ShieldCheck } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";

const metrics = [
  { label: "Enterprise Clients", value: "2,300+", icon: Building },
  { label: "Technology Experts", value: "250+", icon: Users },
  { label: "OEM & Tech Partners", value: "43", icon: ShieldCheck },
  { label: "Years of Experience", value: "25+", icon: MapPin },
];

const nodes = [
  { id: "delhi",     label: "Delhi NCR",  svgX: 189, svgY: 215 },
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

export default function FootprintMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D9C7]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: text + stats */}
          <div>
            <div data-aos="fade-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
                National Coverage
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                PAN-India Delivery &amp; Support Footprint
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                From initial consultation to long-term managed support, Vectrae delivers end-to-end enterprise technology solutions across India.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-black/20 hover:shadow-md"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <metric.icon className="h-4 w-4 text-neutral-400 transition duration-300 group-hover:text-[#29B9F2]" />
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

          {/* Right: compact map */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              {/* Dot grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Map container — constrained height */}
              <div
                className="relative mx-auto w-full max-w-[320px]"
                style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}
              >
                <img
                  src="/india-map.svg"
                  alt="Map of India"
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                  style={{ objectFit: "fill" }}
                />

                {nodes.map((node) => {
                  const leftPct = (node.svgX / SVG_W) * 100;
                  const topPct  = (node.svgY / SVG_H) * 100;
                  const isHovered = hoveredId === node.id;

                  return (
                    <div
                      key={node.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${leftPct}%`, top: `${topPct}%`, zIndex: isHovered ? 30 : 10 }}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Pulse ring */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                        style={{ width: 16, height: 16, backgroundColor: "rgba(41,185,242,0.3)" }}
                      />
                      {/* Dot */}
                      <span
                        className="relative block cursor-pointer rounded-full bg-[#29B9F2] transition-all duration-150"
                        style={{
                          width: isHovered ? 12 : 8,
                          height: isHovered ? 12 : 8,
                          boxShadow: isHovered
                            ? "0 0 0 3px rgba(41,185,242,0.2), 0 0 12px rgba(41,185,242,0.7)"
                            : "0 0 6px rgba(41,185,242,0.5)",
                        }}
                      />
                      {/* Tooltip */}
                      <div
                        className="pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-lg border border-black/10 bg-white px-2.5 py-1 text-[10px] font-bold text-neutral-900 shadow-md transition-all duration-150"
                        style={{
                          transform: `translateX(-50%) translateY(${isHovered ? 0 : 4}px)`,
                          opacity: isHovered ? 1 : 0,
                        }}
                      >
                        {node.label}
                        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2 border-t border-black/5 px-5 py-3 text-[11px] font-semibold text-neutral-400">
                <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#29B9F2]/50" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#29B9F2]" />
                Active delivery locations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
