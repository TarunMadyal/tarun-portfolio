"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ----------------------------------------------------------------
   Reveal — fades + slides content in once it scrolls into view.
   Optional `delay` and direction.
---------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   Stagger — reveals direct children in sequence.
   Wrap items in <StaggerItem>.
---------------------------------------------------------------- */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px", amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   SectionLabel — the small uppercase kicker + animated line.
---------------------------------------------------------------- */
export function SectionLabel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="flex items-center gap-3 mb-12">
      <motion.span
        className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
        style={{ color: "var(--accent-violet)" }}
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
      <motion.div
        className="flex-1 h-px origin-left"
        style={{ background: "var(--section-line)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------
   RevealTitle — masked, word-by-word headline reveal.
   `lead` renders in primary text, `accent` renders with gradient-text.
---------------------------------------------------------------- */
export function RevealTitle({
  lead,
  accent,
  className = "text-4xl md:text-5xl font-bold",
}: {
  lead: string;
  accent?: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const leadWords = lead.split(" ");
  const accentWords = accent ? accent.split(" ") : [];

  const word = (w: string, i: number, isAccent: boolean) => (
    <span
      key={`${isAccent ? "a" : "l"}-${i}`}
      className="inline-block overflow-hidden align-bottom"
      style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
    >
      <motion.span
        className={`inline-block ${isAccent ? "gradient-text" : ""}`}
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{
          duration: 0.7,
          ease: EASE,
          delay: 0.05 * (isAccent ? leadWords.length + i : i),
        }}
      >
        {w}
      </motion.span>
      {" "}
    </span>
  );

  return (
    <h2 ref={ref} className={className} style={{ color: "var(--text-primary)" }}>
      {leadWords.map((w, i) => word(w, i, false))}
      {accentWords.map((w, i) => word(w, i, true))}
    </h2>
  );
}
