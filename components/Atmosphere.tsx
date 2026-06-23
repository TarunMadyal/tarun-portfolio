"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Slow-drifting volumetric fog that sits *behind* all content (z-index -1),
 * so readability is never affected. Two counter-drifting bands + one deep
 * glow give the page a living, layered-forest atmosphere.
 * Tints shift subtly between light (misty) and dark (deep-forest) modes.
 */
export default function Atmosphere() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const light = theme === "light";

  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: -1, pointerEvents: "none" }}
    >
      {/* Upper drifting band */}
      <div
        className="fog-layer"
        style={{
          top: "8%",
          left: "-15%",
          width: "70%",
          height: "42%",
          background: light
            ? "radial-gradient(ellipse at center, rgba(180,214,190,0.55), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(36,86,58,0.40), transparent 70%)",
          opacity: light ? 0.7 : 0.55,
          animation: "fog-drift 34s ease-in-out infinite alternate",
        }}
      />
      {/* Lower counter-drifting band */}
      <div
        className="fog-layer"
        style={{
          bottom: "10%",
          right: "-20%",
          width: "75%",
          height: "46%",
          background: light
            ? "radial-gradient(ellipse at center, rgba(168,206,224,0.45), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(28,64,92,0.34), transparent 70%)",
          opacity: light ? 0.6 : 0.5,
          animation: "fog-drift-rev 46s ease-in-out infinite alternate",
        }}
      />
      {/* Deep central glow — breathes slowly */}
      <div
        className="fog-layer"
        style={{
          top: "40%",
          left: "30%",
          width: "45%",
          height: "40%",
          background: light
            ? "radial-gradient(circle, rgba(82,183,136,0.16), transparent 70%)"
            : "radial-gradient(circle, rgba(52,183,136,0.12), transparent 70%)",
          animation: "glow-breathe 12s ease-in-out infinite",
        }}
      />
    </div>
  );
}
