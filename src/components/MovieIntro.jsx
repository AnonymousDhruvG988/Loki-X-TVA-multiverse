import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Volume2, ShieldAlert } from 'lucide-react';
import { playBootStageSound, playTransitionWhoosh, startAmbientAudio, setSoundEnabled, playEnteringUniverseSound } from '../utils/soundEffects';

/**
 * MASTER CINEMATIC INTRO — LOKI GOD OF STORIES
 * Modeled after Loki Season 2 finale:
 * Stage 1: The Dying Loom Threads (Loki in TVA coat facing the dying temporal strands)
 * Stage 2: Taking the Strands (Loki's green magic ignites, horns crown forms)
 * Stage 3: The Golden Throne at the End of Time (Loki holding hundreds of glowing green multiverse branches)
 * Stage 4: Sacred Yggdrasil & Time Variance Authority Title
 */
export default function MovieIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef(null);

  const handleEnter = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);
    try {
      setSoundEnabled(true);
      startAmbientAudio();
      playEnteringUniverseSound();
      playTransitionWhoosh();
    } catch (e) {
      console.warn('Audio unlock warning:', e);
    }
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [isEntering, onComplete]);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Progression sequence
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    try {
      playBootStageSound('point');
    } catch (_) {}

    // Progress counter (0 -> 100)
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, prev + 3);
      });
    }, 110);

    // Cinematic stages (Loom -> Ascension -> Throne -> Title)
    const t1 = setTimeout(() => {
      setStage(2);
      try { playBootStageSound('timeline'); } catch (_) {}
    }, 1400);

    const t2 = setTimeout(() => {
      setStage(3);
      try { playBootStageSound('reveal'); } catch (_) {}
    }, 3000);

    const t3 = setTimeout(() => {
      setStage(4);
      try {
        playBootStageSound('title');
        playEnteringUniverseSound();
      } catch (_) {}
    }, 4800);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, handleEnter]);

  // Multiverse Glowing Strings Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth || 1200);
    let height = (canvas.height = window.innerHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1200;
      height = canvas.height = window.innerHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    // 42 Green Multiverse Threads radiating from Loki
    const numStrings = 42;
    const threads = Array.from({ length: numStrings }, (_, i) => {
      const angle = (i / numStrings) * Math.PI * 2;
      return {
        angle,
        speed: 0.01 + Math.random() * 0.015,
        amplitude: 20 + Math.random() * 45,
        color: i % 4 === 0 ? '#A8E6A3' : i % 2 === 0 ? '#7FCF8A' : '#4ADE80',
        width: 1.2 + Math.random() * 1.6,
        alpha: 0.4 + Math.random() * 0.5,
      };
    });

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.48; // Centered on Loki's chest
      const maxRadius = Math.max(width, height) * 0.85;

      // Draw volumetric emerald aura
      if (stage >= 2) {
        const aura = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, width * 0.45);
        aura.addColorStop(0, stage >= 3 ? 'rgba(74, 222, 128, 0.22)' : 'rgba(127, 207, 138, 0.12)');
        aura.addColorStop(0.6, 'rgba(34, 197, 94, 0.05)');
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw threads radiating outward like Yggdrasil
      if (stage >= 2) {
        threads.forEach((th, i) => {
          const oscAngle = th.angle + Math.sin(time * 0.8 + i) * 0.05;
          const endX = centerX + Math.cos(oscAngle) * maxRadius;
          const endY = centerY + Math.sin(oscAngle) * maxRadius;

          const mousePullX = (mousePos.x - 0.5) * 40;
          const mousePullY = (mousePos.y - 0.5) * 40;

          const wave = Math.sin(time * 1.5 + i * 0.4) * th.amplitude;
          const perpX = -Math.sin(oscAngle);
          const perpY = Math.cos(oscAngle);

          const ctrlX = centerX + Math.cos(oscAngle) * (maxRadius * 0.5) + perpX * wave + mousePullX;
          const ctrlY = centerY + Math.sin(oscAngle) * (maxRadius * 0.5) + perpY * wave + mousePullY;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          ctx.strokeStyle = th.color;
          ctx.lineWidth = th.width;
          ctx.globalAlpha = th.alpha * (stage >= 3 ? 1 : 0.6);
          ctx.shadowColor = '#4ADE80';
          ctx.shadowBlur = stage >= 3 ? 12 : 5;
          ctx.stroke();

          // Reset shadow
          ctx.shadowBlur = 0;
        });
      }

      ctx.globalAlpha = 1.0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [stage, mousePos]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030604] text-[#E8E2D0] overflow-hidden select-none font-mono transition-transform duration-700 ${
        isEntering ? 'scale-[2.2] opacity-0 blur-md' : 'scale-100'
      }`}
    >
      {/* Background CRT scanlines & subtle noise */}
      <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none z-10" />

      {/* LIVING 2D MULTIVERSE THREADS CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20 w-full h-full" />

      {/* CINEMATIC IMAGE SCENES PROGRESSION */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* STAGE 1: DYING LOOM STRANDS */}
        <motion.div
          animate={{
            opacity: stage === 1 ? 0.75 : 0,
            scale: stage === 1 ? 1 : 1.08,
          }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src="/assets/images/loki_loom_strings_tva.png"
            alt="Loki facing the temporal loom strands"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030604]/50 to-[#030604]" />
        </motion.div>

        {/* STAGE 2: LOKI GOD OF STORIES CROWN */}
        <motion.div
          animate={{
            opacity: stage === 2 ? 0.85 : 0,
            scale: stage === 2 ? 1 : 1.05,
          }}
          transition={{ duration: 1.0 }}
          className="absolute inset-0"
        >
          <img
            src="/assets/images/loki_god_close_crown.png"
            alt="Loki God of Stories with Horned Crown"
            className="w-full h-full object-cover object-center filter brightness-110 contrast-130"
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030604]/60 to-[#030604]" />
        </motion.div>

        {/* STAGE 3 & 4: LOKI ON THE GOLDEN THRONE WEAVING MULTIVERSE YGGDRASIL */}
        <motion.div
          animate={{
            opacity: stage >= 3 ? 0.95 : 0,
            scale: stage >= 3 ? 1 : 0.96,
          }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0"
        >
          <img
            src="/assets/images/loki_god_on_throne_multiverse.png"
            alt="Loki on Golden Throne holding the Multiverse"
            className="w-full h-full object-cover object-center filter brightness-115 contrast-135"
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030604]/40 to-[#030604]" />
        </motion.div>
      </div>

      {/* AMBER SCAN SWEEP */}
      {(stage === 2 || stage === 3) && (
        <motion.div
          initial={{ top: '-10%' }}
          animate={{ top: '110%' }}
          transition={{ duration: 1.4, ease: 'linear' }}
          className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_25px_#7FCF8A] pointer-events-none z-30"
        />
      )}

      {/* STAGE NARRATIVE OVERLAY & HUD */}
      <div className="relative z-30 flex flex-col items-center justify-between h-full py-12 px-6 max-w-5xl w-full text-center pointer-events-auto">
        
        {/* Top TVA Header */}
        <div className="flex items-center justify-between w-full border-b border-[#1D2B22]/70 pb-3">
          <div className="flex items-center gap-2 text-[10px] text-[#7FCF8A] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>TVA // TEMPORAL EMERGENCY INITIALIZATION</span>
          </div>

          <div className="text-[10px] font-mono text-[#F5A623] tracking-widest">
            STATION ZERO // SECTOR 616
          </div>
        </div>

        {/* Center Title & Narrative */}
        <div className="space-y-4 my-auto">
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="text-xs text-[#FF3366] tracking-[0.35em] uppercase font-bold animate-pulse">
                ⚠️ TEMPORAL LOOM COLLAPSE IMMINENT
              </div>
              <div className="text-2xl sm:text-4xl font-display uppercase tracking-wider text-tva-bone">
                THE TIMELINES ARE DYING
              </div>
              <div className="text-xs text-tva-bone-dim tracking-widest">
                INFINITE REALITIES FRAYING INTO CHAOS...
              </div>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <div className="text-xs text-[#7FCF8A] tracking-[0.35em] uppercase font-bold">
                GLORIOUS PURPOSE // RE-FORGING
              </div>
              <div className="text-2xl sm:text-4xl font-display uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#7FCF8A] via-[#A8E6A3] to-[#FFD700]">
                “I KNOW WHAT KIND OF GOD I NEED TO BE.”
              </div>
              <div className="text-xs text-[#E8E2D0] tracking-widest italic font-serif">
                “For you. For all of us.”
              </div>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="text-xs text-[#F5A623] tracking-[0.45em] uppercase font-bold">
                GOD OF STORIES // YGGDRASIL PRESERVED
              </div>
              <h1 className="font-display text-4xl sm:text-7xl md:text-8xl tracking-wider text-[#E8E2D0] uppercase leading-none">
                TIME VARIANCE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FFB52E] to-[#7FCF8A]">
                  AUTHORITY
                </span>
              </h1>
              <div className="text-xs sm:text-sm text-[#7FCF8A] tracking-[0.35em] uppercase">
                FOR ALL TIME. ALWAYS.
              </div>

              {/* Enter CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleEnter}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#F5A623] via-[#FFB52E] to-[#7FCF8A] text-black font-mono font-bold text-xs sm:text-sm tracking-[0.25em] uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(245,166,35,0.5)] flex items-center gap-2 border border-white cursor-pointer"
                >
                  <Play size={14} fill="currentColor" />
                  <span>ENTER THE MULTIVERSE</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom HUD: Progress Bar & Direct Skip */}
        <div className="w-full space-y-3">
          <div className="w-full max-w-md mx-auto">
            <div className="w-full h-1 bg-[#121A15] border border-[#1D2B22] rounded-full overflow-hidden p-[1px] relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7FCF8A] via-[#FFB52E] to-[#00F0FF] shadow-[0_0_12px_#7FCF8A]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-tva-bone-dim tracking-widest mt-1.5 font-mono">
              <span className="text-[#7FCF8A]">WEAVING MULTIVERSE: {progress}%</span>
              <span>STAGE {stage} OF 4</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-tva-bone-dim pt-2 border-t border-[#1D2B22]/60">
            <span className="hidden sm:inline">BENNETT UNIVERSITY // SECTOR 616-NCR</span>
            
            {/* Quick Skip Button */}
            <button
              onClick={handleEnter}
              className="ml-auto px-3.5 py-1.5 border border-[#1D2B22] hover:border-[#F5A623] text-[10px] font-mono tracking-widest text-tva-bone-dim hover:text-[#F5A623] uppercase transition-colors bg-[#080B09]/90 flex items-center gap-1.5 cursor-pointer"
            >
              <span>SKIP INITIALIZATION</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
