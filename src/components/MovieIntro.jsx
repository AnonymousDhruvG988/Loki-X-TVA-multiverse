import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, RotateCcw } from 'lucide-react';
import lokiVideo4K from '../assets/loki_intro_4k.webm';
import lokiVideo from '../assets/loki_intro_video.mp4';
import lokiAudio from '../assets/loki_intro_audio.m4a';
import {
  playLokiButtonHover,
  playEnteringUniverseSound,
  playTransitionWhoosh,
  startAmbientAudio,
  setSoundEnabled,
  getSoundEnabled,
} from '../utils/soundEffects';

/**
 * FULL-SCREEN BACKGROUND LOKI ✕ TVA CINEMATIC INTRO
 * - Video covers 100% of the screen as the living cinematic background
 * - Skips 1.5s immediately on open so letter morphing and sound start instantly
 * - Authentic video audio track synchronized
 * - "✕" and "TVA" written directly below LOKI with matching film grain and chromatic glow
 * - Grainy, glitched, aesthetic TVA gateway button matching theme fonts
 */

const START_OFFSET = 1.5; // Skip first 1.5s as requested by user
const HOLD_OFFSET = 18.2; // Pause on final canonical locked LOKI title card frame

export default function MovieIntro({ onComplete }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [isEntering, setIsEntering] = useState(false);
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Direct Enter Sequence
  const handleEnter = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);
    try {
      setSoundEnabled(true);
      startAmbientAudio();
      playEnteringUniverseSound();
      playTransitionWhoosh();
    } catch (e) {
      console.warn('Audio enter error:', e);
    }
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [isEntering, onComplete]);

  // Replay from 1.5s
  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = START_OFFSET;
      videoRef.current.play().catch(() => {});
    }
    if (audioRef.current && soundOn) {
      audioRef.current.currentTime = START_OFFSET;
      audioRef.current.play().catch(() => {});
    }
  }, [soundOn]);

  // Toggle Sound
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (audioRef.current) {
      if (next) {
        audioRef.current.currentTime = videoRef.current ? videoRef.current.currentTime : START_OFFSET;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
    if (videoRef.current) {
      videoRef.current.muted = !next;
    }
  };

  // Keyboard controls (Space/Enter to enter, R to replay, Esc to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReplay();
      } else if (e.key === 'Escape') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter, handleReplay]);

  // Audio unlock listener for browser autoplay policy
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioUnlocked && soundOn && audioRef.current) {
        setAudioUnlocked(true);
        if (videoRef.current) {
          audioRef.current.currentTime = videoRef.current.currentTime;
        }
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, [audioUnlocked, soundOn]);

  // Video initialization: skip 1.5s immediately and play
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    const startPlayback = () => {
      video.currentTime = START_OFFSET;
      if (audio) audio.currentTime = START_OFFSET;

      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });

      if (audio && soundOn) {
        audio.play().then(() => setAudioUnlocked(true)).catch(() => {});
      }
    };

    if (video.readyState >= 1) {
      startPlayback();
    } else {
      video.addEventListener('loadedmetadata', startPlayback, { once: true });
    }

    // Freeze on the final canonical LOKI title card frame at 18.2s
    const handleTimeUpdate = () => {
      if (video.currentTime >= HOLD_OFFSET) {
        video.pause();
        if (audio) audio.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onComplete, soundOn]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#000000] text-[#FFFFFF] overflow-hidden select-none p-4 sm:p-6 transition-all duration-700 ${
        isEntering ? 'scale-[2.4] opacity-0 blur-lg' : 'scale-100'
      }`}
    >
      {/* ========================================================
          1. FULL-SCREEN VIDEO BACKGROUND (COVERS 100% OF SCREEN)
          ======================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={!soundOn}
          className="w-full h-full object-cover object-[center_35%] filter brightness-105 contrast-115"
        >
          <source src={lokiVideo4K} type="video/webm" />
          <source src={lokiVideo} type="video/mp4" />
        </video>

        {/* Global CRT Scanlines & Film Grain Overlay */}
        <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />

        {/* Subtle Vignette & Lower Screen Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Synchronized Audio Track */}
      <audio
        ref={audioRef}
        src={lokiAudio}
        preload="auto"
      />

      {/* ========================================================
          TOP HEADER CONTROLS (OVERLAY)
          ======================================================== */}
      <div className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto px-2 pointer-events-auto">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] shadow-[0_0_8px_#7FCF8A] animate-pulse" />
          <span>TIME VARIANCE AUTHORITY</span>
          <span className="hidden sm:inline text-[#F5A623]">// CONTINUUM STABLE</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleReplay}
            aria-label="Replay intro"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-white/50 hover:text-[#7FCF8A] transition-colors cursor-pointer"
          >
            <RotateCcw size={11} />
            <span className="hidden sm:inline">REPLAY [R]</span>
          </button>

          <button
            onClick={handleToggleSound}
            aria-label="Toggle sound"
            className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/40 rounded bg-black/60 backdrop-blur-md"
          >
            {soundOn ? <Volume2 size={13} className="text-[#7FCF8A]" /> : <VolumeX size={13} className="text-white/40" />}
          </button>

          <button
            onClick={handleEnter}
            className="text-[10px] tracking-[0.28em] uppercase text-white/60 hover:text-[#F5A623] transition-colors font-mono cursor-pointer border border-white/15 hover:border-[#F5A623]/80 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md"
          >
            SKIP [ESC] &rarr;
          </button>
        </div>
      </div>

      {/* ========================================================
          CENTER / LOWER OVERLAY:
          - LOKI IS VISIBLE DIRECTLY IN THE FULL-SCREEN BACKGROUND
          - DIRECTLY BELOW LOKI:
              1. ✕ (MATCHING FILM CHROMATIC GLOW)
              2. TVA (MATCHING 1970s GLOW)
              3. TIME VARIANCE AUTHORITY
              4. GRAINY, GLITCHED, AESTHETIC GATEWAY BUTTON
          ======================================================== */}
      <div className="relative z-20 flex flex-col items-center justify-end w-full max-w-4xl mx-auto mb-2 sm:mb-4 text-center pointer-events-auto">
        
        {/* ✕ (WRITTEN DIRECTLY BELOW LOKI) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-1 flex items-center justify-center select-none"
        >
          <span className="text-xl sm:text-2xl font-mono text-[#F5A623] select-none loki-chromatic-glow">
            ✕
          </span>
        </motion.div>

        {/* TVA (WRITTEN DIRECTLY BELOW ✕) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center select-none mb-4 sm:mb-6"
        >
          <div className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[0.22em] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD77A] to-[#F5A623] tva-gold-chromatic-glow">
            TVA
          </div>

          <div className="mt-1 text-[9px] sm:text-[11px] tracking-[0.45em] text-[#E8E2D0]/80 uppercase font-mono loki-chromatic-glow">
            TIME VARIANCE AUTHORITY
          </div>
        </motion.div>

        {/* ========================================================
            THE GRAINY, GLITCHED, AESTHETIC GATEWAY BUTTON
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-2.5"
        >
          {/* Glowing Analog Phosphor Frame */}
          <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-[#7FCF8A] via-[#F5A623] to-[#7FCF8A] shadow-[0_0_30px_rgba(127,207,138,0.45),0_0_60px_rgba(245,166,35,0.35)] transition-shadow duration-500 hover:shadow-[0_0_55px_rgba(127,207,138,0.75),0_0_95px_rgba(245,166,35,0.65)]">
            
            <button
              onClick={handleEnter}
              onMouseEnter={playLokiButtonHover}
              className="loki-glitch-btn group relative cursor-pointer px-7 sm:px-12 py-3.5 sm:py-4 rounded-full overflow-hidden transition-all duration-300 bg-[#060A08]/95 backdrop-blur-xl border border-white/15 flex items-center gap-3.5 sm:gap-5"
            >
              {/* Internal CRT Scanline Sweep Glint */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              {/* Glowing Temporal Reactor Pulse */}
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#7FCF8A] shadow-[0_0_12px_#7FCF8A] group-hover:bg-[#F5A623] group-hover:shadow-[0_0_16px_#F5A623] transition-all duration-300 animate-pulse" />
                <span className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#7FCF8A]/50 group-hover:border-[#F5A623]/70 transition-colors animate-ping" />
              </div>

              {/* Grainy Glitched Typography matching theme fonts */}
              <div className="flex flex-col text-left">
                <span className="font-mono font-bold text-xs sm:text-sm tracking-[0.28em] uppercase text-white group-hover:text-[#FFD77A] transition-colors loki-chromatic-glow">
                  [ ◈ ENTER THE MULTIVERSE → ]
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#7FCF8A] group-hover:text-[#F5A623] font-mono uppercase transition-colors">
                  TVA TEMPORAL GATEWAY // SACRED TIMELINE
                </span>
              </div>

              {/* Dynamic Forward-Gliding Arrow */}
              <div className="flex items-center text-[#7FCF8A] group-hover:text-[#F5A623] group-hover:translate-x-1.5 transition-all duration-300 ml-1">
                <ArrowRight size={17} />
              </div>
            </button>
          </div>

          {/* Minimal Key Hint */}
          <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase">
            PRESS [SPACE] TO ENTER
          </span>
        </motion.div>

      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-30 text-[9px] tracking-[0.35em] text-white/35 uppercase font-mono text-center">
        FOR ALL TIME. ALWAYS.
      </div>
    </motion.div>
  );
}
