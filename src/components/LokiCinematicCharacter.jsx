import React, { useEffect, useRef, useState } from 'react';
import { playTemporalPulse, playClickSound, playGlitchSound } from '../utils/soundEffects';

// 6 Authentic Loki Variant Personas Across the Website Stages
const LOKI_VARIANTS = [
  {
    id: 'hero',
    name: 'TVA CONSULTANT // LOKI L-1130',
    title: 'THE GOD OF MISCHIEF',
    src: '/assets/images/loki_horned_suit.png',
    rimLeft: 'rgba(127, 207, 138, 0.85)',
    rimRight: 'rgba(245, 166, 35, 0.75)',
    accent: '#7FCF8A',
    badge: 'STAGE 01 // TVA CONSULTANT',
    telemetry: 'TEMPORAL DRIFT: 0.00% // SIGNATURE: REBELLIOUS MISCHIEF',
    scaleMultiplier: 1.0,
  },
  {
    id: 'briefing',
    name: 'TVA PRISONER // VARIANT L-1130',
    title: 'UNDER TEMPORAL ARREST',
    src: '/assets/images/loki_tva_collar.png',
    rimLeft: 'rgba(245, 166, 35, 0.9)',
    rimRight: 'rgba(255, 107, 0, 0.75)',
    accent: '#F5A623',
    badge: 'STAGE 02 // TIME COLLAR ACTIVE',
    telemetry: 'COLLAR CHARGE: 100% // TIME-TWIPPER SYNCED // CASE BRIEFING',
    scaleMultiplier: 0.95,
  },
  {
    id: 'branches',
    name: 'PRESIDENT LOKI // CLUSTER-2016',
    title: 'THE USURPER VARIANT',
    src: '/assets/images/loki_president_variant.png',
    rimLeft: 'rgba(0, 240, 255, 0.85)',
    rimRight: 'rgba(127, 207, 138, 0.75)',
    accent: '#00F0FF',
    badge: 'STAGE 03 // VOTE LOKI PROTOCOL',
    telemetry: 'HIGH ANOMALY FLUX // ALLIGATOR COHORT DETECTED',
    scaleMultiplier: 0.98,
  },
  {
    id: 'multiverse',
    name: 'THE TEMPORAL WEAVER',
    title: 'WEAVING MULTIVERSE FILAMENTS',
    src: '/assets/images/loki_loom_strings_tva.png',
    rimLeft: 'rgba(127, 207, 138, 0.95)',
    rimRight: 'rgba(74, 222, 128, 0.85)',
    accent: '#4ADE80',
    badge: 'STAGE 04 // WEAVING 10^14 TIMELINES',
    telemetry: 'DIRECT MULTIVERSE SYNTHESIS // LOOM RADIATION BYPASS',
    scaleMultiplier: 1.02,
  },
  {
    id: 'stones',
    name: 'ASCENDED GOD LOKI // GOLDEN CROWN',
    title: 'THE GLORIOUS PURPOSE',
    src: '/assets/images/loki_god_close_crown.png',
    rimLeft: 'rgba(255, 215, 0, 0.9)',
    rimRight: 'rgba(176, 38, 255, 0.75)',
    accent: '#FFD700',
    badge: 'STAGE 05 // GLORIOUS PURPOSE',
    telemetry: 'DIVINE AWAKENING // SACRED REALITIES PRESERVED',
    scaleMultiplier: 1.04,
  },
  {
    id: 'throne',
    name: 'GOD OF STORIES // YGGDRASIL THRONE',
    title: 'THE END OF TIME',
    src: '/assets/images/loki_god_on_throne_multiverse.png',
    rimLeft: 'rgba(127, 207, 138, 1.0)',
    rimRight: 'rgba(245, 166, 35, 0.85)',
    accent: '#A8E6A3',
    badge: 'STAGE 06 // ETERNAL STEWARD',
    telemetry: 'THRONE SECURED // MULTIVERSE TREE SUSTAINED FOR ALL TIME',
    scaleMultiplier: 1.06,
  },
];

