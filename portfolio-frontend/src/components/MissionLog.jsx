import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "../utils/soundEngine";
import { sysErrorCard, sysErrorFadeUp } from "../utils/motionVariants";

/* ============================================================================
   COMPACT TECH STACK SVG ICONS (Adapts to Dark, Light, and B&W Themes)
   ============================================================================ */
function TechBadgeIcon({ type, isBW, isLight }) {
  const boxClass = isBW
    ? "flex h-7 w-7 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white shadow-sm"
    : isLight
    ? "flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300/80 bg-[#dbe2ec] shadow-sm"
    : null;

  switch (type) {
    case "js":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/15 shadow-sm"
          }
          title="JavaScript (ES6+)"
        >
          <span
            className={`rounded px-1 py-0.5 font-sans text-[9px] font-black leading-none ${
              isBW
                ? "bg-white text-black"
                : "bg-[#f7df1e] text-black"
            }`}
          >
            JS
          </span>
        </div>
      );
    case "react":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/10 shadow-sm"
          }
          title="React.js"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW ? "text-white" : isLight ? "text-sky-500" : "text-[#38bdf8]"
            }`}
            fill="none"
          >
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4.2"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4.2"
              transform="rotate(60 12 12)"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4.2"
              transform="rotate(120 12 12)"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </div>
      );
    case "node":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 shadow-sm"
          }
          title="Node.js"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-neutral-200"
                : isLight
                ? "text-emerald-600"
                : "text-[#22c55e]"
            }`}
            fill="none"
          >
            <path
              d="M12 2L20.5 6.9V17.1L12 22L3.5 17.1V6.9L12 2Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <text
              x="12"
              y="15"
              textAnchor="middle"
              fill="currentColor"
              fontSize="7.5"
              fontWeight="bold"
              fontFamily="monospace"
            >
              JS
            </text>
          </svg>
        </div>
      );
    case "db":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10 shadow-sm"
          }
          title="SQL & NoSQL Databases"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-neutral-200"
                : isLight
                ? "text-indigo-500"
                : "text-indigo-400"
            }`}
            fill="none"
          >
            <ellipse
              cx="12"
              cy="5.5"
              rx="7.5"
              ry="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4.5 5.5V12C4.5 13.66 7.86 15 12 15C16.14 15 19.5 13.66 19.5 12V5.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4.5 12V18.5C4.5 20.16 7.86 21.5 12 21.5C16.14 21.5 19.5 20.16 19.5 18.5V12"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </div>
      );
    case "next":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-slate-400/30 bg-slate-500/15 shadow-sm"
          }
          title="Next.js"
        >
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] font-extrabold ${
              isBW
                ? "border-white/40 bg-white text-black"
                : "border-white/20 bg-slate-900 text-white"
            }`}
          >
            N
          </span>
        </div>
      );
    case "postgres":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10 shadow-sm"
          }
          title="PostgreSQL"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-white"
                : isLight
                ? "text-blue-500"
                : "text-[#60a5fa]"
            }`}
            fill="none"
          >
            <path
              d="M12 3C7.5 3 4.5 5.8 4.5 9.5C4.5 13.2 7 15.5 9.5 16.5V20.5L13 18.5C16.8 18 19.5 14.5 19.5 9.5C19.5 5.8 16.5 3 12 3Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
            <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
          </svg>
        </div>
      );
    case "cloud":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/10 shadow-sm"
          }
          title="Cloud & REST Architecture"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-neutral-200"
                : isLight
                ? "text-sky-500"
                : "text-[#38bdf8]"
            }`}
            fill="currentColor"
          >
            <path d="M17.5 19H7a5 5 0 01-.7-9.95A6.5 6.5 0 0119 10.5a4.5 4.5 0 01-1.5 8.5z" />
          </svg>
        </div>
      );
    case "docker":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10 shadow-sm"
          }
          title="Docker & Containers"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-white"
                : isLight
                ? "text-blue-500"
                : "text-[#3b82f6]"
            }`}
            fill="currentColor"
          >
            <rect x="4" y="10" width="3" height="2.5" rx="0.4" />
            <rect x="7.8" y="10" width="3" height="2.5" rx="0.4" />
            <rect x="11.6" y="10" width="3" height="2.5" rx="0.4" />
            <rect x="7.8" y="6.8" width="3" height="2.5" rx="0.4" />
            <rect x="11.6" y="6.8" width="3" height="2.5" rx="0.4" />
            <path d="M2 13.5c1.5 0 18 .2 19.5-2-.8 5.2-4.8 7.5-10.5 7.5-5.2 0-8.2-2.2-9-5.5z" />
          </svg>
        </div>
      );
    case "discord":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/15 shadow-sm"
          }
          title="Discord Bots & Automation"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-neutral-200"
                : isLight
                ? "text-indigo-500"
                : "text-[#6366f1]"
            }`}
            fill="currentColor"
          >
            <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
          </svg>
        </div>
      );
    case "prisma":
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-purple-400/30 bg-purple-500/10 shadow-sm"
          }
          title="Prisma ORM & TypeScript"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-white"
                : isLight
                ? "text-purple-500"
                : "text-purple-400"
            }`}
            fill="none"
          >
            <path
              d="M12 3L4.5 17.5L11 21L19.5 16.5L12 3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M12 3L11 21" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      );
    case "globe":
    default:
      return (
        <div
          className={
            boxClass ||
            "flex h-7 w-7 items-center justify-center rounded-lg border border-teal-400/30 bg-teal-500/10 shadow-sm"
          }
          title="3D Web & Global Scale"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${
              isBW
                ? "text-neutral-200"
                : isLight
                ? "text-teal-500"
                : "text-teal-400"
            }`}
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="8.5"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="4"
              ry="8.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M4 9.5H20M4 14.5H20"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );
  }
}

