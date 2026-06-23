"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/* ── Web Audio bark sound (user-triggered only) ── */
function playBark() {
  try {
    const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const bark = (freq: number, start: number, end: number) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass"; filt.frequency.value = 700;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.55, ctx.currentTime + end);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + end);
      osc.connect(filt); filt.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start); osc.stop(ctx.currentTime + end + 0.05);
    };

    bark(190, 0,    0.11);
    bark(160, 0.14, 0.26);
    setTimeout(() => ctx.close().catch(() => {}), 800);
  } catch { /* audio unavailable */ }
}

/* ── Chibi Dog SVG ── */
interface DogSVGProps {
  eyeX:    number;
  eyeY:    number;
  sleeping: boolean;
  isHappy: boolean;
  isEating: boolean;
}

function DogSVG({ eyeX, eyeY, sleeping, isHappy, isEating }: DogSVGProps) {
  const showTongue = isEating;

  return (
    <svg
      viewBox="0 0 130 105"
      width="84"
      height="68"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))", overflow: "visible" }}
    >
      {/* === TAIL (animated in CSS via className) === */}
      <motion.g
        style={{ transformOrigin: "77px 76px" }}
        animate={sleeping ? { rotate: -5 } : { rotate: [-15, 22, -15] }}
        transition={sleeping
          ? {}
          : { duration: 0.55, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <path
          d="M 77 76 Q 102 62 108 48 Q 112 36 104 32"
          stroke="#C07340"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 77 76 Q 102 62 108 48 Q 112 36 104 32"
          stroke="#D4874F"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>

      {/* === LEFT EAR === */}
      <path
        d="M 28 28 Q 10 32 8 50 Q 6 65 16 68 Q 22 70 24 60 Q 26 48 34 42 Z"
        fill="#B06820"
      />
      <path
        d="M 26 32 Q 12 37 11 52 Q 10 62 17 64 Q 20 65 21 58 Q 23 50 29 44 Z"
        fill="#CC7E34"
      />

      {/* === RIGHT EAR === */}
      <path
        d="M 76 28 Q 94 32 96 50 Q 98 65 88 68 Q 82 70 80 60 Q 78 48 70 42 Z"
        fill="#B06820"
      />
      <path
        d="M 78 32 Q 92 37 93 52 Q 94 62 87 64 Q 84 65 83 58 Q 81 50 75 44 Z"
        fill="#CC7E34"
      />

      {/* === HEAD (big chibi circle) === */}
      <circle cx="52" cy="46" r="32" fill="#D4874F" />
      {/* Forehead highlight */}
      <ellipse cx="52" cy="34" rx="18" ry="14" fill="#E8A87C" fillOpacity="0.6" />

      {/* === CHEEKS === */}
      <ellipse cx="26" cy="54" rx="9"  ry="6" fill="rgba(255,130,130,0.28)" />
      <ellipse cx="78" cy="54" rx="9"  ry="6" fill="rgba(255,130,130,0.28)" />

      {/* === SNOUT === */}
      <ellipse cx="52" cy="57" rx="14" ry="10" fill="#E8A87C" />

      {/* === NOSE === */}
      <ellipse cx="52" cy="52" rx="5.5" ry="4" fill="#2D1505" />
      <ellipse cx="50" cy="51" rx="2"   ry="1.3" fill="rgba(255,255,255,0.45)" />

      {/* === EYES (awake) === */}
      {!sleeping ? (
        <>
          {/* Left eye */}
          <circle cx="36" cy="40" r="10" fill="white" />
          <motion.circle
            cx={36 + eyeX} cy={40 + eyeY}
            r={isHappy ? 6 : 5.5}
            fill="#1a0a00"
          />
          <circle cx={38 + eyeX} cy={38 + eyeY} r="2.2" fill="white" />

          {/* Right eye */}
          <circle cx="68" cy="40" r="10" fill="white" />
          <motion.circle
            cx={68 + eyeX} cy={40 + eyeY}
            r={isHappy ? 6 : 5.5}
            fill="#1a0a00"
          />
          <circle cx={70 + eyeX} cy={38 + eyeY} r="2.2" fill="white" />

          {/* Happy eye sparkle */}
          {isHappy && (
            <>
              <circle cx={37 + eyeX} cy={42 + eyeY} r="1" fill="white" />
              <circle cx={69 + eyeX} cy={42 + eyeY} r="1" fill="white" />
            </>
          )}
        </>
      ) : (
        /* Sleeping eyes — curved "~" lines */
        <>
          <path d="M 28 39 Q 33 44 38 39" stroke="#2D1505" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 60 39 Q 65 44 70 39" stroke="#2D1505" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* === HAPPY EYEBROWS === */}
      {isHappy && !sleeping && (
        <>
          <path d="M 28 30 Q 36 26 42 30" stroke="#7a4a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 62 30 Q 68 26 76 30" stroke="#7a4a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* === MOUTH === */}
      {!showTongue ? (
        <path
          d="M 44 63 Q 52 70 60 63"
          stroke="#2D1505" strokeWidth="2.2" fill="none" strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M 44 63 Q 52 72 60 63" stroke="#2D1505" strokeWidth="2" fill="rgba(40,8,0,0.2)" strokeLinecap="round" />
          <ellipse cx="52" cy="70" rx="7" ry="5.5" fill="#E87D7D" />
          <line x1="52" y1="64" x2="52" y2="75" stroke="#C55555" strokeWidth="1.5" />
        </>
      )}

      {/* === BODY === */}
      <motion.g
        animate={sleeping
          ? { y: 2, scaleX: 1.05 }
          : { y: 0, scaleX: 1 }
        }
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: "52px 88px" }}
      >
        <ellipse cx="52" cy="88" rx="26" ry="15" fill="#C07340" />

        {/* Collar */}
        <rect x="30" y="76" width="44" height="7" rx="3.5" fill="#2E9E6B" />
        <circle cx="52" cy="79.5" r="3" fill="#fbbf24" />

        {/* Front paws */}
        <ellipse cx="36" cy="99" rx="11" ry="7" fill="#B06820" />
        <ellipse cx="68" cy="99" rx="11" ry="7" fill="#B06820" />
        {/* Toe lines */}
        <path d="M 30 99 Q 33 103 36 99" stroke="#8A501A" strokeWidth="1.2" fill="none" />
        <path d="M 36 99 Q 39 103 42 99" stroke="#8A501A" strokeWidth="1.2" fill="none" />
        <path d="M 62 99 Q 65 103 68 99" stroke="#8A501A" strokeWidth="1.2" fill="none" />
        <path d="M 68 99 Q 71 103 74 99" stroke="#8A501A" strokeWidth="1.2" fill="none" />
      </motion.g>
    </svg>
  );
}

/* ── Main Dog component ── */
type State = "idle" | "barking" | "eating" | "happy";

export default function Dog() {
  const { theme } = useTheme();
  const isSleeping = theme === "dark";

  const dogRef   = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [eyePos,      setEyePos]      = useState({ x: 0, y: 0 });
  const [isIntense,   setIsIntense]   = useState(false);
  const [dogState,    setDogState]    = useState<State>("idle");
  const [showBark,    setShowBark]    = useState(false);
  const [showZzz,     setShowZzz]     = useState(false);
  const [isDogHovered,setIsDogHovered]= useState(false);

  /* Wake/sleep on theme change */
  useEffect(() => {
    setDogState("idle");
    setShowBark(false);
    setShowZzz(false);
  }, [theme]);

  /* Show Zzz in dark mode */
  useEffect(() => {
    if (!isSleeping) { setShowZzz(false); return; }
    const id = setTimeout(() => setShowZzz(true), 1200);
    return () => clearTimeout(id);
  }, [isSleeping]);

  /* Mouse tracking */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dogRef.current || isSleeping) return;
      const rect = dogRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const intensity = Math.min(Math.hypot(dx, dy) / 500, 1);
      setEyePos({ x: Math.cos(angle) * intensity * 3.2, y: Math.sin(angle) * intensity * 3.2 });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsIntense(!!el?.closest('button, a[href], input, [role="button"]'));
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isSleeping]);

  /* Click to bark */
  const handleBark = useCallback(() => {
    if (isSleeping || dogState !== "idle") return;
    playBark();
    setDogState("barking");
    setShowBark(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setDogState("idle"); setShowBark(false); }, 1800);
  }, [isSleeping, dogState]);

  const handleFeed = useCallback(() => {
    if (isSleeping) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setDogState("eating");
    timerRef.current = setTimeout(() => setDogState("idle"), 2600);
  }, [isSleeping]);

  const handlePet = useCallback(() => {
    if (isSleeping) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setDogState("happy");
    timerRef.current = setTimeout(() => setDogState("idle"), 2600);
  }, [isSleeping]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const bodyAnim =
    dogState === "barking" ? { rotate: [-4, 4, -4, 4, 0] } :
    dogState === "eating"  ? { y: [0, -5, 0, -5, 0] }    :
    dogState === "happy"   ? { scale: [1, 1.1, 1, 1.1, 1] } : {};

  return (
    <div
      ref={dogRef}
      className="relative select-none"
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}
      onMouseEnter={() => setIsDogHovered(true)}
      onMouseLeave={() => setIsDogHovered(false)}
    >
      {/* Feed / Pet buttons */}
      <AnimatePresence>
        {isDogHovered && !isSleeping && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full mb-2 flex gap-2"
            style={{ whiteSpace: "nowrap" }}
          >
            <motion.button
              onClick={handleFeed}
              className="px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer backdrop-blur-md"
              style={{
                background: "rgba(251,146,60,0.18)",
                color: "#fb923c",
                border: "1px solid rgba(251,146,60,0.35)",
              }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            >
              🦴 Feed
            </motion.button>
            <motion.button
              onClick={handlePet}
              className="px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer backdrop-blur-md"
              style={{
                background: "rgba(244,114,182,0.18)",
                color: "#f472b6",
                border: "1px solid rgba(244,114,182,0.35)",
              }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            >
              🤚 Pet
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zzz bubbles */}
      <AnimatePresence>
        {isSleeping && showZzz && (
          <>
            {["z", "z", "Z"].map((z, i) => (
              <motion.span
                key={i}
                className="absolute font-black pointer-events-none select-none"
                style={{
                  right: -4 + i * 8,
                  top:   -2 - i * 14,
                  fontSize: 8 + i * 3,
                  color: "var(--accent-violet)",
                  opacity: 0,
                }}
                animate={{ y: [-5, -30], opacity: [0, 0.9, 0] }}
                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
              >
                {z}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Bark bubble */}
      <AnimatePresence>
        {showBark && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: -4 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap backdrop-blur-sm"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-accent)",
              color: "var(--text-primary)",
            }}
          >
            Woof! 🐶
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food floating */}
      <AnimatePresence>
        {dogState === "eating" && (
          <motion.div
            className="absolute text-lg pointer-events-none"
            style={{ left: "50%", transform: "translateX(-50%)", top: -10 }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -36, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            🦴
          </motion.div>
        )}
      </AnimatePresence>

      {/* Happy sparkles */}
      <AnimatePresence>
        {dogState === "happy" && ["✨","💕","⭐","💫"].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-sm pointer-events-none"
            style={{ left: `${-5 + i * 30}%`, top: -8 }}
            initial={{ y: 0, opacity: 1, scale: 0.8 }}
            animate={{ y: -50, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, delay: i * 0.1, ease: "easeOut" }}
          >
            {e}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Dog body */}
      <motion.div
        className="cursor-pointer relative"
        onClick={handleBark}
        animate={bodyAnim}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        whileHover={!isSleeping ? { scale: 1.05 } : {}}
        whileTap={!isSleeping ? { scale: 0.96 } : {}}
        title={isSleeping ? "Shhh… sleeping 🌙" : "Click me! 🐕"}
      >
        {/* Subtle glow under dog */}
        <div
          className="absolute -inset-2 rounded-full pointer-events-none"
          style={{
            background: dogState === "happy"
              ? "radial-gradient(circle, rgba(244,114,182,0.22) 0%, transparent 70%)"
              : isSleeping
              ? "radial-gradient(circle, rgba(139,126,200,0.12) 0%, transparent 70%)"
              : isIntense
              ? "radial-gradient(circle, rgba(82,183,136,0.18) 0%, transparent 70%)"
              : "none",
            transition: "background 0.4s ease",
          }}
        />

        <motion.div
          animate={isSleeping ? { rotate: -4 } : { rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <DogSVG
            eyeX={isSleeping ? 0 : eyePos.x}
            eyeY={isSleeping ? 0 : eyePos.y}
            sleeping={isSleeping}
            isHappy={dogState === "happy"}
            isEating={dogState === "eating"}
          />
        </motion.div>
      </motion.div>

      {/* "asleep" tooltip on hover in dark mode */}
      <AnimatePresence>
        {isSleeping && isDogHovered && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-7 text-xs font-medium pointer-events-none whitespace-nowrap"
            style={{ color: "var(--text-muted)" }}
          >
            Switch to day to wake me! ☀️
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
