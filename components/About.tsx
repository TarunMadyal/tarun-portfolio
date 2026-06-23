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

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Scroll parallax for soft depth layers (kept away from section edges
  // so they never collide with the section dividers above/below).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  const yMid = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const yNear = useTransform(scrollYProgress, [0, 1], [20, -120]);

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Parallax depth backdrop — soft blurred glows at staggered scroll rates */}
      <motion.div aria-hidden className="absolute -left-24 top-16 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "var(--orb-green)", y: orbY }} />
      <motion.div aria-hidden className="absolute right-0 top-1/4 w-[360px] h-[360px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "var(--orb-blue)", y: yMid }} />
      <motion.div aria-hidden className="absolute left-1/3 top-1/2 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--orb-violet)", y: yNear }} />

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
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(82,183,136,0.12)" }}>
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
