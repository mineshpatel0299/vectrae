"use client";

import { BRAND_GRADIENT } from "@/lib/brand";
import Navbar from "@/components/sections/Navbar";

export default function IndustriesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="pointer-events-none absolute left-1/2 top-0 h-130 w-225 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#29B9F2]/15 blur-[140px]" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-8 text-center sm:pb-28 sm:pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]" data-aos="fade-up">
          Industries We Serve
        </p>
        <h1
          className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Serving India&apos;s Most Demanding Enterprises
        </h1>
        <div
          className="mx-auto mt-6 h-1 w-16 rounded-full"
          style={{ backgroundImage: BRAND_GRADIENT }}
          data-aos="fade-up"
          data-aos-delay="150"
        />
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          From banking to broadcast, every industry runs on different technology requirements.
          Vectrae builds the AV, networking, and infrastructure solutions matched to yours.
        </p>
      </div>
    </section>
  );
}
