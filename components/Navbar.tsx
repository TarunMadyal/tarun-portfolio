"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import DayNightToggle from "./DayNightToggle";
import { useRipple } from "./useRipple";

const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

function Logo() {
  return (
    <a
      href="#"
      className="relative inline-block cursor-pointer group"
      style={{ paddingRight: 12 }}
      aria-label="Tarun Madyal – home"
    >
      <span className="text-xl font-black tracking-tight gradient-text" style={{ letterSpacing: "-0.025em" }}>
        TM
      </span>
      {/* Tiny leaf accent — positioned top-right of the wordmark */}
      <svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        className="absolute -top-1 right-0 transition-all duration-300 opacity-50 group-hover:opacity-80 group-hover:-translate-y-px"
        aria-hidden="true"
      >
        <path
          d="M4 9.5 C3 7 0.5 5 0.5 2.8 C0.5 1.4 1.9 0.5 4 0.5 C6.1 0.5 7.5 1.4 7.5 2.8 C7.5 5 5 7 4 9.5Z"
          fill="var(--accent-green)"
        />
        <line x1="4" y1="0.5" x2="4" y2="9.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <path d="M4 3.5 Q6 4.5 7.5 4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" fill="none" />
      </svg>
    </a>
  );
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaHover,   setCtaHover]   = useState(false);
  const ripple = useRipple();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: "padding 0.3s ease, background 0.5s ease, border-color 0.4s ease",
        background:           scrolled ? "var(--bg-glass)"  : "transparent",
        backdropFilter:       scrolled ? "blur(20px)"       : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)"       : "none",
        borderBottom:         scrolled ? "1px solid var(--border-card)" : "1px solid transparent",
        padding:              scrolled ? "12px 0" : "20px 0",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors duration-200 cursor-pointer relative group"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "var(--accent-violet)" }}
              />
            </a>
          ))}
        </div>

        {/* Desktop right: toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <DayNightToggle />
          <div
            className="relative"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            <motion.a
              href="#contact"
              onPointerDown={ripple}
              className="btn-primary relative overflow-hidden inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                Hire Me
              </span>
            </motion.a>

            {/* Reveal tooltip */}
            <AnimatePresence>
              {ctaHover && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full right-0 mt-3 px-4 py-2.5 rounded-xl whitespace-nowrap"
                  style={{
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid var(--border-accent)",
                    boxShadow: "0 12px 36px var(--glow-violet)",
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                    Available for impactful opportunities.
                  </p>
                  <div
                    className="absolute -top-1.5 right-6 w-3 h-3 rotate-45"
                    style={{ background: "var(--bg-glass)", borderLeft: "1px solid var(--border-accent)", borderTop: "1px solid var(--border-accent)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <DayNightToggle />
          <button
            className="transition-colors cursor-pointer p-1"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background:           "var(--bg-glass)",
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: `1px solid var(--border-card)`,
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 border-b text-sm cursor-pointer transition-colors"
                  style={{ color: "var(--text-secondary)", borderColor: "var(--border-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-primary text-center text-sm font-semibold text-white px-5 py-3 rounded-xl cursor-pointer mt-4"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