/**
 * LOKI × TIME VARIANCE AUTHORITY — 2.5D CINEMATIC CHARACTER EXPERIENCE
 * 
 * Directives:
 * - DO NOT use a GLTF / 3D character mesh.
 * - Pseudo-3D / 2.5D cinematic compositing using high-res Loki variant pictures.
 * - Persistent presence across EVERY stage with stage-aware crossfading images.
 * - Layered depth: Holographic Clock + Shadow + Dual Rim Lights + Particles + Light Sweep.
 * - Ref-based mouse parallax (zero React mouse state rerenders) at buttery 60 FPS.
 */
export default function LokiCinematicCharacter({ isHeroHovered = false }) {
  const containerRef = useRef(null);
  const characterRef = useRef(null);
  const clockRef = useRef(null);
  const shadowRef = useRef(null);
  const scanSweepRef = useRef(null);
  const diagnosticRef = useRef(null);

  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [clockReversed, setClockReversed] = useState(false);
  const [isLokiHovered, setIsLokiHovered] = useState(false);
  const [shockwaveActive, setShockwaveActive] = useState(false);

  const lastVariantIdxRef = useRef(0);
  const clockReversedRef = useRef(false);
  useEffect(() => {
    clockReversedRef.current = clockReversed;
  }, [clockReversed]);

  const isLokiHoveredRef = useRef(false);
  useEffect(() => {
    isLokiHoveredRef.current = isLokiHovered || isHeroHovered;
  }, [isLokiHovered, isHeroHovered]);

  const handleLokiClick = (e) => {
    e.stopPropagation();
    playTemporalPulse();
    playGlitchSound();
    setShockwaveActive(true);
    setTimeout(() => setShockwaveActive(false), 900);
  };

  const handleToggleClock = (e) => {
    e.stopPropagation();
    playClickSound();
    setClockReversed((prev) => !prev);
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse target & current (lerped)
    const mouse = { targetX: 0, targetY: 0, currX: 0, currY: 0 };
    // Scroll target & current (lerped)
    const scroll = { targetProgress: 0, currProgress: 0 };

    let animId = null;
    let clockAngle = 0;
    let clockInnerAngle = 0;
    let timeElapsed = 0;

    const handlePointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        scroll.targetProgress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 60 FPS Animation Loop
    const render = () => {
      timeElapsed += 0.018;

      if (!prefersReducedMotion) {
        // Smooth lerp for mouse parallax
        mouse.currX += (mouse.targetX - mouse.currX) * 0.07;
        mouse.currY += (mouse.targetY - mouse.currY) * 0.07;

        // Smooth lerp for scroll progression
        scroll.currProgress += (scroll.targetProgress - scroll.currProgress) * 0.08;
      } else {
        mouse.currX = 0;
        mouse.currY = 0;
        scroll.currProgress = scroll.targetProgress;
      }

      const p = scroll.currProgress; // 0.0 (Hero) to 1.0 (Footer)

      // Detect active Loki variant according to scroll depth
      let currentIdx = 0;
      if (p < 0.16) currentIdx = 0;
      else if (p < 0.35) currentIdx = 1;
      else if (p < 0.54) currentIdx = 2;
      else if (p < 0.72) currentIdx = 3;
      else if (p < 0.88) currentIdx = 4;
      else currentIdx = 5;

      if (currentIdx !== lastVariantIdxRef.current) {
        lastVariantIdxRef.current = currentIdx;
        setActiveVariantIdx(currentIdx);
      }

      // 1. Stage-Aware Coordinates & Scaling
      let posX = 0;
      let posY = 0;
      let scale = 1.0;
      let opacity = 1.0;

      if (p < 0.12) {
        // Hero stage
        const sub = p / 0.12;
        posX = 14 + sub * 8; // % from right
        posY = -2 + sub * 8; // % from top
        scale = 1.02 - sub * 0.12;
        opacity = 1.0;
      } else if (p < 0.32) {
        // TVA Mission / Briefing
        const sub = (p - 0.12) / 0.2;
        posX = 22 + sub * 6;
        posY = 6 + sub * 8;
        scale = 0.90 - sub * 0.14;
        opacity = 0.92 - sub * 0.12;
      } else if (p < 0.52) {
        // Sacred Timeline & Branches
        const sub = (p - 0.32) / 0.2;
        posX = 28 - sub * 12;
        posY = 14 + sub * 6;
        scale = 0.76 - sub * 0.18;
        opacity = 0.80 - sub * 0.25;
      } else if (p < 0.72) {
        // Multiverse Map
        const sub = (p - 0.52) / 0.2;
        posX = 16 + sub * 10;
        posY = 20 - sub * 4;
        scale = 0.58 - sub * 0.10;
        opacity = 0.55 - sub * 0.15;
      } else if (p < 0.88) {
        // Infinity Archive & Registration
        const sub = (p - 0.72) / 0.16;
        posX = 26 - sub * 6;
        posY = 16 + sub * 10;
        scale = 0.48 + sub * 0.12;
        opacity = 0.40 - sub * 0.08;
      } else {
        // Footer convergence
        const sub = (p - 0.88) / 0.12;
        posX = 20 - sub * 10;
        posY = 26 - sub * 8;
        scale = 0.60 - sub * 0.20;
        opacity = 0.32 + sub * 0.38;
      }

      // Parallax offsets (mouse)
      const charShiftX = mouse.currX * 12;
      const charShiftY = mouse.currY * 8;
      const clockShiftX = mouse.currX * 5;
      const clockShiftY = mouse.currY * 4;
      const shadowShiftX = -mouse.currX * 8; // Opposite direction gives real ground shadow
      const shadowShiftY = -mouse.currY * 4;

      // Vertical breathing motion (1-3px sine)
      const breath = Math.sin(timeElapsed * 1.4) * 2.2;
      const sway = Math.sin(timeElapsed * 0.7) * 1.5;

      // 3D pseudo tilt (2-4 degrees max)
      const tiltX = mouse.currY * -3.5;
      const tiltY = mouse.currX * 4.5;

      // Rotate Holographic TVA Clock
      const clockDir = clockReversedRef.current ? -1.6 : 1;
      clockAngle += 0.22 * clockDir;
      clockInnerAngle -= 0.16 * clockDir;

      // Apply transforms directly via refs (ZERO React re-renders!)
      if (characterRef.current) {
        characterRef.current.style.transform = `
          translate3d(${charShiftX + sway + posX}px, ${charShiftY + breath + posY}px, 0)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
          scale(${scale})
        `;
        characterRef.current.style.opacity = String(opacity);
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `
          translate3d(${shadowShiftX}px, ${shadowShiftY}px, 0)
          scale(${scale * 0.95})
        `;
      }

      if (clockRef.current) {
        clockRef.current.style.transform = `
          translate3d(${clockShiftX}px, ${clockShiftY}px, 0)
          scale(${scale * 1.25})
        `;
        const outerG = clockRef.current.querySelector('.clock-outer-ring');
        if (outerG) outerG.setAttribute('transform', `rotate(${clockAngle} 250 250)`);
        const innerG = clockRef.current.querySelector('.clock-inner-ring');
        if (innerG) innerG.setAttribute('transform', `rotate(${clockInnerAngle} 250 250)`);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeVariant = LOKI_VARIANTS[activeVariantIdx] || LOKI_VARIANTS[0];

  return (
    <aside
      ref={containerRef}
      aria-label="TVA Character Experience"
      className="fixed inset-y-0 right-0 w-full sm:w-[580px] lg:w-[680px] pointer-events-none z-[3] overflow-hidden select-none flex items-center justify-end pr-2 sm:pr-8"
    >
      {/* SHOCKWAVE EXPANSION RING (On Character Click) */}
      {shockwaveActive && (
        <div className="absolute right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-[#7FCF8A] animate-ping pointer-events-none z-30" />
      )}

      {/* =========================================================================
          LAYER 1: GIANT HOLOGRAPHIC TVA CLOCK (Behind Loki)
          ========================================================================= */}
      <div
        ref={clockRef}
        className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 w-[440px] sm:w-[540px] h-[440px] sm:h-[540px] pointer-events-none opacity-45 transition-opacity duration-700"
        style={{ transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
          <defs>
            <filter id="clockAura" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Roman Numeral / Tick Ring (Clockwise) */}
          <g className="clock-outer-ring" filter="url(#clockAura)">
            <circle cx="250" cy="250" r="225" fill="none" stroke="#245C46" strokeWidth="1.5" strokeDasharray="8 6" />
            <circle cx="250" cy="250" r="205" fill="none" stroke="#F5A623" strokeWidth="1.2" strokeDasharray="16 8" opacity="0.6" />
            {/* 12 Radial Hour Markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={`tick-${deg}`}
                x1={250 + Math.cos((deg * Math.PI) / 180) * 195}
                y1={250 + Math.sin((deg * Math.PI) / 180) * 195}
                x2={250 + Math.cos((deg * Math.PI) / 180) * 225}
                y2={250 + Math.sin((deg * Math.PI) / 180) * 225}
                stroke="#F5A623"
                strokeWidth={deg % 90 === 0 ? "2.5" : "1.2"}
                opacity={deg % 90 === 0 ? "0.9" : "0.5"}
              />
            ))}
          </g>

          {/* Middle TVA Concentric Ring (Counter-Clockwise) */}
          <g className="clock-inner-ring">
            <circle cx="250" cy="250" r="160" fill="none" stroke="#173F32" strokeWidth="2" />
            <circle cx="250" cy="250" r="130" fill="none" stroke="#7FCF8A" strokeWidth="1.2" strokeDasharray="6 10" opacity="0.75" />
            {/* Compass Axes */}
            <line x1="250" y1="120" x2="250" y2="380" stroke="#F5A623" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
            <line x1="120" y1="250" x2="380" y2="250" stroke="#F5A623" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          </g>

          {/* Central Pulsing Temporal Core */}
          <circle cx="250" cy="250" r="70" fill="rgba(23, 63, 50, 0.25)" />
          <circle cx="250" cy="250" r="40" fill="none" stroke="#7FCF8A" strokeWidth="2" className="animate-pulse" />
          <circle cx="250" cy="250" r="8" fill="#F5A623" filter="url(#clockAura)" />
        </svg>

        {/* Clock Reverse Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={handleToggleClock}
            className="px-3 py-1 bg-[#050706]/90 border border-tva-border/60 hover:border-tva-amber text-[9px] font-mono text-tva-bone-dim hover:text-tva-amber tracking-widest uppercase transition-all shadow-lg flex items-center gap-1.5"
            title="Reverse TVA Clock rotation"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
            <span>TVA CLOCK: {clockReversed ? 'REVERSED [↺]' : 'SYNCHRONIZED [↻]'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          LAYER 2: VOLUMETRIC FOG & ATMOSPHERIC AURA
          ========================================================================= */}
      <div
        className="absolute right-12 top-1/2 -translate-y-1/2 w-[380px] h-[480px] rounded-full pointer-events-none opacity-50 blur-3xl transition-opacity duration-700"
        style={{
          background: isLokiHovered
            ? `radial-gradient(circle, ${activeVariant.rimLeft} 0%, ${activeVariant.rimRight} 50%, transparent 75%)`
            : `radial-gradient(circle, ${activeVariant.rimLeft} 0%, rgba(23, 63, 50, 0.2) 55%, transparent 70%)`,
        }}
      />

      {/* =========================================================================
          LAYER 3: DYNAMIC SILHOUETTE SHADOW
          ========================================================================= */}
      <div
        ref={shadowRef}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-[340px] sm:w-[400px] h-[460px] sm:h-[540px] pointer-events-none blur-xl opacity-80"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 65%, transparent 80%)',
        }}
      />

      {/* =========================================================================
          LAYER 4: LOKI 2.5D PSEUDO-3D CHARACTER (Multi-Variant Crossfade Stack)
          ========================================================================= */}
      <div
        ref={characterRef}
        onClick={handleLokiClick}
        onMouseEnter={() => setIsLokiHovered(true)}
        onMouseLeave={() => setIsLokiHovered(false)}
        className="relative z-10 w-[320px] sm:w-[380px] lg:w-[440px] pointer-events-auto cursor-pointer group transition-all duration-300"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Floating Active Stage Badge */}
        <div
          className="absolute -top-7 right-0 px-2.5 py-0.5 bg-[#050706]/95 border text-[9px] font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-lg transition-all duration-500 z-30"
          style={{ borderColor: `${activeVariant.accent}88` }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeVariant.accent }} />
          <span style={{ color: activeVariant.accent }}>{activeVariant.badge}</span>
        </div>

        {/* Soft Front Light & Dual Rim Glow Filter Container */}
        <div
          className="relative w-full rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            // High-grade dual rim light tailored dynamically to the active variant
            filter: isLokiHovered
              ? `drop-shadow(-12px 0px 28px ${activeVariant.rimLeft}) drop-shadow(12px 0px 28px ${activeVariant.rimRight}) drop-shadow(0 20px 30px rgba(0,0,0,0.95))`
              : `drop-shadow(-7px 0px 18px ${activeVariant.rimLeft}) drop-shadow(7px 0px 18px ${activeVariant.rimRight}) drop-shadow(0 15px 25px rgba(0,0,0,0.9))`,
            maskImage: 'radial-gradient(ellipse at 50% 48%, black 65%, rgba(0,0,0,0.8) 82%, transparent 98%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 48%, black 65%, rgba(0,0,0,0.8) 82%, transparent 98%)',
          }}
        >
          {/* Authentic Loki Multi-Variant Pictures with Smooth Scroll Crossfades */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[3.2/4] overflow-hidden">
            {LOKI_VARIANTS.map((v, idx) => {
              const isActive = activeVariantIdx === idx;
              return (
                <img
                  key={v.id}
                  src={v.src}
                  alt={v.name}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 scale-100 filter brightness-105 contrast-105'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                  loading="eager"
                  draggable={false}
                />
              );
            })}
          </div>

          {/* Periodic TVA Scanner Light Sweep (Directive 09) */}
          <div
            ref={scanSweepRef}
            className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_20px_#7FCF8A] pointer-events-none opacity-60 animate-tva-sweep"
          />

          {/* Vignette bottom fade into Void Black */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050706] via-[#050706]/70 to-transparent pointer-events-none" />
        </div>

        {/* =========================================================================
            LAYER 5: OCCLUSION — FOREGROUND SPARKS & TIMELINE FILAMENTS
            These pass IN FRONT of Loki's chest, proving genuine physical depth!
            ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          {/* Floating emerald temporal particles crossing in front */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#A8E6A3] shadow-[0_0_10px_#7FCF8A] animate-ping" />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-[#FFB52E] shadow-[0_0_8px_#F5A623] animate-pulse" />
          <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#7FCF8A] opacity-80" />

          {/* Foreground curving SVG energy ribbon crossing Loki's collar */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 380 500">
            <path
              d="M -20 180 Q 120 240, 240 190 T 410 220"
              fill="none"
              stroke={activeVariant.accent}
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity={isLokiHovered ? "0.9" : "0.5"}
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* =========================================================================
            LAYER 6: TVA DIAGNOSTIC TELEMETRY (Hover state readout)
            ========================================================================= */}
        <div
          ref={diagnosticRef}
          className={`absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-[#050706]/95 border text-left text-xs font-mono shadow-[0_0_25px_rgba(127,207,138,0.4)] pointer-events-none transition-all duration-300 min-w-[290px] ${
            isLokiHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
          }`}
          style={{ borderColor: activeVariant.accent }}
        >
          <div className="flex items-center gap-2 text-[10px] font-bold" style={{ color: activeVariant.accent }}>
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeVariant.accent }} />
            <span>{activeVariant.name}</span>
          </div>
          <div className="text-[11px] text-tva-bone mt-0.5">
            CLASSIFICATION: <span className="font-bold" style={{ color: activeVariant.accent }}>{activeVariant.title}</span>
          </div>
          <div className="text-[9px] text-tva-bone-dim tracking-wider uppercase mt-0.5">
            {activeVariant.telemetry}
          </div>
        </div>
      </div>
    </aside>
  );
}
