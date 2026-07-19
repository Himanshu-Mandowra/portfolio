import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import sideimage from "../assets/1st.png";
import Typed from "typed.js";

function HeroSection() {
  useEffect(() => {
    const options = {
      strings: [
        "Web Developer",
        "HTML, CSS, Tailwind",
        "Full-Stack Developer",
        "JavaScript",
        "React JS, Next JS",
        "Node Js, Express",
        "MongoDB, MySql",
        "Git, GitHub, Figma",
      ],
      typeSpeed: 60,
      showCursor: false,
      loop: true,
    };

    const typed = new Typed("#element", options);

    return () => {
      typed.destroy();
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col justify-center py-8 md:py-12"
      id="section1"
    >
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-8">
        <div className="w-full max-w-2xl">
          <span className="inline-flex rounded-full border border-stone-700 bg-[linear-gradient(60deg,#ffae00_50%,#ffffff_50%)] px-6 py-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-900 shadow-[0_20px_40px_rgba(0,0,0,0.44)]">
            Web Developer
          </span>

          <h1
            data-text="Himanshu Mandowra..."
            className="hero-name-typed mt-6 text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.04em] text-transparent"
          >
            Himanshu Mandowra
          </h1>

          <span
            id="element"
            className="mt-5 block min-h-7 w-fit border-x border-stone-700 px-3 text-sm font-bold uppercase tracking-[0.2em] text-stone-300 sm:text-base"
          ></span>

          <p className="mt-7 max-w-xl text-base leading-8 text-stone-400 sm:text-lg">
            Passionate web developer with experience in designing and
            implementing dynamic websites and applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/Himanshu_Mandowra_FullStack_Resume (1).pdf"
              download
              className="inline-flex items-center justify-center rounded-lg border-2 border-amber-400 bg-amber-400 px-8 py-3.5 text-base font-medium text-black transition duration-300 hover:-translate-y-1 hover:bg-transparent hover:!text-amber-400"
            >
              Download CV
            </a>
            <Link
              onClick={scrollToContact}
              to="/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#141414] bg-[#141414] px-8 py-3.5 text-base font-medium text-white transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:!text-[#141414]"
            >
              Hire Me Now
            </Link>
          </div>
        </div>

        <div className="hero-image-frame relative hidden shrink-0 items-center justify-center overflow-hidden rounded-[30%] p-[2px] sm:flex">
          <div className="absolute inset-[1px] rounded-[30%] bg-[#222222]"></div>
          <img
            src={sideimage}
            alt="Himanshu-Mandowra"
            className="relative z-10 h-[350px] w-[350px] object-contain"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 bg-[#222222] text-xl text-white shadow-[0_20px_40px_rgba(0,0,0,0.44)] transition duration-200 hover:-translate-y-2"
          >
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href="https://x.com/Gentle_Himanshu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 bg-[#222222] text-xl text-white shadow-[0_20px_40px_rgba(0,0,0,0.44)] transition duration-200 hover:-translate-y-2"
          >
            <i className="bx bxl-twitter"></i>
          </a>
          <a
            href="http://www.linkedin.com/in/himanshu-mandowra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 bg-[#222222] text-xl text-white shadow-[0_20px_40px_rgba(0,0,0,0.44)] transition duration-200 hover:-translate-y-2"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://github.com/Himanshu-Mandowra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 bg-[#222222] text-xl text-white shadow-[0_20px_40px_rgba(0,0,0,0.44)] transition duration-200 hover:-translate-y-2"
          >
            <i className="bx bxl-github"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
