"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const EMBERS = [
  { left: "46%", x: "-14px", dur: "3.2s", delay: "0s" },
  { left: "50%", x: "10px", dur: "3.8s", delay: "0.6s" },
  { left: "54%", x: "-6px", dur: "2.9s", delay: "1.1s" },
  { left: "49%", x: "16px", dur: "3.5s", delay: "1.7s" },
  { left: "52%", x: "-12px", dur: "3.1s", delay: "2.2s" },
];

/* DARK MODE — a quiet campfire. Hover makes it flare up. */
function Campfire({ inView }: { inView: boolean }) {
  const [hot, setHot] = useState(false);
  return (
    <motion.div
      className="relative"
      style={{ width: 130, height: 120 }}
      onHoverStart={() => setHot(true)}
      onHoverEnd={() => setHot(false)}
      onTapStart={() => setHot((h) => !h)}
      data-cursor="hover"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* warm ground glow */}
      <motion.div
        aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[55px] pointer-events-none"
        style={{ bottom: 6, width: 200, height: 120, background: "radial-gradient(ellipse at center, rgba(251,146,60,0.45), transparent 70%)" }}
        animate={{ opacity: hot ? 1 : 0.6, scale: hot ? 1.25 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* base embers */}
      {EMBERS.map((e, i) => (
        <span key={i} aria-hidden className="absolute rounded-full"
          style={{
            left: e.left, bottom: 50, width: 4, height: 4, background: "#fdba74",
            boxShadow: "0 0 6px 1px rgba(253,186,116,0.8)",
            opacity: hot ? 1 : 0.85,
            ["--ember-x" as string]: e.x,
            animation: `ember-rise ${e.dur} ease-out ${e.delay} infinite`,
          }} />
      ))}

      {/* extra sparks on hover */}
      <AnimatePresence>
        {hot && [0, 1, 2, 3].map((i) => (
          <motion.span key={`spark-${i}`} aria-hidden className="absolute rounded-full"
            style={{ left: `${46 + i * 3}%`, bottom: 56, width: 3, height: 3, background: "#fde68a", boxShadow: "0 0 6px 1px rgba(253,224,107,0.9)" }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -54 - i * 8, x: (i - 1.5) * 12, opacity: [0, 1, 0], scale: [1, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 + i * 0.15, repeat: Infinity, ease: "easeOut", delay: i * 0.18 }}
          />
        ))}
      </AnimatePresence>

      {/* flame */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 38, width: 42, height: 64, transformOrigin: "bottom center" }}
        animate={{ scaleY: hot ? 1.28 : 1, scaleX: hot ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
      >
        <div className="absolute inset-0" style={{ transformOrigin: "bottom center", animation: "flame-flicker 0.9s ease-in-out infinite" }}>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, #f97316, #fb923c 55%, #fde047)",
            clipPath: "polygon(50% 0%, 80% 45%, 70% 100%, 30% 100%, 20% 45%)",
            filter: `drop-shadow(0 0 ${hot ? 16 : 10}px rgba(249,115,22,${hot ? 0.9 : 0.7}))`,
            transition: "filter 0.3s",
          }} />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0" style={{
            width: 18, height: 36,
            background: "linear-gradient(to top, #fbbf24, #fef08a)",
            clipPath: "polygon(50% 0%, 80% 50%, 65% 100%, 35% 100%, 20% 50%)",
            animation: "flame-flicker 0.7s ease-in-out infinite reverse",
          }} />
        </div>
      </motion.div>

      {/* logs + stones */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 28 }}>
        <div className="absolute rounded-full" style={{ width: 66, height: 9, background: "linear-gradient(90deg,#5b3a21,#8a5a34)", transform: "rotate(18deg)", left: -33, top: -4 }} />
        <div className="absolute rounded-full" style={{ width: 66, height: 9, background: "linear-gradient(90deg,#8a5a34,#5b3a21)", transform: "rotate(-18deg)", left: -33, top: -4 }} />
        {[-35, -20, 8, 25].map((x, i) => (
          <span key={i} className="absolute rounded-full" style={{ width: 11, height: 7, background: "var(--text-dim)", left: x, top: 6, opacity: 0.7 }} />
        ))}
      </div>
    </motion.div>
  );
}

/* LIGHT MODE — a balanced stone cairn, the classic trail marker. */
function Cairn({ inView }: { inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  // bottom → top
  const stones = [
    { w: 64, h: 22, c: "linear-gradient(145deg,#b7c1b9,#94a199)" },
    { w: 52, h: 19, c: "linear-gradient(145deg,#aab5ad,#879389)" },
    { w: 42, h: 16, c: "linear-gradient(145deg,#bcc6bd,#9aa69d)" },
    { w: 30, h: 13, c: "linear-gradient(145deg,#a7b2a9,#828e85)" },
  ];
  return (
    <motion.div
      className="relative flex flex-col items-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor="hover"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 130 }}
    >
      {/* soft warm sun glow */}
      <motion.div
        aria-hidden className="absolute rounded-full blur-[55px] pointer-events-none"
        style={{ top: -10, width: 180, height: 140, background: "radial-gradient(circle, rgba(212,172,82,0.35), transparent 70%)" }}
        animate={{ opacity: hovered ? 0.9 : 0.55 }}
        transition={{ duration: 0.4 }}
      />

      {/* stones, stacked with a tiny reveal */}
      <div className="relative flex flex-col items-center justify-end" style={{ height: 92 }}>
        {[...stones].reverse().map((s, idx) => {
          const i = stones.length - 1 - idx; // top index for hover nudge
          const isTop = idx === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: idx === stones.length - 1 ? 0 : -2 }}
            >
              <motion.div
                style={{
                  width: s.w, height: s.h, background: s.c,
                  borderRadius: "50%",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.4)",
                }}
                animate={isTop ? { y: hovered ? -4 : 0, rotate: hovered ? -4 : 0 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* small sprout at the base */}
      <motion.svg width="34" height="22" viewBox="0 0 34 22" className="absolute" style={{ bottom: -2, right: 18 }} aria-hidden>
        <path d="M17 22 L17 10" stroke="#2E7D52" strokeWidth="1.4" strokeLinecap="round" />
        <motion.path d="M17 13 C 11 13 8 9 8 5 C 13 5 17 8 17 13Z" fill="#3FAE72"
          style={{ transformOrigin: "17px 13px" }}
          animate={{ rotate: hovered ? -8 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} />
        <motion.path d="M17 15 C 23 15 26 11 26 7 C 21 7 17 10 17 15Z" fill="#52B788"
          style={{ transformOrigin: "17px 15px" }}
          animate={{ rotate: hovered ? 8 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} />
      </motion.svg>
    </motion.div>
  );
}

/**
 * Quiet closing vignette at the end of the trail — theme-aware.
 * Dark: a campfire that flares on hover. Light: a stone cairn trail marker.
 */
export default function CampfireClosing() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex items-end justify-center pt-8 pb-16 px-6 overflow-hidden" style={{ minHeight: 190 }}>
      {theme === "light" ? <Cairn inView={inView} /> : <Campfire inView={inView} />}
    </div>
  );
}
