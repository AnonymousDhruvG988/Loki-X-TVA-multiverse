import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, FileText, Shield, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { playClickSound, playTerminalBeep, playTemporalPulse } from '../utils/soundEffects';

export default function Highlights({ highlights, onSetCursor }) {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleArtifactClick = (item) => {
    playTemporalPulse();
    setSelectedArtifact(item);
  };

  return (
    <section id="archives" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono select-none">
      
      {/* SECTION HEADER: TVA ARCHIVE (Section 22) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border/60 pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <Archive size={16} />
            <span>SCENE 05 // TIME VARIANCE AUTHORITY ARCHIVES</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            TVA ARCHIVES
          </h2>
          <p className="text-xs sm:text-sm text-tva-bone-dim max-w-2xl mt-1 font-body leading-relaxed">
            Physical case records and classified operational artifacts preserved in the Sacred Timeline archives. Inspect files to declassify bounties, amenities, and security protocols.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-tva-bone-dim bg-[#080B09] px-3.5 py-1.5 border border-tva-border/60">
          <FileText size={14} className="text-[#F5A623]" />
          <span>RECORDS: <strong className="text-tva-bone">LEVEL 5 RESTRICTED</strong></span>
        </div>
      </div>

      {/* 23 — PHYSICAL ARTIFACT DOSSIER CARDS (Grid of 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              onClick={() => handleArtifactClick(item)}
              onMouseEnter={() => {
                setHoveredIndex(index);
                onSetCursor?.('link');
                playClickSound();
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                onSetCursor?.('default');
              }}
              whileHover={{ y: -6 }}
              className={`group relative p-6 bg-[#090D0B] border transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden sprocket-border ${
                isHovered
                  ? 'border-tva-amber shadow-[0_0_25px_rgba(245,166,35,0.3)] bg-[#0E1310]'
                  : 'border-tva-border/70 hover:border-tva-bone-dim'
              }`}
            >
              {/* Internal Subtle Scanline & Paper Noise */}
              <div className="absolute inset-0 tva-noise opacity-30 pointer-events-none" />

              {/* Physical Border Corner Brackets */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-tva-amber/40 group-hover:border-tva-amber transition-colors" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-tva-amber/40 group-hover:border-tva-amber transition-colors" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-tva-amber/40 group-hover:border-tva-amber transition-colors" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-tva-amber/40 group-hover:border-tva-amber transition-colors" />

              {/* Dossier Header */}
              <div>
                <div className="flex items-center justify-between border-b border-tva-border/50 pb-3 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F5A623] font-bold">
                      TVA / ARTIFACT 0{index + 1}
                    </span>
                    <span className="text-[10px] text-tva-bone-dim tracking-wider uppercase">
                      // {item.badge}
                    </span>
                  </div>
                  <span className="tva-stamp tva-stamp-amber text-[9px]">
                    {item.stamp || 'VERIFIED'}
                  </span>
                </div>

                {/* Artifact Title */}
                <h3
                  className={`font-display text-2xl sm:text-3xl text-tva-bone transition-colors mb-3 uppercase tracking-wide ${
                    isHovered ? 'text-[#F5A623] glitch-text' : ''
                  }`}
                  data-text={item.title}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-tva-bone-dim font-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hidden Fictional Metadata revealed on hover (Section 32) */}
              <div className={`mt-4 pt-3 border-t border-tva-border/40 text-[10px] transition-all duration-300 ${
                isHovered ? 'opacity-100 text-[#7FCF8A]' : 'opacity-40 text-tva-bone-dim'
              }`}>
                <div className="flex justify-between items-center">
                  <span>TIMELINE ID: 616-NCR</span>
                  <span>TEMPORAL DEVIATION: 0.04%</span>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-3 pt-2 border-t border-dashed border-tva-border/40 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-tva-bone-dim">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-pulse" />
                  <span>STATUS: {item.status || 'STABLE'}</span>
                </div>
                <span className="text-[#F5A623] font-bold uppercase group-hover:translate-x-1 transition-transform">
                  [ ACCESS FILE &rarr; ]
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CLASSIFIED ARTIFACT INSPECTION MODAL */}
      <AnimatePresence>
        {selectedArtifact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-lg p-6 sm:p-8 bg-[#090D0B] border-2 border-[#F5A623] text-tva-bone font-mono shadow-[0_0_40px_rgba(245,166,35,0.3)] sprocket-border"
            >
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedArtifact(null);
                }}
                className="absolute top-4 right-4 p-1.5 text-tva-bone-dim hover:text-[#F5A623] border border-tva-border hover:border-[#F5A623]"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#F5A623] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping" />
                <span>OFFICIAL TVA ARTIFACT DOSSIER</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl uppercase text-tva-bone">
                {selectedArtifact.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-tva-bone-dim my-3">
                <span className="tva-stamp tva-stamp-green text-[9px]">CLASSIFIED LEVEL 5</span>
                <span>STATUS: <strong className="text-[#7FCF8A]">{selectedArtifact.status}</strong></span>
              </div>

              <div className="space-y-3 text-xs border-y border-tva-border py-4 my-4 font-body leading-relaxed text-tva-bone-dim">
                <div>
                  <strong className="font-mono text-tva-bone">ARCHIVE SUMMARY:</strong>{' '}
                  {selectedArtifact.description}
                </div>
                <div>
                  <strong className="font-mono text-tva-bone">OPERATIONAL VENUE:</strong>{' '}
                  Bennett University Campus, Greater Noida, Delhi-NCR
                </div>
                <div>
                  <strong className="font-mono text-tva-bone">FIELD VERIFICATION:</strong>{' '}
                  Authorized under GeeksForGeeks Student Chapter // Sector 616-NCR
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-tva-bone-dim font-mono">TVA ARCHIVES // FOR ALL TIME. ALWAYS.</span>
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedArtifact(null);
                  }}
                  className="px-4 py-2 bg-[#F5A623] text-black font-bold font-mono text-xs uppercase hover:bg-[#FFB52E]"
                >
                  RE-SEAL FILE &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
