"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import DayNightToggle from "./DayNightToggle";
import { useRipple } from "./useRipple";

const navLinks = [
  { label: "About",      href: "#about",      id: "about"      },
  { label: "Skills",     href: "#skills",     id: "skills"     },
  { label: "Projects",   href: "#projects",   id: "projects"   },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact",    href: "#contact",    id: "contact"    },
];

const NAV_GRADIENT =
  "linear-gradient(90deg, var(--accent-green), var(--accent-violet), var(--accent-blue))";

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.a
      href="#"
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="relative inline-block cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{
        paddingRight: 12,
        transform: scrolled ? "scale(0.9)" : "scale(1)",
        transformOrigin: "left center",
        transition: "transform 0.3s ease",
      }}
      aria-label="Tarun Madyal – home"
    >
      <span className="text-xl font-black tracking-tight gradient-text" style={{ letterSpacing: "-0.025em" }}>
        TM
      </span>
      {/* Tiny leaf accent — sways on hover */}
      <motion.svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        className="absolute -top-1 right-0"
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
        variants={{
          rest:  { rotate: 0, y: 0, opacity: 0.5 },
          hover: { rotate: [0, -14, 9, -5, 0], y: -2, opacity: 0.85 },
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <path
          d="M4 9.5 C3 7 0.5 5 0.5 2.8 C0.5 1.4 1.9 0.5 4 0.5 C6.1 0.5 7.5 1.4 7.5 2.8 C7.5 5 5 7 4 9.5Z"
          fill="var(--accent-green)"
        />
        <line x1="4" y1="0.5" x2="4" y2="9.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <path d="M4 3.5 Q6 4.5 7.5 4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" fill="none" />
      </motion.svg>
    </motion.a>
  );
}

function DesktopLink({ link, active }: { link: typeof navLinks[number]; active: boolean }) {
  const [hover, setHover] = useState(false);
  const color = active || hover ? "var(--text-primary)" : "var(--text-secondary)";

  return (
    <a
      href={link.href}
      aria-current={active ? "true" : undefined}
      className="relative text-sm cursor-pointer py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ color, transition: "color 0.2s ease" }}>{link.label}</span>

      {active ? (
        /* Shared-element indicator glides between links as you scroll */
        <motion.span
          layoutId="nav-active-underline"
          className="absolute -bottom-1 left-0 right-0 rounded-full"
          style={{ height: 2, background: NAV_GRADIENT }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : (
        /* Hover-grow underline for inactive links */
        <span
          className="absolute -bottom-1 left-0 rounded-full transition-all duration-300"
          style={{
            height: 2,
            width: hover ? "100%" : 0,
            background: "var(--accent-violet)",
            opacity: 0.75,
          }}
        />
      )}
    </a>
  );
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaHover,   setCtaHover]   = useState(false);
  const [active,     setActive]     = useState<string>("");
  const ripple = useRipple();

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Scroll-spy: highlight the section currently crossing the viewport mid-band */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: "padding 0.3s ease, background 0.5s ease, border-color 0.4s ease, box-shadow 0.5s ease",
        background:           scrolled ? "var(--bg-glass)"  : "transparent",
        backdropFilter:       scrolled ? "blur(20px)"       : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)"       : "none",
        borderBottom:         scrolled ? "1px solid var(--border-card)" : "1px solid transparent",
        boxShadow:            scrolled ? "0 8px 32px -12px var(--glow-violet)" : "none",
        padding:              scrolled ? "12px 0" : "20px 0",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo scrolled={scrolled} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <DesktopLink key={link.label} link={link} active={active === link.id} />
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
              className="btn-primary relative overflow-hidden inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
            className="relative z-50 transition-colors cursor-pointer p-1"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Scroll progress bar — sits on the navbar's bottom edge */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 origin-left"
        style={{
          height: 2,
          scaleX: progressScaleX,
          background: NAV_GRADIENT,
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Mobile menu + backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 -z-10"
              style={{ background: "rgba(0,0,0,0.45)", top: "100%" }}
              aria-hidden="true"
            />

            <motion.div
              key="menu"
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
              <motion.div
                className="px-6 py-5 flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                }}
              >
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -14 },
                        show:   { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 py-3 border-b text-sm cursor-pointer transition-colors"
                      style={{
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        borderColor: "var(--border-subtle)",
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: isActive ? 14 : 0,
                          height: 2,
                          background: NAV_GRADIENT,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      {link.label}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#contact"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show:   { opacity: 1, y: 0 },
                  }}
                  onPointerDown={ripple}
                  className="btn-primary relative overflow-hidden text-center text-sm font-semibold text-white px-5 py-3 rounded-xl cursor-pointer mt-4"
                  onClick={() => setMobileOpen(false)}
                >
                  Hire Me
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
