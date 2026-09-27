import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, X } from 'lucide-react';
import { playStoneResonance, playClickSound, playGlitchSound } from '../utils/soundEffects';

const STONES = [
  {
    id: 'space',
    name: 'SPACE STONE',
    alias: 'THE TESSERACT',
    image: '/assets/images/stone_space.png',
    color: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.45)',
    border: 'border-[#00F0FF]',
    vector: 'SPATIAL TOPOLOGY',
    authority: 'DIMENSIONAL WORMHOLE',
    status: 'STABILIZED',
    deviation: '0.002%',
    desc: 'Manipulates space, teleportation vectors, and dimensional gateways. Unlocks instant cross-timeline data synchronization.',
    artifactSpecs: 'Cubic lattice encapsulation // Zero-point energy output',
  },
  {
    id: 'mind',
    name: 'MIND STONE',
    alias: 'THE SCEPTER CORE',
    image: '/assets/images/stone_mind.png',
    color: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.45)',
    border: 'border-[#FFD700]',
    vector: 'SYNTHETIC CONSCIOUSNESS',
    authority: 'NEURAL REASONING',
    status: 'ACTIVE TRANSMISSION',
    deviation: '0.006%',
    desc: 'Empowers high-order LLMs, agentic autonomous swarms, and synthetic intelligence. Accelerates algorithmic breakthrough.',
    artifactSpecs: 'Psionic frequency resonator // High-density logic core',
  },
  {
    id: 'reality',
    name: 'REALITY STONE',
    alias: 'THE AETHER',
    image: '/assets/images/stone_reality.png',
    color: '#FF3366',
    glow: 'rgba(255, 51, 102, 0.45)',
    border: 'border-[#FF3366]',
    vector: 'PHYSICAL TRANSMUTATION',
    authority: 'ONTOLOGICAL FLUX',
    status: 'CRITICAL FLUX',
    deviation: '0.014%',
    desc: 'Transforms physical laws, renders virtual worlds into reality, and dissolves boundary between code and matter.',
    artifactSpecs: 'Dark matter fluid state // Matter-to-energy inverter',
  },
  {
    id: 'power',
    name: 'POWER STONE',
    alias: 'THE COSMIC ORB',
    image: '/assets/images/stone_power.png',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.45)',
    border: 'border-[#A855F7]',
    vector: 'UNBOUNDED KINETIC POTENTIAL',
    authority: 'LOOM ENERGIZER',
    status: 'CONTAINED',
    deviation: '0.001%',
    desc: 'Supplies unlimited computational throughput. Powers the monumental TVA loom mechanisms and supercomputing clusters.',
    artifactSpecs: 'Subatomic singularity shell // 1.21 PetaWatts continuous',
  },
  {
    id: 'time',
    name: 'TIME STONE',
    alias: 'EYE OF AGAMOTTO',
    image: '/assets/images/stone_time.png',
    color: '#7FCF8A',
    glow: 'rgba(127, 207, 138, 0.45)',
    border: 'border-[#7FCF8A]',
    vector: 'TEMPORAL CHRONOLOGY',
    authority: 'SACRED TIMELINE',
    status: 'SACRED / STABLE',
    deviation: '0.000%',
    desc: 'Governs time dilation, causality manipulation, branch surveillance, and temporal rewinds. Heart of the Time Variance Authority.',
    artifactSpecs: 'Mystic Kamar-Taj chronometer // Infinite looping capability',
  },
  {
    id: 'soul',
    name: 'SOUL STONE',
    alias: 'THE VORMIR KEY',
    image: '/assets/images/stone_soul.png',
    color: '#FF7700',
    glow: 'rgba(255, 119, 0, 0.45)',
    border: 'border-[#FF7700]',
    vector: 'SENTIENT ESSENCE',
    authority: 'VARIANT IDENTITY',
    status: 'RESONATING',
    deviation: '0.003%',
    desc: 'Validates authentic developer identity, ethical engineering, and passion. Binds the Variant code signature to the universe.',
    artifactSpecs: 'Altar resonance substrate // Sentient memory archive',
  },
];

