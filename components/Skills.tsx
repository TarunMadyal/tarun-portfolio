"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2, PenTool, Palette, Presentation, KeyRound, Cloud, Boxes, LucideIcon,
} from "lucide-react";
import { SectionLabel, RevealTitle } from "./Reveal";

interface Skill {
  title: string;
  level: number;        // proficiency 0–100
  levelLabel: string;
  blurb: string;        // always-visible subtitle
  expertise: string;    // revealed in hover tooltip
  icon: LucideIcon;
  accent: string;
  badge?: string;
}

const skills: Skill[] = [
  {
    title: "Web Development",
    level: 90, levelLabel: "Advanced",
    blurb: "HTML · CSS · JavaScript",
    expertise: "Responsive, performant interfaces built with modern web standards — from structure to deployment.",
    icon: Code2, accent: "#34d399",
  },
  {
    title: "UI / UX Design",
    level: 80, levelLabel: "Proficient",
    blurb: "Interfaces & interaction",
    expertise: "Clean, intentional layouts with purposeful motion — design that feels effortless to use.",
    icon: Palette, accent: "#f472b6",
  },
  {
    title: "Figma",
    level: 84, levelLabel: "Proficient",
    blurb: "Design & prototyping",
    expertise: "Designing and prototyping interfaces in Figma — components, auto-layout and clean dev handoff.",
    icon: PenTool, accent: "#fb7185",
  },
  {
    title: "Business Decks",
    level: 85, levelLabel: "Proficient",
    blurb: "Pitch & product decks",
    expertise: "Turning complex ideas into clear, persuasive narratives for investors and stakeholders.",
    icon: Presentation, accent: "#2dd4bf",
  },
  {
    title: "AWS IAM",
    level: 70, levelLabel: "Working",
    blurb: "Identity & access",
    expertise: "Roles, policies and least-privilege access design — the security backbone of the cloud.",
    icon: KeyRound, accent: "#fbbf24",
  },
  {
    title: "Cloud Learning",
    level: 62, levelLabel: "Growing",
    blurb: "EC2 · S3 · fundamentals",
    expertise: "Actively mastering cloud-native architecture and core AWS services. Future-focused.",
    icon: Cloud, accent: "#fb923c", badge: "Learning",
  },
  {
    title: "Software Solutions",
    level: 78, levelLabel: "Proficient",
    blurb: "Delivery & problem-solving",
    expertise: "Reliable processes, thorough documentation and pragmatic problem-solving end to end.",
    icon: Boxes, accent: "#22d3ee",
  },
];

/* Animated proficiency ring around the node icon */
function ProgressRing({ level, accent, active }: { level: number; accent: string; active: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const R = 30;
  const C = 2 * Math.PI * R;
  return (
    <svg ref={ref} width="72" height="72" viewBox="0 0 72 72" className="absolute inset-0 -rotate-90">
      <circle cx="36" cy="36" r={R} fill="none" stroke="var(--border-card)" strokeWidth="2.5" />
      <motion.circle
        cx="36" cy="36" r={R} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={inView ? { strokeDashoffset: C - (C * level) / 100 } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ filter: active ? `drop-shadow(0 0 5px ${accent})` : "none" }}
      />
    </svg>
  );
}

/* Small swaying leaf cluster on each branch */
function LeafCluster({ accent, active, side }: { accent: string; active: boolean; side: "l" | "r" }) {
  const flip = side === "l" ? -1 : 1;
  return (
    <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ [side === "l" ? "right" : "left"]: -6 }}>
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i} width="13" height="16" viewBox="0 0 11 14"
          className="absolute"
          style={{ left: i * 7 * flip, top: (i - 1) * 9, transformOrigin: "bottom center" }}
          animate={active
            ? { rotate: [(-8 + i * 4) * flip, (6 + i * 4) * flip, (-8 + i * 4) * flip], scale: 1.15 }
            : { rotate: (-4 + i * 3) * flip, scale: 1 }}
          transition={active
            ? { rotate: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.3 } }
            : { duration: 0.3 }}
        >
          <path
            d="M5.5 13 C5.5 13 1 9 1 5 C1 2.2 2.9 0.5 5.5 0.5 C8.1 0.5 10 2.2 10 5 C10 9 5.5 13 5.5 13Z"
            fill={accent} fillOpacity={active ? 0.8 : 0.45}
            style={{ filter: active ? `drop-shadow(0 0 3px ${accent})` : "none", transition: "fill-opacity 0.3s" }}
          />
          <line x1="5.5" y1="0.5" x2="5.5" y2="13" stroke={accent} strokeWidth="0.6" strokeOpacity="0.4" />
        </motion.svg>
      ))}
    </div>
  );
}

