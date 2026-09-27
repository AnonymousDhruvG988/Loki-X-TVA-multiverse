import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Terminal, Menu, X, ShieldAlert } from 'lucide-react';
import { playClickSound, playTerminalBeep, playTemporalPulse } from '../utils/soundEffects';

export default function TVANav({
  soundEnabled,
  onToggleSound,
  onOpenTerminal,
  onOpenAuth,
  onSetCursor,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const progressBlocksRef = useRef(null);
  const progressPercentRef = useRef(null);

  // Live TVA Temporal clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} TZ-616`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Zero-react-render scroll progress indicator
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const p = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
            const filled = Math.min(10, Math.floor((p / 100) * 10));
            if (progressBlocksRef.current) {
              progressBlocksRef.current.textContent = '█'.repeat(filled) + '░'.repeat(10 - filled);
            }
            if (progressPercentRef.current) {
              progressPercentRef.current.textContent = `${Math.round(p)}%`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    playClickSound();
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 28 — MINIMAL TECHNICAL TVA TOP NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050706]/95 border-b border-tva-border/60 transition-colors select-none font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between text-xs">
          
          {/* LEFT: VARIANT PROTOCOL LOGO */}
          <a
            href="#overview"
            onClick={() => playClickSound()}
            onMouseEnter={() => onSetCursor?.('link')}
            onMouseLeave={() => onSetCursor?.('default')}
            className="flex items-center gap-2.5 group text-tva-bone"
          >
            <div className="w-7 h-7 rounded border border-[#7FCF8A] bg-[#090D0B] flex items-center justify-center group-hover:border-[#F5A623] transition-colors shadow-[0_0_10px_rgba(127,207,138,0.3)]">
              <span className="text-[#7FCF8A] group-hover:text-[#F5A623] font-display font-bold text-sm tracking-wider">TVA</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-base tracking-wider text-tva-bone group-hover:text-[#7FCF8A] transition-colors leading-none">
                TIME VARIANCE AUTHORITY
              </span>
              <span className="text-[9px] text-[#F5A623] tracking-widest leading-none mt-0.5">
                TEMPORAL CONTROL // SECTOR-616
              </span>
            </div>
          </a>

          {/* CENTER: SECTION 33 TVA PRIMARY NAVIGATION (Desktop) */}
          <nav className="hidden xl:flex items-center gap-4 text-[11px] tracking-wider text-tva-bone-dim">
            <a
              href="#overview"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors"
            >
              TVA
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <a
              href="#branches"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors"
            >
              TIMELINES
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <a
              href="#archives"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors"
            >
              ARCHIVE
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <a
              href="#artifacts"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors"
            >
              ARTIFACTS
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <a
              href="#briefing"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors"
            >
              MISSION
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <a
              href="#registration"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors font-medium text-[#F5A623]"
            >
              CLEARANCE
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <a
              href="#contact"
              onClick={() => playClickSound()}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#7FCF8A] transition-colors"
            >
              CONTACT
            </a>
            <span className="text-tva-border/50">&bull;</span>
            <button
              onClick={() => {
                playTerminalBeep();
                onOpenAuth?.('login');
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="hover:text-[#F5A623] transition-colors uppercase font-medium"
            >
              LOGIN
            </button>
            <span className="text-tva-border/50">&bull;</span>
            <button
              onClick={() => {
                playTemporalPulse();
                onOpenAuth?.('signup');
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className="text-[#7FCF8A] hover:text-[#A8E6A3] font-bold uppercase transition-colors"
            >
              SIGN UP
            </button>
          </nav>

          {/* RIGHT: CONTROLS (TVA Audio Toggle, Terminal, Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Scroll progress readout */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] text-tva-bone-dim bg-[#090D0B] px-2.5 py-1 border border-tva-border">
              <span className="text-[#7FCF8A] font-bold">TIMELINE</span>
              <span ref={progressBlocksRef} className="text-[#7FCF8A] tracking-tighter font-mono">░░░░░░░░░░</span>
              <span ref={progressPercentRef} className="text-tva-bone">0%</span>
            </div>

            {/* 12 — TVA SOUND TOGGLE: SOUND ◉ ON / SOUND ○ OFF */}
            <button
              onClick={() => {
                onToggleSound();
                playClickSound();
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
              className={`flex items-center gap-1.5 px-2.5 py-1 border text-[10px] tracking-wider transition-all uppercase ${
                soundEnabled
                  ? 'border-[#7FCF8A] text-[#7FCF8A] bg-[#7FCF8A]/10 shadow-[0_0_10px_rgba(127,207,138,0.2)]'
                  : 'border-tva-border text-tva-bone-dim hover:text-tva-bone bg-[#080B09]'
              }`}
            >
              <span className="font-bold">{soundEnabled ? 'SOUND ◉ ON' : 'SOUND ○ OFF'}</span>
            </button>

            {/* TemPad Terminal Quick Button */}
            <button
              onClick={() => {
                playTemporalPulse();
                onOpenTerminal();
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              title="Launch Classified TVA Terminal (Shortcut: ~)"
              className="hidden sm:flex items-center gap-1 px-2 py-1 border border-tva-border hover:border-tva-amber text-tva-bone-dim hover:text-tva-amber bg-[#080B09] text-[10px] uppercase transition-colors"
            >
              <Terminal size={11} />
              <span>TERMINAL [~]</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                playClickSound();
                setIsMenuOpen(!isMenuOpen);
              }}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              aria-label="Toggle Navigation Menu"
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1 border border-tva-amber bg-tva-amber text-black hover:bg-[#FFB52E] font-bold text-[10px] uppercase transition-all shadow-amber-sm"
            >
              {isMenuOpen ? <X size={12} /> : <Menu size={12} />}
              <span>{isMenuOpen ? 'CLOSE' : 'INDEX'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN TERMINAL DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-16 bg-[#050706] flex flex-col justify-between overflow-y-auto font-mono text-xs select-none"
          >
            <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

            <div className="max-w-xl mx-auto w-full px-6 py-6 relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-tva-border pb-3">
                <div className="text-[#7FCF8A] font-bold">TVA SYSTEM NAVIGATION</div>
                <div className="text-tva-bone-dim text-[11px]">{currentTime}</div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                {[
                  { id: '#overview', label: 'THE VARIANT // HERO', sub: 'Sector 616-NCR Incursion' },
                  { id: '#briefing', label: 'TVA MISSION // CASE FILE', sub: 'Evidence Dossier & Redactions' },
                  { id: '#branches', label: 'TIMELINES // 4 TRACKS', sub: 'Multiverse Challenge Vectors' },
                  { id: '#artifacts', label: 'INFINITY ARTIFACTS', sub: 'Six Primordial Relics' },
                  { id: '#schedule', label: 'TEMPORAL SEQUENCE', sub: '36-Hour Chronology' },
                  { id: '#contact', label: 'TEMPORAL CHANNELS', sub: 'Communication Transmitters' },
                  { id: '#registration', label: 'REQUEST CLEARANCE', sub: 'Obtain Official Pass' },
                ].map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="w-full text-left p-3 border border-tva-border bg-[#090D0B] hover:border-[#7FCF8A] transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-tva-bone">{item.label}</div>
                      <div className="text-[10px] text-tva-bone-dim">{item.sub}</div>
                    </div>
                    <span className="text-[#7FCF8A]">&rarr;</span>
                  </button>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth?.('login');
                  }}
                  className="py-2.5 border border-tva-amber text-tva-amber font-bold uppercase tracking-wider text-center"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth?.('signup');
                  }}
                  className="py-2.5 bg-[#7FCF8A] text-black font-bold uppercase tracking-wider text-center"
                >
                  SIGN UP
                </button>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-xl mx-auto w-full px-6 py-4 border-t border-tva-border text-[10px] text-tva-bone-dim flex justify-between items-center">
              <span>FOR ALL TIME. ALWAYS.</span>
              <span>CASE #VP-2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
