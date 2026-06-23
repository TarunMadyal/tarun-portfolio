"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaBirds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!containerRef.current || effectRef.current) return;

    let cancelled = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("vanta/dist/vanta.birds.min").then((mod: any) => {
      if (cancelled || !containerRef.current) return;

      // Vanta's UMD bundle may export the constructor as default, as the module
      // itself, or hang it off a global — try all three shapes.
      const BIRDS: ((opts: Record<string, unknown>) => { destroy: () => void }) | undefined =
        typeof mod?.default === "function"
          ? mod.default
          : typeof mod === "function"
          ? mod
          : undefined;

      if (!BIRDS) return;

      effectRef.current = BIRDS({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        backgroundColor: 0x030312,
        color1: 0x7c3aed,
        color2: 0x3b82f6,
        colorMode: "lerp",
        birdSize: 0.9,
        wingSpan: 24,
        speedLimit: 4,
        separation: 55,
        alignment: 65,
        cohesion: 50,
        quantity: 3,
      });
    });

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
