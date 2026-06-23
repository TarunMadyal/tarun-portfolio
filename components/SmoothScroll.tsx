"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered smooth scrolling for an Apple-grade feel.
 * - Fully disabled when the user prefers reduced motion (falls back to native scroll).
 * - Intercepts in-page anchor links so nav jumps glide instead of snapping.
 * Renders nothing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Glide to anchor targets instead of instant jump
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") {
        e.preventDefault();
        lenis.scrollTo(0, { offset: 0 });
        return;
      }
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -72 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
