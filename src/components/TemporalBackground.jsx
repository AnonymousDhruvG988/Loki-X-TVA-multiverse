import React, { useEffect, useRef, useState } from 'react';

/**
 * LIVING TEMPORAL BACKGROUND & SCROLL-LINKED MULTIVERSE STRINGS
 * 
 * Features:
 * - Dynamic scroll-linked multiverse strings that expand, branch, and weave as user scrolls down
 * - Ambient cosmic temporal particles drifting upward
 * - Deep TVA void gradient atmosphere
 * - Smooth fade-in/fade-out energy waves synchronizing with viewport depth
 * - High-efficiency requestAnimationFrame rendering
 */
export default function TemporalBackground() {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page scroll depth
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(Math.min(1, Math.max(0, current)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const count = isMobile ? 40 : 95;

    // Temporal energy particles & stars
    const particles = [];
    const colors = ['#7FCF8A', '#A8E6A3', '#F5A623', '#245C46', '#E8E2D0'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.4 - 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let animId = null;
    let isVisible = true;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let t = 0;
    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha + Math.sin(t * 2 + p.x) * 0.2;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.8, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      
      {/* 1. Deep TVA Void Gradient Atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 85% 15%, rgba(245, 166, 35, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 12% 45%, rgba(36, 92, 70, 0.14) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 82%, rgba(127, 207, 138, 0.07) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(23, 63, 50, 0.1) 0%, transparent 70%),
            #050706
          `,
        }}
      />

      {/* 2. Micro Archival Noise & Scanlines */}
      <div className="absolute inset-0 tva-noise opacity-30" />
      <div className="absolute inset-0 crt-scanlines opacity-15" />

      {/* 3. Rotating TVA Geometric Machinery in Upper Corner */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none opacity-20 animate-spin-very-slow origin-center">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#245C46" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#F5A623" strokeWidth="0.8" strokeDasharray="12 6" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#173F32" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 4. SCROLL-LINKED EXPANDING MULTIVERSE STRINGS SPINE */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none transition-all duration-700"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <filter id="scrollGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="scrollThreadAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#173F32" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F5A623" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7FCF8A" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="scrollThreadGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#050706" stopOpacity="0" />
            <stop offset="40%" stopColor="#7FCF8A" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#00F0FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#050706" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic Expanding Primary Timeline (Amplitude & Spread increases with scroll) */}
        <path
          d={`M -100 ${220 + scrollProgress * 180} C ${300 + scrollProgress * 120} ${160 - scrollProgress * 90}, ${720 - scrollProgress * 100} ${320 + scrollProgress * 140}, 1540 ${200 + scrollProgress * 220}`}
          fill="none"
          stroke="url(#scrollThreadAmber)"
          strokeWidth={1.4 + scrollProgress * 1.5}
          strokeDasharray="6 8"
          filter="url(#scrollGlow)"
          className="transition-all duration-300"
        />

        {/* Secondary Bifurcating Branch 1 (Expands outward when scrolling past 20%) */}
        <path
          d={`M 150 ${350 + scrollProgress * 200} C ${500 + scrollProgress * 80} ${480 + scrollProgress * 160}, ${900 - scrollProgress * 120} ${380 - scrollProgress * 80}, 1500 ${520 + scrollProgress * 120}`}
          fill="none"
          stroke="url(#scrollThreadGreen)"
          strokeWidth={1.6 + scrollProgress * 1.2}
          opacity={0.35 + scrollProgress * 0.45}
          className="transition-all duration-300"
        />

        {/* Tertiary Branch 2: High Entropy Branch (Expands past 50%) */}
        {scrollProgress > 0.25 && (
          <path
            d={`M 200 ${520 + scrollProgress * 120} Q ${720 + Math.sin(scrollProgress * Math.PI) * 150} ${280 + scrollProgress * 250}, 1350 ${680 + scrollProgress * 80}`}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity={Math.min(0.65, (scrollProgress - 0.25) * 1.8)}
            filter="url(#scrollGlow)"
          />
        )}

        {/* Quaternary Branch 3: Deep Multiverse Convergence (Expands past 60%) */}
        {scrollProgress > 0.55 && (
          <path
            d={`M 50 ${700 + scrollProgress * 60} C 400 ${620 - scrollProgress * 40}, 1000 ${780 + scrollProgress * 40}, 1500 ${650 + scrollProgress * 100}`}
            fill="none"
            stroke="#A855F7"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            opacity={Math.min(0.6, (scrollProgress - 0.55) * 2.2)}
          />
        )}

        {/* Travelling Node Pulse along the active branch */}
        <circle
          cx={200 + scrollProgress * 1050}
          cy={220 + scrollProgress * 300}
          r={3.5 + Math.sin(scrollProgress * 20) * 1.5}
          fill="#FFFFFF"
          className="animate-ping"
          filter="url(#scrollGlow)"
        />
      </svg>

      {/* 5. 2D Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
