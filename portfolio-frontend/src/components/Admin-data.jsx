import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../service/projects.api";
import { clearAdminSession, getAdminToken } from "../utils/adminSession";
import { UmbrellaOctagonSVG } from "./RequiemLoader";
import ImageCropModal from "./ImageCropModal";
import { soundEngine } from "../utils/soundEngine";

const initialForm = {
  title: "",
  description: "",
  link: "",
  codeLink: "",
  image: "",
  category: "FULL-STACK",
  clearance: "LEVEL 4",
  techStack: "React, Node.js, Tailwind CSS",
};

const CATEGORIES = [
  "FULL-STACK",
  "FRONTEND / 3D",
  "BACKEND / API",
  "BOT / AUTOMATION",
  "AI / SYSTEM",
];

const CLEARANCES = ["LEVEL 4", "LEVEL 5", "OMEGA", "CLASSIFIED"];

function AdminPage() {
  const navigate = useNavigate();
  const formTopRef = useRef(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Image Cropper State
  const [cropSource, setCropSource] = useState(null);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (loadError) {
      setError("Could not load case files from archive.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  // Handle local image file selection -> immediately open the interactive Image Cropper!
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCropSource(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleOpenCropperForCurrent = () => {
    if (!form.image) {
      setError("Upload an image file or enter an image URL first to crop.");
      return;
    }
    soundEngine.playClick();
    setCropSource(form.image);
  };

  const handleApplyCrop = (croppedDataUrl) => {
    setForm((current) => ({ ...current, image: croppedDataUrl }));
    setCropSource(null);
    setMessage(
      "OPTICAL CALIBRATION COMPLETE // Cropped image attached to dossier."
    );
  };

  const handleEditProject = (project) => {
    soundEngine.playClick();
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      link: project.link || "",
      codeLink: project.codeLink || "",
      image: project.image || "",
      category: project.category || "FULL-STACK",
      clearance: project.clearance || "LEVEL 4",
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : project.techStack || "React, Node.js, Tailwind CSS",
    });
    setMessage(`EDITING CASE FILE: "${project.title}"`);
    setError("");
    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    soundEngine.playClick();
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
    setError("");
  };

  const handleDeleteProject = async (project) => {
    soundEngine.playBiohazardAlert();
    const confirmed = window.confirm(
      `[UMBRELLA ARCHIVE WARNING]: Permanently purge case file "${project.title}"?`
    );
    if (!confirmed) return;

    setDeletingId(project._id);
    setError("");
    setMessage("");

    try {
      const token = getAdminToken();
      await deleteProject(project._id, token);
      if (editingId === project._id) {
        setEditingId(null);
        setForm(initialForm);
      }
      setMessage(`CASE FILE "${project.title}" PURGED FROM ARCHIVE.`);
      await loadProjects();
    } catch (delError) {
      setError(
        delError.response?.data?.message || "Could not delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    soundEngine.playClick();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const token = getAdminToken();
      if (editingId) {
        await updateProject(editingId, form, token);
        setMessage("CASE FILE UPDATED SUCCESSFULLY IN UMBRELLA ARCHIVE.");
        setEditingId(null);
      } else {
        await createProject(form, token);
        setMessage("NEW CASE FILE REGISTERED IN UMBRELLA ARCHIVE.");
      }
      setForm(initialForm);
      await loadProjects();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "Operation failed. Verify your session clearance."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    soundEngine.playClick();
    clearAdminSession();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-[#050508] px-4 py-8 text-[#ece7df] sm:px-6 lg:px-8">
      <div className="re-lattice-overlay pointer-events-none fixed inset-0 opacity-50" />

      {/* Top Admin Command Bar */}
      <div className="relative z-10 mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border border-red-800/50 bg-[#09090e]/95 px-6 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)]">
        <div className="flex items-center gap-3.5">
          <UmbrellaOctagonSVG className="h-10 w-10 shrink-0" spin />
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.24em] text-red-500">
              UMBRELLA CORP // HIVE MAINFRAME
            </div>
            <h1 className="font-requiem text-xl font-bold uppercase tracking-[0.1em] text-white sm:text-2xl">
              CLASSIFIED PROJECT ARCHIVE TERMINAL
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            onClick={() => soundEngine.playClick()}
            className="re-clip-btn border border-emerald-500/50 bg-emerald-950/30 px-4 py-2 font-mono-tech text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 transition hover:bg-emerald-500 hover:text-black"
          >
            ← RETURN TO PUBLIC PORTFOLIO
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="re-clip-btn border border-red-600/60 bg-red-950/40 px-4 py-2 font-mono-tech text-xs font-bold uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-600 hover:text-white"
          >
            TERMINATE SESSION [LOGOUT]
          </button>
        </div>
      </div>

      {/* Main Two-Column Grid */}
      <div
        ref={formTopRef}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]"
      >
        {/* Left Column: Create / Edit Case File Form */}
        <div className="re-clip-card border border-red-900/50 bg-[#09090e]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-red-500">
                {editingId ? "MODE // MODIFY EXISTING FILE" : "MODE // NEW ENTRY"}
              </span>
              <h2 className="mt-1 font-requiem text-2xl font-bold uppercase tracking-[0.08em] text-white">
                {editingId ? "EDIT CASE FILE" : "REGISTER CASE FILE"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="border border-amber-500/50 bg-amber-950/40 px-3 py-1.5 font-mono-tech text-xs uppercase tracking-wider text-amber-300 hover:bg-amber-500 hover:text-black"
              >
                CANCEL EDIT [NEW]
              </button>
            )}
          </div>

          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label
                className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                htmlFor="title"
              >
                CASE FILE TITLE *
              </label>
              <input
                className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-2.5 font-mono-tech text-sm text-white outline-none transition focus:border-red-500"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Wellness Service Platform"
                required
              />
            </div>

            {/* Category & Clearance Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                  htmlFor="category"
                >
                  SECTOR / CATEGORY
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1.5 w-full border border-white/15 bg-black/90 px-3.5 py-2.5 font-mono-tech text-xs uppercase tracking-wider text-white outline-none focus:border-red-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                  htmlFor="clearance"
                >
                  SECURITY CLEARANCE
                </label>
                <select
                  id="clearance"
                  name="clearance"
                  value={form.clearance}
                  onChange={handleChange}
                  className="mt-1.5 w-full border border-white/15 bg-black/90 px-3.5 py-2.5 font-mono-tech text-xs uppercase tracking-wider text-white outline-none focus:border-red-500"
                >
                  {CLEARANCES.map((clr) => (
                    <option key={clr} value={clr}>
                      {clr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label
                className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                htmlFor="techStack"
              >
                EQUIPPED TECH STACK (COMMA SEPARATED)
              </label>
              <input
                className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-2.5 font-mono-tech text-xs text-white outline-none transition focus:border-red-500"
                id="techStack"
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                placeholder="React, Next.js, Node.js, PostgreSQL, Tailwind CSS"
              />
            </div>

            {/* Links Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                  htmlFor="link"
                >
                  LIVE DEPLOYMENT URL *
                </label>
                <input
                  className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-2.5 font-mono-tech text-xs text-white outline-none transition focus:border-red-500"
                  id="link"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label
                  className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                  htmlFor="codeLink"
                >
                  SOURCE REPOSITORY URL
                </label>
                <input
                  className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-2.5 font-mono-tech text-xs text-white outline-none transition focus:border-red-500"
                  id="codeLink"
                  name="codeLink"
                  value={form.codeLink}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300"
                htmlFor="description"
              >
                MISSION BRIEFING / DESCRIPTION *
              </label>
              <textarea
                className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-2.5 text-sm text-white outline-none transition focus:border-red-500"
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed description of architecture, features, and impact..."
                rows={3}
                required
              />
            </div>

            {/* Project Image Upload + URL + Interactive Cropper */}
            <div className="border border-red-900/40 bg-black/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  className="font-mono-tech text-xs uppercase tracking-[0.18em] text-red-400"
                  htmlFor="image"
                >
                  EVIDENCE IMAGE (UPLOAD &amp; CROP OR PASTE URL) *
                </label>

                <div className="flex flex-wrap gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-red-500/60 bg-red-950/50 px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider text-red-200 transition hover:bg-red-600 hover:text-white"
                  >
                    + UPLOAD &amp; CROP FILE
                  </button>
                  {form.image && (
                    <button
                      type="button"
                      onClick={handleOpenCropperForCurrent}
                      className="border border-white/25 bg-white/10 px-3 py-1 font-mono-tech text-[11px] uppercase tracking-wider text-white transition hover:border-red-500"
                    >
                      ✂ RE-CROP IMAGE
                    </button>
                  )}
                </div>
              </div>

              <input
                className="mt-2.5 w-full border border-white/15 bg-black/90 px-3.5 py-2 font-mono-tech text-xs text-stone-200 outline-none focus:border-red-500"
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://image-url.com/project.jpg or upload a file above..."
                required
              />

              {/* Live Cropped Image Preview */}
              {form.image && (
                <div className="mt-3 overflow-hidden border border-white/15 bg-black">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-stone-400">
                    <span>OPTICAL PREVIEW</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({ ...current, image: "" }))
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      CLEAR
                    </button>
                  </div>
                  <div className="aspect-[16/10] max-h-48 w-full overflow-hidden">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="re-clip-btn mt-1 inline-flex items-center justify-center border border-red-500 bg-red-600 px-6 py-3.5 font-mono-tech text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "WRITING TO MAINFRAME..."
                : editingId
                ? "✓ SAVE CHANGES TO CASE FILE"
                : "+ COMMIT NEW CASE FILE TO ARCHIVE"}
            </button>
          </form>

          {message && (
            <div className="mt-4 border border-emerald-500/40 bg-emerald-950/30 px-4 py-3 font-mono-tech text-xs tracking-wider text-emerald-300">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 border border-red-500/50 bg-red-950/40 px-4 py-3 font-mono-tech text-xs tracking-wider text-red-300">
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Existing Case Files with Edit & Delete Controls */}
        <div className="re-clip-card border border-white/10 bg-[#09090e]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:p-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-red-500">
                ACTIVE DATABASE // {projects.length} FILES
              </span>
              <h2 className="mt-1 font-requiem text-2xl font-bold uppercase tracking-[0.08em] text-white">
                STORED CASE FILES
              </h2>
            </div>
          </div>

          <div className="mt-5 grid max-h-[760px] gap-4 overflow-y-auto pr-1">
            {projects.map((project, idx) => {
              const isBeingEdited = editingId === project._id;
              return (
                <article
                  key={project._id || project.title}
                  className={`border p-4 transition ${
                    isBeingEdited
                      ? "border-red-500 bg-red-950/20"
                      : "border-white/10 bg-black/60 hover:border-red-800/60"
                  }`}
                >
                  <div className="grid gap-4 sm:grid-cols-[130px_1fr]">
                    <div className="aspect-[16/10] w-full overflow-hidden border border-white/10 bg-black sm:h-[90px] sm:w-[130px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] uppercase tracking-widest">
                          <span className="text-red-400">
                            FILE #{String(idx + 1).padStart(2, "0")} {"//"}{" "}
                            {project.category || "FULL-STACK"}
                          </span>
                          <span className="border border-white/15 px-1.5 py-0.5 text-stone-400">
                            {project.clearance || "LEVEL 4"}
                          </span>
                        </div>

                        <h3 className="mt-1 font-requiem text-lg font-bold text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-stone-400">
                          {project.description}
                        </p>
                      </div>

                      {/* Edit & Delete Buttons */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-2.5">
                        <button
                          type="button"
                          onClick={() => handleEditProject(project)}
                          className="border border-amber-500/50 bg-amber-950/30 px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider text-amber-300 transition hover:bg-amber-500 hover:text-black"
                        >
                          ✎ EDIT FILE
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project)}
                          disabled={deletingId === project._id}
                          className="border border-red-600/50 bg-red-950/30 px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider text-red-300 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                        >
                          {deletingId === project._id
                            ? "PURGING..."
                            : "✕ DELETE FILE"}
                        </button>

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto font-mono-tech text-[11px] uppercase tracking-wider text-stone-400 hover:text-white"
                        >
                          OPEN ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {projects.length === 0 && (
              <div className="border border-white/10 bg-black/40 p-6 text-center font-mono-tech text-xs uppercase tracking-widest text-stone-500">
                NO CASE FILES STORED YET.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Image Cropper Modal */}
      {cropSource && (
        <ImageCropModal
          imageSrc={cropSource}
          onCancel={() => setCropSource(null)}
          onApplyCrop={handleApplyCrop}
        />
      )}
    </div>
  );
}

export default AdminPage;
