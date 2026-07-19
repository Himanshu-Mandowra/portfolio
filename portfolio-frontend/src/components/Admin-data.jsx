import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProject, getProjects } from "../service/projects.api";
import { clearAdminSession, getAdminToken } from "../utils/adminSession";

const initialForm = {
  title: "",
  description: "",
  link: "",
  image: ""
};

function AdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (loadError) {
      setError("Could not load projects.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const token = getAdminToken();
      await createProject(form, token);
      setForm(initialForm);
      setMessage("Project added successfully.");
      await loadProjects();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message || "Project could not be added."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-white/10 bg-neutral-900/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
                Admin Panel
              </div>
              <h1 className="mt-4 font-['Arsenal_SC'] text-4xl leading-tight text-[#f6f1e8]">
                Add project
              </h1>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[#f6f1e8] transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/10"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
            <label className="text-sm text-stone-300" htmlFor="title">Title</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
              required
            />

            <label className="text-sm text-stone-300" htmlFor="description">Description</label>
            <textarea
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short project description"
              rows={4}
              required
            />

            <label className="text-sm text-stone-300" htmlFor="link">Project link</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="link"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://example.com"
              required
            />

            <label className="text-sm text-stone-300" htmlFor="image">Image URL</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://image-url.com/project.jpg"
              required
            />

            <button
              className="mt-2 inline-flex items-center justify-center rounded-2xl border border-amber-400 bg-amber-400 px-4 py-3 font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add project"}
            </button>
          </form>

          {message ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </div>
          ) : null}
          {error ? (
            <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <Link className="mt-5 inline-flex text-sm font-medium text-amber-400 transition hover:text-amber-300" to="/">
            View portfolio
          </Link>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-neutral-900/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
            Current Projects
          </div>
          <h2 className="mt-4 font-['Arsenal_SC'] text-3xl leading-tight text-[#f6f1e8]">
            Saved cards
          </h2>
          <div className="mt-5 grid gap-4">
            {projects.map((project) => (
              <article
                key={project._id || project.title}
                className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[110px_1fr] sm:items-center"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-44 w-full rounded-2xl object-cover sm:h-[84px] sm:w-[110px]"
                />
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-[#f6f1e8]">{project.title}</h3>
                  <p className="leading-7 text-stone-400">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
