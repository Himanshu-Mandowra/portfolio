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
    tags: ["React 18", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Three.js"],
    description:
      "Responsive, component-driven web applications, SSR/SPA architectures, and interactive 3D/motion UI.",
  },
  {
    id: "slot-2",
    category: "BACKEND",
    code: "02",
    title: "Node.js, Express & NestJS",
    level: 92,
    tags: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT / OTP Auth", "WebSockets"],
    description:
      "Scalable server architectures, modular NestJS APIs, multi-factor authentication, and 30+ endpoint integrations.",
  },
  {
    id: "slot-3",
    category: "DATABASES",
    code: "03",
    title: "PostgreSQL, MongoDB & MySQL",
    level: 89,
    tags: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Mongoose", "Indexing"],
    description:
      "Relational and NoSQL schema modeling, Prisma ORM migrations, aggregation pipelines, and fast query tuning.",
  },
  {
    id: "slot-4",
    category: "DEVOPS & TOOLS",
    code: "04",
    title: "Git, Cloud, Swagger & UI",
    level: 88,
    tags: ["Git & GitHub", "Swagger / OpenAPI", "Cloudinary", "Postman", "Figma", "Vercel / AWS"],
    description:
      "Clean Git workflows, OpenAPI documentation, cloud media pipelines, and production deployments.",
  },
];

function About({ outbreakMode = false, theme = "dark" }) {
  const [selectedSlot, setSelectedSlot] = useState(SKILL_LOADOUT[0]);
  const isBW = theme === "bw";

  return (
    <section className="mx-auto w-full max-w-7xl py-10 md:py-12" id="about">
      {/* Animated Header with System-Error Jiggle + Fade-Up */}
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <span className="theme-badge inline-flex rounded-full px-3 py-1 font-mono-tech text-xs font-bold uppercase tracking-[0.18em]">
            02 {"//"} OPERATIVE DOSSIER &amp; SKILLS
          </span>
          <h2 className="mt-2 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-4xl">
            ABOUT &amp; <span className="theme-accent-text">TECH ARSENAL</span>
          </h2>
        </div>

        <div className="theme-surface flex items-center gap-3 rounded-xl px-4 py-2">
          <span className="font-mono-tech text-xs font-bold uppercase tracking-wider theme-text-muted">
            VITAL ECG:
          </span>
          <svg viewBox="0 0 140 28" className="h-6 w-28" fill="none">
            <path
              d="M 0,14 L 30,14 L 38,5 L 46,23 L 55,2 L 64,26 L 72,11 L 80,14 L 140,14"
              stroke={
                isBW ? "#ffffff" : outbreakMode ? "#ef4444" : "#10b981"
              }
              strokeWidth="2"
              className="animate-ecg"
            />
          </svg>
          <span
            className={`font-mono-tech text-xs font-bold uppercase ${
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

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left Bio Card */}
        <motion.article
          variants={sysErrorCard}
          custom={0.05}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="theme-surface flex flex-col justify-between rounded-2xl p-6"
        >
          <div>
            <h3 className="font-requiem text-xl font-bold uppercase tracking-wide theme-text-primary">
              Building Scalable Full-Stack Products
            </h3>
            <p className="mt-3 text-sm leading-relaxed theme-text-secondary sm:text-base">
              I&apos;m a Full-Stack Developer with{" "}
              <strong className="theme-text-primary">1.5+ years</strong> of
              hands-on experience building production web applications from
              responsive frontend interfaces to secure backend services.
            </p>
            <p className="mt-3 text-sm leading-relaxed theme-text-secondary sm:text-base">
              At <strong className="theme-text-primary">APS Matrix</strong>, I
              contributed to{" "}
              <strong className="theme-text-primary">4+ production projects</strong>,
              architecting REST APIs, multi-step authentication, and integrating{" "}
              <strong className="theme-text-primary">30+ API endpoints</strong>{" "}
              across PostgreSQL, MySQL, and MongoDB.
            </p>
          </div>

          <div
            className="mt-5 rounded-xl border p-4"
            style={{
              borderColor: "var(--border-strong)",
              backgroundColor: "var(--bg-input)",
            }}
          >
            <div className="flex items-center justify-between font-mono-tech text-xs font-bold uppercase tracking-wider">
              <span className="theme-accent-text">
                ACTIVE SLOT {"//"} {selectedSlot.category}
              </span>
              <span className="theme-text-primary">
                {selectedSlot.level}% PROFICIENCY
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed theme-text-secondary sm:text-sm">
              {selectedSlot.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedSlot.tags.map((tag) => (
                <span
                  key={tag}
                  className="theme-badge rounded-md px-2.5 py-0.5 font-mono-tech text-[11px] font-semibold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Right: 2x2 Staggered Skill Loadout Cards with System-Error Jiggle */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SKILL_LOADOUT.map((slot, idx) => {
            const isSelected = selectedSlot.id === slot.id;
            return (
              <motion.button
                key={slot.id}
                type="button"
                variants={sysErrorCard}
                custom={0.1 + idx * 0.09}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSlot(slot);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`theme-surface flex flex-col justify-between rounded-2xl p-5 text-left transition ${
                  isSelected ? "ring-2 ring-[var(--accent)]" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono-tech text-xs font-bold uppercase tracking-wider">
                    <span className="theme-accent-text">
                      {slot.code} {"//"} {slot.category}
                    </span>
                    <span className="theme-text-muted">{slot.level}%</span>
                  </div>
                  <h3 className="mt-2 font-requiem text-base font-bold theme-text-primary sm:text-lg">
                    {slot.title}
                  </h3>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {slot.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded border px-2 py-0.5 font-mono-tech text-[10px] theme-text-secondary"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Fill Mastery Bar */}
                <div
                  className="mt-4 h-1.5 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--border-color)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${slot.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.25 + idx * 0.1, ease: "easeOut" }}
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
