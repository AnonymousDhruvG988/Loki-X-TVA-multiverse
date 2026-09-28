import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playClickSound, playTemporalPulse, playBranchLockSound, setSoundEnabled, getSoundEnabled } from '../utils/soundEffects';
import { getAssetUrl } from '../utils/assets';

export default function Footer({ onSetCursor }) {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [endingStep, setEndingStep] = useState(1);
  const [isBranchHovered, setIsBranchHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // References for multi-layer dimensional multiverse canvases
  const viewportRef = useRef(null);
  const deepCanvasRef = useRef(null);
  const foreCanvasRef = useRef(null);
  const parallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const hoveredRef = useRef(false);
  const pulseRef = useRef(false);

  // Synchronize state to refs for high-speed RAF loop
  useEffect(() => {
    hoveredRef.current = isBranchHovered;
  }, [isBranchHovered]);

  useEffect(() => {
    pulseRef.current = pulseActive;
  }, [pulseActive]);

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    playClickSound();
  };

  const handleBranchClick = () => {
    playTemporalPulse();
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 900);
  };

  const handleBranchHover = () => {
    setIsBranchHovered(true);
    playBranchLockSound();
    onSetCursor?.('timeline-node');
  };

  // Section 47 & Directive 40: Final Footer Animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setEndingStep((prev) => (prev % 4) + 1);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // MULTI-LAYER DIMENSIONAL MULTIVERSE CANVAS ENGINE
  useEffect(() => {
    const deepCanvas = deepCanvasRef.current;
    const foreCanvas = foreCanvasRef.current;
    if (!deepCanvas || !foreCanvas) return;

    const deepCtx = deepCanvas.getContext('2d', { alpha: true });
    const foreCtx = foreCanvas.getContext('2d', { alpha: true });
    if (!deepCtx || !foreCtx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = deepCanvas.parentElement.getBoundingClientRect();
      width = deepCanvas.width = foreCanvas.width = rect.width || 800;
      height = deepCanvas.height = foreCanvas.height = rect.height || 300;
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // LAYER 3: Distant universe stars & temporal dust particles
    const starCount = 45;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.5,
        speedY: -Math.random() * 0.15 - 0.05,
        phase: Math.random() * Math.PI * 2,
        color: ['#7FCF8A', '#A8E6A3', '#F5A623', '#FFFFFF', '#00F0FF'][Math.floor(Math.random() * 5)],
      });
    }

    // LAYER 2: Midground branching timelines configuration
    const midgroundBranches = [
      // Left side branches emerging from deep space and converging toward center
      { side: -1, yStart: 0.1, yMid: 0.25, color: '#7FCF8A', width: 1.8, amp: 14, speed: 0.8, phase: 0.4, split: true },
      { side: -1, yStart: 0.28, yMid: 0.38, color: '#F5A623', width: 2.0, amp: 18, speed: 1.1, phase: 1.8, split: false },
      { side: -1, yStart: 0.48, yMid: 0.5, color: '#00F0FF', width: 1.6, amp: 12, speed: 0.9, phase: 3.2, split: true },
      { side: -1, yStart: 0.72, yMid: 0.62, color: '#06D6A0', width: 2.2, amp: 20, speed: 0.75, phase: 4.5, split: false },
      { side: -1, yStart: 0.88, yMid: 0.75, color: '#FFB800', width: 1.7, amp: 16, speed: 1.25, phase: 2.1, split: true },

      // Right side branches
      { side: 1, yStart: 0.12, yMid: 0.28, color: '#7FCF8A', width: 2.0, amp: 15, speed: 0.85, phase: 1.2, split: true },
      { side: 1, yStart: 0.32, yMid: 0.42, color: '#B026FF', width: 1.8, amp: 17, speed: 1.15, phase: 2.8, split: false },
      { side: 1, yStart: 0.52, yMid: 0.52, color: '#7FCF8A', width: 2.4, amp: 22, speed: 0.95, phase: 0.0, split: true },
      { side: 1, yStart: 0.70, yMid: 0.65, color: '#F5A623', width: 1.9, amp: 16, speed: 1.05, phase: 4.1, split: true },
      { side: 1, yStart: 0.90, yMid: 0.78, color: '#00F0FF', width: 1.6, amp: 14, speed: 0.7, phase: 5.5, split: false },
    ];

    // LAYER 1: Foreground bright timelines weaving in front of Loki
    const foregroundStrands = [
      { startX: -0.05, startY: 0.18, endX: 1.05, endY: 0.82, c1X: 0.35, c1Y: 0.48, c2X: 0.65, c2Y: 0.54, color: '#7FCF8A', width: 2.8, amp: 22, speed: 1.0, sparkP: 0.1 },
      { startX: -0.05, startY: 0.85, endX: 1.05, endY: 0.22, c1X: 0.38, c1Y: 0.56, c2X: 0.62, c2Y: 0.46, color: '#A8E6A3', width: 2.6, amp: 20, speed: 0.85, sparkP: 0.6 },
      { startX: -0.05, startY: 0.52, endX: 1.05, endY: 0.48, c1X: 0.42, c1Y: 0.42, c2X: 0.58, c2Y: 0.62, color: '#F5A623', width: 3.2, amp: 26, speed: 1.2, sparkP: 0.35 },
      { startX: 0.1, startY: -0.05, endX: 0.9, endY: 1.05, c1X: 0.45, c1Y: 0.52, c2X: 0.55, c2Y: 0.52, color: '#00F0FF', width: 2.2, amp: 18, speed: 0.9, sparkP: 0.8 },
    ];

    let t = 0;
    let animId = null;

    const render = () => {
      const dt = prefersReducedMotion ? 0.005 : 0.018;
      t += dt;

      // Parallax smooth interpolation
      const p = parallaxRef.current;
      p.x += (p.targetX - p.x) * 0.08;
      p.y += (p.targetY - p.y) * 0.08;

      const isHov = hoveredRef.current;
      const isPulse = pulseRef.current;

      deepCtx.clearRect(0, 0, width, height);
      foreCtx.clearRect(0, 0, width, height);

      const cx = width * 0.5 + p.x * 6;
      const cy = height * 0.5 + p.y * 4;

      // ==========================================
      // LAYER 3: DEEP MULTIVERSE (Temporal Tunnel & Cosmic Fog)
      // ==========================================
      // 3a. Deep Cosmic Radial Tunnel Rings
      deepCtx.save();
      const numRings = 7;
      for (let r = 1; r <= numRings; r++) {
        const ringProg = ((r / numRings) + t * 0.035) % 1;
        const rx = ringProg * (width * 0.55);
        const ry = ringProg * (height * 0.65);
        const ringAlpha = Math.sin(ringProg * Math.PI) * (isHov ? 0.35 : 0.18);

        deepCtx.beginPath();
        deepCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        deepCtx.strokeStyle = r % 2 === 0 ? '#7FCF8A' : '#F5A623';
        deepCtx.lineWidth = 1;
        deepCtx.globalAlpha = ringAlpha;
        if (r % 3 === 0) {
          deepCtx.setLineDash([6, 8]);
        } else {
          deepCtx.setLineDash([]);
        }
        deepCtx.stroke();
      }
      deepCtx.setLineDash([]);

      // 3b. Volumetric Central Green Energy Nebula behind Loki
      const nebGrad = deepCtx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.42);
      nebGrad.addColorStop(0, isHov ? 'rgba(127, 207, 138, 0.45)' : 'rgba(127, 207, 138, 0.28)');
      nebGrad.addColorStop(0.35, isHov ? 'rgba(36, 92, 70, 0.35)' : 'rgba(23, 63, 50, 0.22)');
      nebGrad.addColorStop(0.7, 'rgba(245, 166, 35, 0.08)');
      nebGrad.addColorStop(1, 'rgba(5, 7, 6, 0)');
      deepCtx.fillStyle = nebGrad;
      deepCtx.globalAlpha = 1;
      deepCtx.fillRect(0, 0, width, height);

      // 3c. Deep Space Drifting Stars & Temporal Particles
      stars.forEach((s) => {
        s.y += s.speedY * dt * 60;
        if (s.y < 0) s.y = 1;

        const starX = s.x * width + Math.sin(t + s.phase) * 8 + p.x * 3;
        const starY = s.y * height + p.y * 2;
        const alpha = (0.3 + Math.sin(t * 2 + s.phase) * 0.25) * (isHov ? 0.9 : 0.6);

        deepCtx.beginPath();
        deepCtx.arc(starX, starY, s.r, 0, Math.PI * 2);
        deepCtx.fillStyle = s.color;
        deepCtx.globalAlpha = Math.max(0.1, alpha);
        deepCtx.fill();
      });

      // 3d. Hundreds of Faint Distant Multiverse Strands (Atmospheric Cosmic Weave)
      deepCtx.strokeStyle = 'rgba(127, 207, 138, 0.12)';
      deepCtx.lineWidth = 0.8;
      for (let i = 0; i < 18; i++) {
        const offY = ((i / 18) * height + Math.sin(t * 0.5 + i) * 12);
        deepCtx.beginPath();
        deepCtx.moveTo(-20, offY);
        deepCtx.bezierCurveTo(
          width * 0.3, offY + Math.sin(t * 0.8 + i) * 20,
          width * 0.7, offY - Math.cos(t * 0.6 + i) * 20,
          width + 20, offY
        );
        deepCtx.stroke();
      }
      deepCtx.restore();

      // ==========================================
      // LAYER 2: MIDGROUND TIMELINES (Curved Branching & Convergence)
      // ==========================================
      deepCtx.save();
      midgroundBranches.forEach((b, idx) => {
        const wave = Math.sin(t * b.speed + b.phase) * b.amp;
        const startX = b.side === -1 ? -30 : width + 30;
        const startY = b.yStart * height;
        const midX = b.side === -1 ? width * 0.28 : width * 0.72;
        const midY = b.yMid * height + wave;
        const targetX = cx + b.side * (width * 0.12);
        const targetY = cy + Math.sin(t * 1.5 + idx) * 15;

        // Primary midground branch
        deepCtx.beginPath();
        deepCtx.moveTo(startX, startY);
        deepCtx.bezierCurveTo(midX, midY, cx + b.side * 60, targetY, targetX, targetY);
        deepCtx.strokeStyle = b.color;
        deepCtx.lineWidth = isHov ? b.width * 1.3 : b.width;
        deepCtx.globalAlpha = isHov ? 0.85 : 0.55;
        deepCtx.shadowColor = b.color;
        deepCtx.shadowBlur = isHov ? 14 : 6;
        deepCtx.stroke();

        // Optional branching daughter strand
        if (b.split) {
          const splitStartX = (startX + midX) * 0.5;
          const splitStartY = (startY + midY) * 0.5;
          const splitEndX = midX + b.side * 40;
          const splitEndY = midY + (idx % 2 === 0 ? 35 : -35);

          deepCtx.beginPath();
          deepCtx.moveTo(splitStartX, splitStartY);
          deepCtx.quadraticCurveTo(splitStartX + b.side * 20, splitStartY, splitEndX, splitEndY);
          deepCtx.strokeStyle = b.color;
          deepCtx.lineWidth = b.width * 0.65;
          deepCtx.globalAlpha = isHov ? 0.6 : 0.35;
          deepCtx.setLineDash([4, 4]);
          deepCtx.stroke();
          deepCtx.setLineDash([]);

          // Tiny convergence node at daughter endpoint
          deepCtx.beginPath();
          deepCtx.arc(splitEndX, splitEndY, 2, 0, Math.PI * 2);
          deepCtx.fillStyle = '#FFFFFF';
          deepCtx.globalAlpha = 0.8;
          deepCtx.fill();
        }

        // Midground traveling photon along branch
        const pulseT = ((t * 0.3 * b.speed + b.phase * 0.15) % 1);
        const u = 1 - pulseT;
        const px = u * u * startX + 2 * u * pulseT * midX + pulseT * pulseT * targetX;
        const py = u * u * startY + 2 * u * pulseT * midY + pulseT * pulseT * targetY;

        deepCtx.beginPath();
        deepCtx.arc(px, py, 2.5, 0, Math.PI * 2);
        deepCtx.fillStyle = '#FFFFFF';
        deepCtx.shadowColor = b.color;
        deepCtx.shadowBlur = 10;
        deepCtx.globalAlpha = 0.9;
        deepCtx.fill();
      });
      deepCtx.restore();

      // ==========================================
      // LAYER 1: FOREGROUND TIMELINES (Weaving In Front of Loki)
      // ==========================================
      foreCtx.save();
      // Chromatic aberration shift during pulseActive
      const caShift = isPulse ? Math.sin(t * 30) * 4 : 0;

      foregroundStrands.forEach((f, idx) => {
        const wave = Math.sin(t * f.speed + idx * 1.5) * f.amp;
        const sx = f.startX * width;
        const sy = f.startY * height;
        const ex = f.endX * width;
        const ey = f.endY * height;

        // Control points shift with parallax and dynamic wave
        const c1x = f.c1X * width + p.x * 12;
        const c1y = f.c1Y * height + wave + p.y * 8;
        const c2x = f.c2X * width - p.x * 12;
        const c2y = f.c2Y * height - wave * 0.7 - p.y * 8;

        // Chromatic split if shockwave is active
        if (caShift !== 0) {
          foreCtx.beginPath();
          foreCtx.moveTo(sx - caShift, sy);
          foreCtx.bezierCurveTo(c1x - caShift, c1y, c2x - caShift, c2y, ex - caShift, ey);
          foreCtx.strokeStyle = 'rgba(255, 51, 102, 0.6)';
          foreCtx.lineWidth = f.width;
          foreCtx.stroke();
        }

        // Luminous core curve
        foreCtx.beginPath();
        foreCtx.moveTo(sx, sy);
        foreCtx.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey);
        foreCtx.strokeStyle = isHov ? '#FFFFFF' : f.color;
        foreCtx.lineWidth = isHov ? f.width * 1.4 : f.width;
        foreCtx.globalAlpha = isHov ? 0.95 : 0.8;
        foreCtx.shadowColor = f.color;
        foreCtx.shadowBlur = isHov ? 24 : 12;
        foreCtx.stroke();

        // High-energy traveling photon packet passing in front
        const sparkSpeed = (0.22 + (isHov ? 0.2 : 0)) * f.speed;
        f.sparkP = (f.sparkP + dt * sparkSpeed) % 1;
        const u = 1 - f.sparkP;
        const u2 = u * u;
        const u3 = u2 * u;
        const p1 = f.sparkP;
        const p2 = p1 * p1;
        const p3 = p2 * p1;

        const spX = u3 * sx + 3 * u2 * p1 * c1x + 3 * u * p2 * c2x + p3 * ex;
        const spY = u3 * sy + 3 * u2 * p1 * c1y + 3 * u * p2 * c2y + p3 * ey;

        foreCtx.beginPath();
        foreCtx.arc(spX, spY, isHov ? 4.5 : 3.0, 0, Math.PI * 2);
        foreCtx.fillStyle = '#FFFFFF';
        foreCtx.shadowColor = f.color;
        foreCtx.shadowBlur = isHov ? 20 : 12;
        foreCtx.globalAlpha = 1.0;
        foreCtx.fill();
      });
      foreCtx.restore();

      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    let isVisible = false;
    const vp = viewportRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    });
    if (vp) observer.observe(vp);

    const handleMouseMove = (e) => {
      if (!viewportRef.current) return;
      const rect = viewportRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      parallaxRef.current.targetX = Math.max(-1, Math.min(1, normX));
      parallaxRef.current.targetY = Math.max(-1, Math.min(1, normY));
    };

    const handleMouseLeave = () => {
      parallaxRef.current.targetX = 0;
      parallaxRef.current.targetY = 0;
    };

    if (vp) {
      vp.addEventListener('mousemove', handleMouseMove);
      vp.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (vp) {
        vp.removeEventListener('mousemove', handleMouseMove);
        vp.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <footer className="relative bg-[#040605] border-t border-[#1D2B22] text-tva-bone-dim font-mono text-xs z-10 overflow-hidden select-none">
      
      {/* 46 — Thin green timeline traveling across the footer */}
      <div className="w-full h-0.5 bg-[#090D0B] overflow-hidden relative">
        <div className="w-2/5 h-full bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_15px_#7FCF8A] animate-pulse" />
      </div>

      {/* 47 — EYE-CATCHING CINEMATIC YGGDRASIL BRANCH CONVERGENCE & GOD OF STORIES THRONE */}
      <div className="relative py-12 px-4 sm:px-8 border-b border-[#1D2B22]/60 overflow-hidden flex flex-col items-center justify-center text-center">
        
        {/* Top Telemetry Header */}
        <div className="flex items-center gap-2 text-[10px] text-[#7FCF8A] uppercase tracking-widest mb-3">
          <Sparkles size={13} className="animate-spin-slow text-[#F5A623]" />
          <span>YGGDRASIL MULTIVERSE // TEMPORAL HORIZON CONVERGENCE</span>
        </div>

        {/* Grand Eye-Catching Multi-Layer Multiverse Viewport */}
        <div
          ref={viewportRef}
          onClick={handleBranchClick}
          onMouseEnter={handleBranchHover}
          onMouseLeave={() => {
            setIsBranchHovered(false);
            onSetCursor?.('default');
          }}
          className={`w-full max-w-4xl h-56 sm:h-72 lg:h-80 relative overflow-hidden my-4 border transition-all duration-700 cursor-pointer shadow-2xl rounded-sm ${
            isBranchHovered
              ? 'border-[#7FCF8A] shadow-[0_0_55px_rgba(127,207,138,0.4)] scale-[1.01]'
              : 'border-[#245C46]/60 bg-[#050806] shadow-[0_0_35px_rgba(0,0,0,0.85)]'
          }`}
        >
          {/* CRT Scanline and vignette overlay */}
          <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none z-30" />
          <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />

          {/* Background Cosmic Multiverse Tree Image */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen scale-110 filter brightness-110 contrast-125 transition-transform duration-1000">
            <img
              src={getAssetUrl('assets/images/multiverse_tree_branches.png')}
              alt="Cosmic Multiverse Tree"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Shockwave Ping on Click */}
          {pulseActive && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-[#7FCF8A] animate-ping pointer-events-none z-40" />
          )}

          {/* LAYER 3 & LAYER 2: DEEP MULTIVERSE & MIDGROUND CANVAS */}
          <canvas ref={deepCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

          {/* CENTRAL GOD OF STORIES ON THE THRONE EMBEDDED INSIDE THE MULTIVERSE */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              
              {/* Volumetric Emerald & Golden Core Sunburst Aura behind Loki */}
              <div
                className={`absolute w-60 sm:w-80 h-60 sm:h-80 rounded-full pointer-events-none blur-3xl transition-all duration-700 ${
                  isBranchHovered
                    ? 'bg-gradient-to-tr from-[#7FCF8A] via-[#245C46] to-[#F5A623] opacity-85 scale-125'
                    : 'bg-gradient-to-tr from-[#7FCF8A]/40 via-[#173F32]/50 to-[#F5A623]/20 opacity-55 scale-105'
                }`}
              />

              {/* LOKI GOD OF STORIES ON THE THRONE ARTWORK EMBEDDED SEAMLESSLY */}
              <div className="relative w-44 sm:w-56 md:w-64 h-36 sm:h-44 md:h-48 rounded-lg overflow-hidden border border-[#7FCF8A]/40 shadow-[0_0_35px_rgba(127,207,138,0.5)] animate-float-slow">
                <img
                  src={getAssetUrl('assets/images/loki_god_on_throne_multiverse.png')}
                  alt="Loki God of Stories on Throne Weaving Multiverse Strings"
                  className={`w-full h-full object-cover object-center filter contrast-125 brightness-110 saturate-125 transition-transform duration-700 ${
                    isBranchHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 62%, rgba(0,0,0,0.6) 85%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 62%, rgba(0,0,0,0.6) 85%, transparent 100%)',
                  }}
                />
                
                {/* Luminous emerald heart-glow overlay pulse */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#7FCF8A] blur-sm animate-ping opacity-70" />
                
                {/* HUD Telemetry Marker */}
                <div className="absolute top-1.5 left-2 text-[8px] font-mono text-[#7FCF8A] tracking-widest bg-black/80 px-1.5 py-0.5 border border-[#7FCF8A]/40">
                  LOKI // GOD OF STORIES
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 1: FOREGROUND CANVAS WEAVING IN FRONT OF LOKI */}
          <canvas ref={foreCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-25" />

          {/* Telemetry Footer Badge Inside Viewport */}
          <div className="absolute bottom-2.5 inset-x-0 z-30 flex justify-center pointer-events-none">
            <span className="px-3 py-1 bg-[#050706]/90 border border-tva-border/60 text-[9px] text-tva-bone-dim tracking-widest uppercase flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
              <span>TIMELINE STATUS: <strong className="text-[#7FCF8A]">100% SYNCHRONIZED</strong> // 10^14 REALITIES SUSTAINED</span>
            </span>
          </div>
        </div>

        {/* 47 — Cinematic Ending Progression Text */}
        <div className="min-h-[64px] flex flex-col items-center justify-center space-y-1">
          {endingStep === 1 && (
            <div className="animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#7FCF8A] uppercase">
                &gt;&gt; TIMELINE STABLE &lt;&lt;
              </span>
              <div className="text-[10px] text-tva-bone-dim tracking-widest mt-1">
                ALL SACRED BRANCHES TEMPORARILY SYNCHRONIZED
              </div>
            </div>
          )}

          {endingStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-2xl sm:text-3xl tracking-widest text-[#E8E2D0] uppercase">
                TIME VARIANCE AUTHORITY
              </h2>
              <div className="text-[10px] text-[#F5A623] tracking-widest mt-1">
                TVA CONTROL DIVISION // CASE #TVA-2026
              </div>
            </div>
          )}

          {endingStep === 3 && (
            <div className="animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#FF3366] uppercase">
                SESSION STATUS: TERMINATED
              </span>
              <div className="text-[10px] text-tva-bone-dim tracking-widest mt-1">
                FOR ALL TIME. ALWAYS.
              </div>
            </div>
          )}

          {endingStep === 4 && (
            <div className="animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#7FCF8A] uppercase">
                UNTIL THE NEXT BRANCH...
              </span>
              <div className="text-[10px] text-[#F5A623] tracking-widest mt-1">
                TVA CLOCK STOPPED // TIMELINE STABLE
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN FOOTER DIRECTORY (5 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Organization & Event info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-[#7FCF8A]/40 bg-[#090D0B] flex items-center justify-center">
                <span className="text-[#7FCF8A] font-display font-bold text-sm">GFG</span>
              </div>
              <div className="text-tva-bone font-bold text-sm tracking-wider">
                GEEKSFORGEEKS STUDENT CHAPTER
                <span className="text-[10px] text-[#F5A623] block">
                  BENNETT UNIVERSITY // SECTOR 616-NCR
                </span>
              </div>
            </div>

            <p className="text-xs text-tva-bone-dim leading-relaxed max-w-sm font-body">
              A multidimensional hackathon engineered to challenge, test, and celebrate student developers across India. The Sacred Timeline welcomes your submission.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="tva-stamp tva-stamp-green text-[9px]">
                CASE: #VP-2026
              </span>
              <span className="tva-stamp tva-stamp-amber text-[9px]">
                TIMELINE: STABLE
              </span>
              <span className="px-2 py-0.5 border border-[#1D2B22] text-[10px] text-tva-bone-dim bg-[#090D0B]">
                TZ: +05:30 IST
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Timelines */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              TVA CHRONOLOGY
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { href: '#overview', name: 'Overview // Hero' },
                { href: '#briefing', name: 'Case Dossier 26229' },
                { href: '#branches', name: 'Timeline Tracks' },
                { href: '#artifacts', name: 'Infinity Stones' },
                { href: '#schedule', name: 'Temporal Sequence' },
                { href: '#contact', name: 'Temporal Channels' },
                { href: '#registration', name: 'Request Clearance' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    onClick={() => playClickSound()}
                    onMouseEnter={() => onSetCursor?.('link')}
                    onMouseLeave={() => onSetCursor?.('default')}
                    className="hover:text-[#7FCF8A] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#7FCF8A] text-[10px]">&gt;</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Institution Details */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              SECTOR HQ
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.bennett.edu.in"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onSetCursor?.('link')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="hover:text-tva-amber transition-colors flex items-center gap-1"
                >
                  <span>Bennett University</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.geeksforgeeks.org"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onSetCursor?.('link')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="hover:text-tva-amber transition-colors flex items-center gap-1"
                >
                  <span>GeeksforGeeks Portal</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <span className="text-tva-bone-dim">Plot Nos 8-11, TechZone 2</span>
              </li>
              <li>
                <span className="text-tva-bone-dim">Greater Noida, UP 201310</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Terminal Sound & Dispatch */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              TVA CONTROLS
            </div>
            
            {/* Section 12: Sound Toggle SOUND ◉ ON / SOUND ○ OFF */}
            <div className="pt-1">
              <button
                onClick={handleToggleSound}
                onMouseEnter={() => onSetCursor?.('link')}
                onMouseLeave={() => onSetCursor?.('default')}
                className={`w-full py-2 px-3 border text-xs tracking-wider uppercase transition-all flex items-center justify-between ${
                  soundOn
                    ? 'border-[#7FCF8A] text-[#7FCF8A] bg-[#7FCF8A]/10 shadow-[0_0_12px_rgba(127,207,138,0.2)]'
                    : 'border-tva-border text-tva-bone-dim hover:text-tva-bone bg-[#080B09]'
                }`}
              >
                <span>TVA AUDIO</span>
                <span className="font-bold flex items-center gap-1.5">
                  {soundOn ? (
                    <>
                      <span>◉ ON</span>
                      <Volume2 size={13} />
                    </>
                  ) : (
                    <>
                      <span>○ OFF</span>
                      <VolumeX size={13} />
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-tva-bone-dim leading-relaxed space-y-1">
              <div>Direct Transmission:</div>
              <a href="mailto:gfg@bennett.edu.in" className="text-[#7FCF8A] hover:underline block">
                gfg@bennett.edu.in
              </a>
              <div className="pt-1 flex items-center gap-2">
                <a
                  href="https://github.com/AnonymousDhruvG988"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] hover:text-[#7FCF8A] transition-colors flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink size={10} />
                </a>
                <span>&bull;</span>
                <a
                  href="https://www.linkedin.com/in/dhruv-goswami-96415a435"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] hover:text-[#F5A623] transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Epilogue Bar */}
        <div className="border-t border-[#1D2B22]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-tva-bone-dim">
          <div className="flex items-center gap-3">
            <span className="text-tva-amber font-bold">FOR ALL TIME. ALWAYS.</span>
            <span>&bull;</span>
            <span>TIME VARIANCE AUTHORITY // TEMPORAL CONTROL DIVISION</span>
          </div>

          <div>
            &copy; 2026 GeeksForGeeks Student Chapter, Bennett University.
          </div>
        </div>
      </div>
    </footer>
  );
}
