import React, { useEffect, useRef, useState } from 'react';
import { globalPointer } from '../utils/pointer';

/**
 * TVA HIGH-PRECISION TEMPORAL CURSOR
 * 
 * Features:
 * - Layer 1: Hardware-synced zero-lag focal point (translate3d, 0ms latency)
 * - Layer 2: Fast interpolated temporal ring (0.36 lerp, no floatiness or lag)
 * - TVA state shapes: Default orbit, Interactive expand with ticks, Button targeting reticle, Timeline node
 * - Instant micro-ripple on click (150ms)
 * - Zero React state on pointermove
 * - Fully disabled on touch / mobile
 */
export default function CustomCursor({ cursorState = 'default' }) {
  const instantDotRef = useRef(null);
  const haloRef = useRef(null);
  const clickRippleRef = useRef(null);
  const [activeShape, setActiveShape] = useState('default');

  useEffect(() => {
    setActiveShape(cursorState);
  }, [cursorState]);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    document.documentElement.classList.add('custom-cursor-active');

    const instantDot = instantDotRef.current;
    const halo = haloRef.current;
    const ripple = clickRippleRef.current;
    if (!instantDot || !halo) return;

    let targetX = globalPointer.targetX;
    let targetY = globalPointer.targetY;
    let haloX = targetX;
    let haloY = targetY;
    let animId = null;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Hardware-exact instant focal dot position
      instantDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    };

    const onPointerDown = (e) => {
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

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    const render = () => {
      // Snappy, responsive interpolation: 0.36 gives high-refresh precision without lag
      haloX += (targetX - haloX) * 0.36;
      haloY += (targetY - haloY) * 0.36;

      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* LAYER 0: Quick Click Ripple */}
      <div
        ref={clickRippleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9996] w-8 h-8 rounded-full border border-[#7FCF8A] opacity-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
        aria-hidden="true"
      />

      {/* LAYER 1: Zero-Lag Hardware-Exact Focal Dot */}
      <div
        ref={instantDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] shadow-[0_0_6px_#7FCF8A]" />
      </div>

      {/* LAYER 2: Fast Damped TVA Temporal Ring & Reticles */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform flex items-center justify-center select-none font-mono"
        aria-hidden="true"
      >
        {activeShape === 'button' || activeShape === 'cta' ? (
          /* SHAPE: TVA TARGETING RETICLE (Hovering buttons / CTAs) */
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#F5A623]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#F5A623]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#F5A623]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#F5A623]" />
            <div className="w-4 h-4 rounded-full border border-dashed border-[#7FCF8A]/60 animate-spin-slow" />
          </div>
        ) : activeShape === 'link' ? (
          /* SHAPE: EXPANDED RING WITH 4 TEMPORAL TICK MARKS (Hovering interactive elements) */
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#7FCF8A]/70 shadow-[0_0_8px_rgba(127,207,138,0.4)]" />
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-[#F5A623]" />
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-[#F5A623]" />
            <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-0.5 bg-[#00F0FF]" />
            <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-0.5 bg-[#00F0FF]" />
          </div>
        ) : activeShape === 'timeline-node' ? (
          /* SHAPE: TIMELINE NODE INDICATOR */
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#F5A623] animate-spin-slow" />
            <div className="w-5 h-5 rounded-full border border-[#7FCF8A] opacity-75" />
            <span className="absolute -top-4 text-[7px] tracking-widest text-[#7FCF8A] font-bold whitespace-nowrap bg-black/90 px-1 border border-[#7FCF8A]/40">
              NODE // ACTIVE
            </span>
          </div>
        ) : activeShape === 'loki' ? (
          /* SHAPE: LOKI VARIANT DETECTOR */
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#7FCF8A] animate-pulse" />
            <span className="absolute -bottom-4 text-[7px] tracking-widest text-[#F5A623] font-bold whitespace-nowrap bg-black/90 px-1 border border-[#F5A623]/60">
              L-1130
            </span>
          </div>
        ) : (
          /* SHAPE: DEFAULT SUBTLE TEMPORAL ORBIT RING */
          <div className="relative w-5 h-5 flex items-center justify-center opacity-85">
            <div className="absolute inset-0 rounded-full border border-[#7FCF8A]/35" />
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-[#7FCF8A]" />
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-[#F5A623]" />
          </div>
        )}
      </div>
    </>
  );
}
