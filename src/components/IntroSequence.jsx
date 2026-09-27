import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playTerminalBeep, playGlitchSound, playTemporalPulse, playAccessGrantedSound } from '../utils/soundEffects';

export default function IntroSequence({ onComplete }) {
  const [step, setStep] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const steps = [
      { delay: 350, action: () => { setStep(1); playTerminalBeep(); } }, // TIME VARIANCE AUTHORITY
      { delay: 900, action: () => { setStep(2); playTerminalBeep(); } }, // TEMPORAL DATABASE // INITIALIZING
      { delay: 1500, action: () => { setStep(3); playTerminalBeep(); } }, // SCANNING TIMELINE...
      { 
        delay: 2200, 
        action: () => { 
          setStep(4); 
          setIsGlitching(true);
          playGlitchSound();
          setTimeout(() => setIsGlitching(false), 300);
        } 
      }, // TIMELINE DEVIATION DETECTED
      { 
        delay: 2900, 
        action: () => { 
          setStep(5); 
          setPulseActive(true);
          playTemporalPulse();
          setTimeout(() => setPulseActive(false), 500);
        } 
      }, // VARIANT IDENTIFIED
      { delay: 3500, action: () => { setStep(6); playTerminalBeep(); } }, // CLEARANCE REQUESTED
      { 
        delay: 4000, 
        action: () => { 
          setStep(7); 
          playAccessGrantedSound();
        } 
      }, // ACCESS GRANTED
      { delay: 4700, action: () => { onComplete(); } }, // Finish & Reveal Hero
    ];

    const timers = steps.map((s) => setTimeout(s.action, s.delay));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C] text-[#E8E2D0] select-none ${
        isGlitching ? 'filter drop-shadow-[2px_0_0_#FF3366] -drop-shadow-[2px_0_0_#00F0FF]' : ''
      }`}
    >
      {/* Background CRT scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />

      {/* Temporal Pulse wave */}
      {pulseActive && (
        <motion.div
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-96 h-96 rounded-full border-2 border-tva-amber/80 pointer-events-none"
        />
      )}

      {/* Center Console Container */}
      <div className="relative z-10 w-full max-w-xl px-6 font-mono text-xs sm:text-sm">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-tva-border pb-3 mb-6 text-tva-bone-dim text-[11px] tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tva-amber animate-ping" />
            TVA-SEC-NODE // BENNETT-NCR
          </span>
          <span className="text-tva-amber font-mono">SYS.VER: 4.89</span>
        </div>

        {/* Step Text Readouts */}
        <div className="space-y-3 min-h-[140px] flex flex-col justify-center">
          {step >= 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-tva-bone-dim tracking-widest uppercase font-bold text-xs"
            >
              TIME VARIANCE AUTHORITY
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-tva-bone tracking-wide text-xs"
            >
              &gt; TEMPORAL DATABASE // INITIALIZING...
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-tva-amber tracking-wider text-xs"
            >
              &gt; SCANNING TIMELINE SPECTRUM...
            </motion.div>
          )}

          {/* Thin Amber Timeline Drawing Bar */}
          {step >= 3 && (
            <div className="w-full h-0.5 bg-neutral-900 overflow-hidden my-3 relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: step >= 7 ? "100%" : step >= 5 ? "75%" : "45%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-tva-amber via-tva-orange to-tva-amber shadow-[0_0_12px_#F5A623]"
              />
            </div>
          )}

          {step >= 4 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="text-tva-magenta font-bold tracking-widest text-xs sm:text-sm flex items-center gap-2"
            >
              <span className="px-1.5 py-0.5 bg-tva-magenta/20 border border-tva-magenta/60 text-[10px]">
                ALERT
              </span>
              TIMELINE DEVIATION DETECTED // SECTOR 616-NCR
            </motion.div>
          )}

          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-tva-orange font-bold tracking-wider text-xs sm:text-sm"
            >
              &gt;&gt; VARIANT IDENTIFIED: [VISITOR-SESSION-001]
            </motion.div>
          )}

          {step >= 6 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-tva-bone-dim text-xs"
            >
              &gt;&gt; CLEARANCE REQUESTED // VERIFYING TEMPORAL RUNES...
            </motion.div>
          )}

          {step >= 7 && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 p-2.5 border border-tva-green-accent bg-tva-green/20 text-[#6CE08E] font-bold tracking-widest text-xs sm:text-sm text-center flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#6CE08E]" />
              TEMPORAL ACCESS GRANTED // WELCOME TO THE SACRED TIMELINE
            </motion.div>
          )}
        </div>

        {/* Skip Intro Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => {
              playTerminalBeep();
              onComplete();
            }}
            className="group flex items-center gap-2 px-3 py-1.5 border border-tva-border hover:border-tva-amber bg-tva-surface/50 text-tva-bone-dim hover:text-tva-amber text-[11px] font-mono tracking-widest transition-all uppercase focus:outline-none"
          >
            <span>[ SKIP INTRO ]</span>
            <span className="text-tva-amber opacity-60 group-hover:opacity-100 transition-opacity">ESC</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
