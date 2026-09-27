import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle2, Radio, Zap } from 'lucide-react';
import { playClickSound, playTerminalBeep, playContactPulse, playAccessGrantedSound, playBranchLockSound, playGlitchSound } from '../utils/soundEffects';

const CHANNELS = [
  {
    id: 'github',
    name: 'GITHUB',
    url: 'https://github.com/AnonymousDhruvG988',
    status: 'ACTIVE',
    channelType: 'CODE REPOSITORY',
    clearance: 'PUBLIC',
    color: '#7FCF8A',
    targetY: 50,
    speed: 1.8,
    freq: 2.2,
    phase: 0.2,
    description: 'Access AnonymousDhruvG988 repositories, Loki × TVA multiverse codebase, and open source commits.',
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/dhruv-goswami-96415a435',
    status: 'ACTIVE',
    channelType: 'PROFESSIONAL NETWORK',
    clearance: 'OFFICIAL',
    color: '#FFB52E',
    targetY: 120,
    speed: 2.4,
    freq: 1.9,
    phase: 1.4,
    description: 'Connect with Dhruv Goswami on LinkedIn to verify credentials, professional network, and project updates.',
  },
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    url: 'https://instagram.com',
    status: 'ACTIVE',
    channelType: 'VISUAL TRANSMISSION',
    clearance: 'PUBLIC',
    color: '#FF3366',
    targetY: 200,
    speed: 2.1,
    freq: 2.5,
    phase: 2.8,
    description: 'Real-time photographic surveillance of the 36-hour hackathon arena and backstage incursion.',
  },
  {
    id: 'email',
    name: 'EMAIL',
    url: 'mailto:gfg@bennett.edu.in',
    status: 'MONITORED',
    channelType: 'DIRECT DISPATCH',
    clearance: 'RESTRICTED',
    color: '#00F0FF',
    targetY: 270,
    speed: 1.6,
    freq: 1.7,
    phase: 4.1,
    description: 'Encrypted communication channel with TVA Sector-616 directors and chapter leads.',
  },
];

