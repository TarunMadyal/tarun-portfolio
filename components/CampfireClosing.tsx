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
      <motion.div
        aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[55px] pointer-events-none"
        style={{ bottom: 6, width: 200, height: 120, background: "radial-gradient(ellipse at center, rgba(251,146,60,0.45), transparent 70%)" }}
        animate={{ opacity: hot ? 1 : 0.6, scale: hot ? 1.25 : 1 }}
        transition={{ duration: 0.4 }}
      />

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

/* A gliding bird (gull silhouette) with flapping wings. */
const BIRDS = [
  { top: 34, scale: 1.0, dur: 15, delay: 0 },
  { top: 60, scale: 0.8, dur: 18, delay: 2.5 },
  { top: 26, scale: 0.7, dur: 21, delay: 6 },
  { top: 78, scale: 0.9, dur: 16, delay: 1.2 },
  { top: 50, scale: 0.65, dur: 23, delay: 8 },
];

function Bird({ top, scale, dur, delay }: { top: number; scale: number; dur: number; delay: number }) {
  return (
    <motion.div
      aria-hidden className="absolute"
      style={{ top }}
      initial={{ left: "-8%" }}
      animate={{ left: "112%" }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      <motion.svg
        width={20 * scale} height={9 * scale} viewBox="0 0 20 9"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M1 7 Q5.5 1 10 6 Q14.5 1 19 7" stroke="#6b5b4e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}

/* LIGHT MODE — a calm sunset over the forest, with a flock gliding past. */
function SunsetScene({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full" style={{ height: 230 }}>
      {/* warm sky glow rising from the horizon */}
      <motion.div
        aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[70px] pointer-events-none"
        style={{
          bottom: 4, width: 460, height: 240,
          background: "radial-gradient(circle at 50% 82%, rgba(251,146,60,0.42), rgba(253,224,107,0.22) 42%, transparent 72%)",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.1 }}
      />

      {/* drifting warm clouds */}
      {[{ top: 56, w: 90, dur: 40, delay: 0, o: 0.55 }, { top: 96, w: 70, dur: 52, delay: 6, o: 0.4 }].map((c, i) => (
        <motion.div key={i} aria-hidden className="absolute rounded-full blur-[14px] pointer-events-none"
          style={{ top: c.top, width: c.w, height: c.w * 0.32, background: "rgba(255,225,180,0.8)", opacity: c.o }}
          initial={{ left: "-15%" }} animate={{ left: "115%" }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "linear" }} />
      ))}

      {/* the setting sun — descends gently into place, then glows */}
      <motion.div
        aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 92, height: 92, bottom: 18,
          background: "radial-gradient(circle at 50% 38%, #FFF1C2, #FDB813 55%, #F97316)",
        }}
        initial={{ y: -56, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="absolute rounded-full"
          style={{ inset: -18, background: "radial-gradient(circle, rgba(253,184,19,0.45), transparent 68%)" }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* the flock */}
      {BIRDS.map((b, i) => <Bird key={i} {...b} />)}
    </div>
  );
}

/**
 * Closing vignette at the end of the trail — theme-aware.
 * Dark: a campfire that flares on hover. Light: a sunset with a passing flock.
 */
export default function CampfireClosing() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {theme === "light" ? (
        <SunsetScene inView={inView} />
      ) : (
        <div className="flex items-end justify-center pt-8 pb-16 px-6" style={{ minHeight: 190 }}>
          <Campfire inView={inView} />
        </div>
      )}
    </div>
  );
}
