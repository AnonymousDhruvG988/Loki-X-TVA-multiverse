import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Orbit, Radio, Shield, Eye, X, Sparkles, ExternalLink, Activity } from 'lucide-react';
import { playClickSound, playTerminalBeep, playTemporalPulse, playTransitionWhoosh } from '../utils/soundEffects';
import { getAssetUrl } from '../utils/assets';

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

// 7 Dynamic Procedural Multiverse Timeline Strings with Rich Eyecatching Marvel TVA Palettes
const MULTIVERSE_STRANDS = [
  { id: 'strand-gold', name: 'SOLAR CHRONO // SECTOR-0', color: '#FFB800', glowColor: 'rgba(255, 184, 0, 0.95)', width: 3.0, baseSpeed: 0.85, amp: 26, phase: 0.0, yBase: 65, dashed: false },
  { id: 'strand-mint', name: 'BIFROST EMERALD L-01', color: '#00F5A0', glowColor: 'rgba(0, 245, 160, 0.95)', width: 2.6, baseSpeed: 0.70, amp: 30, phase: 1.2, yBase: 130, dashed: false },
  { id: 'strand-pink', name: 'PARADOX MAGENTA-X', color: '#FF2A85', glowColor: 'rgba(255, 42, 133, 0.95)', width: 2.2, baseSpeed: 1.10, amp: 24, phase: 2.4, yBase: 195, dashed: true },
  { id: 'strand-orange', name: 'SACRED NEXUS 616 [PRIME]', color: '#FF6F00', glowColor: 'rgba(255, 111, 0, 0.95)', width: 3.6, baseSpeed: 0.95, amp: 46, phase: 0.8, yBase: 285, dashed: false },
  { id: 'strand-cyan', name: 'QUANTUM SINGULARITY-9', color: '#00E5FF', glowColor: 'rgba(0, 229, 255, 0.95)', width: 2.4, baseSpeed: 0.80, amp: 34, phase: 3.1, yBase: 385, dashed: false },
  { id: 'strand-purple', name: 'VOID AURA HORIZON', color: '#B5179E', glowColor: 'rgba(181, 23, 158, 0.95)', width: 2.8, baseSpeed: 1.15, amp: 38, phase: 4.5, yBase: 475, dashed: false },
  { id: 'strand-teal', name: 'YGGDRASIL ROOT-07', color: '#06D6A0', glowColor: 'rgba(6, 214, 160, 0.95)', width: 2.4, baseSpeed: 0.65, amp: 42, phase: 2.0, yBase: 540, dashed: false },
];

