import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profilePhoto from "../assets/profile.png";
import Typed from "typed.js";
import { soundEngine } from "../utils/soundEngine";
import {
  sysErrorCard,
  sysErrorContainer,
  sysErrorFadeUp,
  sysErrorPop,
} from "../utils/motionVariants";

function HeroSection({
  outbreakMode = false,
  revealReady = true,
  theme = "dark",
}) {
  const isLight = theme === "light";
  const isBW = theme === "bw";
  const [holoMode, setHoloMode] = useState(true);
  const [rot, setRot] = useState({ x: 4, y: -10 });
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [dragOrigin, setDragOrigin] = useState({
    x: 0,
    y: 0,
    rotX: 4,
    rotY: -10,
  });

  useEffect(() => {
    const options = {
      strings: [
        "Full-Stack Developer // React & Node.js",
        "Next.js, TypeScript & NestJS Specialist",
        "Scalable REST APIs & Database Architecture",
        "PostgreSQL, MongoDB, MySQL & Prisma ORM",
      ],
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 1600,
      showCursor: true,
      cursorChar: "▋",
      loop: true,
    };

    const typed = new Typed("#element", options);

    return () => {
      typed.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    soundEngine.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHoloMouseMove = (e) => {
    if (!isInteracting) setIsInteracting(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isDragging) {
      const dx = clientX - dragOrigin.x;
      const dy = clientY - dragOrigin.y;
      setRot({
        x: Math.max(-35, Math.min(35, dragOrigin.rotX - dy * 0.35)),
        y: Math.max(-45, Math.min(45, dragOrigin.rotY + dx * 0.45)),
      });
    } else {
      const xPct = (clientX - rect.left) / rect.width - 0.5;
      const yPct = (clientY - rect.top) / rect.height - 0.5;
      setRot({
        x: -yPct * 24,
        y: xPct * 30,
      });
    }
  };

  const handleHoloMouseDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setIsInteracting(true);
    setDragOrigin({
      x: clientX,
      y: clientY,
      rotX: rot.x,
      rotY: rot.y,
    });
  };

  const handleHoloMouseUp = () => {
    setIsDragging(false);
    setIsInteracting(false);
    setRot({ x: 4, y: -10 });
  };

  const handleHoloMouseLeave = () => {
    setIsDragging(false);
    setIsInteracting(false);
    setRot({ x: 4, y: -10 });
  };

  return (
    <section
      className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-7xl items-center py-6 md:py-8"
      id="section1"
    >
      <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        {/* Left Column with System-Error Jiggle + Fade-Up Animations */}
        <motion.div
          variants={sysErrorContainer}
          custom={0.12}
          initial="hidden"
          animate={revealReady ? "visible" : "hidden"}
          className="flex w-full min-w-0 flex-col items-start"
        >
          <motion.div
            variants={sysErrorFadeUp}
            className="theme-badge font-tech-label inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span>OPERATIVE DOSSIER {"//"} FULL-STACK ENGINEER</span>
          </motion.div>

          {/* HIMANSHU / MANDOWRA -> Orbitron (700–900) */}
          <motion.h1
            variants={sysErrorFadeUp}
            className="mt-4 font-orbitron text-3xl font-black uppercase leading-[1.08] tracking-[0.04em] theme-text-primary sm:text-5xl lg:text-6xl"
          >
            HIMANSHU <span className="theme-accent-text">MANDOWRA</span>
          </motion.h1>

          {/* Code-style tagline -> JetBrains Mono (400–500) */}
          <motion.div
            variants={sysErrorFadeUp}
            className="theme-surface font-code-tagline mt-3.5 flex min-h-[40px] w-full max-w-xl items-center rounded-lg px-3.5 py-1.5 text-xs font-medium tracking-[0.06em] sm:text-sm"
          >
            <span className="mr-2 font-medium theme-accent-text">&gt;</span>
            <span id="element" className="truncate font-medium theme-text-primary" />
          </motion.div>

          {/* Description & body text -> Inter (400–500) */}
          <motion.p
            variants={sysErrorFadeUp}
            className="font-body-inter mt-4 max-w-2xl text-sm font-normal leading-relaxed theme-text-secondary sm:text-base"
          >
            Full-Stack Developer with{" "}
            <strong className="font-medium theme-text-primary">1.5+ years</strong>{" "}
            of professional experience building scalable web applications, secure
            REST APIs, and modern responsive user interfaces with React, Next.js,
            Node.js, NestJS, and SQL/NoSQL databases.
          </motion.p>

          {/* Stats & technical labels -> Rajdhani (600) */}
          <motion.div
            variants={sysErrorFadeUp}
            className="mt-5 grid w-full max-w-xl grid-cols-3 gap-3"
          >
            {[
              { value: "1.5+ Yrs", label: "Experience" },
              { value: "4+ Prod", label: "Live Systems" },
              { value: "30+ APIs", label: "Architected" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={sysErrorCard}
                custom={0.25 + idx * 0.08}
                className="theme-surface rounded-xl px-3.5 py-2.5 text-left"
              >
                <div className="font-tech-label text-xl font-semibold tracking-wide theme-accent-text sm:text-2xl">
                  {stat.value}
                </div>
                <div className="font-tech-label text-xs font-semibold uppercase tracking-[0.14em] theme-text-muted">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={sysErrorFadeUp}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="/Himanshu_Mandowra_Resume.pdf"
              download
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="re-requiem-btn group"
            >
              <span>Download CV</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              onMouseEnter={() => soundEngine.playHover()}
              className="re-requiem-btn group"
            >
              <span>View Projects</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              onMouseEnter={() => soundEngine.playHover()}
              className="re-requiem-btn group"
            >
              <span>Hire Me</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>

            <div className="flex items-center gap-2 pl-1">
              {[
                {
                  label: "GitHub",
                  icon: "bx bxl-github",
                  href: "https://github.com/Himanshu-Mandowra",
                },
                {
                  label: "LinkedIn",
                  icon: "bx bxl-linkedin",
                  href: "http://www.linkedin.com/in/himanshu-mandowra",
                },
                {
                  label: "X / Twitter",
                  icon: "bx bxl-twitter",
                  href: "https://x.com/Himshu_Mandowra",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="theme-surface inline-flex h-9 w-9 items-center justify-center rounded-lg text-lg transition hover:-translate-y-0.5"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Hologram Model with System-Error Jiggle Materialization */}
        <motion.div
          variants={sysErrorPop}
          custom={0.22}
          initial="hidden"
          animate={revealReady ? "visible" : "hidden"}
          className="mx-auto flex w-full max-w-[290px] flex-col items-center sm:max-w-[330px] md:max-w-[355px]"
        >
          <div
            onMouseMove={handleHoloMouseMove}
            onMouseDown={handleHoloMouseDown}
            onMouseUp={handleHoloMouseUp}
            onMouseLeave={handleHoloMouseLeave}
            onTouchStart={handleHoloMouseDown}
            onTouchMove={handleHoloMouseMove}
            onTouchEnd={handleHoloMouseUp}
            className={`holo-levitate relative w-full select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ perspective: "1100px" }}
          >
            <motion.div
              animate={{
                rotateX: rot.x,
                rotateY: rot.y,
              }}
              transition={
                isDragging
                  ? {
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                      mass: 0.4,
                    }
                  : isInteracting
                  ? {
                      type: "spring",
                      stiffness: 85,
                      damping: 20,
                      mass: 0.75,
                    }
                  : {
                      type: "spring",
                      stiffness: 32,
                      damping: 14,
                      mass: 1.35,
                      restDelta: 0.001,
                    }
              }
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              className={`relative w-full rounded-2xl border p-2.5 transition-colors duration-300 ${
                holoMode
                  ? isLight
                    ? "border-blue-400/55 bg-[#dce3ed]/95 shadow-[0_18px_45px_rgba(37,99,235,0.14)]"
                    : isBW
                    ? "border-white/50 bg-[#0d0d0d]/95 shadow-[0_0_40px_rgba(255,255,255,0.18)]"
                    : "border-cyan-400/45 bg-[#080f18]/92 shadow-[0_0_45px_rgba(6,182,212,0.22)]"
                  : "theme-surface"
              }`}
            >
              {holoMode && (
                <div
                  style={{ transform: "translateZ(-24px)" }}
                  className={`pointer-events-none absolute inset-3 flex items-center justify-center overflow-hidden rounded-xl border ${
                    isLight
                      ? "border-blue-300/50 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)]"
                      : isBW
                      ? "border-white/20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]"
                      : "border-cyan-500/25 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18),transparent_70%)]"
                  }`}
                >
                  <div
                    className={`h-48 w-48 animate-[spin_14s_linear_infinite] rounded-full border border-dashed ${
                      isLight
                        ? "border-blue-400/45"
                        : isBW
                        ? "border-white/30"
                        : "border-cyan-400/35"
                    }`}
                  />
                </div>
              )}

              <div
                style={{ transform: "translateZ(20px)" }}
                className="relative z-30 mb-1.5 flex items-center justify-between px-2 py-1 font-mono-tech text-[11px] uppercase tracking-[0.14em]"
              >
                <span
                  className={`flex items-center gap-1.5 font-semibold ${
                    holoMode
                      ? isLight
                        ? "text-blue-700"
                        : isBW
                        ? "text-white"
                        : "text-cyan-300"
                      : "theme-text-secondary"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      holoMode
                        ? isLight
                          ? "animate-ping bg-blue-600"
                          : isBW
                          ? "animate-ping bg-white"
                          : "animate-ping bg-cyan-400"
                        : isBW
                        ? "bg-white"
                        : "bg-emerald-500"
                    }`}
                  />
                  {holoMode ? "HOLO LINES // PIXEL" : "ORIGINAL PHOTO"}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    setHoloMode((prev) => !prev);
                  }}
                  className={`font-nav-btn rounded border px-2 py-0.5 text-[11px] font-bold transition ${
                    holoMode
                      ? isLight
                        ? "border-blue-400/60 bg-blue-500/15 text-blue-800 hover:bg-blue-600 hover:text-white"
                        : isBW
                        ? "border-white/60 bg-white/15 text-white hover:bg-white hover:text-black"
                        : "border-cyan-400/60 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-400 hover:text-black"
                      : "theme-badge"
                  }`}
                >
                  {holoMode ? "ORIGINAL PHASE" : "PIXEL HOLO"}
                </button>
              </div>

              <div
                style={{ transform: "translateZ(0px)" }}
                className={`relative aspect-[4/4.3] w-full overflow-hidden rounded-xl ${
                  isLight
                    ? "bg-[#cfd8e6]"
                    : isBW
                    ? "bg-[#080808]"
                    : "bg-[#060b11]"
                }`}
              >
                {/* Original Portrait Phase (Natural Dark Contrast, Never Washed Out) */}
                <img
                  src={profilePhoto}
                  alt="Himanshu Mandowra Portrait"
                  draggable={false}
                  className={`h-full w-full object-cover object-top transition duration-500 ${
                    holoMode
                      ? "holo-image-filter"
                      : isBW
                      ? "grayscale contrast-125"
                      : ""
                  }`}
                />

                {/* Holographic Line-by-Line + Pixel Matrix Overlay */}
                {holoMode && (
                  <>
                    <div className="holo-pixel-lines pointer-events-none absolute inset-0 z-20" />
                    <div
                      className={`animate-bio-scan pointer-events-none absolute inset-x-0 z-20 h-[2px] ${
                        isBW
                          ? "bg-white shadow-[0_0_14px_#ffffff]"
                          : isLight
                          ? "bg-blue-500 shadow-[0_0_14px_#3b82f6]"
                          : "bg-cyan-400 shadow-[0_0_16px_#22d3ee]"
                      }`}
                    />
                    <div
                      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t ${
                        isLight
                          ? "from-slate-900/45 via-slate-900/10 to-transparent"
                          : isBW
                          ? "from-black/75 via-transparent to-transparent"
                          : "from-black/75 via-cyan-950/15 to-transparent"
                      }`}
                    />
                  </>
                )}

                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                    isLight
                      ? "from-slate-900/60 via-transparent to-transparent"
                      : "from-black/80 via-transparent to-transparent"
                  }`}
                />
              </div>

              <div
                style={{ transform: "translateZ(36px)" }}
                className="pointer-events-none absolute inset-x-4 bottom-4 z-30 flex items-end justify-between rounded-lg border border-white/20 bg-slate-950/80 px-3 py-2 text-white shadow-xl backdrop-blur-md"
              >
                <div>
                  <div
                    className={`font-tech-label text-[10px] font-semibold uppercase tracking-widest ${
                      holoMode
                        ? isLight
                          ? "text-sky-300"
                          : isBW
                          ? "text-neutral-300"
                          : "text-cyan-300"
                        : "text-neutral-300"
                    }`}
                  >
                    {holoMode
                      ? `HOLOGRAPHIC TILT // X:${Math.round(rot.x)}° Y:${Math.round(rot.y)}°`
                      : "VERIFIED OPERATIVE"}
                  </div>
                  <div className="font-orbitron text-xs font-extrabold uppercase tracking-wider text-white sm:text-sm">
                    HIMANSHU MANDOWRA
                  </div>
                </div>
                <span
                  className={`font-tech-label rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    holoMode
                      ? isLight
                        ? "border border-sky-400/50 bg-sky-500/25 text-white"
                        : isBW
                        ? "border border-white/50 bg-white/15 text-white"
                        : "border border-cyan-400/50 bg-cyan-500/20 text-cyan-200"
                      : isBW
                      ? "border border-white/40 bg-white/10 text-white"
                      : "border border-emerald-400/40 bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {holoMode ? "PIXEL 3D" : "FINE"}
                </span>
              </div>
            </motion.div>

            {holoMode && (
              <div className="mx-auto mt-2 flex w-3/4 flex-col items-center">
                <div
                  className={`h-1.5 w-full rounded-full bg-gradient-to-r from-transparent to-transparent ${
                    isBW
                      ? "via-white shadow-[0_0_16px_#ffffff]"
                      : isLight
                      ? "via-blue-500 shadow-[0_0_14px_rgba(37,99,235,0.45)]"
                      : "via-cyan-400 shadow-[0_0_20px_#22d3ee]"
                  }`}
                />
                <span className="font-tech-label mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] theme-text-muted">
                  MOVE OR DRAG MOUSE TO ROTATE 3D HOLOGRAM
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