export default function TemporalContact({ onSetCursor }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [hoveredChannelId, setHoveredChannelId] = useState(CHANNELS[0].id);
  const [sequence, setSequence] = useState([]);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [time, setTime] = useState(0);
  const animFrameRef = useRef(null);

  // Real-time procedural string oscillation loop
  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.04;
      setTime(t);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleChannelSelect = (channel) => {
    playBranchLockSound();
    playContactPulse();
    playGlitchSound();
    setActiveChannel(channel);
    setHoveredChannelId(channel.id);

    // Trigger glitch animation on chosen box
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 550);

    const targetOrder = ['github', 'linkedin', 'instagram', 'email'];
    const nextSeq = [...sequence, channel.id];
    const isValidPrefix = nextSeq.every((id, idx) => id === targetOrder[idx]);

    if (isValidPrefix) {
      if (nextSeq.length === 4) {
        playAccessGrantedSound();
        setIsEasterEggActive(true);
        setSequence([]);
        setTimeout(() => setIsEasterEggActive(false), 3200);
      } else {
        setSequence(nextSeq);
      }
    } else {
      setSequence(channel.id === 'github' ? ['github'] : []);
    }
  };

  const handleChannelHover = (channel) => {
    setHoveredChannelId(channel.id);
    setActiveChannel(channel);
    playBranchLockSound();
    playGlitchSound();
    onSetCursor?.('link');

    // Trigger micro glitch on hover
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 350);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono select-none">
      
      {/* Easter Egg Sequence Success Banner */}
      <AnimatePresence>
        {isEasterEggActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-24 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
          >
            <div className="p-4 bg-[#080B09] border-2 border-[#7FCF8A] text-[#7FCF8A] font-mono text-center shadow-[0_0_30px_#7FCF8A]">
              <div className="text-sm font-bold tracking-[0.25em] flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                <span>&gt;&gt; CONNECTION ESTABLISHED // ALL STRINGS CONVERGED &lt;&lt;</span>
              </div>
              <div className="text-[11px] text-tva-bone-dim mt-1">
                TVA TEMPORAL RELAY SECURED: MULTIVERSE BROADCAST OPEN
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border/60 pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <Radio size={16} />
            <span>SCENE 07 // TEMPORAL COMMUNICATIONS & TRANSMISSION</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            OPEN A TEMPORAL CHANNEL
          </h2>
          <p className="text-xs sm:text-sm text-tva-bone-dim max-w-2xl mt-1 font-body leading-relaxed">
            The Loom unfolds into distinct transmission filaments. Select a reality vector to establish communications with Bennett University TVA Chapter Command.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-tva-bone-dim bg-[#080B09] px-3 py-1.5 border border-tva-border/60">
          <Radio size={14} className="text-[#7FCF8A] animate-pulse" />
          <span>FREQUENCY: <strong className="text-tva-bone">1420.405 MHz</strong></span>
        </div>
      </div>

      {/* THE INTERACTIVE TIMELINE STRINGS & APPARATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT / CENTER: SVG STRING CONVERGENCE SYSTEM (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#080B09] border border-tva-border relative overflow-hidden">
          
          <div className="text-[10px] text-tva-bone-dim tracking-widest uppercase mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-tva-amber">
              <Zap size={13} className="animate-pulse" />
              <span>OSCILLATING TEMPORAL MULTIPLEXER</span>
            </span>
            <span className="text-[#7FCF8A]">
              {hoveredChannelId ? `LOCKED: ${hoveredChannelId.toUpperCase()} [80% DAMPENED]` : 'STATUS: OSCILLATING'}
            </span>
          </div>

          {/* SVG UNROLLING & OSCILLATING TIMELINE STRINGS */}
          <div className="relative w-full h-72 sm:h-80">
            <svg className="w-full h-full" viewBox="0 0 600 320" preserveAspectRatio="none">
              <defs>
                <filter id="stringGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main Incoming Timeline Trunk from Left */}
              <line
                x1="20"
                y1="160"
                x2="240"
                y2="160"
                stroke="#7FCF8A"
                strokeWidth="2.5"
                filter="url(#stringGlow)"
              />

              {/* Central Origin Node */}
              <circle
                cx="240"
                cy="160"
                r={isEasterEggActive ? '10' : '7'}
                fill={isEasterEggActive ? '#A8E6A3' : '#F5A623'}
                filter="url(#stringGlow)"
                className="animate-pulse"
              />

              {/* 4 Oscillating Branching Strings */}
              {CHANNELS.map((ch) => {
                const isSelected = activeChannel.id === ch.id;
                const isHovered = hoveredChannelId === ch.id;
                
                // Requirement: When hovered, the specific chosen branch becomes 80% LESS oscillating!
                // Unhovered amplitude = 22px; Hovered/Chosen amplitude = 4.4px (80% less!)
                const amplitude = isHovered || isSelected ? 4.4 : 22;

                // Procedural organic wave calculation
                const wave1 = Math.sin(time * ch.speed + ch.phase) * amplitude;
                const wave2 = Math.cos(time * ch.freq * 0.8 + ch.phase * 1.5) * (amplitude * 0.7);

                const ctrl1X = 330 + Math.cos(time * 1.2 + ch.phase) * 15;
                const ctrl1Y = 160 + wave1;

                const ctrl2X = 420 + Math.sin(time * 1.1 + ch.phase) * 15;
                const ctrl2Y = ch.targetY + wave2;

                const pathD = `M 240 160 C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, 520 ${ch.targetY}`;

                return (
                  <g key={ch.id}>
                    {/* Shadow wider glow string */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? ch.color : '#1D2B22'}
                      strokeWidth={isSelected ? 5 : 1.5}
                      strokeOpacity={isSelected ? 0.35 : 0.15}
                      filter="url(#stringGlow)"
                    />

                    {/* Crisp core oscillating string */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? ch.color : isHovered ? '#FFFFFF' : '#245C46'}
                      strokeWidth={isSelected ? 2.8 : 1.4}
                      strokeDasharray={isSelected ? 'none' : '6 4'}
                      filter="url(#stringGlow)"
                      className="transition-colors duration-200"
                    />

                    {/* Active pulse bead travelling down string when chosen */}
                    {isSelected && (
                      <circle
                        cx={240 + ((time * 120 + ch.phase * 50) % 280)}
                        cy={160 + ((ch.targetY - 160) * (((time * 120 + ch.phase * 50) % 280) / 280)) + (wave1 * 0.3)}
                        r="3"
                        fill="#FFFFFF"
                        filter="url(#stringGlow)"
                      />
                    )}

                    {/* Terminal Connection Node */}
                    <circle
                      cx="520"
                      cy={ch.targetY}
                      r={isSelected ? '6.5' : '4.5'}
                      fill={isSelected ? ch.color : '#1A261E'}
                      stroke={ch.color}
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Clickable Channel Node Selectors positioned over right edge */}
            <div className="absolute inset-y-0 right-0 flex flex-col justify-between py-2 sm:py-3 pointer-events-auto">
              {CHANNELS.map((ch) => {
                const isSelected = activeChannel.id === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleChannelSelect(ch)}
                    onMouseEnter={() => handleChannelHover(ch)}
                    onMouseLeave={() => onSetCursor?.('default')}
                    className={`px-3 py-1.5 border text-left text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-tva-bone bg-[#101613] text-tva-bone shadow-[0_0_20px_rgba(245,166,35,0.4)] scale-105'
                        : 'border-tva-border/60 bg-[#080B09] text-tva-bone-dim hover:text-tva-bone hover:border-[#7FCF8A]'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'animate-ping' : ''}`}
                      style={{ backgroundColor: ch.color }}
                    />
                    <span>{ch.name}</span>
                    <span className="text-[9px] text-[#7FCF8A] ml-2 hidden sm:inline">[ACCESS TIMELINE]</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-tva-border/60 text-[10px] text-tva-bone-dim flex items-center justify-between">
            <span>SEQUENCE EASTER EGG: [GITHUB &rarr; LINKEDIN &rarr; INSTAGRAM &rarr; EMAIL]</span>
            <span className="text-[#7FCF8A]">ACTIVE PROGRESS: {sequence.length} / 4</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT CHANNEL PANEL WITH TEMPORAL GLITCH ANIMATION */}
        <div
          className={`lg:col-span-5 p-6 sm:p-8 bg-[#080B09] border-2 relative shadow-2xl font-mono text-xs flex flex-col justify-between transition-all duration-300 ${
            isGlitching ? 'scale-[1.02] filter contrast-150 shadow-[0_0_35px_rgba(255,51,102,0.6)]' : ''
          }`}
          style={{
            borderColor: activeChannel.color,
            boxShadow: `0 0 30px ${activeChannel.color}33`,
          }}
        >
          {/* Glitch Scanlines & Chromatic Aberration Burst */}
          {isGlitching && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3366]/25 to-transparent pointer-events-none animate-pulse z-20" />
              <div className="absolute inset-x-0 top-1/4 h-[1.5px] bg-[#00F0FF] shadow-[0_0_12px_#00F0FF] z-20 animate-ping" />
              <div className="absolute inset-x-0 top-2/3 h-[1.5px] bg-[#FF3366] shadow-[0_0_12px_#FF3366] z-20 animate-pulse" />
            </>
          )}

          {/* CRT Scanline */}
          <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-tva-border/60 pb-3 mb-4 text-[10px] text-tva-bone-dim">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeChannel.color }} />
                <span>TEMPORAL CHANNEL MONITOR</span>
              </span>
              <span className="font-bold uppercase" style={{ color: activeChannel.color }}>
                {activeChannel.status}
              </span>
            </div>

            {/* Title with Chromatic Glitch Effect when switched */}
            <h3
              className={`font-display text-4xl sm:text-5xl text-tva-bone tracking-wide uppercase transition-transform ${
                isGlitching ? 'translate-x-1 text-[#00F0FF]' : ''
              }`}
              style={{
                textShadow: isGlitching
                  ? `2px 0 #FF3366, -2px 0 #00F0FF`
                  : `0 0 15px ${activeChannel.color}66`,
              }}
            >
              {activeChannel.name}
            </h3>

            <div className="space-y-3 py-4 my-2 border-y border-tva-border/60 text-xs font-body leading-relaxed">
              <div>
                <strong className="font-mono text-tva-bone">CHANNEL TYPE:</strong>{' '}
                <span className="text-tva-bone-dim">{activeChannel.channelType}</span>
              </div>
              <div>
                <strong className="font-mono text-tva-bone">CLEARANCE:</strong>{' '}
                <span className="font-mono font-bold" style={{ color: activeChannel.color }}>
                  {activeChannel.clearance}
                </span>
              </div>
              <div>
                <strong className="font-mono text-tva-bone">MISSION ROLE:</strong>{' '}
                <span className="text-tva-bone-dim">{activeChannel.description}</span>
              </div>
            </div>
          </div>

          {/* Action Button: [ OPEN CHANNEL ] */}
          <div className="pt-4 relative z-10">
            <a
              href={activeChannel.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="w-full py-3.5 px-4 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg cursor-pointer"
              style={{ backgroundColor: activeChannel.color }}
            >
              <span>[ OPEN CHANNEL ]</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
