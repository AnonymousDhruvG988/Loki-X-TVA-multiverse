import React, { useEffect, useRef, useState } from 'react';
import { Activity, Shield, Terminal, RefreshCw, Cpu, CheckCircle } from 'lucide-react';
import { playClickSound, playGlitchSound, playTerminalBeep, playTemporalPulse } from '../utils/soundEffects';

export default function SystemStatus({ onSetCursor }) {
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanLog, setScanLog] = useState('ALL SUBSYSTEMS REPORTING NOMINAL TELEMETRY');
  const [stability, setStability] = useState(98.7);

  // Oscilloscope canvas animation with zero layout-thrashing and viewport pausing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = false;
    let t = 0;
    let w = (canvas.width = canvas.offsetWidth || 300);
    let h = (canvas.height = canvas.offsetHeight || 150);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth || 300;
      h = canvas.height = canvas.offsetHeight || 150;
    };
    window.addEventListener('resize', handleResize);

    const renderWave = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      t += 0.04;
      ctx.clearRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = 'rgba(245, 166, 35, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Fast phosphor waveform (no expensive shadowBlur filter)
      ctx.beginPath();
      ctx.strokeStyle = isScanning ? '#FF3366' : '#538662';
      ctx.lineWidth = 2;

      const amp = isScanning ? 35 : 18;
      for (let x = 0; x < w; x += 2) {
        const y = h / 2 + Math.sin(x * 0.02 + t) * amp + Math.cos(x * 0.05 - t * 0.7) * (amp * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWave);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(renderWave);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isScanning]);

  const handleRunScan = () => {
    if (isScanning) return;
    playGlitchSound();
    setIsScanning(true);
    setScanLog('INITIATING HEAVY TEMPORAL SWEEP ACROSS SECTOR-616...');

    setTimeout(() => {
      playTerminalBeep();
      setScanLog('INTERROGATING LOOM HARMONICS... NO NEXUS DRIFT DETECTED');
    }, 1000);

    setTimeout(() => {
      playTemporalPulse();
      setIsScanning(false);
      setStability(99.1);
      setScanLog('DIAGNOSTIC COMPLETED: SACRED TIMELINE COHERENCY CERTIFIED');
    }, 2400);
  };

  return (
    <section id="status" className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      <div className="p-6 sm:p-8 bg-[#111116] border border-tva-border relative overflow-hidden shadow-2xl">
        
        {/* CRT Scanline */}
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-tva-border/60 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-tva-bone tracking-widest uppercase">
              06 // TVA SYSTEM STATUS MONITOR
            </span>
            <span className="text-[10px] text-tva-bone-dim hidden sm:inline">
              // MAINFRAME SYS-616-NCR
            </span>
          </div>

          <button
            onClick={handleRunScan}
            disabled={isScanning}
            onMouseEnter={() => onSetCursor?.('link')}
            onMouseLeave={() => onSetCursor?.('default')}
            className="flex items-center gap-2 px-3 py-1.5 border border-tva-border hover:border-tva-amber text-xs text-tva-bone-dim hover:text-tva-amber uppercase transition-all"
          >
            <RefreshCw size={12} className={isScanning ? 'animate-spin text-tva-magenta' : ''} />
            <span>{isScanning ? 'SCANNING SPECTRUM...' : 'RUN DIAGNOSTIC SCAN'}</span>
          </button>
        </div>

        {/* Main Content Grid: Waveform & Readouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Oscilloscope Canvas (7 cols) */}
          <div className="lg:col-span-7 border border-tva-border/60 bg-[#0A0A0C] p-4 relative">
            <div className="flex justify-between items-center text-[10px] text-tva-bone-dim mb-2">
              <span>TEMPORAL HARMONIC OSCILLOGRAM</span>
              <span className={isScanning ? 'text-tva-magenta font-bold animate-pulse' : 'text-emerald-400'}>
                {isScanning ? 'ANOMALY TEST IN PROGRESS' : 'CHRONO FREQ: 60.00 Hz'}
              </span>
            </div>
            
            <div className="w-full h-40">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="mt-2 text-[10px] text-tva-bone-dim flex justify-between">
              <span>BANDWIDTH: 1.2 THz</span>
              <span>BUFFER: ZERO LOSS</span>
            </div>
          </div>

          {/* Telemetry Metrics Readouts (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
            
            <div className="p-3 bg-tva-surface border border-tva-border/60">
              <span className="text-[10px] text-tva-bone-dim block">TEMPORAL DATABASE</span>
              <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5 mt-1">
                <CheckCircle size={12} /> ONLINE
              </span>
            </div>

            <div className="p-3 bg-tva-surface border border-tva-border/60">
              <span className="text-[10px] text-tva-bone-dim block">TIMELINE STABILITY</span>
              <span className="text-tva-amber font-bold tracking-wider block mt-1">
                {stability}%
              </span>
            </div>

            <div className="p-3 bg-tva-surface border border-tva-border/60">
              <span className="text-[10px] text-tva-bone-dim block">VARIANT PROCESSING</span>
              <span className="text-tva-bone font-bold tracking-wider block mt-1">
                ACTIVE (428/500)
              </span>
            </div>

            <div className="p-3 bg-tva-surface border border-tva-border/60">
              <span className="text-[10px] text-tva-bone-dim block">SECURITY LEVEL</span>
              <span className="text-tva-magenta font-bold tracking-wider block mt-1">
                LEVEL 5 CLASSIFIED
              </span>
            </div>

            <div className="col-span-2 p-3 bg-tva-surface border border-tva-border/60 font-mono text-[11px] text-tva-bone">
              <span className="text-tva-amber font-bold mr-2">&gt;&gt;</span>
              <span className="text-tva-bone-dim">{scanLog}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
