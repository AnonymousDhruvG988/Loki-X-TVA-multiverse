import React, { useRef } from 'react';
import { Download, Shield, Printer, CheckCircle, Sparkles, QrCode } from 'lucide-react';
import { playClickSound, playTerminalBeep } from '../utils/soundEffects';

export default function ClearanceCard({ variantData, onClose, onSetCursor }) {
  const cardRef = useRef(null);

  const handlePrint = () => {
    playTerminalBeep();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 font-mono select-none">
      <div className="relative w-full max-w-xl bg-[#111116] border-2 border-tva-amber p-6 sm:p-8 shadow-amber-lg text-tva-bone">
        
        {/* Top Close & Actions */}
        <div className="flex items-center justify-between border-b border-tva-border pb-3 mb-6 text-xs text-tva-bone-dim">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-tva-amber font-bold">OFFICIAL TVA CLEARANCE DOCUMENT</span>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="hover:text-tva-amber px-2 py-0.5 border border-tva-border hover:border-tva-amber"
          >
            [CLOSE]
          </button>
        </div>

        {/* THE PRINTABLE / SHAREABLE TVA ID PASS */}
        <div
          ref={cardRef}
          className="p-6 bg-[#0E0E14] border-2 border-tva-amber/80 relative overflow-hidden sprocket-border shadow-2xl space-y-6"
        >
          {/* Card Holographic Background Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-tva-amber/5 via-transparent to-tva-cyan/5 pointer-events-none" />
          <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-start justify-between border-b border-tva-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-tva-amber bg-tva-surface flex items-center justify-center">
                <span className="font-display text-xl text-tva-amber font-bold">TVA</span>
              </div>
              <div>
                <span className="text-[10px] text-tva-amber font-bold tracking-widest block uppercase">
                  TIME VARIANCE AUTHORITY
                </span>
                <span className="text-xs text-tva-bone-dim block">
                  BENNETT UNIVERSITY // SECTOR 616-NCR
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="tva-stamp tva-stamp-green text-[9px]">
                AUTHORIZED
              </div>
              <div className="text-xs font-bold text-tva-amber font-mono mt-1">
                {variantData?.variantId || 'L-616-V4091'}
              </div>
            </div>
          </div>

          {/* Middle Body */}
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Left 2 Cols: Credentials */}
            <div className="col-span-2 space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-tva-bone-dim block">VARIANT ALIAS</span>
                <span className="font-display text-2xl text-tva-bone tracking-wide block">
                  {variantData?.name || 'ANONYMOUS VARIANT'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-tva-bone-dim block">ASSIGNED SYNDICATE / TEAM</span>
                <span className="text-tva-amber font-bold">
                  {variantData?.teamName || 'SOLO INCURSION UNIT'}
                </span>
                <span className="text-tva-bone-dim text-[11px] block">
                  {variantData?.university || 'Bennett University'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-tva-bone-dim block">INCURSION VECTOR TRACK</span>
                <span className="text-emerald-400 font-bold text-[11px]">
                  {variantData?.track || 'Earth-616 // Neural Incursion'}
                </span>
              </div>
            </div>

            {/* Right Col: Barcode & Seal */}
            <div className="flex flex-col items-center justify-center p-3 bg-neutral-900 border border-tva-border text-center space-y-2">
              <Shield size={32} className="text-tva-amber opacity-90" />
              <div className="text-[8px] font-mono text-tva-bone-dim tracking-tighter">
                |||| | ||| |||| || |||
                <br />
                {variantData?.variantId || 'L-616-V4091'}
              </div>
              <span className="text-[8px] text-tva-amber font-bold">SEC-VERIFIED</span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="border-t border-dashed border-tva-border/60 pt-3 flex flex-wrap justify-between items-center text-[10px] text-tva-bone-dim gap-2">
            <span>DATES: 18-19 OCT 2026</span>
            <span>FOR ALL TIME. ALWAYS.</span>
            <span className="text-tva-amber font-bold">BENNETT CAMPUS PASS</span>
          </div>
        </div>

        {/* Download & Print Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-tva-bone-dim">
            Present this card during biometric ingestion at Bennett University.
          </span>
          <button
            onClick={handlePrint}
            onMouseEnter={() => onSetCursor?.('link')}
            onMouseLeave={() => onSetCursor?.('default')}
            className="w-full sm:w-auto px-6 py-2.5 bg-tva-amber hover:bg-tva-amber-light text-black font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors shadow-amber-sm"
          >
            <Printer size={14} />
            <span>PRINT / DOWNLOAD PASS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
