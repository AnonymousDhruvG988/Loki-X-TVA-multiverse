import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, UserCheck, Cpu, Terminal } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';
import { getAssetUrl } from '../utils/assets';

export default function Personnel({ personnel, onSetCursor }) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!personnel || personnel.length === 0) return null;

  return (
    <section id="personnel" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      
      {/* Section Header */}
      <div className="border-b border-tva-border/60 pb-6 mb-12">
        <div className="flex items-center gap-2 text-xs text-tva-amber uppercase tracking-widest mb-2">
          <UserCheck size={16} />
          <span>07 // COMMAND & EVALUATION PROTOCOL</span>
        </div>
        <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
          AUTHORIZED PERSONNEL
        </h2>
        <p className="text-xs sm:text-sm text-tva-bone-dim max-w-2xl mt-2 font-body leading-relaxed">
          Official dossier credentials of the presiding mentors, judges, faculty patrons, and student chapter directors
          sanctioned to oversee the Sacred Timeline Incursion at Bennett University.
        </p>
      </div>

      {/* Featured Vintage TVA Architectural Schematic Card - Classified Document Architecture */}
      <div className="mb-12 pt-10 pb-8 px-6 sm:px-8 bg-[#070B09] border-2 border-[#7FCF8A]/60 flex flex-col lg:flex-row items-center gap-8 shadow-[0_0_50px_rgba(127,207,138,0.18)] overflow-hidden relative group/schematic">
        
        {/* Archival Classified Document Perimeter Header Strip */}
        <div className="absolute top-0 inset-x-0 h-7 bg-[#0B130E] border-b border-[#7FCF8A]/40 px-4 flex items-center justify-between text-[9px] font-mono text-[#7FCF8A]/80 tracking-widest uppercase select-none pointer-events-none z-30">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-pulse" />
            <span className="font-bold text-[#7FCF8A]">TVA DEPT. TEMPORAL ANTHROPOLOGY // CLASSIFIED ARCHIVE DOSSIER</span>
            <span className="text-tva-bone-dim hidden sm:inline">// FILE: L-1130-VARIANT-OMEGA</span>
          </div>
          <div className="flex items-center gap-4 text-tva-amber font-mono text-[9px]">
            <span className="hidden md:inline">COORD: 28.4595° N, 77.5132° E</span>
            <span className="bg-[#7FCF8A]/20 px-2 py-0.5 border border-[#7FCF8A]/40 text-[#7FCF8A]">[DECLASSIFIED PROTOCOL]</span>
          </div>
        </div>

        {/* Architectural Scanned Document Double Grid (Minor 16px, Major 80px) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(127, 207, 138, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(127, 207, 138, 0.08) 1px, transparent 1px),
              linear-gradient(rgba(127, 207, 138, 0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(127, 207, 138, 0.16) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px, 16px 16px, 80px 80px, 80px 80px',
          }}
        />

        {/* Subtle Archival Scanning Lines */}
        <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none z-0" />

        {/* Occasional Diagnostic Document Laser Sweep */}
        <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#7FCF8A]/70 to-transparent shadow-[0_0_15px_#7FCF8A] animate-blueprint-doc-sweep pointer-events-none z-20" />

        {/* Calibrated Vertical Margin Measurement Rule */}
        <div className="absolute left-1 top-9 bottom-2 w-4 flex flex-col justify-between text-[7px] font-mono text-[#7FCF8A]/40 pointer-events-none select-none hidden sm:flex z-10">
          <span>00.0</span>
          <span>25.0</span>
          <span>50.0</span>
          <span>75.0</span>
          <span>100</span>
        </div>

        {/* Faint Rotating Technical Schematic Dial behind Portrait Viewport */}
        <div className="absolute -left-16 -top-16 w-96 h-96 pointer-events-none opacity-15 z-0">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '65s' }} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#7FCF8A" strokeWidth="1" strokeDasharray="6 4" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#F5A623" strokeWidth="0.8" strokeDasharray="2 8" />
            <circle cx="200" cy="200" r="95" fill="none" stroke="#7FCF8A" strokeWidth="1" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#7FCF8A" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#7FCF8A" strokeWidth="0.5" strokeDasharray="3 3" />
            <text x="205" y="32" fill="#7FCF8A" fontSize="9" fontFamily="monospace">000° CHRONO</text>
            <text x="350" y="196" fill="#7FCF8A" fontSize="9" fontFamily="monospace">090°</text>
            <text x="205" y="390" fill="#7FCF8A" fontSize="9" fontFamily="monospace">180°</text>
            <text x="25" y="196" fill="#7FCF8A" fontSize="9" fontFamily="monospace">270°</text>
          </svg>
        </div>

        {/* Faint Multiverse Threads Weaving Behind Image into Blueprint Canvas */}
        <svg className="absolute left-0 top-6 w-full sm:w-[500px] h-full pointer-events-none opacity-25 z-0" viewBox="0 0 500 400">
          <path d="M 0 110 Q 140 180 270 120 T 500 160" fill="none" stroke="#7FCF8A" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 0 210 Q 180 140 310 240 T 500 220" fill="none" stroke="#F5A623" strokeWidth="1.2" />
          <path d="M 0 310 Q 160 230 300 320 T 500 280" fill="none" stroke="#00F0FF" strokeWidth="1.0" strokeDasharray="6 3" />
        </svg>

        {/* Holographic Blueprint Schematic Viewport */}
        <div className="w-full sm:w-80 lg:w-72 h-84 sm:h-96 flex-shrink-0 border-2 border-[#7FCF8A]/70 bg-black relative rounded overflow-hidden shadow-[0_0_30px_rgba(127,207,138,0.3)] flex flex-col items-center justify-center z-10">
          
          {/* Subtle blueprint grid overlay within image frame */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-25"
            style={{
              backgroundImage: 'linear-gradient(rgba(127, 207, 138, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 207, 138, 0.25) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Caliper Measurement Annotation Lines on Frame */}
          <div className="absolute right-1.5 top-8 bottom-12 flex flex-col justify-between items-center text-[7px] text-[#7FCF8A]/70 z-20 pointer-events-none font-mono">
            <span>▲</span>
            <span className="rotate-90 origin-center whitespace-nowrap">188 cm (EXT)</span>
            <span>▼</span>
          </div>

          <div className="absolute bottom-10 left-8 right-8 flex justify-between items-center text-[7px] text-[#7FCF8A]/70 z-20 pointer-events-none font-mono">
            <span>◄</span>
            <span className="whitespace-nowrap">SPAN: 122.4° [HORNED CROWN]</span>
            <span>►</span>
          </div>

          {/* LOKI BLUEPRINT IMAGE - ROTATED 90 DEGREES TO THE LEFT (-90deg) TO BE UPRIGHT */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
            <img
              src={getAssetUrl('assets/images/loki_blueprint_sketch.png')}
              alt="TVA Architectural Schematic of Variant Loki (God of Stories)"
              className="w-[145%] h-[145%] max-w-none object-cover transition-all duration-700 -rotate-90 filter contrast-125 brightness-110 saturate-110 group-hover/schematic:scale-105 group-hover/schematic:brightness-125"
              style={{
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Subtle green energy field glow around silhouette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#7FCF8A]/5 to-[#7FCF8A]/20 pointer-events-none z-10" />

          {/* Animated Holographic Laser Scanner Sweep across portrait */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_15px_#7FCF8A] animate-tva-sweep pointer-events-none z-20" />

          {/* CRT scanlines & phosphor overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none z-10" />
          <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none z-10" />

          {/* HUD Corner Tech Reticles */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#7FCF8A] pointer-events-none z-20" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#7FCF8A] pointer-events-none z-20" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#7FCF8A] pointer-events-none z-20" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#7FCF8A] pointer-events-none z-20" />

          {/* Overlay Schematic Badges */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 bg-black/85 border border-[#7FCF8A]/60 text-[9px] text-[#7FCF8A] font-mono tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>SCHEMATIC // L-1130</span>
          </div>

          {/* Integrated Temporal Resonance Waveform Display at bottom */}
          <div className="absolute bottom-2 inset-x-2 z-20 bg-black/90 px-2.5 py-1.5 border border-[#7FCF8A]/50 backdrop-blur-sm flex flex-col gap-1">
            <div className="flex items-center justify-between text-[8px] font-mono text-[#7FCF8A]">
              <span>CROWN RESONANCE: 99.8%</span>
              <span className="text-tva-amber font-bold">[BIO-HARMONIC]</span>
            </div>
            {/* Live SVG Temporal Waveform */}
            <div className="w-full h-4 overflow-hidden relative">
              <svg className="w-full h-full" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path
                  d="M 0 10 Q 25 2 50 10 T 100 10 T 150 10 T 200 10"
                  fill="none"
                  stroke="#7FCF8A"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
                <circle cx="100" cy="10" r="2.5" fill="#FFFFFF" className="animate-ping" />
              </svg>
            </div>
          </div>
        </div>

        {/* Blueprint Description and Variant Dossier Details */}
        <div className="space-y-4 font-mono flex-1 z-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#7FCF8A]">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#173F32]/50 border border-[#7FCF8A]/40 text-[#7FCF8A] text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-pulse" />
              <span>CLASSIFIED ARCHITECTURAL RECORD // VARIANT FORM</span>
            </span>
            <span className="text-tva-amber text-[10px] tracking-wider">
              SYS-CHRONO // CITADEL-01
            </span>
          </div>

          {/* Directive 12: Archetype Title with subtle temporal shimmer and diagnostic cursor */}
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-tva-bone leading-tight">
            TEMPORAL ARCHETYPE BLUEPRINT:{' '}
            <span className="relative inline-block text-[#7FCF8A] font-bold tracking-wide">
              <span className="temporal-shimmer">GOD OF STORIES</span>
              <span className="inline-block w-2.5 h-6 bg-[#7FCF8A] ml-2 align-middle animate-ping opacity-75" style={{ animationDuration: '1.4s' }} />
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-tva-bone-dim leading-relaxed font-body max-w-2xl">
            Recovered from the Citadel at the End of Time. Precise bio-temporal schematics outlining Loki's transition from Asgardian Prince to the Loom-Woven anchor of infinite timelines. Features scepter conduction harmonics, Horned Crown electromagnetic matrix, and multiversal thread entanglement capacity.
          </p>

          {/* 4 Classification Readout Modules with TVA terminal aesthetic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-2.5 bg-black/75 border border-[#7FCF8A]/40 relative group/box hover:border-[#7FCF8A] transition-colors">
              <div className="text-[7px] text-[#7FCF8A]/60 font-mono tracking-widest mb-0.5">SEC-01 // IDENTITY</div>
              <span className="text-[9px] text-tva-bone-dim block">VARIANT CLASSIFICATION</span>
              <span className="text-xs text-[#7FCF8A] font-bold">L-1130 PRIME</span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#7FCF8A]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#7FCF8A]" />
            </div>

            <div className="p-2.5 bg-black/75 border border-[#F5A623]/40 relative group/box hover:border-[#F5A623] transition-colors">
              <div className="text-[7px] text-[#F5A623]/60 font-mono tracking-widest mb-0.5">SEC-02 // FREQUENCY</div>
              <span className="text-[9px] text-tva-bone-dim block">THREAD CONDUCTANCE</span>
              <span className="text-xs text-tva-amber font-bold">INFINITE GHz</span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#F5A623]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#F5A623]" />
            </div>

            <div className="p-2.5 bg-black/75 border border-emerald-500/40 relative group/box hover:border-emerald-400 transition-colors">
              <div className="text-[7px] text-emerald-400/60 font-mono tracking-widest mb-0.5">SEC-03 // COHERENCE</div>
              <span className="text-[9px] text-tva-bone-dim block">ENTROPY STABILITY</span>
              <span className="text-xs text-emerald-400 font-bold">100.0% COHERENT</span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-400" />
            </div>

            <div className="p-2.5 bg-black/75 border border-[#F5A623]/40 relative group/box hover:border-[#F5A623] transition-colors">
              <div className="text-[7px] text-[#F5A623]/60 font-mono tracking-widest mb-0.5">SEC-04 // TELEMETRY</div>
              <span className="text-[9px] text-tva-bone-dim block">CURRENT STATUS</span>
              <span className="text-xs text-tva-amber font-bold">THRONE OF STORIES</span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#F5A623]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#F5A623]" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-[10px] text-tva-bone-dim pt-3 border-t border-[#7FCF8A]/30">
            <div><strong className="text-tva-amber">SECURITY:</strong> EYES ONLY // TIME KEEPERS</div>
            <div><strong className="text-[#7FCF8A]">STATUS:</strong> DECLASSIFIED FOR HACKATHON PROTOCOL</div>
            <div><strong className="text-tva-bone">ARCHIVE ID:</strong> BU-616-LOKI</div>
          </div>
        </div>
      </div>

      {/* Grid of TVA ID Badges - Section 9 Layer Architecture (z-index 20, opaque backing) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
        {personnel.map((agent) => {
          const isHovered = hoveredId === agent.id;

          return (
            <motion.div
              key={agent.id}
              onMouseEnter={() => {
                setHoveredId(agent.id);
                onSetCursor?.('link');
                playClickSound();
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                onSetCursor?.('default');
              }}
              whileHover={{ y: -4 }}
              className={`group relative p-6 border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl z-20 ${
                isHovered
                  ? 'border-tva-amber shadow-amber-md bg-[#121915]'
                  : 'border-tva-border/90 bg-[#0B0F0D]'
              }`}
            >
              {/* ID Badge Header Barcode */}
              <div>
                <div className="flex items-center justify-between border-b border-tva-border/50 pb-3 mb-4 text-[10px] text-tva-bone-dim">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tva-amber" />
                    <span>TVA-ID // {agent.badgeId}</span>
                  </div>
                  <span className="tracking-widest font-mono text-tva-amber opacity-60 group-hover:opacity-100 transition-opacity">
                    |||| || | || |||
                  </span>
                </div>

                {/* ID Photo Frame & Meta */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar Icon Frame */}
                  <div className="w-14 h-14 rounded border border-tva-amber/40 bg-neutral-900 flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:border-tva-amber transition-colors">
                    <Shield size={24} className="text-tva-amber opacity-80" />
                    <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className={`font-display text-2xl text-tva-bone transition-colors leading-tight ${
                      isHovered ? 'text-tva-amber glitch-text' : ''
                    }`} data-text={agent.name}>
                      {agent.name}
                    </h3>
                    <div className="text-xs text-tva-amber font-semibold mt-0.5">
                      {agent.role}
                    </div>
                    <div className="text-[10px] text-tva-bone-dim mt-0.5">
                      {agent.designation}
                    </div>
                  </div>
                </div>

                {/* Clearance Badge */}
                <div className="my-3 py-1.5 px-2 bg-neutral-950/60 border-l-2 border-tva-amber text-[10px] text-tva-bone flex items-center justify-between">
                  <span>SECURITY CLEARANCE:</span>
                  <span className="text-emerald-400 font-bold">{agent.clearance}</span>
                </div>

                {/* Quote / Mission Directive */}
                <blockquote className="text-xs text-tva-bone-dim italic font-body border-t border-dashed border-tva-border/50 pt-3 my-2 leading-relaxed">
                  "{agent.quote}"
                </blockquote>
              </div>

              {/* Card Footer Specialty */}
              <div className="mt-4 pt-3 border-t border-tva-border/40 flex items-center justify-between text-[10px] text-tva-bone-dim">
                <span className="truncate max-w-[200px]">{agent.specialty}</span>
                <span className="text-tva-amber font-bold">[VERIFIED]</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
