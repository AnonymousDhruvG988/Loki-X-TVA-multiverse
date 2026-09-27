import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playTerminalBeep, playTemporalPulse } from '../utils/soundEffects';

export default function Epilogue({ isOpen, onRestart, onClose }) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setStage(1);
      return;
    }

    playTemporalPulse();

    const timers = [
      setTimeout(() => setStage(2), 1200), // Green & amber machinery powers down
      setTimeout(() => { setStage(3); playTerminalBeep(); }, 2400), // TIMELINE STABLE.
      setTimeout(() => { setStage(4); playTerminalBeep(); }, 3800), // SESSION TERMINATED.
      setTimeout(() => setStage(5), 5200), // Tiny green point fades out to pure void
    ];

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050706] text-[#E8E2D0] font-mono select-none overflow-hidden">
      
      {/* Background CRT Scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />

      {/* Stage 1 & 2: Powering down machinery animation */}
      {stage < 3 && (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="w-36 h-36 rounded-full border border-[#7FCF8A]/40 animate-ping" />
          <div className="w-24 h-24 rounded-full border border-tva-amber/40 animate-spin" />
          <div className="text-[10px] text-tva-bone-dim mt-4 absolute -bottom-8">
            POWERING DOWN SACRED TIMELINE LOOM...
          </div>
        </div>
      )}

      {/* Stage 3: TIMELINE STABLE. */}
      {stage >= 3 && stage < 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          {/* Circular Archival Portrait: The Infinite Loop */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-[#7FCF8A] shadow-[0_0_30px_rgba(127,207,138,0.4)] mx-auto mb-2">
            <img
              src="/assets/images/loki_timeline_poster.png"
              alt="Archival Record of Variant L-1130"
              className="w-full h-full object-cover object-top filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050706]/70 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="text-2xl sm:text-4xl font-display tracking-[0.25em] text-[#7FCF8A] uppercase">
            TIMELINE STABLE.
          </div>

          {/* Stage 4: SESSION TERMINATED. */}
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm tracking-[0.3em] text-tva-bone-dim uppercase"
            >
              SESSION TERMINATED.
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Stage 5: Single fading green point */}
      {stage === 5 && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-2.5 h-2.5 rounded-full bg-[#A8E6A3] shadow-[0_0_15px_#A8E6A3]"
        />
      )}

      {/* Re-initialize Action */}
      {stage >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-3 text-center"
        >
          <button
            onClick={() => {
              playTerminalBeep();
              onRestart();
            }}
            className="px-6 py-2.5 border border-[#7FCF8A] hover:bg-[#7FCF8A] hover:text-black text-[#7FCF8A] text-xs font-bold uppercase tracking-widest transition-colors shadow-green-sm"
          >
            [ RE-INITIALIZE SACRED TIMELINE ]
          </button>
          <span className="text-[10px] text-tva-bone-dim/60">
            GEEKSFORGEEKS BENNETT UNIVERSITY // SECTOR 616-NCR
          </span>
        </motion.div>
      )}
    </div>
  );
}
