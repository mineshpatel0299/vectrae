"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterWordProps = {
  words: string[];
  className?: string;
  cursorClassName?: string;
  pauseDuration?: number;
};

export default function TypewriterWord({
  words,
  className = "",
  cursorClassName = "bg-sky-300",
  pauseDuration = 1800,
}: TypewriterWordProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        const jitter = 45 + Math.random() * 45;
        const timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          jitter,
        );
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("pausing"), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (text.length > 0) {
      const jitter = 20 + Math.random() * 20;
      const timeout = setTimeout(() => setText(text.slice(0, -1)), jitter);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }, 0);
    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, pauseDuration]);

  return (
    <span
      className="relative inline-flex items-baseline"
      style={{ minWidth: `${longest.length}ch` }}
    >
      <span className={`text-left ${className}`}>{text}</span>
      <motion.span
        aria-hidden
        className={`ml-1 inline-block w-0.75 rounded-full ${cursorClassName}`}
        style={{ height: "0.85em" }}
        animate={{ opacity: [1, 1, 0.15, 0.15] }}
        transition={{
          duration: 1,
          times: [0, 0.5, 0.5, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}
