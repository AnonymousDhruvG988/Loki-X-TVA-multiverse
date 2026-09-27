import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Shield, GitBranch, Compass, Sparkles, Phone, KeyRound, Zap } from 'lucide-react';
import { playTerminalBeep, playClickSound, playTemporalPulse } from '../utils/soundEffects';

/**
 * HOLOGRAPHIC TVA CLOCK AI AGENT ("MISS MINUTES" STYLE TEMPORAL GUIDE)
 * 
 * Clean Classic Layout:
 * - Floating circular Miss Minutes TVA Clock in bottom-right corner
 * - Autonomous Sentient Facial Animations:
 *   - Procedural eye blinking & double-blinking
 *   - Pupil tracking: Eyes follow the user's mouse cursor across the screen
 *   - Dynamic facial expressions: 'happy' | 'talking' | 'winking' | 'curious' | 'surprised' | 'scanning'
 * - Interactive holographic dialogue card with destination navigation chips
 * - Clean, non-intrusive, and buttery-smooth
 */
export default function TVAClockAgent({ onOpenAuth, onTriggerGlitch, onSetCursor }) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState('happy');
  const [dialogueText, setDialogueText] = useState(
    "Hey there, Variant! Welcome to the Time Variance Authority! Need help navigatin' these timeline branches?"
  );

  // Pupil offset from eye center (tracked to mouse)
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const clockCenterRef = useRef({ x: 0, y: 0 });

  // Update center position of the clock
  const updateCenter = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      clockCenterRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }, []);

  useEffect(() => {
    updateCenter();
    window.addEventListener('resize', updateCenter);
    window.addEventListener('scroll', updateCenter, { passive: true });
    return () => {
      window.removeEventListener('resize', updateCenter);
      window.removeEventListener('scroll', updateCenter);
    };
  }, [updateCenter]);

  // Cursor tracking for pupils
  useEffect(() => {
    const handlePointerMove = (e) => {
      const dx = e.clientX - clockCenterRef.current.x;
      const dy = e.clientY - clockCenterRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0) {
        // Clamp pupil displacement to max 2.5px
        const maxDist = 2.5;
        const px = (dx / dist) * Math.min(dist * 0.04, maxDist);
        const py = (dy / dist) * Math.min(dist * 0.04, maxDist);
        setPupilPos({ x: px, y: py });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Autonomous Procedural Blinking
  useEffect(() => {
    let blinkTimeout = null;

    const scheduleBlink = () => {
      const delay = Math.random() * 3200 + 2000; // 2s - 5.2s
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);

          // 25% chance of rapid double blink
          if (Math.random() > 0.75) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
              }, 110);
            }, 130);
          }
        }, 120);

        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Autonomous Procedural Expressions (When idle)
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      if (!isOpen) {
        const expressions = ['happy', 'curious', 'happy', 'winking', 'happy'];
        setExpression(expressions[Math.floor(Math.random() * expressions.length)]);
      }
    }, 4500);

    return () => clearInterval(expressionInterval);
  }, [isOpen]);

  const handleActionClick = (action) => {
    playClickSound();
    setExpression('talking');

    switch (action) {
      case 'clearance':
        setDialogueText("Right away! Takin' ya straight to the Temporal Clearance terminal...");
        setExpression('winking');
        setTimeout(() => {
          document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setExpression('happy');
        }, 700);
        break;
      case 'timelines':
        setDialogueText("Look at all them bifurcatin' branches! Takin' ya to the Sacred Timeline...");
        setTimeout(() => {
          document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setExpression('happy');
        }, 700);
        break;
      case 'multiverse':
        setDialogueText("Careful now! That multiverse is completely unstable! Openin' the radar...");
        setTimeout(() => {
          document.getElementById('multiverse')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setExpression('happy');
        }, 700);
        break;
      case 'artifacts':
        setDialogueText("Ah, the Infinity Stones! We use 'em as paperweights around here. Look see...");
        setTimeout(() => {
          document.getElementById('artifacts')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setExpression('happy');
        }, 700);
        break;
      case 'contact':
        setDialogueText("Openin' a direct dispatch line to Bennett University TVA sector HQ!");
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
          setExpression('happy');
        }, 700);
        break;
      case 'login':
        setDialogueText("Hold still for your identity verification scan!");
        setExpression('scanning');
        setTimeout(() => {
          onOpenAuth?.('login');
          setIsOpen(false);
          setExpression('happy');
        }, 600);
        break;
      case 'signup':
        setDialogueText("Brand new Variant detected! Let's file your official TVA dossier!");
        setTimeout(() => {
          onOpenAuth?.('signup');
          setIsOpen(false);
          setExpression('happy');
        }, 600);
        break;
      case 'glitch':
        setDialogueText("Wait! Don't touch that—! TEMPORAL SYSTEM DESTABILIZING!");
        setExpression('surprised');
        onTriggerGlitch?.();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto select-none font-mono"
    >
      {/* INTERACTIVE HOLOGRAPHIC SPEECH DIALOGUE BUBBLE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-24 right-0 w-[310px] sm:w-[350px] p-5 bg-[#080B09]/95 border-2 border-tva-amber text-tva-bone shadow-[0_0_40px_rgba(245,166,35,0.45)] backdrop-blur-md rounded-lg overflow-hidden z-50"
          >
            {/* CRT Scanlines Overlay */}
            <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

            {/* Header with Close Button */}
            <div className="flex items-center justify-between border-b border-tva-border/60 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tva-amber animate-ping" />
                <span className="text-[10px] tracking-widest text-tva-amber font-bold uppercase">
                  TVA TEMPORAL GUIDE // AI CLOCK
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setExpression('happy');
                }}
                className="p-1 text-tva-bone-dim hover:text-tva-amber transition-colors cursor-pointer"
                title="Dismiss Guide"
              >
                <X size={14} />
              </button>
            </div>

            {/* Guide Message */}
            <p className="text-xs text-tva-bone font-body leading-relaxed mb-4">
              "{dialogueText}"
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="space-y-1.5 text-[10px]">
              <div className="text-[9px] text-[#7FCF8A] uppercase tracking-wider font-bold mb-1">
                &gt;&gt; SELECT DESTINATION:
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleActionClick('clearance')}
                  className="px-2.5 py-2 bg-gradient-to-r from-tva-amber to-[#FF6B00] text-black font-bold uppercase tracking-wider text-left hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-between shadow-sm cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Shield size={12} />
                    <span>CLEARANCE</span>
                  </span>
                  <ArrowRight size={10} />
                </button>

                <button
                  onClick={() => handleActionClick('timelines')}
                  className="px-2.5 py-2 bg-[#121A15] border border-[#7FCF8A] text-[#7FCF8A] font-bold uppercase tracking-wider text-left hover:bg-[#7FCF8A]/20 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <GitBranch size={12} />
                    <span>TIMELINES</span>
                  </span>
                  <ArrowRight size={10} />
                </button>

                <button
                  onClick={() => handleActionClick('multiverse')}
                  className="px-2.5 py-2 bg-[#0E1310] border border-tva-border hover:border-tva-amber text-tva-bone text-left uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass size={12} className="text-[#00F0FF]" />
                  <span>MULTIVERSE</span>
                </button>

                <button
                  onClick={() => handleActionClick('artifacts')}
                  className="px-2.5 py-2 bg-[#0E1310] border border-tva-border hover:border-[#00F0FF] text-tva-bone text-left uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={12} className="text-[#E879F9]" />
                  <span>INFINITY</span>
                </button>

                <button
                  onClick={() => handleActionClick('contact')}
                  className="px-2.5 py-2 bg-[#0E1310] border border-tva-border hover:border-[#7FCF8A] text-tva-bone text-left uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone size={12} className="text-[#7FCF8A]" />
                  <span>CONTACT HQ</span>
                </button>

                <button
                  onClick={() => handleActionClick('login')}
                  className="px-2.5 py-2 bg-[#0E1310] border border-tva-border hover:border-tva-amber text-tva-amber text-left uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <KeyRound size={12} />
                  <span>TVA LOGIN</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="pt-2 flex justify-between items-center text-[9px] text-tva-bone-dim border-t border-tva-border/40 mt-2">
                <button
                  onClick={() => handleActionClick('signup')}
                  className="hover:text-[#7FCF8A] underline transition-colors cursor-pointer"
                >
                  [ + CREATE VARIANT FILE ]
                </button>
                <button
                  onClick={() => handleActionClick('glitch')}
                  className="hover:text-[#FF3366] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Zap size={10} className="text-[#FF3366]" />
                  <span>[ TEST GLITCH ]</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          THE HOLOGRAPHIC MISS MINUTES CLOCK AVATAR (Interactive & Sentient)
          ========================================================================= */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playTerminalBeep();
          const nextOpen = !isOpen;
          setIsOpen(nextOpen);
          setExpression(nextOpen ? 'talking' : 'happy');
        }}
        onMouseEnter={() => {
          onSetCursor?.('cta');
          if (expression === 'happy') setExpression('winking');
        }}
        onMouseLeave={() => {
          onSetCursor?.('default');
          if (expression === 'winking') setExpression('happy');
        }}
        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full cursor-pointer flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(245,166,35,0.7)] group"
      >
        {/* Outer Rotating Dashed Temporal Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F5A623] animate-spin-slow opacity-80" />
        <div className="absolute -inset-1.5 rounded-full border border-dotted border-[#7FCF8A] opacity-50 animate-pulse" />

        {/* Ambient Radial Glowing Hologram Body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B00] via-[#F5A623] to-[#FFB52E] opacity-95 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)]" />

        {/* SVG CLOCK FACE WITH SENTIENT ANIMATED FEATURES */}
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 sm:w-18 sm:h-18 relative z-10 overflow-visible pointer-events-none"
        >
          {/* Radial Clock Hour Markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={`tick-${deg}`}
              x1={50 + Math.cos((deg * Math.PI) / 180) * 41}
              y1={50 + Math.sin((deg * Math.PI) / 180) * 41}
              x2={50 + Math.cos((deg * Math.PI) / 180) * 46}
              y2={50 + Math.sin((deg * Math.PI) / 180) * 46}
              stroke="#050706"
              strokeWidth={deg % 90 === 0 ? '2.5' : '1.2'}
            />
          ))}

          {/* Retro Clock Hands */}
          <line x1="50" y1="50" x2="50" y2="24" stroke="#050706" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="68" y2="50" stroke="#050706" strokeWidth="2" strokeLinecap="round" />

          {/* Eyebrows (Dynamic with Expression) */}
          <g stroke="#050706" strokeWidth="2.2" strokeLinecap="round" fill="none">
            {expression === 'curious' ? (
              <>
                <path d="M 28 32 Q 36 24, 44 30" />
                <path d="M 56 33 Q 64 33, 72 35" />
              </>
            ) : expression === 'surprised' ? (
              <>
                <path d="M 28 28 Q 36 22, 44 28" />
                <path d="M 56 28 Q 64 22, 72 28" />
              </>
            ) : (
              <>
                <path d="M 28 32 Q 36 28, 44 32" />
                <path d="M 56 32 Q 64 28, 72 32" />
              </>
            )}
          </g>

          {/* EYES (With Natural Blinking & Real-time Pupil Tracking) */}
          {isBlinking ? (
            /* Blinking Eyelid Slits */
            <g stroke="#050706" strokeWidth="2.8" strokeLinecap="round">
              <line x1="32" y1="44" x2="44" y2="44" />
              <line x1="56" y1="44" x2="68" y2="44" />
            </g>
          ) : expression === 'winking' ? (
            <g>
              {/* Left Eye: Open & tracking */}
              <ellipse cx="38" cy="44" rx="5" ry="6.5" fill="#050706" />
              <circle cx={38 + pupilPos.x} cy={43 + pupilPos.y} r="2" fill="#FFFFFF" />
              {/* Right Eye: Wink Arc */}
              <path d="M 56 45 Q 62 39, 68 45" fill="none" stroke="#050706" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : expression === 'scanning' ? (
            <g>
              <line x1="32" y1="44" x2="44" y2="44" stroke="#050706" strokeWidth="3" strokeLinecap="round" />
              <line x1="56" y1="44" x2="68" y2="44" stroke="#050706" strokeWidth="3" strokeLinecap="round" />
              {/* Scanning Cyan Laser Beam */}
              <line x1="24" y1="44" x2="76" y2="44" stroke="#00F0FF" strokeWidth="1.8" className="animate-pulse" />
            </g>
          ) : expression === 'surprised' ? (
            <g>
              <circle cx="38" cy="44" r="6.5" fill="#050706" />
              <circle cx="62" cy="44" r="6.5" fill="#050706" />
              <circle cx={38 + pupilPos.x} cy={43 + pupilPos.y} r="2.2" fill="#FFFFFF" />
              <circle cx={62 + pupilPos.x} cy={43 + pupilPos.y} r="2.2" fill="#FFFFFF" />
            </g>
          ) : (
            /* Natural Sentry Eyes with Cursor Following Pupils */
            <g>
              <ellipse cx="38" cy="44" rx="5" ry="6.5" fill="#050706" />
              <ellipse cx="62" cy="44" rx="5" ry="6.5" fill="#050706" />
              <circle cx={38.5 + pupilPos.x} cy={42.5 + pupilPos.y} r="1.8" fill="#FFFFFF" />
              <circle cx={62.5 + pupilPos.x} cy={42.5 + pupilPos.y} r="1.8" fill="#FFFFFF" />
            </g>
          )}

          {/* MOUTH */}
          {expression === 'talking' ? (
            <ellipse cx="50" cy="62" rx="7" ry="5" fill="#050706" className="animate-pulse" />
          ) : expression === 'surprised' ? (
            <circle cx="50" cy="64" r="5" fill="#050706" />
          ) : (
            /* Wide Friendly Smile */
            <path
              d="M 36 58 Q 50 72, 64 58"
              fill="none"
              stroke="#050706"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Cheerful Blush Dots */}
          <circle cx="30" cy="52" r="3.2" fill="#FF3366" opacity="0.4" />
          <circle cx="70" cy="52" r="3.2" fill="#FF3366" opacity="0.4" />
        </svg>

        {/* Status Tag */}
        <span className="absolute -top-2 px-2 py-0.5 bg-black border border-tva-amber text-[8px] font-bold text-[#FFB52E] tracking-widest uppercase shadow-md pointer-events-none">
          {isOpen ? 'GUIDE ACTIVE' : 'TVA AGENT'}
        </span>
      </motion.div>
    </div>
  );
}
