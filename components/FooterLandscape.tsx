"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

function NightFirefly({ x, y, dur, delay }: { x: number; y: number; dur: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`, top: `${y}%`,
        width: 4, height: 4,
        background: "#D4AC52",
        boxShadow: "0 0 6px 2px rgba(212,172,82,0.65)",
      }}
      animate={{
        x: [0, 16, -10, 6, -14, 0],
        y: [0, -12, 6, 14, -6, 0],
        opacity: [0.4, 0.9, 0.35, 0.8, 0.5, 0.4],
        scale: [1, 1.3, 0.8, 1.2, 0.9, 1],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

const FIREFLIES = [
  { x: 8,  y: 55, dur: 6,   delay: 0   },
  { x: 18, y: 70, dur: 7.5, delay: 1.2 },
  { x: 32, y: 45, dur: 5.5, delay: 0.6 },
  { x: 52, y: 60, dur: 8,   delay: 2.1 },
  { x: 65, y: 40, dur: 6.5, delay: 0.3 },
  { x: 74, y: 72, dur: 7,   delay: 1.7 },
  { x: 85, y: 50, dur: 5,   delay: 2.5 },
  { x: 92, y: 65, dur: 6,   delay: 0.9 },
];

export default function FooterLandscape() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { theme } = useTheme();
  const isDay  = theme === "light";

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 180 }} aria-hidden="true">

      {/* Sky gradient fill */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isDay
            ? "linear-gradient(180deg, transparent 0%, rgba(238,247,241,0.6) 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(6,17,10,0.7) 100%)",
        }}
      />

      {/* Night: Moon */}
      {!isDay && (
        <motion.div
          className="absolute"
          style={{ right: "12%", top: 12 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          <div
            className="relative rounded-full"
            style={{ width: 30, height: 30, background: "#C8D8E8", boxShadow: "0 0 20px rgba(200,220,240,0.4)" }}
          >
            <div
              className="absolute rounded-full"
              style={{ width: 24, height: 24, top: 3, right: -3, background: "rgba(13,24,42,0.82)" }}
            />
          </div>
        </motion.div>
      )}

      {/* Night: Fireflies */}
      {!isDay && inView && FIREFLIES.map((f, i) => (
        <NightFirefly key={i} x={f.x} y={f.y} dur={f.dur} delay={f.delay} />
      ))}

      {/* Day: Warm sun glow in corner */}
      {isDay && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            right: "8%", top: -20,
            width: 80, height: 80,
            background: "radial-gradient(circle, rgba(253,184,19,0.18) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        />
      )}

      {/* SVG Forest scene */}
      <motion.svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        {/* Rolling hills — far */}
        <path
          d="M0 180 L0 130 Q120 80 240 120 Q360 155 480 100 Q600 50 720 95 Q840 138 960 90 Q1080 45 1200 95 Q1320 140 1440 105 L1440 180 Z"
          fill="var(--accent-green)"
          fillOpacity="0.07"
        />
        {/* Rolling hills — mid */}
        <path
          d="M0 180 L0 148 Q90 118 180 140 Q270 160 360 130 Q450 104 540 128 Q630 150 720 126 Q810 104 900 128 Q990 150 1080 128 Q1170 108 1260 132 Q1350 154 1440 138 L1440 180 Z"
          fill="var(--accent-green)"
          fillOpacity="0.10"
        />

        {/* Far trees — tallest */}
        {[80, 190, 310, 450, 590, 730, 870, 1010, 1150, 1290, 1400].map((x, i) => {
          const h = 55 + (i % 4) * 14;
          return (
            <g key={`ft-${i}`}>
              <rect x={x - 2.5} y={180 - 38} width={5} height={38} fill="var(--text-dim)" fillOpacity="0.15" />
              <ellipse cx={x} cy={180 - 38 - h * 0.52} rx={18} ry={h * 0.54}
                fill="var(--accent-green)" fillOpacity={0.12 + (i % 3) * 0.03} />
            </g>
          );
        })}

        {/* Near trees — shorter, more visible */}
        {[35, 140, 260, 390, 520, 650, 790, 930, 1070, 1200, 1340, 1430].map((x, i) => {
          const h = 38 + (i % 3) * 10;
          return (
            <g key={`nt-${i}`}>
              <rect x={x - 3} y={180 - 28} width={5} height={28} fill="var(--text-dim)" fillOpacity="0.20" />
              <ellipse cx={x} cy={180 - 28 - h * 0.54} rx={15} ry={h * 0.56}
                fill="var(--accent-green)" fillOpacity={0.18 + (i % 2) * 0.04} />
            </g>
          );
        })}

        {/* Grass foreground */}
        <path
          d="M0 180 L0 162 Q24 148 48 160 Q72 172 96 154 Q120 138 144 156 Q168 172 192 154 Q216 138 240 156 Q264 172 288 156 Q312 140 336 156 Q360 172 384 152 Q408 134 432 154 Q456 172 480 154 Q504 136 528 154 Q552 172 576 154 Q600 136 624 154 Q648 172 672 152 Q696 134 720 154 Q744 172 768 152 Q792 134 816 154 Q840 172 864 152 Q888 134 912 154 Q936 172 960 154 Q984 136 1008 154 Q1032 172 1056 154 Q1080 136 1104 154 Q1128 172 1152 154 Q1176 136 1200 154 Q1224 172 1248 154 Q1272 136 1296 154 Q1320 172 1344 154 Q1368 136 1392 154 Q1416 172 1440 154 L1440 180 Z"
          fill="var(--accent-green)"
          fillOpacity="0.18"
        />

        {/* Tiny flowers/shrubs in grass */}
        {[60, 160, 290, 420, 570, 700, 840, 980, 1120, 1260, 1380].map((x, i) => (
          <g key={`shrub-${i}`}>
            <ellipse cx={x} cy={166} rx={8} ry={5} fill="var(--accent-green)" fillOpacity="0.22" />
            <ellipse cx={x - 5} cy={163} rx={5} ry={4} fill="var(--accent-green)" fillOpacity="0.18" />
            <ellipse cx={x + 5} cy={164} rx={5} ry={4} fill="var(--accent-green)" fillOpacity="0.18" />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}
