import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { playGlitchSound, playTerminalBeep, playTemporalPulse, playAccessGrantedSound } from '../utils/soundEffects';

/**
 * MULTIVERSE TIMELINE SYSTEM: TRANSITION FROM MANY TO ONE
 * 
 * Concept:
 * - Default state: Living, chaotic multiverse with MANY oscillating strings (10-12 active timelines)
 *   spanning across the chart with diverse frequencies, speeds, colors, and amplitudes.
 * - Upon Diagnostic Scan:
 *   Smoothly transitions from MANY STRINGS into ONE CENTRAL SACRED TIMELINE STRING,
 *   with delicate, hair-like thin strings left gently propagating around it.
 * - Both states continuously oscillate, move, and undulate at 60 FPS.
 * - User can re-trigger or toggle anytime.
 */

const ROOT_BRANCHES = [
  { id: 'branch-sacred-616', name: 'SACRED-616', color: '#7FCF8A', yRatio: 0.50, speed: 1.4, freq: 0.020, amp: 14, phase: 0.0, forkRatio: 0.18, subTendril: { yOff: 8, phase: 1.2 } },
  { id: 'branch-yggdrasil-01', name: 'YGGDRASIL-T1', color: '#38EF7D', yRatio: 0.30, speed: 1.7, freq: 0.022, amp: 18, phase: 0.9, forkRatio: 0.20, subTendril: { yOff: -12, phase: 2.1 } },
  { id: 'branch-chrono-gold', name: 'LOOM-GOLD', color: '#FFD700', yRatio: 0.65, speed: 1.6, freq: 0.018, amp: 17, phase: 2.3, forkRatio: 0.22, subTendril: { yOff: 10, phase: 0.5 } },
  { id: 'branch-tva-amber-01', name: 'TVA-AMBER-01', color: '#F5A623', yRatio: 0.18, speed: 2.0, freq: 0.024, amp: 20, phase: 1.5, forkRatio: 0.24, subTendril: { yOff: -8, phase: 3.4 } },
  { id: 'branch-tva-amber-02', name: 'TVA-AMBER-02', color: '#FFB800', yRatio: 0.82, speed: 1.8, freq: 0.019, amp: 22, phase: 3.1, forkRatio: 0.23, subTendril: { yOff: 12, phase: 1.8 } },
  { id: 'branch-emerald-core', name: 'EMERALD-FLUX', color: '#A8E6A3', yRatio: 0.42, speed: 1.5, freq: 0.021, amp: 15, phase: 4.2, forkRatio: 0.25, subTendril: { yOff: -6, phase: 4.0 } },
  { id: 'branch-deep-forest', name: 'TIMELINE-NULL', color: '#538662', yRatio: 0.88, speed: 2.2, freq: 0.026, amp: 19, phase: 5.1, forkRatio: 0.27, subTendril: null },
  { id: 'branch-stories-root', name: 'STORIES-ROOT', color: '#7FCF8A', yRatio: 0.12, speed: 1.9, freq: 0.023, amp: 21, phase: 0.4, forkRatio: 0.22, subTendril: null },
];

