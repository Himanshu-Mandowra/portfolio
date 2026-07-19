import React from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Project from "../components/Project";
import Services from "../components/Services";
import AIChatBot from "../components/AIChatBot/AIChatBot";

function HomePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="px-4 pb-16 sm:px-6 lg:px-8">
        <HeroSection />
        <About />
        <Services />
        <Project />
        <Contact />
      </main>
      <AIChatBot />
    </div>
  );
}

export default HomePage;