export default function InfinityStones({ onSetCursor }) {
  const [activeStone, setActiveStone] = useState(null);
  const [selectedStone, setSelectedStone] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [multiverseRipple, setMultiverseRipple] = useState(false);

  const handleStoneHover = (stone) => {
    setActiveStone(stone);
    playStoneResonance(stone.id);
    onSetCursor?.('timeline-node');
  };

  const handleStoneLeave = () => {
    setActiveStone(null);
    onSetCursor?.('default');
  };

  const handleStoneClick = (stone) => {
    playStoneResonance(stone.id);
    setSelectedStone(stone);

    // Easter egg: Section 48 "Repeated interaction causes a tiny multiverse pulse"
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        playGlitchSound();
        setMultiverseRipple(true);
        setTimeout(() => setMultiverseRipple(false), 1400);
        return 0;
      }
      return next;
    });
  };

  return (
    <section id="artifacts" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono select-none">
      
      {/* Easter Egg Multiverse Shockwave Ripple */}
      {multiverseRipple && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border-4 border-[#7FCF8A] animate-ping opacity-80" />
          <div className="absolute top-1/2 -translate-y-1/2 bg-[#080B09]/95 border-2 border-[#7FCF8A] text-[#7FCF8A] px-6 py-2 text-xs font-bold tracking-widest uppercase shadow-[0_0_30px_#7FCF8A]">
            ⚠️ MULTIVERSE SINGULARITY PULSE TRIGGERED
          </div>
        </div>
      )}

      {/* SCENE HEADER (SCENE 04 — INFINITY TIMELINE) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border/60 pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A] uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>SCENE 04 // THE INFINITY TIMELINE</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            TEMPORAL ARTIFACTS
          </h2>
          <div className="text-xs text-tva-bone-dim mt-1 font-body max-w-xl">
            Six primordial singularities discovered drifting in the void of unpruned realities. In the TVA they are paperweights; in the multiverse, they anchor infinite power.
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-tva-bone-dim bg-[#080B09] px-3 py-1.5 border border-tva-border/60">
          <Orbit size={14} className="text-[#F5A623] animate-spin-slow" />
          <span>ORBITAL EQUILIBRIUM: <strong className="text-[#7FCF8A]">LOCKED</strong></span>
        </div>
      </div>

      {/* CENTRAL 6-ARTIFACTS ROTATING MULTIVERSE SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {STONES.map((stone, index) => {
          const isHovered = activeStone?.id === stone.id;

          return (
            <motion.div
              key={stone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              onClick={() => handleStoneClick(stone)}
              onMouseEnter={() => handleStoneHover(stone)}
              onMouseLeave={handleStoneLeave}
              className={`group relative p-6 bg-[#080B09]/90 border transition-all duration-300 cursor-pointer overflow-hidden ${
                isHovered
                  ? `${stone.border} shadow-2xl -translate-y-1.5`
                  : 'border-tva-border/70 hover:border-tva-bone-dim'
              }`}
              style={{
                boxShadow: isHovered ? `0 0 35px ${stone.glow}` : 'none',
              }}
            >
              {/* Internal Subtle Glowing Energy Background */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${stone.color} 0%, transparent 70%)`,
                }}
              />

              {/* Top Case Tag */}
              <div className="flex items-center justify-between text-[10px] text-tva-bone-dim border-b border-tva-border/50 pb-3 mb-4">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: stone.color }}
                  />
                  <span>ARTIFACT #{index + 1}</span>
                </span>
                <span className="font-bold tracking-wider" style={{ color: stone.color }}>
                  {stone.status}
                </span>
              </div>

              {/* Physical Floating Gem Icon & Energy Field */}
              <div className="relative py-6 flex items-center justify-center">
                
                {/* Floating Orbit Rings */}
                <div
                  className={`absolute w-24 h-24 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
                    isHovered ? 'scale-125 rotate-90 opacity-80' : 'scale-100 rotate-0 opacity-30'
                  }`}
                  style={{ borderColor: stone.color }}
                />

                {/* Second Counter-Rotating Ring */}
                <div
                  className={`absolute w-32 h-32 rounded-full border border-dotted transition-all duration-700 pointer-events-none ${
                    isHovered ? 'scale-110 -rotate-90 opacity-60' : 'scale-90 rotate-0 opacity-20'
                  }`}
                  style={{ borderColor: stone.color }}
                />

                {/* The Physical Stone Core Gem (Authentic Cosmic Artifact Image) */}
                <div
                  className={`relative z-10 transition-transform duration-500 ease-out flex items-center justify-center ${
                    isHovered ? 'scale-115 -translate-y-2' : 'scale-100'
                  }`}
                >
                  {/* Volumetric Internal Gem Glow */}
                  <div
                    className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-500 ${
                      isHovered ? 'opacity-90 scale-125' : 'opacity-40 scale-90'
                    }`}
                    style={{ backgroundColor: stone.color }}
                  />

                  {/* High-Resolution Cropped Gemstone Artifact */}
                  <div
                    className="relative w-40 h-28 rounded-xl overflow-hidden shadow-2xl transition-all duration-500"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 24px ${stone.color}) brightness(1.2)`
                        : `drop-shadow(0 0 12px ${stone.color})`,
                    }}
                  >
                    <img
                      src={stone.image}
                      alt={stone.name}
                      className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Stone Title & Authority */}
              <div className="text-center mt-2">
                <div className="text-[10px] text-tva-bone-dim tracking-widest uppercase">
                  {stone.alias}
                </div>
                <h3
                  className="font-display text-2xl tracking-wide uppercase transition-colors"
                  style={{ color: isHovered ? stone.color : '#E8E2D0' }}
                >
                  {stone.name}
                </h3>
                <div className="text-[11px] font-bold text-tva-bone-dim mt-0.5">
                  AUTHORITY: <span className="text-tva-bone">{stone.authority}</span>
                </div>
              </div>

              {/* Description & Fictional Field Intel */}
              <p className="text-xs text-tva-bone-dim font-body mt-3 line-clamp-2 leading-relaxed text-center">
                {stone.desc}
              </p>

              {/* Card Footer Interaction CTA */}
              <div className="mt-5 pt-3 border-t border-tva-border/50 flex items-center justify-between text-[10px]">
                <span className="text-tva-bone-dim">DEVIATION: {stone.deviation}</span>
                <span
                  className="font-bold flex items-center gap-1 uppercase transition-transform group-hover:translate-x-1"
                  style={{ color: stone.color }}
                >
                  <span>INSPECT ARTIFACT</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CLASSIFIED ARTIFACT INSPECTION MODAL */}
      <AnimatePresence>
        {selectedStone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg p-6 bg-[#090D0B] border-2 text-tva-bone font-mono shadow-2xl"
              style={{
                borderColor: selectedStone.color,
                boxShadow: `0 0 45px ${selectedStone.glow}`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedStone(null);
                }}
                className="absolute top-4 right-4 p-1.5 text-tva-bone-dim hover:text-tva-bone border border-tva-border hover:border-tva-amber"
              >
                <X size={16} />
              </button>

              {/* Dossier Header */}
              <div className="flex items-center gap-2 text-xs uppercase mb-3" style={{ color: selectedStone.color }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedStone.color }} />
                <span>TVA ARTIFACT DOSSIER // LEVEL 5 CONFIDENTIAL</span>
              </div>

              <h3 className="font-display text-4xl uppercase text-tva-bone">
                {selectedStone.name}
              </h3>
              <div className="text-xs text-tva-bone-dim mb-4">
                ALIAS: <span className="text-tva-bone font-bold">{selectedStone.alias}</span>
              </div>

              {/* Stone Visual Preview in Modal */}
              <div className="w-full h-32 rounded-lg overflow-hidden bg-black/60 border border-tva-border flex items-center justify-center p-2 mb-4 relative">
                <div
                  className="absolute inset-0 opacity-40 blur-lg"
                  style={{ backgroundColor: selectedStone.color }}
                />
                <img
                  src={selectedStone.image}
                  alt={selectedStone.name}
                  className="relative z-10 max-h-full object-contain filter drop-shadow-[0_0_15px_currentColor]"
                  style={{ color: selectedStone.color }}
                />
              </div>

              {/* Detailed Specs Table */}
              <div className="space-y-3 text-xs border-y border-tva-border py-4 my-4 font-body leading-relaxed">
                <div>
                  <strong className="font-mono text-tva-bone">CORE POWER VECTOR:</strong>{' '}
                  <span className="text-tva-bone-dim">{selectedStone.vector}</span>
                </div>
                <div>
                  <strong className="font-mono text-tva-bone">TEMPORAL AUTHORITY:</strong>{' '}
                  <span className="font-mono" style={{ color: selectedStone.color }}>{selectedStone.authority}</span>
                </div>
                <div>
                  <strong className="font-mono text-tva-bone">SYSTEM INTEGRATION:</strong>{' '}
                  <span className="text-tva-bone-dim">{selectedStone.desc}</span>
                </div>
                <div>
                  <strong className="font-mono text-tva-bone">PHYSICAL SPECS:</strong>{' '}
                  <span className="text-tva-bone-dim font-mono">{selectedStone.artifactSpecs}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-tva-bone-dim font-mono">STATUS: {selectedStone.status}</span>
                <button
                  onClick={() => {
                    playStoneResonance(selectedStone.id);
                    setSelectedStone(null);
                  }}
                  className="px-4 py-2 text-black font-bold font-mono text-xs uppercase hover:opacity-90"
                  style={{ backgroundColor: selectedStone.color }}
                >
                  RE-SEAL IN VAULT &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