export default function MultiverseMap({ onSetCursor }) {
  const [activePortal, setActivePortal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState(null);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isOver: false });
  const hoveredStrandIdRef = useRef(null);
  const hoveredNodeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 1000);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 1000;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    // Independent time & progress for each strand
    const strandStates = MULTIVERSE_STRANDS.map((s) => ({
      ...s,
      time: s.phase,
      currentSpeed: s.baseSpeed,
    }));

    // Dynamic wandering nodes that move on the strings ("moves here and there")
    const dynamicNodes = [
      {
        id: 'earth-616',
        name: 'EARTH-616 // BENNETT-BU',
        strandId: 'strand-orange',
        x: 490,
        minX: 420,
        maxX: 580,
        vx: 0.35,
        color: '#7FCF8A',
        ringColor: '#245C46',
        size: 7,
        hasRings: true,
        status: 'PRIME NEXUS',
        intel: 'Bennett University Campus cluster. Epicenter of Variant Protocol incursion.',
        coordinates: '28.4595° N, 77.5132° E',
      },
      {
        id: 'timeline-001',
        name: 'TIMELINE-001',
        strandId: 'strand-mint',
        x: 260,
        minX: 180,
        maxX: 340,
        vx: -0.25,
        color: '#00F0FF',
        ringColor: '#00F0FF',
        size: 5.5,
        hasRings: true,
        status: 'MONITORED',
        intel: 'First recorded deviation branch. Automated surveillance probe active.',
        coordinates: 'SECTOR-01 // ALPHA',
      },
      {
        id: 'earth-838',
        name: 'EARTH-838',
        strandId: 'strand-pink',
        x: 730,
        minX: 660,
        maxX: 820,
        vx: 0.3,
        color: '#F5A623',
        ringColor: '#F5A623',
        size: 6,
        hasRings: true,
        status: 'HIGH FLUX',
        intel: 'Zero-knowledge temporal cryptography and advanced algorithmic consensus incursion.',
        coordinates: 'IL-838 // FLUX-MAX',
      },
      {
        id: 'dim-unknown',
        name: 'VOID-SECTOR // UNKNOWN',
        strandId: 'strand-purple',
        x: 220,
        minX: 150,
        maxX: 310,
        vx: 0.22,
        color: '#B026FF',
        ringColor: '#B026FF',
        size: 5.5,
        hasRings: true,
        status: 'SHADOW CLUSTER',
        intel: 'Deep space anomaly unmapped by TVA chronometers.',
        coordinates: 'VOID // 0xDEAD',
      },
      {
        id: 'timeline-117',
        name: 'TIMELINE-117',
        strandId: 'strand-teal',
        x: 770,
        minX: 700,
        maxX: 850,
        vx: -0.28,
        color: '#FF3366',
        ringColor: '#FF3366',
        size: 5,
        hasRings: true,
        status: 'UNSTABLE',
        intel: 'High-entropy branch exhibiting rapid recursive logic mutations.',
        coordinates: 'ANOMALY // 117-R',
      },
      // Floating celestial white star anchor nodes from Image 1
      { id: 'white-1', strandId: 'strand-gold', x: 210, minX: 160, maxX: 260, vx: 0.15, color: '#FFFFFF', isStar: true },
      { id: 'white-2', strandId: 'strand-mint', x: 340, minX: 300, maxX: 400, vx: -0.18, color: '#FFFFFF', isStar: true },
      { id: 'white-3', strandId: 'strand-cyan', x: 180, minX: 130, maxX: 230, vx: 0.2, color: '#FFFFFF', isStar: true },
      { id: 'white-4', strandId: 'strand-purple', x: 590, minX: 520, maxX: 660, vx: -0.15, color: '#FFFFFF', isStar: true },
      { id: 'white-5', strandId: 'strand-teal', x: 290, minX: 240, maxX: 350, vx: 0.22, color: '#FFFFFF', isStar: true },
    ];

    // Compute Y for a strand at a given X coordinate
    // 100% PURE ANALYTIC HARMONIC CURVATURE - ZERO PIECEWISE KINKS OR CORNERS
    const evaluateStrandY = (s, x, t, isHovered = false) => {
      const scaleX = x / 1000;
      // Primary cosmic wave + secondary harmonic overtone
      const wave = Math.sin(scaleX * 6.2 + t) * s.amp
                 + Math.cos(scaleX * 11.5 - t * 0.7) * (s.amp * 0.45);
      
      // When hovered, the wave curvature smoothly breathes and resonates
      const hoverResonance = isHovered ? Math.sin(scaleX * 7.5 + t * 2.0) * (s.amp * 0.35) : 0;
      const baselineY = (s.yBase / 600) * height;

      return baselineY + wave + hoverResonance;
    };

    let animId = null;
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. CELESTIAL RADAR CIRCLES & CROSSHAIRS (from Image 1)
      ctx.save();
      const cx = width * 0.5;
      const cy = height * 0.5;

      ctx.strokeStyle = 'rgba(36, 92, 70, 0.25)';
      ctx.lineWidth = 1;

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // Thin celestial orbit rings
      [250, 180, 110, 40].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        if (idx === 1) {
          ctx.setLineDash([4, 6]);
          ctx.strokeStyle = 'rgba(127, 207, 138, 0.22)';
        } else if (idx === 3) {
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(245, 166, 35, 0.35)';
        } else {
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(36, 92, 70, 0.2)';
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();

      // 2. DETECT HOVERED STRAND (mouse close to strand curve)
      let closestStrand = null;
      let minDistance = 25;

      if (mouseRef.current.isOver) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        strandStates.forEach((s) => {
          const sy = evaluateStrandY(s, mx, s.time);
          const dist = Math.abs(my - sy);
          if (dist < minDistance) {
            minDistance = dist;
            closestStrand = s;
          }
        });
      }

      hoveredStrandIdRef.current = closestStrand ? closestStrand.id : null;

      // 3. RENDER EACH OF THE 7 MULTIVERSE STRINGS
      strandStates.forEach((s) => {
        const isHovered = hoveredStrandIdRef.current === s.id;

        // USER SPECIFICATION: "when mouse is hoverned on a specific sting in them then it should slow the movement of that string only"
        // If hovered, slow speed down to 15%; otherwise keep moving continuously at full speed!
        const speed = isHovered ? s.baseSpeed * 0.15 : s.baseSpeed;
        s.time += speed * 0.022;

        ctx.save();

        // 3a. Wide outer glow path
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 4) {
          const y = evaluateStrandY(s, x, s.time, isHovered);
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = s.color;
        ctx.lineWidth = isHovered ? 12 : s.width * 2.5;
        ctx.globalAlpha = isHovered ? 0.6 : 0.25;
        ctx.shadowColor = s.glowColor || s.color;
        ctx.shadowBlur = isHovered ? 24 : 10;
        ctx.stroke();

        // 3b. Sharp luminous core string
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 4) {
          const y = evaluateStrandY(s, x, s.time, isHovered);
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isHovered ? '#FFFFFF' : s.color;
        ctx.lineWidth = isHovered ? s.width + 1.8 : s.width;
        ctx.globalAlpha = isHovered ? 1.0 : 0.9;
        ctx.shadowBlur = isHovered ? 14 : 0;
        ctx.shadowColor = '#FFFFFF';

        if (s.dashed) {
          ctx.setLineDash([8, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();

        // 3c. Moving traveling quantum energy packet along the string
        const sparkX = ((s.time * 75) % (width + 100)) - 50;
        const sparkY = evaluateStrandY(s, sparkX, s.time, isHovered);
        ctx.beginPath();
        ctx.arc(sparkX, sparkY, isHovered ? 5 : 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = s.color;
        ctx.shadowBlur = isHovered ? 14 : 8;
        ctx.fill();

        // 3d. Telemetry pill tag if string is hovered
        if (isHovered && mouseRef.current.isOver) {
          const tagX = Math.min(width - 120, Math.max(120, mouseRef.current.x));
          const tagY = Math.max(25, evaluateStrandY(s, tagX, s.time) - 16);

          ctx.fillStyle = '#050706';
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 1;
          ctx.fillRect(tagX - 70, tagY - 10, 140, 20);
          ctx.strokeRect(tagX - 70, tagY - 10, 140, 20);

          ctx.font = 'bold 9px "Space Mono", monospace';
          ctx.fillStyle = s.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(s.name, tagX, tagY);
        }

        ctx.restore();
      });

      // 4. RENDER & UPDATE NODES ("and yeah the nodes in them should also moves here and there")
      let closestNode = null;
      let minNodeDist = 48; // Generous hover threshold for effortless targeting

      dynamicNodes.forEach((node) => {
        // Get matching strand to calculate real-time Y position
        const strand = strandStates.find((s) => s.id === node.strandId) || strandStates[0];
        node.y = evaluateStrandY(strand, node.x, strand.time);

        // Check hover distance to mouse
        let isNodeHovered = false;
        if (mouseRef.current.isOver) {
          const dist = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
          if (dist < minNodeDist) {
            minNodeDist = dist;
            closestNode = node;
            isNodeHovered = true;
          }
        }

        // Wander drift: moves here and there along the string, but pauses when hovered
        if (!isNodeHovered) {
          node.x += node.vx;
          if (node.x > node.maxX) {
            node.x = node.maxX;
            node.vx = -Math.abs(node.vx);
          } else if (node.x < node.minX) {
            node.x = node.minX;
            node.vx = Math.abs(node.vx);
          }
        }

        ctx.save();

        if (node.isStar) {
          // Tiny floating star node
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.85;
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 6;
          ctx.fill();
        } else {
          const isNodeHov = closestNode?.id === node.id;

          // Outer radar target ring
          if (node.hasRings) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, isNodeHov ? 18 : 12, 0, Math.PI * 2);
            ctx.strokeStyle = isNodeHov ? '#FFFFFF' : node.color;
            ctx.lineWidth = isNodeHov ? 2 : 1.5;
            ctx.globalAlpha = isNodeHov ? 1.0 : 0.6;
            ctx.shadowColor = isNodeHov ? '#FFFFFF' : node.color;
            ctx.shadowBlur = isNodeHov ? 15 : 5;
            ctx.stroke();

            // Subtle green/amber inner halo
            ctx.beginPath();
            ctx.arc(node.x, node.y, isNodeHov ? 12 : 8, 0, Math.PI * 2);
            ctx.fillStyle = node.ringColor || '#245C46';
            ctx.globalAlpha = isNodeHov ? 0.6 : 0.35;
            ctx.fill();
          }

          // Dark core backdrop
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size + (isNodeHov ? 2 : 0), 0, Math.PI * 2);
          ctx.fillStyle = '#050706';
          ctx.fill();

          // Luminous node center dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, isNodeHov ? node.size : node.size * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = isNodeHov ? '#FFFFFF' : node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = isNodeHov ? 18 : 8;
          ctx.fill();

          // Node HUD tooltip if hovered
          if (isNodeHov) {
            const badgeW = 160;
            const badgeH = 26;
            const badgeX = Math.max(badgeW / 2 + 10, Math.min(width - badgeW / 2 - 10, node.x));
            const badgeY = node.y - 32;

            // Box shadow and fill
            ctx.fillStyle = 'rgba(5, 7, 6, 0.95)';
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 10;
            ctx.fillRect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
            ctx.strokeRect(badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
            ctx.shadowBlur = 0;

            // Text
            ctx.font = 'bold 10px "Space Mono", monospace';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.name, badgeX, badgeY);
          }
        }

        ctx.restore();
      });

      hoveredNodeRef.current = closestNode;

      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    isVisible = false;
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
  }, []);

  const handlePointerMoveOnMap = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);
    mouseRef.current = { x, y, isOver: true };

    if (hoveredNodeRef.current) {
      onSetCursor?.('timeline-node');
    } else if (hoveredStrandIdRef.current) {
      onSetCursor?.('timeline-node');
    } else {
      onSetCursor?.('default');
    }
  };

  const handlePointerLeaveMap = () => {
    mouseRef.current.isOver = false;
    hoveredStrandIdRef.current = null;
    hoveredNodeRef.current = null;
    onSetCursor?.('default');
  };

  const handleCanvasClick = () => {
    if (hoveredNodeRef.current && !hoveredNodeRef.current.isStar) {
      playTemporalPulse();
      setSelectedItem(hoveredNodeRef.current);
    }
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

      {/* 18 — CENTRAL VISUAL UNIVERSE MAP CONTAINER (Matching Image 1) */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMoveOnMap}
        onPointerLeave={handlePointerLeaveMap}
        onClick={handleCanvasClick}
        className="relative w-full h-[480px] sm:h-[560px] bg-[#070A08] border-2 border-tva-border overflow-hidden shadow-2xl relative mb-12 cursor-crosshair"
      >
        {/* CRT Scanline & Ambient Radial Aura */}
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050706]/50 to-[#050706] pointer-events-none" />

        {/* Multiverse Tree Branches Cosmic Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 mix-blend-screen">
          <img
            src={getAssetUrl('assets/images/multiverse_tree_branches.png')}
            alt="Yggdrasil Multiverse Branch System"
            className="w-full h-full object-cover object-center filter brightness-125 contrast-125 scale-105"
          />
        </div>

        {/* Hardware-Accelerated 60+ FPS Interactive Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10"
        />

        {/* Top-Right Map Controls / Telemetry (from Image 1: NEXUS: ONLINE COORDINATES: BENNETT-BU 616) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3 text-[10px] text-tva-bone-dim pointer-events-none">
          <span className="flex items-center gap-1.5 px-2.5 py-1 border border-tva-border bg-[#050706]/90 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
            <span className="text-[#7FCF8A] font-bold">NEXUS: ONLINE</span>
          </span>
          <span className="hidden sm:inline text-tva-amber font-mono font-semibold px-2 py-1 bg-[#050706]/90 border border-tva-border">
            COORDINATES: BENNETT-BU 616
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
