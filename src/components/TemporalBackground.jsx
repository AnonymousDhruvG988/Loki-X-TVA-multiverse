import React, { useEffect, useRef } from 'react';
import { globalPointer } from '../utils/pointer';

/**
 * LIVING TEMPORAL BACKGROUND — LOKI & TVA THEME ONLY
 * 
 * Performance & Aesthetics:
 * - Reduced to 5 elegant, cinematic strands (clean and uncluttered all the way to the end)
 * - Pure Loki & TVA Palette: Sacred Emerald (#7FCF8A), TVA Amber (#F5A623), God of Stories Green (#38EF7D), Loom Gold (#FFD700), Deep Forest (#245C46)
 * - Zero GPU-stalling shadowBlur: High-efficiency multi-layer alpha rendering for 60 FPS performance
 * - Smooth magnetic hover: Nearest strand gently deflects toward the pointer with Gaussian spring dynamics
 * - Fully spans beyond all screen bounds (starts < -100px, ends > width + 100px)
 */

export default function TemporalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const TOTAL_PARTICLES = isMobile ? 22 : 45;

    // Cosmic temporal particles pool (TVA & Loki colors only)
    const particles = [];
    const particleColors = ['#7FCF8A', '#38EF7D', '#F5A623', '#FFD700', '#245C46', '#E8E2D0'];

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: -Math.random() * 0.28 - 0.05,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    // Scroll progress tracking
    let currentScroll = 0;
    let targetScroll = 0;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = totalHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / totalHeight)) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animId = null;
    let isVisible = true;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let t = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NUM_PTS = 10;

    /**
     * 13 CINEMATIC LOKI & TVA STRANDS (FULLY RANDOMIZED TRAJECTORIES — NO CENTER CONVERGENCE)
     * Enters from all boundaries: top, bottom, left, right across different planes & heights
     * Strictly Loki & TVA palette: Sacred Emerald, TVA Amber, God of Stories Green, Loom Gold, Deep Forest, Citrine, Mint
     */
    const strandDefinitions = [
      // 0. SACRED ROOT (Sacred Emerald Green) — Upper Horizontal Wave across top 14%
      {
        id: 'sacred-root',
        color: '#7FCF8A',
        strokeColor: 'rgba(127, 207, 138, 0.45)',
        baseWidth: 2.5,
        speed: 0.85,
        freq: 7.5,
        amp: 20,
        phase: 0.0,
        getCoords: (p, w, h) => ({
          x: -120 + p * (w + 240),
          y: h * 0.14 + Math.sin(p * Math.PI * 1.5) * (h * 0.05),
        }),
        perp: { x: 0.0, y: 1.0 },
      },
      // 1. TVA CHRONO AMBER (Warm Amber) — Lower Horizontal Wave across bottom 15%
      {
        id: 'strand-amber-lower',
        color: '#F5A623',
        strokeColor: 'rgba(245, 166, 35, 0.40)',
        baseWidth: 2.3,
        speed: 1.05,
        freq: 8.2,
        amp: 22,
        phase: 1.8,
        getCoords: (p, w, h) => ({
          x: -120 + p * (w + 240),
          y: h * 0.85 - Math.cos(p * Math.PI * 1.2) * (h * 0.05),
        }),
        perp: { x: 0.0, y: -1.0 },
      },
      // 2. GOD OF STORIES GREEN — Gentle Top-Left to Mid-Right Diagonal (High Plane, y < 0.35h)
      {
        id: 'strand-stories-green',
        color: '#38EF7D',
        strokeColor: 'rgba(56, 239, 125, 0.38)',
        baseWidth: 2.2,
        speed: 0.92,
        freq: 8.8,
        amp: 20,
        phase: 3.2,
        getCoords: (p, w, h) => ({
          x: -100 + p * (w + 220),
          y: h * 0.08 + p * (h * 0.20) + Math.sin(p * Math.PI) * (h * 0.04),
        }),
        perp: { x: -0.22, y: 0.97 },
      },
      // 3. TEMPORAL LOOM GOLDEN WEAVE — Swooping Bottom-Left to Lower-Right Diagonal (Low Plane, y > 0.70h)
      {
        id: 'strand-gold-loom',
        color: '#FFD700',
        strokeColor: 'rgba(255, 215, 0, 0.42)',
        baseWidth: 2.2,
        speed: 1.10,
        freq: 8.6,
        amp: 22,
        phase: 4.5,
        getCoords: (p, w, h) => ({
          x: -100 + p * (w + 220),
          y: h * 0.74 + p * (h * 0.14) - Math.sin(p * Math.PI) * (h * 0.04),
        }),
        perp: { x: 0.18, y: 0.98 },
      },
      // 4. DEEP FOREST S-ARCH — S-curved Ribbon entering Mid-Right across Upper-Center
      {
        id: 'strand-deep-forest',
        color: '#245C46',
        strokeColor: 'rgba(36, 92, 70, 0.45)',
        baseWidth: 2.1,
        speed: 0.78,
        freq: 7.2,
        amp: 24,
        phase: 2.4,
        getCoords: (p, w, h) => ({
          x: (w + 120) - p * (w + 240),
          y: h * 0.29 + Math.sin(p * Math.PI * 2) * (h * 0.06),
        }),
        perp: { x: 0.15, y: 0.98 },
      },
      // 5. CITRINE FLANK CRESCENT — Curved Vertical Arc on Right Sector
      {
        id: 'strand-citrine-arc',
        color: '#FFB800',
        strokeColor: 'rgba(255, 184, 0, 0.38)',
        baseWidth: 2.0,
        speed: 0.98,
        freq: 8.0,
        amp: 20,
        phase: 1.2,
        getCoords: (p, w, h) => ({
          x: (w * 0.88) - Math.sin(p * Math.PI) * (w * 0.08),
          y: -100 + p * (h + 200),
        }),
        perp: { x: 0.98, y: -0.19 },
      },
      // 6. YGGDRASIL ROOT CRESCENT — Curved Vertical Arc on Left Sector
      {
        id: 'strand-yggdrasil-arc',
        color: '#A8E6A3',
        strokeColor: 'rgba(168, 230, 163, 0.36)',
        baseWidth: 1.9,
        speed: 0.88,
        freq: 8.5,
        amp: 20,
        phase: 5.1,
        getCoords: (p, w, h) => ({
          x: (w * 0.12) + Math.sin(p * Math.PI) * (w * 0.08),
          y: -100 + p * (h + 200),
        }),
        perp: { x: -0.98, y: 0.19 },
      },
      // 7. CHRONO BRONZE — High-angle Diagonal entering Top-Mid down to Mid-Right
      {
        id: 'strand-chrono-bronze',
        color: '#D97706',
        strokeColor: 'rgba(217, 119, 6, 0.38)',
        baseWidth: 2.0,
        speed: 1.15,
        freq: 9.0,
        amp: 21,
        phase: 0.7,
        getCoords: (p, w, h) => ({
          x: (w * 0.62) + p * (w * 0.45),
          y: -100 + p * (h * 0.60 + 100),
        }),
        perp: { x: 0.85, y: -0.52 },
      },
      // 8. SACRED CELESTIAL FILAMENT — Low-angle Diagonal entering Mid-Left down to Bottom-Mid
      {
        id: 'strand-celestial-filament',
        color: '#E8E2D0',
        strokeColor: 'rgba(232, 226, 208, 0.40)',
        baseWidth: 2.0,
        speed: 1.02,
        freq: 8.4,
        amp: 20,
        phase: 4.1,
        getCoords: (p, w, h) => ({
          x: -100 + p * (w * 0.52 + 100),
          y: h * 0.60 + p * (h * 0.44 + 100),
        }),
        perp: { x: -0.65, y: 0.76 },
      },
      // 9. TEMPORAL MINT SWOOP (NEW 1) — Gentle Arc across Top-Mid to Far-Right
      {
        id: 'strand-mint-swoop',
        color: '#34D399',
        strokeColor: 'rgba(52, 211, 153, 0.38)',
        baseWidth: 2.1,
        speed: 0.95,
        freq: 8.2,
        amp: 22,
        phase: 2.0,
        getCoords: (p, w, h) => ({
          x: (w * 0.28) + p * (w * 0.80),
          y: -100 + p * (h * 0.24 + 100) + Math.sin(p * Math.PI) * (h * 0.06),
        }),
        perp: { x: -0.32, y: 0.94 },
      },
      // 10. TVA FLAME AMBER (NEW 2) — Undulating Lower-Mid S-Curve
      {
        id: 'strand-flame-amber',
        color: '#EA580C',
        strokeColor: 'rgba(234, 88, 12, 0.36)',
        baseWidth: 2.0,
        speed: 1.08,
        freq: 8.7,
        amp: 23,
        phase: 3.7,
        getCoords: (p, w, h) => ({
          x: -100 + p * (w + 200),
          y: h * 0.68 + p * (h * 0.06) + Math.sin(p * Math.PI * 2.5) * (h * 0.05),
        }),
        perp: { x: 0.0, y: -1.0 },
      },
      // 11. BRIGHT LIME AURORA (NEW 3) — Steep Arc from Top-Mid down to Left-Mid
      {
        id: 'strand-lime-aurora',
        color: '#6EE7B7',
        strokeColor: 'rgba(110, 231, 183, 0.38)',
        baseWidth: 2.0,
        speed: 0.90,
        freq: 8.0,
        amp: 20,
        phase: 1.5,
        getCoords: (p, w, h) => ({
          x: (w * 0.38) - p * (w * 0.48 + 100),
          y: -100 + p * (h * 0.56 + 100),
        }),
        perp: { x: -0.75, y: -0.66 },
      },
      // 12. SOVEREIGN GOLD TETHER (NEW 4) — Bottom-Mid Upward Curve to Right-Center
      {
        id: 'strand-storyteller-gold',
        color: '#FCD34D',
        strokeColor: 'rgba(252, 211, 77, 0.40)',
        baseWidth: 2.2,
        speed: 1.12,
        freq: 8.5,
        amp: 22,
        phase: 4.8,
        getCoords: (p, w, h) => ({
          x: (w * 0.55) + p * (w * 0.50),
          y: (h + 100) - p * (h * 0.55 + 100) - Math.sin(p * Math.PI) * (h * 0.05),
        }),
        perp: { x: 0.72, y: 0.69 },
      },
    ];

    // Initialize physical spring-interpolated control points
    const strands = strandDefinitions.map((s, idx) => {
      const points = [];
      for (let i = 0; i < NUM_PTS; i++) {
        const p = i / (NUM_PTS - 1);
        const base = s.getCoords(p, width, height);
        points.push({
          p,
          x: base.x,
          y: base.y,
          vx: 0,
          vy: 0,
        });
      }
      return {
        ...s,
        index: idx,
        points,
        hoverIntensity: 0,
        currentAlpha: 0,
        sparkP: (s.phase * 0.2) % 1,
      };
    });

    // Helper: Draw smooth Catmull-Rom to Cubic Bézier spline (C1/C2 continuous)
    const drawSpline = (c, pts) => {
      if (pts.length < 2) return;
      c.moveTo(pts[0].x, pts[0].y);

      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? 0 : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    // Helper: Calculate point along spline at parameter param in [0, 1]
    const getSplinePoint = (pts, param) => {
      const n = pts.length - 1;
      const f = Math.max(0, Math.min(0.9999, param)) * n;
      const i = Math.floor(f);
      const u = f - i;

      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      const u2 = u * u;
      const u3 = u2 * u;
      const omt = 1 - u;
      const omt2 = omt * omt;
      const omt3 = omt2 * omt;

      return {
        x: omt3 * p1.x + 3 * omt2 * u * cp1x + 3 * omt * u2 * cp2x + u3 * p2.x,
        y: omt3 * p1.y + 3 * omt2 * u * cp1y + 3 * omt * u2 * cp2y + u3 * p2.y,
      };
    };

    const render = () => {
      if (!isVisible) return;
      const dt = prefersReducedMotion ? 0.006 : 0.016;
      t += dt;

      currentScroll += (targetScroll - currentScroll) * 0.08;
      ctx.clearRect(0, 0, width, height);

      const mouseX = globalPointer.targetX;
      const mouseY = globalPointer.targetY;

      // ==============================================================
      // 1. SCROLL-LINKED REVEAL & TAIL-END TAPERING (9 STRANDS BALANCED)
      // ==============================================================
      let closestStrand = null;
      let minDistance = 999999;
      let closestPtP = 0.5;

      strands.forEach((s) => {
        let targetAlpha = 0;

        if (s.id === 'sacred-root') {
          targetAlpha = currentScroll < 0.60 
            ? (0.65 + currentScroll * 0.15) 
            : Math.max(0.12, 0.74 - (currentScroll - 0.60) * 1.4);
        } else if (s.id === 'strand-gold-loom') {
          targetAlpha = currentScroll >= 0.35 ? Math.min(0.68, (currentScroll - 0.35) * 2.5) : 0;
        } else if (s.id === 'strand-amber-lower') {
          if (currentScroll >= 0.10 && currentScroll < 0.65) {
            targetAlpha = Math.min(0.55, (currentScroll - 0.10) * 3);
          } else if (currentScroll >= 0.65) {
            targetAlpha = Math.max(0.0, 0.55 - (currentScroll - 0.65) * 3.5);
          }
        } else if (s.id === 'strand-stories-green') {
          if (currentScroll >= 0.20 && currentScroll < 0.72) {
            targetAlpha = Math.min(0.58, (currentScroll - 0.20) * 3);
          } else if (currentScroll >= 0.72) {
            targetAlpha = Math.max(0.0, 0.58 - (currentScroll - 0.72) * 3.0);
          }
        } else if (s.id === 'strand-deep-forest') {
          if (currentScroll < 0.55) {
            targetAlpha = Math.min(0.40, (0.55 - currentScroll) * 2.5);
          }
        } else if (s.id === 'strand-citrine-arc') {
          if (currentScroll >= 0.25 && currentScroll < 0.75) {
            targetAlpha = Math.min(0.50, (currentScroll - 0.25) * 3.5);
          } else if (currentScroll >= 0.75) {
            targetAlpha = Math.max(0.0, 0.50 - (currentScroll - 0.75) * 3.5);
          }
        } else if (s.id === 'strand-yggdrasil-arc') {
          if (currentScroll >= 0.30 && currentScroll < 0.70) {
            targetAlpha = Math.min(0.48, (currentScroll - 0.30) * 3.5);
          } else if (currentScroll >= 0.70) {
            targetAlpha = Math.max(0.0, 0.48 - (currentScroll - 0.70) * 3.5);
          }
        } else if (s.id === 'strand-chrono-bronze') {
          if (currentScroll >= 0.15 && currentScroll < 0.60) {
            targetAlpha = Math.min(0.42, (currentScroll - 0.15) * 3);
          } else if (currentScroll >= 0.60) {
            targetAlpha = Math.max(0.0, 0.42 - (currentScroll - 0.60) * 4.0);
          }
        } else if (s.id === 'strand-celestial-filament') {
          if (currentScroll >= 0.45 && currentScroll < 0.85) {
            targetAlpha = Math.min(0.45, (currentScroll - 0.45) * 2.8);
          } else if (currentScroll >= 0.85) {
            targetAlpha = Math.max(0.0, 0.45 - (currentScroll - 0.85) * 3.0);
          }
        } else if (s.id === 'strand-mint-swoop') {
          if (currentScroll >= 0.12 && currentScroll < 0.68) {
            targetAlpha = Math.min(0.46, (currentScroll - 0.12) * 3.2);
          } else if (currentScroll >= 0.68) {
            targetAlpha = Math.max(0.0, 0.46 - (currentScroll - 0.68) * 3.5);
          }
        } else if (s.id === 'strand-flame-amber') {
          if (currentScroll >= 0.22 && currentScroll < 0.76) {
            targetAlpha = Math.min(0.44, (currentScroll - 0.22) * 3.0);
          } else if (currentScroll >= 0.76) {
            targetAlpha = Math.max(0.0, 0.44 - (currentScroll - 0.76) * 3.5);
          }
        } else if (s.id === 'strand-lime-aurora') {
          if (currentScroll < 0.50) {
            targetAlpha = Math.min(0.42, (0.50 - currentScroll) * 2.5);
          }
        } else if (s.id === 'strand-storyteller-gold') {
          if (currentScroll >= 0.40) {
            targetAlpha = Math.min(0.55, (currentScroll - 0.40) * 2.2);
          }
        }

        s.currentAlpha += (targetAlpha - s.currentAlpha) * 0.08;

        if (s.currentAlpha > 0.04) {
          for (let i = 0; i < NUM_PTS; i++) {
            const pt = s.points[i];
            const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
            if (dist < minDistance) {
              minDistance = dist;
              closestStrand = s;
              closestPtP = pt.p;
            }
          }
        }
      });

      const isNearStrand = minDistance < 180;

      strands.forEach((s) => {
        const isThisClosest = isNearStrand && closestStrand && closestStrand.id === s.id;
        const targetIntensity = isThisClosest ? Math.min(1.0, Math.pow(1 - minDistance / 180, 1.4) * 1.5) : 0.0;
        s.hoverIntensity += (targetIntensity - s.hoverIntensity) * 0.12;
      });

      // ==============================================================
      // 2. RENDER LOKI & TVA STRANDS (FLUID WAVE PLUCK HOVER ANIMATION)
      // ==============================================================
      strands.forEach((s) => {
        if (s.currentAlpha < 0.015) return;

        const waveSpeed = t * s.speed;
        const waveAmp = s.amp + Math.sin(t * 0.6 + s.phase) * 5;

        const stiffness = 0.095;
        const damping = 0.82;

        for (let i = 0; i < NUM_PTS; i++) {
          const pt = s.points[i];
          const base = s.getCoords(pt.p, width, height);

          // Natural harmonic flow
          const harmonic = Math.sin(pt.p * s.freq + waveSpeed) * waveAmp
                         + Math.cos(pt.p * (s.freq * 0.5) - waveSpeed * 0.65) * (waveAmp * 0.38);

          const restX = base.x + s.perp.x * harmonic;
          const restY = base.y + s.perp.y * harmonic;

          let targetX = restX;
          let targetY = restY;

          // FLUID TEMPORAL STRING PLUCK: Harmonic ripple + Gaussian deflection
          if (s.hoverIntensity > 0.01 && !prefersReducedMotion) {
            const dp = pt.p - closestPtP;
            // Gaussian influence packet along the string
            const pWeight = Math.exp(-(dp * dp) / (2 * 0.22 * 0.22));
            const edgePin = Math.sin(pt.p * Math.PI); // Pin ends outside viewport

            // Traveling ripple wave created by the touch
            const ripple = Math.sin(dp * 16 - t * 4.5) * (18 * s.hoverIntensity * pWeight);

            const dx = mouseX - restX;
            const dy = mouseY - restY;
            const d = Math.hypot(dx, dy) || 1;
            const pullDistance = Math.min(38, s.hoverIntensity * 38);

            targetX = restX + ((dx / d) * pullDistance + s.perp.x * ripple) * pWeight * edgePin;
            targetY = restY + ((dy / d) * pullDistance + s.perp.y * ripple) * pWeight * edgePin;
          }

          const ax = (targetX - pt.x) * stiffness;
          const ay = (targetY - pt.y) * stiffness;
          pt.vx = (pt.vx + ax) * damping;
          pt.vy = (pt.vy + ay) * damping;
          pt.x += pt.vx;
          pt.y += pt.vy;
        }

        const renderAlpha = Math.min(1.0, s.currentAlpha * (0.8 + s.hoverIntensity * 0.25));

        // 2a. Wide Outer Aura (Zero shadowBlur - pure alpha multi-stroke)
        ctx.save();
        ctx.beginPath();
        drawSpline(ctx, s.points);
        ctx.strokeStyle = s.strokeColor;
        ctx.lineWidth = (s.baseWidth + s.hoverIntensity * 1.5) * 2.8;
        ctx.globalAlpha = Math.min(0.55, renderAlpha * (0.24 + s.hoverIntensity * 0.40));
        ctx.stroke();

        // 2b. Core Filament
        ctx.beginPath();
        drawSpline(ctx, s.points);
        ctx.strokeStyle = s.hoverIntensity > 0.6 ? '#FFFFFF' : s.color;
        ctx.lineWidth = s.baseWidth + s.hoverIntensity * 0.7;
        ctx.globalAlpha = renderAlpha;
        ctx.stroke();
        ctx.restore();

        // 2c. Traveling quantum spark packet
        const sparkSpeed = (0.16 + s.hoverIntensity * 0.28) * s.speed;
        s.sparkP = (s.sparkP + dt * sparkSpeed) % 1;
        const sparkCoord = getSplinePoint(s.points, s.sparkP);

        ctx.save();
        ctx.beginPath();
        ctx.arc(sparkCoord.x, sparkCoord.y, 2.2 + s.hoverIntensity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.min(1.0, renderAlpha * 1.15);
        ctx.fill();
        ctx.restore();
      });

      // ==============================================================
      // 3. AMBIENT PARTICLES (LIGHT & SMOOTH)
      // ==============================================================
      const activeParticleCount = Math.floor(12 + currentScroll * (TOTAL_PARTICLES - 12));

      for (let i = 0; i < activeParticleCount; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
        const mouseBoost = distToMouse < 90 ? (1 - distToMouse / 90) * 0.35 : 0;

        const currentAlpha = p.baseAlpha + Math.sin(t * 2 + p.x) * 0.12 + mouseBoost;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(0.85, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (mouseBoost > 0 ? 0.4 : 0), 0, Math.PI * 2);
        ctx.fill();
      }

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Cinematic TVA Void Gradient Atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 85% 15%, rgba(245, 166, 35, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 12% 45%, rgba(36, 92, 70, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 82%, rgba(127, 207, 138, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(23, 63, 50, 0.08) 0%, transparent 70%),
            #050706
          `,
        }}
      />

      {/* 2. Micro Archival Noise & Scanlines */}
      <div className="absolute inset-0 tva-noise opacity-25" />
      <div className="absolute inset-0 crt-scanlines opacity-12" />

      {/* 3. Restrained TVA Geometric Machinery in Upper Corner */}
      <div className="absolute -top-32 -right-32 w-[550px] h-[550px] pointer-events-none opacity-15 animate-spin-very-slow origin-center">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#245C46" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#F5A623" strokeWidth="0.6" strokeDasharray="12 6" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#173F32" strokeWidth="1.0" />
        </svg>
      </div>

      {/* 4. Unified Hardware-Accelerated Multiverse Strings & Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
