"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function buildSequence(digit: number, loops: number) {
  const sequence: number[] = [];
  for (let l = 0; l < loops; l++) {
    for (let d = 0; d <= 9; d++) sequence.push(d);
  }
  for (let d = 0; d <= digit; d++) sequence.push(d);
  return sequence;
}

type DigitReelProps = {
  digit: number;
  started: boolean;
  delay: number;
};

function DigitReel({ digit, started, delay }: DigitReelProps) {
  const sequence = buildSequence(digit, 2);
  const finalIndex = sequence.length - 1;

  return (
    <span
      className="relative inline-block h-[1em] overflow-hidden align-baseline"
      style={{ lineHeight: 1 }}
    >
      <span aria-hidden className="invisible">
        {digit}
      </span>
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        initial={{ y: 0 }}
        animate={started ? { y: `-${finalIndex}em` } : { y: 0 }}
        transition={{
          duration: 1.4,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {sequence.map((d, i) => (
          <span key={i} className="block h-[1em]" style={{ lineHeight: 1 }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

type OdometerProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export default function Odometer({
  value,
  suffix = "",
  className = "",
}: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useInView(ref, { once: true, margin: "-80px" });
  const formatted = value.toLocaleString("en-US");

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline tabular-nums ${className}`}
    >
      {formatted.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <DigitReel key={i} digit={Number(ch)} started={started} delay={i * 0.08} />
        ) : (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ),
      )}
      {suffix}
    </span>
  );
}
