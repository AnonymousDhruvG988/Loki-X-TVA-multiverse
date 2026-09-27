import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTemporalPulse, playAccessGrantedSound, playTerminalBeep } from '../utils/soundEffects';
import ClearanceCard from './ClearanceCard';

/**
 * SECTION 28 & 29: REQUEST TEMPORAL CLEARANCE
 * Strict Architecture:
 * - normal document flow (no position:absolute wrapping the form container)
 * - stacking layers: background (0), atmosphere (1), timeline (2), content (10), interactive form (20)
 * - decorative particles use pointer-events-none
 * - all inputs, labels, and buttons 100% accessible without clipping
 */
export default function Registration({ onSetCursor, onTriggerEpilogue }) {
  // Form submission stages: 'idle' | 'scanning' | 'processing' | 'approved'
  const [submissionState, setSubmissionState] = useState('idle');
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

    playTemporalPulse();
    setSubmissionState('scanning');

    // 1. Scan phase (Form locks, scanner moves across)
    setTimeout(() => {
      playTerminalBeep();
      setSubmissionState('processing');
    }, 1200);

    // 2. Approval phase
    setTimeout(() => {
      playAccessGrantedSound();
      setSubmissionState('approved');
      setIsDemoCleared(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.75 },
        colors: ['#7FCF8A', '#F5A623', '#FFB52E', '#E8E2D0'],
      });
    }, 2400);
  };

  const handleResetForm = () => {
    setSubmissionState('idle');
    setIsDemoCleared(false);
    setAssignedVariantId('TVA-616-' + Math.floor(1000 + Math.random() * 9000));
  };

  return (
    <section
      id="registration"
      className="relative py-28 px-4 sm:px-8 max-w-5xl mx-auto z-10 font-mono text-center overflow-x-hidden"
    >
      {/* Decorative Atmosphere Glow (pointer-events-none, z-index 1) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(127, 207, 138, 0.08) 0%, rgba(245, 166, 35, 0.04) 50%, transparent 70%)',
        }}
      />

      {/* CLIMAX INTRO HEADER (z-index 10) */}
      <div className="relative z-10 space-y-4 mb-12">
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
        <div className="pt-4 pb-2">
          <span className="text-[10px] text-tva-bone-dim tracking-widest uppercase block mb-3">
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
                <div className="text-[9px] sm:text-[10px] text-tva-bone-dim mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE INTERACTIVE CLEARANCE FORM (z-index 20, normal document flow)
          Guaranteed zero overlap, fully accessible across all viewports
          ========================================================================= */}
      <div className="relative z-20 max-w-2xl mx-auto">
        <div className="p-6 sm:p-8 bg-[#080B09] border-2 border-tva-border hover:border-tva-amber/80 transition-colors shadow-2xl relative text-left">
          
          {/* Moving Amber Scan Line Animation during submission */}
          {submissionState === 'scanning' && (
            <motion.div
              initial={{ top: '-5%' }}
              animate={{ top: '105%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_20px_#7FCF8A] pointer-events-none z-30"
            />
          )}

          {/* Form Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-tva-border/60 pb-4 mb-6 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-tva-bone tracking-widest uppercase">
                TVA TEMPORAL CLEARANCE
              </span>
            </div>
            <span className="tva-stamp tva-stamp-amber text-[9px]">
              {isDemoCleared ? 'CLEARANCE APPROVED' : 'RESTRICTED ACCESS'}
            </span>
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

              <p className="text-[11px] text-tva-bone-dim">
                *FRONT-END DEMO SIMULATION: Your clearance token has been validated in local browser storage.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClearanceModal(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-tva-amber to-[#FF6B00] text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Download size={14} />
                  <span>INSPECT VARIANT PASS</span>
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerEpilogue?.()}
                  className="w-full sm:w-auto px-5 py-3 border border-[#7FCF8A] text-[#7FCF8A] hover:bg-[#7FCF8A] hover:text-black font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={14} />
                  <span>CONVERGE TIMELINE</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-5 py-3 border border-tva-border hover:border-tva-bone text-xs text-tva-bone-dim hover:text-tva-bone uppercase tracking-widest transition-colors"
                >
                  <span>NEW REGISTRATION</span>
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE REGISTRATION FORM (Exact fields requested in Directive 29) */
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
                  className="w-full px-3.5 py-2.5 bg-[#050706] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
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
                  className="w-full px-3.5 py-2.5 bg-[#050706] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
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
                  className="w-full px-3.5 py-2.5 bg-[#050706] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
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
                  className="w-full px-3.5 py-2.5 bg-[#050706] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors"
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
                  className="w-full px-3.5 py-2.5 bg-[#050706] border border-tva-border/70 focus:border-[#7FCF8A] text-tva-bone text-xs outline-none transition-colors cursor-pointer"
                >
                  <option value="branch-616">TIMELINE 616-B // Neural Incursion (AI & LLMs)</option>
                  <option value="branch-838">TIMELINE 838-Q // Quantum Consensus (Web3 & Cryptography)</option>
                  <option value="branch-199999">TIMELINE 199999-S // Void Sentinel (Cybersecurity & Infra)</option>
                  <option value="branch-trn888">TIMELINE TRN-888 // Multiverse Catalyst (WebXR & Spatial)</option>
                </select>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submissionState !== 'idle'}
                  onMouseEnter={() => onSetCursor?.('cta')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className={`w-full py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 border ${
                    submissionState === 'idle'
                      ? 'bg-gradient-to-r from-tva-amber via-[#FFB52E] to-[#7FCF8A] text-black border-white hover:scale-[1.01] active:scale-95 shadow-[0_0_25px_rgba(245,166,35,0.4)]'
                      : 'bg-[#121A15] text-[#7FCF8A] border-[#7FCF8A] animate-pulse cursor-wait'
                  }`}
                >
                  {submissionState === 'idle' && (
                    <>
                      <span>REQUEST CLEARANCE</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                  {submissionState === 'scanning' && (
                    <>
                      <RefreshCw size={16} className="animate-spin text-[#7FCF8A]" />
                      <span>TVA BIOMETRIC SCAN IN PROGRESS...</span>
                    </>
                  )}
                  {submissionState === 'processing' && (
                    <span>INTERROGATING SACRED TIMELINE ARCHIVES...</span>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-tva-bone-dim text-center pt-2">
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
