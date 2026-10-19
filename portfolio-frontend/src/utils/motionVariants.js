// System Error "Jiggle / Glitch" + Smooth Fade-Up Animation Variants
// Combines a smooth upward entrance with a brief digital system-error micro-jiggle & flicker

export const sysErrorContainer = {
  hidden: { opacity: 0 },
  visible: (delayOffset = 0) => ({
    opacity: 1,
    transition: {
      delayChildren: delayOffset,
      staggerChildren: 0.09,
    },
  }),
};

export const sysErrorFadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
    x: 0,
    skewX: 0,
    scale: 0.98,
  },
  visible: {
    opacity: [0, 0.85, 0.35, 1, 0.8, 1],
    y: [32, -4, 3, -2, 0, 0],
    x: [0, -7, 6, -4, 3, 0],
    skewX: [0, -4, 4, -2, 1, 0],
    scale: [0.98, 1.01, 0.995, 1, 1, 1],
    transition: {
      duration: 0.62,
      times: [0, 0.28, 0.42, 0.62, 0.82, 1],
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const sysErrorCard = {
  hidden: {
    opacity: 0,
    y: 36,
    x: 0,
    rotateZ: 0,
    skewX: 0,
  },
  visible: (customDelay = 0) => ({
    opacity: [0, 0.9, 0.4, 1, 0.85, 1],
    y: [36, -5, 3, -1, 0, 0],
    x: [0, -8, 7, -5, 2, 0],
    rotateZ: [0, -0.8, 0.8, -0.4, 0, 0],
    skewX: [0, -3.5, 3.5, -1.5, 0, 0],
    transition: {
      delay: customDelay,
      duration: 0.65,
      times: [0, 0.26, 0.42, 0.62, 0.82, 1],
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const sysErrorPop = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 24,
  },
  visible: (customDelay = 0) => ({
    opacity: [0, 0.9, 0.35, 1, 0.85, 1],
    scale: [0.88, 1.03, 0.98, 1.01, 1, 1],
    y: [24, -4, 2, -1, 0, 0],
    x: [0, -6, 6, -3, 2, 0],
    skewX: [0, -3, 3, -1, 0, 0],
    transition: {
      delay: customDelay,
      duration: 0.68,
      times: [0, 0.28, 0.44, 0.64, 0.84, 1],
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
