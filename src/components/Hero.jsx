import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { playClickSound, playTemporalPulse, playTerminalBeep } from '../utils/soundEffects';
import SparkSystem from './SparkSystem';

export default function Hero({ onSetCursor, onRegisterClick, eventData, onTriggerGlitch }) {
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeModalNode, setActiveModalNode] = useState(null);
  const [temporalIntegrity, setTemporalIntegrity] = useState(98.7);
  const [shockwave, setShockwave] = useState(null);
  const [isLokiHovered, setIsLokiHovered] = useState(false);
  const [clockReversed, setClockReversed] = useState(false);

  // Subtle live HUD telemetry animation
  useEffect(() => {
    const interval = setInterval(() => {
      // 98.6 -> 98.8 micro fluctuation
      const delta = (Math.random() * 0.2 - 0.1);
      setTemporalIntegrity((prev) => +(98.7 + delta).toFixed(1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // 6 Interactive Timeline Nodes in 2D coordinates (%)
  const timelineNodes = [
    {
      id: 'node-616',
      label: 'TIMELINE 616-B',
      cx: 22,
      cy: 35,
      deviation: '+0.004%',
      status: 'MONITORED',
      title: 'Neural Incursion // AI Vector',
      intel: 'Branch exhibiting high autonomous agent formation. 42 teams active in LLM reasoning graphs.',
      color: '#F5A623',
    },
    {
      id: 'node-838',
      label: 'TIMELINE 838-Q',
      cx: 78,
      cy: 28,
      deviation: '+0.012%',
      status: 'HIGH FLUX',
      title: 'Quantum Consensus // Web3',
      intel: 'Zero-knowledge temporal rollup detected with 10k TPS. Cryptographic proof verification active.',
      color: '#FF6B00',
    },
    {
      id: 'node-199999',
      label: 'TIMELINE 199999-S',
      cx: 18,
      cy: 74,
      deviation: '+0.008%',
      status: 'SHIELDED',
      title: 'Void Sentinel // Cyber Defense',
      intel: 'Automated intrusion interceptors guarding cloud boundaries. Zero-trust boundary stabilized.',
      color: '#00F0FF',
    },
    {
      id: 'node-trn888',
      label: 'TIMELINE TRN-888',
      cx: 82,
      cy: 72,
      deviation: '+0.018%',
      status: 'UNSTABLE NEXUS',
      title: 'Multiverse Catalyst // Spatial',
      intel: 'WebXR immersion engine projecting holographic user environments across multi-threaded displays.',
      color: '#FF3366',
    },
    {
      id: 'node-prime',
      label: 'BENNETT-PRIME',
      cx: 50,
      cy: 22,
      deviation: '0.000%',
      status: 'SACRED BASE',
      title: 'Bennett University Campus Nexus',
      intel: 'Physical event headquarters in Greater Noida. 36-hour incursion operational base.',
      color: '#538662',
    },
    {
      id: 'node-bounty',
      label: 'CHRONO-VAULT',
      cx: 50,
      cy: 82,
      deviation: '0.000%',
      status: 'REWARD READY',
      title: '₹1,50,000+ Prize Allocation',
      intel: 'Direct grants, bounties, and TVA collector gear ready for deployable solutions.',
      color: '#F5A623',
    },
  ];

  // Framing connections around perimeter of viewport
  const nodeConnections = [
    ['node-prime', 'node-616'],
    ['node-prime', 'node-838'],
    ['node-616', 'node-199999'],
    ['node-838', 'node-trn888'],
    ['node-199999', 'node-bounty'],
    ['node-trn888', 'node-bounty'],
  ];

  const handleNodeClick = (node, e) => {
    e.stopPropagation();
    playTemporalPulse();
    setShockwave({ x: node.cx, y: node.cy });
    setTimeout(() => setShockwave(null), 800);
    setActiveModalNode(node);
  };

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-12 px-4 sm:px-8 overflow-hidden select-none"
    >
      {/* BACKGROUND INTERACTIVE TEMPORAL NETWORK (Framing perimeter) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="amberLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Branch connections */}
          {nodeConnections.map(([startId, endId], idx) => {
            const start = timelineNodes.find((n) => n.id === startId);
            const end = timelineNodes.find((n) => n.id === endId);
            if (!start || !end) return null;

            const isStartHovered = hoveredNode?.id === start.id;
            const isEndHovered = hoveredNode?.id === end.id;
            const isHighlighted = isStartHovered || isEndHovered;

            return (
              <g key={`conn-${idx}`}>
                <line
                  x1={`${start.cx}%`}
                  y1={`${start.cy}%`}
                  x2={`${end.cx}%`}
                  y2={`${end.cy}%`}
                  stroke={isHighlighted ? '#F5A623' : '#F5A623'}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeOpacity={isHighlighted ? 0.75 : 0.2}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  className="transition-all duration-300"
                />
                {/* Animated temporal pulse running along active branch */}
                {isHighlighted && (
                  <circle
                    r="3.5"
                    fill="#F5A623"
                    className="animate-ping"
                    cx={`${(start.cx + end.cx) / 2}%`}
                    cy={`${(start.cy + end.cy) / 2}%`}
                  />
                )}
              </g>
            );
          })}

          {/* Interactive Timeline Nodes */}
          {timelineNodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;

            return (
              <g
                key={node.id}
                className="cursor-pointer group pointer-events-auto"
                onClick={(e) => handleNodeClick(node, e)}
                onMouseEnter={() => {
                  setHoveredNode(node);
                  onSetCursor?.('timeline-node');
                  playTerminalBeep();
                }}
                onMouseLeave={() => {
                  setHoveredNode(null);
                  onSetCursor?.('default');
                }}
              >
                {/* Outer ring */}
                <circle
                  cx={`${node.cx}%`}
                  cy={`${node.cy}%`}
                  r={isHovered ? 9 : 6}
                  fill="#0A0A0C"
                  stroke={isHovered ? node.color : '#F5A623'}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-200"
                />

                {/* Inner core */}
                <circle
                  cx={`${node.cx}%`}
                  cy={`${node.cy}%`}
                  r={isHovered ? 4.5 : 2.5}
                  fill={node.color}
                />

                {/* Tiny node label on hover */}
                {isHovered && (
                  <text
                    x={`${node.cx}%`}
                    y={`${node.cy - 3.5}%`}
                    textAnchor="middle"
                    fill="#E8E2D0"
                    fontSize="11"
                    fontFamily="Space Mono, monospace"
                    letterSpacing="1"
                  >
                    {node.label} [{node.deviation}]
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Shockwave circle animation */}
        {shockwave && (
          <div
            className="absolute rounded-full border-2 border-tva-amber/80 animate-ping pointer-events-none"
            style={{
              left: `${shockwave.x}%`,
              top: `${shockwave.y}%`,
              width: '120px',
              height: '120px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>

      {/* Background Interactive Timeline Nodes and SVG */}

      {/* TOP VIEWPORT HUD TELEMETRY BAR */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] border-b border-tva-border/50 pb-3 pt-2">
        {/* Top Left Institution Badge */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-tva-amber" />
          <div className="text-tva-bone tracking-wide uppercase font-bold">
            GEEKSFORGEEKS STUDENT CHAPTER
            <span className="text-tva-bone-dim font-normal block text-[10px]">
              BENNETT UNIVERSITY // SECTOR 616-NCR
            </span>
          </div>
        </div>

        {/* Top Right Live Telemetry */}
        <div className="flex items-center gap-4 sm:gap-6 text-tva-bone-dim">
          <div>
            CASE: <span className="text-tva-amber font-bold">#VP-2026</span>
          </div>
          <div>
            INTEGRITY: <span className="text-tva-amber font-bold">{temporalIntegrity}%</span>
          </div>
          <button
            onClick={() => onTriggerGlitch?.()}
            onMouseEnter={() => onSetCursor?.('link')}
            onMouseLeave={() => onSetCursor?.('default')}
            title="Click to simulate Temporal Anomaly // Shortcut: Press 'G'"
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 border border-tva-border/60 hover:border-tva-magenta text-xs transition-colors"
          >
            <span>STATUS:</span>
            <span className="text-emerald-400 font-bold hover:text-tva-magenta flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STABLE [TEST GLITCH]
            </span>
          </button>
        </div>
      </div>

      {/* CENTER HERO: CINEMATIC POSTER COMPOSITION (Left 55% Text, Right 45% Loki Variant corridor) */}
      <div className="relative z-20 my-auto py-8 sm:py-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Typography Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
          
          {/* Classification Dossier Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-tva-border bg-[#080B09]/90 text-[11px] font-mono tracking-widest text-[#7FCF8A] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>CASE 26229 // SECTOR 616-NCR BREACH</span>
            <span className="hidden sm:inline border-l border-tva-border pl-2 text-tva-bone-dim">
              LEVEL 5 CLASSIFIED
            </span>
          </motion.div>

          {/* Huge Cinematic Poster Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="text-[11px] font-mono tracking-[0.35em] text-[#F5A623] uppercase mb-1">
              TVA // TEMPORAL CONTROL DIVISION
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.8rem] leading-[0.85] tracking-wider text-tva-bone uppercase">
              <span className="text-tva-bone block">TIME VARIANCE</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tva-amber via-[#FFB52E] to-[#7FCF8A] block">
                AUTHORITY
              </span>
            </h1>
            <div className="font-mono text-xs sm:text-sm text-[#7FCF8A] tracking-[0.3em] uppercase mt-3">
              SACRED TIMELINE // MULTIVERSE INCURSION DETECTED
            </div>
          </motion.div>

          {/* Narrative Discovery Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-xl text-sm sm:text-base text-tva-bone-dim font-body font-normal leading-relaxed"
          >
            You are not simply browsing a website. You are a newly detected <span className="text-tva-bone font-semibold">Variant</span> whose code has triggered an unprecedented branch in the Bennett University sector. The Time Variance Authority invites you to stabilize the anomaly across 36 hours of continuous engineering.
          </motion.p>

          {/* Cinematic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <button
              onClick={() => {
                playTemporalPulse();
                onRegisterClick();
              }}
              onMouseEnter={() => onSetCursor?.('cta')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="group relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-tva-amber to-[#FF6B00] text-black font-mono font-bold text-xs sm:text-sm tracking-widest uppercase overflow-hidden shadow-amber-md hover:shadow-amber-lg transition-all duration-300 flex items-center justify-center gap-3 border border-tva-amber active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <SparkSystem color="#FFB52E" count={3} active={true} />
              <span className="relative z-10 flex items-center gap-2">
                <span>REQUEST CLEARANCE</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Secondary CTA */}
            <a
              href="#briefing"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="w-full sm:w-auto px-7 py-3.5 border border-tva-border hover:border-[#7FCF8A] bg-[#080B09]/80 hover:bg-tva-panel text-tva-bone hover:text-[#7FCF8A] font-mono font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>INSPECT EVIDENCE [CASE 26229]</span>
            </a>
          </motion.div>

          <div className="pt-2 text-[10px] font-mono text-tva-bone-dim/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A]" />
            <span>SUBJECT DESIGNATION: VISITOR-616 // CLEARANCE REQUIRED</span>
          </div>
        </div>

        {/* 13 & 35 — Right 3D Visual Space & Interactive Loki/Variant Presence Zone (5 cols) */}
        <div
          className="lg:col-span-5 h-[420px] relative flex flex-col justify-end items-end cursor-pointer group"
          onMouseEnter={() => {
            setIsLokiHovered(true);
            playTemporalPulse();
            onSetCursor?.('timeline-node');
          }}
          onMouseLeave={() => {
            setIsLokiHovered(false);
            onSetCursor?.('default');
          }}
        >
          {/* Section 29: Mystical sparks around Loki when hovered */}
          <SparkSystem color="#7FCF8A" count={6} active={isLokiHovered} />
          {/* Section 35: TVA Diagnostic readout */}
          <AnimatePresence>
            {isLokiHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-[#080B09]/95 border border-[#7FCF8A] text-left text-xs font-mono shadow-[0_0_20px_rgba(127,207,138,0.3)] space-y-1 mb-4 backdrop-blur-sm pointer-events-none"
              >
                <div className="flex items-center gap-2 text-[10px] text-[#A8E6A3] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
                  <span>VARIANT SIGNATURE DETECTED</span>
                </div>
                <div className="text-[11px] text-tva-bone">
                  TEMPORAL STABILITY: <span className="text-[#F5A623] font-bold">87%</span>
                </div>
                <div className="text-[10px] text-tva-bone-dim">
                  ENTITY: LOKI-VARIANT // NEXUS-616
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive TVA Clock Control Pill (Section 48 Easter Egg) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              setClockReversed((prev) => !prev);
            }}
            className="px-2.5 py-1 border border-tva-border/60 hover:border-tva-amber text-[10px] text-tva-bone-dim hover:text-tva-amber bg-[#080B09]/90 font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5"
            title="TVA Mechanism Clock // Click to reverse rotation"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
            <span>TVA CLOCK: {clockReversed ? 'REVERSED [↺]' : 'SYNCHRONIZED [↻]'}</span>
          </button>
        </div>
      </div>

      {/* BOTTOM VIEWPORT HUD HUD STATS BAR */}
      <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 font-mono text-[11px] border-t border-tva-border/50 pt-4">
        
        {/* Metric 1 */}
        <div className="p-2 sm:p-2.5 border border-tva-border/60 bg-[#0B0F0D]/90 flex flex-col">
          <span className="text-[10px] text-tva-bone-dim">TIMELINE STATUS</span>
          <span className="text-tva-amber font-bold tracking-wider flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-amber" />
            ACTIVE // MONITORED
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-2 sm:p-2.5 border border-tva-border/60 bg-[#0B0F0D]/90 flex flex-col">
          <span className="text-[10px] text-tva-bone-dim">VARIANTS DETECTED</span>
          <span className="text-tva-bone font-bold tracking-wider mt-0.5">
            428 / 500 QUOTA
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-2 sm:p-2.5 border border-tva-border/60 bg-[#0B0F0D]/90 flex flex-col">
          <span className="text-[10px] text-tva-bone-dim">EVENT DURATION</span>
          <span className="text-tva-bone font-bold tracking-wider mt-0.5">
            36-HOUR CONTINUOUS
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-2 sm:p-2.5 border border-tva-border/60 bg-[#0B0F0D]/90 flex flex-col">
          <span className="text-[10px] text-tva-bone-dim">BENNETT VENUE</span>
          <span className="text-tva-amber font-bold tracking-wider mt-0.5 truncate">
            BU CAMPUS, DELHI-NCR
          </span>
        </div>
      </div>

      {/* CONTEXTUAL TIMELINE NODE INTELLIGENCE MODAL */}
      <AnimatePresence>
        {activeModalNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg p-6 bg-tva-panel border-2 border-tva-amber text-tva-bone font-mono shadow-amber-lg"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setActiveModalNode(null);
                }}
                className="absolute top-4 right-4 p-1 text-tva-bone-dim hover:text-tva-amber border border-tva-border hover:border-tva-amber"
              >
                <X size={16} />
              </button>

              {/* Dossier Header */}
              <div className="flex items-center gap-2 text-xs text-tva-amber mb-2">
                <span className="w-2 h-2 rounded-full bg-tva-amber animate-pulse" />
                <span>CLASSIFIED NODE INTELLIGENCE</span>
              </div>

              <h3 className="font-display text-3xl text-tva-bone mb-1">
                {activeModalNode.label}
              </h3>

              <div className="text-xs text-tva-amber font-semibold mb-4">
                {activeModalNode.title}
              </div>

              <div className="space-y-3 text-xs text-tva-bone-dim border-y border-tva-border py-4 my-4 leading-relaxed">
                <div>
                  <span className="text-tva-bone font-bold">DEVIATION LEVEL:</span>{' '}
                  <span className="text-tva-amber">{activeModalNode.deviation}</span>
                </div>
                <div>
                  <span className="text-tva-bone font-bold">TVA MONITORING:</span>{' '}
                  <span className="text-emerald-400">{activeModalNode.status}</span>
                </div>
                <div>
                  <span className="text-tva-bone font-bold">FIELD INTEL:</span> {activeModalNode.intel}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-tva-bone-dim">BENNETT UNIVERSITY // SECTOR-616</span>
                <button
                  onClick={() => {
                    setActiveModalNode(null);
                    onRegisterClick();
                  }}
                  className="px-4 py-1.5 bg-tva-amber text-black font-bold text-xs uppercase hover:bg-tva-amber-light"
                >
                  STABILIZE THIS SECTOR &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
