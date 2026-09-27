import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Orbit, Radio, Shield, Eye, X, Sparkles, ExternalLink, Activity } from 'lucide-react';
import { playClickSound, playTerminalBeep, playTemporalPulse, playTransitionWhoosh } from '../utils/soundEffects';

const PORTALS = [
  {
    id: 'prime',
    name: 'REALITY // PRIME',
    subtitle: 'THE SACRED TIMELINE',
    color: '#7FCF8A',
    glow: 'rgba(127, 207, 138, 0.5)',
    status: 'SYNCHRONIZED',
    deviation: '0.000%',
    intel: 'The baseline reality preserved by the Time Keepers. Home to Earth-616 incursion nexus at Bennett University.',
    coordinates: 'NEXUS-001 // 28.4595° N, 77.5132° E',
  },
  {
    id: 'tva',
    name: 'REALITY // TVA',
    subtitle: 'TEMPORAL BUREAUCRACY',
    color: '#F5A623',
    glow: 'rgba(245, 166, 35, 0.5)',
    status: 'AUTHORITY CORE',
    deviation: '0.000%',
    intel: 'Infinite bureaucratic machinery outside the flow of time. Archives, TemPads, reset charges, and chronological overseers.',
    coordinates: 'NULL-SPACE // STATION ZERO',
  },
  {
    id: 'void',
    name: 'REALITY // VOID',
    subtitle: 'THE END OF TIME',
    color: '#9B9582',
    glow: 'rgba(155, 149, 130, 0.4)',
    status: 'PRUNED REALM',
    deviation: '99.99%',
    intel: 'Where pruned timelines and forgotten Variants are consumed by Alioth. Bleak, sparse, and eternal.',
    coordinates: 'ENTROPY GRAVEYARD // CHRONO-MAX',
  },
  {
    id: 'glitch',
    name: 'REALITY // GLITCH',
    subtitle: 'MULTIVERSE TEAR',
    color: '#00F0FF',
    accentColor: '#FF3366',
    glow: 'rgba(0, 240, 255, 0.5)',
    status: 'ACTIVE BREACH',
    deviation: '0.198%',
    intel: 'Chromatic instability. Overlapping quantum states and synthetic WebXR dimensions colliding with physical spacetime.',
    coordinates: 'ANOMALY VECTOR // FRACTURE-99',
  },
  {
    id: 'unknown',
    name: 'REALITY // UNKNOWN',
    subtitle: 'UNCHARTED DIMENSION',
    color: '#B026FF',
    glow: 'rgba(176, 38, 255, 0.4)',
    status: 'UNMONITORED',
    deviation: 'UNKNOWN',
    intel: 'Beyond the Loom’s reach. Deep cosmic void exhibiting strange non-linear temporal flows and dark matter anomalies.',
    coordinates: 'SECTOR-EXTERIOR // UNDEFINED',
  },
];

const UNIVERSE_NODES = [
  {
    id: 'earth-616',
    name: 'EARTH-616',
    cx: 50,
    cy: 50,
    status: 'PRIME ANOMALY',
    color: '#7FCF8A',
    intel: 'Bennett University Campus cluster. Epicenter of Variant Protocol incursion.',
  },
  {
    id: 'earth-838',
    name: 'EARTH-838',
    cx: 74,
    cy: 28,
    status: 'HIGH FLUX',
    color: '#F5A623',
    intel: 'Zero-knowledge temporal cryptography and advanced algorithmic consensus incursion.',
  },
  {
    id: 'timeline-001',
    name: 'TIMELINE-001',
    cx: 26,
    cy: 32,
    status: 'MONITORED',
    color: '#00F0FF',
    intel: 'First recorded deviation branch. Automated surveillance probe active.',
  },
  {
    id: 'timeline-117',
    name: 'TIMELINE-117',
    cx: 78,
    cy: 74,
    status: 'UNSTABLE',
    color: '#FF3366',
    intel: 'High-entropy branch exhibiting rapid recursive logic mutations.',
  },
  {
    id: 'dim-unknown',
    name: 'UNKNOWN STRAND',
    cx: 22,
    cy: 76,
    status: 'SHADOW CLUSTER',
    color: '#B026FF',
    intel: 'Deep space anomaly unmapped by TVA chronometers.',
  },
];

