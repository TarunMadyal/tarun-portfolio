"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Shield, Calendar, ArrowUpRight, Briefcase, Code2, Megaphone, LucideIcon } from "lucide-react";
import { SectionLabel, RevealTitle } from "./Reveal";
import BrandLogo, { BrandLogoSpec } from "./BrandLogo";

interface Phase {
  icon: LucideIcon; title: string; period: string; color: string; bg: string; border: string; detail: string;
}
interface Exp {
  company: string; url: string; role: string; period: string; isCurrent: boolean;
  icon: LucideIcon; accentColor: string; accentBg: string; accentBorder: string;
  logo: BrandLogoSpec;
  description: string; responsibilities: string[]; phases: Phase[] | null;
}

const experiences: Exp[] = [
  {
    company: "vSecure.ai", url: "https://vsecure.ai", role: "Team Member",
    period: "Jan 2026 — Present", isCurrent: true, icon: Shield,
    accentColor: "#4ade80", accentBg: "rgba(74,222,128,0.08)", accentBorder: "rgba(74,222,128,0.18)",
    logo: { src: "/vsecure.png", alt: "vSecure.ai logo", bg: "#0e1b2e", fit: "cover" },
    description: "Contributing to the core team at vSecure.ai — an AI-powered security platform. Involved in website development, digital operations, and supporting the product's online presence. Gaining hands-on experience in how real software companies ship and grow.",
    responsibilities: [
      "Website development and maintenance",
      "Digital operations and content management",
      "Supporting business and technical workflows",
      "Collaborating with the team on product initiatives",
    ],
    phases: null,
  },
  {
    company: "Talentoza", url: "https://talentoza.com", role: "Multi-Role Contributor",
    period: "Dec 2024 — Jan 2026", isCurrent: false, icon: Briefcase,
    accentColor: "#38bdf8", accentBg: "rgba(56,189,248,0.08)", accentBorder: "rgba(56,189,248,0.18)",
    logo: { src: "/talentoza.png", alt: "Talentoza logo", bg: "#ffffff", fit: "contain" },
    description: "Worked across two departments at Talentoza — a talent discovery platform. Started in Marketing before transitioning into Software Development, gaining a rare blend of business strategy and technical execution.",
    responsibilities: [
      "Built and maintained landing pages and marketing assets",
      "Contributed to web development, UI improvements, and feature rollouts",
      "Supported product positioning and digital growth initiatives",
      "Bridged business strategy with technical execution",
    ],
    phases: [
      { icon: Megaphone, title: "Marketing", period: "Dec 2024 — Jun 2025", color: "#fb923c", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.25)", detail: "Digital marketing, campaigns, content & growth strategy." },
      { icon: Code2, title: "Software Development", period: "Jun 2025 — Jan 2026", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.25)", detail: "Front-end development, maintenance, UI/UX improvements." },
    ],
  },
];

function ExpCard({ exp, index }: { exp: Exp; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const Icon = exp.icon;

  return (
    <div ref={ref} className="relative pl-16 sm:pl-20 pb-12 last:pb-0">
      {/* Milestone node on the trail */}
      <motion.div
        className="absolute left-5 sm:left-7 top-7 z-10 -translate-x-1/2 rounded-full flex items-center justify-center"
        style={{
          width: 34, height: 34,
          background: "var(--bg-page)",
          border: `2px solid ${exp.accentColor}`,
          boxShadow: inView ? `0 0 18px ${exp.accentColor}88` : "none",
          transition: "box-shadow 0.6s ease",
        }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <Icon size={15} style={{ color: exp.accentColor }} />
        {exp.isCurrent && (
          <span className="absolute inset-0 rounded-full" style={{ border: `2px solid ${exp.accentColor}`, animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
        )}
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        data-cursor="hover"
        className="rounded-2xl p-7 sm:p-8"
        style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${exp.accentBorder}`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <BrandLogo size={48} {...exp.logo} />
            <div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{exp.company}</h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: exp.accentColor }}>{exp.role}</p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            {exp.isCurrent && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", animation: "pulse 2s ease-in-out infinite" }} />
                <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>Current</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-dim)" }}>
              <Calendar size={12} />{exp.period}
            </div>
          </div>
        </div>

        <p className="leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{exp.description}</p>

        {exp.phases && (
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {exp.phases.map((phase, pi) => {
              const PhaseIcon = phase.icon;
              return (
                <motion.div key={phase.title}
                  initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + pi * 0.12 }}
                  className="rounded-xl p-4" style={{ background: phase.bg, border: `1px solid ${phase.border}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <PhaseIcon size={14} style={{ color: phase.color }} />
                    <span className="text-xs font-bold" style={{ color: phase.color }}>{phase.title}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{phase.period}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{phase.detail}</p>
                </motion.div>
              );
            })}
          </div>
        )}

        <ul className="space-y-2.5 mb-7">
          {exp.responsibilities.map((item, ri) => (
            <motion.li key={item} className="flex items-start gap-3"
              initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 + ri * 0.08 }}>
              <div className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{ background: exp.accentColor }} />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</p>
            </motion.li>
          ))}
        </ul>

        <a href={exp.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold group" style={{ color: exp.accentColor }}>
          Visit {exp.company}
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  // Trail draws as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ["start 85%", "end 65%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });

  return (
    <section id="experience" className="py-20 md:py-28 relative" ref={ref}>
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--orb-blue)" }} aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-6">
        <SectionLabel>Experience</SectionLabel>
        <RevealTitle lead="The trail I've" accent="walked." className="text-4xl md:text-5xl font-bold mb-16" />

        <div ref={trailRef} className="relative">
          {/* Winding forest trail (draws on scroll) */}
          <svg
            className="absolute top-0 h-full pointer-events-none"
            style={{ left: "0.55rem" }}
            width="40" viewBox="0 0 40 1000" preserveAspectRatio="none" fill="none" aria-hidden
          >
            {/* faint full path */}
            <path d="M20 0 C 6 120, 34 240, 20 360 C 6 480, 34 600, 20 720 C 8 840, 28 940, 20 1000"
              stroke="var(--border-card)" strokeWidth="2.5" strokeLinecap="round" />
            {/* glowing drawn path */}
            <motion.path
              d="M20 0 C 6 120, 34 240, 20 360 C 6 480, 34 600, 20 720 C 8 840, 28 940, 20 1000"
              stroke="url(#trailGrad)" strokeWidth="2.5" strokeLinecap="round"
              style={{ pathLength, filter: "drop-shadow(0 0 4px var(--glow-violet))" }}
            />
            <defs>
              <linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="55%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#4A9ECC" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative sm:ml-2">
            {experiences.map((exp, i) => (
              <ExpCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
