"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EMBERS = [
  { left: "46%", x: "-14px", dur: "3.2s", delay: "0s" },
  { left: "50%", x: "10px", dur: "3.8s", delay: "0.6s" },
  { left: "54%", x: "-6px", dur: "2.9s", delay: "1.1s" },
  { left: "49%", x: "16px", dur: "3.5s", delay: "1.7s" },
  { left: "52%", x: "-12px", dur: "3.1s", delay: "2.2s" },
];

/**
 * A quiet campfire at the end of the trail — the emotional payoff of the journey.
 * Flickering flame + rising embers + a warm message. Deliberately small & subtle.
 */
export default function CampfireClosing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center pt-10 pb-16 px-6 overflow-hidden">
      {/* warm ground glow */}
      <motion.div
        aria-hidden className="absolute bottom-10 w-72 h-40 rounded-full blur-[60px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(251,146,60,0.30), transparent 70%)" }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1 }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg md:text-xl font-medium text-center mb-10 relative z-10"
        style={{ color: "var(--text-primary)" }}
      >
        Thanks for exploring my forest.
      </motion.p>

      {/* Campfire */}
      <motion.div
        className="relative"
        style={{ width: 120, height: 110 }}
        initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* embers */}
        {EMBERS.map((e, i) => (
          <span key={i} aria-hidden className="absolute rounded-full"
            style={{
              left: e.left, bottom: 46, width: 4, height: 4, background: "#fdba74",
              boxShadow: "0 0 6px 1px rgba(253,186,116,0.8)",
              ["--ember-x" as string]: e.x,
              animation: `ember-rise ${e.dur} ease-out ${e.delay} infinite`,
            }} />
        ))}

        {/* flame */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 34, width: 40, height: 60, transformOrigin: "bottom center", animation: "flame-flicker 0.9s ease-in-out infinite" }}>
          {/* outer */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, #f97316, #fb923c 55%, #fde047)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            clipPath: "polygon(50% 0%, 80% 45%, 70% 100%, 30% 100%, 20% 45%)",
            filter: "drop-shadow(0 0 10px rgba(249,115,22,0.7))",
          }} />
          {/* inner */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0" style={{
            width: 18, height: 34,
            background: "linear-gradient(to top, #fbbf24, #fef08a)",
            clipPath: "polygon(50% 0%, 80% 50%, 65% 100%, 35% 100%, 20% 50%)",
            animation: "flame-flicker 0.7s ease-in-out infinite reverse",
          }} />
        </div>

        {/* logs */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 26 }}>
          <div className="absolute rounded-full" style={{ width: 64, height: 9, background: "linear-gradient(90deg,#5b3a21,#8a5a34)", transform: "rotate(18deg)", left: -32, top: -4 }} />
          <div className="absolute rounded-full" style={{ width: 64, height: 9, background: "linear-gradient(90deg,#8a5a34,#5b3a21)", transform: "rotate(-18deg)", left: -32, top: -4 }} />
          {/* stones */}
          {[-34, -20, 8, 24].map((x, i) => (
            <span key={i} className="absolute rounded-full" style={{ width: 11, height: 7, background: "var(--text-dim)", left: x, top: 6, opacity: 0.7 }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
