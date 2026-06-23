"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/* Single drifting leaf */
function Leaf({ index }: { index: number }) {
  const positions = [8, 18, 32, 48, 61, 74, 85, 93];
  const durations = [13, 17, 12, 19, 15, 11, 18, 14];
  const delays    = [0,  3,  6,  1,  9,  4,  7,  11];

  return (
    <div
      className={`leaf leaf-${index + 1}`}
      style={{ left: `${positions[index]}%` }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ rotate: [0, 25, -20, 15, -10, 5, 0] }}
        transition={{
          duration: durations[index],
          repeat: Infinity,
          ease: "easeInOut",
          delay: delays[index],
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1 C 12 1 13 6 13 7 C 13 11 10 13 7 13 C 4 13 1 11 1 7 C 1 3 2 1 7 1 Z"
            fill="#52B788"
            fillOpacity="0.65"
          />
          <path d="M7 1 L7 13" stroke="#3A8F67" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M7 5 Q10 7 13 7" stroke="#3A8F67" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
          <path d="M7 5 Q4 7 1 7"  stroke="#3A8F67" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
}

interface FireflyConfig {
  left: string;
  top: string;
  duration: number;
  delay: number;
}

/* Single firefly */
function Firefly({ cfg }: { cfg: FireflyConfig }) {
  return (
    <motion.div
      className="firefly"
      style={{
        width: 5,
        height: 5,
        background: "#D4AC52",
        boxShadow: "0 0 6px 2px rgba(212,172,82,0.7)",
        left: cfg.left,
        top:  cfg.top,
      }}
      animate={{
        x:       [0, 18, -12, 8, -18, 0],
        y:       [0, -14, 8, 18, -8, 0],
        opacity: [0.5, 1, 0.4, 0.9, 0.6, 0.5],
        scale:   [1, 1.3, 0.8, 1.2, 0.9, 1],
      }}
      transition={{
        duration: cfg.duration,
        repeat:   Infinity,
        ease:     "easeInOut",
        delay:    cfg.delay,
      }}
    />
  );
}

const FIREFLIES: FireflyConfig[] = [
  { left: "5%",  top: "40%", duration: 6, delay: 0   },
  { left: "15%", top: "60%", duration: 7, delay: 1.5 },
  { left: "25%", top: "35%", duration: 5, delay: 0.8 },
  { left: "40%", top: "55%", duration: 8, delay: 2.2 },
  { left: "60%", top: "42%", duration: 6, delay: 0.4 },
  { left: "72%", top: "65%", duration: 7, delay: 1.1 },
  { left: "82%", top: "38%", duration: 5, delay: 2.8 },
  { left: "90%", top: "58%", duration: 8, delay: 0.6 },
];

export default function NatureParticles() {
  const { theme } = useTheme();
  const isDay = theme === "light";
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (!mounted || reduced) return null;

  return (
    <>
      {/* Leaves — day only */}
      <AnimatePresence>
        {isDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2 }}
          >
            {Array.from({ length: 6 }, (_, i) => <Leaf key={i} index={i} />)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fireflies — night only */}
      <AnimatePresence>
        {!isDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2 }}
          >
            {FIREFLIES.map((ff, i) => (
              <Firefly key={i} cfg={ff} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
