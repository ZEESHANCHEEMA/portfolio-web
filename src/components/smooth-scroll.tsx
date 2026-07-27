"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/** Adds eased native scrolling while preserving accessibility and sticky positioning. */
export function SmoothScroll() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  if (reduceMotion) return null;

  return (
    <ReactLenis
      root
      options={{
        anchors: { duration: 1.15 },
        autoRaf: true,
        duration: 1.05,
        easing: (progress) => Math.min(1, 1.001 - 2 ** (-10 * progress)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      }}
    />
  );
}