export default function SystemStatus({ onSetCursor }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isStabilized, setIsStabilized] = useState(false);
  const [scanLog, setScanLog] = useState('MULTIVERSE TIMELINE BRANCHES OSCILLATING // PLANT-ROOT TENDRILS DETECTED');
  const [displayedStability, setDisplayedStability] = useState(0);
  const [displayedVariants, setDisplayedVariants] = useState(0);
  const [isEntered, setIsEntered] = useState(false);

  // Convergence parameter (0 = Full Multiverse Plant Roots, 1 = Converged to One Sacred Timeline)
  const targetConvergenceRef = useRef(0);
  const currentConvergenceRef = useRef(0);
  const scanProgressRef = useRef(0);
  const isScanningRef = useRef(false);

  useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning]);

  // Section Entry Observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isEntered) {
        setIsEntered(true);
      }
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEntered]);

  // Telemetry Numbers Counter
  useEffect(() => {
    if (!isEntered) return;

    const targetStability = isStabilized ? 99.9 : 67.5;
    const targetVariants = isStabilized ? 1 : 428;
    const duration = 1200;
    const startTime = performance.now();

    const updateCounters = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayedStability(parseFloat((ease * targetStability).toFixed(1)));
      setDisplayedVariants(Math.floor(ease * targetVariants));

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        setDisplayedStability(targetStability);
        setDisplayedVariants(targetVariants);
      }
    };

    const animId = requestAnimationFrame(updateCounters);
    return () => cancelAnimationFrame(animId);
  }, [isEntered, isStabilized]);

  /**
   * HIGH-PERFORMANCE TVA SCREEN CANVAS ENGINE
   * - Un-stabilized: Single mother string enters from left and bifurcates like plant roots
   * - Stabilized: Smoothly collapses into ONE glowing Sacred Timeline matching TVA monitor
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = false;
    let t = 0;
    let w = (canvas.width = canvas.offsetWidth || 340);
    let h = (canvas.height = canvas.offsetHeight || 180);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth || 340;
      h = canvas.height = canvas.offsetHeight || 180;
    };
    window.addEventListener('resize', handleResize);

    const photons = ROOT_BRANCHES.map((b, idx) => ({
      branchId: b.id,
      prog: (idx * 0.14) % 1,
      speed: 0.22 + (idx % 3) * 0.05,
    }));

    const render = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      t += 0.024;
      ctx.clearRect(0, 0, w, h);

      // STRICT CONTAINER CLIPPING
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.clip();

      // Smooth exponential convergence lerp (0.0 = Plant Root Multiverse, 1.0 = Single TVA Timeline)
      currentConvergenceRef.current += (targetConvergenceRef.current - currentConvergenceRef.current) * 0.055;
      const conv = currentConvergenceRef.current;

      const centerY = h * 0.5;

      // 1. TVA CRT Monitor Grid & Redline Thresholds
      ctx.strokeStyle = conv > 0.6 ? 'rgba(127, 207, 138, 0.09)' : 'rgba(245, 166, 35, 0.07)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < w; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // REDLINE CRITICAL THRESHOLDS (Top & Bottom variance limits)
      const redlineTop = h * 0.12;
      const redlineBottom = h * 0.88;
      ctx.strokeStyle = 'rgba(255, 70, 70, 0.35)';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(0, redlineTop);
      ctx.lineTo(w, redlineTop);
      ctx.moveTo(0, redlineBottom);
      ctx.lineTo(w, redlineBottom);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center baseline guide with calibrated sigma ticks
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.22)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '7.5px monospace';
      ctx.fillStyle = 'rgba(255, 90, 90, 0.65)';
      ctx.fillText('+2σ REDLINE', 6, redlineTop - 3);
      ctx.fillText('-2σ REDLINE', 6, redlineBottom + 9);
      ctx.fillStyle = 'rgba(127, 207, 138, 0.55)';
      ctx.fillText('0σ [SACRED]', 6, centerY - 3);

      // ==============================================================
      // 2. SINGLE ROOT STRING (LEFT ENTRANCE: x = 0 to fork point)
      // All strings originate from this single luminous mother cord!
      // ==============================================================
      const commonForkX = w * 0.20;

      // Draw the single root trunk entering from the left edge
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= commonForkX + 2; x += 2) {
        const trunkWave = Math.sin(x * 0.022 - t * 1.3) * (5 * (1 - conv) + 9.5 * conv)
                        + Math.cos(x * 0.012 + t * 0.7) * (2 * (1 - conv) + 3.5 * conv);
        const y = centerY + trunkWave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // Outer trunk aura
      ctx.strokeStyle = '#7FCF8A';
      ctx.lineWidth = 4.2;
      ctx.globalAlpha = 0.40;
      ctx.stroke();

      // Sharp trunk core
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = 0.95;
      ctx.stroke();
      ctx.restore();

      // Luminous origin dot on far left edge
      ctx.save();
      const dotY = centerY + Math.sin(-t * 1.3) * (5 * (1 - conv) + 9.5 * conv);
      ctx.beginPath();
      ctx.arc(0, dotY, 4.0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.95;
      ctx.fill();
      ctx.restore();

      // ==============================================================
      // 3. PLANT-ROOT BRANCHES PROPAGATING OUTWARD FROM THE SINGLE ROOT
      // When conv -> 1, they smoothly collapse into the central Sacred Timeline!
      // ==============================================================
      ROOT_BRANCHES.forEach((b) => {
        const forkX = w * b.forkRatio;
        const targetFinalY = h * b.yRatio;

        // In stabilized state, targetFinalY collapses smoothly to centerY
        const activeTargetY = targetFinalY * (1 - conv) + centerY * conv;
        const branchAmp = (b.amp * (1 - conv) + 9.5 * conv);
        const branchFreq = (b.freq * (1 - conv) + 0.020 * conv);
        const branchSpeed = (b.speed * (1 - conv) + 1.2 * conv);

        const branchAlpha = Math.max(0.08, (0.75 * (1 - conv) + 0.22 * conv));

        ctx.save();

        // 3a. Main Root Branch
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          let y = centerY;
          if (x <= forkX) {
            // Still in the shared trunk before branching
            const trunkWave = Math.sin(x * 0.022 - t * 1.3) * (5 * (1 - conv) + 9.5 * conv)
                            + Math.cos(x * 0.012 + t * 0.7) * (2 * (1 - conv) + 3.5 * conv);
            y = centerY + trunkWave;
          } else {
            // Organic plant-root sigmoid branching
            const p = (x - forkX) / (w - forkX);
            const smoothP = p * p * (3 - 2 * p);
            const baseY = centerY + (activeTargetY - centerY) * smoothP;

            // Root wave oscillation
            const wave = Math.sin(x * branchFreq - t * branchSpeed + b.phase) * branchAmp
                       + Math.cos(x * (branchFreq * 0.5) + t * 0.6) * (branchAmp * 0.35);
            y = baseY + wave * Math.sin(p * Math.PI * 0.5);
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Branch Outer Glow (Zero shadowBlur - pure alpha double stroke)
        ctx.strokeStyle = b.color;
        ctx.lineWidth = (2.2 * (1 - conv) + 1.2 * conv);
        ctx.globalAlpha = branchAlpha * 0.45;
        ctx.stroke();

        // Branch Core Filament
        ctx.strokeStyle = conv > 0.5 ? '#A8E6A3' : b.color;
        ctx.lineWidth = (1.2 * (1 - conv) + 0.8 * conv);
        ctx.globalAlpha = branchAlpha;
        ctx.stroke();

        // 3b. Fine Sub-tendrils / Rootlets (splitting off organically like root hairs)
        if (b.subTendril && conv < 0.6) {
          const subForkX = forkX + (w - forkX) * 0.42;
          ctx.beginPath();
          for (let x = subForkX; x <= w; x += 4) {
            const subP = (x - subForkX) / (w - subForkX);
            const p = (x - forkX) / (w - forkX);
            const smoothP = p * p * (3 - 2 * p);
            const parentBaseY = centerY + (activeTargetY - centerY) * smoothP;
            const subY = parentBaseY + (b.subTendril.yOff * subP)
                       + Math.sin(x * 0.035 - t * 2.0 + b.subTendril.phase) * (6 * subP);

            if (x === subForkX) ctx.moveTo(x, parentBaseY);
            else ctx.lineTo(x, subY);
          }
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 0.7;
          ctx.globalAlpha = (1 - conv / 0.6) * 0.35;
          ctx.stroke();
        }

        // Branch Reality Node on Right Edge (fades when stabilized)
        if (conv < 0.55) {
          const p = 1.0;
          const endBaseY = activeTargetY;
          const endWave = Math.sin(w * branchFreq - t * branchSpeed + b.phase) * branchAmp;
          const endY = endBaseY + endWave;

          ctx.beginPath();
          ctx.arc(w - 10, endY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = b.color;
          ctx.globalAlpha = (1 - conv / 0.55) * 0.85;
          ctx.fill();

          ctx.font = '6.5px monospace';
          ctx.fillStyle = b.color;
          ctx.fillText(b.name, w - 58, endY - 3);
        }

        ctx.restore();
      });

      // ==============================================================
      // 4. THE STABILIZED ONE SACRED TIMELINE (TVA SCREEN COMPOSITION)
      // Matches the Perception VFX breakdown: Luminous horizontal stream with micro-tendrils
      // ==============================================================
      if (conv > 0.25) {
        const unifiedAlpha = (conv - 0.25) / 0.75; // 0 to 1

        ctx.save();

        // 4a. Outer Radiant Glow Ribbon
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, '#7FCF8A');
        grad.addColorStop(0.35, '#F5A623');
        grad.addColorStop(0.70, '#38EF7D');
        grad.addColorStop(1, '#A8E6A3');

        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = centerY + Math.sin(x * 0.020 - t * 1.2) * 9.5
                            + Math.cos(x * 0.010 + t * 0.7) * 3.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 6.0;
        ctx.globalAlpha = unifiedAlpha * 0.45;
        ctx.stroke();

        // 4b. Core Brilliant White Sacred Filament
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = centerY + Math.sin(x * 0.020 - t * 1.2) * 9.5
                            + Math.cos(x * 0.010 + t * 0.7) * 3.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.4;
        ctx.globalAlpha = unifiedAlpha * 0.95;
        ctx.stroke();

        // 4c. DELICATE HAIR-LIKE MICRO-TENDRILS WEAVING AROUND THE ONE TIMELINE
        // Authentic TVA screen detail
        const hairFilaments = [
          { phase: 0.5, freq: 0.038, amp: 4.2, color: '#7FCF8A', yOff: -5 },
          { phase: 2.1, freq: 0.032, amp: 4.8, color: '#F5A623', yOff: 5 },
          { phase: 3.6, freq: 0.044, amp: 3.8, color: '#38EF7D', yOff: -9 },
          { phase: 4.9, freq: 0.035, amp: 5.2, color: '#FFD700', yOff: 8 },
        ];

        hairFilaments.forEach((hair) => {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 4) {
            const mainY = centerY + Math.sin(x * 0.020 - t * 1.2) * 9.5;
            const hairWave = Math.sin(x * hair.freq - t * 1.6 + hair.phase) * hair.amp;
            const y = mainY + hair.yOff + hairWave;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = hair.color;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = unifiedAlpha * 0.40;
          ctx.stroke();
        });

        // 4d. Traveling quantum sparks along the stabilized Sacred Timeline
        [0.12, 0.42, 0.72].forEach((spOff) => {
          const spProg = ((t * 0.24 + spOff) % 1);
          const spX = spProg * w;
          const spY = centerY + Math.sin(spX * 0.020 - t * 1.2) * 9.5
                              + Math.cos(spX * 0.010 + t * 0.7) * 3.5;

          ctx.beginPath();
          ctx.arc(spX, spY, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = unifiedAlpha * 0.95;
          ctx.fill();
        });

        ctx.restore();
      }

      // ==============================================================
      // 5. TRAVELING PARTICLES IN MULTIVERSE STATE
      // ==============================================================
      if (conv < 0.75) {
        photons.forEach((p, idx) => {
          const b = ROOT_BRANCHES[idx] || ROOT_BRANCHES[0];
          p.prog = (p.prog + 0.004 * p.speed) % 1;
          const px = p.prog * w;
          const forkX = w * b.forkRatio;
          const targetFinalY = h * b.yRatio;
          const activeTargetY = targetFinalY * (1 - conv) + centerY * conv;
          const branchAmp = (b.amp * (1 - conv) + 9.5 * conv);
          const branchFreq = (b.freq * (1 - conv) + 0.020 * conv);

          let py = centerY;
          if (px <= forkX) {
            py = centerY + Math.sin(px * 0.022 - t * 1.3) * (5 * (1 - conv) + 9.5 * conv);
          } else {
            const pNorm = (px - forkX) / (w - forkX);
            const smoothP = pNorm * pNorm * (3 - 2 * pNorm);
            const baseY = centerY + (activeTargetY - centerY) * smoothP;
            py = baseY + Math.sin(px * branchFreq - t * b.speed + b.phase) * branchAmp * Math.sin(pNorm * Math.PI * 0.5);
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, 2.0, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = (1 - conv * 0.7) * 0.85;
          ctx.fill();
          ctx.restore();
        });
      }

      // ==============================================================
      // 6. SCANNER SWEEP EFFECT DURING STABILIZATION
      // ==============================================================
      if (isScanningRef.current) {
        scanProgressRef.current = Math.min(1.0, scanProgressRef.current + 0.014);
        const scanX = scanProgressRef.current * w;

        const scanGrad = ctx.createLinearGradient(scanX - 25, 0, scanX + 25, 0);
        scanGrad.addColorStop(0, 'rgba(127, 207, 138, 0)');
        scanGrad.addColorStop(0.5, 'rgba(245, 166, 35, 0.45)');
        scanGrad.addColorStop(1, 'rgba(127, 207, 138, 0)');

        ctx.fillStyle = scanGrad;
        ctx.fillRect(scanX - 25, 0, 50, h);

        ctx.strokeStyle = '#F5A623';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, h);
        ctx.stroke();
      }

      ctx.restore(); // END CONTAINER CLIPPING
      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * CINEMATIC DIAGNOSTIC SCAN: TRANSITIONS FROM MANY TO ONE
   */
  const handleRunScan = () => {
    if (isScanning) return;

    if (isStabilized) {
      // Toggle back to Multiverse state so user can experience it repeatedly
      playGlitchSound();
      targetConvergenceRef.current = 0.0;
      setIsStabilized(false);
      setScanLog('MULTIVERSE UNLOCKED // 10 LIVING TIMELINES OSCILLATING');
      return;
    }

    setIsScanning(true);
    scanProgressRef.current = 0;
    playGlitchSound();
    setScanLog('[SWEEP ACTIVE] SCANNING 10 MULTIVERSE REALITIES // INITIATING CONVERGENCE');

    // Sweep scan across and begin smooth convergence to ONE
    setTimeout(() => {
      targetConvergenceRef.current = 1.0;
      playTerminalBeep();
      setScanLog('[CONVERGENCE] HARMONIZING STRANDS INTO ONE SACRED TIMELINE...');
    }, 450);

    setTimeout(() => {
      playTemporalPulse();
    }, 1400);

    setTimeout(() => {
      setIsScanning(false);
      setIsStabilized(true);
      playAccessGrantedSound();
      setScanLog('DIAGNOSTIC COMPLETE // ALL STRANDS CONVERGED TO ONE SACRED TIMELINE');
    }, 2400);
  };

  return (
    <section id="status" ref={containerRef} className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      <div className="p-6 sm:p-8 bg-[#0D0F12] border border-[#7FCF8A]/40 relative overflow-hidden shadow-2xl">
        
        {/* CRT Scanline */}
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        {/* Scan Line Crossing Panel on Page Entry */}
        {isEntered && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7FCF8A]/80 to-transparent shadow-[0_0_15px_#7FCF8A] animate-tva-sweep pointer-events-none z-30" />
        )}

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-tva-border/60 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              06 // TVA SYSTEM STATUS MONITOR
            </span>
            <span className="text-[10px] text-tva-bone-dim hidden sm:inline">
              // MAINFRAME SYS-616-NCR // {isStabilized ? 'SACRED TIMELINE STABILIZED' : 'MULTIVERSE ACTIVE'}
            </span>
          </div>

          <button
            onClick={handleRunScan}
            disabled={isScanning}
            onMouseEnter={() => onSetCursor?.('button')}
            onMouseLeave={() => onSetCursor?.('default')}
            className={`flex items-center gap-2 px-3.5 py-1.5 border text-xs uppercase transition-all duration-300 cursor-pointer ${
              isScanning
                ? 'border-tva-amber bg-tva-amber/10 text-tva-amber shadow-[0_0_15px_rgba(245,166,35,0.4)]'
                : isStabilized
                ? 'border-[#7FCF8A] bg-[#7FCF8A]/10 text-[#7FCF8A] hover:bg-[#7FCF8A]/20'
                : 'border-tva-border hover:border-tva-amber text-tva-bone-dim hover:text-tva-amber'
            }`}
          >
            <RefreshCw size={12} className={isScanning ? 'animate-spin text-tva-amber' : ''} />
            <span>
              {isScanning
                ? 'STABILIZING MULTIVERSE...'
                : isStabilized
                ? 'RESET MULTIVERSE ANALYSIS'
                : 'STABILIZE THE MULTIVERSE'}
            </span>
          </button>
        </div>

        {/* Main Content Grid: Multiverse Canvas & Readouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Timeline Matrix Canvas (7 cols) - STRICTLY CONTAINED WITH overflow-hidden */}
          <div className="lg:col-span-7 border border-[#7FCF8A]/40 bg-[#07080A] p-4 relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] text-tva-bone-dim mb-2 select-none">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-pulse" />
                <span>MULTIVERSE TIMELINE BRANCHING MATRIX</span>
              </span>
              <span className={isScanning ? 'text-tva-amber font-bold animate-pulse' : isStabilized ? 'text-emerald-400 font-bold' : 'text-[#7FCF8A]'}>
                {isScanning ? 'STABILIZING MULTIVERSE...' : isStabilized ? 'CONVERGED: ONE SACRED TIMELINE' : 'MULTIVERSE: PLANT-ROOT TENDRILS'}
              </span>
            </div>
            
            {/* Canvas strictly contained inside relative container with overflow-hidden */}
            <div className="w-full h-44 relative overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="mt-2 text-[10px] text-tva-bone-dim flex justify-between font-mono select-none">
              <span>{isStabilized ? 'TIMELINE: SACRED-616 [ONE]' : 'MULTIVERSE: PLANT-ROOT BRANCHES'}</span>
              <span>PROPAGATION: {isStabilized ? 'HAIR-LIKE TENDRILS' : 'ROOT TENDRILS'}</span>
              <span>STATUS: NOMINAL</span>
            </div>
          </div>

          {/* Telemetry Metrics Readouts (5 cols) */}
          <div className={`lg:col-span-5 grid grid-cols-2 gap-3 text-xs transition-all duration-700 ${
            isEntered ? 'opacity-100 blur-none translate-y-0' : 'opacity-40 blur-xs translate-y-2'
          }`}>
            
            {/* Card 1: Temporal Database */}
            <div className="p-3 bg-[#111417] border border-[#7FCF8A]/40 relative group hover:border-[#7FCF8A] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-tva-bone-dim block">TEMPORAL DATABASE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5 mt-1.5">
                <CheckCircle size={13} /> ONLINE
              </span>
              <div className="text-[8px] text-tva-bone-dim/70 mt-1 font-mono">SYNC: 100.0%</div>
            </div>

            {/* Card 2: Timeline Stability */}
            <div className="p-3 bg-[#111417] border border-[#F5A623]/40 relative group hover:border-[#F5A623] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-tva-bone-dim block">TIMELINE STABILITY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
              </div>
              <span className="text-tva-amber font-bold tracking-wider block mt-1.5 text-sm">
                {displayedStability}%
              </span>
              <div className="text-[8px] text-tva-bone-dim/70 mt-1 font-mono">LOOM FLUX: {isStabilized ? 'UNIFIED' : 'STABLE'}</div>
            </div>

            {/* Card 3: Variant Processing */}
            <div className="p-3 bg-[#111417] border border-[#7FCF8A]/40 relative group hover:border-[#7FCF8A] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-tva-bone-dim block">VARIANT PROCESSING</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
              </div>
              <span className="text-tva-bone font-bold tracking-wider block mt-1.5 text-sm">
                {isStabilized ? 'SYNCHRONIZED (1/1)' : `ACTIVE (${displayedVariants}/500)`}
              </span>
              <div className="text-[8px] text-tva-bone-dim/70 mt-1 font-mono">QUEUE: EXPEDIENT</div>
            </div>

            {/* Card 4: Security Level */}
            <div className="p-3 bg-[#111417] border border-tva-amber/40 relative group hover:border-tva-amber transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-tva-bone-dim block">SECURITY LEVEL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
              </div>
              <span className="text-tva-amber font-bold tracking-wider block mt-1.5 text-sm">
                LEVEL 5 CLASSIFIED
              </span>
              <div className="text-[8px] text-tva-bone-dim/70 mt-1 font-mono">PROTOCOL: OMEGA</div>
            </div>

            {/* Terminal Diagnostic Scan Stream */}
            <div className="col-span-2 p-3 bg-[#0A0D0F] border border-tva-border/70 font-mono text-[11px] text-tva-bone">
              <span className="text-tva-amber font-bold mr-2">&gt;&gt;</span>
              <span className="text-tva-bone-dim">{scanLog}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
