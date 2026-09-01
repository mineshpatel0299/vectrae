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
import { BRAND_GRADIENT } from "@/lib/brand";

const BATCH_SIZE = 6;
const ROTATE_INTERVAL_MS = 3500;

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

function LogoCard({ name, logo }: ClientLogo) {
  return (
    <div className="flex h-full min-h-28 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md">
      <Image
        src={logo}
        alt={name}
        width={220}
        height={110}
        unoptimized
        className="h-8 w-auto max-w-[65%] object-contain sm:h-9"
      />
    </div>
  );
}

function ClientWall() {
  const [batchIndex, setBatchIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
    radial-gradient(
      420px circle at ${mouseX}px ${mouseY}px,
      rgba(37,217,199,0.14),
      transparent 70%
    )
  `;

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
    <div className="flex h-full flex-col">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="group/wall relative flex-1"
      >
        {/* Cursor glow */}
        <motion.div
          aria-hidden
          style={{ background }}
          className="pointer-events-none absolute -inset-4 rounded-4xl opacity-0 transition-opacity duration-500 group-hover/wall:opacity-100"
        />

        {/* Logo carousel viewport */}
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={batchIndex}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
                grid
                grid-cols-2
                grid-rows-3
                gap-3
                sm:gap-4
              "
            >
              {activeBatch.map((card) => (
                <LogoCard key={card.name} {...card} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
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
        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[40%_60%]
            lg:items-stretch
            lg:gap-16
          "
        >
          {/* LEFT CONTENT */}
          <div
            className="
              flex
              flex-col
              justify-center
              lg:min-h-[480px]
            "
            data-aos="fade-right"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#25D9C7]">
              Client Portfolio
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Trusted across India&apos;s largest{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: BRAND_GRADIENT }}
              >
                enterprises
              </span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              From global banks to Fortune 500 manufacturers, enterprises rely
              on Vectrae to deliver PAN-India technology infrastructure.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6">
              <div>
                <p className="text-2xl font-semibold text-neutral-900">
                  2,300+
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Enterprises served
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-neutral-900">250+</p>

                <p className="mt-1 text-xs text-neutral-500">
                  Technology experts
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT LOGO WALL */}
          <div className="lg:min-h-[480px]">
            <ClientWall />
          </div>
        </div>
      </div>
    </section>
  );
}
