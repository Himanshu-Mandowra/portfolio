import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProjects } from "../service/projects.api";
import { soundEngine } from "../utils/soundEngine";
import { sysErrorCard, sysErrorFadeUp } from "../utils/motionVariants";

const fallbackProjects = [
  {
    _id: "0f2e7997-c978-468d-a6a7-85350d421d6f",
    title: "Discord Tool Bot",
    description:
      "A customizable Discord ticket system with private support channels, role-based staff management, configurable ticket panels, and automatic ticket transcripts.",
    link: "https://gentle-bot.vercel.app/",
    codeLink: "https://github.com/Himanshu-Mandowra",
    image:
      "https://res.cloudinary.com/dh7qnzsbb/image/upload/v1784472569/0a8d60af-c579-4676-b9a9-508f307202a0.png",
    category: "BOT / AUTOMATION",
    clearance: "LEVEL 5",
    techStack: ["Node.js", "Discord.js", "React", "MongoDB", "Express"],
  },
  {
    _id: "seed-project-2",
    title: "Wellness Service Platform",
    description:
      "Full-stack booking and tele-consultation platform featuring real-time scheduling, role-based access control, secure authentication, and automated notifications.",
    link: "https://github.com/Himanshu-Mandowra",
    codeLink: "https://github.com/Himanshu-Mandowra",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    category: "FULL-STACK",
    clearance: "OMEGA",
    techStack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
  },
  {
    _id: "seed-project-3",
    title: "E-Commerce & Inventory Core",
    description:
      "High-throughput REST API and storefront architecture supporting multi-vendor inventory tracking, JWT security, payment webhooks, and analytics dashboards.",
    link: "https://github.com/Himanshu-Mandowra",
    codeLink: "https://github.com/Himanshu-Mandowra",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    category: "BACKEND / API",
    clearance: "LEVEL 4",
    techStack: ["Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"],
  },
  {
    _id: "seed-project-1",
    title: "Requiem Tactical Portfolio",
    description:
      "A gaming-inspired developer portfolio with interactive Three.js visuals, 3-mode theme switching, Umbrella security transitions, and a protected CRUD admin terminal with live image cropping.",
    link: "https://github.com/Himanshu-Mandowra",
    codeLink: "https://github.com/Himanshu-Mandowra",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    category: "FRONTEND / 3D",
    clearance: "CLASSIFIED",
    techStack: ["React", "Three.js", "Tailwind CSS", "Express", "JWT"],
  },
];

