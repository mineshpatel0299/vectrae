"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#29B9F2]/15 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]"
          data-aos="fade-up"
        >
          Let's Get Started
        </p>
        <h2
          className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Ready to transform your{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: BRAND_GRADIENT }}>
            enterprise technology?
          </span>
        </h2>
        <p
          className="mt-4 text-base leading-relaxed text-white/50"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Trusted by 2,300+ enterprises. We respond within 4 business hours.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:opacity-90"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Request a Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+911140590964"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
          >
            <PhoneCall className="h-4 w-4 text-[#25D9C7]" />
            +91-11-40590964
          </a>
        </div>
      </div>
    </section>
  );
}
