import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { soundEngine } from "../utils/soundEngine";
import GamingLaptop3D from "./GamingLaptop3D";

const quickSocials = [
  {
    name: "GitHub",
    href: "https://github.com/Himanshu-Mandowra",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "http://www.linkedin.com/in/himanshu-mandowra",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    href: "https://x.com/Himshu_Mandowra",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function Contact({ theme = "dark" }) {
  const [copied, setCopied] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [openProgress, setOpenProgress] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState(
    "DELL WORKSTATION CLOSED // SCROLL TO OPEN"
  );
  const runwayRef = useRef(null);
  const maxProgressRef = useRef(0);
  const email = "himanshu.mandowra1234@gmail.com";
  const isBW = theme === "bw";
  const isLight = theme === "light";

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track scroll while the Contact section is pinned in the center of the screen
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  // One-way (monotonic) progress so the laptop opens JUST ONCE and stays open
  const lockedProgress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (rawV) => {
    if (rawV > maxProgressRef.current) {
      maxProgressRef.current = rawV >= 0.88 ? 1 : rawV;
      lockedProgress.set(maxProgressRef.current);
    }
  });

  const smoothProgress = useSpring(lockedProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.55,
  });

  // Update 3D laptop lid openProgress (0 = 100% closed with DELL top cover in view, 1 = fully open)
  useMotionValueEvent(smoothProgress, "change", (v) => {
    const mappedOpen = Math.max(0, Math.min(1, (v - 0.1) / 0.46));
    setOpenProgress(mappedOpen);

    if (v < 0.1) {
      setPhaseLabel("DELL WORKSTATION CLOSED // SCROLL DOWN TO OPEN");
    } else if (v < 0.56) {
      const pct = Math.min(100, Math.max(1, Math.round(mappedOpen * 100)));
      setPhaseLabel(`OPENING 3D DELL LAPTOP... ${pct}%`);
    } else if (v < 0.86) {
      setPhaseLabel("DOCKING WORKSTATION LEFT // REVEALING UPLINK");
    } else {
      setPhaseLabel("CLICK & DRAG LAPTOP IN 3D // CLICK SCREEN ICONS");
    }
  });

  // Phase 2 (0.54 -> 0.86): After opening in the center, push the 3D laptop further to the left
  const laptopX = useTransform(
    smoothProgress,
    [0, 0.54, 0.86],
    isDesktop ? ["46%", "46%", "-14%"] : ["0%", "0%", "0%"]
  );

  // Right-side "Let's Connect" content reveals as the open laptop moves left
  const contentOpacity = useTransform(
    smoothProgress,
    [0.56, 0.86],
    [0, 1]
  );
  const contentX = useTransform(
    smoothProgress,
    [0.56, 0.86],
    [48, 0]
  );
  const contentScale = useTransform(
    smoothProgress,
    [0.56, 0.86],
    [0.95, 1]
  );
  const contentPointerEvents = useTransform(smoothProgress, (v) =>
    v >= 0.58 ? "auto" : "none"
  );

  const handleCopyEmail = () => {
    soundEngine.playClick();
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={runwayRef}
      className="relative mx-auto h-[280vh] w-full max-w-7xl"
      id="contact"
    >
      {/* Pinned Viewport Container: Fixes the section in the center of the screen while scrolling */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center py-2">
        {/* Ambient Backlight Glow */}
        <div
          className={`pointer-events-none absolute left-1/4 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] ${
            isBW
              ? "bg-white/10"
              : isLight
              ? "bg-blue-400/20"
              : "bg-red-500/15"
          }`}
        />

        {/* Compact Header Close to the Laptop & Content (Borderless) */}
        <div className="mb-0 flex flex-wrap items-end justify-between gap-2">
          <div>
            <span className="theme-badge inline-flex rounded-full px-3 py-0.5 font-mono-tech text-[11px] font-bold uppercase tracking-[0.2em]">
              06 {"//"} DIRECT COMMUNICATION
            </span>
            <h2 className="mt-1 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-3xl">
              LET&apos;S <span className="theme-accent-text">CONNECT</span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-2 py-0.5 font-mono-tech text-[10px] font-bold uppercase tracking-widest theme-text-secondary">
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span>{phaseLabel}</span>
          </div>
        </div>

        {/* Borderless Wide Stage: Laptop Pushed Further Left + Generous Right Content Space */}
        <div className="relative -mt-1 w-full">
          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
            {/* ==============================================================
                LARGE 3D GAMING LAPTOP (.GLB) WITH DELL LOGO ON CLOSED TOP COVER
                Starts 100% Closed in Center -> Opens Once on Scroll -> Glides Far Left
                ============================================================== */}
            <motion.div
              style={{
                x: laptopX,
              }}
              className="relative z-20 mx-auto w-full select-none"
            >
              <GamingLaptop3D openProgress={openProgress} theme={theme} />

              <div className="pointer-events-none -mt-2 text-center font-mono-tech text-[10px] font-semibold uppercase tracking-[0.18em] theme-text-muted">
                [CLICK &amp; DRAG LAPTOP TO ROTATE IN 3D • AUTO-RESETS IN 1S]
              </div>
            </motion.div>

            {/* ==============================================================
                RIGHT COLUMN: ELEVATED "LET'S CONNECT" CONTENT
                ============================================================== */}
            <motion.div
              style={{
                opacity: contentOpacity,
                x: contentX,
                scale: contentScale,
                pointerEvents: contentPointerEvents,
              }}
              className="relative z-10 flex flex-col justify-center"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider text-emerald-500">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                <span>AVAILABLE FOR FULL-STACK &amp; FREELANCE</span>
              </div>

              <h3 className="mt-2 font-requiem text-xl font-extrabold uppercase leading-tight theme-text-primary sm:text-3xl">
                Let&apos;s build{" "}
                <span className="theme-accent-text">scalable</span>, fast &amp;
                memorable web products.
              </h3>

              <p className="mt-2 text-xs leading-relaxed theme-text-secondary sm:text-sm">
                Tap any of the glowing social icons scattered inside the 3D Dell
                laptop screen on the left, or reach out directly via email and
                quick links below.
              </p>

              {/* Primary Email Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${email}`}
                  onClick={() => soundEngine.playClick()}
                  className="re-requiem-btn group px-4 py-2 text-xs"
                >
                  <span>Send Email</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="re-requiem-btn group px-4 py-2 text-xs"
                >
                  <span>{copied ? "✓ Email Copied!" : email}</span>
                </button>
              </div>

              {/* Sleek Social Icon Pills */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {quickSocials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="theme-badge inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider transition hover:-translate-y-0.5"
                  >
                    {soc.icon}
                    <span>{soc.name}</span>
                    <span className="opacity-70">↗</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <footer className="mt-2 flex flex-col items-center justify-between gap-2 pt-1 font-mono-tech text-[11px] uppercase tracking-wider theme-text-muted sm:flex-row">
          <div>© {new Date().getFullYear()} HIMANSHU MANDOWRA</div>
          <div>
            REQUIEM EDITION {"//"} DARK • LIGHT • B&amp;W MODES
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
