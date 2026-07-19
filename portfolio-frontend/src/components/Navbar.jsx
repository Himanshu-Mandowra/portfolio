import React, { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", target: "section1" },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" },
];

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("nav-fonts")) return;
    const link = document.createElement("link");
    link.id = "nav-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

function Navbar() {
  useGoogleFonts();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section1");
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  const itemRefs = useRef({});
  const railRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const scrollPosition = window.scrollY + 120;

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
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = itemRefs.current[activeSection];
      const rail = railRef.current;
      if (el && rail) {
        const railBox = rail.getBoundingClientRect();
        const elBox = el.getBoundingClientRect();
        setIndicator({
          left: elBox.left - railBox.left,
          width: elBox.width,
          ready: true,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSection, isOpen]);

  const scrollToSection = (target) => {
    const section = document.getElementById(target);

    if (!section) return;

    const navbar = document.querySelector("header");
    const navbarHeight = navbar ? navbar.offsetHeight : 90;

    const offsetTop =
      section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    setActiveSection(target);
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 px-4 pt-2 transition-all duration-300 sm:px-6 lg:px-8 ${
        isScrolled ? "pt-2" : ""
      }`}
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <nav
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b transition-all duration-300"
        style={{
          background: isScrolled
            ? "rgba(33,26,20,0.92)"
            : "rgba(33,26,20,0.72)",
          borderColor: "rgba(243,234,217,0.1)",
          backdropFilter: "blur(14px)",
          paddingTop: isScrolled ? "0.7rem" : "1rem",
          paddingBottom: isScrolled ? "0.7rem" : "1rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
        }}
        aria-label="Main Navigation"
      >
        {/* punch-hole ticket notches */}
        <span
          className="pointer-events-none absolute -left-[7px] top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full sm:block"
          style={{ background: "#0f0c09" }}
        />
        <span
          className="pointer-events-none absolute -right-[7px] top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full sm:block"
          style={{ background: "#0f0c09" }}
        />

        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection("section1")}
          className="group flex items-baseline gap-2 rounded-md border-0 bg-transparent px-1 focus-visible:outline-none focus-visible:ring-2"
          style={{ color: "#f3ead9" }}
          aria-label="Go to Home"
        >
          <span
            className="text-[1.7rem] font-semibold tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", color: "#f3ead9" }}
          >
            Port<span style={{ color: "#c9a227" }}>folio</span>
          </span>
        </button>

        {/* Desktop nav rail with sliding ticket indicator */}
        <div
          ref={railRef}
          className="relative hidden items-center gap-1 md:flex"
        >
          {indicator.ready && (
            <span
              className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300 ease-out"
              style={{
                left: indicator.left,
                width: indicator.width,
                background: "#c9a227",
              }}
            />
          )}
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                ref={(el) => (itemRefs.current[item.target] = el)}
                type="button"
                onClick={() => scrollToSection(item.target)}
                aria-current={isActive ? "page" : undefined}
                className="relative rounded-md px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2"
                style={{
                  color: isActive ? "#f3ead9" : "rgba(243,234,217,0.55)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.color = "rgba(243,234,217,0.85)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.color = "rgba(243,234,217,0.55)";
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="hidden shrink-0 rounded-full border px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 md:inline-flex"
          style={{ borderColor: "#c9a227", color: "#c9a227" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#c9a227";
            e.currentTarget.style.color = "#211a14";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#c9a227";
          }}
        >
          Contact
        </button>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md border md:hidden"
          style={{ borderColor: "rgba(243,234,217,0.15)" }}
        >
          <span
            className="block h-[1.5px] w-4 rounded-full transition-all duration-300"
            style={{
              background: "#f3ead9",
              transform: isOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-[1.5px] w-4 rounded-full transition-all duration-300"
            style={{ background: "#f3ead9", opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="block h-[1.5px] w-4 rounded-full transition-all duration-300"
            style={{
              background: "#f3ead9",
              transform: isOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mx-auto max-w-6xl overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(33,26,20,0.96)",
          borderLeft: "1px solid rgba(243,234,217,0.1)",
          borderRight: "1px solid rgba(243,234,217,0.1)",
          borderBottom: isOpen ? "1px solid rgba(243,234,217,0.1)" : "none",
          borderRadius: "0 0 0.75rem 0.75rem",
        }}
      >
        <div className="flex flex-col gap-1 px-3 py-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-[0.72rem] font-medium uppercase tracking-[0.14em]"
                style={{
                  color: isActive ? "#f3ead9" : "rgba(243,234,217,0.6)",
                  background: isActive
                    ? "rgba(201,162,39,0.12)"
                    : "transparent",
                }}
              >
                {item.label}
                {isActive && <span style={{ color: "#c9a227" }}>●</span>}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="mt-1 rounded-full border px-4 py-2.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
            style={{ borderColor: "#c9a227", color: "#c9a227" }}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
