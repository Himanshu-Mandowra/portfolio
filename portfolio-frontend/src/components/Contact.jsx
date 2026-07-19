import React from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Himanshu-Mandowra"
  },
  {
    label: "LinkedIn",
    href: "http://www.linkedin.com/in/himanshu-mandowra"
  },
  {
    label: "Twitter",
    href: "https://x.com/Gentle_Himanshu"
  }
];

function Contact() {
  return (
    <section className="mx-auto w-full max-w-6xl py-12 md:py-16" id="contact">
      <div className="mb-7">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
          Contact
        </div>
        <h2 className="mt-4 max-w-3xl font-['Arsenal_SC'] text-4xl leading-tight text-[#f6f1e8] md:text-5xl">
          Let&apos;s build something clean, useful, and memorable.
        </h2>
      </div>

      <div className="grid gap-6 rounded-[28px] border border-white/10 bg-neutral-900/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-[#f6f1e8]">
            Open to freelance work, collaborations, and product builds.
          </h3>
          <p className="leading-7 text-stone-400">
            If you want a modern site, a frontend refresh, or a simple backend
            integration, I can help turn it into a polished result.
          </p>
          <a
            className="mt-5 inline-flex w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[#f6f1e8] transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/10"
            href="mailto:himanshu.mandowra1234@gmail.com"
          >
            himanshu.mandowra1234@gmail.com
          </a>
        </div>

        <div className="grid content-start gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[#f6f1e8] transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/10"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
