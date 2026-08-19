"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BRAND_GRADIENT } from "@/lib/brand";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, backgroundImage: BRAND_GRADIENT }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left"
    />
  );
}
