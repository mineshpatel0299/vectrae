"use client";

import { Handshake, Layers, MapPin, ShieldCheck, Workflow } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { whyChooseUs } from "@/data/whyChooseUs";

const icons = [Layers, Workflow, Handshake, MapPin, ShieldCheck];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.35"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D9C7]/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]"
            data-aos="fade-up"
          >
            Why Choose Us
          </p>
          <h2
            className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Five Reasons Enterprises Choose Vectrae
          </h2>
        </div>

        <div ref={containerRef} className="relative mt-20 sm:mt-24">
          <div className="absolute left-6 top-0 h-full w-px bg-black/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px bg-[linear-gradient(180deg,_#B6D93B_0%,_#25D9C7_50%,_#29B9F2_100%)] sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="space-y-12 sm:space-y-4">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[i];
              const fromRight = i % 2 === 1;
              return (
                <div
                  key={item.title}
                  className={`relative flex items-start gap-6 pl-16 sm:items-center sm:gap-0 sm:pl-0 ${
                    fromRight ? "sm:flex-row-reverse" : "sm:flex-row"
                  }`}
                >
                  <span className="absolute left-6 top-1.5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#29B9F2] shadow-md sm:left-1/2" />

                  <div
                    data-aos={fromRight ? "fade-left" : "fade-right"}
                    className="py-4 sm:w-1/2 sm:py-8"
                  >
                    <div
                      className={`relative inline-flex max-w-md flex-col gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:border-black/20 hover:shadow-md sm:flex ${
                        fromRight ? "sm:ml-auto sm:items-end sm:text-right" : "sm:items-start sm:text-left"
                      }`}
                    >
                      <span
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/3 text-[#0f9ac9]"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="relative text-lg font-semibold text-neutral-900">
                        {item.title}
                      </h3>
                      <p className="relative text-sm leading-relaxed text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
