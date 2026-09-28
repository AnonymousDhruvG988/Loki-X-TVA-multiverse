import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, FileText, AlertTriangle, ShieldCheck, Search, CornerDownRight } from 'lucide-react';
import { playTerminalBeep, playTemporalPulse } from '../utils/soundEffects';
import { getAssetUrl } from '../utils/assets';
import AtomicResonanceWidget from './AtomicResonanceWidget';

export default function CaseBriefing({ eventData, onSetCursor }) {
  const [isDeclassified, setIsDeclassified] = useState(false);
  const [inspectedField, setInspectedField] = useState('case');

  const toggleDeclassify = () => {
    playTerminalBeep();
    setIsDeclassified(!isDeclassified);
  };

  const evidenceSteps = [
    { id: 'case', label: 'CASE 26229', title: 'INCIDENT DOSSIER', tag: 'ANOMALY LOGGED' },
    { id: 'subject', label: 'SUBJECT', title: 'VARIANT [YOU]', tag: 'CONFIRMED ANOMALY' },
    { id: 'mission', label: 'MISSION', title: 'TIMELINE RESTORATION', tag: 'TRIAL BY CODE' },
    { id: 'location', label: 'LOCATION', title: 'BENNETT UNIVERSITY', tag: 'SECTOR 616-NCR' },
    { id: 'window', label: 'TEMPORAL WINDOW', title: '18 — 19 OCT 2026', tag: '36 HOURS' },
  ];

  return (
    <section id="briefing" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-pulse" />
            <span>02 // TVA ARCHIVAL INVESTIGATION</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            EVIDENCE DOSSIER
          </h2>
          <div className="text-xs text-tva-bone-dim mt-1 font-body">
            Classified incident investigation into the newly identified Variant in Sector 616-NCR.
          </div>
        </div>

        {/* Declassify Toggle Button */}
        <button
          onClick={toggleDeclassify}
          onMouseEnter={() => onSetCursor?.('link')}
          onMouseLeave={() => onSetCursor?.('default')}
          className="flex items-center gap-2 px-4 py-2 border border-tva-amber/80 hover:border-tva-amber bg-[#080B09] text-tva-amber text-xs tracking-wider uppercase transition-all shadow-amber-sm"
        >
          {isDeclassified ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{isDeclassified ? 'RESTORE REDACTIONS' : 'DECLASSIFY EVIDENCE'}</span>
        </button>
      </div>

      {/* Camera Inspection Bar: Section 20 "The camera should move through the document" */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-5 gap-2 border border-tva-border bg-[#080B09] p-2 text-xs">
        {evidenceSteps.map((step) => {
          const isSelected = inspectedField === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                playTerminalBeep();
                setInspectedField(step.id);
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className={`p-2.5 text-left border transition-all ${
                isSelected
                  ? 'border-[#7FCF8A] bg-[#121A15] text-[#7FCF8A]'
                  : 'border-transparent text-tva-bone-dim hover:text-tva-bone'
              }`}
            >
              <div className="text-[10px] text-tva-amber font-bold">{step.label}</div>
              <div className="font-bold text-xs truncate">{step.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left Redacted Dossier, Right Temporal Anomaly Knot & Stamped Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CLASSIFIED REDACTED DOCUMENT (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#090D0B] border border-tva-border relative shadow-2xl overflow-hidden sprocket-border">
          
          {/* Subtle Paper Texture Overlay */}
          <div className="absolute inset-0 tva-noise opacity-25 pointer-events-none" />

          {/* Dossier Header Tags */}
          <div className="flex flex-wrap items-center justify-between border-b border-tva-border pb-4 mb-6 text-xs text-tva-bone-dim gap-2">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-tva-amber" />
              <span className="font-bold text-tva-bone">TVA CASE FILE #26229-NCR</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 border border-tva-magenta/60 text-tva-magenta text-[10px] uppercase font-bold">
                EVIDENCE RECORD
              </span>
              <span className="tva-stamp tva-stamp-red text-[10px]">
                RESTRICTED
              </span>
            </div>
          </div>

          {/* Incident Report Narrative with Redaction Bars */}
          <div className="space-y-4 font-mono text-xs sm:text-sm text-tva-bone leading-relaxed">
            
            <div className="p-3 bg-[#050706] border-l-2 border-[#7FCF8A] text-xs space-y-1">
              <div><strong className="text-tva-amber">CASE NUMBER:</strong> 26229</div>
              <div><strong className="text-tva-amber">SUBJECT:</strong> NEWLY DETECTED VARIANT [VISITOR-SESSION-001]</div>
              <div><strong className="text-tva-amber">MISSION:</strong> SACRED TIMELINE RESTORATION VIA TRIAL BY CODE</div>
              <div><strong className="text-tva-amber">LOCATION:</strong> BENNETT UNIVERSITY CAMPUS [GREATER NOIDA]</div>
              <div><strong className="text-tva-amber">TEMPORAL WINDOW:</strong> 18 — 19 OCTOBER 2026 [36-HOUR DURATION]</div>
            </div>

            <div className="border-t border-dashed border-tva-border/60 my-4" />

            {/* Paragraph 1 */}
            <p className="relative">
              At approximately 10:00 hours, surveillance chronometers registered a nexus event.
              {' '}
              <span className={`inline-block transition-all duration-500 ${isDeclassified ? 'bg-transparent text-[#7FCF8A] font-semibold' : 'bg-neutral-800 text-transparent select-none px-1 rounded'}`}>
                A student engineering chapter at Bennett University
              </span>{' '}
              has deployed recursive autonomous algorithms that threaten to splinter the Sacred Timeline into four divergent multiverse realities.
            </p>

            {/* Paragraph 2 with redactions */}
            <p className="relative">
              The visitor currently inspecting this terminal has been identified as a prime{' '}
              <span className={`inline-block transition-all duration-500 ${isDeclassified ? 'bg-transparent text-tva-amber font-semibold' : 'bg-neutral-800 text-transparent select-none px-1 rounded'}`}>
                Variant Developer
              </span>.
              Instead of immediate pruning, General Temporal Command has offered an emergency trial by code. Over{' '}
              <span className={`inline-block transition-all duration-500 ${isDeclassified ? 'bg-transparent text-tva-bone font-semibold' : 'bg-neutral-800 text-transparent select-none px-1 rounded'}`}>
                ₹1,50,000+ in bounties, incubation grants, and TVA gear
              </span>{' '}
              stand ready for syndicates that engineer fault-tolerant solutions across AI, Web3, and Cyber Defense.
            </p>

            {/* Paragraph 3 Directive */}
            <div className="p-3 bg-[#0D120F] border-l-2 border-tva-amber text-[11px] text-tva-bone-dim space-y-1">
              <div className="text-tva-amber font-bold">DIRECTIVE // TVA-DIRECTIVE-409:</div>
              <div>&bull; Ingestion closes 15 OCT 2026 // 23:59 IST.</div>
              <div>&bull; Stabilize your assigned branch before entropy reaches threshold.</div>
              <div>&bull; For All Time. Always.</div>
            </div>
          </div>

          {/* Dossier Footer with Signature Stamp */}
          <div className="mt-8 pt-4 border-t border-tva-border flex items-center justify-between text-[11px] text-tva-bone-dim">
            <div>
              AUTHORIZED BY: <span className="text-tva-bone font-bold">JUDGE RAVONNA RENSLAYER</span>
            </div>
            <div className="tva-stamp tva-stamp-green text-[10px]">
              VERIFIED ARCHIVE
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TEMPORAL ANOMALY KNOT & STAMPED RECORDS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* EXHIBIT A: TVA VARIANT SURVEILLANCE PHOTOGRAPH */}
          <div className="p-4 bg-[#090D0B] border-2 border-tva-amber/70 relative shadow-2xl overflow-hidden group">
            {/* Paperclip */}
            <div className="absolute top-2 right-4 w-4 h-9 border-2 border-neutral-400 rounded-full rotate-12 z-20 pointer-events-none opacity-80" />

            <div className="flex items-center justify-between border-b border-tva-border pb-2 mb-3 text-xs">
              <span className="font-bold text-tva-amber flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tva-amber animate-pulse" />
                EXHIBIT #01 // SUBJECT MUGSHOT
              </span>
              <span className="tva-stamp tva-stamp-red text-[9px]">CONFISCATED</span>
            </div>

            {/* Photo frame with Loki TVA Collar */}
            <div className="relative aspect-[4/3] w-full bg-black border border-tva-border overflow-hidden rounded-sm">
              <img
                src={getAssetUrl('assets/images/loki_tva_collar.png')}
                alt="Subject Variant L-1130 under TVA Detention"
                className="w-full h-full object-cover object-top filter contrast-125 brightness-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 border border-[#7FCF8A] text-[9px] font-mono text-[#7FCF8A]">
                COLLAR-LOCK: ACTIVE // 1.21 GW
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-tva-bone-dim">
              <span>VARIANT: L-1130 [PRIME]</span>
              <span className="text-tva-amber font-mono">STATUS: RE-ASSIGNED TO TRIAL</span>
            </div>
          </div>

          {/* ATOMIC ANOMALY RESONANCE ORBITAL SYSTEM */}
          <AtomicResonanceWidget />

          {/* STAMPED EVENT RECORDS GRID */}
          <div className="p-6 bg-[#090D0B] border border-tva-border space-y-3.5">
            
            <div className="flex items-center justify-between border-b border-tva-border pb-2 text-xs">
              <span className="text-tva-bone-dim">VERIFIED PARAMETERS</span>
              <span className="tva-stamp tva-stamp-amber text-[9px]">OFFICIAL FILE</span>
            </div>

            {/* Record 1: Date */}
            <div className="flex items-start justify-between text-xs py-1 border-b border-tva-border/30">
              <span className="text-tva-bone-dim">TEMPORAL WINDOW</span>
              <span className="text-tva-amber font-bold text-right">{eventData.details.date}</span>
            </div>

            {/* Record 2: Time */}
            <div className="flex items-start justify-between text-xs py-1 border-b border-tva-border/30">
              <span className="text-tva-bone-dim">START TIMECODE</span>
              <span className="text-tva-bone font-bold text-right">{eventData.details.time}</span>
            </div>

            {/* Record 3: Venue */}
            <div className="flex items-start justify-between text-xs py-1 border-b border-tva-border/30">
              <span className="text-tva-bone-dim">LOCATION</span>
              <span className="text-tva-bone font-bold text-right max-w-[210px]">{eventData.details.venue}</span>
            </div>

            {/* Record 4: Organizer */}
            <div className="flex items-start justify-between text-xs py-1 border-b border-tva-border/30">
              <span className="text-tva-bone-dim">CHAPTER HOST</span>
              <span className="text-[#7FCF8A] font-bold text-right">{eventData.organizer.name}</span>
            </div>

            {/* Record 5: Eligibility */}
            <div className="flex items-start justify-between text-xs py-1">
              <span className="text-tva-bone-dim">ELIGIBILITY STATUS</span>
              <span className="text-[#7FCF8A] font-bold text-right">{eventData.details.eligibility}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
