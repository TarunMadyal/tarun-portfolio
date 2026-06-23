"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Variant = "grass" | "treeline" | "forest" | "deep";

interface Props {
  variant?: Variant;
  className?: string;
}

/* ── Grass silhouette ────────────────────────────────────── */
function GrassDivider() {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: 48, display: "block" }}
      aria-hidden="true"
    >
      <path
        d="M0 48 L0 38 Q18 22 36 36 Q54 46 72 30 Q90 14 108 32 Q126 46 144 28 Q162 12 180 30 Q198 46 216 28 Q234 12 252 32 Q270 46 288 26 Q306 10 324 30 Q342 46 360 26 Q378 10 396 32 Q414 46 432 28 Q450 12 468 30 Q486 46 504 28 Q522 12 540 32 Q558 46 576 28 Q594 10 612 30 Q630 46 648 28 Q666 12 684 32 Q702 46 720 26 Q738 8 756 30 Q774 46 792 28 Q810 12 828 32 Q846 46 864 26 Q882 8 900 30 Q918 46 936 28 Q954 12 972 32 Q990 46 1008 28 Q1026 12 1044 32 Q1062 46 1080 26 Q1098 8 1116 30 Q1134 46 1152 28 Q1170 12 1188 32 Q1206 46 1224 28 Q1242 12 1260 32 Q1278 46 1296 28 Q1314 12 1332 30 Q1350 46 1368 28 Q1386 12 1404 32 Q1422 46 1440 30 L1440 48 Z"
        fill="var(--accent-green)"
        fillOpacity="0.13"
      />
      {/* second, slightly different layer for depth */}
      <path
        d="M0 48 L0 42 Q24 34 48 40 Q72 46 96 36 Q120 26 144 38 Q168 46 192 34 Q216 22 240 38 Q264 46 288 34 Q312 22 336 38 Q360 46 384 34 Q408 24 432 40 Q456 46 480 36 Q504 26 528 40 Q552 46 576 36 Q600 26 624 40 Q648 46 672 34 Q696 22 720 38 Q744 46 768 34 Q792 22 816 40 Q840 46 864 34 Q888 24 912 40 Q936 46 960 36 Q984 26 1008 40 Q1032 46 1056 34 Q1080 22 1104 38 Q1128 46 1152 36 Q1176 26 1200 40 Q1224 46 1248 34 Q1272 24 1296 40 Q1320 46 1344 34 Q1368 24 1392 40 Q1416 46 1440 34 L1440 48 Z"
        fill="var(--accent-green)"
        fillOpacity="0.08"
      />
    </svg>
  );
}

/* ── Treeline scene ──────────────────────────────────────── */
function TreelineDivider() {
  const trees = [
    { x: 60,   h: 52, w: 30, trunk: 4 },
    { x: 140,  h: 68, w: 36, trunk: 5 },
    { x: 230,  h: 44, w: 26, trunk: 3 },
    { x: 330,  h: 72, w: 38, trunk: 5 },
    { x: 430,  h: 56, w: 32, trunk: 4 },
    { x: 540,  h: 80, w: 40, trunk: 5 },
    { x: 650,  h: 50, w: 28, trunk: 4 },
    { x: 750,  h: 65, w: 36, trunk: 5 },
    { x: 860,  h: 45, w: 26, trunk: 3 },
    { x: 960,  h: 74, w: 38, trunk: 5 },
    { x: 1060, h: 55, w: 30, trunk: 4 },
    { x: 1170, h: 70, w: 36, trunk: 5 },
    { x: 1270, h: 48, w: 28, trunk: 4 },
    { x: 1370, h: 62, w: 34, trunk: 5 },
  ];

  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: 90, display: "block" }}
      aria-hidden="true"
    >
      {/* Grass base */}
      <path
        d="M0 90 L0 78 Q36 62 72 76 Q108 88 144 72 Q180 58 216 74 Q252 88 288 72 Q324 58 360 74 Q396 88 432 72 Q468 58 504 74 Q540 88 576 72 Q612 58 648 74 Q684 88 720 70 Q756 54 792 72 Q828 88 864 72 Q900 56 936 74 Q972 88 1008 72 Q1044 56 1080 74 Q1116 88 1152 72 Q1188 56 1224 74 Q1260 88 1296 72 Q1332 56 1368 74 Q1404 88 1440 72 L1440 90 Z"
        fill="var(--accent-green)"
        fillOpacity="0.12"
      />
      {/* Trees — far layer (muted) */}
      {trees.map((t, i) => (
        <g key={i}>
          {/* trunk */}
          <rect
            x={t.x - t.trunk / 2}
            y={90 - 20}
            width={t.trunk}
            height={20}
            fill="var(--text-dim)"
            fillOpacity="0.18"
          />
          {/* canopy */}
          <ellipse
            cx={t.x}
            cy={90 - 20 - t.h * 0.55}
            rx={t.w / 2}
            ry={t.h * 0.55}
            fill="var(--accent-green)"
            fillOpacity={i % 3 === 0 ? 0.16 : 0.11}
          />
          {/* highlight layer */}
          <ellipse
            cx={t.x - 4}
            cy={90 - 20 - t.h * 0.65}
            rx={t.w / 3}
            ry={t.h * 0.35}
            fill="var(--accent-green)"
            fillOpacity="0.05"
          />
        </g>
      ))}
    </svg>
  );
}