/* ============================================================================
   COMPACT ISOMETRIC 3D PEDESTAL ILLUSTRATIONS (Theme-Aware)
   ============================================================================ */
function IsometricPedestal({ type, isBW, isLight }) {
  return (
    <div className="relative mx-auto flex h-20 w-28 select-none items-center justify-center">
      <div
        className={`pointer-events-none absolute bottom-1 h-8 w-20 rounded-full blur-lg ${
          isBW
            ? "bg-white/15"
            : isLight
            ? "bg-blue-400/20"
            : type === "laptop"
            ? "bg-blue-500/25"
            : type === "servers"
            ? "bg-purple-500/30"
            : type === "cube"
            ? "bg-sky-500/30"
            : "bg-emerald-500/30"
        }`}
      />

      <svg
        viewBox="0 0 180 135"
        className={`h-full w-full overflow-visible ${
          isBW ? "grayscale contrast-125" : ""
        }`}
      >
        <defs>
          <linearGradient id="pedestalTop" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor={isLight ? "#dce3ed" : "#f1f5f9"}
              stopOpacity="0.96"
            />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pedestalSideL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="pedestalSideR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        <g transform="translate(0, 6)">
          <polygon
            points="90,124 156,94 90,66 24,94"
            fill={isLight ? "rgba(100, 116, 139, 0.2)" : "rgba(15, 23, 42, 0.28)"}
          />
          <polygon
            points="26,84 90,114 90,122 26,92"
            fill="url(#pedestalSideL)"
          />
          <polygon
            points="154,84 90,114 90,122 154,92"
            fill="url(#pedestalSideR)"
          />
          <polygon
            points="90,54 154,84 90,114 26,84"
            fill="url(#pedestalTop)"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
        </g>

        {type === "laptop" && (
          <g className="holo-levitate">
            <polygon
              points="90,74 128,90 92,106 54,90"
              fill="#64748b"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <polygon
              points="56,88 56,44 98,28 98,72"
              fill="#1e293b"
              stroke={isBW ? "#ffffff" : "#93c5fd"}
              strokeWidth="2"
            />
            <text
              x="77"
              y="62"
              textAnchor="middle"
              fill={isBW ? "#ffffff" : "#60a5fa"}
              fontSize="14"
              fontWeight="bold"
              fontFamily="monospace"
              transform="skewY(-18)"
            >
              &lt;/&gt;
            </text>
          </g>
        )}

        {type === "servers" && (
          <g className="holo-levitate">
            {[0, -16, -32].map((offsetY, i) => (
              <g key={i} transform={`translate(0, ${offsetY})`}>
                <polygon
                  points="54,74 90,90 90,100 54,84"
                  fill={isBW ? "#525252" : "#7c3aed"}
                />
                <polygon
                  points="126,74 90,90 90,100 126,84"
                  fill={isBW ? "#262626" : "#5b21b6"}
                />
                <polygon
                  points="90,58 126,74 90,90 54,74"
                  fill={isBW ? "#a3a3a3" : "#a78bfa"}
                  stroke={isBW ? "#ffffff" : "#ddd6fe"}
                  strokeWidth="1"
                />
                <circle
                  cx="66"
                  cy="83"
                  r="2"
                  fill={isBW ? "#ffffff" : "#34d399"}
                />
                <circle
                  cx="74"
                  cy="86.5"
                  r="2"
                  fill={isBW ? "#d4d4d4" : "#38bdf8"}
                />
              </g>
            ))}
          </g>
        )}

        {type === "cube" && (
          <g className="holo-levitate">
            <polygon
              points="90,26 126,44 90,62 54,44"
              fill={isBW ? "#d4d4d4" : "#38bdf8"}
              fillOpacity="0.88"
              stroke={isBW ? "#ffffff" : "#bae6fd"}
              strokeWidth="1.5"
            />
            <polygon
              points="54,44 90,62 90,98 54,80"
              fill={isBW ? "#737373" : "#0284c7"}
              fillOpacity="0.88"
            />
            <polygon
              points="126,44 90,62 90,98 126,80"
              fill={isBW ? "#404040" : "#0369a1"}
              fillOpacity="0.9"
            />
            <polygon
              points="90,38 112,49 90,60 68,49"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        )}

        {type === "rocket" && (
          <g className="holo-levitate">
            <polygon
              points="84,82 90,100 96,82"
              fill={isBW ? "#a3a3a3" : "#f59e0b"}
            />
            <polygon
              points="87,82 90,93 93,82"
              fill={isBW ? "#ffffff" : "#fef08a"}
            />
            <polygon
              points="76,72 64,84 78,82"
              fill={isBW ? "#525252" : "#7c3aed"}
            />
            <polygon
              points="104,72 116,84 102,82"
              fill={isBW ? "#404040" : "#6d28d9"}
            />
            <path
              d="M90,22 C104,38 105,64 102,82 L78,82 C75,64 76,38 90,22 Z"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <path
              d="M90,22 C96,30 98,38 99,42 L81,42 C82,38 84,30 90,22 Z"
              fill={isBW ? "#262626" : "#8b5cf6"}
            />
            <circle
              cx="90"
              cy="56"
              r="7"
              fill={isBW ? "#d4d4d4" : "#38bdf8"}
              stroke={isBW ? "#525252" : "#6366f1"}
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

const JOURNEY_STAGES = [
  {
    number: "01",
    period: "2023 – 2024",
    periodColor: "text-blue-500",
    badge: "Completed",
    badgeStyle:
      "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30",
    title: "Full-Stack Foundations",
    description:
      "Learned core web tech and built real projects to strengthen my skills.",
    details:
      "Built strong foundations in React.js, Node.js, Express, REST APIs, and relational/NoSQL databases while creating E-Commerce and Blog backend systems.",
    icons: ["js", "react", "node", "db"],
    lineColor: "border-blue-500/60",
    nodeRing:
      "border-blue-500 text-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.35)]",
    pedestal: "laptop",
    elevateClass: "lg:mt-5",
  },
  {
    number: "02",
    period: "2024 – Present",
    periodColor: "text-indigo-500",
    badge: "Active Role",
    badgeStyle: "bg-blue-500/15 text-blue-500 border border-blue-500/30",
    title: "APS Matrix",
    description:
      "Working as a Full-Stack Developer, contributing to live applications and APIs.",
    details:
      "Contributed to 4+ production projects at APS Matrix—architecting frontend features, implementing JWT & OTP authentication, and integrating 30+ API endpoints across MySQL, MongoDB, and PostgreSQL.",
    icons: ["next", "react", "node", "postgres"],
    lineColor: "border-indigo-500/60",
    nodeRing:
      "border-indigo-500 text-indigo-500 shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    pedestal: "servers",
    elevateClass: "lg:mt-3",
  },
  {
    number: "03",
    period: "Key Deliverables",
    periodColor: "text-sky-500",
    badge: "Deployed",
    badgeStyle: "bg-sky-500/15 text-sky-500 border border-sky-500/30",
    title: "Enterprise & SaaS Builds",
    description:
      "Built real-world systems like booking platforms, task management, and bots.",
    details:
      "Engineered full-stack production solutions including a Wellness Service Booking Platform, Task Management System, and customizable Discord Ticket Tool Bot.",
    icons: ["cloud", "docker", "postgres", "discord"],
    lineColor: "border-sky-500/60",
    nodeRing:
      "border-sky-500 text-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.35)]",
    pedestal: "cube",
    elevateClass: "lg:mt-1",
  },
  {
    number: "04",
    period: "2026 – Ongoing",
    periodColor: "text-emerald-500",
    badge: "In Progress",
    badgeStyle:
      "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30",
    title: "What's Next",
    description:
      "Exploring new technologies and building bigger, more impactful products.",
    details:
      "Scaling next-generation web applications with Next.js, TypeScript, NestJS, Prisma ORM, AI integrations, and interactive Three.js 3D web experiences.",
    icons: ["next", "prisma", "globe", "db"],
    lineColor: "border-emerald-500/60",
    nodeRing:
      "border-emerald-500 text-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.35)]",
    pedestal: "rocket",
    elevateClass: "lg:-mt-2",
  },
];

function MissionLog({ theme = "dark" }) {
  const [selectedStage, setSelectedStage] = useState(null);
  const isBW = theme === "bw";
  const isLight = theme === "light";

  return (
    <section
      className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col justify-center py-8 md:py-10"
      id="missions"
    >
      {/* Animated Header Matching Portfolio Theme System */}
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mb-6 max-w-2xl text-center"
      >
        <span className="theme-badge inline-flex items-center justify-center rounded-full px-3.5 py-1 font-mono-tech text-xs font-bold uppercase tracking-[0.2em]">
          03 {"//"} EXPERIENCE &amp; JOURNEY
        </span>

        <h2 className="mt-2.5 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-4xl">
          FROM{" "}
          <span
            className={
              isBW
                ? "underline decoration-white/50 underline-offset-4 text-white"
                : "theme-accent-text"
            }
          >
            LEARNING
          </span>{" "}
          TO{" "}
          <span
            className={
              isBW
                ? "text-neutral-300"
                : isLight
                ? "text-blue-600"
                : "theme-accent-text"
            }
          >
            BUILDING
          </span>
        </h2>

        <p className="mt-1.5 text-xs theme-text-secondary sm:text-sm">
          A timeline of my engineering progression, active full-stack role, and
          production deliveries.
        </p>
      </motion.div>

      {/* Compact 1-Screen 4-Column Staggered Journey Showcase */}
      <div className="relative">
        {/* Self-Drawing Animated S-Curve Ribbon Wave Behind Nodes (Desktop) */}
        <svg
          viewBox="0 0 1200 180"
          fill="none"
          className="pointer-events-none absolute inset-x-0 bottom-[42px] z-0 hidden h-36 w-full lg:block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="journeyWaveGrad"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="0%"
            >
              {isBW ? (
                <>
                  <stop offset="0%" stopColor="#525252" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#a3a3a3" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
                </>
              ) : isLight ? (
                <>
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.32" />
                  <stop offset="40%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="75%" stopColor="#0ea5e9" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.45" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.65" />
                </>
              )}
            </linearGradient>
          </defs>

          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            d="M 40,125 C 120,95 190,95 280,125 C 370,155 410,100 480,115 C 570,125 670,155 760,120 C 860,85 960,55 1060,65 C 1110,70 1145,50 1175,30"
            stroke="url(#journeyWaveGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />

          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            d="M 40,133 C 120,103 190,103 280,133 C 370,163 410,108 480,123 C 570,133 670,163 760,128 C 860,93 960,63 1060,73 C 1110,78 1145,58 1175,38"
            stroke={isBW ? "#d4d4d4" : isLight ? "#64748b" : "#38bdf8"}
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          <motion.polygon
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.4 }}
            points="1185,22 1160,30 1175,45"
            fill={isBW ? "#ffffff" : isLight ? "#2563eb" : "#38bdf8"}
            fillOpacity="0.7"
          />
        </svg>

        {/* 4 Staggered Journey Columns with System-Error Jiggle + Fade-Up */}
        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {JOURNEY_STAGES.map((stage, idx) => {
            const periodClass = isBW
              ? "text-neutral-200"
              : stage.periodColor;
            const badgeClass = isBW
              ? "border border-white/40 bg-white/10 text-white"
              : stage.badgeStyle;
            const lineClass = isBW
              ? "border-white/50"
              : stage.lineColor;
            const ringClass = isBW
              ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.35)]"
              : stage.nodeRing;

            return (
              <motion.div
                key={stage.number}
                variants={sysErrorCard}
                custom={idx * 0.13}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`flex flex-col items-center ${stage.elevateClass}`}
              >
                {/* Compact Floating Card */}
                <article
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedStage(
                      selectedStage?.number === stage.number ? null : stage
                    );
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="theme-surface group relative w-full cursor-pointer rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono-tech text-[11px] font-bold uppercase tracking-wider ${periodClass}`}
                    >
                      {stage.period}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono-tech text-[10px] font-bold uppercase ${badgeClass}`}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-start justify-between gap-2">
                    <h3 className="font-requiem text-base font-bold leading-snug theme-text-primary">
                      {stage.title}
                    </h3>
                    <button
                      type="button"
                      aria-label={`Inspect ${stage.title}`}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition group-hover:translate-x-0.5"
                      style={{
                        borderColor: "var(--border-color)",
                        backgroundColor: "var(--bg-input)",
                      }}
                    >
                      <span className="text-xs theme-text-primary">→</span>
                    </button>
                  </div>

                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed theme-text-secondary">
                    {stage.description}
                  </p>

                  <div className="mt-3.5 flex items-center gap-2">
                    {stage.icons.map((iconType, i) => (
                      <TechBadgeIcon
                        key={i}
                        type={iconType}
                        isBW={isBW}
                        isLight={isLight}
                      />
                    ))}
                  </div>
                </article>

                {/* Compact Vertical Dashed Connector + Glowing Number Badge */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-3.5 w-0 border-l-2 border-dashed ${lineClass}`}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: 0.25 + idx * 0.14,
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[var(--bg-card)] font-mono-tech text-xs font-extrabold ${ringClass}`}
                  >
                    {stage.number}
                  </motion.div>
                  <div
                    className={`h-3 w-0 border-l-2 border-dashed ${lineClass}`}
                  />
                </div>

                {/* Compact Isometric 3D Platform Pedestal */}
                <IsometricPedestal
                  type={stage.pedestal}
                  isBW={isBW}
                  isLight={isLight}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Compact Expandable Milestone Detail Bar */}
      {selectedStage && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="theme-surface mx-auto mt-3 flex w-full max-w-4xl flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 font-mono-tech text-[11px] font-bold uppercase">
              <span
                className={
                  isBW ? "text-white" : selectedStage.periodColor
                }
              >
                STAGE {selectedStage.number} {"//"} {selectedStage.period}
              </span>
              <span className="theme-text-primary">— {selectedStage.title}:</span>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed theme-text-secondary">
              {selectedStage.details}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedStage(null)}
            className="theme-badge rounded-lg px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase"
          >
            CLOSE [X]
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default MissionLog;
