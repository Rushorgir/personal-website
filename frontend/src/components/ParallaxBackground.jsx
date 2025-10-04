import React, { useEffect, useRef, useState } from 'react';

const ParallaxBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dots = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Create dots with different layers for parallax effect
    const createDots = () => {
      dots.current = [];
      const numberOfDots = 160;

      for (let i = 0; i < numberOfDots; i++) {
        dots.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          layer: Math.random() * 4 + 1, // 1-5 layers for different parallax speeds
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    createDots();

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate mouse influence
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseOffsetX = (mousePos.current.x - centerX) / centerX;
      const mouseOffsetY = (mousePos.current.y - centerY) / centerY;

      dots.current.forEach((dot) => {
        // Apply parallax based on layer
        const parallaxStrength = 100;
        const layerMultiplier = dot.layer / 5;
        
        dot.x = dot.baseX - (mouseOffsetX * parallaxStrength * layerMultiplier);
        dot.y = dot.baseY - (mouseOffsetY * parallaxStrength * layerMultiplier);

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        const dotColor = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
        ctx.fillStyle = `rgba(${dotColor}, ${dot.opacity})`;
        ctx.fill();
        
        // Add subtle glow for larger dots
        if (dot.size > 2) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${dot.opacity * 0.2})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      setCanvasSize();
      createDots();
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParallaxBackground;
