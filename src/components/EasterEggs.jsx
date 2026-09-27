import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { playClickSound, playTerminalBeep, playGlitchSound, playTemporalPulse } from '../utils/soundEffects';

export default function EasterEggs({ isOpen, onClose, onRegisterClick, onTriggerGlitch }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: 'TIME VARIANCE AUTHORITY // TEMPAD OS v4.89', type: 'system' },
    { text: 'SEC-616 BENNETT UNIVERSITY CLUSTER ATTACHED.', type: 'system' },
    { text: "Type 'help' to inspect authorized terminal commands.", type: 'dim' },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playTerminalBeep();
    const newHistory = [...history, { text: `> ${inputVal}`, type: 'user' }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: '=== AUTHORIZED TEMPAD COMMANDS ===', type: 'amber' },
          { text: '  status       : Query live loom stability & Bennett sector metrics', type: 'text' },
          { text: '  branches     : Display all 4 incursion tracks & deviation rates', type: 'text' },
          { text: '  clearance    : Request emergency Variant Pass authorization', type: 'text' },
          { text: '  miss-minutes : Interrogate Miss Minutes AI assistant', type: 'text' },
          { text: '  loki         : Intercept classified audio transcript of Variant L-1130', type: 'text' },
          { text: '  prune        : Arm tactical reset charge (Warning: high voltage)', type: 'magenta' },
          { text: '  glitch       : Trigger 39.3 Temporal Glitch Mode incursion', type: 'magenta' },
          { text: '  matrix       : Trigger dimensional chromatic aberration test', type: 'text' },
          { text: '  clear        : Wipe terminal buffer', type: 'text' },
          { text: '  exit         : Terminate session and return to surface', type: 'text' }
        );
        break;

      case 'glitch':
        onTriggerGlitch?.();
        newHistory.push({ text: 'TEMPORAL SYSTEM INSTABILITY ENGAGED // 39.3 GLITCH MODE ACTIVE', type: 'magenta' });
        break;

      case 'status':
        newHistory.push(
          { text: '--- SECTOR-616 DIAGNOSTICS ---', type: 'amber' },
          { text: 'LOCATION: Bennett University Campus, Greater Noida, Delhi-NCR', type: 'text' },
          { text: 'COORDINATES: 28.4595° N, 77.5132° E', type: 'text' },
          { text: 'LOOM INTEGRITY: 99.4% // STABLE', type: 'text' },
          { text: 'REGISTERED VARIANTS: 428 / 500 QUOTA', type: 'text' },
          { text: 'PRIZE POOL ALLOCATED: ₹1,50,000+ IN BOUNTIES', type: 'emerald' }
        );
        break;

      case 'branches':
        newHistory.push(
          { text: '--- ACTIVE INCURSION CLUSTERS ---', type: 'amber' },
          { text: '[01] EARTH-616: Neural Incursion (AI Swarms) [+0.082%]', type: 'text' },
          { text: '[02] EARTH-838: Chrono-Ledger (Quantum & Web3) [+0.114%]', type: 'text' },
          { text: '[03] EARTH-199999: Void Sentinel (Cyber Defense) [+0.057%]', type: 'text' },
          { text: '[04] EARTH-TRN888: Multiverse Catalyst (Creative Tech) [+0.198%]', type: 'text' }
        );
        break;

      case 'loki':
        playGlitchSound();
        newHistory.push(
          { text: 'TRANSCRIPT DECRYPTED // VARIANT L-1130:', type: 'amber' },
          { text: '"I know what I am. I was born to cause pain and suffering and death. But what if we rewrite that? What if we build something that outlives the gods? See you at Bennett."', type: 'dim' }
        );
        break;

      case 'miss-minutes':
        playTemporalPulse();
        newHistory.push(
          { text: 'MISS MINUTES SAYS:', type: 'amber' },
          { text: '"Hey y\'all! Don\'t let your code cause a nexus event before the midnight check-in! Keep those git commits comin\' and stay hydrated!"', type: 'text' }
        );
        break;

      case 'prune':
        playGlitchSound();
        newHistory.push(
          { text: 'WARNING: RESET CHARGE ARMED... DEPLOYING PRUNING FIELD...', type: 'magenta' },
          { text: '...PRUNING ABORTED! Just kidding. Go build something brilliant at Variant Protocol!', type: 'emerald' }
        );
        break;

      case 'clearance':
        newHistory.push(
          { text: 'OVERRIDING SECURITY PROTOCOL... REDIRECTING TO CLEARANCE GATE...', type: 'emerald' }
        );
        setTimeout(() => {
          onClose();
          onRegisterClick();
        }, 800);
        break;

      case 'matrix':
        playGlitchSound();
        document.body.classList.add('filter', 'invert');
        setTimeout(() => document.body.classList.remove('filter', 'invert'), 600);
        newHistory.push({ text: 'DIMENSIONAL PHASE SHIFT COMPLETED.', type: 'text' });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          text: `Command not recognized: '${cmd}'. Type 'help' for authorized directives.`,
          type: 'magenta',
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#0A0A0C] border-2 border-tva-amber shadow-amber-lg flex flex-col h-[520px] font-mono text-xs overflow-hidden"
          >
            {/* CRT Scanline */}
            <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-tva-border text-tva-bone">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-tva-amber" />
                <span className="font-bold tracking-widest text-[11px] text-tva-amber">
                  TVA CLASSIFIED SHELL // BENNETT-CAMPUS-SHELL
                </span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="text-tva-bone-dim hover:text-tva-amber transition-colors p-1"
                aria-label="Close terminal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body Screen */}
            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs text-tva-bone">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    line.type === 'user'
                      ? 'text-tva-amber font-bold'
                      : line.type === 'amber'
                      ? 'text-tva-amber font-bold'
                      : line.type === 'magenta'
                      ? 'text-tva-magenta font-semibold'
                      : line.type === 'emerald'
                      ? 'text-emerald-400 font-semibold'
                      : line.type === 'dim'
                      ? 'text-tva-bone-dim italic'
                      : 'text-tva-bone'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={handleCommand}
              className="p-3 bg-neutral-950 border-t border-tva-border flex items-center gap-2"
            >
              <span className="text-tva-amber font-bold text-sm">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type command (e.g. help, status, branches)..."
                className="flex-1 bg-transparent text-tva-bone outline-none text-xs font-mono placeholder:text-tva-bone-dim/40"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-tva-amber text-black font-bold uppercase text-[10px] hover:bg-tva-amber-light flex items-center gap-1"
              >
                <span>EXEC</span>
                <CornerDownLeft size={10} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
