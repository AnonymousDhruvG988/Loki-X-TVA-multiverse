import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle2, Radio, Zap, Activity, Terminal } from 'lucide-react';
import {
  playClickSound,
  playTerminalBeep,
  playContactPulse,
  playAccessGrantedSound,
  playBranchLockSound,
  playGlitchSound,
} from '../utils/soundEffects';

const CHANNELS = [
  {
    id: 'github',
    name: 'GITHUB',
    url: 'https://github.com/AnonymousDhruvG988',
    secCode: 'SEC-01 // CODE REPOSITORY',
    status: 'ACTIVE',
    channelType: 'CODE REPOSITORY',
    clearance: 'PUBLIC',
    timelineSector: 'EARTH-616 // T-REPOSITORIES',
    coords: 'BRANCH-988.ALPHA.01',
    frequency: '1420.405 MHz',
    color: '#7FCF8A',
    glowColor: 'rgba(127, 207, 138, 0.4)',
    targetYRatio: 0.16,
    speed: 1.8,
    freq: 2.2,
    amp: 16,
    phase: 0.2,
    description: 'Access AnonymousDhruvG988 repositories, Loki × TVA multiverse codebase, and open source commits.',
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/dhruv-goswami-96415a435/',
    secCode: 'SEC-02 // PROFESSIONAL RELAY',
    status: 'ACTIVE',
    channelType: 'PROFESSIONAL RELAY',
    clearance: 'OFFICIAL',
    timelineSector: 'EARTH-199999 // EXECUTIVE RELAY',
    coords: 'RELAY-435.BRAVO.02',
    frequency: '2412.000 MHz',
    color: '#F5A623',
    glowColor: 'rgba(245, 166, 35, 0.4)',
    targetYRatio: 0.39,
    speed: 2.3,
    freq: 2.0,
    amp: 18,
    phase: 1.4,
    description: 'Connect with Dhruv Goswami on LinkedIn to verify credentials, professional network, and project telemetry.',
  },
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    url: 'https://instagram.com',
    secCode: 'SEC-03 // VISUAL TRANSMISSION',
    status: 'ACTIVE',
    channelType: 'VISUAL TRANSMISSION',
    clearance: 'PUBLIC',
    timelineSector: 'SACRED-INSTA // VISUAL FEED',
    coords: 'SURVEILLANCE-77.CHARLIE.03',
    frequency: '5180.250 MHz',
    color: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    targetYRatio: 0.62,
    speed: 2.1,
    freq: 2.4,
    amp: 20,
    phase: 2.8,
    description: 'Real-time photographic surveillance of the 36-hour hackathon arena and backstage incursion.',
  },
  {
    id: 'email',
    name: 'EMAIL',
    url: 'mailto:gfg@bennett.edu.in',
    secCode: 'SEC-04 // DIRECT DISPATCH',
    status: 'MONITORED',
    channelType: 'DIRECT DISPATCH',
    clearance: 'RESTRICTED',
    timelineSector: 'TVA-HQ // SECURE COMMUNIQUE',
    coords: 'DISPATCH-BENNETT.DELTA.04',
    frequency: '8888.888 MHz',
    color: '#38EF7D',
    glowColor: 'rgba(56, 239, 125, 0.4)',
    targetYRatio: 0.85,
    speed: 1.6,
    freq: 1.8,
    amp: 15,
    phase: 4.1,
    description: 'Direct high-clearance transmission dispatch to Bennett University TVA Chapter Command.',
  },
];

/**
 * AUTHENTIC TVA CARRIER WAVE MONITOR (IMAGE 2 STYLE)
 * - Deep CRT dark background with green oscilloscope grid
 * - Redline threshold indicator along the bottom
 * - Small [SACRED] status label on timeline
 * - Glowing white carrier wave with 3 pulsing photon nodes
 * - Braided emerald and amber harmonic tendrils weaving around
 * - Dynamic jitter & chromatic aberration split on glitch
 */
