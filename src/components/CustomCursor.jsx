import React, { useEffect, useRef, useState } from 'react';

/**
 * ANTIGRAVITY-STYLE HIGH-PERFORMANCE SHAPE-MORPHING CURSOR
 * 
 * Features:
 * - Ultra-responsive dual-layer tracking:
 *   Layer 1: Zero-lag instant focal dot (exact hardware sync)
 *   Layer 2: Silky lerped trailing morphing halo & brackets (high-refresh physics)
 * - Dynamic shape morphing (brackets on CTA/link, radar node on timeline-node, variant tag on Loki)
 * - Trailing cosmic particle field with lightweight alpha decay
 * - Guaranteed pointer-events: none across all elements to never impede clicks
 */
export default function CustomCursor({ cursorState = 'default' }) {
  const instantDotRef = useRef(null);
  const morphHaloRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeShape, setActiveShape] = useState('default');

  useEffect(() => {
    setActiveShape(cursorState);
  }, [cursorState]);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    document.documentElement.classList.add('custom-cursor-active');

    const instantDot = instantDotRef.current;
    const morphHalo = morphHaloRef.current;
    const canvas = canvasRef.current;
    if (!instantDot || !morphHalo || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse positions: target and smooth lerp
    let targetX = -100;
    let targetY = -100;
    let haloX = -100;
    let haloY = -100;

    const particles = [];
    const MAX_PARTICLES = 35;

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Instantaneous focal dot tracking with zero latency
      instantDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      // Spawn subtle cosmic trailing particles
      if (particles.length < MAX_PARTICLES && Math.random() > 0.45) {
        particles.push({
          x: targetX + (Math.random() - 0.5) * 8,
          y: targetY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 1.0,
          decay: Math.random() * 0.035 + 0.025,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#7FCF8A' : '#F5A623',
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let animId = null;

    const render = () => {
      // Snappy and responsive lerp factor (0.45 gives smooth momentum without floaty delay)
      haloX += (targetX - haloX) * 0.45;
      haloY += (targetY - haloY) * 0.45;

      morphHalo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;

      // Render cosmic particles on canvas
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* 2D Trailing Particle Field */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        aria-hidden="true"
      />

      {/* LAYER 1: Instant Zero-Lag Center Focal Dot */}
      <div
        ref={instantDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] will-change-transform flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] shadow-[0_0_8px_#7FCF8A]" />
      </div>

      {/* LAYER 2: Morphing Outer Halo & Brackets */}
      <div
        ref={morphHaloRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] will-change-transform flex items-center justify-center transition-all duration-150 select-none font-mono"
      >
        {/* SHAPE 1: CTA / BUTTON HOVER (Antigravity Target Brackets) */}
        {activeShape === 'cta' || activeShape === 'link' ? (
          <div className="relative w-12 h-12 flex items-center justify-center animate-spin-slow">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#7FCF8A]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#7FCF8A]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#7FCF8A]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#7FCF8A]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-ping opacity-75" />
          </div>
        ) : activeShape === 'timeline-node' ? (
          /* SHAPE 2: TIMELINE NODE HOVER (Radar Target) */
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#F5A623] animate-spin-slow" />
            <div className="w-8 h-8 rounded-full border border-[#7FCF8A] animate-ping opacity-50" />
            <span className="absolute -top-5 text-[8px] tracking-widest text-[#7FCF8A] font-bold whitespace-nowrap bg-black/90 px-1 border border-[#7FCF8A]/40">
              NODE // 616
            </span>
          </div>
        ) : activeShape === 'loki' ? (
          /* SHAPE 3: LOKI VARIANT HOVER (Emerald Tag) */
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#7FCF8A] opacity-70 animate-pulse" />
            <span className="absolute -bottom-5 text-[8px] tracking-widest text-[#F5A623] font-bold whitespace-nowrap bg-black/90 px-1.5 py-0.5 border border-[#F5A623]">
              VARIANT DETECTED
            </span>
          </div>
        ) : (
          /* SHAPE 4: DEFAULT HOVER (Subtle Orbit Ring) */
          <div className="relative w-7 h-7 flex items-center justify-center opacity-80">
            <div className="absolute inset-0 rounded-full border border-tva-amber/30" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5A623]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5A623]" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#7FCF8A]" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#7FCF8A]" />
          </div>
        )}
      </div>
    </>
  );
}
