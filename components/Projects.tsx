"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionLabel, RevealTitle } from "./Reveal";
import BrandLogo, { BrandLogoSpec } from "./BrandLogo";

interface Project {
  name: string;
  url: string;
  tagline: string;
  description: string;
  contribution: string;
  logo: BrandLogoSpec;
  accent: string;
  gradientFrom: string;
  gradientTo: string;
  tags: string[];
  badge?: string;
  creature?: "cow";
}

const projects: Project[] = [
  {
    name: "talentoza.com", url: "https://talentoza.com",
    tagline: "Talent Discovery Platform",
    description: "A talent sourcing and hiring platform connecting businesses with the right professionals, built for streamlined recruitment.",
    contribution: "Built and maintained the website — structure, UI, user-facing features, and performance.",
    logo: { src: "/talentoza.png", alt: "Talentoza logo", bg: "#ffffff", fit: "contain" },
    accent: "#2dd4bf", gradientFrom: "#0d9488", gradientTo: "#06b6d4",
    tags: ["Web Dev", "UI/UX", "Platform"],
  },
  {
    name: "pulsenine.in", url: "https://pulsenine.in",
    tagline: "Digital Business Hub",
    description: "A digital solutions company offering web development, branding, and growth services to startups and businesses.",
    contribution: "Designed and developed the full website — service pages, positioning, responsive experience.",
    logo: { letter: "P", letterColor: "#ec4899", bg: "rgba(236,72,153,0.12)" },
    accent: "#ec4899", gradientFrom: "#db2777", gradientTo: "#f472b6",
    tags: ["Business", "Branding", "Full Build"],
  },
  {
    name: "vsecure.ai", url: "https://vsecure.ai",
    tagline: "AI-Powered Security",
    description: "An intelligent security platform using AI to detect, analyze, and respond to threats in real time.",
    contribution: "Contributing to the core team — operations, website, and digital presence.",
    logo: { src: "/vsecure.png", alt: "vSecure.ai logo", bg: "#0e1b2e", fit: "cover" },
    accent: "#4ade80", gradientFrom: "#059669", gradientTo: "#0891b2",
    tags: ["AI", "Security", "SaaS"], badge: "Currently Working",
  },
  {
    name: "Milk App", url: "https://milk-e8i6xldut-tarun20.vercel.app/",
    tagline: "Dairy Inventory Management",
    description: "A custom app I built for a milk vendor next to my house. He used to spend 2–3 hours every day calculating everything by hand, and one missed entry would throw it all off.",
    contribution: "Built to his exact requirements — now every single unit is recorded with the total amount and a timestamp, nothing slips through, and his daily accounting just works. Made his life a whole lot easier.",
    logo: { letter: "M", letterColor: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
    accent: "#3b82f6", gradientFrom: "#2563eb", gradientTo: "#60a5fa",
    tags: ["Dairy", "Inventory", "Web App"], creature: "cow",
  },
];

/* Mock-browser preview that "boots up" on hover */
function Preview({ project, active }: { project: Project; active: boolean }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden mb-5"
      style={{ border: "1px solid var(--border-card)", background: "var(--bg-card-alt)", height: 132 }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-3 h-7" style={{ background: "var(--bg-glass)", borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        <div className="ml-2 px-2 py-0.5 rounded text-[9px] font-mono truncate" style={{ background: "var(--bg-card-alt)", color: "var(--text-dim)", maxWidth: 150 }}>
          {project.url.replace("https://", "")}
        </div>
      </div>
      {/* faux page content with parallax glow */}
      <div className="relative p-3 h-[104px] overflow-hidden">
        <motion.div
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl"
          style={{ background: `${project.accent}55` }}
          animate={active ? { scale: 1.3, opacity: 0.9 } : { scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="h-2.5 rounded-full mb-2"
          style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo})`, width: "55%" }}
          animate={active ? { width: "72%" } : { width: "55%" }} transition={{ duration: 0.5 }}
        />
        {[80, 64, 70].map((w, i) => (
          <motion.div key={i} className="h-1.5 rounded-full mb-1.5"
            style={{ background: "var(--border-card)", width: `${w}%` }}
            initial={{ opacity: 0.5 }} animate={active ? { opacity: 1, width: `${w + 8}%` } : { opacity: 0.5, width: `${w}%` }}
            transition={{ duration: 0.4, delay: i * 0.05 }} />
        ))}
        <div className="flex gap-1.5 mt-2.5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="h-5 rounded-md flex-1"
              style={{ background: i === 0 ? `${project.accent}33` : "var(--border-card)" }}
              animate={active ? { y: [-1, 0] } : {}} transition={{ duration: 0.3, delay: i * 0.06 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Growing vine SVG (corner decoration) */
function Vine({ accent, active, corner }: { accent: string; active: boolean; corner: "tl" | "br" }) {
  const pos = corner === "tl"
    ? { top: -2, left: -2, transform: "none" }
    : { bottom: -2, right: -2, transform: "rotate(180deg)" };
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="absolute pointer-events-none z-20" style={{ ...pos }} aria-hidden>
      <motion.path
        d="M2 2 C 20 8, 30 22, 34 40 C 37 54, 46 60, 60 64"
        fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"
        initial={{ pathLength: 0 }} animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 3px ${accent}88)` }}
      />
      {[{ cx: 30, cy: 24 }, { cx: 36, cy: 42 }, { cx: 50, cy: 60 }].map((p, i) => (
        <motion.path key={i}
          d={`M${p.cx} ${p.cy} c -5 -3 -8 -8 -5 -12 c 4 1 8 5 8 10 c 0 0.7 -1 1.5 -3 2Z`}
          fill={accent} fillOpacity="0.55"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.35, delay: active ? 0.3 + i * 0.12 : 0 }}
          style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
        />
      ))}
    </svg>
  );
}