function SkillNode({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  const side: "l" | "r" = index % 2 === 0 ? "l" : "r"; // desktop side

  const card = (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setHovered((h) => !h)}
      data-cursor="hover"
      className="relative w-full md:w-[340px] rounded-2xl p-5 cursor-default"
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${hovered ? skill.accent + "66" : "var(--border-card)"}`,
        boxShadow: hovered ? `0 18px 50px ${skill.accent}22, 0 0 0 1px ${skill.accent}33` : "0 4px 20px rgba(0,0,0,0.10)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Expertise tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 right-4 bottom-full mb-3 rounded-xl p-3.5 z-30"
            style={{
              background: "var(--bg-glass)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${skill.accent}40`,
              boxShadow: `0 12px 36px ${skill.accent}22`,
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {skill.expertise}
            </p>
            <div className="mt-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: skill.accent }}>
                {skill.levelLabel}
              </span>
            </div>
            {/* pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45"
              style={{ background: "var(--bg-glass)", borderRight: `1px solid ${skill.accent}40`, borderBottom: `1px solid ${skill.accent}40` }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {/* Icon + progress ring */}
        <div className="relative w-[72px] h-[72px] flex-shrink-0 flex items-center justify-center">
          <ProgressRing level={skill.level} accent={skill.accent} active={hovered} />
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${skill.accent}1a`, border: `1px solid ${skill.accent}33` }}
          >
            <Icon size={22} style={{ color: skill.accent, filter: hovered ? `drop-shadow(0 0 6px ${skill.accent})` : "none", transition: "filter 0.3s" }} strokeWidth={1.7} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{skill.title}</h3>
            {skill.badge && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${skill.accent}1a`, color: skill.accent, border: `1px solid ${skill.accent}40` }}>
                {skill.badge}
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{skill.blurb}</p>
          {/* Proficiency bar */}
          <div className="mt-2.5 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-card)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.accent}, ${skill.accent}88)` }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Branch connector with leaves (desktop only)
  const branch = (
    <div className="relative hidden md:block" style={{ width: 56, height: 2 }}>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-px"
        style={{
          left: 0, right: 0,
          background: `linear-gradient(${side === "l" ? "90deg" : "270deg"}, ${skill.accent}00, ${skill.accent}aa)`,
          boxShadow: hovered ? `0 0 8px ${skill.accent}` : "none",
          transition: "box-shadow 0.3s",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <LeafCluster accent={skill.accent} active={hovered} side={side} />
    </div>
  );

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-2 md:items-center mb-7 md:mb-3">
      {/* center node on the trunk */}
      <motion.div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full z-10"
        style={{ width: 14, height: 14, background: skill.accent, boxShadow: `0 0 0 4px var(--bg-page), 0 0 ${hovered ? 16 : 8}px ${skill.accent}`, transition: "box-shadow 0.3s" }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
      />

      {side === "l" ? (
        <>
          <motion.div
            className="flex items-center justify-end gap-0 md:col-start-1"
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {card}{branch}
          </motion.div>
          <div className="hidden md:block md:col-start-2" />
        </>
      ) : (
        <>
          <div className="hidden md:block md:col-start-1" />
          <motion.div
            className="flex items-center justify-start gap-0 md:col-start-2"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {branch}{card}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const trunkRef = useRef<HTMLDivElement>(null);
  const trunkInView = useInView(trunkRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 md:py-28 relative" ref={ref}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--orb-violet)" }} aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel>Skills &amp; Expertise</SectionLabel>
        <RevealTitle lead="A growing tree of" accent="capabilities." className="text-4xl md:text-5xl font-bold mb-4" />
        <p className="text-sm md:text-base max-w-md mb-16" style={{ color: "var(--text-muted)" }}>
          Each branch is a craft I&apos;ve grown — hover any node to see where it stands.
        </p>

        {/* The tree */}
        <div ref={trunkRef} className="relative">
          {/* Central trunk (desktop) / left stem (mobile) */}
          <motion.div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] origin-top hidden md:block"
            style={{ background: "linear-gradient(180deg, transparent, var(--accent-green), var(--accent-violet), transparent)" }}
            initial={{ scaleY: 0 }}
            animate={trunkInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {skills.map((skill, i) => (
            <SkillNode key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
