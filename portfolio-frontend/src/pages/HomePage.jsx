import React, { useEffect, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import HeroSection from "../components/HeroSection";
import MissionLog from "../components/MissionLog";
import Navbar from "../components/Navbar";
import Project from "../components/Project";
import Services from "../components/Services";
import AIChatBot from "../components/AIChatBot/AIChatBot";
import RequiemThreeBackground from "../components/RequiemThreeBackground";
import TacticalHudBar from "../components/TacticalHudBar";

function HomePage({ revealReady = true }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio_theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [outbreakMode, setOutbreakMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("portfolio_theme", theme);
    } catch {}
  }, [theme]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-transparent">
      {/* Beginner-Friendly Three.js Background adapting to Dark, Light & B&W themes */}
      <RequiemThreeBackground outbreakMode={outbreakMode} theme={theme} />

      {/* Subtle Grid Overlay */}
      <div className="re-lattice-overlay pointer-events-none fixed inset-0 z-0" />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar
          theme={theme}
          setTheme={setTheme}
          outbreakMode={outbreakMode}
          revealReady={revealReady}
        />
        <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <HeroSection
            outbreakMode={outbreakMode}
            revealReady={revealReady}
            theme={theme}
          />
          <About
            outbreakMode={outbreakMode}
            theme={theme}
            onCureOutbreak={() => setOutbreakMode(false)}
          />
          <MissionLog theme={theme} />
          <Project theme={theme} />
          <Services />
          <Contact />
        </main>
      </div>

      {/* Minimal Bottom HUD & Easter Egg Bar */}
      <TacticalHudBar
        outbreakMode={outbreakMode}
        setOutbreakMode={setOutbreakMode}
      />

      {/* AI Portfolio Assistant */}
      <AIChatBot />
    </div>
  );
}

export default HomePage;
