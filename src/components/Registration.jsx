import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playAccessGrantedSound, playTerminalBeep, playGlitchSound } from '../utils/soundEffects';
import ClearanceCard from './ClearanceCard';

/**
 * SECTION 10 & 11: TVA TEMPORAL CLEARANCE TERMINAL
 * 
 * Features:
 * - Technical status structure: Access Level, Temporal ID, Variant Status, Timeline Integrity
 * - Central temporal clearance mechanism: Circular scanner with rotating partial rings, scan beam, orbiting markers, and TVA symbols
 * - Authentic 3-step clearance sequence: SCANNING TEMPORAL SIGNATURE... -> SIGNATURE VERIFIED -> CLEARANCE GRANTED
 * - Clearance button designed as a TVA control mechanism (technical border, green edge, amber accent, scanline, status light)
 * - 100% fully accessible inputs and guaranteed zero overflow
 */
export default function Registration({ onSetCursor, onTriggerEpilogue }) {
  // Submission stages: 'idle' | 'scanning' | 'verifying' | 'approved'
  const [submissionState, setSubmissionState] = useState('idle');
  const [statusText, setStatusText] = useState('CLEARANCE REQUIRED // PENDING AUTH');
  const [showClearanceModal, setShowClearanceModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    variantAlias: '',
    temporalComms: '',
    institution: 'Bennett University',
    syndicateName: '',
    incursionTrack: 'branch-616', // AI Vector
  });

  const [assignedVariantId, setAssignedVariantId] = useState(() => 'TVA-616-' + Math.floor(1000 + Math.random() * 9000));
  const [isDemoCleared, setIsDemoCleared] = useState(false);

  // Countdown timer to event
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-18T10:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClearanceSubmit = (e) => {
    e.preventDefault();
    if (submissionState !== 'idle') return;

    playGlitchSound();
    setSubmissionState('scanning');
    setStatusText('SCANNING TEMPORAL SIGNATURE... [35%]');

    // Phase 1 -> Phase 2: Signature Verified
    setTimeout(() => {
      playTerminalBeep();
      setSubmissionState('verifying');
      setStatusText('SIGNATURE VERIFIED // ZERO ANOMALY [80%]');
    }, 1100);

    // Phase 2 -> Phase 3: Clearance Granted
    setTimeout(() => {
      playAccessGrantedSound();
      setSubmissionState('approved');
      setIsDemoCleared(true);
      setStatusText('CLEARANCE GRANTED // VARIANT PASS GENERATED [100%]');
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.75 },
        colors: ['#7FCF8A', '#F5A623', '#FFB52E', '#E8E2D0'],
      });
    }, 2300);
  };

  const handleResetForm = () => {
    setSubmissionState('idle');
    setIsDemoCleared(false);
    setStatusText('CLEARANCE REQUIRED // PENDING AUTH');
    setAssignedVariantId('TVA-616-' + Math.floor(1000 + Math.random() * 9000));
  };

  return (
    <section
      id="registration"
      className="relative py-28 px-4 sm:px-8 max-w-5xl mx-auto z-10 font-mono text-center overflow-x-hidden layer-content"
    >
      {/* Decorative Atmosphere Glow (pointer-events-none, z-index 1) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none layer-atmosphere"
        style={{
          background: 'radial-gradient(circle, rgba(127, 207, 138, 0.08) 0%, rgba(245, 166, 35, 0.04) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* CLIMAX INTRO HEADER */}
      <div className="relative z-10 space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#7FCF8A] bg-[#050706]/90 text-xs text-[#7FCF8A] tracking-widest uppercase shadow-[0_0_15px_rgba(127,207,138,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-ping" />
          <span>TVA STATUS: VARIANT DETECTED // SECTOR 616-NCR</span>
        </div>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-tva-bone uppercase tracking-wide leading-none">
          YOUR TIMELINE AWAITS.
        </h2>

        <p className="font-mono text-xs sm:text-sm text-[#F5A623] tracking-[0.25em] uppercase font-bold">
          TIME VARIANCE AUTHORITY // TEMPORAL CLEARANCE TERMINAL
        </p>

        {/* Live Countdown Clock */}
        <div className="pt-2 pb-2">
          <span className="text-[10px] text-tva-bone-dim tracking-widest uppercase block mb-3 font-mono">
            TEMPORAL INCURSION COUNTDOWN (18 OCT 2026)
          </span>
          <div className="inline-grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="p-3 sm:p-4 bg-[#090D0B] border border-tva-border/70 min-w-[70px] sm:min-w-[95px] shadow-lg">
                <div className="font-display text-2xl sm:text-4xl text-[#F5A623] font-bold">
                  {String(unit.val).padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] text-tva-bone-dim mt-1 font-mono">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 10: TEMPORAL CLEARANCE TERMINAL CONTAINER
          ========================================================================= */}
      <div className="relative z-20 max-w-3xl mx-auto">
        
        {/* TOP STATUS & TELEMETRY MODULES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-left">
          <div className="p-2.5 bg-[#090D0B] border border-[#7FCF8A]/40 relative">
            <span className="text-[8px] text-tva-bone-dim block">ACCESS LEVEL</span>
            <span className="text-xs text-[#7FCF8A] font-bold">LEVEL 4 EXPEDITED</span>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#7FCF8A]" />
          </div>
          <div className="p-2.5 bg-[#090D0B] border border-[#F5A623]/40 relative">
            <span className="text-[8px] text-tva-bone-dim block">TEMPORAL ID</span>
            <span className="text-xs text-[#F5A623] font-bold">{assignedVariantId}</span>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#F5A623]" />
          </div>
          <div className="p-2.5 bg-[#090D0B] border border-[#FF3366]/40 relative">
            <span className="text-[8px] text-tva-bone-dim block">VARIANT STATUS</span>
            <span className="text-xs text-[#FF3366] font-bold">
              {isDemoCleared ? 'AUTHORIZED' : 'UNREGISTERED'}
            </span>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#FF3366]" />
          </div>
          <div className="p-2.5 bg-[#090D0B] border border-emerald-500/40 relative">
            <span className="text-[8px] text-tva-bone-dim block">TIMELINE INTEGRITY</span>
            <span className="text-xs text-emerald-400 font-bold">99.4% COHERENT</span>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-emerald-400" />
          </div>
        </div>

        {/* MAIN TERMINAL BODY */}
        <div className="p-6 sm:p-8 bg-[#070A08] border-2 border-tva-border hover:border-[#7FCF8A]/70 transition-colors shadow-2xl relative text-left">
          
          {/* Moving Amber Scan Line Animation during submission */}
          {submissionState === 'scanning' && (
            <motion.div
              initial={{ top: '-5%' }}
              animate={{ top: '105%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_20px_#7FCF8A] pointer-events-none z-30"
            />
          )}

          {/* Form Header with Status Indicator */}
          <div className="flex flex-wrap items-center justify-between border-b border-tva-border/60 pb-4 mb-6 gap-2">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${
                submissionState === 'approved' ? 'bg-emerald-400 animate-ping' : 'bg-[#F5A623] animate-pulse'
              }`} />
              <div>
                <span className="text-xs sm:text-sm font-bold text-tva-bone tracking-widest uppercase block">
                  TVA TEMPORAL CLEARANCE TERMINAL
                </span>
                <span className="text-[9px] text-[#7FCF8A] font-mono">
                  {statusText}
                </span>
              </div>
            </div>
            <span className="tva-stamp tva-stamp-amber text-[9px]">
              {isDemoCleared ? 'CLEARANCE APPROVED' : 'RESTRICTED ACCESS'}
            </span>
          </div>

          {/* CENTRAL TEMPORAL CLEARANCE SCANNER MECHANISM */}
          <div className="mb-6 p-4 bg-[#040605] border border-[#7FCF8A]/30 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
            {/* Holographic Circular Scanner Seal */}
            <div className="w-24 h-24 flex-shrink-0 relative flex items-center justify-center">
              {/* Outer broken rotating ring */}
              <div
                className={`absolute inset-0 rounded-full border border-dashed border-[#7FCF8A]/50 ${
                  submissionState === 'scanning' ? 'animate-spin' : 'animate-spin-slow'
                }`}
                style={{ animationDuration: submissionState === 'scanning' ? '3s' : '20s' }}
              />
              {/* Inner counter-rotating partial ring */}
              <div
                className={`absolute inset-2 rounded-full border-t-2 border-b-2 border-l-0 border-r-0 border-[#F5A623]/70 ${
                  submissionState === 'scanning' ? 'animate-spin' : 'animate-spin-slow'
                }`}
                style={{ animationDirection: 'reverse', animationDuration: submissionState === 'scanning' ? '2s' : '15s' }}
              />
              {/* Core Temporal Seal Nucleus */}
              <div className="w-10 h-10 rounded-full bg-[#0B120E] border border-[#7FCF8A] flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(127,207,138,0.4)]">
                <span className="text-[8px] font-display font-black text-[#7FCF8A]">TVA</span>
                <span className="text-[5px] text-[#F5A623]">616</span>
              </div>
            </div>

            {/* Terminal Clearance Telemetry Description */}
            <div className="flex-1 text-xs font-mono space-y-1">
              <div className="flex items-center justify-between text-[10px] text-[#7FCF8A]">
                <span>BIOMETRIC MATRIX // TEMPORAL LOCUS</span>
                <span className="text-tva-amber">LAT: 28.4595° N // SEC-616</span>
              </div>
              <p className="text-tva-bone-dim text-[11px] leading-relaxed">
                Clearance protocol synchronizes your temporal signature across the Sacred Timeline. Authorized registrants receive designated incursion passes for the 36-hour hackathon arena.
              </p>
            </div>
          </div>

          {/* SUCCESS STATE (Variant File Generated) */}
          {isDemoCleared ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 mx-auto rounded-full border-2 border-[#7FCF8A] flex items-center justify-center text-[#7FCF8A] shadow-[0_0_25px_rgba(127,207,138,0.5)]">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#7FCF8A] tracking-wider uppercase">
                  CLEARANCE APPROVED
                </h3>
                <div className="text-xs font-mono text-tva-bone tracking-widest mt-1 uppercase">
                  VARIANT FILE GENERATED // TIMELINE STABLE
                </div>
              </div>

              {/* Dossier Card Preview */}
              <div className="p-4 bg-[#0D120F] border border-[#7FCF8A]/40 text-left text-xs font-mono space-y-2 text-tva-bone">
                <div className="flex justify-between border-b border-tva-border/40 pb-2">
                  <span className="text-tva-bone-dim">DESIGNATION ID:</span>
                  <strong className="text-[#F5A623]">{assignedVariantId}</strong>
                </div>
                <div className="flex justify-between border-b border-tva-border/40 pb-2">
                  <span className="text-tva-bone-dim">VARIANT ALIAS:</span>
                  <strong>{formData.variantAlias || 'Loki Laufeyson'}</strong>
                </div>
                <div className="flex justify-between border-b border-tva-border/40 pb-2">
                  <span className="text-tva-bone-dim">SECTOR HQ:</span>
                  <span className="text-[#7FCF8A]">Bennett University // NCR-616</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tva-bone-dim">SYNDICATE TRACK:</span>
                  <span className="text-tva-bone uppercase">{formData.incursionTrack}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClearanceModal(true)}
                  onMouseEnter={() => onSetCursor?.('button')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-tva-amber to-[#FF6B00] text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 border border-white"
                >
                  <Download size={14} />
                  <span>INSPECT VARIANT PASS</span>
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerEpilogue?.()}
                  onMouseEnter={() => onSetCursor?.('button')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="w-full sm:w-auto px-5 py-3 border border-[#7FCF8A] text-[#7FCF8A] hover:bg-[#7FCF8A] hover:text-black font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={14} />
                  <span>CONVERGE TIMELINE</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  onMouseEnter={() => onSetCursor?.('button')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="w-full sm:w-auto px-5 py-3 border border-tva-border hover:border-tva-bone text-xs text-tva-bone-dim hover:text-tva-bone uppercase tracking-widest transition-colors"
                >
                  <span>NEW REGISTRATION</span>
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE REGISTRATION FORM */
            <form onSubmit={handleClearanceSubmit} className="space-y-4">
              
              {/* Field 1: VARIANT ALIAS */}
              <div>
                <label className="block text-xs text-tva-bone-dim tracking-wider uppercase mb-1.5 font-bold">
                  VARIANT ALIAS (FULL NAME) *
                </label>
                <input
                  type="text"
                  required
                  disabled={submissionState !== 'idle'}
                  placeholder="e.g. Loki Laufeyson / Sylvie Laufeydottir"
                  value={formData.variantAlias}
                  onChange={(e) => setFormData({ ...formData, variantAlias: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#040605] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
                />
              </div>

              {/* Field 2: TEMPORAL COMMS */}
              <div>
                <label className="block text-xs text-tva-bone-dim tracking-wider uppercase mb-1.5 font-bold">
                  TEMPORAL COMMS (EMAIL ADDRESS) *
                </label>
                <input
                  type="email"
                  required
                  disabled={submissionState !== 'idle'}
                  placeholder="variant@bennett.edu.in"
                  value={formData.temporalComms}
                  onChange={(e) => setFormData({ ...formData, temporalComms: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#040605] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
                />
              </div>

              {/* Field 3: INSTITUTION */}
              <div>
                <label className="block text-xs text-tva-bone-dim tracking-wider uppercase mb-1.5 font-bold">
                  INSTITUTION (COLLEGE / UNIVERSITY) *
                </label>
                <input
                  type="text"
                  required
                  disabled={submissionState !== 'idle'}
                  placeholder="Bennett University"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#040605] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
                />
              </div>

              {/* Field 4: SYNDICATE / TEAM */}
              <div>
                <label className="block text-xs text-tva-bone-dim tracking-wider uppercase mb-1.5 font-bold">
                  SYNDICATE / TEAM ALIAS *
                </label>
                <input
                  type="text"
                  required
                  disabled={submissionState !== 'idle'}
                  placeholder="e.g. TVA Minutemen // Incursion Unit 42"
                  value={formData.syndicateName}
                  onChange={(e) => setFormData({ ...formData, syndicateName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#040605] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
                />
              </div>

              {/* Field 5: INCURSION TRACK */}
              <div>
                <label className="block text-xs text-tva-bone-dim tracking-wider uppercase mb-1.5 font-bold">
                  INCURSION TRACK (CHOOSE BRANCH) *
                </label>
                <select
                  disabled={submissionState !== 'idle'}
                  value={formData.incursionTrack}
                  onChange={(e) => setFormData({ ...formData, incursionTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#040605] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors cursor-pointer"
                >
                  <option value="branch-616">TIMELINE 616-B // Neural Incursion (AI & LLMs)</option>
                  <option value="branch-838">TIMELINE 838-Q // Quantum Consensus (Web3 & Cryptography)</option>
                  <option value="branch-199999">TIMELINE 199999-S // Void Sentinel (Cybersecurity & Infra)</option>
                  <option value="branch-trn888">TIMELINE TRN-888 // Multiverse Catalyst (WebXR & Spatial)</option>
                </select>
              </div>

              {/* SECTION 11: TVA CONTROL MECHANISM CLEARANCE BUTTON */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submissionState !== 'idle'}
                  onMouseEnter={() => onSetCursor?.('button')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className={`w-full py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 relative group overflow-hidden ${
                    submissionState === 'idle'
                      ? 'bg-[#0E1511] text-[#7FCF8A] border-2 border-[#7FCF8A] hover:border-[#F5A623] hover:text-[#FFFFFF] shadow-[0_0_20px_rgba(127,207,138,0.25)] hover:shadow-[0_0_30px_rgba(245,166,35,0.4)]'
                      : 'bg-[#121A15] text-[#7FCF8A] border-2 border-[#7FCF8A] cursor-wait'
                  }`}
                >
                  {/* Technical Corner Brackets */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
                  <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />

                  {/* Scanline texture & internal border trace glow */}
                  <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7FCF8A]/10 to-transparent group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />

                  <div className="flex items-center justify-center gap-3 relative z-10">
                    {/* Status Indicator LED */}
                    <span className={`w-2 h-2 rounded-full ${
                      submissionState === 'idle' ? 'bg-[#7FCF8A] group-hover:bg-[#F5A623]' : 'bg-[#F5A623] animate-ping'
                    }`} />

                    {submissionState === 'idle' && (
                      <>
                        <span className="font-mono">AUTHENTICATE & REQUEST CLEARANCE</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    {submissionState === 'scanning' && (
                      <>
                        <RefreshCw size={16} className="animate-spin text-[#7FCF8A]" />
                        <span className="font-mono">SCANNING TEMPORAL SIGNATURE...</span>
                      </>
                    )}
                    {submissionState === 'verifying' && (
                      <span className="font-mono text-tva-amber">SIGNATURE VERIFIED // COMMENCING PASS COMPILATION...</span>
                    )}
                  </div>
                </button>
              </div>

              <div className="text-[10px] text-tva-bone-dim text-center pt-2 font-mono">
                [ CLEARANCE CONFIRMATION WILL GENERATE YOUR OFFICIAL TVA PASS ]
              </div>
            </form>
          )}
        </div>
      </div>

      {/* CLASSIFIED VARIANT PASS MODAL */}
      {showClearanceModal && (
        <ClearanceCard
          variantData={{
            name: formData.variantAlias || 'Loki Laufeyson',
            id: assignedVariantId,
            university: formData.institution,
            team: formData.syndicateName || 'TVA Minutemen',
            track: formData.incursionTrack,
          }}
          onClose={() => setShowClearanceModal(false)}
        />
      )}
    </section>
  );
}
