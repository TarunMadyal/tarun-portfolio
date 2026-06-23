"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const STARS = [
  { x: 8,  y: 7,  s: 1.4, d: 0,    o: 0.95 },
  { x: 22, y: 12, s: 1.0, d: 0.15, o: 0.75 },
  { x: 38, y: 5,  s: 1.7, d: 0.28, o: 1.0  },
  { x: 54, y: 14, s: 1.1, d: 0.08, o: 0.80 },
  { x: 68, y: 7,  s: 0.9, d: 0.20, o: 0.65 },
];

export default function DayNightToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "light";

  return (
    <button
      onClick={(e) => toggleTheme({ clientX: e.clientX, clientY: e.clientY })}
      aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
      data-cursor="hover"
      className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        width: 80,
        height: 36,
        /* Night sky as base — prevents any transparent flash */
        background: "linear-gradient(135deg, #0B1B2E 0%, #192A48 100%)",
        /* Ring colours pulled from theme tokens so no black artifact appears */
        ["--tw-ring-color" as string]: "var(--accent-violet)",
        ["--tw-ring-offset-color" as string]: "var(--bg-page)",
        boxShadow: isDay
          ? "0 0 12px rgba(109,192,232,0.45), inset 0 1px 0 rgba(255,255,255,0.25)"
          : "0 0 10px rgba(11,27,46,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "box-shadow 0.8s ease",
      }}
    >
      {/* Day sky — fades in when light mode */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #6DC0E8 0%, #A8D9EE 100%)" }}
        initial={{ opacity: isDay ? 1 : 0 }}
        animate={{ opacity: isDay ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Stars — night only */}
      <AnimatePresence>
        {!isDay && STARS.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{ left: star.x, top: star.y, width: star.s * 2, height: star.s * 2 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [star.o * 0.3, star.o, star.o * 0.3], scale: [0.8, 1, 0.8] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              delay:    0.25 + i * 0.1,
              duration: 2 + i * 0.4,
              repeat:   Infinity,
              ease:     "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cloud — day only */}
      <AnimatePresence>
        {isDay && (
          <motion.div
            className="absolute"
            style={{ right: 10, top: 8 }}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 0.85, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <svg width="24" height="13" viewBox="0 0 24 13" fill="none">
              <ellipse cx="12" cy="10" rx="10" ry="5"   fill="white" fillOpacity="0.90" />
              <ellipse cx="9"  cy="7.5" rx="5.5" ry="4.5" fill="white" fillOpacity="0.90" />
              <ellipse cx="16" cy="8"  rx="4.5" ry="4"   fill="white" fillOpacity="0.90" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding handle — sun ↔ moon */}
      <motion.div
        className="absolute top-[4px] rounded-full overflow-hidden"
        style={{ width: 28, height: 28, zIndex: 2 }}
        animate={{ x: isDay ? 4 : 48 }}
        transition={{ type: "spring", stiffness: 290, damping: 28 }}
      >
        {/* Sun disc (gradient via style, not animate — avoids Framer Motion warning) */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 38% 38%, #FFE066, #FDB813)" }}
          animate={{ opacity: isDay ? 1 : 0, boxShadow: isDay ? "0 0 12px rgba(253,184,19,0.85)" : "0 0 0px rgba(253,184,19,0)" }}
          transition={{ duration: 0.45 }}
        />

        {/* Moon disc */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "#C8D8E8" }}
          animate={{ opacity: isDay ? 0 : 1, boxShadow: isDay ? "0 0 0px rgba(200,220,240,0)" : "0 0 10px rgba(200,220,240,0.65)" }}
          transition={{ duration: 0.45 }}
        />

        {/* Moon crescent — soft blue shadow, not black */}
        <AnimatePresence>
          {!isDay && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 22, height: 22, top: 2, right: -2,
                background: "radial-gradient(circle at 40% 40%, #131f38, #1a2d50)",
                opacity: 0.88,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.88 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            />
          )}
        </AnimatePresence>

        {/* Sun rays */}
        <AnimatePresence>
          {isDay && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute"
                  style={{
                    width: 3, height: 3, borderRadius: "50%",
                    background: "rgba(255,220,50,0.85)",
                    top: "50%", left: "50%",
                    transform: `rotate(${deg}deg) translateX(18px) translate(-50%, -50%)`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
