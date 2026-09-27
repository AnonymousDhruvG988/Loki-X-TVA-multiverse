import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, UserCheck, Cpu, Terminal } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export default function Personnel({ personnel, onSetCursor }) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!personnel || personnel.length === 0) return null;

  return (
    <section id="personnel" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      
      {/* Section Header */}
      <div className="border-b border-tva-border/60 pb-6 mb-12">
        <div className="flex items-center gap-2 text-xs text-tva-amber uppercase tracking-widest mb-2">
          <UserCheck size={16} />
          <span>07 // COMMAND & EVALUATION PROTOCOL</span>
        </div>
        <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
          AUTHORIZED PERSONNEL
        </h2>
        <p className="text-xs sm:text-sm text-tva-bone-dim max-w-2xl mt-2 font-body leading-relaxed">
          Official dossier credentials of the presiding mentors, judges, faculty patrons, and student chapter directors
          sanctioned to oversee the Sacred Timeline Incursion at Bennett University.
        </p>
      </div>

      {/* Featured Vintage TVA Architectural Schematic Card */}
      <div className="mb-10 p-6 bg-[#090D0B] border-2 border-[#7FCF8A]/40 flex flex-col md:flex-row items-center gap-6 shadow-2xl overflow-hidden relative group">
        <div className="w-full md:w-48 h-64 flex-shrink-0 border border-tva-border overflow-hidden bg-black relative rounded-sm">
          <img
            src="/assets/images/loki_blueprint_sketch.png"
            alt="TVA Architectural Schematic of Variant Loki"
            className="w-full h-full object-cover object-top filter contrast-125 brightness-105 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#7FCF8A]">
            TVA SCHEMATIC // #001
          </div>
        </div>
        <div className="space-y-3 font-mono">
          <div className="flex items-center gap-2 text-xs text-[#7FCF8A]">
            <span className="w-2 h-2 rounded-full bg-[#7FCF8A] animate-ping" />
            <span>CLASSIFIED ARCHITECTURAL RECORD // VARIANT FORM</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-tva-bone">
            TEMPORAL ARCHETYPE BLUEPRINT: GOD OF STORIES
          </h3>
          <p className="text-xs text-tva-bone-dim leading-relaxed font-body max-w-xl">
            Recovered from the Citadel at the End of Time. Technical diagram outlining the temporal physiology, scepter conduction resonance, and Horned Crown electromagnetic matrix.
          </p>
          <div className="flex flex-wrap gap-4 text-[10px] text-tva-bone-dim pt-2 border-t border-tva-border/60">
            <div><strong className="text-tva-amber">SECURITY:</strong> EYES ONLY // TIME KEEPERS</div>
            <div><strong className="text-[#7FCF8A]">STATUS:</strong> DECLASSIFIED FOR TRIAL</div>
            <div><strong className="text-tva-bone">LOCATION:</strong> ARCHIVE 01</div>
          </div>
        </div>
      </div>

      {/* Grid of TVA ID Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personnel.map((agent) => {
          const isHovered = hoveredId === agent.id;

          return (
            <motion.div
              key={agent.id}
              onMouseEnter={() => {
                setHoveredId(agent.id);
                onSetCursor?.('link');
                playClickSound();
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                onSetCursor?.('default');
              }}
              whileHover={{ y: -4 }}
              className={`group relative p-6 bg-[#111116] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isHovered
                  ? 'border-tva-amber shadow-amber-md bg-tva-panel'
                  : 'border-tva-border/80 bg-tva-surface/50'
              }`}
            >
              {/* ID Badge Header Barcode */}
              <div>
                <div className="flex items-center justify-between border-b border-tva-border/50 pb-3 mb-4 text-[10px] text-tva-bone-dim">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tva-amber" />
                    <span>TVA-ID // {agent.badgeId}</span>
                  </div>
                  <span className="tracking-widest font-mono text-tva-amber opacity-60 group-hover:opacity-100 transition-opacity">
                    |||| || | || |||
                  </span>
                </div>

                {/* ID Photo Frame & Meta */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar Icon Frame */}
                  <div className="w-14 h-14 rounded border border-tva-amber/40 bg-neutral-900 flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:border-tva-amber transition-colors">
                    <Shield size={24} className="text-tva-amber opacity-80" />
                    <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className={`font-display text-2xl text-tva-bone transition-colors leading-tight ${
                      isHovered ? 'text-tva-amber glitch-text' : ''
                    }`} data-text={agent.name}>
                      {agent.name}
                    </h3>
                    <div className="text-xs text-tva-amber font-semibold mt-0.5">
                      {agent.role}
                    </div>
                    <div className="text-[10px] text-tva-bone-dim mt-0.5">
                      {agent.designation}
                    </div>
                  </div>
                </div>

                {/* Clearance Badge */}
                <div className="my-3 py-1.5 px-2 bg-neutral-950/60 border-l-2 border-tva-amber text-[10px] text-tva-bone flex items-center justify-between">
                  <span>SECURITY CLEARANCE:</span>
                  <span className="text-emerald-400 font-bold">{agent.clearance}</span>
                </div>

                {/* Quote / Mission Directive */}
                <blockquote className="text-xs text-tva-bone-dim italic font-body border-t border-dashed border-tva-border/50 pt-3 my-2 leading-relaxed">
                  "{agent.quote}"
                </blockquote>
              </div>

              {/* Card Footer Specialty */}
              <div className="mt-4 pt-3 border-t border-tva-border/40 flex items-center justify-between text-[10px] text-tva-bone-dim">
                <span className="truncate max-w-[200px]">{agent.specialty}</span>
                <span className="text-tva-amber font-bold">[VERIFIED]</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
