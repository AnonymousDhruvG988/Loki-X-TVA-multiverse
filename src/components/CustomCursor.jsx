import React, { useEffect, useRef, useState } from 'react';
import { globalPointer } from '../utils/pointer';

/**
 * TVA HIGH-PRECISION TEMPORAL RETICLE CURSOR
 * 
 * Features:
 * - Layer 1: Zero-lag instant focal dot (exact hardware sync via translate3d)
 * - Layer 2: Trailing morphing TVA reticle with smooth 0.38 spring lerp
 * - Dynamic state reticles: Default temporal orbit, Button brackets, Link ticks, Timeline radar, Loki variant
 * - Click micro-ripple animation (220ms)
 * - Zero lag, zero stutter, full Windows touch-laptop compatibility
 * - Immune to React re-render style resets
 */
export default function CustomCursor({ cursorState = 'default' }) {
  const instantDotRef = useRef(null);
  const haloRef = useRef(null);
  const rippleRef = useRef(null);
  const [activeShape, setActiveShape] = useState(cursorState);
  const [isReady, setIsReady] = useState(false);
  const [isInside, setIsInside] = useState(true);

  // Sync cursor shape from prop or global coordinator
  useEffect(() => {
    if (cursorState) setActiveShape(cursorState);
  }, [cursorState]);

  useEffect(() => {
    return globalPointer.onCursorShapeChange((shape) => {
      setActiveShape(shape);
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instantDot = instantDotRef.current;
    const halo = haloRef.current;
    const ripple = rippleRef.current;
    if (!instantDot || !halo) return;

    let targetX = globalPointer.targetX || window.innerWidth * 0.5;
    let targetY = globalPointer.targetY || window.innerHeight * 0.5;
    let haloX = targetX;
    let haloY = targetY;
    let animId = null;

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return;

      targetX = e.clientX;
      targetY = e.clientY;

      instantDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!isReady) {
        haloX = targetX;
        haloY = targetY;
        halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
        setIsReady(true);
        document.documentElement.classList.add('custom-cursor-active');
      }

      globalPointer.targetX = targetX;
      globalPointer.targetY = targetY;
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return;
      if (ripple) {
        ripple.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(0.6)`;
        ripple.style.opacity = '1';
        ripple.style.transition = 'none';

        requestAnimationFrame(() => {
          ripple.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out';
          ripple.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(1.6)`;
          ripple.style.opacity = '0';
        });
      }
    };

    const onMouseLeave = () => {
      setIsInside(false);
    };

    const onMouseEnter = () => {
      setIsInside(true);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      const lerp = prefersReducedMotion ? 1 : 0.38;
      haloX += (targetX - haloX) * lerp;
      haloY += (targetY - haloY) * lerp;

      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isReady]);

  return (
    <>
      {/* LAYER 0: Quick Click Ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9996] w-8 h-8 rounded-full border border-[#7FCF8A] opacity-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
        aria-hidden="true"
      />

      {/* LAYER 1: Zero-Lag Hardware-Exact Focal Dot */}
      <div
        ref={instantDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center select-none transition-opacity duration-150 ${
          isReady && isInside ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] shadow-[0_0_6px_#7FCF8A]" />
      </div>

      {/* LAYER 2: Fast Damped TVA Temporal Ring & Morphing Reticles */}
      <div
        ref={haloRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform flex items-center justify-center select-none font-mono transition-opacity duration-150 ${
          isReady && isInside ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {activeShape === 'button' || activeShape === 'cta' ? (
          /* SHAPE: TVA TARGETING RETICLE (Hovering buttons / CTAs) */
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#F5A623]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#F5A623]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#F5A623]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#F5A623]" />
            <div className="w-5 h-5 rounded-full border border-dashed border-[#7FCF8A]/80 animate-spin-slow" />
          </div>
        ) : activeShape === 'link' ? (
          /* SHAPE: EXPANDED RING WITH 4 TEMPORAL TICK MARKS (Hovering interactive elements) */
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#7FCF8A]/90 shadow-[0_0_10px_rgba(127,207,138,0.5)]" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#F5A623]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#F5A623]" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-[#00F0FF]" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-[#00F0FF]" />
          </div>
        ) : activeShape === 'timeline-node' ? (
          /* SHAPE: TIMELINE NODE INDICATOR */
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#F5A623] animate-spin-slow" />
            <div className="w-5 h-5 rounded-full border border-[#7FCF8A] opacity-80" />
            <span className="absolute -top-4 text-[7px] tracking-widest text-[#7FCF8A] font-bold whitespace-nowrap bg-black/90 px-1 border border-[#7FCF8A]/60">
              NODE // ACTIVE
            </span>
          </div>
        ) : activeShape === 'loki' ? (
          /* SHAPE: LOKI VARIANT DETECTOR */
          <div className="relative w-11 h-11 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#7FCF8A] shadow-[0_0_10px_#7FCF8A] animate-pulse" />
            <span className="absolute -bottom-4 text-[7px] tracking-widest text-[#F5A623] font-bold whitespace-nowrap bg-black/90 px-1 border border-[#F5A623]/80">
              L-1130
            </span>
          </div>
        ) : (
          /* SHAPE: DEFAULT CRISP TEMPORAL ORBIT RETICLE */
          <div className="relative w-6 h-6 flex items-center justify-center opacity-90">
            <div className="absolute inset-0 rounded-full border border-[#7FCF8A]/40" />
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7FCF8A]" />
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5A623]" />
          </div>
        )}
      </div>
    </>
  );
}