/* Cute mascot cow that bobs, blinks and perks up on hover */
function Cow({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ top: 8, right: 10, width: 54, height: 54, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.18))" }}
      animate={{ y: active ? [0, -5, 0] : [0, -2.5, 0], rotate: active ? [-3, 3, -3] : [-1.5, 1.5, -1.5] }}
      transition={{ duration: active ? 1.1 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg width="54" height="54" viewBox="0 0 64 64">
        {/* horns */}
        <path d="M21 17 q-4 -7 -8 -5 q4 1 5 8Z" fill="#fde68a" stroke="#1f2937" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M43 17 q4 -7 8 -5 q-4 1 -5 8Z" fill="#fde68a" stroke="#1f2937" strokeWidth="1.1" strokeLinejoin="round" />
        {/* ears */}
        <ellipse cx="13" cy="31" rx="7" ry="4.6" fill="#ffffff" stroke="#1f2937" strokeWidth="1.4" />
        <ellipse cx="51" cy="31" rx="7" ry="4.6" fill="#ffffff" stroke="#1f2937" strokeWidth="1.4" />
        <ellipse cx="12" cy="31" rx="3" ry="2.2" fill="#fbcfe8" />
        <ellipse cx="52" cy="31" rx="3" ry="2.2" fill="#fbcfe8" />
        {/* head */}
        <path d="M15 31 q0 -17 17 -17 q17 0 17 17 q0 15 -17 15 q-17 0 -17 -15Z" fill="#ffffff" stroke="#1f2937" strokeWidth="1.5" />
        {/* spots */}
        <ellipse cx="23" cy="24" rx="4.2" ry="3.2" fill="#1f2937" opacity="0.9" />
        <ellipse cx="43" cy="22" rx="3.2" ry="2.4" fill="#1f2937" opacity="0.9" />
        {/* eyes (blink) */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.9, 0.94, 0.98, 1] }}
        >
          <circle cx="25" cy="31" r="2.4" fill="#1f2937" />
          <circle cx="39" cy="31" r="2.4" fill="#1f2937" />
          <circle cx="25.8" cy="30.2" r="0.8" fill="#ffffff" />
          <circle cx="39.8" cy="30.2" r="0.8" fill="#ffffff" />
        </motion.g>
        {/* snout */}
        <ellipse cx="32" cy="39" rx="10.5" ry="7.2" fill="#fbcfe8" stroke="#1f2937" strokeWidth="1.4" />
        <ellipse cx="28" cy="39" rx="1.5" ry="2" fill="#9d174d" />
        <ellipse cx="36" cy="39" rx="1.5" ry="2" fill="#9d174d" />
      </svg>
    </motion.div>
  );
}

function ProjectCard({ project, index, reduced }: { project: Project; index: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  // 3D tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 18 });
  // pointer glow position (%)
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const borderBg = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(180px circle at ${gx} ${gy}, ${project.accent}, transparent 60%)`);
  const sheenBg = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(260px circle at ${gx} ${gy}, ${project.accent}14, transparent 65%)`);

  function onMove(e: React.MouseEvent) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    setHovered(false);
    mx.set(0.5); my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        data-cursor="hover"
        className="relative rounded-2xl p-5 flex flex-col h-full"
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
          background: "var(--bg-card)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid var(--border-card)",
          boxShadow: hovered ? `0 28px 70px ${project.accent}26` : "0 6px 24px rgba(0,0,0,0.10)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {/* Glowing animated border on hover */}
        <motion.div
          aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: 1,
            background: borderBg,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* Pointer-follow inner sheen */}
        <motion.div
          aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: sheenBg,
            opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
          }}
        />

        <Vine accent={project.accent} active={hovered} corner="tl" />
        <Vine accent={project.accent} active={hovered} corner="br" />

        {project.creature === "cow" && <Cow active={hovered} />}

        <div className="relative z-10 flex flex-col h-full">
          <Preview project={project} active={hovered} />

          <div className="flex items-start justify-between mb-3">
            <BrandLogo size={44} {...project.logo} />
            {project.badge && (
              <span className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: `${project.accent}1a`, color: project.accent, border: `1px solid ${project.accent}33` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent, animation: "pulse 2s ease-in-out infinite" }} />
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>{project.name}</h3>
          <p className="text-xs font-medium mb-3" style={{ color: project.accent }}>{project.tagline}</p>
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>{project.description}</p>

          <AnimatePresence initial={false}>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="rounded-xl p-3 mb-4" style={{ background: "var(--bg-card-alt)", border: "1px solid var(--border-subtle)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-dim)" }}>My Contribution</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.contribution}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-20 flex items-center justify-between mt-auto pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md"
                  style={{ background: "var(--bg-card-alt)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              data-cursor="hover"
              className="relative z-20 flex items-center gap-1.5 text-xs font-semibold ml-3 group/link cursor-pointer"
              style={{ color: project.accent, pointerEvents: "auto" }}>
              Visit
              <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  return (
    <section id="projects" className="py-20 md:py-28 relative" ref={ref}>
      <div className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--orb-violet)" }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel>Featured Projects</SectionLabel>
        <RevealTitle lead="Things I've" accent="built & shipped." className="text-4xl md:text-5xl font-bold mb-16" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
