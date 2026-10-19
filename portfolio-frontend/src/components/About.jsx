import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "../utils/soundEngine";
import { sysErrorCard, sysErrorFadeUp } from "../utils/motionVariants";

const SKILL_LOADOUT = [
  {
    id: "slot-1",
    category: "FRONTEND",
    code: "01",
    title: "React, Next.js & TypeScript",
    level: 94,
    tags: ["React 18", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    description:
      "Component-driven SPAs, SSR architectures, and interactive 3D/motion interfaces.",
  },
  {
    id: "slot-2",
    category: "BACKEND",
    code: "02",
    title: "Node.js, Express & NestJS",
    level: 92,
    tags: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT / OTP"],
    description:
      "Modular server architectures, secure authentication, and 30+ API integrations.",
  },
  {
    id: "slot-3",
    category: "DATABASES",
    code: "03",
    title: "PostgreSQL, MongoDB & MySQL",
    level: 89,
    tags: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Mongoose"],
    description:
      "Relational and NoSQL schema design, Prisma migrations, and fast query tuning.",
  },
  {
    id: "slot-4",
    category: "DEVOPS & TOOLS",
    code: "04",
    title: "Git, Cloud, Swagger & UI",
    level: 88,
    tags: ["Git & GitHub", "Swagger", "Cloudinary", "Postman", "Vercel / AWS"],
    description:
      "Clean Git workflows, OpenAPI docs, cloud media pipelines, and deployments.",
  },
];

function About({ outbreakMode = false, theme = "dark" }) {
  const [selectedSlot, setSelectedSlot] = useState(SKILL_LOADOUT[0]);
  const isBW = theme === "bw";

  return (
    <section className="mx-auto w-full max-w-6xl py-6 md:py-8" id="about">
      {/* Compact Header */}
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-4 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <span className="theme-badge inline-flex rounded-full px-3 py-0.5 font-mono-tech text-[11px] font-semibold uppercase tracking-[0.18em]">
            02 {"//"} OPERATIVE DOSSIER
          </span>
          <h2 className="mt-1.5 font-requiem text-xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-3xl">
            ABOUT &amp; <span className="theme-accent-text">TECH ARSENAL</span>
          </h2>
        </div>

        <div className="theme-surface flex items-center gap-2.5 rounded-xl px-3 py-1.5">
          <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider theme-text-muted">
            STATUS:
          </span>
          <svg viewBox="0 0 120 24" className="h-4 w-20" fill="none">
            <path
              d="M 0,12 L 24,12 L 32,4 L 40,20 L 48,2 L 56,22 L 64,9 L 72,12 L 120,12"
              stroke={isBW ? "#ffffff" : outbreakMode ? "#ef4444" : "#10b981"}
              strokeWidth="2"
              className="animate-ecg"
            />
          </svg>
          <span
            className={`font-mono-tech text-[11px] font-bold uppercase ${
              isBW
                ? "text-white"
                : outbreakMode
                ? "text-red-500"
                : "text-emerald-500"
            }`}
          >
            {outbreakMode ? "ALERT" : "FINE"}
          </span>
        </div>
      </motion.div>

      <div className="grid gap-3.5 lg:grid-cols-[0.88fr_1.12fr]">
        {/* Compact Left Bio Card */}
        <motion.article
          variants={sysErrorCard}
          custom={0.05}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="theme-surface flex flex-col justify-between rounded-xl p-4 sm:p-5"
        >
          <div>
            <h3 className="font-requiem text-base font-bold uppercase tracking-wide theme-text-primary sm:text-lg">
              Scalable Full-Stack Engineering
            </h3>
            <p className="mt-2 text-xs leading-relaxed theme-text-secondary sm:text-sm">
              Full-Stack Developer with{" "}
              <strong className="theme-text-primary">1.5+ years</strong> of
              experience. At{" "}
              <strong className="theme-text-primary">APS Matrix</strong>, I
              shipped{" "}
              <strong className="theme-text-primary">4+ production apps</strong>{" "}
              and{" "}
              <strong className="theme-text-primary">30+ API endpoints</strong>{" "}
              across PostgreSQL, MySQL, and MongoDB.
            </p>
          </div>

          <div
            className="mt-3.5 rounded-lg border p-3"
            style={{
              borderColor: "var(--border-strong)",
              backgroundColor: "var(--bg-input)",
            }}
          >
            <div className="flex items-center justify-between font-mono-tech text-[11px] font-semibold uppercase tracking-wider">
              <span className="theme-accent-text">
                {selectedSlot.category}
              </span>
              <span className="theme-text-primary">
                {selectedSlot.level}%
              </span>
            </div>
            <p className="mt-1 text-xs leading-snug theme-text-secondary">
              {selectedSlot.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedSlot.tags.map((tag) => (
                <span
                  key={tag}
                  className="theme-badge rounded px-2 py-0.5 font-mono-tech text-[10px] font-semibold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Compact Right 2x2 Skill Loadout Cards */}
        <div className="grid grid-cols-2 gap-3">
          {SKILL_LOADOUT.map((slot, idx) => {
            const isSelected = selectedSlot.id === slot.id;
            return (
              <motion.button
                key={slot.id}
                type="button"
                variants={sysErrorCard}
                custom={0.1 + idx * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSlot(slot);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`theme-surface flex flex-col justify-between rounded-xl p-3.5 text-left transition ${
                  isSelected ? "ring-2 ring-[var(--accent)]" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono-tech text-[11px] font-semibold uppercase tracking-wider">
                    <span className="theme-accent-text">
                      {slot.code} {"//"} {slot.category}
                    </span>
                    <span className="theme-text-muted">{slot.level}%</span>
                  </div>
                  <h3 className="mt-1 font-requiem text-xs font-bold theme-text-primary sm:text-sm">
                    {slot.title}
                  </h3>
                  <div className="mt-2 hidden flex-wrap gap-1 sm:flex">
                    {slot.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded border px-1.5 py-0.5 font-mono-tech text-[10px] theme-text-secondary"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Fill Mastery Bar */}
                <div
                  className="mt-2.5 h-1 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--border-color)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${slot.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + idx * 0.08,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