// 7 Dynamic Procedural Multiverse Timeline Strings that move randomly
const MULTIVERSE_STRANDS = [
  { id: 'strand-1', name: 'PRIME STRAND L-01', color: '#7FCF8A', width: 2.4, speed: 0.75, amp: 32, phase: 0.0, yBase: 120 },
  { id: 'strand-2', name: 'SOLAR VECTOR-7', color: '#F5A623', width: 2.6, speed: 1.05, amp: 40, phase: 1.4, yBase: 230 },
  { id: 'strand-3', name: 'QUANTUM RIFT-9', color: '#00F0FF', width: 2.0, speed: 0.85, amp: 34, phase: 2.8, yBase: 340 },
  { id: 'strand-4', name: 'VOID HORIZON-X', color: '#B026FF', width: 2.2, speed: 1.20, amp: 38, phase: 4.1, yBase: 450 },
  { id: 'strand-5', name: 'ANOMALY KINETIC', color: '#FF3366', width: 1.9, speed: 1.45, amp: 30, phase: 5.3, yBase: 180 },
  { id: 'strand-6', name: 'YGGDRASIL ROOT', color: '#4ECCA3', width: 2.1, speed: 0.65, amp: 44, phase: 3.2, yBase: 510 },
  { id: 'strand-7', name: 'GOLDEN WEAVE', color: '#FFD700', width: 2.5, speed: 0.95, amp: 36, phase: 2.0, yBase: 75 },
];

