"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { SectionLabel, RevealTitle, Reveal } from "./Reveal";

const stats = [
  { value: "3+", label: "Live Projects" },
  { value: "1+", label: "Company" },
  { value: "2026", label: "Graduating" },
  { value: "Now", label: "Available" },
];

const tags = [
  { icon: MapPin, text: "Bangalore, India" },
  { icon: Briefcase, text: "vSecure.ai" },
  { icon: GraduationCap, text: "MCA @ RVCE" },
  { icon: Sparkles, text: "Open to Opportunities" },
];

/* Layered tree silhouette — gives the section parallax depth */
function TreeLayer({ fill, opacity }: { fill: string; opacity: number }) {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full" style={{ opacity }} aria-hidden>
      <path fill={fill} d="M0 200 L0 120 L40 120 L60 70 L80 120 L120 120 L150 50 L180 120 L230 120 L260 90 L290 120 L340 120 L370 40 L400 120 L450 120 L480 80 L510 120 L560 120 L600 55 L640 120 L690 120 L720 85 L750 120 L800 120 L840 45 L880 120 L930 120 L960 80 L990 120 L1040 120 L1070 60 L1100 120 L1150 120 L1180 95 L1200 120 L1200 200 Z" />
    </svg>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Scroll parallax for depth layers
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yFar = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [30, -90]);
  const yNear = useTransform(scrollYProgress, [0, 1], [10, -130]);
  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Parallax depth backdrop */}
      <motion.div aria-hidden className="absolute -left-20 top-10 w-[420px] h-[420px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "var(--orb-violet)", y: orbY }} />
      <motion.div aria-hidden className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ y: yFar }}>
        <TreeLayer fill="var(--text-faint)" opacity={0.5} />
      </motion.div>
      <motion.div aria-hidden className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ y: yMid }}>
        <TreeLayer fill="var(--text-dim)" opacity={0.4} />
      </motion.div>
      <motion.div aria-hidden className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ y: yNear }}>
        <TreeLayer fill="var(--text-muted)" opacity={0.25} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionLabel>About Me</SectionLabel>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left */}
          <div>
            <RevealTitle lead="I build things that" accent="actually matter." className="text-4xl md:text-5xl font-bold mb-8 leading-tight" />

            <Reveal delay={0.15} className="space-y-5 leading-relaxed" >
              <div style={{ color: "var(--text-secondary)" }} className="space-y-5">
                <p>
                  I&apos;m Tarun — a developer and digital builder pursuing my MCA at{" "}
                  <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>RV College of Engineering, Bangalore</span>.
                  I don&apos;t just write code — I build real products that solve real problems.
                </p>
                <p>
                  Currently contributing at{" "}
                  <span style={{ color: "var(--accent-violet)", fontWeight: 500 }}>vSecure.ai</span>, where I&apos;m learning
                  what it means to ship software in a professional environment. From user-facing websites to business decks
                  — I operate at the intersection of{" "}
                  <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>technology and business</span>.
                </p>
                <p>
                  Right now, I&apos;m on a focused journey into{" "}
                  <span style={{ color: "var(--accent-blue)", fontWeight: 500 }}>AWS and Cloud Computing</span> — because the
                  future is cloud-native, and I plan to be ready for it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.28} className="flex flex-wrap gap-2 mt-8">
              {tags.map(({ icon: Icon, text }) => (
                <span key={text} data-cursor="hover"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs cursor-default"
                  style={{ color: "var(--text-secondary)" }}>
                  <Icon size={11} style={{ color: "var(--accent-violet)" }} />
                  {text}
                </span>
              ))}
            </Reveal>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }} data-cursor="hover"
                  className="glass-card rounded-2xl p-6 text-center cursor-default">
                  <div className="text-3xl font-black mb-1 gradient-text">{stat.value}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="glass-card rounded-2xl p-6" style={{ border: "1px solid var(--border-accent)" }}>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Currently</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(155,142,196,0.12)" }}>
                    <Briefcase size={13} style={{ color: "var(--accent-violet)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Working at vSecure.ai</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>Building and contributing to the platform</p>
                  </div>
                </div>
                <div className="h-px" style={{ background: "var(--border-subtle)" }} />
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(74,158,204,0.12)" }}>
                    <GraduationCap size={13} style={{ color: "var(--accent-blue)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Studying AWS &amp; Cloud Computing</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>IAM, EC2, S3 and cloud fundamentals</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
