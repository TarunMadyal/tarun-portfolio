"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Elegant two-part cursor: a precise dot that tracks 1:1 and a soft ring
 * that trails with spring physics. Expands + shifts colour over interactive
 * elements. Desktop / fine-pointer only — never shown on touch devices, and
 * gracefully absent under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest?.('a, button, [role="button"], input, textarea, label, [data-cursor="hover"]'));
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("cursor-ready");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  if (!enabled) return null;

  const accent = theme === "light" ? "#6B47B8" : "#9B8EC4";

  return (
    <>
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="cursor-dot"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: accent,
          opacity: hidden ? 0 : 1,
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          border: `1.5px solid ${accent}`,
          backgroundColor: hovering ? `${accent}1f` : "transparent",
          opacity: hidden ? 0 : 0.9,
        }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </>
  );
}
