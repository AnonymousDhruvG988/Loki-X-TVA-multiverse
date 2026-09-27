import React, { useState, useEffect } from 'react';
import { ExternalLink, Volume2, VolumeX, Sparkles, Orbit } from 'lucide-react';
import { playClickSound, playTemporalPulse, playBranchLockSound, setSoundEnabled, getSoundEnabled } from '../utils/soundEffects';

export default function Footer({ onSetCursor }) {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [endingStep, setEndingStep] = useState(1);
  const [isBranchHovered, setIsBranchHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    playClickSound();
  };

  const handleBranchClick = () => {
    playTemporalPulse();
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 900);
  };

  const handleBranchHover = () => {
    setIsBranchHovered(true);
    playBranchLockSound();
    onSetCursor?.('timeline-node');
  };

  // Section 47 & Directive 40: Final Footer Animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setEndingStep((prev) => (prev % 4) + 1);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#040605] border-t border-[#1D2B22] text-tva-bone-dim font-mono text-xs z-10 overflow-hidden select-none">
      
      {/* 46 — Thin green timeline traveling across the footer */}
      <div className="w-full h-0.5 bg-[#090D0B] overflow-hidden relative">
        <div className="w-2/5 h-full bg-gradient-to-r from-transparent via-[#7FCF8A] to-transparent shadow-[0_0_15px_#7FCF8A] animate-pulse" />
      </div>

      {/* 47 — EYE-CATCHING CINEMATIC YGGDRASIL BRANCH CONVERGENCE & GOD OF STORIES THRONE */}
      <div className="relative py-12 px-4 sm:px-8 border-b border-[#1D2B22]/60 overflow-hidden flex flex-col items-center justify-center text-center">
        
        {/* Top Telemetry Header */}
        <div className="flex items-center gap-2 text-[10px] text-[#7FCF8A] uppercase tracking-widest mb-3">
          <Sparkles size={13} className="animate-spin-slow text-[#F5A623]" />
          <span>YGGDRASIL MULTIVERSE // TEMPORAL HORIZON CONVERGENCE</span>
        </div>

        {/* Grand Eye-Catching Branch Convergence Viewport */}
        <div
          onClick={handleBranchClick}
          onMouseEnter={handleBranchHover}
          onMouseLeave={() => {
            setIsBranchHovered(false);
            onSetCursor?.('default');
          }}
          className={`w-full max-w-4xl h-56 sm:h-72 lg:h-80 relative overflow-hidden my-4 border transition-all duration-700 cursor-pointer shadow-2xl rounded-sm ${
            isBranchHovered
              ? 'border-[#7FCF8A] shadow-[0_0_45px_rgba(127,207,138,0.35)] scale-[1.01]'
              : 'border-[#245C46]/60 bg-[#050806] shadow-[0_0_30px_rgba(0,0,0,0.8)]'
          }`}
        >
          {/* CRT Scanline */}
          <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none z-20" />

          {/* Background Cosmic Multiverse Tree Image */}
          <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen scale-110 filter brightness-125 contrast-125 transition-transform duration-1000 group-hover:scale-115">
            <img
              src="/assets/images/multiverse_tree_branches.png"
              alt="Cosmic Multiverse Tree"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Radial God-Rays & Nebular Core */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background: isBranchHovered
                ? 'radial-gradient(circle at 50% 50%, rgba(127, 207, 138, 0.4) 0%, rgba(245, 166, 35, 0.25) 45%, rgba(5, 7, 6, 0.8) 80%)'
                : 'radial-gradient(circle at 50% 50%, rgba(127, 207, 138, 0.22) 0%, rgba(23, 63, 50, 0.2) 50%, rgba(5, 7, 6, 0.85) 85%)',
            }}
          />

          {/* Shockwave Ping on Click */}
          {pulseActive && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-[#7FCF8A] animate-ping pointer-events-none z-30" />
          )}

          {/* High-Impact Multi-Branch SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 320" preserveAspectRatio="none">
            <defs>
              <filter id="branchSuperGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="godGlowLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7FCF8A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F5A623" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="godGlowRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B026FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7FCF8A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F5A623" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Radiant Volumetric God Rays radiating from Throne Center (500, 160) */}
            <g opacity={isBranchHovered ? '0.45' : '0.22'} className="transition-opacity duration-700">
              <polygon points="500,160 200,0 260,0" fill="#7FCF8A" />
              <polygon points="500,160 380,0 440,0" fill="#F5A623" />
              <polygon points="500,160 560,0 620,0" fill="#F5A623" />
              <polygon points="500,160 740,0 800,0" fill="#7FCF8A" />
              <polygon points="500,160 100,80 140,120" fill="#00F0FF" />
              <polygon points="500,160 860,120 900,80" fill="#B026FF" />
            </g>

            {/* LEFT SIDE CONVERGING MULTIVERSE BRANCHES */}
            {/* Left Upper Canopy */}
            <path d="M -20 20 Q 220 30, 500 160" fill="none" stroke="#7FCF8A" strokeWidth={isBranchHovered ? '3.5' : '2.2'} filter="url(#branchSuperGlow)" />
            <path d="M 40 80 Q 280 90, 500 160" fill="none" stroke="#A8E6A3" strokeWidth="1.8" strokeDasharray="8 6" opacity="0.85" />
            {/* Left Primary Trunk */}
            <path d="M -40 160 C 180 160, 340 160, 500 160" fill="none" stroke="url(#godGlowLeft)" strokeWidth={isBranchHovered ? '4.8' : '3.5'} filter="url(#branchSuperGlow)" />
            {/* Left Lower Canopy */}
            <path d="M -10 240 Q 240 230, 500 160" fill="none" stroke="#00F0FF" strokeWidth="2.0" opacity="0.85" filter="url(#branchSuperGlow)" />
            <path d="M 60 300 Q 300 260, 500 160" fill="none" stroke="#F5A623" strokeWidth="1.6" strokeDasharray="6 4" opacity="0.75" />

            {/* Sub-bifurcations (Leaves of light on Left) */}
            <path d="M 160 50 Q 200 90, 240 70" fill="none" stroke="#7FCF8A" strokeWidth="1.2" opacity="0.7" />
            <path d="M 120 160 Q 160 120, 210 130" fill="none" stroke="#A8E6A3" strokeWidth="1.2" opacity="0.7" />
            <circle cx="240" cy="70" r="3" fill="#FFFFFF" filter="url(#branchSuperGlow)" className="animate-ping" />
            <circle cx="210" cy="130" r="2.5" fill="#F5A623" />
            <circle cx="110" cy="230" r="3" fill="#00F0FF" className="animate-pulse" />

            {/* RIGHT SIDE CONVERGING MULTIVERSE BRANCHES */}
            {/* Right Upper Canopy */}
            <path d="M 1020 20 Q 780 30, 500 160" fill="none" stroke="#7FCF8A" strokeWidth={isBranchHovered ? '3.5' : '2.2'} filter="url(#branchSuperGlow)" />
            <path d="M 960 80 Q 720 90, 500 160" fill="none" stroke="#A8E6A3" strokeWidth="1.8" strokeDasharray="8 6" opacity="0.85" />
            {/* Right Primary Trunk */}
            <path d="M 1040 160 C 820 160, 660 160, 500 160" fill="none" stroke="url(#godGlowRight)" strokeWidth={isBranchHovered ? '4.8' : '3.5'} filter="url(#branchSuperGlow)" />
            {/* Right Lower Canopy */}
            <path d="M 1010 240 Q 760 230, 500 160" fill="none" stroke="#B026FF" strokeWidth="2.0" opacity="0.85" filter="url(#branchSuperGlow)" />
            <path d="M 940 300 Q 700 260, 500 160" fill="none" stroke="#F5A623" strokeWidth="1.6" strokeDasharray="6 4" opacity="0.75" />

            {/* Sub-bifurcations (Leaves of light on Right) */}
            <path d="M 840 50 Q 800 90, 760 70" fill="none" stroke="#7FCF8A" strokeWidth="1.2" opacity="0.7" />
            <path d="M 880 160 Q 840 120, 790 130" fill="none" stroke="#A8E6A3" strokeWidth="1.2" opacity="0.7" />
            <circle cx="760" cy="70" r="3" fill="#FFFFFF" filter="url(#branchSuperGlow)" className="animate-ping" />
            <circle cx="790" cy="130" r="2.5" fill="#F5A623" />
            <circle cx="890" cy="230" r="3" fill="#B026FF" className="animate-pulse" />

            {/* Central Convergence Energy Orb (500, 160) */}
            <circle cx="500" cy="160" r={isBranchHovered ? '24' : '18'} fill="rgba(127, 207, 138, 0.3)" />
            <circle cx="500" cy="160" r={isBranchHovered ? '14' : '10'} fill="#7FCF8A" filter="url(#branchSuperGlow)" className="animate-pulse" />
            <circle cx="500" cy="160" r="5" fill="#FFFFFF" />
          </svg>

          {/* CENTRAL GOD OF STORIES ON THE THRONE SILHOUETTE */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative flex flex-col items-center">
              
              {/* Radiant Sunburst Crown Aura */}
              <div
                className={`w-28 h-28 rounded-full pointer-events-none blur-xl transition-all duration-700 ${
                  isBranchHovered
                    ? 'bg-gradient-to-tr from-[#7FCF8A] via-[#F5A623] to-[#FFFFFF] opacity-80 scale-125'
                    : 'bg-[#7FCF8A] opacity-40 scale-100'
                }`}
              />

              {/* Majestic Horned Crown Silhouette */}
              <svg viewBox="0 0 120 100" className="w-24 h-24 absolute top-1 text-[#7FCF8A] drop-shadow-[0_0_12px_#7FCF8A]">
                {/* Grand Golden Horns */}
                <path d="M 46 36 Q 16 14, 4 4 Q 20 28, 44 42 Z" fill="#F5A623" />
                <path d="M 74 36 Q 104 14, 116 4 Q 100 28, 76 42 Z" fill="#F5A623" />
                {/* Crown Circlet */}
                <path d="M 40 40 Q 60 32, 80 40 L 76 46 Q 60 40, 44 46 Z" fill="#FFD700" />
                {/* Head */}
                <ellipse cx="60" cy="46" rx="10" ry="13" fill="#0A0E0C" stroke="#7FCF8A" strokeWidth="1.5" />
                {/* Flowing Robes & God of Stories Mantle */}
                <path d="M 36 62 Q 60 52, 84 62 L 96 95 L 24 95 Z" fill="#060907" stroke="#7FCF8A" strokeWidth="1.5" />
                {/* Woven Green Timeline Threads held in hands */}
                <path d="M 42 70 Q 60 76, 78 70" fill="none" stroke="#7FCF8A" strokeWidth="2.5" filter="url(#branchSuperGlow)" />
                <circle cx="60" cy="74" r="3.5" fill="#FFFFFF" className="animate-pulse" />
              </svg>
            </div>
          </div>

          {/* Telemetry Footer Badge Inside Viewport */}
          <div className="absolute bottom-2.5 inset-x-0 z-20 flex justify-center">
            <span className="px-3 py-1 bg-[#050706]/90 border border-tva-border/60 text-[9px] text-tva-bone-dim tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
              <span>TIMELINE STATUS: <strong className="text-[#7FCF8A]">100% SYNCHRONIZED</strong> // 10^14 REALITIES SUSTAINED</span>
            </span>
          </div>
        </div>

        {/* 47 — Cinematic Ending Progression Text */}
        <div className="min-h-[64px] flex flex-col items-center justify-center space-y-1">
          {endingStep === 1 && (
            <div className="animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#7FCF8A] uppercase">
                &gt;&gt; TIMELINE STABLE &lt;&lt;
              </span>
              <div className="text-[10px] text-tva-bone-dim tracking-widest mt-1">
                ALL SACRED BRANCHES TEMPORARILY SYNCHRONIZED
              </div>
            </div>
          )}

          {endingStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-2xl sm:text-3xl tracking-widest text-[#E8E2D0] uppercase">
                TIME VARIANCE AUTHORITY
              </h2>
              <div className="text-[10px] text-[#F5A623] tracking-widest mt-1">
                TVA CONTROL DIVISION // CASE #TVA-2026
              </div>
            </div>
          )}

          {endingStep === 3 && (
            <div className="animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#FF3366] uppercase">
                SESSION STATUS: TERMINATED
              </span>
              <div className="text-[10px] text-tva-bone-dim tracking-widest mt-1">
                FOR ALL TIME. ALWAYS.
              </div>
            </div>
          )}

          {endingStep === 4 && (
            <div className="animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-[#7FCF8A] uppercase">
                UNTIL THE NEXT BRANCH...
              </span>
              <div className="text-[10px] text-[#F5A623] tracking-widest mt-1">
                TVA CLOCK STOPPED // TIMELINE STABLE
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN FOOTER DIRECTORY (5 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Organization & Event info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-[#7FCF8A]/40 bg-[#090D0B] flex items-center justify-center">
                <span className="text-[#7FCF8A] font-display font-bold text-sm">GFG</span>
              </div>
              <div className="text-tva-bone font-bold text-sm tracking-wider">
                GEEKSFORGEEKS STUDENT CHAPTER
                <span className="text-[10px] text-[#F5A623] block">
                  BENNETT UNIVERSITY // SECTOR 616-NCR
                </span>
              </div>
            </div>

            <p className="text-xs text-tva-bone-dim leading-relaxed max-w-sm font-body">
              A multidimensional hackathon engineered to challenge, test, and celebrate student developers across India. The Sacred Timeline welcomes your submission.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="tva-stamp tva-stamp-green text-[9px]">
                CASE: #VP-2026
              </span>
              <span className="tva-stamp tva-stamp-amber text-[9px]">
                TIMELINE: STABLE
              </span>
              <span className="px-2 py-0.5 border border-[#1D2B22] text-[10px] text-tva-bone-dim bg-[#090D0B]">
                TZ: +05:30 IST
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Timelines */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              TVA CHRONOLOGY
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { href: '#overview', name: 'Overview // Hero' },
                { href: '#briefing', name: 'Case Dossier 26229' },
                { href: '#branches', name: 'Timeline Tracks' },
                { href: '#artifacts', name: 'Infinity Stones' },
                { href: '#schedule', name: 'Temporal Sequence' },
                { href: '#contact', name: 'Temporal Channels' },
                { href: '#registration', name: 'Request Clearance' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    onClick={() => playClickSound()}
                    onMouseEnter={() => onSetCursor?.('link')}
                    onMouseLeave={() => onSetCursor?.('default')}
                    className="hover:text-[#7FCF8A] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#7FCF8A] text-[10px]">&gt;</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Institution Details */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              SECTOR HQ
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.bennett.edu.in"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onSetCursor?.('link')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="hover:text-tva-amber transition-colors flex items-center gap-1"
                >
                  <span>Bennett University</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.geeksforgeeks.org"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onSetCursor?.('link')}
                  onMouseLeave={() => onSetCursor?.('default')}
                  className="hover:text-tva-amber transition-colors flex items-center gap-1"
                >
                  <span>GeeksforGeeks Portal</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <span className="text-tva-bone-dim">Plot Nos 8-11, TechZone 2</span>
              </li>
              <li>
                <span className="text-tva-bone-dim">Greater Noida, UP 201310</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Terminal Sound & Dispatch */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              TVA CONTROLS
            </div>
            
            {/* Section 12: Sound Toggle SOUND ◉ ON / SOUND ○ OFF */}
            <div className="pt-1">
              <button
                onClick={handleToggleSound}
                onMouseEnter={() => onSetCursor?.('link')}
                onMouseLeave={() => onSetCursor?.('default')}
                className={`w-full py-2 px-3 border text-xs tracking-wider uppercase transition-all flex items-center justify-between ${
                  soundOn
                    ? 'border-[#7FCF8A] text-[#7FCF8A] bg-[#7FCF8A]/10 shadow-[0_0_12px_rgba(127,207,138,0.2)]'
                    : 'border-tva-border text-tva-bone-dim hover:text-tva-bone bg-[#080B09]'
                }`}
              >
                <span>TVA AUDIO</span>
                <span className="font-bold flex items-center gap-1.5">
                  {soundOn ? (
                    <>
                      <span>◉ ON</span>
                      <Volume2 size={13} />
                    </>
                  ) : (
                    <>
                      <span>○ OFF</span>
                      <VolumeX size={13} />
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-tva-bone-dim leading-relaxed space-y-1">
              <div>Direct Transmission:</div>
              <a href="mailto:gfg@bennett.edu.in" className="text-[#7FCF8A] hover:underline block">
                gfg@bennett.edu.in
              </a>
              <div className="pt-1 flex items-center gap-2">
                <a
                  href="https://github.com/AnonymousDhruvG988"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] hover:text-[#7FCF8A] transition-colors flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink size={10} />
                </a>
                <span>&bull;</span>
                <a
                  href="https://www.linkedin.com/in/dhruv-goswami-96415a435"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] hover:text-[#F5A623] transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Epilogue Bar */}
        <div className="border-t border-[#1D2B22]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-tva-bone-dim">
          <div className="flex items-center gap-3">
            <span className="text-tva-amber font-bold">FOR ALL TIME. ALWAYS.</span>
            <span>&bull;</span>
            <span>TIME VARIANCE AUTHORITY // TEMPORAL CONTROL DIVISION</span>
          </div>

          <div>
            &copy; 2026 GeeksForGeeks Student Chapter, Bennett University.
          </div>
        </div>
      </div>
    </footer>
  );
}
