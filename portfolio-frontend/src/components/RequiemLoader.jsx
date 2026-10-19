import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "../utils/soundEngine";

export function UmbrellaOctagonSVG({ className = "h-16 w-16", spin = true }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${spin ? "animate-[spin_10s_linear_infinite]" : ""}`}
      aria-hidden="true"
    >
      {/* Outer Octagon */}
      <polygon
        points="38,6 82,6 114,38 114,82 82,114 38,114 6,82 6,38"
        fill="none"
        stroke="#dc2626"
        strokeWidth="3"
      />
      {/* 8 Umbrella Wedges Alternating Red and Bone-White */}
      <path d="M60,60 L38,6 L82,6 Z" fill="#dc2626" fillOpacity="0.9" />
      <path d="M60,60 L82,6 L114,38 Z" fill="#f3f4f6" fillOpacity="0.88" />
      <path d="M60,60 L114,38 L114,82 Z" fill="#dc2626" fillOpacity="0.9" />
      <path d="M60,60 L114,82 L82,114 Z" fill="#f3f4f6" fillOpacity="0.88" />
      <path d="M60,60 L82,114 L38,114 Z" fill="#dc2626" fillOpacity="0.9" />
      <path d="M60,60 L38,114 L6,82 Z" fill="#f3f4f6" fillOpacity="0.88" />
      <path d="M60,60 L6,82 L6,38 Z" fill="#dc2626" fillOpacity="0.9" />
      <path d="M60,60 L6,38 L38,6 Z" fill="#f3f4f6" fillOpacity="0.88" />
      {/* Center Hub */}
      <circle cx="60" cy="60" r="10" fill="#060608" stroke="#dc2626" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="3.5" fill="#dc2626" />
    </svg>
  );
}

function RequiemLoader({ onStartReveal, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [glitchBurst, setGlitchBurst] = useState(false);

  // Sync saved theme immediately so loader matches Dark, Light, or B&W mode
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
      document.documentElement.setAttribute("data-theme", savedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 6) + 3;
        return Math.min(100, prev + increment);
      });
    }, 38);

    return () => clearInterval(interval);
  }, []);

  // Trigger subtle system-error jiggle burst during loading milestones
  useEffect(() => {
    if (
      (progress > 24 && progress < 32) ||
      (progress > 60 && progress < 68) ||
      progress === 100
    ) {
      setGlitchBurst(true);
      soundEngine.playTypewriter();
      const t = setTimeout(() => setGlitchBurst(false), 180);
      return () => clearTimeout(t);
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100 && !exiting) {
      const startExitTimer = setTimeout(() => {
        setExiting(true);
        onStartReveal?.();
        const doneTimer = setTimeout(() => {
          onComplete?.();
        }, 850);
        return () => clearTimeout(doneTimer);
      }, 220);

      return () => clearTimeout(startExitTimer);
    }
  }, [progress, exiting, onStartReveal, onComplete]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: exiting ? "-100%" : "0%" }}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderBottom: exiting ? "1px solid var(--border-strong)" : "none",
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-between px-6 py-10 shadow-[0_28px_90px_rgba(0,0,0,0.65)] select-none"
    >
      {/* Top Spacer to keep center block dead-center */}
      <div className="h-4 w-full" aria-hidden="true" />

      {/* Center Minimalist Brand (Matches // SQUARED reference) with System-Error Jiggle */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={
          exiting
            ? { opacity: 0, y: -36, transition: { duration: 0.4, ease: "easeIn" } }
            : glitchBurst
            ? {
                opacity: [1, 0.45, 1, 0.7, 1],
                x: [0, -7, 6, -4, 3, 0],
                y: [0, -2, 2, -1, 0],
                skewX: [0, -5, 5, -2, 0],
                transition: { duration: 0.22 },
              }
            : {
                opacity: [0, 0.9, 0.4, 1],
                y: [24, -2, 1, 0],
                x: [0, -5, 4, 0],
                skewX: [0, -3, 2, 0],
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              }
        }
        className="flex flex-col items-center text-center"
      >
        <span
          className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.38em] sm:text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          WELCOME TO
        </span>

        <div className="mt-3 flex items-center gap-3 sm:gap-4">
          <span
            className="font-requiem text-3xl font-black italic tracking-tighter sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            {"//"}
          </span>
          <h1
            className="font-requiem text-3xl font-extrabold uppercase tracking-[0.14em] sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            HIMANSHU
          </h1>
        </div>
      </motion.div>

      {/* Bottom Minimalist Line + Numeric Counter (e.g. —————— 64) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={
          exiting
            ? { opacity: 0, y: -16, transition: { duration: 0.3 } }
            : { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.45 } }
        }
        className="flex items-center gap-5 pb-1"
      >
        <div
          className="relative h-[1.5px] w-44 overflow-hidden sm:w-52"
          style={{ backgroundColor: "var(--border-color)" }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: "var(--text-primary)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.08, ease: "linear" }}
          />
        </div>

        <span
          className="w-7 text-right font-mono-tech text-xs font-bold tabular-nums tracking-wider"
          style={{ color: "var(--text-primary)" }}
        >
          {progress}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default RequiemLoader;
