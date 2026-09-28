import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Terminal, Shield, Sparkles, Cpu, Layers, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { playClickSound, playTemporalPulse, playGlitchSound } from '../utils/soundEffects';
import { getAssetUrl } from '../utils/assets';

// Multiverse branch string strand definitions with DIFFERENT NUMBER OF STRINGS per branch (Loki & TVA theme only)
const BRANCH_STRANDS_CONFIG = [
  // Branch 0 (Earth-616): 5 strings (Emerald & Gold cords: AI & Sacred Timeline)
  {
    branchId: 'branch-616',
    strands: [
      { color: '#7FCF8A', width: 2.4, offset: -8, speed: 1.1, amp: 7, phase: 0 },
      { color: '#FFD700', width: 1.8, offset: -4, speed: 0.9, amp: 9, phase: 1.2 },
      { color: '#538662', width: 2.2, offset: 0, speed: 1.3, amp: 8, phase: 2.1 },
      { color: '#A8E6A3', width: 1.6, offset: 4, speed: 1.0, amp: 10, phase: 3.4 },
      { color: '#F5A623', width: 1.9, offset: 8, speed: 0.85, amp: 6, phase: 4.5 },
    ],
  },
  // Branch 1 (Earth-838): 4 strings (Amber & Solar cords: Web3 & Quantum)
  {
    branchId: 'branch-838',
    strands: [
      { color: '#F5A623', width: 2.5, offset: -6, speed: 1.2, amp: 8, phase: 0.5 },
      { color: '#FFB52E', width: 2.0, offset: -2, speed: 1.0, amp: 11, phase: 1.8 },
      { color: '#FF8C00', width: 1.8, offset: 2, speed: 1.4, amp: 9, phase: 2.9 },
      { color: '#E8E2D0', width: 1.5, offset: 6, speed: 0.9, amp: 7, phase: 4.1 },
    ],
  },
  // Branch 2 (Earth-199999): 5 strings (Stories Green & Frost Emerald cords: Cyber Resiliency)
  {
    branchId: 'branch-199999',
    strands: [
      { color: '#38EF7D', width: 2.3, offset: -8, speed: 1.1, amp: 8, phase: 0.2 },
      { color: '#7FCF8A', width: 1.8, offset: -4, speed: 1.3, amp: 10, phase: 1.5 },
      { color: '#A8E6A3', width: 1.6, offset: 0, speed: 0.85, amp: 7, phase: 2.7 },
      { color: '#FFFFFF', width: 1.4, offset: 4, speed: 1.5, amp: 11, phase: 3.9 },
      { color: '#538662', width: 1.8, offset: 8, speed: 1.0, amp: 8, phase: 5.1 },
    ],
  },
  // Branch 3 (Earth-TRN888): 4 strings (TVA Loom Gold & Golden Amber cords: Creative Tech)
  {
    branchId: 'branch-trn888',
    strands: [
      { color: '#FFD700', width: 2.5, offset: -6, speed: 1.25, amp: 10, phase: 0.8 },
      { color: '#F5A623', width: 2.1, offset: -1, speed: 1.0, amp: 12, phase: 2.3 },
      { color: '#FFB800', width: 1.8, offset: 3, speed: 1.4, amp: 8, phase: 3.7 },
      { color: '#E8E2D0', width: 1.5, offset: 7, speed: 0.9, amp: 9, phase: 1.4 },
    ],
  },
];

