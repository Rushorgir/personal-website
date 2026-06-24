export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const projectsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const projectsItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

/**
 * Custom smooth scroll to a target scroll Y position with parameterized easing.
 * ponytail: Uses requestAnimationFrame with simple window-level cancel listeners. Does not handle nested overflow containers.
 */
export const smoothScrollTo = (targetY, duration = 1500) => {
  const startY = window.scrollY;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampedTargetY = Math.max(0, Math.min(targetY, maxScroll));
  const difference = clampedTargetY - startY;

  if (difference === 0) return;

  let startTime = null;
  let isCancelled = false;

  const cancelScroll = () => {
    isCancelled = true;
    cleanupListeners();
  };

  const cleanupListeners = () => {
    window.removeEventListener("wheel", cancelScroll);
    window.removeEventListener("touchmove", cancelScroll);
    window.removeEventListener("mousedown", cancelScroll);
  };

  window.addEventListener("wheel", cancelScroll, { passive: true });
  window.addEventListener("touchmove", cancelScroll, { passive: true });
  window.addEventListener("mousedown", cancelScroll, { passive: true });

  // =========================================================================
  // SPEED PROFILE TWEAKING PARAMETERS (Cubic Bezier control points):
  //
  // - START SPEED:
  //   Controlled by (x1, y1). Increasing x1 or decreasing y1 makes the start
  //   slower.
  //
  // - END SPEED:
  //   Controlled by (x2, y2). Decreasing x2 or increasing y2 makes the end
  //   slower.
  //
  // - MIDWAY PEAK SPEED:
  //   To lower the peak speed in the middle, bring the control points closer
  //   to the diagonal (x1 = 0.33, y1 = 0.33, x2 = 0.66, y2 = 0.66).
  //   If the curve becomes too steep (e.g., x1 = 0.7, y1 = 0.0, x2 = 0.3, y2 = 1.0),
  //   the middle section will accelerate extremely fast.
  //
  // - CURRENT VALUES (0.35, 0.2, 0.35, 0.8):
  //   A very balanced ease-in-out profile that maintains a gentle midway speed.
  // =========================================================================
  const x1 = 0.35;
  const y1 = 0.2;
  const x2 = 0.35;
  const y2 = 0.8;

  const getBezierT = (x) => {
    // Solve x(t) = x using Newton-Raphson
    let t = x;
    for (let i = 0; i < 8; i++) {
      const sampleX = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
      const currentX = sampleX - x;
      const slope = 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2);
      if (Math.abs(slope) < 1e-6) break;
      t -= currentX / slope;
    }
    return t;
  };

  const getBezierY = (t) => {
    return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
  };

  const step = (timestamp) => {
    if (isCancelled) return;
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    const t = getBezierT(progress);
    const easedProgress = getBezierY(t);

    window.scrollTo(0, startY + difference * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      cleanupListeners();
    }
  };

  window.requestAnimationFrame(step);
};
