"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function StatCounter({
  value,
  suffix = "",
  duration = 2,
  className = "",
}: StatCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!isInView || !node) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = Math.floor(latest).toLocaleString("en-US");
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span className={className}>
      <span ref={nodeRef}>0</span>
      {suffix}
    </span>
  );
}
