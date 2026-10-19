import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { UmbrellaOctagonSVG } from "./RequiemLoader";
import { soundEngine } from "../utils/soundEngine";

/**
 * Umbrella Corporation Security Transition
 * Plays a clean, theme-aware slide-up curtain transition with system-error jiggle
 * whenever navigating between the Public Portfolio ("/") and Admin ("/admin").
 */
function UmbrellaTransition() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [transitionState, setTransitionState] = useState({
    active: false,
    slidingUp: false,
    mode: "enter-admin", // "enter-admin" | "exit-admin"
  });

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    if (prevPath !== currentPath) {
      const wasAdmin = prevPath.startsWith("/admin");
      const isAdmin = currentPath.startsWith("/admin");

      if (wasAdmin !== isAdmin || (wasAdmin && isAdmin)) {
        const mode = isAdmin ? "enter-admin" : "exit-admin";
        soundEngine.playBiohazardAlert();
        setTransitionState({ active: true, slidingUp: false, mode });

        const slideTimer = setTimeout(() => {
          setTransitionState((prev) => ({ ...prev, slidingUp: true }));
        }, 620);

        const doneTimer = setTimeout(() => {
          setTransitionState((prev) => ({
            ...prev,
            active: false,
            slidingUp: false,
          }));
        }, 1350);

        prevPathRef.current = currentPath;
        return () => {
          clearTimeout(slideTimer);
          clearTimeout(doneTimer);
        };
      }
      prevPathRef.current = currentPath;
    }
  }, [location.pathname]);

  const isEnteringAdmin = transitionState.mode === "enter-admin";

  return (
    <AnimatePresence>
      {transitionState.active && (
        <motion.div
          key="umbrella-route-curtain"
          initial={{ y: "0%" }}
          animate={{ y: transitionState.slidingUp ? "-100%" : "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          style={{
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            borderBottom: "1px solid var(--border-strong)",
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between px-6 py-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.65)]"
          role="status"
          aria-live="assertive"
        >
          <div className="h-4 w-full" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: [0, 0.9, 0.35, 1, 0.75, 1],
              y: [24, -3, 2, -1, 0, 0],
              x: [0, -8, 7, -4, 3, 0],
              skewX: [0, -4, 4, -2, 0, 0],
            }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center"
          >
            <UmbrellaOctagonSVG className="mb-4 h-12 w-12" spin />
            <span
              className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "var(--text-muted)" }}
            >
              {isEnteringAdmin
                ? "RESTRICTED ACCESS // CLEARANCE"
                : "RETURNING TO PORTFOLIO"}
            </span>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="font-requiem text-3xl font-black italic sm:text-5xl">
                {"//"}
              </span>
              <h2 className="font-requiem text-3xl font-extrabold uppercase tracking-[0.14em] sm:text-5xl">
                {isEnteringAdmin ? "ADMINISTRATION" : "HIMANSHU"}
              </h2>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 pb-1">
            <div
              className="h-[1.5px] w-44 overflow-hidden sm:w-52"
              style={{ backgroundColor: "var(--border-color)" }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: "var(--text-primary)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            </div>
            <span className="font-mono-tech text-xs font-bold tracking-wider">
              100
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UmbrellaTransition;
