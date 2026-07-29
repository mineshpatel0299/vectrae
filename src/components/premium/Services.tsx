"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Headset,
  Laptop,
  MonitorPlay,
  Network,
  PackageCheck,
  Server,
  Zap,
  Plus,
} from "lucide-react";
import { services } from "@/data/services";
import { BRAND_GRADIENT } from "@/lib/brand";
import Reveal from "./Reveal";

const icons = [MonitorPlay, Network, Server, Laptop, PackageCheck, Zap, Headset];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            Solutions &amp; Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Every layer of enterprise technology, covered.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-white/10">
          {services.map((service, i) => {
            const Icon = icons[i];
            const isOpen = openIndex === i;
            return (
              <Reveal key={service.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 py-6 text-left sm:gap-6"
                  >
                    <span
                      className={`font-mono text-sm transition-colors duration-300 ${
                        isOpen ? "text-[#29B9F2]" : "text-white/25"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-lg font-semibold transition-colors duration-300 sm:text-2xl ${
                        isOpen ? "text-white" : "text-white/50"
                      }`}
                    >
                      {service.title}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                        isOpen
                          ? "border-[#29B9F2]/40 bg-[#29B9F2]/10 text-[#29B9F2] rotate-45"
                          : "border-white/10 text-white/40"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-5 pb-8 pl-0 sm:gap-6 sm:pl-16">
                          <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                            style={{ color: "#29B9F2" }}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                            {service.description}
                          </p>
                        </div>
                        <div
                          className="h-px w-full"
                          style={{ backgroundImage: BRAND_GRADIENT, opacity: 0.4 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
