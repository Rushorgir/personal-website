import React, { useEffect, useRef } from "react";

const ParallaxBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dots = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setCanvasSize = () => {
      // Multiply DPR by a super-sampling factor for extreme sharpness
      const superSamplingFactor = 3;
      const dpr = Math.max(window.devicePixelRatio || 1, 2) * superSamplingFactor;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    setCanvasSize();

    // Create dots in logical coordinates with different layers for parallax effect
    const createDots = () => {
      dots.current = [];
      const numberOfDots = 180;
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < numberOfDots; i++) {
        dots.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          layer: Math.random() * 4 + 1, // 1-5 layers for different parallax speeds
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    createDots();

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Calculate mouse influence in logical space
      const centerX = w / 2;
      const centerY = h / 2;
      const mouseOffsetX = (mousePos.current.x - centerX) / centerX;
      const mouseOffsetY = (mousePos.current.y - centerY) / centerY;

      const scrollY = window.scrollY || window.pageYOffset;

      dots.current.forEach((dot) => {
        // Apply parallax based on layer
        const mouseParallaxStrength = 60;
        const scrollSpeed = 0.35; // Speed factor for scrolling parallax
        const layerMultiplier = dot.layer / 5;

        // Calculate Y position with scroll parallax and wrap around
        let wrappedY = (dot.baseY - scrollY * scrollSpeed * layerMultiplier) % h;
        if (wrappedY < 0) wrappedY += h;

        dot.x = dot.baseX - mouseOffsetX * mouseParallaxStrength * layerMultiplier;
        dot.y = wrappedY - mouseOffsetY * mouseParallaxStrength * layerMultiplier;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        const dotColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0";
        ctx.fillStyle = `rgba(${dotColor}, ${dot.opacity})`;
        ctx.fill();

        // Add subtle glow for larger dots
        if (dot.size > 1.5) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${dot.opacity * 0.2})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      createDots();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ParallaxBackground;
