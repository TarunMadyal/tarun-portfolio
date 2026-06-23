"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, ArrowRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { SectionLabel, RevealTitle } from "./Reveal";
import { useRipple } from "./useRipple";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "tarunmadyal@gmail.com",
    href: "mailto:tarunmadyal@gmail.com",
    copyText: "tarunmadyal@gmail.com",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.1)",
    accentBorder: "rgba(167,139,250,0.2)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9480342035",
    href: "tel:+919480342035",
    copyText: "+919480342035",
    accent: "#60a5fa",
    accentBg: "rgba(96,165,250,0.1)",
    accentBorder: "rgba(96,165,250,0.2)",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "tarun-madyal",
    href: "https://www.linkedin.com/in/tarun-madyal-2bb967213/",
    copyText: null,
    accent: "#67e8f9",
    accentBg: "rgba(103,232,249,0.1)",
    accentBorder: "rgba(103,232,249,0.2)",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "TarunMadyal",
    href: "https://github.com/TarunMadyal",
    copyText: null,
    accent: "#4ade80",
    accentBg: "rgba(74,222,128,0.1)",
    accentBorder: "rgba(74,222,128,0.2)",
  },
];

export default function Contact() {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState<string | null>(null);
  const ripple = useRipple();

  function handleCopy(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section id="contact" className="py-20 md:py-24 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: "var(--orb-violet)" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "var(--orb-blue)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        <SectionLabel>Get In Touch</SectionLabel>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}
          <div>
            <RevealTitle lead="Let's build" accent="something great." className="text-4xl md:text-5xl font-bold mb-6 leading-tight" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              Whether it&apos;s a freelance project, internship opportunity, or just a
              conversation about tech — my inbox is open. I&apos;m actively looking for
              opportunities where I can contribute, learn, and grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <motion.a
                href="mailto:tarunmadyal@gmail.com"
                onPointerDown={ripple}
                className="btn-primary group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send an Email
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/tarun-madyal-2bb967213/"
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={ripple}
                className="btn-secondary relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
                style={{ color: "var(--text-primary)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkedinIcon width={15} height={15} />
                LinkedIn
              </motion.a>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl glass-card"
              style={{ border: "1px solid rgba(74,222,128,0.18)" }}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full" style={{ background: "#4ade80" }} />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#4ade80", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.4 }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Available for opportunities
                </p>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                  Internship · Freelance · Full-time
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: contact cards */}
          <div className="space-y-3">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const isCopied = copied === item.label;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 28 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between rounded-xl group"
                  style={{
                    background:  "var(--bg-card)",
                    border:      `1px solid ${item.accentBorder}`,
                    padding:     "18px 20px",
                    transition:  "background 0.25s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = item.accentBg)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "var(--bg-card)")}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.accentBg }}
                    >
                      <Icon width={18} height={18} style={{ color: item.accent }} />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: "var(--text-dim)" }}>{item.label}</p>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium cursor-pointer transition-colors duration-200"
                        style={{ color: "var(--text-primary)" }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.color = item.accent)}
                        onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                  {item.copyText && (
                    <button
                      onClick={() => handleCopy(item.copyText!, item.label)}
                      className="p-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-80"
                      style={{ background: item.accentBg, color: item.accent }}
                      aria-label={`Copy ${item.label}`}
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
