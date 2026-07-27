"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Monitor, Server, ShieldCheck, Zap, Sparkles, Laptop, Cpu, Wifi } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BRAND_GRADIENT } from "@/lib/brand";

type ProductPoint = {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string;
  icon: typeof Monitor;
  top: string;
  left: string;
  href: string;
  popoverPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const products: ProductPoint[] = [
  {
    id: "laptop",
    name: "Enterprise Workstation Laptop",
    category: "End Computing",
    description:
      "High-performance enterprise laptop for heavy workloads and secure remote access.",
    specs: "Intel Core i9 • 64GB RAM • 2TB NVMe",
    icon: Laptop,
    top: "22%",
    left: "18%",
    href: "/products/workstation-laptop",
    popoverPosition: "bottom-right",
  },
  {
    id: "motherboard",
    name: "Server Motherboard",
    category: "Data Center Solutions",
    description:
      "Dual-socket enterprise server motherboard built for intense computing and virtualization.",
    specs: "Dual LGA 4189 • 16x DIMM • PCIe 4.0",
    icon: Server,
    top: "85%",
    left: "15%",
    href: "/products/server-motherboard",
    popoverPosition: "top-right",
  },
  {
    id: "power-supply",
    name: "Industrial Power Supply",
    category: "Power Solutions",
    description:
      "Reliable and highly efficient power supply unit designed for continuous server operation.",
    specs: "1600W • 80 Plus Titanium • Hot-Swappable",
    icon: Zap,
    top: "85%",
    left: "55%",
    href: "/products/power-supply",
    popoverPosition: "top-left",
  },
  {
    id: "server-ram",
    name: "Enterprise Server RAM",
    category: "Data Center Solutions",
    description:
      "High-speed ECC memory modules designed for intensive computing and virtualization.",
    specs: "128GB DDR5 • 4800MT/s • ECC",
    icon: Cpu,
    top: "85%",
    left: "35%",
    href: "/products/server-ram",
    popoverPosition: "top-right",
  },
  {
    id: "enterprise-router",
    name: "Enterprise WiFi Router",
    category: "Networking & Security",
    description:
      "High-performance WiFi 7 access point built for dense enterprise environments.",
    specs: "WiFi 7 • 10GbE Uplink • AI Roaming",
    icon: Wifi,
    top: "85%",
    left: "85%",
    href: "/products/enterprise-router",
    popoverPosition: "top-left",
  },
  {
    id: "desktop-pc",
    name: "Enterprise Desktop PC",
    category: "End Computing",
    description:
      "Secure and powerful small form factor desktop built for enterprise deployments.",
    specs: "Intel vPro • 32GB RAM • TPM 2.0",
    icon: Monitor,
    top: "45%",
    left: "18%",
    href: "/products/enterprise-desktop",
    popoverPosition: "bottom-right",
  },
];

const categories = ["All Products", "Audio Visual", "Networking", "Data Center", "Power"];

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "All Products") return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const getPopoverClasses = (position: ProductPoint["popoverPosition"]) => {
    switch (position) {
      case "top-left":
        return "bottom-full right-0 mb-4";
      case "top-right":
        return "bottom-full left-0 mb-4";
      case "bottom-left":
        return "top-full right-0 mt-4";
      case "bottom-right":
      default:
        return "top-full left-0 mt-4";
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-black py-24 sm:py-32">
      {/* Background ambient lighting glows to match About & Services theme */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#29B9F2]/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 translate-x-1/3 translate-y-1/3 rounded-full bg-[#25D9C7]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header matching theme styling */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            Interactive Showcase
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Explore Hardware &amp; Enterprise Solutions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Hover or tap any product hotspot on the video frame to inspect specifications, key features, and enterprise deployment options.
          </p>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition duration-300 ${
                  isSelected
                    ? "bg-[#29B9F2] text-black shadow-[0_0_20px_rgba(41,185,242,0.4)]"
                    : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </Reveal>

        {/* Video Frame Canvas */}
        <Reveal delay={0.15} className="mt-12 sm:mt-16">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-sm sm:p-4">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              {/* Main Video */}
              <video
                src="/product.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-auto max-h-[700px] w-full object-cover"
              />

              {/* Subtle Ambient Vignette Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Interactive Product Pointers */}
              {filteredProducts.map((product) => {
                const Icon = product.icon;
                const isActive = activeId === product.id;

                return (
                  <div
                    key={product.id}
                    style={{ top: product.top, left: product.left }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    onMouseEnter={() => setActiveId(product.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing Outer Aura */}
                      <span className="absolute h-10 w-10 animate-ping rounded-full bg-[#25D9C7]/40 opacity-75 sm:h-12 sm:w-12" />

                      {/* Hotspot Pin Trigger */}
                      <Link
                        href={product.href}
                        className={`group/pin relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/90 text-white shadow-[0_0_20px_rgba(37,217,199,0.5)] transition duration-300 hover:scale-125 hover:border-[#25D9C7] hover:bg-[#25D9C7] hover:text-black sm:h-11 sm:w-11 ${
                          isActive ? "scale-125 border-[#25D9C7] bg-[#25D9C7] text-black shadow-[0_0_30px_rgba(37,217,199,0.8)]" : ""
                        }`}
                      >
                        <Icon className="h-4 w-4 transition duration-300 group-hover/pin:rotate-12 sm:h-5 sm:w-5" />
                      </Link>

                      {/* Hover Popover Tooltip */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className={`absolute ${getPopoverClasses(
                              product.popoverPosition
                            )} pointer-events-auto z-30 w-72 rounded-2xl border border-white/15 bg-black/95 p-5 shadow-2xl backdrop-blur-xl sm:w-80`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="rounded-md border border-[#29B9F2]/30 bg-[#29B9F2]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#29B9F2]">
                                {product.category}
                              </span>
                            </div>

                            <h3 className="mt-2.5 text-base font-semibold text-white sm:text-lg">
                              {product.name}
                            </h3>

                            <p className="mt-1.5 text-xs leading-relaxed text-white/60 sm:text-sm">
                              {product.description}
                            </p>

                            <div className="mt-3 flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/70">
                              <Sparkles className="h-3 w-3 shrink-0 text-[#25D9C7]" />
                              <span>{product.specs}</span>
                            </div>

                            <Link
                              href={product.href}
                              style={{ backgroundImage: BRAND_GRADIENT }}
                              className="group/btn mt-4 inline-flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold text-black transition duration-300 hover:opacity-90"
                            >
                              <span>View Product Details</span>
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
