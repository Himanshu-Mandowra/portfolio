import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { soundEngine } from "../utils/soundEngine";
import { sysErrorFadeUp } from "../utils/motionVariants";

const services = [
  {
    code: "SYS-01",
    role: "UI / FRONTEND ARCHITECT",
    title: "Frontend & Interactive UI",
    tag: "REACT / NEXT.JS",
    description:
      "Fast, responsive web apps built with React, Next.js, TypeScript, Tailwind CSS, and smooth Three.js visuals.",
    specs: ["Component Systems", "Multi-Device UI", "SEO & Speed"],
  },
  {
    code: "SYS-02",
    role: "API & SYSTEMS ENGINEER",
    title: "Backend & API Systems",
    tag: "NODE / NESTJS",
    description:
      "Scalable REST APIs, JWT & OTP security pipelines, and database modeling across PostgreSQL, MongoDB & MySQL.",
    specs: ["30+ Live APIs", "Prisma & Mongoose", "Swagger Docs"],
  },
  {
    code: "SYS-03",
    role: "PRODUCT & SAAS BUILDER",
    title: "Full-Stack & Dashboards",
    tag: "END-TO-END",
    description:
      "Complete digital products from custom Admin panels with media tools to booking platforms and Discord bots.",
    specs: ["Admin Workflows", "Cloud Media", "Clean Code"],
  },
];

function VisitingServiceCard({ service, idx, isOpened }) {
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [runId, setRunId] = useState(0);

  const fullTitle = service.title;
  const fullDesc = service.description;
  const specsJoined = service.specs.join(" • ");
  const totalChars = fullTitle.length + fullDesc.length + specsJoined.length;

  // Trigger initial typing when cards spread open
  useEffect(() => {
    if (isOpened) {
      const startDelay = setTimeout(() => {
        setRunId((r) => r + 1);
      }, 320 + idx * 140);
      return () => clearTimeout(startDelay);
    }
    return undefined;
  }, [isOpened, idx]);

  // Typewriter character loop whenever runId increments
  useEffect(() => {
    if (runId === 0) return undefined;
    setCharCount(0);
    setIsTyping(true);

    const step = 3;
    const interval = setInterval(() => {
      setCharCount((prev) => {
        if (prev + step >= totalChars) {
          clearInterval(interval);
          setIsTyping(false);
          return totalChars;
        }
        return prev + step;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [runId, totalChars]);

  const handleCardEnter = () => {
    soundEngine.playHover();
    setRunId((r) => r + 1);
  };

  const typedTitle =
    runId === 0
      ? fullTitle
      : fullTitle.slice(0, Math.min(fullTitle.length, charCount));
  const descStart = fullTitle.length;
  const typedDesc =
    runId === 0
      ? fullDesc
      : charCount > descStart
      ? fullDesc.slice(0, Math.min(fullDesc.length, charCount - descStart))
      : "";
  const specsStart = fullTitle.length + fullDesc.length;
  const typedSpecs =
    runId === 0
      ? specsJoined
      : charCount > specsStart
      ? specsJoined.slice(
          0,
          Math.min(specsJoined.length, charCount - specsStart)
        )
      : "";

  // Stack position before spreading open
  const closedX = idx === 0 ? "96%" : idx === 2 ? "-96%" : "0%";
  const closedRotate = idx === 0 ? -7 : idx === 2 ? 7 : 0;
  const closedY = idx === 1 ? 0 : 10;
  const closedScale = idx === 1 ? 0.97 : 0.92;

  return (
    <motion.article
      initial={false}
      animate={
        isOpened
          ? {
              x: "0%",
              y: 0,
              rotateZ: 0,
              scale: 1,
              opacity: 1,
            }
          : {
              x: closedX,
              y: closedY,
              rotateZ: closedRotate,
              scale: closedScale,
              opacity: 0.92,
            }
      }
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: isOpened ? 0.12 + idx * 0.07 : 0,
      }}
      style={{
        zIndex: isOpened ? 10 + idx : idx === 1 ? 30 : 20 - idx,
      }}
      onMouseEnter={handleCardEnter}
      onClick={handleCardEnter}
      className="theme-surface group relative flex min-h-[156px] cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-4 transition-shadow duration-300 hover:ring-2 hover:ring-[var(--accent)]"
    >
      {/* Top Visiting Card Metallic Accent Strip */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-85 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: "var(--accent)" }}
      />

      {/* Visiting Card Header: Chip + Role + Tag */}
      <div>
        <div
          className="flex items-center justify-between gap-2 border-b pb-2 font-mono-tech text-[10px] font-bold uppercase tracking-wider"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-2">
            {/* Visiting Card Smart Chip Icon */}
            <span
              className="inline-flex h-4 w-5 items-center justify-center rounded-[3px] border text-[8px] font-extrabold"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              {service.code.replace("SYS-", "")}
            </span>
            <span className="theme-text-muted">{service.role}</span>
          </div>

          <span className="theme-badge rounded px-1.5 py-0.5 text-[9px]">
            {service.tag}
          </span>
        </div>

        {/* Typed Title */}
        <h3 className="mt-2.5 font-requiem text-sm font-bold uppercase tracking-wide theme-text-primary sm:text-base">
          {typedTitle}
          {isTyping && charCount <= fullTitle.length && (
            <span className="ml-0.5 inline-block animate-pulse theme-accent-text">
              ▋
            </span>
          )}
        </h3>

        {/* Typed Visiting-Card Description */}
        <p className="mt-1 min-h-[34px] text-xs leading-relaxed theme-text-secondary">
          {typedDesc}
          {isTyping &&
            charCount > fullTitle.length &&
            charCount <= specsStart && (
              <span className="ml-0.5 inline-block animate-pulse theme-accent-text">
                ▋
              </span>
            )}
        </p>
      </div>

      {/* Bottom Visiting Card Footer: Typed Specs + Card Holder Stamp */}
      <div
        className="mt-2.5 flex items-center justify-between gap-2 border-t pt-2 font-mono-tech text-[10px]"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="truncate font-semibold theme-accent-text">
          {typedSpecs}
          {isTyping && charCount > specsStart && (
            <span className="ml-0.5 inline-block animate-pulse theme-accent-text">
              ▋
            </span>
          )}
        </div>
        <span className="shrink-0 font-bold uppercase tracking-widest theme-text-muted">
          HM {"//"} {service.code}
        </span>
      </div>
    </motion.article>
  );
}

function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.35 });
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsOpened(true), 180);
      return () => clearTimeout(timer);
    } else {
      setIsOpened(false);
    }
    return undefined;
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-5xl py-6 md:py-8"
      id="services"
    >
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-4 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <span className="theme-badge inline-flex rounded-full px-3 py-1 font-mono-tech text-xs font-bold uppercase tracking-[0.18em]">
            05 {"//"} SYSTEM CAPABILITIES
          </span>
          <h2 className="mt-1.5 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-3xl">
            WHAT I <span className="theme-accent-text">DELIVER</span>
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setIsOpened(false);
            setTimeout(() => setIsOpened(true), 380);
          }}
          className="theme-badge rounded-lg px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-wider transition hover:opacity-90"
        >
          {isOpened ? "⇄ Replay Stack & Type" : "Opening Stack..."}
        </button>
      </motion.div>

      <div className="relative grid gap-3.5 md:grid-cols-3">
        {services.map((service, idx) => (
          <VisitingServiceCard
            key={service.code}
            service={service}
            idx={idx}
            isOpened={isOpened}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;
