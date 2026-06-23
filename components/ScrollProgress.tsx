"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Slim gradient progress bar pinned to the very top of the viewport.
 * Communicates "how far through the journey" — a subtle wayfinding cue.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--accent-green), var(--accent-violet), var(--accent-blue))",
        boxShadow: "0 0 10px var(--glow-violet)",
      }}
    />
  );
}