/* ── Forest scene ────────────────────────────────────────── */
function ForestDivider() {
  const farTrees = [
    { x: 50,   h: 60, w: 28 },
    { x: 150,  h: 80, w: 36 },
    { x: 260,  h: 70, w: 32 },
    { x: 370,  h: 90, w: 40 },
    { x: 480,  h: 64, w: 30 },
    { x: 590,  h: 95, w: 42 },
    { x: 700,  h: 72, w: 34 },
    { x: 810,  h: 88, w: 40 },
    { x: 920,  h: 60, w: 28 },
    { x: 1030, h: 82, w: 38 },
    { x: 1140, h: 70, w: 34 },
    { x: 1250, h: 92, w: 42 },
    { x: 1360, h: 66, w: 30 },
  ];
  const nearTrees = [
    { x: 100,  h: 48, w: 24 },
    { x: 210,  h: 58, w: 28 },
    { x: 320,  h: 44, w: 22 },
    { x: 440,  h: 54, w: 26 },
    { x: 555,  h: 62, w: 30 },
    { x: 660,  h: 46, w: 22 },
    { x: 770,  h: 58, w: 28 },
    { x: 880,  h: 50, w: 24 },
    { x: 990,  h: 60, w: 28 },
    { x: 1100, h: 48, w: 22 },
    { x: 1210, h: 56, w: 26 },
    { x: 1320, h: 44, w: 22 },
    { x: 1410, h: 52, w: 26 },
  ];

  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: 120, display: "block" }}
      aria-hidden="true"
    >
      {/* Far trees */}
      {farTrees.map((t, i) => (
        <g key={`far-${i}`}>
          <rect x={t.x - 2} y={120 - 24} width={4} height={24} fill="var(--text-dim)" fillOpacity="0.14" />
          <ellipse cx={t.x} cy={120 - 24 - t.h * 0.5} rx={t.w / 2} ry={t.h * 0.52}
            fill="var(--accent-green)" fillOpacity="0.10" />
        </g>
      ))}
      {/* Near trees — slightly more visible */}
      {nearTrees.map((t, i) => (
        <g key={`near-${i}`}>
          <rect x={t.x - 3} y={120 - 18} width={5} height={18} fill="var(--text-dim)" fillOpacity="0.20" />
          <ellipse cx={t.x} cy={120 - 18 - t.h * 0.52} rx={t.w / 2} ry={t.h * 0.54}
            fill="var(--accent-green)" fillOpacity="0.16" />
        </g>
      ))}
      {/* Dense grass base */}
      <path
        d="M0 120 L0 104 Q30 90 60 104 Q90 116 120 100 Q150 86 180 102 Q210 116 240 100 Q270 86 300 104 Q330 116 360 98 Q390 82 420 100 Q450 116 480 98 Q510 82 540 100 Q570 116 600 98 Q630 82 660 102 Q690 116 720 98 Q750 82 780 100 Q810 116 840 100 Q870 84 900 100 Q930 116 960 100 Q990 84 1020 100 Q1050 116 1080 100 Q1110 84 1140 102 Q1170 116 1200 100 Q1230 84 1260 100 Q1290 116 1320 100 Q1350 84 1380 100 Q1410 116 1440 100 L1440 120 Z"
        fill="var(--accent-green)"
        fillOpacity="0.15"
      />
    </svg>
  );
}

/* ── Deep forest floor ───────────────────────────────────── */
function DeepForestDivider() {
  return (
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: 70, display: "block" }}
      aria-hidden="true"
    >
      {/* Low undergrowth bumps */}
      <path
        d="M0 70 L0 54 Q20 38 40 50 Q60 62 80 42 Q100 24 120 44 Q140 62 160 44 Q180 28 200 46 Q220 62 240 44 Q260 28 280 46 Q300 62 320 42 Q340 24 360 44 Q380 62 400 42 Q420 24 440 46 Q460 64 480 44 Q500 26 520 44 Q540 62 560 42 Q580 24 600 44 Q620 62 640 44 Q660 26 680 44 Q700 62 720 40 Q740 20 760 42 Q780 62 800 42 Q820 24 840 44 Q860 62 880 42 Q900 24 920 44 Q940 62 960 42 Q980 24 1000 44 Q1020 62 1040 42 Q1060 24 1080 44 Q1100 62 1120 44 Q1140 26 1160 44 Q1180 62 1200 42 Q1220 24 1240 44 Q1260 62 1280 42 Q1300 24 1320 44 Q1340 62 1360 44 Q1380 26 1400 44 Q1420 62 1440 44 L1440 70 Z"
        fill="var(--accent-green)"
        fillOpacity="0.16"
      />
      {/* Small mushroom-like bumps */}
      {[80, 200, 350, 500, 660, 800, 950, 1100, 1250, 1390].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={58} rx={6} ry={4} fill="var(--accent-green)" fillOpacity="0.20" />
          <rect x={x - 1.5} y={58} width={3} height={8} fill="var(--text-dim)" fillOpacity="0.16" />
        </g>
      ))}
      {/* Rock silhouettes */}
      {[160, 420, 720, 1020, 1300].map((x, i) => (
        <ellipse key={i} cx={x} cy={62} rx={10} ry={6} fill="var(--text-dim)" fillOpacity="0.10" />
      ))}
    </svg>
  );
}

export default function SectionDivider({ variant = "grass", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      className={`w-full pointer-events-none select-none ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      {variant === "grass"     && <GrassDivider />}
      {variant === "treeline"  && <TreelineDivider />}
      {variant === "forest"    && <ForestDivider />}
      {variant === "deep"      && <DeepForestDivider />}
    </motion.div>
  );
}
