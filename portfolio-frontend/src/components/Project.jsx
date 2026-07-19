import React, { useEffect, useState } from "react";
import { getProjects } from "../service/projects.api";

const fallbackProjects = [
  {
    _id: "fallback-1",
    title: "Portfolio Platform",
    description:
      "A personal portfolio with focused branding, project management, and a protected admin flow.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
  }
];

function Project() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      } catch (loadError) {
        setError("Projects API is not available right now.");
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl py-12 md:py-16" id="projects">
      <div className="mb-7">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
          Projects
        </div>
        <h2 className="mt-4 max-w-3xl font-['Arsenal_SC'] text-4xl leading-tight text-[#f6f1e8] md:text-5xl">
          Selected work with clear goals, strong UI, and usable delivery.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project._id || project.title}
            className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-[#f6f1e8]">{project.title}</h3>
              <p className="leading-7 text-stone-400">{project.description}</p>
              <a
                className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[#f6f1e8] transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/10"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                Open project
              </a>
            </div>
          </article>
        ))}
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      ) : null}
    </section>
  );
}

export default Project;
