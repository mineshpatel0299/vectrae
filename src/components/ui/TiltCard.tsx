"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function TiltCard({
  children,
  className = "",
  strength = 8,
}: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-strength, strength]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
