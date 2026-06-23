"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cloud, Lock, Server, Database, BookOpen, CheckCircle2, Circle, Clock } from "lucide-react";

const milestones = [
  {
    period: "2025 · Q1",
    name: "AWS Identity & Access Management",
    description: "Users, roles, policies, permission boundaries, and least-privilege access design.",
    icon: Lock,
    status: "completed" as const,
    accent: "#52B788",
  },
  {
    period: "2025 · Q2",
    name: "Cloud Computing Fundamentals",
    description: "Core compute, storage, networking concepts; regions, availability zones, and service models.",
    icon: Cloud,
    status: "completed" as const,
    accent: "#60a5fa",
  },
  {
    period: "2025 · Q3",
    name: "AWS EC2 & S3",
    description: "Virtual machines, elastic compute instances, object storage, and lifecycle policies.",
    icon: Server,
    status: "in-progress" as const,
    accent: "#D4AC52",
  },
  {
    period: "2025 · Q4",
    name: "Cloud Security Basics",
    description: "Security groups, VPC architecture, encryption at rest and in transit, IAM policies.",
    icon: Database,
    status: "upcoming" as const,
    accent: "#38bdf8",
  },
];

const STATUS_CONFIG = {
  completed:   { label: "Completed",   color: "#52B788", bg: "rgba(82,183,136,0.10)",  border: "rgba(82,183,136,0.22)",  Icon: CheckCircle2 },
  "in-progress": { label: "In Progress", color: "#D4AC52", bg: "rgba(212,172,82,0.10)",  border: "rgba(212,172,82,0.25)",  Icon: Clock        },
  upcoming:    { label: "Upcoming",    color: "var(--text-muted)", bg: "var(--bg-card-alt)", border: "var(--border-subtle)", Icon: Circle     },
};

const upcomingGoals = [
  "AWS Solutions Architect – Associate",
  "Serverless Architecture (Lambda, API Gateway)",
  "DevOps fundamentals (CI/CD, Docker basics)",
];

export default function Learning() {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="learning" className="py-20 md:py-24 relative" ref={ref}>
      {/* Ambient orb */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/3 w-[500px] h-[300px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "var(--orb-green)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-violet)" }}>
            Learning Journey
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--section-line)" }} />
        </motion.div>

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-5"
            style={{ border: "1px solid rgba(251,146,60,0.2)" }}
          >
            <BookOpen size={12} style={{ color: "#fb923c" }} />
            <span className="text-xs font-semibold" style={{ color: "#fb923c" }}>
              Currently Learning
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Growing into the{" "}
            <span className="gradient-text">cloud.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="max-w-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A structured journey into AWS and cloud infrastructure — building from
            access management to architecture and security.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px" aria-hidden="true">
            <motion.div
              className="w-full h-full rounded-full"
              style={{ background: "linear-gradient(180deg, var(--accent-green) 0%, var(--border-card) 100%)" }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          <div className="space-y-6 pl-10">
            {milestones.map((m, i) => {
              const Icon         = m.icon;
              const s            = STATUS_CONFIG[m.status];
              const StatusIcon   = s.Icon;
              const isCompleted  = m.status === "completed";
              const isInProgress = m.status === "in-progress";

              return (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[2.85rem] top-5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background:  m.status === "upcoming" ? "var(--bg-card)" : m.accent,
                      border:      `2px solid ${m.accent}`,
                      boxShadow:   isCompleted || isInProgress ? `0 0 12px ${m.accent}55` : "none",
                    }}
                    aria-hidden="true"
                  >
                    {isCompleted && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {isInProgress && (
                      <div className="w-2 h-2 rounded-full" style={{ background: "white" }} />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl p-5 glass-card group"
                    style={{
                      border: `1px solid ${isInProgress ? m.accent + "44" : "var(--border-card)"}`,
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = m.accent + "55";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${m.accent}18`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = isInProgress ? m.accent + "44" : "var(--border-card)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        {/* Icon */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: m.accent + "15", border: `1px solid ${m.accent}25` }}
                        >
                          <Icon size={17} style={{ color: m.accent }} strokeWidth={1.6} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-dim)" }}>
                            {m.period}
                          </p>
                          <h4 className="text-sm font-bold mb-2 leading-snug" style={{ color: "var(--text-primary)" }}>
                            {m.name}
                          </h4>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {m.description}
                          </p>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                      >
                        <StatusIcon size={11} />
                        {s.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Upcoming goals */}
        <motion.div
          className="mt-10 p-6 rounded-2xl glass-card"
          style={{ border: "1px solid var(--border-accent)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.0 }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: "var(--accent-violet)" }}
          >
            Next milestones
          </p>
          <ul className="space-y-2.5">
            {upcomingGoals.map((goal) => (
              <li key={goal} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent-blue)" }}
                />
                {goal}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
