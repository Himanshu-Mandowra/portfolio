import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { UmbrellaOctagonSVG } from "./RequiemLoader";
import { soundEngine } from "../utils/soundEngine";

const navItems = [
  { label: "Home", target: "section1" },
  { label: "About", target: "about" },
  { label: "Journey", target: "missions" },
  { label: "Projects", target: "projects" },
  { label: "Services", target: "services" },
  { label: "Contact", target: "contact" },
];

const THEME_MODES = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "bw", label: "B&W" },
];

function Navbar({
  theme = "dark",
  setTheme,
  outbreakMode = false,
  revealReady = true,
}) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section1");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const getScrollTop = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    lastScrollY.current = getScrollTop();

    const handleScroll = () => {
      const currentScrollY = getScrollTop();
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 48) {
        // At top of page -> always show Full Navbar
        setIsNavVisible(true);
      } else if (delta < -2) {
        // Scrolling UP anywhere on the page -> show Full Navbar at top of viewport
        setIsNavVisible(true);
      } else if (delta > 4 && currentScrollY > 65) {
        // Scrolling DOWN -> hide Navbar & send Umbrella logo to bottom-right Up Arrow
        setIsNavVisible(false);
        setIsOpen(false);
      }

      lastScrollY.current = currentScrollY;

      const scrollPosition = currentScrollY + 140;
      navItems.forEach((item) => {
        const section = document.getElementById(item.target);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(item.target);
          }
        }
      });
    };

    const handleWheel = (e) => {
      const currentScrollY = getScrollTop();
      if (currentScrollY <= 48) {
        setIsNavVisible(true);
        return;
      }
      if (e.deltaY < -2) {
        setIsNavVisible(true);
      } else if (e.deltaY > 4 && currentScrollY > 65) {
        setIsNavVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("wheel", handleWheel, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollToSection = (target) => {
    soundEngine.playClick();
    const section = document.getElementById(target);
    if (!section) return;

    const navbarHeight = 72;
    const offsetTop =
      section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior: "smooth",
    });

    setActiveSection(target);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("section1");
    setIsOpen(false);
  };

  const handleThemeChange = (mode) => {
    soundEngine.playClick();
    setTheme?.(mode);
  };

  return (
    <LayoutGroup>
      {/* Spacer so fixed navbar doesn't overlap hero section at top of page */}
      <div
        className={`w-full ${outbreakMode ? "h-24" : "h-16"}`}
        aria-hidden="true"
      />

      {/* Fixed Viewport Header: Always shows the Full Big Navbar at top & on scroll UP */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: !revealReady ? -50 : isNavVisible ? 0 : -120,
          opacity: !revealReady ? 0 : isNavVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.85,
        }}
        style={{
          pointerEvents: isNavVisible && revealReady ? "auto" : "none",
        }}
        className={`fixed inset-x-0 top-0 z-[8500] w-full px-3 pt-2.5 sm:px-6 ${
          outbreakMode ? "mt-8" : ""
        }`}
      >
        <nav
          className="theme-nav mx-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 backdrop-blur-xl transition-shadow duration-300 sm:px-5"
          aria-label="Main Navigation"
        >
          {/* Brand + Shared Layout Umbrella Emblem */}
          <button
            type="button"
            onClick={() => scrollToSection("section1")}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex shrink-0 items-center gap-2.5 border-0 bg-transparent p-0 text-left focus:outline-none"
            aria-label="Go to Home"
          >
            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
              {isNavVisible && (
                <motion.div
                  layoutId="umbrella-morph-emblem"
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  className="flex h-7 w-7 items-center justify-center"
                >
                  <UmbrellaOctagonSVG
                    className="h-7 w-7 shrink-0"
                    spin={false}
                  />
                </motion.div>
              )}
            </div>
            <span className="whitespace-nowrap font-orbitron text-base font-extrabold uppercase tracking-[0.14em] theme-text-primary sm:text-lg">
              HIMANSHU<span className="theme-accent-text">.DEV</span>
            </span>
          </button>

          {/* Desktop Nav Links -> Rajdhani (600–700) */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.target;
              return (
                <motion.button
                  key={item.target}
                  initial={{ opacity: 0, y: -14 }}
                  animate={
                    revealReady
                      ? {
                          opacity: [0, 0.85, 0.35, 1],
                          y: [-14, 2, -1, 0],
                          x: [0, -4, 4, -2, 0],
                          skewX: [0, -3, 3, 0],
                        }
                      : { opacity: 0, y: -14 }
                  }
                  transition={{ delay: 0.1 + idx * 0.06, duration: 0.48 }}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  onMouseEnter={() => soundEngine.playHover()}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-nav-btn whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm uppercase tracking-[0.12em] transition-all duration-150 ${
                    isActive
                      ? "theme-badge font-bold"
                      : "font-semibold theme-text-secondary opacity-85 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {/* Right Controls: Full 3-Mode Theme Switcher + Admin -> Rajdhani (600–700) */}
          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            <div
              className="flex items-center rounded-lg border p-0.5"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-input)",
              }}
              role="group"
              aria-label="Theme Mode Switcher"
            >
              {THEME_MODES.map((m) => {
                const active = theme === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleThemeChange(m.id)}
                    className={`font-nav-btn whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "theme-accent-bg shadow-sm"
                        : "font-semibold theme-text-muted hover:theme-text-primary"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            <Link
              to="/admin"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="theme-badge font-nav-btn whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition hover:opacity-90"
            >
              ☣ ADMIN
            </Link>
          </div>

          {/* Mobile / Tablet Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => {
                const next =
                  theme === "dark"
                    ? "light"
                    : theme === "light"
                    ? "bw"
                    : "dark";
                handleThemeChange(next);
              }}
              className="theme-badge rounded-lg px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-wider md:hidden"
              title="Switch Theme (Dark / Light / B&W)"
            >
              {theme.toUpperCase()}
            </button>

            <button
              type="button"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={() => {
                soundEngine.playClick();
                setIsOpen((v) => !v);
              }}
              className="flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-[4px] rounded-full border"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-input)",
              }}
            >
              <span
                className="block h-[1.5px] w-4 transition-all duration-300"
                style={{
                  backgroundColor: "var(--text-primary)",
                  transform: isOpen
                    ? "translateY(5.5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block h-[1.5px] w-4 transition-all duration-300"
                style={{
                  backgroundColor: "var(--accent)",
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-[1.5px] w-4 transition-all duration-300"
                style={{
                  backgroundColor: "var(--text-primary)",
                  transform: isOpen
                    ? "translateY(-5.5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Responsive Mobile & Tablet Drawer */}
        <div
          className={`mx-auto max-w-7xl overflow-hidden transition-all duration-250 lg:hidden ${
            isOpen ? "mt-2 max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="theme-nav rounded-xl p-4 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.target;
                return (
                  <button
                    key={item.target}
                    type="button"
                    onClick={() => scrollToSection(item.target)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left font-mono-tech text-xs font-semibold uppercase tracking-[0.12em] ${
                      isActive ? "theme-badge" : "theme-text-secondary"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span>●</span>}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono-tech text-[11px] uppercase theme-text-muted">
                  THEME:
                </span>
                {THEME_MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleThemeChange(m.id)}
                    className={`rounded-md px-2.5 py-1 font-mono-tech text-xs font-bold uppercase ${
                      theme === m.id
                        ? "theme-accent-bg"
                        : "border theme-text-secondary"
                    }`}
                    style={{
                      borderColor:
                        theme === m.id ? "transparent" : "var(--border-color)",
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <Link
                to="/admin"
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                }}
                className="theme-badge rounded-lg px-3.5 py-1.5 font-mono-tech text-xs font-bold uppercase tracking-wider"
              >
                ☣ ADMIN PANEL
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Floating Umbrella Logo -> Up Arrow Button (Bottom-Right, Left of AI COMMS) when Navbar hides */}
      <AnimatePresence>
        {!isNavVisible && (
          <motion.button
            key="umbrella-scroll-top-btn"
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => soundEngine.playHover()}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            aria-label="Scroll to top"
            title="Return to Top"
            className="theme-surface group fixed bottom-5 right-[152px] z-[9000] flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-md transition-colors sm:right-[162px]"
            style={{
              borderColor: "var(--border-strong)",
            }}
          >
            {/* Shared Layout Umbrella Logo that flies from Navbar and morphs into Up Arrow */}
            <motion.div
              layoutId="umbrella-morph-emblem"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              className="relative flex h-9 w-9 items-center justify-center"
            >
              {/* Umbrella Octagon Outer Frame */}
              <motion.div
                initial={{ rotate: 0, opacity: 1 }}
                animate={{ rotate: 180, opacity: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90 group-hover:opacity-60"
              >
                <UmbrellaOctagonSVG className="h-8 w-8" spin={false} />
              </motion.div>

              {/* Morphing Up Arrow Core */}
              <motion.div
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  delay: 0.12,
                  type: "spring",
                  stiffness: 320,
                  damping: 20,
                }}
                className="theme-accent-bg relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default Navbar;
