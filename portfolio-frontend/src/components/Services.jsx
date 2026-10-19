import React from "react";
import { motion } from "framer-motion";
import { soundEngine } from "../utils/soundEngine";
import { sysErrorCard, sysErrorFadeUp } from "../utils/motionVariants";

const services = [
  {
    code: "SYS-01",
    title: "Frontend & Interactive UI",
    tag: "REACT / NEXT.JS",
    description:
      "Fast, responsive, multi-device web applications built with React, Next.js, TypeScript, Tailwind CSS, and smooth Three.js visuals.",
    specs: ["Component Architecture", "Responsive Across All Devices", "Performance & SEO Ready"],
  },
  {
    code: "SYS-02",
    title: "Backend & API Systems",
    tag: "NODE / NESTJS",
    description:
      "Scalable RESTful APIs, authentication pipelines (JWT & OTP), and database modeling across PostgreSQL, MongoDB, and MySQL.",
    specs: ["30+ Production Endpoints", "Prisma ORM & Mongoose", "Swagger API Documentation"],
  },
  {
    code: "SYS-03",
    title: "Full-Stack & Custom Dashboards",
    tag: "END-TO-END",
    description:
      "Complete digital products from custom CMS/Admin panels with image cropping to e-commerce backends, booking platforms, and bots.",
    specs: ["Protected Admin Workflows", "Cloud Media Integration", "Clean, Maintainable Code"],
  },
];

function Services() {
  return (
    <section className="mx-auto w-full max-w-7xl py-10 md:py-12" id="services">
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <span className="theme-badge inline-flex rounded-full px-3 py-1 font-mono-tech text-xs font-bold uppercase tracking-[0.18em]">
            05 {"//"} SYSTEM CAPABILITIES
          </span>
          <h2 className="mt-2 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-4xl">
            WHAT I <span className="theme-accent-text">DELIVER</span>
          </h2>
        </div>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service, idx) => (
          <motion.article
            key={service.title}
            variants={sysErrorCard}
            custom={idx * 0.12}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            onMouseEnter={() => soundEngine.playHover()}
            className="theme-surface flex flex-col justify-between rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <div>
              <div
                className="flex items-center justify-between border-b pb-2.5 font-mono-tech text-xs font-bold uppercase tracking-wider"
                style={{ borderColor: "var(--border-color)" }}
              >
                <span className="theme-accent-text">{service.code}</span>
                <span className="theme-badge rounded px-2 py-0.5 text-[10px]">
                  {service.tag}
                </span>
              </div>

              <h3 className="mt-4 font-requiem text-lg font-bold uppercase theme-text-primary sm:text-xl">
                {service.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed theme-text-secondary">
                {service.description}
              </p>
            </div>

            <ul
              className="mt-5 space-y-1.5 border-t pt-3.5 font-mono-tech text-xs theme-text-secondary"
              style={{ borderColor: "var(--border-color)" }}
            >
              {service.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Services;
