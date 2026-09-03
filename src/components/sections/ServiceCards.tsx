"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_GRADIENT } from "@/lib/brand";
import { solutions } from "@/data/solutions";
import TiltCard from "@/components/ui/TiltCard";

type ServiceCardItem = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

const SERVICE_CARDS: ServiceCardItem[] = solutions.map((solution) => ({
  title: solution.title,
  image: solution.heroImage,
  alt: solution.title,
  href: `/solutions/${solution.slug}`,
}));

function ServiceCard({ card, index }: { card: ServiceCardItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.334px)]"
    >
      <Link href={card.href} className="group block">
        <TiltCard strength={5} className="block transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-md transition-shadow duration-500 ease-out group-hover:shadow-[0_0_0_1.5px_rgba(37,217,199,0.5),0_30px_60px_-15px_rgba(0,0,0,0.55)]">
            {/* Index numeral */}
            <span className="absolute right-5 top-5 z-10 text-4xl font-bold text-white/25 transition-colors duration-500 group-hover:text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Full-bleed background photo */}
            <Image
              src={card.image}
              alt={card.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Strong dark scrim so text is always readable */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />

            {/* Diagonal shimmer sweep on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[120%]" />

            {/* Glass inner border frame */}
            <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/25 transition-colors duration-500 group-hover:border-white/45" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold leading-snug text-white drop-shadow-md">
                    {card.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors duration-300 group-hover:text-white/85">
                    Explore Solution
                  </span>
                </div>

                {/* Always-visible clickable affordance */}
                <span
                  style={{ backgroundImage: BRAND_GRADIENT }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-black shadow-lg transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-110"
                >
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </div>
            </div>
          </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}

export default function ServiceCards() {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f0] py-20 sm:py-28">
      {/* Subtle top divider glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: BRAND_GRADIENT }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]">
            What We Offer
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            Seven pillars of{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              enterprise technology
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-500">
            From boardroom AV and networking to data centers, end-computing, and power, every
            solution, every scale, delivered PAN-India.
          </p>
        </div>

        {/* Card layout, flex-wrap so an incomplete last row stays centered */}
        <div className="flex flex-wrap justify-center gap-5">
          {SERVICE_CARDS.map((card, i) => (
            <ServiceCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:opacity-90"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Request a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#solutions"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50"
          >
            View All Solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
