import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Key, Terminal } from 'lucide-react';
import { playClickSound, playTemporalPulse, playAccessGrantedSound } from '../utils/soundEffects';

export default function TVATerminalAuth({ isOpen, mode, onClose, onSetCursor }) {
  // mode: 'login' | 'signup'
  const [currentMode, setCurrentMode] = useState(mode || 'login');
  
  // Login fields
  const [variantId, setVariantId] = useState('LOKI-616-TX');
  const [temporalSig, setTemporalSig] = useState('••••••••••••');

  // Sign up fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Sync mode if changed from props
  React.useEffect(() => {
    if (mode) setCurrentMode(mode);
    setIsRegistered(false);
    setIsSubmitting(false);
  }, [mode, isOpen]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    playTemporalPulse();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      playAccessGrantedSound();
      setIsRegistered(true);
    }, 1200);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    playTemporalPulse();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      playAccessGrantedSound();
      setIsRegistered(true);
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 select-none font-mono">
      {/* Background CRT and scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-30 pointer-events-none" />

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="relative w-full max-w-md p-6 sm:p-8 bg-[#080B09] border-2 border-tva-amber text-tva-bone shadow-[0_0_50px_rgba(245,166,35,0.3)] overflow-hidden"
      >
        {/* Moving Amber Scan Line Animation */}
        <motion.div
          initial={{ top: "-5%" }}
          animate={{ top: "105%" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent shadow-[0_0_15px_#F5A623] pointer-events-none z-20 opacity-60"
        />

        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          onMouseEnter={() => onSetCursor?.('link')}
          onMouseLeave={() => onSetCursor?.('default')}
          className="absolute top-4 right-4 p-1.5 text-tva-bone-dim hover:text-tva-amber border border-tva-border hover:border-tva-amber z-30 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Mode Selector Tabs (Section 28/29/30) */}
        <div className="flex border-b border-tva-border mb-6 text-xs">
          <button
            onClick={() => {
              playClickSound();
              setCurrentMode('login');
              setIsRegistered(false);
            }}
            className={`flex-1 py-2 font-bold tracking-widest uppercase transition-colors ${
              currentMode === 'login'
                ? 'border-b-2 border-tva-amber text-tva-amber bg-tva-panel'
                : 'text-tva-bone-dim hover:text-tva-bone'
            }`}
          >
            TVA ACCESS [LOGIN]
          </button>
          <button
            onClick={() => {
              playClickSound();
              setCurrentMode('signup');
              setIsRegistered(false);
            }}
            className={`flex-1 py-2 font-bold tracking-widest uppercase transition-colors ${
              currentMode === 'signup'
                ? 'border-b-2 border-[#7FCF8A] text-[#7FCF8A] bg-tva-panel'
                : 'text-tva-bone-dim hover:text-tva-bone'
            }`}
          >
            NEW VARIANT [SIGN UP]
          </button>
        </div>

        {/* REGISTRATION / ACCESS SUCCESS STATE */}
        {isRegistered ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#7FCF8A] flex items-center justify-center text-[#7FCF8A] shadow-[0_0_20px_#7FCF8A]">
              <ShieldCheck size={24} />
            </div>

            <div className="text-sm font-bold tracking-widest text-[#7FCF8A] uppercase">
              {currentMode === 'login' ? 'IDENTITY VERIFIED // TVA CLEARANCE ACTIVE' : 'VARIANT REGISTERED // TIMELINE BRANCH CREATED'}
            </div>

            <div className="p-3 bg-[#0D120F] border border-[#7FCF8A]/40 text-left text-xs text-tva-bone space-y-1.5">
              <div><strong className="text-tva-amber">STATUS:</strong> SACRED TIMELINE PASS ALLOTTED</div>
              <div><strong className="text-tva-amber">SECTOR:</strong> 616-NCR // BENNETT UNIVERSITY</div>
              <div><strong className="text-tva-amber">CLEARANCE:</strong> LEVEL 4 COGNITIVE TRIAL</div>
            </div>

            <p className="text-[11px] text-tva-bone-dim font-body">
              *FRONT-END DEMO SIMULATION: Your temporary clearance has been acknowledged by the local temporal node.
            </p>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-tva-amber to-[#FF6B00] text-black font-bold uppercase tracking-wider text-xs hover:opacity-90"
            >
              PROCEED TO EXPERIENCE &rarr;
            </button>
          </div>
        ) : currentMode === 'login' ? (
          /* SECTION 29: TVA TEMPORAL ACCESS LOGIN */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-left space-y-1">
              <div className="text-[10px] text-[#F5A623] tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                TVA TEMPORAL ACCESS // IDENTITY VERIFICATION
              </div>
              <h3 className="font-display text-2xl text-tva-bone tracking-wide">
                AUTHENTICATE VARIANT
              </h3>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-[10px] text-tva-bone-dim tracking-wider uppercase mb-1">
                  VARIANT ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={variantId}
                    onChange={(e) => setVariantId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050706] border border-tva-border focus:border-tva-amber text-xs text-tva-bone outline-none"
                    placeholder="LOKI-616-TX"
                  />
                  <Terminal size={14} className="absolute right-3 top-2.5 text-tva-bone-dim" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-tva-bone-dim tracking-wider uppercase mb-1">
                  TEMPORAL SIGNATURE
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={temporalSig}
                    onChange={(e) => setTemporalSig(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050706] border border-tva-border focus:border-tva-amber text-xs text-tva-bone outline-none"
                    placeholder="••••••••••••"
                  />
                  <Key size={14} className="absolute right-3 top-2.5 text-tva-bone-dim" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-tva-amber text-black font-bold uppercase tracking-widest text-xs hover:bg-[#FFB52E] transition-colors shadow-amber-sm flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  <span>VERIFYING TEMPORAL SIGNATURE...</span>
                </>
              ) : (
                <span>[ ACCESS TVA ]</span>
              )}
            </button>

            <div className="text-[10px] text-tva-bone-dim text-center">
              DEMO TERMINAL ACCESS // INPUT PRE-LOADED FOR TRIAL
            </div>
          </form>
        ) : (
          /* SECTION 30: CREATE NEW VARIANT (SIGN UP) */
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="text-left space-y-1">
              <div className="text-[10px] text-[#7FCF8A] tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-pulse" />
                INITIALIZE NEW TIMELINE BRANCH
              </div>
              <h3 className="font-display text-2xl text-tva-bone tracking-wide">
                CREATE VARIANT FILE
              </h3>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-[10px] text-tva-bone-dim tracking-wider uppercase mb-1">
                  VARIANT NAME
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050706] border border-tva-border focus:border-[#7FCF8A] text-xs text-tva-bone outline-none"
                  placeholder="e.g. Sylvie, Classic, Alligator"
                />
              </div>

              <div>
                <label className="block text-[10px] text-tva-bone-dim tracking-wider uppercase mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050706] border border-tva-border focus:border-[#7FCF8A] text-xs text-tva-bone outline-none"
                  placeholder="variant@domain.edu"
                />
              </div>

              <div>
                <label className="block text-[10px] text-tva-bone-dim tracking-wider uppercase mb-1">
                  PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050706] border border-tva-border focus:border-[#7FCF8A] text-xs text-tva-bone outline-none"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#7FCF8A] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#A8E6A3] transition-colors shadow-green-sm flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  <span>BRANCHING SACRED TIMELINE...</span>
                </>
              ) : (
                <span>INITIALIZE TIMELINE &rarr;</span>
              )}
            </button>

            <div className="text-[10px] text-tva-bone-dim text-center">
              *FRONT-END DEMO: Creates simulated timeline branch without external backend persistence.
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
