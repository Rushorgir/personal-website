import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollLinePoints } from "./ScrollLineContext";

const sequence = [
  "about-dot",
  "projects-btn",
  "skills-0",
  "skills-1",
  "skills-2",
  "skills-3",
  "skills-4",
  "experience-title",
  "experience-0-top",
  "experience-1-top",
  "experience-2-top",
  "contact-title",
];

const GlobalScrollLine = () => {
  const { points, triggerUpdate } = useScrollLinePoints();
  const [coords, setCoords] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const lineBoundsRef = useRef({ startY: 0, endY: 0 });

  const { scrollY } = useScroll();

  // Map scroll progress to a clipping height that matches the screen midpoint
  const clipHeight = useTransform(scrollY, (y) => {
    const { startY, endY } = lineBoundsRef.current;
    if (!endY || endY <= startY) return 0;

    const screenMidpoint = y + window.innerHeight / 2;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    // If we are at the very bottom of the page, force the line to fully complete
    if (y >= maxScroll - 10) {
      return endY + 100;
    }

    if (screenMidpoint <= startY) return 0;

    return screenMidpoint;
  });

  const fadeStart = useTransform(clipHeight, (h) => Math.max(0, h - 150));
  const fadeHeight = useTransform(clipHeight, (h) => Math.min(150, h));

  // Calculate coordinates of all registered points
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      const newCoords = {};
      let highestY = 0;
      Object.keys(points).forEach((key) => {
        const el = points[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          let y = rect.top + window.scrollY + rect.height / 2;

          let x = rect.left + rect.width / 2;
          if (key.startsWith("skills-")) {
            x = rect.left - 18; // Position dot on the left as a bullet point
          }

          newCoords[key] = {
            x: x,
            y: y,
          };
          if (y > highestY) highestY = y;
        }
      });
      setCoords(newCoords);

      const active = sequence.filter((key) => newCoords[key]);
      let startY = 0;
      let endY = 0;
      if (active.length > 0) {
        startY = newCoords[active[0]].y;
        endY = newCoords[active[active.length - 1]].y;
      }
      lineBoundsRef.current = { startY, endY };
    };

    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    debouncedResize();
    window.addEventListener("resize", debouncedResize);

    // Observe DOM mutations to recalculate if layout changes (debounced and without attributes tracking to prevent infinite loops/hangs on theme toggle)
    const observer = new MutationObserver(debouncedResize);
    observer.observe(document.body, { childList: true, subtree: true });

    // Also observe body resizes
    const resizeObserver = new ResizeObserver(debouncedResize);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      observer.disconnect();
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [points, triggerUpdate]);

  const { pathD, activePoints } = useMemo(() => {
    if (isMobile) return { pathD: "", activePoints: [] };

    // Filter to only those that actually exist in coords
    const active = sequence.filter((key) => coords[key]);
    if (active.length < 2) return { pathD: "", activePoints: [] };

    let d = "";

    for (let i = 0; i < active.length; i++) {
      const key = active[i];
      const pt = coords[key];

      if (i === 0) {
        d += `M ${pt.x} ${pt.y} `;
        continue;
      }

      const prevKey = active[i - 1];
      const prevPt = coords[prevKey];

      // Subtle arc out to the left for skills
      if (prevKey.includes("skills-") && key.includes("skills-")) {
        const leftOut = pt.x - 22;
        const cy1 = prevPt.y + (pt.y - prevPt.y) / 3;
        const cy2 = pt.y - (pt.y - prevPt.y) / 3;
        d += `C ${leftOut} ${cy1}, ${leftOut} ${cy2}, ${pt.x} ${pt.y} `;
      }
      // General smooth S-curve for everything else (including Experience arcs)
      else {
        const cy1 = prevPt.y + (pt.y - prevPt.y) / 2;
        const cx1 = prevPt.x;
        const cy2 = prevPt.y + (pt.y - prevPt.y) / 2;
        const cx2 = pt.x;
        d += `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y} `;
      }
    }

    return { pathD: d, activePoints: active };
  }, [coords, isMobile]);

  if (isMobile || !pathD) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="neonGlow-dark" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neonGlow-light" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neonGlow-dot-dark" x="-500%" y="-500%" width="1100%" height="1100%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neonGlow-dot-light" x="-500%" y="-500%" width="1100%" height="1100%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="fade-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="scroll-line-mask">
            <motion.rect x="0" y="0" width="100%" height={fadeStart} fill="white" />
            <motion.rect
              x="0"
              y={fadeStart}
              width="100%"
              height={fadeHeight}
              fill="url(#fade-gradient)"
            />
          </mask>
        </defs>

        {/* The animated glowing line */}
        <path
          d={pathD}
          fill="none"
          strokeWidth="3"
          className="stroke-black dark:stroke-white dark:[filter:url(#neonGlow-dark)] [filter:url(#neonGlow-light)]"
          mask="url(#scroll-line-mask)"
        />

        {/* Draw dots at every point on top of the lines */}
        {activePoints.map((key) => {
          const hiddenDots = ["projects-btn", "experience-title", "contact-title"];
          if (hiddenDots.includes(key)) return null;

          const pt = coords[key];

          let colorClass = "fill-black dark:fill-white";
          if (key === "skills-0") colorClass = "fill-rose-500 dark:fill-rose-400";
          else if (key === "skills-1") colorClass = "fill-sky-500 dark:fill-sky-400";
          else if (key === "skills-2") colorClass = "fill-emerald-500 dark:fill-emerald-400";
          else if (key === "skills-3") colorClass = "fill-violet-500 dark:fill-violet-400";
          else if (key === "skills-4") colorClass = "fill-amber-500 dark:fill-amber-400";

          return (
            <circle
              key={key}
              cx={pt.x}
              cy={pt.y}
              r="4"
              className={`${colorClass} dark:[filter:url(#neonGlow-dot-dark)] [filter:url(#neonGlow-dot-light)]`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default GlobalScrollLine;
