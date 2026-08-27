"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { clientLogos, type ClientLogo } from "@/data/clients";

const BATCH_SIZE = 6;
const ROTATE_INTERVAL_MS = 3500;

// Bento cell spans, in order: 1 large hero tile, 4 regular tiles, 1 wide banner tile.
const BENTO_SPANS = [
  "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 lg:col-span-4",
];

function getBatches(list: ClientLogo[], size: number): ClientLogo[][] {
  const count = Math.ceil(list.length / size);
  const batches: ClientLogo[][] = [];
  for (let b = 0; b < count; b++) {
    const batch: ClientLogo[] = [];
    for (let j = 0; j < size; j++) {
      batch.push(list[(b * size + j) % list.length]);
    }
    batches.push(batch);
  }
  return batches;
}

const BATCHES = getBatches(clientLogos, BATCH_SIZE);

function LogoCard({
  name,
  logo,
  featured,
  spanClassName,
}: ClientLogo & { featured: boolean; spanClassName: string }) {
  return (
    <div
      className={`flex h-full min-h-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md ${spanClassName}`}
    >
      <Image
        src={logo}
        alt={name}
        width={featured ? 260 : 180}
        height={featured ? 140 : 96}
        unoptimized
        className={`w-auto object-contain ${
          featured ? "h-9 max-w-[55%] sm:h-12" : "h-6 max-w-[58%] sm:h-8"
        }`}
      />
    </div>
  );
}

function ClientWall() {
  const [batchIndex, setBatchIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(37,217,199,0.14), transparent 70%)`;

  useEffect(() => {
    if (paused || BATCHES.length <= 1) return;
    const id = setInterval(() => {
      setBatchIndex((i) => (i + 1) % BATCHES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const activeBatch = BATCHES[batchIndex];

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div className="flex h-full flex-col lg:h-full">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="group/wall relative flex-1"
      >
        <motion.div
          aria-hidden
          style={{ background }}
          className="pointer-events-none absolute -inset-4 rounded-4xl opacity-0 transition-opacity duration-500 group-hover/wall:opacity-100"
        />

        <div className="relative h-full min-h-[22rem] overflow-hidden lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={batchIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid h-full grid-cols-2 grid-rows-4 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-3"
            >
              {activeBatch.map((card, i) => (
                <LogoCard
                  key={card.name}
                  {...card}
                  featured={i === 0}
                  spanClassName={BENTO_SPANS[i]}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {BATCHES.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {BATCHES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show client logos group ${i + 1}`}
              onClick={() => setBatchIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === batchIndex ? "w-6 bg-[#25D9C7]" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TrustSignals() {
  return (
    <section className="border-t border-neutral-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-stretch lg:gap-16">
          <div
            className="lg:sticky lg:top-28 lg:flex lg:h-full lg:flex-col lg:justify-center"
            data-aos="fade-right"
          >
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
