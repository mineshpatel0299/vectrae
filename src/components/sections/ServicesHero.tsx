"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_GRADIENT } from "@/lib/brand";
import Navbar from "@/components/sections/Navbar";

export default function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="pointer-events-none absolute left-1/2 top-0 h-130 w-225 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#29B9F2]/15 blur-[140px]" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-8 text-center sm:pt-14">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]" data-aos="fade-up">
          Solutions &amp; Services
        </p> */}
        <h1
          className="mt-4 text-6xl font-normal tracking-normal text-white sm:text-7xl lg:text-8xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Solutions
        </h1>
        <div
          className="mx-auto mt-6 h-1 w-16 rounded-full"
          style={{ backgroundImage: BRAND_GRADIENT }}
          data-aos="fade-up"
          data-aos-delay="150"
        />
        <div
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-white/40"
          data-aos="fade-up"
          data-aos-delay="200"
        >

        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-5xl px-6 pb-24 sm:mt-20 sm:pb-32">
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
          <motion.div
            initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          >
            <Image
              src="/images/blog/av-tech.png"
              alt="Vectrae enterprise AV boardroom deployment"
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          </motion.div>

          {/* Top-left overlapping photo */}
          <motion.div
            initial={{ opacity: 0, x: -48, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-8 top-16 rounded-2xl bg-white p-1 shadow-2xl sm:-left-18 sm:top-20"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-xl sm:h-28 sm:w-28">
              <Image
                src="/images/blog/teams-zoom.png"
                alt="Enterprise video collaboration setup"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Bottom-right overlapping photo */}
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 -right-6 rounded-2xl bg-white p-1 shadow-2xl sm:bottom-20 sm:-right-16"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-xl sm:h-28 sm:w-28">
              <Image
                src="/images/blog/managed-it.png"
                alt="24/7 managed IT monitoring"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Paragraph + CTA */}
        <div className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-6 text-center">
          <p className="text-base leading-relaxed text-white/55" data-aos="fade-up">
            From boardrooms to data centers, Vectrae designs, deploys, and supports every layer of
            enterprise technology so your teams can focus on the work that matters.
          </p>

          <Link
            href="#solutions"
            className="group inline-flex shrink-0 items-center gap-4 rounded-full border border-white/10 bg-white/5 py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Explore Our Solutions
            <span
              style={{ backgroundImage: BRAND_GRADIENT }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-transform duration-300 group-hover:rotate-45"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
