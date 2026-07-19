import React from "react";

const services = [
  {
    title: "Frontend Development",
    description:
      "Responsive layouts, component-based UI, and polished interactions with React, CSS, and Tailwind."
  },
  {
    title: "Backend Integration",
    description:
      "REST APIs, authentication flows, dashboard actions, and project data handling with Node and Express."
  },
  {
    title: "Portfolio and Product UI",
    description:
      "Simple, branded personal sites and product pages that stay lightweight, structured, and maintainable."
  }
];

function Services() {
  return (
    <section className="mx-auto w-full max-w-6xl py-12 md:py-16" id="services">
      <div className="mb-7">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
          Services
        </div>
        <h2 className="mt-4 max-w-3xl font-['Arsenal_SC'] text-4xl leading-tight text-[#f6f1e8] md:text-5xl">
          Small, useful, and well-structured solutions for the web.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-3xl border border-white/10 bg-neutral-900/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          >
            <h3 className="mb-2 text-lg font-semibold text-[#f6f1e8]">{service.title}</h3>
            <p className="leading-7 text-stone-400">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
