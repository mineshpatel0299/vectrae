"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Cpu, Laptop, Monitor, Server, Wifi, Zap } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { BRAND_GRADIENT } from "@/lib/brand";
import Reveal from "./Reveal";

const products = [
  {
    name: "Enterprise Workstation Laptop",
    category: "End Computing",
    description: "High-performance enterprise laptop for heavy workloads and secure remote access.",
    specs: "Intel Core i9 · 64GB RAM · 2TB NVMe",
    icon: Laptop,
    href: "/products/workstation-laptop",
  },
  {
    name: "Server Motherboard",
    category: "Data Center",
    description: "Dual-socket enterprise server motherboard built for intense computing and virtualization.",
    specs: "Dual LGA 4189 · 16x DIMM · PCIe 4.0",
    icon: Server,
    href: "/products/server-motherboard",
  },
  {
    name: "Industrial Power Supply",
    category: "Power",
    description: "Reliable and highly efficient power supply unit designed for continuous server operation.",
    specs: "1600W · 80 Plus Titanium · Hot-Swappable",
    icon: Zap,
    href: "/products/power-supply",
  },
  {
    name: "Enterprise Server RAM",
    category: "Data Center",
    description: "High-speed ECC memory modules designed for intensive computing and virtualization.",
    specs: "128GB DDR5 · 4800MT/s · ECC",
    icon: Cpu,
    href: "/products/server-ram",
  },
  {
    name: "Enterprise WiFi Router",
    category: "Networking",
    description: "High-performance WiFi 7 access point built for dense enterprise environments.",
    specs: "WiFi 7 · 10GbE Uplink · AI Roaming",
    icon: Wifi,
    href: "/products/enterprise-router",
  },
  {
    name: "Enterprise Desktop PC",
    category: "End Computing",
    description: "Secure and powerful small form factor desktop built for enterprise deployments.",
    specs: "Intel vPro · 32GB RAM · TPM 2.0",
    icon: Monitor,
    href: "/products/enterprise-desktop",
  },
];

const categories = ["All", "Audio Visual", "Networking", "Data Center", "Power", "End Computing"];

export default function Capabilities() {
  const [active, setActive] = useState("All");
  const filtered = products.filter((p) => active === "All" || p.category === active);

  return (
    <section id="capabilities" className="relative overflow-hidden border-t border-white/5 bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 translate-x-1/3 translate-y-1/3 rounded-full bg-[#25D9C7]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            The Catalogue
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Hardware &amp; Enterprise Solutions
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition duration-300 ${
                  isActive ? "text-black" : "border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard className="h-full rounded-2xl border border-white/10 bg-white/2 p-6" strength={6}>
                    <div className="flex h-full flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#29B9F2]">
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-white">{product.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/50">{product.description}</p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="font-mono text-[10px] text-white/40">{product.specs}</span>
                        <Link
                          href={product.href}
                          aria-label={`View ${product.name}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition duration-300 hover:border-[#29B9F2]/50 hover:text-[#29B9F2]"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
