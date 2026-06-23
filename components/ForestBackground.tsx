"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/* Twinkling stars for night sky */
function Stars() {
  const stars = [
    { x: "8%",  y: "6%",  r: 1.2, d: 0   },
    { x: "18%", y: "12%", r: 0.9, d: 0.3 },
    { x: "30%", y: "4%",  r: 1.5, d: 0.7 },
    { x: "42%", y: "9%",  r: 1.0, d: 1.1 },
    { x: "55%", y: "3%",  r: 1.3, d: 0.4 },
    { x: "67%", y: "14%", r: 0.8, d: 0.9 },
    { x: "75%", y: "5%",  r: 1.6, d: 0.2 },
    { x: "84%", y: "10%", r: 1.0, d: 1.4 },
    { x: "92%", y: "7%",  r: 1.2, d: 0.6 },
    { x: "12%", y: "20%", r: 0.7, d: 1.8 },
    { x: "35%", y: "18%", r: 1.0, d: 0.5 },
    { x: "62%", y: "22%", r: 0.9, d: 1.2 },
    { x: "80%", y: "18%", r: 1.1, d: 0.8 },
    { x: "50%", y: "15%", r: 0.8, d: 2.0 },
    { x: "22%", y: "28%", r: 0.6, d: 1.6 },
  ];

  return (
    <>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: s.x, top: s.y, width: s.r * 2, height: s.r * 2 }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.9, 1.3, 0.9] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/* Glowing moon */
function Moon() {
  return (
    <motion.div
      className="absolute"
      style={{ right: "12%", top: "8%" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 90, height: 90, left: -25, top: -25,
            background: "radial-gradient(circle, rgba(200,220,240,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Moon disc */}
        <div
          className="rounded-full"
          style={{ width: 40, height: 40, background: "#D8E8F0" }}
        />
        {/* Crescent shadow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 32, height: 32, top: 2, right: -4,
            background: "rgba(10,20,40,0.85)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* Warm sun */
function Sun() {
  return (
    <motion.div
      className="absolute"
      style={{ left: "10%", top: "6%" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 100, height: 100,
            background: "radial-gradient(circle, rgba(255,210,70,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Mid glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 64, height: 64,
            background: "radial-gradient(circle, rgba(255,220,80,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Sun disc */}
        <div
          className="rounded-full"
          style={{
            width: 36, height: 36,
            background: "radial-gradient(circle at 38% 38%, #FFE566, #FDB813)",
            boxShadow: "0 0 16px rgba(253,184,19,0.9)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* Slow-drifting cloud */
function FloatingCloud({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: "110vw", opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration: 60 + delay * 8, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width="130" height="55" viewBox="0 0 130 55" fill="none">
        <ellipse cx="65" cy="40" rx="58" ry="22" fill="white" fillOpacity="0.55" />
        <ellipse cx="44" cy="33" rx="32" ry="24" fill="white" fillOpacity="0.55" />
        <ellipse cx="88" cy="30" rx="26" ry="20" fill="white" fillOpacity="0.55" />
      </svg>
    </motion.div>
  );
}

export default function ForestBackground() {
  const { theme } = useTheme();
  const isDay = theme === "light";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* ── Sky gradient ── */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDay
            ? "linear-gradient(180deg, #72BCE8 0%, #ABD9F0 28%, #C8EBD8 60%, #DBEFD6 100%)"
            : "linear-gradient(180deg, #020D08 0%, #051408 35%, #091A0D 65%, #0E2414 100%)",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* ── Stars / Moon (night) ── */}
      <AnimatePresence>
        {!isDay && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stars />
            <Moon />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sun / Clouds (day) ── */}
      <AnimatePresence>
        {isDay && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sun />
            <FloatingCloud className="top-[12%]" delay={0} />
            <FloatingCloud className="top-[22%]" delay={22} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Far mountains ── */}
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          style={{ width: "100%", height: 180, display: "block" }}
        >
          <motion.path
            d="M0,180 L180,70 L360,130 L540,40 L720,110 L900,55 L1080,100 L1260,45 L1440,80 L1440,260 L0,260 Z"
            animate={{ fill: isDay ? "#6B9B58" : "#0C1F0C" }}
            transition={{ duration: 1.0 }}
          />
          <motion.path
            d="M0,210 L140,140 L280,180 L450,110 L640,165 L820,120 L1000,165 L1180,125 L1340,155 L1440,130 L1440,260 L0,260 Z"
            animate={{ fill: isDay ? "#4A7A40" : "#071408" }}
            transition={{ duration: 1.0 }}
          />
          {/* Tree-line silhouette */}
          <motion.path
            d="M0,248 L28,218 L56,238 L84,208 L112,232 L140,200 L168,230 L196,198 L224,228 L252,200 L280,232 L308,198 L336,228 L364,204 L392,232 L420,200 L448,228 L476,202 L504,232 L532,200 L560,228 L588,202 L616,232 L644,200 L672,228 L700,204 L728,232 L756,200 L784,228 L812,202 L840,232 L868,200 L896,228 L924,204 L952,232 L980,200 L1008,228 L1036,202 L1064,232 L1092,200 L1120,228 L1148,204 L1176,232 L1204,200 L1232,228 L1260,202 L1288,232 L1316,200 L1344,228 L1372,204 L1400,232 L1428,202 L1440,218 L1440,260 L0,260 Z"
            animate={{ fill: isDay ? "#1E4A1A" : "#030C03" }}
            transition={{ duration: 1.0 }}
          />
        </svg>
      </div>

      {/* ── Overlay to ensure text readability ── */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDay
            ? "linear-gradient(to bottom, transparent 0%, rgba(238,247,241,0.45) 80%, rgba(238,247,241,0.85) 100%)"
            : "linear-gradient(to bottom, transparent 0%, rgba(6,17,10,0.55) 75%, rgba(6,17,10,0.90) 100%)",
        }}
        transition={{ duration: 1.0 }}
      />
    </div>
  );
}
