import React from "react";

function About() {
  return (
    <section className="mx-auto w-full max-w-6xl py-12 md:py-16" id="about">
      <div className="mb-7">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
          About
        </div>
        <h2 className="mt-4 max-w-3xl font-['Arsenal_SC'] text-4xl leading-tight text-[#f6f1e8] md:text-5xl">
          Focused on shipping clean products with thoughtful details.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-neutral-900/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <h3 className="mb-2 text-lg font-semibold text-[#f6f1e8]">About me</h3>
          <p className="leading-7 text-stone-400">
            I am a web developer who enjoys turning ideas into smooth digital
            products. My work combines UI clarity, practical engineering, and a
            steady focus on maintainable code.
          </p>
          <p className="mt-4 leading-7 text-stone-400">
            I work mostly with JavaScript, React, Node.js, Express, and modern
            frontend styling. I care about interfaces that feel fast, readable,
            and easy to trust.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-neutral-900/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <h3 className="mb-2 text-lg font-semibold text-[#f6f1e8]">Experience snapshot</h3>
          <p className="leading-7 text-stone-400">
            At Central Electronics Limited, I contributed to a live project by
            designing the interface, building frontend and backend features, and
            supporting database work for a smoother product experience.
          </p>
          <p className="mt-4 leading-7 text-stone-400">
            That hands-on experience strengthened my full-stack workflow and
            taught me how to keep real project delivery simple and structured.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
