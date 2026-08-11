"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_GRADIENT } from "@/lib/brand";

type ServiceCardItem = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

const SERVICE_CARDS: ServiceCardItem[] = [
  {
    title: "Boardroom & AV Solutions",
    image: "/images/blog/av-tech.png",
    alt: "Vectrae AV boardroom deployment",
    href: "/services/boardroom-av",
  },
  {
    title: "Networking & Wi-Fi Solutions",
    image: "/images/products/router.png",
    alt: "Enterprise networking and Wi-Fi router",
    href: "/services/networking-wifi",
  },
  {
    title: "Data Center & Security Solutions",
    image: "/images/products/server-ram.png",
    alt: "Data center server infrastructure",
    href: "/services/data-center-security",
  },
  {
    title: "End-Computing Solutions",
    image: "/images/products/laptop.png",
    alt: "Enterprise laptops and end computing",
    href: "/services/end-computing",
  },
  {
    title: "IT Spare & Accessories",
    image: "/images/products/motherboard.png",
    alt: "IT spare parts and components",
    href: "/services/it-spares",
  },
];

function ServiceCard({ card, index }: { card: ServiceCardItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[420px] w-full overflow-hidden rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.334px)]"
    >
      {/* Full-bleed background photo */}
      <Image
        src={card.image}
        alt={card.alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Strong dark scrim so text is always readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70" />

      {/* Glass inner border frame */}
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/25" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        {/* Bottom-left: title */}
        <h3 className="text-xl font-bold leading-snug text-white drop-shadow-md">
          {card.title}
        </h3>

        {/* Explore More pill */}
        <div className="mt-4 flex">
          <Link
            href={card.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/25 hover:border-white/50"
          >
            Explore More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
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
            Five pillars of{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              enterprise technology
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-500">
            From boardroom AV and networking to data centers and end-computing — every solution,
            every scale, delivered PAN-India.
          </p>
        </div>

        {/* Card layout — flex-wrap so an incomplete last row stays centered */}
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
