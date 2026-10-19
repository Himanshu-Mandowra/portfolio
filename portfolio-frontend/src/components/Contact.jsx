import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "../utils/soundEngine";
import { sysErrorCard, sysErrorFadeUp } from "../utils/motionVariants";

const socialLinks = [
  {
    label: "GitHub Repository",
    code: "GH",
    href: "https://github.com/Himanshu-Mandowra",
  },
  {
    label: "LinkedIn Profile",
    code: "IN",
    href: "http://www.linkedin.com/in/himanshu-mandowra",
  },
  {
    label: "X (Twitter)",
    code: "TW",
    href: "https://x.com/Himshu_Mandowra",
  },
];

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "himanshu.mandowra1234@gmail.com";

  const handleCopyEmail = () => {
    soundEngine.playClick();
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="mx-auto w-full max-w-7xl py-10 md:py-12" id="contact">
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-6"
      >
        <span className="theme-badge inline-flex rounded-full px-3 py-1 font-mono-tech text-xs font-bold uppercase tracking-[0.18em]">
          06 {"//"} DIRECT COMMUNICATION
        </span>
        <h2 className="mt-2 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-4xl">
          LET&apos;S <span className="theme-accent-text">CONNECT</span>
        </h2>
      </motion.div>

      <motion.div
        variants={sysErrorCard}
        custom={0.08}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="theme-surface grid gap-6 rounded-2xl p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div>
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold uppercase tracking-wider text-emerald-500">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            <span>AVAILABLE FOR FULL-STACK ROLES &amp; FREELANCE PROJECTS</span>
          </div>

          <h3 className="mt-2.5 font-requiem text-xl font-bold uppercase theme-text-primary sm:text-2xl">
            Ready to build clean, scalable, and memorable web applications.
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed theme-text-secondary sm:text-base">
            Have a full-stack role, frontend upgrade, or backend API integration
            in mind? Reach out directly via email or social channels.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${email}`}
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="re-requiem-btn group"
            >
              <span>Send Email</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              onMouseEnter={() => soundEngine.playHover()}
              className="re-requiem-btn group"
            >
              <span>{copied ? "✓ Email Copied!" : email}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>

        <div className="grid content-center gap-2.5">
          {socialLinks.map((item, idx) => (
            <motion.a
              key={item.label}
              variants={sysErrorCard}
              custom={0.14 + idx * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="theme-surface flex items-center justify-between rounded-xl px-4 py-3 font-mono-tech text-xs font-bold uppercase tracking-wider transition hover:-translate-y-0.5"
            >
              <span>{item.label}</span>
              <span className="theme-accent-text">[{item.code} ↗]</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      <footer
        className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-5 font-mono-tech text-xs uppercase tracking-wider theme-text-muted sm:flex-row"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>© {new Date().getFullYear()} HIMANSHU MANDOWRA</div>
        <div>
          REQUIEM EDITION {"//"} DARK • LIGHT • B&amp;W MODES
        </div>
      </footer>
    </section>
  );
}

export default Contact;
