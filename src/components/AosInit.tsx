"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 80,
      anchorPlacement: "top-bottom",
      disable: prefersReduced,
    });
  }, []);

  return null;
}
