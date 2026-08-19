"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { MouseEvent } from "react";
import { clientLogos } from "@/data/clients";

type FeaturedClient = {
  name: string;
  wide?: boolean;
  tag?: string;
};

const FEATURED: FeaturedClient[] = [
  { name: "Deloitte", wide: true, tag: "Professional Services" },
  { name: "MongoDB" },
  { name: "HDFC Bank" },
  { name: "Ford" },
  { name: "J.P. Morgan", wide: true, tag: "Investment Banking" },
  { name: "Adobe" },
  { name: "Accenture" },
  { name: "KPMG" },
  { name: "PepsiCo" },
  { name: "PwC" },
  { name: "McKinsey & Company", wide: true, tag: "Management Consulting" },
  { name: "Airtel" },
  { name: "Siemens" },
  { name: "GE" },
  { name: "American Express", wide: true, tag: "Financial Services" },
  { name: "Tata Consultancy Services" },
];

const FEATURED_NAMES = new Set(FEATURED.map((c) => c.name));

const MORE: FeaturedClient[] = [
  { name: "IndusInd Bank", wide: true, tag: "Banking" },
  { name: "Thales", wide: true, tag: "Aerospace & Defense" },
  { name: "Moody's", wide: true, tag: "Credit Ratings" },
  ...clientLogos
    .filter((c) => !FEATURED_NAMES.has(c.name))
    .map((c) => ({ name: c.name }))
    .filter((c) => !["IndusInd Bank", "Thales", "Moody's"].includes(c.name)),
];

function resolveCards(list: FeaturedClient[]) {
  return list
    .map((featured) => {
      const client = clientLogos.find((c) => c.name === featured.name);
      return client ? { ...featured, logo: client.logo } : null;
    })
    .filter((c): c is FeaturedClient & { logo: string } => Boolean(c));
}

const primaryCards = resolveCards(FEATURED);
const moreCards = resolveCards(MORE);

function LogoCard({
  name,
  logo,
  wide,
  tag,
  delay,
}: FeaturedClient & { logo: string; delay: number }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className={`group relative flex h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md sm:h-44 ${
        wide ? "col-span-2" : ""
      }`}
    >
      <Image
        src={logo}
        alt={name}
        width={wide ? 320 : 210}
        height={110}
        unoptimized
        className="h-14 w-auto max-w-[75%] object-contain sm:h-18"
      />
      {tag && (
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
          {tag}
        </span>
      )}
    </div>
  );
}

function ClientWall() {
  const [expanded, setExpanded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(37,217,199,0.14), transparent 70%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div>
      <div
        onMouseMove={handleMouseMove}
        className="group/wall relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        <motion.div
          aria-hidden
          style={{ background }}
          className="pointer-events-none absolute -inset-4 rounded-4xl opacity-0 transition-opacity duration-500 group-hover/wall:opacity-100"
        />

        {primaryCards.map((card, i) => (
          <LogoCard key={card.name} {...card} delay={Math.min(i * 40, 320)} />
        ))}

        {expanded &&
          moreCards.map((card, i) => (
            <LogoCard key={card.name} {...card} delay={Math.min(i * 40, 320)} />
          ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
        >
          {expanded ? "View less" : "View all clients"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

export default function TrustSignals() {
  return (
    <section className="border-t border-neutral-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start" data-aos="fade-right">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#25D9C7]">
              Client Portfolio
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Trusted across India&apos;s largest enterprises
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              From global banks to Fortune 500 manufacturers, enterprises rely on
              Vectrae to deliver PAN-India technology infrastructure.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6">
              <div>
                <p className="text-2xl font-semibold text-neutral-900">2,300+</p>
                <p className="mt-1 text-xs text-neutral-500">Enterprises served</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-neutral-900">250+</p>
                <p className="mt-1 text-xs text-neutral-500">Technology experts</p>
              </div>
            </div>
          </div>

          <ClientWall />
        </div>
      </div>
    </section>
  );
}
