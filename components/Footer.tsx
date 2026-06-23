"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const links = [
  { icon: GithubIcon,  href: "https://github.com/TarunMadyal",                      label: "GitHub"   },
  { icon: LinkedinIcon,href: "https://www.linkedin.com/in/tarun-madyal-2bb967213/", label: "LinkedIn" },
  { icon: Mail,        href: "mailto:tarunmadyal@gmail.com",                         label: "Email"    },
];

export default function Footer() {
  return (
    <footer
      className="py-10"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-black gradient-text" style={{ lineHeight: 1 }}>T.</span>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>· Tarun Madyal</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          {links.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background:   "var(--bg-card)",
                color:        "var(--text-muted)",
                border:       "1px solid var(--border-subtle)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color       = "var(--accent-violet)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color       = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              <Icon width={15} height={15} />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Open to work · © 2026 Tarun Madyal
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
