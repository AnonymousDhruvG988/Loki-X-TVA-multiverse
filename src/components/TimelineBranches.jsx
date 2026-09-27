import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Terminal, Shield, Sparkles, Cpu, Layers, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { playClickSound, playTemporalPulse, playGlitchSound } from '../utils/soundEffects';

export default function TimelineBranches({ branches, onSetCursor, onSelectTrack }) {
  const [activeBranchId, setActiveBranchId] = useState(branches[0]?.id || 'branch-616');
  const [hoveredBranchId, setHoveredBranchId] = useState(null);
  const [isColliding, setIsColliding] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const handleBranchSelect = (id) => {
    if (id === activeBranchId) return;
    // Section 23: Timeline Collision signature event
    playGlitchSound();
    setIsColliding(true);
    setTimeout(() => {
      playTemporalPulse();
      setIsColliding(false);
      setActiveBranchId(id);
      if (onSelectTrack) onSelectTrack(id);
    }, 700);
  };

  return (
    <section id="branches" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      
      {/* Section Header */}
      <div className="border-b border-tva-border pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <GitBranch size={16} />
            <span>03 // SIGNATURE TIMELINE ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            BRANCHED TIMELINES
          </h2>
          <p className="text-xs sm:text-sm text-tva-bone-dim max-w-2xl mt-1 font-body leading-relaxed">
            The Sacred Timeline has bifurcated into four competitive incursion vectors. Inspect each reality's deviation, problem statements, and allocated bounties.
          </p>
        </div>

        <div className="text-[10px] text-tva-bone-dim bg-[#090D0B] px-3 py-1.5 border border-tva-border flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
          <span>REALITY CONVERGENCE: ACTIVE</span>
        </div>
      </div>

      {/* SECTION 23: TIMELINE COLLISION OVERLAY */}
      {isColliding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            className="text-center space-y-3"
          >
            <div className="text-4xl sm:text-6xl font-display text-[#7FCF8A] tracking-widest animate-pulse">
              ⚡ TIMELINE COLLISION IN PROGRESS
            </div>
            <div className="text-xs font-mono text-tva-amber tracking-[0.3em]">
              TEMPORAL STABILIZATION VECTOR ENGAGED // RE-ROUTING STREAM
            </div>
          </motion.div>
        </div>
      )}

      {/* DESKTOP BRANCHING SVG DIAGRAM (Visible on lg and above) */}
      <div className="hidden lg:block relative mb-12 p-8 bg-[#090D0B] border border-tva-border">
        
        {/* Top Trunk Node: Sacred Timeline */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="px-6 py-2.5 bg-[#0D120F] border-2 border-[#7FCF8A] text-[#7FCF8A] font-display text-xl tracking-wider shadow-green-sm flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7FCF8A]" />
            SACRED TIMELINE // GEEKSFORGEEKS BENNETT UNIVERSITY
          </div>
          <span className="text-[10px] text-tva-bone-dim mt-1">ORIGIN POINT // ZERO ENTROPY DRIFT</span>
        </div>

        {/* Branching SVG Network Lines */}
        <div className="relative w-full h-36">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 140" preserveAspectRatio="none">
            {/* Central Vertical Stem */}
            <line x1="500" y1="0" x2="500" y2="40" stroke="#7FCF8A" strokeWidth="2.5" />

            {/* 4 Diverging Branches to X: 125, 375, 625, 875 */}
            {branches.map((b, idx) => {
              const targetX = 125 + idx * 250;
              const isSelected = activeBranchId === b.id;
              const isHovered = hoveredBranchId === b.id;
              const isLit = isSelected || isHovered;

              const d = `M 500 40 C 500 90, ${targetX} 50, ${targetX} 140`;

              return (
                <g key={b.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={isLit ? b.color : '#1C2A22'}
                    strokeWidth={isLit ? 3 : 1.5}
                    strokeDasharray={isLit ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                  {isLit && (
                    <circle cx={targetX} cy="140" r="4.5" fill={b.color} />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 4 Branch Selector Cards */}
        <div className="grid grid-cols-4 gap-4 mt-2">
          {branches.map((b) => {
            const isSelected = activeBranchId === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleBranchSelect(b.id)}
                onMouseEnter={() => {
                  setHoveredBranchId(b.id);
                  onSetCursor?.('timeline-node');
                  playClickSound();
                }}
                onMouseLeave={() => {
                  setHoveredBranchId(null);
                  onSetCursor?.('default');
                }}
                className={`p-4 text-left border transition-all duration-300 relative ${
                  isSelected
                    ? 'border-[#7FCF8A] bg-[#121A15] shadow-green-sm scale-[1.02]'
                    : 'border-tva-border bg-[#050706]/70 hover:border-tva-amber/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="font-bold tracking-widest" style={{ color: b.color }}>
                    {b.code}
                  </span>
                  <span className="px-1.5 py-0.5 bg-black border border-tva-border text-[9px] text-tva-bone-dim">
                    {b.deviation}
                  </span>
                </div>

                <div className="font-display text-xl text-tva-bone leading-tight">
                  {b.title}
                </div>

                <div className="text-[11px] text-tva-bone-dim mt-2 line-clamp-2">
                  {b.tagline}
                </div>

                {isSelected && (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#7FCF8A] font-bold">
                    <Zap size={12} />
                    <span>TIMELINE ENGAGED</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE BRANCH TABS */}
      <div className="block lg:hidden mb-6">
        <div className="grid grid-cols-2 gap-2">
          {branches.map((b) => {
            const isSelected = activeBranchId === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleBranchSelect(b.id)}
                className={`p-3 text-left border text-xs ${
                  isSelected
                    ? 'border-[#7FCF8A] bg-[#121A15] text-[#7FCF8A] font-bold'
                    : 'border-tva-border bg-[#050706] text-tva-bone-dim'
                }`}
              >
                <div className="font-bold">{b.code}</div>
                <div className="text-[11px] truncate text-tva-bone">{b.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TRACK DOSSIER DETAIL CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBranch.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 bg-[#090D0B] border-2 border-[#7FCF8A] relative shadow-2xl overflow-hidden"
        >
          {/* Top Dossier Meta */}
          <div className="flex flex-wrap items-center justify-between border-b border-tva-border pb-4 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: activeBranch.color }} />
              <span className="font-mono text-sm font-bold tracking-widest text-tva-bone">
                INCURSION VECTOR: {activeBranch.code}
              </span>
              <span className="text-[10px] px-2 py-0.5 border border-tva-border text-tva-bone-dim uppercase">
                {activeBranch.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-tva-bone-dim">DEVIATION:</span>
              <span className="text-tva-amber font-bold">{activeBranch.deviation}</span>
              <span className="tva-stamp tva-stamp-green text-[9px]">{activeBranch.status}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-display text-3xl sm:text-4xl text-tva-bone">
                {activeBranch.title}
              </h3>
              <p className="text-xs sm:text-sm text-tva-bone-dim font-body leading-relaxed">
                {activeBranch.description}
              </p>

              {/* Challenge Briefing Box */}
              <div className="p-4 bg-[#050706] border-l-2 border-[#7FCF8A] space-y-2 mt-4">
                <div className="text-xs text-[#7FCF8A] font-bold tracking-wider flex items-center gap-2">
                  <Terminal size={14} />
                  <span>TACTICAL MISSION DIRECTIVE</span>
                </div>
                <p className="text-xs text-tva-bone leading-relaxed">
                  {activeBranch.challengeBrief}
                </p>
              </div>

              {/* Recommended Tech Weapons */}
              <div className="pt-2">
                <span className="text-[11px] text-tva-bone-dim block mb-2 font-mono">
                  AUTHORIZED CODE WEAPONRY:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeBranch.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-black border border-tva-border text-xs text-tva-bone tracking-wide hover:border-[#7FCF8A] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Bounty & Tactical Variant Leader */}
            <div className="lg:col-span-4 p-5 bg-[#050706] border border-tva-border flex flex-col justify-between space-y-4">
              
              {/* Divergent Variant Leader Card */}
              <div className="relative border border-[#7FCF8A]/40 bg-[#090D0B] overflow-hidden group">
                <div className="flex items-center justify-between p-2 border-b border-tva-border text-[10px]">
                  <span className="text-[#7FCF8A] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
                    BRANCH SURVEILLANCE
                  </span>
                  <span className="text-tva-amber font-mono">VARIANT: PRESIDENT LOKI</span>
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src="/assets/images/loki_president_variant.png"
                    alt="President Loki Variant Leading Timeline Incursion"
                    className="w-full h-full object-cover object-top filter brightness-110 contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-1 left-2 text-[9px] font-mono text-[#7FCF8A]">
                    DIVERGENCE THREAT: 98.4% // MULTIVERSE INCURSION
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-tva-bone-dim block mb-1 font-mono">ALLOCATED BOUNTY POOL</span>
                <div className="font-display text-3xl text-tva-amber font-bold">
                  {activeBranch.bounty}
                </div>
                <span className="text-[11px] text-tva-bone-dim block mt-0.5">
                  Bennett University Incubation Grants & TVA Gear Included
                </span>
              </div>

              <div className="border-t border-dashed border-tva-border pt-3 space-y-1.5 text-xs text-tva-bone-dim font-mono">
                <div className="flex justify-between">
                  <span>MAX SYNDICATES:</span>
                  <span className="text-tva-bone">30 Teams</span>
                </div>
                <div className="flex justify-between">
                  <span>MENTORING:</span>
                  <span className="text-[#7FCF8A]">FAANG & Research Leads</span>
                </div>
              </div>

              <a
                href="#registration"
                onClick={() => playTemporalPulse()}
                onMouseEnter={() => onSetCursor?.('link')}
                onMouseLeave={() => onSetCursor?.('default')}
                className="w-full py-3 bg-[#7FCF8A] hover:bg-[#A8E6A3] text-black font-bold text-center text-xs tracking-wider uppercase transition-colors shadow-green-sm"
              >
                STABILIZE THIS TIMELINE &rarr;
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
