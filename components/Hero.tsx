"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import ForestBackground from "./ForestBackground";
import Dog from "./Dog";

const socialLinks = [
  { icon: GithubIcon,  href: "https://github.com/TarunMadyal",                        label: "GitHub"   },
  { icon: LinkedinIcon,href: "https://www.linkedin.com/in/tarun-madyal-2bb967213/",   label: "LinkedIn" },
  { icon: Mail,        href: "mailto:tarunmadyal@gmail.com",                           label: "Email"    },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Forest / sky background */}
      <ForestBackground />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-20 w-full">

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-black tracking-tighter leading-none mb-6"
          style={{ fontSize: "clamp(3.2rem, 11vw, 8.5rem)", color: "var(--text-primary)" }}
        >
          Tarun
          <br />
          <span className="gradient-text gradient-text-animate">Madyal.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Building{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>websites</span>,{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>digital experiences</span>, and{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>business solutions</span>{" "}
          that create real impact.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.a
            href="#projects"
            className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>

          <motion.a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ color: "var(--text-primary)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tarun-Madyal-Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border-card)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={15} />
            Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full glass-card cursor-pointer transition-all duration-200"
              style={{ color: "var(--text-secondary)" }}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
            >
              <Icon width={17} height={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* Dog companion — positioned below hero content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-end justify-end mt-8 pr-4 md:pr-12"
        >
          <Dog />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