export default function MultiverseMap({ onSetCursor }) {
  const [activePortal, setActivePortal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredStrand, setHoveredStrand] = useState(null);
  const [time, setTime] = useState(0);

  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 500, y: 300, isOver: false });
  const animRef = useRef(null);

  // 60 FPS Procedural Undulation Loop for the 7 Random Timeline Strings
  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.025;
      setTime(t);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handlePointerMoveOnMap = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 600;
    mouseRef.current = { x, y, isOver: true };
  };

  const handlePointerLeaveMap = () => {
    mouseRef.current.isOver = false;
  };

  const handlePortalHover = (portal) => {
    setActivePortal(portal);
    playTerminalBeep();
    onSetCursor?.('timeline-node');
  };

  const handlePortalClick = (portal) => {
    playTransitionWhoosh();
    setSelectedItem(portal);
  };

  const handleNodeClick = (node) => {
    playTemporalPulse();
    setSelectedItem(node);
  };

  // Helper to compute a wavy cubic bezier path for each of the 7 strings
  const getStrandPath = (s) => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const isMouseOver = mouseRef.current.isOver;

    const t = time * s.speed;
    const p = s.phase;

    // Calculate 5 milestone points across the SVG width (-50 to 1050)
    const pts = [
      { x: -50, y: s.yBase + Math.sin(t * 0.9 + p) * s.amp },
      { x: 220, y: s.yBase + Math.cos(t * 1.3 + p + 1.2) * (s.amp * 1.25) },
      { x: 500, y: s.yBase + Math.sin(t * 0.8 + p + 2.5) * (s.amp * 0.9) },
      { x: 770, y: s.yBase + Math.cos(t * 1.1 + p + 3.8) * (s.amp * 1.15) },
      { x: 1050, y: s.yBase + Math.sin(t * 1.0 + p + 5.0) * s.amp },
    ];

    // If mouse is near, add elastic repulsion/attraction to nearby control points
    if (isMouseOver) {
      pts.forEach((pt) => {
        const dx = pt.x - mx;
        const dy = pt.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          const force = (1 - dist / 180) * 35;
          pt.y += (dy / dist) * force;
        }
      });
    }

    // Build smooth cubic bezier curve through pts
    const cp1x = (pts[0].x + pts[1].x) / 2;
    const cp1y = pts[0].y;
    const cp2x = (pts[0].x + pts[1].x) / 2;
    const cp2y = pts[1].y;

    const cp3x = (pts[1].x + pts[2].x) / 2;
    const cp3y = pts[1].y;
    const cp4x = (pts[1].x + pts[2].x) / 2;
    const cp4y = pts[2].y;

    const cp5x = (pts[2].x + pts[3].x) / 2;
    const cp5y = pts[2].y;
    const cp6x = (pts[2].x + pts[3].x) / 2;
    const cp6y = pts[3].y;

    const cp7x = (pts[3].x + pts[4].x) / 2;
    const cp7y = pts[3].y;
    const cp8x = (pts[3].x + pts[4].x) / 2;
    const cp8y = pts[4].y;

    return `M ${pts[0].x} ${pts[0].y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[1].x} ${pts[1].y} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${pts[2].x} ${pts[2].y} C ${cp5x} ${cp5y}, ${cp6x} ${cp6y}, ${pts[3].x} ${pts[3].y} C ${cp7x} ${cp7y}, ${cp8x} ${cp8y}, ${pts[4].x} ${pts[4].y}`;
  };

  return (
    <section id="multiverse" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono select-none">
      
      {/* SECTION HEADER (Section 18: THE MULTIVERSE) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border/60 pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>SCENE 03 // THE MULTIVERSE MAP &amp; PORTALS</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            THE MULTIVERSE
          </h2>
          <div className="text-xs text-tva-bone-dim mt-1 font-body max-w-xl">
            Infinite bifurcating branches radiating from the temporal singularity. Hover dimensional portals to accelerate transit feeds; inspect universe sectors to observe anomaly deviations.
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-tva-bone-dim bg-[#080B09] px-3.5 py-1.5 border border-tva-border/60">
          <Compass size={14} className="text-[#F5A623] animate-spin-slow" />
          <span>SURVEILLANCE RADAR: <strong className="text-[#7FCF8A]">ACTIVE</strong></span>
        </div>
      </div>

      {/* 18 — CENTRAL VISUAL UNIVERSE MAP CONTAINER */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMoveOnMap}
        onPointerLeave={handlePointerLeaveMap}
        className="relative w-full h-[480px] sm:h-[540px] bg-[#070A08] border-2 border-tva-border overflow-hidden shadow-2xl relative mb-12"
      >
        
        {/* CRT Scanline & Ambient Radial Aura */}
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050706]/60 to-[#050706] pointer-events-none" />

        {/* Multiverse Tree Branches Cosmic Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 mix-blend-screen">
          <img
            src="/assets/images/multiverse_tree_branches.png"
            alt="Yggdrasil Multiverse Branch System"
            className="w-full h-full object-cover object-center filter brightness-125 contrast-125 scale-105"
          />
        </div>

        {/* Concentric Radar Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-[#245C46]/25" />
          <div className="w-[360px] h-[360px] rounded-full border border-[#245C46]/35" />
          <div className="w-[220px] h-[220px] rounded-full border border-[#7FCF8A]/30" />
          <div className="w-[80px] h-[80px] rounded-full border border-[#F5A623]/40 animate-ping" />
          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#245C46]/30" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#245C46]/30" />
        </div>

        {/* SVG INTERACTIVE UNIVERSE NETWORK */}
        <svg className="absolute inset-0 w-full h-full pointer-events-auto" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="nexusGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strandGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* =========================================================================
              6-7 DYNAMIC RANDOMLY MOVING TIMELINE STRINGS
              ========================================================================= */}
          {MULTIVERSE_STRANDS.map((s) => {
            const isHovered = hoveredStrand === s.id;
            const pathD = getStrandPath(s);
            // Dynamic spark pulse traveling along the string
            const sparkPct = ((time * 0.12 * s.speed + s.phase * 0.2) % 1);
            const sparkX = -50 + sparkPct * 1100;
            const sparkY = s.yBase + Math.sin(time * s.speed + s.phase + sparkPct * 4) * s.amp;

            return (
              <g
                key={s.id}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredStrand(s.id);
                  playTerminalBeep();
                  onSetCursor?.('timeline-node');
                }}
                onMouseLeave={() => {
                  setHoveredStrand(null);
                  onSetCursor?.('default');
                }}
              >
                {/* Wide soft bloom background glow */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={isHovered ? 8 : 4.5}
                  strokeOpacity={isHovered ? 0.45 : 0.22}
                  filter="url(#strandGlow)"
                  className="transition-all duration-300"
                />

                {/* Sharp core luminous string */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHovered ? '#FFFFFF' : s.color}
                  strokeWidth={isHovered ? s.width + 1.2 : s.width}
                  strokeOpacity={isHovered ? 1.0 : 0.85}
                  strokeDasharray={isHovered ? 'none' : s.id === 'strand-5' ? '8 4' : 'none'}
                  className="transition-all duration-200"
                />

                {/* Traveling Energy Light Spark / Chrono Particle */}
                <circle
                  cx={sparkX}
                  cy={sparkY}
                  r={isHovered ? 4.5 : 3}
                  fill="#FFFFFF"
                  filter="url(#strandGlow)"
                  className="animate-pulse"
                />

                {/* Strand Telemetry Tag on Hover */}
                {isHovered && (
                  <g transform={`translate(${Math.min(880, Math.max(120, sparkX))}, ${Math.max(40, sparkY - 14)})`}>
                    <rect x="-60" y="-12" width="120" height="18" fill="#050706" stroke={s.color} strokeWidth="1" />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      fill={s.color}
                      fontSize="9"
                      fontFamily="Space Mono, monospace"
                      letterSpacing="1"
                    >
                      {s.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Connective Timeline Branches from Central Nexus */}
          {UNIVERSE_NODES.map((node) => (
            <g key={`branch-${node.id}`}>
              <line
                x1="500"
                y1="300"
                x2={`${node.cx * 10}`}
                y2={`${node.cy * 6}`}
                stroke={hoveredNode?.id === node.id ? '#7FCF8A' : '#245C46'}
                strokeWidth={hoveredNode?.id === node.id ? 2 : 1}
                strokeOpacity={hoveredNode?.id === node.id ? 0.9 : 0.4}
                strokeDasharray={hoveredNode?.id === node.id ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
            </g>
          ))}

          {/* Hundreds of Tiny Background Timeline Points */}
          {[
            [150, 120], [280, 80], [390, 180], [620, 110], [750, 140], [860, 90],
            [120, 290], [210, 420], [340, 480], [670, 470], [820, 410], [920, 270],
            [440, 240], [560, 220], [480, 390], [540, 410], [710, 260], [300, 250],
          ].map(([px, py], i) => (
            <circle
              key={`bg-pt-${i}`}
              cx={px}
              cy={py}
              r="1.5"
              fill="#7FCF8A"
              opacity="0.35"
            />
          ))}

          {/* Central Glowing Temporal Nexus (500, 300) */}
          <circle cx="500" cy="300" r="14" fill="rgba(127, 207, 138, 0.2)" />
          <circle cx="500" cy="300" r="8" fill="#7FCF8A" filter="url(#nexusGlow)" className="animate-pulse" />
          <circle cx="500" cy="300" r="3" fill="#FFFFFF" />

          {/* Interactive Universe Nodes */}
          {UNIVERSE_NODES.map((node) => {
            const isHov = hoveredNode?.id === node.id;
            const nx = node.cx * 10;
            const ny = node.cy * 6;

            return (
              <g
                key={node.id}
                className="cursor-pointer group"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => {
                  setHoveredNode(node);
                  playTerminalBeep();
                  onSetCursor?.('timeline-node');
                }}
                onMouseLeave={() => {
                  setHoveredNode(null);
                  onSetCursor?.('default');
                }}
              >
                <circle
                  cx={nx}
                  cy={ny}
                  r={isHov ? 10 : 7}
                  fill="#050706"
                  stroke={isHov ? node.color : '#7FCF8A'}
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
                <circle cx={nx} cy={ny} r={isHov ? 5 : 3} fill={node.color} />

                {/* Node Label on Hover */}
                {isHov && (
                  <text
                    x={nx}
                    y={ny - 15}
                    textAnchor="middle"
                    fill="#E8E2D0"
                    fontSize="11"
                    fontFamily="Space Mono, monospace"
                    letterSpacing="1"
                  >
                    {node.name} [{node.status}]
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Top-Right Map Controls / Telemetry */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3 text-[10px] text-tva-bone-dim">
          <span className="flex items-center gap-1.5 px-2.5 py-1 border border-tva-border bg-[#050706]/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>NEXUS: ONLINE</span>
          </span>
          <span className="hidden sm:inline text-tva-bone-dim">
            COORDINATES: BENNETT-BU-616
          </span>
        </div>
      </div>

      {/* 19 — MULTIVERSE PORTALS ROW (5 Reality Gateways) */}
      <div>
        <div className="text-xs text-[#7FCF8A] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
          <Orbit size={14} className="animate-spin-slow" />
          <span>SECTION 19 // DIMENSIONAL TRANSIT PORTALS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PORTALS.map((portal) => {
            const isHovered = activePortal?.id === portal.id;

            return (
              <motion.div
                key={portal.id}
                onClick={() => handlePortalClick(portal)}
                onMouseEnter={() => handlePortalHover(portal)}
                onMouseLeave={() => {
                  setActivePortal(null);
                  onSetCursor?.('default');
                }}
                className={`group p-5 bg-[#080B09] border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isHovered ? 'shadow-2xl -translate-y-1' : 'border-tva-border/60 hover:border-tva-bone-dim'
                }`}
                style={{
                  borderColor: isHovered ? portal.color : undefined,
                  boxShadow: isHovered ? `0 0 25px ${portal.glow}` : undefined,
                }}
              >
                {/* Internal Swirling Gradient */}
                <div
                  className="absolute inset-0 opacity-15 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${portal.color} 0%, transparent 70%)`,
                  }}
                />

                {/* Top Status */}
                <div className="flex items-center justify-between text-[10px] text-tva-bone-dim mb-4 border-b border-tva-border/40 pb-2">
                  <span className="font-bold" style={{ color: portal.color }}>
                    {portal.status}
                  </span>
                  <span>DEV: {portal.deviation}</span>
                </div>

                {/* Swirling Circular Portal Visualization */}
                <div className="py-5 flex items-center justify-center relative">
                  <div
                    className={`w-16 h-16 rounded-full border border-dashed transition-all duration-700 ${
                      isHovered ? 'scale-125 rotate-180 opacity-90' : 'scale-100 rotate-0 opacity-40'
                    }`}
                    style={{ borderColor: portal.color }}
                  />
                  <div
                    className={`absolute w-12 h-12 rounded-full border border-dotted transition-all duration-500 ${
                      isHovered ? 'scale-110 -rotate-90' : 'scale-90 rotate-0'
                    }`}
                    style={{ borderColor: portal.color }}
                  />
                  {/* Glowing Core */}
                  <div
                    className={`absolute w-6 h-6 rounded-full transition-transform duration-300 ${
                      isHovered ? 'scale-125' : 'scale-100'
                    }`}
                    style={{
                      backgroundColor: portal.color,
                      boxShadow: `0 0 15px ${portal.color}`,
                    }}
                  />
                </div>

                {/* Portal Identity */}
                <div className="text-center mt-3">
                  <h4 className="font-display text-lg tracking-wide uppercase text-tva-bone group-hover:text-white transition-colors">
                    {portal.name}
                  </h4>
                  <div className="text-[10px] text-tva-bone-dim uppercase tracking-wider mt-0.5">
                    {portal.subtitle}
                  </div>
                </div>

                {/* Action Link */}
                <div className="mt-4 pt-3 border-t border-tva-border/40 text-[10px] flex items-center justify-between">
                  <span className="text-tva-bone-dim">TRANSIT</span>
                  <span
                    className="font-bold flex items-center gap-1 uppercase transition-transform group-hover:translate-x-1"
                    style={{ color: portal.color }}
                  >
                    <span>ENTER</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CLASSIFIED DIMENSIONAL INSPECTION MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg p-6 bg-[#080B09] border-2 text-tva-bone font-mono shadow-2xl"
              style={{
                borderColor: selectedItem.color || '#7FCF8A',
                boxShadow: `0 0 40px ${selectedItem.color || '#7FCF8A'}50`,
              }}
            >
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedItem(null);
                }}
                className="absolute top-4 right-4 p-1.5 text-tva-bone-dim hover:text-tva-bone border border-tva-border hover:border-tva-amber"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase mb-3" style={{ color: selectedItem.color || '#7FCF8A' }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedItem.color || '#7FCF8A' }} />
                <span>MULTIVERSE SURVEILLANCE REPORT</span>
              </div>

              <h3 className="font-display text-3xl uppercase text-tva-bone">
                {selectedItem.name}
              </h3>
              <div className="text-xs text-tva-bone-dim mb-4">
                STATUS: <span className="font-bold text-tva-bone">{selectedItem.status}</span>
              </div>

              <div className="space-y-3 text-xs border-y border-tva-border py-4 my-4 font-body leading-relaxed text-tva-bone-dim">
                <div>
                  <strong className="font-mono text-tva-bone">SECTOR INTEL:</strong> {selectedItem.intel}
                </div>
                {selectedItem.coordinates && (
                  <div>
                    <strong className="font-mono text-tva-bone">COORDINATES:</strong> {selectedItem.coordinates}
                  </div>
                )}
                {selectedItem.deviation && (
                  <div>
                    <strong className="font-mono text-tva-bone">DEVIATION INDEX:</strong> {selectedItem.deviation}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-tva-bone-dim font-mono">TVA MULTIVERSE RADAR</span>
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 text-black font-bold font-mono text-xs uppercase hover:opacity-90"
                  style={{ backgroundColor: selectedItem.color || '#7FCF8A' }}
                >
                  DISMISS TELEMETRY &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
