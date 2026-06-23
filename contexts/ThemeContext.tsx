"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  /** Optionally pass the originating pointer event for a circular reveal. */
  toggleTheme: (e?: { clientX: number; clientY: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      // Fall back to whatever the anti-FOWT script already applied
      const current = document.documentElement.getAttribute("data-theme");
      if (current === "light") setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(
    (e?: { clientX: number; clientY: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      // Graceful fallback: no View Transitions support, or reduced motion.
      if (!doc.startViewTransition || reduced) {
        setTheme(next);
        return;
      }

      const x = e?.clientX ?? window.innerWidth - 64;
      const y = e?.clientY ?? 40;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        // Apply the theme synchronously so the "after" snapshot is the new theme.
        document.documentElement.setAttribute("data-theme", next);
        setTheme(next);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