function BranchStringsCanvas({ branches, activeBranchId, hoveredBranchId }) {
  const canvasRef = useRef(null);
  const activeBranchIdRef = useRef(activeBranchId);
  const hoveredBranchIdRef = useRef(hoveredBranchId);
  const weightsRef = useRef({});

  useEffect(() => {
    activeBranchIdRef.current = activeBranchId;
  }, [activeBranchId]);

  useEffect(() => {
    hoveredBranchIdRef.current = hoveredBranchId;
  }, [hoveredBranchId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 1000);
    let height = (canvas.height = canvas.offsetHeight || 170);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 1000;
      height = canvas.height = canvas.offsetHeight || 170;
    };
    window.addEventListener('resize', handleResize);

    let animId = null;
    let t = 0;

    // Initialize weights
    branches.forEach((b) => {
      weightsRef.current[b.id] = (b.id === activeBranchIdRef.current ? 1.0 : 0.08);
    });

    const render = () => {
      t += 0.026; // Smooth real-time wave oscillation
      ctx.clearRect(0, 0, width, height);

      const originX = width * 0.5;
      const originY = 15;
      const activeId = activeBranchIdRef.current;
      const hoveredId = hoveredBranchIdRef.current;
      const isAnyHovered = Boolean(hoveredId);

      // 1. Central Origin Cords (stem from top trunk)
      [-6, -2, 2, 6].forEach((xOff, i) => {
        ctx.beginPath();
        ctx.moveTo(originX + xOff, 0);
        ctx.lineTo(originX + xOff, originY + 8);
        ctx.strokeStyle = i === 1 || i === 2 ? '#7FCF8A' : 'rgba(127, 207, 138, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      // Luminous origin singularity dot
      ctx.beginPath();
      ctx.arc(originX, originY + 8, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.95;
      ctx.fill();

      // 2. Render each of the divergent branches with smooth continuous weight transitions
      branches.forEach((b, bIdx) => {
        const targetX = (width / 8) * (1 + bIdx * 2);
        const targetY = height - 10;

        // Calculate target glow weight
        let targetWeight = 0.08;
        if (hoveredId === b.id) {
          targetWeight = 1.0;
        } else if (activeId === b.id) {
          targetWeight = isAnyHovered ? 0.28 : 1.0;
        }

        const currentWeight = (weightsRef.current[b.id] ?? 0.08);
        const newWeight = currentWeight + (targetWeight - currentWeight) * 0.08;
        weightsRef.current[b.id] = newWeight;

        const isMotherBranch = newWeight > 0.45;
        const config = BRANCH_STRANDS_CONFIG.find((c) => c.branchId === b.id) || BRANCH_STRANDS_CONFIG[bIdx % BRANCH_STRANDS_CONFIG.length];

        const cx1 = originX + (targetX - originX) * 0.18;
        const cy1 = originY + 48;
        const cx2 = targetX - (targetX - originX) * 0.18;
        const cy2 = originY + 58;

        // If mother branch, draw glowing outer aura ribbon first
        if (isMotherBranch) {
          ctx.save();
          ctx.beginPath();
          const steps = 36;
          for (let step = 0; step <= steps; step++) {
            const p = step / steps;
            const u = 1 - p;
            const baseX = u * u * u * originX + 3 * u * u * p * cx1 + 3 * u * p * p * cx2 + p * p * p * targetX;
            const baseY = u * u * u * (originY + 8) + 3 * u * u * p * cy1 + 3 * u * p * p * cy2 + p * p * p * targetY;
            const wave = Math.sin(p * Math.PI * 2.5 + t * 1.5) * 8 * Math.sin(p * Math.PI);
            const x = baseX + wave;
            const y = baseY;

            if (step === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 6.2 * newWeight;
          ctx.globalAlpha = 0.35 * newWeight;
          ctx.stroke();
          ctx.restore();
        }

        // Draw the branch strands
        config.strands.forEach((strand) => {
          const waveAmp = strand.amp * (0.75 + newWeight * 0.65);
          const waveSpeed = t * strand.speed + strand.phase;

          ctx.beginPath();
          ctx.strokeStyle = (isMotherBranch && strand.offset === 0) ? '#FFFFFF' : strand.color;
          ctx.lineWidth = isMotherBranch
            ? (strand.width * (0.8 + newWeight * 0.7))
            : Math.max(1.0, strand.width * 0.55);
          ctx.globalAlpha = isMotherBranch
            ? Math.min(1.0, 0.45 + newWeight * 0.55)
            : Math.max(0.10, newWeight * 0.85);

          const steps = 32;
          for (let step = 0; step <= steps; step++) {
            const p = step / steps;
            const u = 1 - p;
            const baseX = u * u * u * originX + 3 * u * u * p * cx1 + 3 * u * p * p * cx2 + p * p * p * targetX;
            const baseY = u * u * u * (originY + 8) + 3 * u * u * p * cy1 + 3 * u * p * p * cy2 + p * p * p * targetY;

            const wave = Math.sin(p * Math.PI * 2.5 + waveSpeed) * waveAmp * Math.sin(p * Math.PI);
            const x = baseX + wave + strand.offset * Math.sin(p * Math.PI);
            const y = baseY;

            if (step === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Flowing spark traveling along this strand
          if (newWeight > 0.2) {
            const sparkP = ((t * 0.35 * strand.speed + strand.phase * 0.2) % 1);
            const u = 1 - sparkP;
            const spX = u * u * u * originX + 3 * u * u * sparkP * cx1 + 3 * u * sparkP * sparkP * cx2 + sparkP * sparkP * sparkP * targetX;
            const spY = u * u * u * (originY + 8) + 3 * u * u * sparkP * cy1 + 3 * u * sparkP * sparkP * cy2 + sparkP * sparkP * sparkP * targetY;
            const spWave = Math.sin(sparkP * Math.PI * 2.5 + waveSpeed) * waveAmp * Math.sin(sparkP * Math.PI);

            ctx.save();
            ctx.beginPath();
            ctx.arc(spX + spWave + strand.offset * Math.sin(sparkP * Math.PI), spY, 1.8 + newWeight * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = Math.max(0.2, newWeight * 0.95);
            ctx.fill();
            ctx.restore();
          }
        });

        // Target convergence node dot for this branch
        ctx.save();
        ctx.beginPath();
        ctx.arc(targetX, targetY, 3.5 + newWeight * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = newWeight > 0.4 ? b.color : '#245C46';
        ctx.globalAlpha = Math.max(0.3, newWeight);
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1.0;
      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [branches]);

  return (
    <canvas ref={canvasRef} className="w-full h-full block" />
  );
}

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

      {/* DESKTOP BRANCHING CANVAS DIAGRAM (Visible on lg and above) */}
      <div className="hidden lg:block relative mb-12 p-8 bg-[#090D0B] border border-tva-border">
        
        {/* Top Trunk Node: Sacred Timeline */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="px-6 py-2.5 bg-[#0D120F] border-2 border-[#7FCF8A] text-[#7FCF8A] font-display text-xl tracking-wider shadow-green-sm flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7FCF8A] animate-ping" />
            SACRED TIMELINE // GEEKSFORGEEKS BENNETT UNIVERSITY
          </div>
          <span className="text-[10px] text-tva-bone-dim mt-1 font-mono">
            ORIGIN POINT // ZERO ENTROPY DRIFT &bull; MULTIVERSE STRAND CONVERGENCE
          </span>
        </div>

        {/* Dynamic Branching Multiverse Strings Canvas */}
        <div className="relative w-full h-44">
          <BranchStringsCanvas
            branches={branches}
            activeBranchId={activeBranchId}
            hoveredBranchId={hoveredBranchId}
          />
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
                    ? (hoveredBranchId && hoveredBranchId !== b.id
                        ? 'border-[#7FCF8A]/40 bg-[#121A15]/40 opacity-50 scale-100'
                        : 'border-[#7FCF8A] bg-[#121A15] shadow-green-sm scale-[1.02]')
                    : (hoveredBranchId === b.id
                        ? 'border-tva-amber bg-[#0D120F] shadow-[0_0_15px_rgba(245,166,35,0.3)] scale-[1.01]'
                        : 'border-tva-border bg-[#050706]/70 hover:border-tva-amber/60 opacity-80')
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
                    src={getAssetUrl('assets/images/loki_president_variant.png')}
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
