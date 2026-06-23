"use client";

import { useCallback } from "react";

/**
 * Lightweight material-style ripple. Returns a pointer-down handler to spread
 * onto any element that is `position: relative; overflow: hidden`.
 * No-op under prefers-reduced-motion.
 */
export function useRipple() {
  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ink = document.createElement("span");
    ink.className = "ripple-ink";
    ink.style.width = ink.style.height = `${size}px`;
    ink.style.left = `${e.clientX - rect.left - size / 2}px`;
    ink.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ink);
    ink.addEventListener("animationend", () => ink.remove(), { once: true });
  }, []);
}