function Project({ theme = "dark" }) {
  const isLight = theme === "light";
  const isBW = theme === "bw";
  const [projects, setProjects] = useState(fallbackProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const previewCardRef = useRef(null);
  const mobileCardRef = useRef(null);

  const [inspectedProject, setInspectedProject] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [animStage, setAnimStage] = useState("idle");

  const [rot, setRot] = useState({ x: 8, y: -14 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [freeHoverMode, setFreeHoverMode] = useState(true);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setCurrentIndex(0);
        }
      } catch (loadError) {
        // Fallback projects already loaded
      }
    };

    loadProjects();
  }, []);

  const total = projects.length;
  const activeProject = projects[currentIndex] || projects[0];

  // Auto-slide every 4s unless paused or examining in 3D
  useEffect(() => {
    if (isPaused || inspectedProject || total <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, inspectedProject, total]);

  useEffect(() => {
    if (!inspectedProject) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseExamine();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectedProject]);

  const handlePrev = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleSelectSlide = (idx) => {
    soundEngine.playClick();
    setCurrentIndex(idx);
  };

  const handleMobileTouchStart = (e) => {
    setIsPaused(true);
    setTouchStartX(e.touches?.[0]?.clientX ?? null);
  };

  const handleMobileTouchEnd = (e) => {
    if (touchStartX !== null && e.changedTouches?.[0]) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 36) {
        soundEngine.playClick();
        if (diff > 0) {
          setCurrentIndex((prev) => (prev + 1) % total);
        } else {
          setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
        }
      }
    }
    setTouchStartX(null);
    setTimeout(() => setIsPaused(false), 1800);
  };

  const handleOpenExamine = (project, sourceEl) => {
    soundEngine.playSaveRoomChord();
    const targetEl =
      sourceEl || previewCardRef.current || mobileCardRef.current;
    const rect = targetEl?.getBoundingClientRect?.() || {
      top: window.innerHeight / 2 - 150,
      left: window.innerWidth / 2 - 240,
      width: 480,
      height: 300,
    };

    setOriginRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setRot({ x: 6, y: -12 });
    setZoom(1);
    setFreeHoverMode(true);
    setInspectedProject(project);
    setAnimStage("from-origin");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimStage("centered");
      });
    });
  };

  const handleCloseExamine = () => {
    soundEngine.playClick();
    const refEl = previewCardRef.current || mobileCardRef.current;
    if (refEl) {
      const latestRect = refEl.getBoundingClientRect();
      if (latestRect.width > 0) {
        setOriginRect({
          top: latestRect.top,
          left: latestRect.left,
          width: latestRect.width,
          height: latestRect.height,
        });
      }
    }
    setAnimStage("closing");
    setTimeout(() => {
      setInspectedProject(null);
      setAnimStage("idle");
    }, 440);
  };

  const handleStageMouseDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setFreeHoverMode(false);
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      rotX: rot.x,
      rotY: rot.y,
    };
  };

  const handleStageMouseMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isDragging) {
      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = clientY - dragStartRef.current.y;
      setRot({
        x: Math.max(-65, Math.min(65, dragStartRef.current.rotX - deltaY * 0.45)),
        y: dragStartRef.current.rotY + deltaX * 0.55,
      });
    } else if (freeHoverMode) {
      const xPct = clientX / window.innerWidth - 0.5;
      const yPct = clientY / window.innerHeight - 0.5;
      setRot({
        x: -yPct * 38,
        y: xPct * 48,
      });
    }
  };

  const handleStageMouseUp = () => {
    setIsDragging(false);
  };

  const handleStageWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((z) => Math.max(0.7, Math.min(1.65, Number((z + delta).toFixed(2)))));
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -yPct * 7, y: xPct * 7 });
  };

  const techList = Array.isArray(activeProject?.techStack)
    ? activeProject.techStack
    : ["React", "Node.js", "Tailwind CSS"];

  const getExaminePositionStyle = () => {
    const targetWidth = Math.min(window.innerWidth * 0.88, 720);
    const targetHeight = Math.min(window.innerHeight * 0.64, 430);
    const centerTop = (window.innerHeight - targetHeight) / 2 - 20;
    const centerLeft = (window.innerWidth - targetWidth) / 2;

    if ((animStage === "from-origin" || animStage === "closing") && originRect) {
      return {
        position: "fixed",
        top: `${originRect.top}px`,
        left: `${originRect.left}px`,
        width: `${originRect.width}px`,
        height: `${originRect.height}px`,
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition:
          animStage === "closing"
            ? "all 0.42s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
      };
    }

    return {
      position: "fixed",
      top: `${Math.max(56, centerTop)}px`,
      left: `${centerLeft}px`,
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      transform: `perspective(1300px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${zoom})`,
      transition: isDragging
        ? "none"
        : "top 0.52s cubic-bezier(0.22, 1, 0.36, 1), left 0.52s cubic-bezier(0.22, 1, 0.36, 1), width 0.52s cubic-bezier(0.22, 1, 0.36, 1), height 0.52s cubic-bezier(0.22, 1, 0.36, 1), transform 0.12s ease-out",
    };
  };

  return (
    <section
      className="mx-auto w-full max-w-5xl py-6 md:py-8"
      id="projects"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Header + Slideshow Controls */}
      <motion.div
        variants={sysErrorFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-4 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <span className="theme-badge inline-flex rounded-full px-3 py-1 font-mono-tech text-xs font-bold uppercase tracking-[0.18em]">
            04 {"//"} ARCHIVAL CASE FILES
          </span>
          <h2 className="mt-1.5 font-requiem text-2xl font-bold uppercase tracking-[0.06em] theme-text-primary sm:text-3xl">
            PROJECT <span className="theme-accent-text">SPOTLIGHT</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={() => soundEngine.playHover()}
            className="re-requiem-btn-ghost group px-3.5 py-1.5 text-xs"
            aria-label="Previous project"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            <span>Prev</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={() => soundEngine.playHover()}
            className="re-requiem-btn group px-3.5 py-1.5 text-xs"
            aria-label="Next project"
          >
            <span>Next</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </motion.div>

      {/* ====================================================================
          MOBILE VIEW (< lg): Image-Only Slide with Content Inside Faded/Blurred Side
          ==================================================================== */}
      {activeProject && (
        <div
          className="lg:hidden"
          onTouchStart={handleMobileTouchStart}
          onTouchEnd={handleMobileTouchEnd}
        >
          <div
            ref={mobileCardRef}
            className="theme-surface relative mx-auto aspect-[4/4.6] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl sm:aspect-[16/11]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject._id || activeProject.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                {/* Full-Bleed Slide Image */}
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  draggable={false}
                  className={`h-full w-full object-cover ${
                    isBW ? "grayscale contrast-110" : ""
                  }`}
                />

                {/* Top Floating Index & 3D Examine Trigger */}
                <div className="absolute inset-x-3 top-3 z-20 flex items-center justify-between gap-2">
                  <span className="rounded-md border border-white/25 bg-black/75 px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    0{currentIndex + 1} {"//"} {activeProject.category || "PROJECT"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenExamine(activeProject, mobileCardRef.current)
                    }
                    className="rounded-md border border-white/35 bg-black/75 px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
                  >
                    ⌖ 3D INSPECT
                  </button>
                </div>

                {/* Blurred + Faded Content-Side Image Overlay (Bottom 66% of Image) */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[68%] bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-[6px]"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to top, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)",
                  }}
                />

                {/* Content Inside the Image on the Blurred/Faded Side */}
                <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-requiem text-lg font-bold uppercase tracking-wide text-white drop-shadow">
                      {activeProject.title}
                    </h3>
                    <span className="rounded border border-white/25 bg-white/10 px-2 py-0.5 font-mono-tech text-[9px] font-bold uppercase text-neutral-200">
                      {activeProject.clearance || "VERIFIED"}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-200/95">
                    {activeProject.description}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {techList.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/20 bg-white/10 px-2 py-0.5 font-mono-tech text-[10px] font-semibold uppercase text-white backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/15 pt-2.5">
                    <div className="flex items-center gap-2">
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundEngine.playClick()}
                        className="rounded border border-white/30 bg-white/15 px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/25"
                      >
                        Live ↗
                      </a>
                      {activeProject.codeLink && (
                        <a
                          href={activeProject.codeLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => soundEngine.playClick()}
                          className="rounded border border-white/25 bg-black/50 px-3 py-1 font-mono-tech text-[11px] font-bold uppercase tracking-wider text-neutral-200 backdrop-blur-md"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>

                    {/* Slide Dots Inside Image */}
                    <div className="flex items-center gap-1.5">
                      {projects.map((p, idx) => (
                        <button
                          key={p._id || idx}
                          type="button"
                          onClick={() => handleSelectSlide(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentIndex
                              ? "w-5 bg-white"
                              : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ====================================================================
          DESKTOP VIEW (lg+): Compact Spotlight Stage with Stacked Deck + Dossier
          ==================================================================== */}
      {activeProject && (
        <motion.div
          variants={sysErrorCard}
          custom={0.08}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="theme-surface hidden overflow-hidden rounded-2xl lg:block"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
            {/* Left Side: Compact Stacked Photographic Print Deck */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              className={`re-lattice-overlay relative flex flex-col justify-between overflow-hidden border-b p-4 sm:p-5 lg:border-b-0 lg:border-r ${
                isLight
                  ? "border-slate-300/75 bg-[#d6dee9]/80"
                  : isBW
                  ? "border-white/20 bg-[#0d0d0d]/95"
                  : "border-white/10 bg-[#0b0d11]/90"
              }`}
            >
              {/* Top-Right Typewriter Index Bar: IMAGES 1 - (2) - 3 - 4 */}
              <div className="relative z-40 mb-3 flex items-center justify-end gap-1 font-mono-tech text-xs tracking-[0.16em] theme-text-primary">
                <span className="mr-1.5 uppercase opacity-80">IMAGES</span>
                {projects.map((proj, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <React.Fragment key={proj._id || idx}>
                      <button
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        onMouseEnter={() => soundEngine.playHover()}
                        aria-label={`Select project ${idx + 1}`}
                        className={`relative inline-flex h-6 w-6 items-center justify-center font-mono-tech text-xs font-bold transition-colors ${
                          isActive
                            ? "theme-text-primary"
                            : "theme-text-muted hover:theme-text-primary"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="requiem-image-index-ring"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 24,
                            }}
                            className="pointer-events-none absolute inset-0 rounded-full border"
                            style={{
                              borderColor: "var(--accent)",
                            }}
                          />
                        )}
                        <span className="relative z-10">{idx + 1}</span>
                      </button>
                      {idx < projects.length - 1 && (
                        <span className="select-none theme-text-muted">-</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Smaller 3D Stacked Photographic Prints Container */}
              <div className="relative mx-auto my-auto aspect-[16/9] w-full max-w-[82%]">
                {projects.map((proj, idx) => {
                  const depth = (idx - currentIndex + total) % total;
                  const isFront = depth === 0;
                  const isSecond = depth === 1;
                  const isThird = depth === 2;
                  const isVisible = depth <= 2;

                  const stackX = isFront
                    ? 0
                    : isSecond
                    ? 14
                    : isThird
                    ? 26
                    : 36;
                  const stackY = isFront
                    ? 0
                    : isSecond
                    ? -11
                    : isThird
                    ? -20
                    : -28;
                  const stackRotate = isFront
                    ? 0
                    : isSecond
                    ? 1.25
                    : isThird
                    ? 2.2
                    : 3.0;
                  const stackScale = isFront
                    ? 1
                    : isSecond
                    ? 0.985
                    : isThird
                    ? 0.97
                    : 0.95;

                  return (
                    <motion.div
                      key={proj._id || proj.title}
                      ref={isFront ? previewCardRef : null}
                      onClick={(e) => {
                        if (isFront) {
                          handleOpenExamine(proj, e.currentTarget);
                        } else {
                          handleSelectSlide(idx);
                        }
                      }}
                      animate={{
                        x: stackX,
                        y: stackY,
                        rotateZ: stackRotate,
                        scale: stackScale,
                        opacity: !isVisible
                          ? 0
                          : isFront && inspectedProject
                          ? 0.15
                          : 1,
                        rotateX: isFront ? tilt.x : 0,
                        rotateY: isFront ? tilt.y : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 185,
                        damping: 24,
                        mass: 0.9,
                      }}
                      style={{
                        zIndex: isFront ? 30 : isSecond ? 20 : isThird ? 10 : 1,
                        pointerEvents: isVisible ? "auto" : "none",
                        transformPerspective: 1100,
                      }}
                      title={
                        isFront
                          ? "Click to lift & examine in 3D"
                          : `Click to switch to ${proj.title}`
                      }
                      className={`group absolute inset-0 cursor-pointer overflow-hidden transition-[filter,border-color] duration-500 ${
                        isLight
                          ? isFront
                            ? "border-[2.5px] border-slate-400/90 bg-slate-200 shadow-[0_14px_35px_rgba(15,23,42,0.16)] brightness-100"
                            : isSecond
                            ? "border-[2px] border-slate-400/70 bg-slate-300 shadow-[0_10px_24px_rgba(15,23,42,0.12)] brightness-[0.82] hover:brightness-95"
                            : "border-[2px] border-slate-400/50 bg-slate-300 shadow-[0_6px_16px_rgba(15,23,42,0.1)] brightness-[0.68] hover:brightness-85"
                          : isFront
                          ? "border-[2.5px] border-[#b7bec6] bg-[#14171d] shadow-[0_20px_50px_rgba(0,0,0,0.85)] brightness-100"
                          : isSecond
                          ? "border-[2px] border-[#8b939c] bg-[#14171d] shadow-[0_14px_35px_rgba(0,0,0,0.7)] brightness-[0.58] hover:brightness-[0.78]"
                          : "border-[2px] border-[#666e76] bg-[#14171d] shadow-[0_10px_25px_rgba(0,0,0,0.6)] brightness-[0.38] hover:brightness-[0.6]"
                      }`}
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        draggable={false}
                        className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] ${
                          isBW ? "grayscale contrast-110" : ""
                        }`}
                      />

                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                          isLight
                            ? "from-slate-900/65 via-transparent to-transparent"
                            : "from-black/75 via-transparent to-black/20"
                        }`}
                      />

                      {isFront && (
                        <>
                          <div className="absolute left-2.5 right-2.5 top-2.5 flex items-center justify-between gap-2">
                            <span
                              className={`border px-2 py-0.5 font-mono-tech text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                                isLight
                                  ? "border-slate-300/80 bg-[#dfe6f0]/90 text-slate-900 shadow-sm"
                                  : "border-white/25 bg-black/80 text-[#ece9e2]"
                              }`}
                            >
                              {proj.category || "FULL-STACK"}
                            </span>
                            <span
                              className={`border px-2.5 py-0.5 font-mono-tech text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition ${
                                isLight
                                  ? "border-slate-300/85 bg-[#dfe6f0]/90 text-slate-900 shadow-sm group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                                  : isBW
                                  ? "border-white/50 bg-black/85 text-white group-hover:bg-white group-hover:text-black"
                                  : "border-white/40 bg-black/80 text-[#ece9e2] group-hover:border-red-500 group-hover:bg-red-600"
                              }`}
                            >
                              ⌖ CLICK TO EXAMINE IN 3D
                            </span>
                          </div>

                          <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between font-mono-tech text-[9px] uppercase tracking-[0.16em] text-white drop-shadow">
                            <span>ARCHIVE PRINT #{idx + 1}</span>
                            <span>STACK DECK {"//"} {total} FILES</span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Compact Active Project Spotlight Dossier */}
            <div className="flex flex-col justify-between p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject._id || activeProject.title}
                  initial={{ opacity: 0, y: 14, x: 10, skewX: -2 }}
                  animate={{
                    opacity: [0, 0.85, 0.45, 1],
                    y: [14, -2, 1, 0],
                    x: [10, -2, 1, 0],
                    skewX: [-2, 2, -1, 0],
                  }}
                  exit={{ opacity: 0, y: -10, x: -10 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between font-mono-tech text-xs font-bold uppercase tracking-widest">
                    <span className="theme-accent-text">
                      CASE FILE #{String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="theme-badge rounded px-2 py-0.5 text-[10px]">
                      {activeProject.clearance || "VERIFIED"}
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-requiem text-xl font-bold uppercase tracking-wide theme-text-primary sm:text-2xl">
                    {activeProject.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed theme-text-secondary sm:text-sm">
                    {activeProject.description}
                  </p>

                  <div className="mt-3.5">
                    <div className="font-mono-tech text-[10px] font-bold uppercase tracking-wider theme-text-muted">
                      TECH STACK &amp; ARCHITECTURE:
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {techList.map((tech) => (
                        <span
                          key={tech}
                          className="theme-badge rounded-md px-2 py-0.5 font-mono-tech text-[11px] font-semibold uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Compact Unified Action Buttons */}
              <div
                className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3.5"
                style={{ borderColor: "var(--border-color)" }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleOpenExamine(activeProject, previewCardRef.current)
                  }
                  onMouseEnter={() => soundEngine.playHover()}
                  className="re-requiem-btn group px-3.5 py-2 text-xs"
                >
                  <span>Examine 3D</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>

                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="re-requiem-btn group px-3.5 py-2 text-xs"
                >
                  <span>Live Demo</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>

                {activeProject.codeLink && (
                  <a
                    href={activeProject.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundEngine.playClick()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="re-requiem-btn group px-3.5 py-2 text-xs"
                  >
                    <span>GitHub</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Smooth Origin-to-Center 3D Mouse Examination Stage */}
      {inspectedProject && (
        <div
          onMouseMove={handleStageMouseMove}
          onMouseDown={handleStageMouseDown}
          onMouseUp={handleStageMouseUp}
          onTouchStart={handleStageMouseDown}
          onTouchMove={handleStageMouseMove}
          onTouchEnd={handleStageMouseUp}
          onWheel={handleStageWheel}
          className={`fixed inset-0 z-[9600] select-none transition-colors duration-500 ${
            animStage === "centered"
              ? "bg-black/85 backdrop-blur-md"
              : "bg-black/0 backdrop-blur-none"
          } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <div
            className={`fixed inset-x-0 top-0 z-[9620] flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-black/80 px-6 py-3 text-white transition-opacity duration-300 ${
              animStage === "centered" ? "opacity-100" : "opacity-0"
            }`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="inline-block h-2.5 w-2.5 animate-ping rounded-full bg-red-500" />
              <span className="font-mono-tech text-xs font-bold uppercase tracking-[0.2em]">
                3D EVIDENCE EXAMINER {"//"} {inspectedProject.title}
              </span>
            </div>

            <div className="hidden font-mono-tech text-xs uppercase tracking-widest text-neutral-300 md:block">
              [MOVE OR DRAG MOUSE TO ROTATE IN 3D] • [SCROLL WHEEL TO ZOOM]
            </div>

            <button
              type="button"
              onClick={handleCloseExamine}
              className="rounded-lg border border-red-500 bg-red-600 px-4 py-1.5 font-mono-tech text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-500"
            >
              RETURN FILE [ESC]
            </button>
          </div>

          <div
            style={{
              ...getExaminePositionStyle(),
              transformStyle: "preserve-3d",
            }}
          >
            {/* FRONT FACE */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-red-500/80 bg-[#0b0e14] shadow-[0_35px_100px_rgba(0,0,0,0.9)]"
            >
              <img
                src={inspectedProject.image}
                alt={inspectedProject.title}
                draggable={false}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <span className="rounded bg-red-600 px-2.5 py-0.5 font-mono-tech text-[10px] font-bold uppercase tracking-widest">
                    {inspectedProject.category || "FULL-STACK"}
                  </span>
                  <h3 className="mt-1.5 font-requiem text-xl font-bold uppercase tracking-wider sm:text-3xl">
                    {inspectedProject.title}
                  </h3>
                </div>
                <div className="font-mono-tech text-xs text-neutral-300">
                  X: {Math.round(rot.x)}° | Y: {Math.round(rot.y)}° |{" "}
                  {Math.round(zoom * 100)}%
                </div>
              </div>
            </div>

            {/* BACK FACE */}
            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 flex flex-col justify-between rounded-2xl border-2 border-red-500/80 bg-[#111622] p-6 text-white shadow-[0_35px_100px_rgba(0,0,0,0.9)] sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-3 font-mono-tech text-xs uppercase tracking-widest text-red-400">
                  <span>CLASSIFIED BLUEPRINT {"//"} BACKSIDE OF DOSSIER</span>
                  <span>CLEARANCE: {inspectedProject.clearance || "OMEGA"}</span>
                </div>
                <h3 className="mt-4 font-requiem text-2xl font-bold uppercase">
                  {inspectedProject.title} — Architecture Notes
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {inspectedProject.description}
                </p>

                <div className="mt-5">
                  <div className="font-mono-tech text-xs uppercase tracking-wider text-slate-400">
                    VERIFIED MODULES &amp; STACK:
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Array.isArray(inspectedProject.techStack)
                      ? inspectedProject.techStack
                      : ["React", "Node.js", "Tailwind CSS"]
                    ).map((t) => (
                      <span
                        key={t}
                        className="rounded border border-red-500/50 bg-red-950/40 px-3 py-1 font-mono-tech text-xs font-bold uppercase text-red-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/15 pt-4 font-mono-tech text-xs text-slate-400">
                <span>UMBRELLA TECHNICAL VERIFICATION: PASSED</span>
                <span>FLIP 180° TO RETURN TO FRONT</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive 3D Controls Dock */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`fixed inset-x-0 bottom-5 z-[9620] mx-auto flex w-fit max-w-[95vw] flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/85 px-4 py-2.5 text-white shadow-2xl backdrop-blur-md transition-opacity duration-300 ${
              animStage === "centered" ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setFreeHoverMode((v) => !v)}
              className={`rounded-lg px-3 py-1.5 font-mono-tech text-xs font-bold uppercase ${
                freeHoverMode
                  ? "bg-red-600 text-white"
                  : "border border-white/20 bg-white/10 text-neutral-200"
              }`}
            >
              {freeHoverMode ? "MOUSE FOLLOW: ON" : "DRAG ORBIT MODE"}
            </button>

            <button
              type="button"
              onClick={() => {
                setFreeHoverMode(false);
                setRot((r) => ({ x: 0, y: r.y + 180 }));
              }}
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 font-mono-tech text-xs font-bold uppercase hover:bg-white/20"
            >
              ↻ FLIP 180° (READ BACK)
            </button>

            <button
              type="button"
              onClick={() =>
                setZoom((z) => (z >= 1.3 ? 1 : Number((z + 0.2).toFixed(2))))
              }
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 font-mono-tech text-xs font-bold uppercase hover:bg-white/20"
            >
              🔍 ZOOM ({Math.round(zoom * 100)}%)
            </button>

            <button
              type="button"
              onClick={() => {
                setRot({ x: 0, y: 0 });
                setZoom(1);
                setFreeHoverMode(false);
              }}
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 font-mono-tech text-xs font-bold uppercase hover:bg-white/20"
            >
              RESET 3D
            </button>

            <a
              href={inspectedProject.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-emerald-600 px-3.5 py-1.5 font-mono-tech text-xs font-bold uppercase text-white hover:bg-emerald-500"
            >
              OPEN LIVE ↗
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Project;