function CarrierWaveMiniMonitor({ channel, isGlitching }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let t = 0;
    const w = (canvas.width = canvas.offsetWidth || 340);
    const h = (canvas.height = canvas.offsetHeight || 64);

    const render = () => {
      t += 0.040;
      ctx.clearRect(0, 0, w, h);

      // Deep CRT Background
      ctx.fillStyle = '#040705';
      ctx.fillRect(0, 0, w, h);

      // 1. Radar / Oscilloscope Grid (Image 2 style)
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.08)';
      ctx.lineWidth = 0.6;
      for (let x = 0; x < w; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 14) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. REDLINE THRESHOLD INDICATOR ALONG BOTTOM (IMAGE 2 STYLE)
      const redlineY = h - 7;
      ctx.strokeStyle = 'rgba(255, 51, 85, 0.45)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(0, redlineY);
      ctx.lineTo(w, redlineY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255, 51, 85, 0.75)';
      ctx.font = '6px "Space Mono", monospace';
      ctx.fillText('REDLINE', 4, h - 2);

      // 3. [SACRED] LABEL (IMAGE 2 STYLE)
      ctx.fillStyle = 'rgba(127, 207, 138, 0.65)';
      ctx.font = '7px "Space Mono", monospace';
      ctx.fillText('[SACRED]', 4, 11);

      // Centerline guide
      const cy = h * 0.48;
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.15)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      const amp = isGlitching ? 16 + Math.random() * 4 : 8.5;
      const jitter = isGlitching ? (Math.random() - 0.5) * 3 : 0;

      // 4. Harmonic Tendril A (Emerald)
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const wave = Math.sin(x * 0.055 - t * 2.4 + 0.8) * (amp * 0.65)
                   + Math.cos(x * 0.02 + t * 1.1) * (amp * 0.3);
        const y = cy + wave + jitter;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#7FCF8A';
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = 0.45;
      ctx.stroke();

      // 5. Harmonic Tendril B (TVA Amber / Gold)
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const wave = Math.sin(x * 0.065 - t * 2.0 + 2.4) * (amp * 0.75);
        const y = cy + wave - jitter;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#F5A623';
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = 0.40;
      ctx.stroke();

      // 6. Broad Luminous Outer Aura of Sacred Carrier Wave
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const wave = Math.sin(x * 0.05 - t * 2.2) * amp
                   + Math.cos(x * 0.022 + t * 0.9) * (amp * 0.35);
        const y = cy + wave + jitter;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isGlitching ? '#F5A623' : channel.color;
      ctx.lineWidth = 4.2;
      ctx.globalAlpha = 0.38;
      ctx.stroke();

      // 7. Core White Filament of Sacred Carrier Wave
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const wave = Math.sin(x * 0.05 - t * 2.2) * amp
                   + Math.cos(x * 0.022 + t * 0.9) * (amp * 0.35);
        const y = cy + wave + jitter;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isGlitching ? '#FFD700' : '#FFFFFF';
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.96;
      ctx.stroke();

      // 8. THREE WHITE NODES ON THE WAVE (IMAGE 2 STYLE)
      [0.22, 0.52, 0.82].forEach((ratio) => {
        const nx = w * ratio;
        const wave = Math.sin(nx * 0.05 - t * 2.2) * amp
                   + Math.cos(nx * 0.022 + t * 0.9) * (amp * 0.35);
        const ny = cy + wave + jitter;

        // Halo
        ctx.beginPath();
        ctx.arc(nx, ny, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = channel.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        // White core dot
        ctx.beginPath();
        ctx.arc(nx, ny, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.98;
        ctx.fill();
      });

      // Glitch Chromatic Slice Flash
      if (isGlitching) {
        ctx.fillStyle = 'rgba(245, 166, 35, 0.15)';
        ctx.fillRect(0, Math.random() * h, w, 2);
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [channel, isGlitching]);

  return <canvas ref={canvasRef} className="w-full h-12 block rounded-xs border border-tva-border/60 bg-[#040705]" />;
}

export default function TemporalContact({ onSetCursor }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [hoveredChannelId, setHoveredChannelId] = useState(null);
  const [displayText, setDisplayText] = useState(CHANNELS[0].name);
  const [sequence, setSequence] = useState([]);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // High-performance canvas and glitch refs
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const activeIdRef = useRef(CHANNELS[0].id);
  const hoveredIdRef = useRef(null);
  const glitchIntervalRef = useRef(null);
  const glitchTimeoutRef = useRef(null);

  useEffect(() => {
    activeIdRef.current = activeChannel.id;
    setDisplayText(activeChannel.name);
  }, [activeChannel]);

  useEffect(() => {
    hoveredIdRef.current = hoveredChannelId;
  }, [hoveredChannelId]);

  useEffect(() => {
    return () => {
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, []);

  // Multiverse Matrix Text Scramble & Glitch Trigger (Fast, crisp, never gets stuck)
  const triggerGlitchEffect = (channel) => {
    if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);

    setIsGlitching(true);
    playGlitchSound();

    const chars = '01#%*&_/?X▲Ω§616';
    let count = 0;
    const targetText = channel.name;

    glitchIntervalRef.current = setInterval(() => {
      count++;
      setDisplayText(
        targetText
          .split('')
          .map((letter, index) => {
            if (index < count - 1) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (count > targetText.length + 2) {
        clearInterval(glitchIntervalRef.current);
        setDisplayText(targetText);
        setIsGlitching(false);
      }
    }, 24);

    glitchTimeoutRef.current = setTimeout(() => {
      clearInterval(glitchIntervalRef.current);
      setDisplayText(targetText);
      setIsGlitching(false);
    }, 200);
  };

  /**
   * LIVING STRINGS: CONVERGES INTO A SINGLE GLOWING MOTHER STRING (IMAGE 2 & 3 STYLE)
   * - CRT monitor grid background with sigma threshold guides
   * - Sinuous, braided mother cord with 4 multi-colored tendrils and white core
   * - Traveling quantum photon beads with glowing halo rings
   * - 60 FPS performance: Zero shadowBlur, multi-pass alpha rendering, IntersectionObserver
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 560);
    let height = (canvas.height = canvas.offsetHeight || 340);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 560;
      height = canvas.height = canvas.offsetHeight || 340;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const weights = {
      github: 1.0,
      linkedin: 0.12,
      instagram: 0.12,
      email: 0.12,
    };

    let t = 0;
    let animId = null;
    let isVisible = false;

    const render = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      const dt = prefersReducedMotion ? 0.006 : 0.018;
      t += dt;

      ctx.clearRect(0, 0, width, height);

      // CRT MONITOR RADAR GRID (AUTHENTIC TVA SCREEN FROM IMAGE 2)
      ctx.save();
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.05)';
      ctx.lineWidth = 0.6;
      for (let x = 0; x < width; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // SINGLE LEFT ORIGIN ATTACHED DIRECTLY TO THE BOX'S LEFT BORDER
      const originX = 0;
      const originY = height * 0.5;

      // Centerline guide
      ctx.save();
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.15)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const activeId = activeIdRef.current;
      const hoveredId = hoveredIdRef.current;

      CHANNELS.forEach((ch) => {
        let target = 0.12;
        if (hoveredId) {
          target = hoveredId === ch.id ? 1.0 : 0.10;
        } else if (activeId) {
          target = activeId === ch.id ? 1.0 : 0.12;
        }
        weights[ch.id] += (target - weights[ch.id]) * 0.09;
      });

      // 1. CELESTIAL ORIGIN NODE ATTACHED TO FAR LEFT
      ctx.save();
      const currentActiveCh = CHANNELS.find((c) => c.id === (hoveredId || activeId)) || CHANNELS[0];
      const aura = ctx.createRadialGradient(originX, originY, 0, originX, originY, 20);
      aura.addColorStop(0, 'rgba(127, 207, 138, 0.8)');
      aura.addColorStop(0.5, 'rgba(245, 166, 35, 0.25)');
      aura.addColorStop(1, 'rgba(5, 7, 6, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(originX, originY, 20, 0, Math.PI * 2);
      ctx.fill();

      // Concentric targeting rings
      ctx.beginPath();
      ctx.arc(originX, originY, 7.5, 0, Math.PI * 2);
      ctx.strokeStyle = currentActiveCh.color;
      ctx.lineWidth = 1.0;
      ctx.globalAlpha = 0.5;
      ctx.stroke();

      // Core singularity dot
      ctx.beginPath();
      ctx.arc(originX, originY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.98;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(originX, originY, 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = currentActiveCh.color;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      // 2. TIMELINE STRANDS: INACTIVE FADE, ACTIVE FORMS BRAIDED MOTHER STRING
      const STEPS = 48;

      CHANNELS.forEach((ch, idx) => {
        const w = weights[ch.id];
        const isFocused = w > 0.45;

        let destX = Math.max(width * 0.45, width - 264);
        let destY = height * ch.targetYRatio;

        const cardEl = cardRefs.current[idx];
        if (cardEl && canvas) {
          const cardRect = cardEl.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          destX = Math.max(width * 0.40, cardRect.left - canvasRect.left);
          destY = (cardRect.top + cardRect.height * 0.5) - canvasRect.top;
        }

        if (!isFocused) {
          // 2a. Inactive Channel: subtle dim guideline
          ctx.save();
          ctx.beginPath();
          for (let i = 0; i <= STEPS; i++) {
            const p = i / STEPS;
            const x = originX + p * (destX - originX);
            const smoothP = p * p * (3 - 2 * p);
            const baseY = originY + (destY - originY) * smoothP;
            const env = Math.sin(p * Math.PI);
            const wave = Math.sin(p * ch.freq - t * ch.speed + ch.phase) * (ch.amp * 0.35);
            const y = baseY + wave * env;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = ch.color;
          ctx.lineWidth = 1.0;
          ctx.globalAlpha = Math.max(0.07, w * 0.8);
          ctx.stroke();
          ctx.restore();

        } else {
          // 2b. Active Channel: Single Glowing Mother String with 4 Braided Filaments (Image 2 & 3)
          ctx.save();

          // 1. Broad Radiant Outer Aura Ribbon
          ctx.beginPath();
          for (let i = 0; i <= STEPS; i++) {
            const p = i / STEPS;
            const x = originX + p * (destX - originX);
            const smoothP = p * p * (3 - 2 * p);
            const baseY = originY + (destY - originY) * smoothP;
            const env = Math.sin(p * Math.PI);

            const waveProg = p * ch.freq - t * ch.speed * 1.25 + ch.phase;
            const wave = Math.sin(waveProg) * (ch.amp * 1.2)
                       + Math.cos(waveProg * 1.4 - t * 0.7) * (ch.amp * 0.35);

            const y = baseY + wave * env;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = ch.color;
          ctx.lineWidth = 7.5 * w;
          ctx.globalAlpha = 0.42 * w;
          ctx.stroke();

          // 2. Intensive Inner Core Glow Ribbon
          ctx.beginPath();
          for (let i = 0; i <= STEPS; i++) {
            const p = i / STEPS;
            const x = originX + p * (destX - originX);
            const smoothP = p * p * (3 - 2 * p);
            const baseY = originY + (destY - originY) * smoothP;
            const env = Math.sin(p * Math.PI);

            const waveProg = p * ch.freq - t * ch.speed * 1.25 + ch.phase;
            const wave = Math.sin(waveProg) * (ch.amp * 1.2)
                       + Math.cos(waveProg * 1.4 - t * 0.7) * (ch.amp * 0.35);

            const y = baseY + wave * env;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = ch.color;
          ctx.lineWidth = 3.8 * w;
          ctx.globalAlpha = 0.88 * w;
          ctx.stroke();

          // 3. Core Brilliant White Singularity Filament
          ctx.beginPath();
          for (let i = 0; i <= STEPS; i++) {
            const p = i / STEPS;
            const x = originX + p * (destX - originX);
            const smoothP = p * p * (3 - 2 * p);
            const baseY = originY + (destY - originY) * smoothP;
            const env = Math.sin(p * Math.PI);

            const waveProg = p * ch.freq - t * ch.speed * 1.25 + ch.phase;
            const wave = Math.sin(waveProg) * (ch.amp * 1.2)
                       + Math.cos(waveProg * 1.4 - t * 0.7) * (ch.amp * 0.35);

            const y = baseY + wave * env;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.1 * w;
          ctx.globalAlpha = 0.98 * w;
          ctx.stroke();

          // 4. Four Braided Multi-colored Tendrils Weaving Around Mother Cord (Image 2 style)
          const tendrilConfigs = [
            { color: '#7FCF8A', yOff: -5, phase: 0.8, freqMul: 1.15 },
            { color: '#F5A623', yOff: 5, phase: 2.2, freqMul: 1.25 },
            { color: '#FFD700', yOff: -8, phase: 3.6, freqMul: 1.10 },
            { color: '#FFFFFF', yOff: 8, phase: 5.0, freqMul: 1.20 },
          ];

          tendrilConfigs.forEach((tendril) => {
            ctx.beginPath();
            for (let i = 0; i <= STEPS; i++) {
              const p = i / STEPS;
              const x = originX + p * (destX - originX);
              const smoothP = p * p * (3 - 2 * p);
              const baseY = originY + (destY - originY) * smoothP;
              const env = Math.sin(p * Math.PI);

              const subWaveProg = p * (ch.freq * tendril.freqMul) - t * (ch.speed * 1.35) + tendril.phase;
              const subWave = Math.sin(subWaveProg) * (ch.amp * 0.8);

              const y = baseY + (tendril.yOff * env) + subWave * env;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = tendril.color;
            ctx.lineWidth = 0.9;
            ctx.globalAlpha = 0.48 * w;
            ctx.stroke();
          });

          // 5. Traveling Quantum Photon Nodes racing down the mother string
          [0.15, 0.50, 0.85].forEach((spOff) => {
            const pulseSpeed = 0.28 * (ch.speed * 0.5);
            const pulseProg = ((t * pulseSpeed + ch.phase + spOff) % 1);
            const px = originX + pulseProg * (destX - originX);
            const smoothProg = pulseProg * pulseProg * (3 - 2 * pulseProg);
            const pBaseY = originY + (destY - originY) * smoothProg;
            const pEnv = Math.sin(pulseProg * Math.PI);

            const pWaveProg = pulseProg * ch.freq - t * ch.speed * 1.25 + ch.phase;
            const pWave = Math.sin(pWaveProg) * (ch.amp * 1.2);
            const py = pBaseY + pWave * pEnv;

            // Halo ring
            ctx.beginPath();
            ctx.arc(px, py, 4.5 * w, 0, Math.PI * 2);
            ctx.fillStyle = ch.color;
            ctx.globalAlpha = 0.50 * w;
            ctx.fill();

            // Core bead
            ctx.beginPath();
            ctx.arc(px, py, 2.4 * w, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = 0.98 * w;
            ctx.fill();
          });

          ctx.restore();
        }

        // Docking node on card border
        ctx.save();
        ctx.beginPath();
        ctx.arc(destX, destY, isFocused ? 5.5 : 3.0, 0, Math.PI * 2);
        ctx.fillStyle = isFocused ? ch.color : '#070A08';
        ctx.strokeStyle = ch.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = isFocused ? 0.98 : 0.40;
        ctx.fill();
        ctx.stroke();

        // Pulsing reticle ring for active node
        if (isFocused) {
          ctx.beginPath();
          ctx.arc(destX, destY, 8.5 + Math.sin(t * 4) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = ch.color;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.6;
          ctx.stroke();
        }
        ctx.restore();
      });

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

  const handleChannelSelect = (channel) => {
    playBranchLockSound();
    playContactPulse();
    setActiveChannel(channel);
    setHoveredChannelId(channel.id);
    triggerGlitchEffect(channel);

    const targetOrder = ['github', 'linkedin', 'instagram', 'email'];
    const nextSeq = [...sequence, channel.id];
    const isValidPrefix = nextSeq.every((id, idx) => id === targetOrder[idx]);

    if (isValidPrefix) {
      if (nextSeq.length === 4) {
        playAccessGrantedSound();
        setIsEasterEggActive(true);
        setSequence([]);
        setTimeout(() => setIsEasterEggActive(false), 3200);
      } else {
        setSequence(nextSeq);
      }
    } else {
      setSequence(channel.id === 'github' ? ['github'] : []);
    }
  };

  const handleChannelHover = (channel) => {
    if (hoveredChannelId === channel.id) return;
    setHoveredChannelId(channel.id);
    setActiveChannel(channel);
    playBranchLockSound();
    onSetCursor?.('link');
    triggerGlitchEffect(channel);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono select-none">
      
      {/* Easter Egg Sequence Success Banner */}
      <AnimatePresence>
        {isEasterEggActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-24 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
          >
            <div className="p-4 bg-[#080B09] border-2 border-[#7FCF8A] text-[#7FCF8A] font-mono text-center shadow-[0_0_30px_#7FCF8A]">
              <div className="text-sm font-bold tracking-[0.25em] flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                <span>&gt;&gt; CONNECTION ESTABLISHED // ALL STRINGS CONVERGED &lt;&lt;</span>
              </div>
              <div className="text-[11px] text-tva-bone-dim mt-1">
                TVA TEMPORAL RELAY SECURED: MULTIVERSE BROADCAST OPEN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border/60 pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <Radio size={16} />
            <span>SCENE 07 // TEMPORAL COMMUNICATIONS & TRANSMISSION</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            OPEN A TEMPORAL CHANNEL
          </h2>
          <p className="text-xs sm:text-sm text-tva-bone-dim max-w-2xl mt-1 font-body leading-relaxed">
            The Loom unfolds into distinct transmission filaments. Select a reality vector to establish communications with Bennett University TVA Chapter Command.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-tva-bone-dim bg-[#080B09] px-3 py-1.5 border border-tva-border/60">
          <Radio size={14} className="text-[#7FCF8A] animate-pulse" />
          <span>FREQUENCY: <strong className="text-tva-bone">1420.405 MHz</strong></span>
        </div>
      </div>

      {/* THE INTERACTIVE TIMELINE STRINGS & APPARATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT / CENTER: LIVING TEMPORAL APPARATUS & TERMINAL SYSTEM (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#080B09] border border-tva-border relative overflow-hidden flex flex-col justify-between shadow-2xl">
          
          {/* Machine Header with Live Scanning Readout & Diagnostic Markings */}
          <div className="text-[10px] text-tva-bone-dim tracking-widest uppercase mb-4 pb-3 border-b border-tva-border/60 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-tva-amber font-bold">
              <Zap size={13} className="animate-pulse" />
              <span>OSCILLATING TEMPORAL MULTIPLEXER</span>
            </span>

            <div className="flex items-center gap-3 text-[9px]">
              <span className="flex items-center gap-1.5 text-tva-bone-dim">
                <Activity size={11} className="text-[#7FCF8A] animate-pulse" />
                <span>FLUX: <strong className="text-[#7FCF8A]">99.4%</strong></span>
              </span>
              <span className="hidden sm:inline text-tva-border">|</span>
              <span className="text-[#F5A623]">
                {hoveredChannelId ? `GATE: [${hoveredChannelId.toUpperCase()} // OPEN]` : 'GATE: [SYNCHRONIZING]'}
              </span>
            </div>
          </div>

          {/* LIVING MULTIVERSE TIMELINE NETWORK CANVAS & TERMINAL CARDS CONTAINER */}
          <div className="relative w-full min-h-[350px] sm:min-h-[380px] flex items-center">
            
            {/* Canvas: Living Oscillating Strings attached to the far left border */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* TVA TERMINAL CONTACT CARDS (Anchored along right edge) */}
            <div className="w-full flex justify-end z-20 pointer-events-auto">
              <div className="w-full sm:w-64 space-y-2.5">
                {CHANNELS.map((ch, idx) => {
                  const isSelected = activeChannel.id === ch.id;
                  const isHovered = hoveredChannelId === ch.id;
                  const isAnyFocused = Boolean(hoveredChannelId);
                  const isDimmed = isAnyFocused && !isSelected && !isHovered;

                  return (
                    <div
                      key={ch.id}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      onClick={() => handleChannelSelect(ch)}
                      onMouseEnter={() => handleChannelHover(ch)}
                      onMouseLeave={() => {
                        setHoveredChannelId(null);
                        onSetCursor?.('default');
                      }}
                      className={`relative p-2.5 sm:p-3 border transition-all duration-300 cursor-pointer group bg-[#060907] ${
                        isSelected || isHovered
                          ? 'border-[#7FCF8A] bg-[#0c1410] shadow-[0_0_20px_rgba(127,207,138,0.25)] translate-x-1 opacity-100'
                          : isDimmed
                          ? 'border-tva-border/30 bg-[#060907] opacity-45 hover:opacity-85'
                          : 'border-tva-border/60 hover:border-tva-bone hover:bg-[#0a0e0b] opacity-100'
                      }`}
                      style={{
                        borderColor: isSelected ? ch.color : isHovered ? ch.glowColor : undefined,
                      }}
                    >
                      {/* Corner Bracket Markings for Authentic TVA Terminal Aesthetic */}
                      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-tva-border group-hover:border-current" style={{ color: isSelected ? ch.color : undefined }} />
                      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-tva-border group-hover:border-current" style={{ color: isSelected ? ch.color : undefined }} />
                      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-tva-border group-hover:border-current" style={{ color: isSelected ? ch.color : undefined }} />
                      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-tva-border group-hover:border-current" style={{ color: isSelected ? ch.color : undefined }} />

                      {/* Internal Scanline Sweep Animation on Hover */}
                      <div className="absolute inset-0 crt-scanlines opacity-15 pointer-events-none" />

                      {/* Classification & Telemetry Tag */}
                      <div className="flex items-center justify-between text-[8px] text-tva-bone-dim tracking-widest mb-1">
                        <span className="font-mono">{ch.secCode}</span>
                        <span className="font-mono hidden sm:inline" style={{ color: isSelected ? ch.color : undefined }}>
                          SIGNAL: 98.4%
                        </span>
                      </div>

                      {/* Card Core Content */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${isSelected ? 'animate-ping' : ''}`}
                            style={{ backgroundColor: ch.color }}
                          />
                          <span className={`text-xs font-bold tracking-wider uppercase ${isSelected ? 'text-tva-bone' : 'text-tva-bone-dim group-hover:text-tva-bone'}`}>
                            {ch.name}
                          </span>
                        </div>

                        {/* Status changes from [ACCESS TIMELINE] to [CHANNEL OPEN] */}
                        <span
                          className={`text-[9px] font-mono tracking-wider px-1.5 py-0.5 border ${
                            isSelected || isHovered
                              ? 'border-transparent font-bold animate-pulse'
                              : 'border-tva-border/50 text-tva-bone-dim group-hover:text-[#7FCF8A] group-hover:border-[#7FCF8A]'
                          }`}
                          style={{
                            color: isSelected || isHovered ? ch.color : undefined,
                            backgroundColor: isSelected || isHovered ? `${ch.color}18` : undefined,
                          }}
                        >
                          {isSelected || isHovered ? '[CHANNEL OPEN]' : '[ACCESS TIMELINE]'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Machine Footer Diagnostics */}
          <div className="mt-4 pt-3 border-t border-tva-border/60 text-[10px] text-tva-bone-dim flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} className="text-[#F5A623]" />
              <span>SEQUENCE EASTER EGG: [GITHUB &rarr; LINKEDIN &rarr; INSTAGRAM &rarr; EMAIL]</span>
            </span>
            <span className="text-[#7FCF8A] font-bold">
              ACTIVE PROGRESS: {sequence.length} / 4
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: MULTIVERSE CHANNEL MONITOR WITH RICH CARRIER WAVE (IMAGE 2 & 3 STYLE) */}
        <div
          className="lg:col-span-5 p-6 sm:p-8 bg-[#080B09] border-2 relative shadow-2xl font-mono text-xs flex flex-col justify-between transition-colors duration-300"
          style={{
            borderColor: activeChannel.color,
            boxShadow: `0 0 28px ${activeChannel.color}2e`,
          }}
        >
          {/* Subtle Glitch Scanline Burst (Only on channel switch, non-intrusive) */}
          {isGlitching && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7FCF8A]/10 to-transparent pointer-events-none z-10" />
          )}

          {/* CRT Scanline */}
          <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-tva-border/60 pb-3 mb-3 text-[10px] text-tva-bone-dim">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeChannel.color }} />
                <span>TEMPORAL CHANNEL MONITOR</span>
              </span>
              <span className="font-bold uppercase" style={{ color: activeChannel.color }}>
                {activeChannel.status}
              </span>
            </div>

            {/* LIVE CARRIER WAVE MINI MONITOR (IMAGE 2 STYLE) */}
            <div className="mb-4 p-2 bg-[#050706] border border-tva-border/50">
              <div className="flex justify-between items-center text-[8.5px] text-tva-bone-dim mb-1 font-mono">
                <span className="flex items-center gap-1">
                  <Activity size={10} className="text-[#7FCF8A] animate-pulse" />
                  <span>TRANSMISSION CARRIER WAVE</span>
                </span>
                <span style={{ color: activeChannel.color }}>LOCK: 99.8%</span>
              </div>
              <CarrierWaveMiniMonitor channel={activeChannel} isGlitching={isGlitching} />
              <div className="mt-1 flex justify-between text-[8px] text-tva-bone-dim/75 font-mono">
                <span>FREQ: {activeChannel.frequency}</span>
                <span>MOD: QAM-64 // TEMPORAL ENCODED</span>
              </div>
            </div>

            {/* Title with Clean Chromatic Decode Effect */}
            <h3
              className={`font-display text-4xl sm:text-5xl text-tva-bone tracking-wide uppercase transition-colors ${
                isGlitching ? 'text-[#7FCF8A]' : ''
              }`}
              style={{
                textShadow: isGlitching
                  ? `1.5px 0 #F5A623, -1.5px 0 #7FCF8A`
                  : `0 0 15px ${activeChannel.color}66`,
              }}
            >
              {displayText}
            </h3>

            {/* Multiverse Telemetry & Coordinates */}
            <div className="space-y-2.5 py-3 my-2 border-y border-tva-border/60 text-xs font-body leading-relaxed">
              <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] gap-1">
                <span className="font-mono text-tva-bone-dim">TIMELINE ANCHOR:</span>
                <span className="font-mono font-bold" style={{ color: activeChannel.color }}>
                  {activeChannel.timelineSector}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] gap-1">
                <span className="font-mono text-tva-bone-dim">TEMPORAL VECTOR:</span>
                <span className="font-mono text-tva-bone">{activeChannel.coords}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] gap-1">
                <span className="font-mono text-tva-bone-dim">CLEARANCE LEVEL:</span>
                <span className="font-mono font-bold" style={{ color: activeChannel.color }}>
                  {activeChannel.clearance}
                </span>
              </div>
              <div className="pt-1 text-[11px] text-tva-bone-dim">
                <strong className="font-mono text-tva-bone block mb-0.5">MISSION DIRECTIVE:</strong>
                {activeChannel.description}
              </div>
            </div>
          </div>

          {/* Action Button: Directly Clickable Link to Channel */}
          <div className="pt-3 relative z-30 pointer-events-auto">
            <a
              href={activeChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="w-full py-3.5 px-4 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg cursor-pointer relative z-30 group overflow-hidden block"
              style={{ backgroundColor: activeChannel.color }}
            >
              {/* Subtle hover gleam on Button */}
              <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="relative z-10 flex items-center gap-2">
                <span>[ &gt;&gt; ACCESS TIMELINE CHANNEL &lt;&lt; ]</span>
                <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
