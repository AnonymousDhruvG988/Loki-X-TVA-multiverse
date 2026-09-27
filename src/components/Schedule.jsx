import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { playClickSound, playTerminalBeep } from '../utils/soundEffects';

export default function Schedule({ schedule, onSetCursor }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activeDay = schedule[selectedDayIndex] || schedule[0];

  const handleDaySelect = (index) => {
    playTerminalBeep();
    setSelectedDayIndex(index);
  };

  return (
    <section id="schedule" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-tva-border/60 pb-6 mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-tva-amber uppercase tracking-widest mb-2">
            <Clock size={16} />
            <span>05 // MISSION CHRONOLOGY</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-tva-bone tracking-wide uppercase">
            TEMPORAL SEQUENCE
          </h2>
        </div>

        {/* Day Switcher Buttons */}
        <div className="flex items-center gap-2">
          {schedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => handleDaySelect(idx)}
              onMouseEnter={() => onSetCursor?.('link')}
              onMouseLeave={() => onSetCursor?.('default')}
              className={`px-4 py-2 text-xs tracking-wider border font-mono uppercase transition-all ${
                selectedDayIndex === idx
                  ? 'border-tva-amber bg-tva-amber text-black font-bold shadow-amber-sm'
                  : 'border-tva-border text-tva-bone-dim hover:text-tva-bone hover:border-tva-border-amber bg-tva-surface/50'
              }`}
            >
              DAY 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Active Day Title & Overview */}
      <div className="mb-8 p-4 bg-tva-surface border border-tva-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-tva-amber" />
          <span className="text-sm font-bold text-tva-bone uppercase tracking-wider">
            {activeDay.day}
          </span>
          <span className="text-xs text-tva-amber hidden sm:inline">
            // {activeDay.title}
          </span>
        </div>
        <span className="text-xs text-tva-bone-dim">ZONE: BENNETT-CAMPUS</span>
      </div>

      {/* CINEMATIC VERTICAL TIMELINE */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-tva-amber before:via-tva-orange before:to-tva-border">
        {activeDay.events.map((evt, i) => {
          const isLive = evt.status === 'LIVE' || evt.status === 'CRITICAL' || evt.status === 'CLIMAX';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-10 top-3 w-5 h-5 rounded-full border-2 bg-[#0A0A0C] flex items-center justify-center -translate-x-1/2 transition-transform duration-200 group-hover:scale-125 ${
                  isLive
                    ? 'border-tva-amber shadow-[0_0_12px_#F5A623]'
                    : 'border-tva-border group-hover:border-tva-amber'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isLive ? 'bg-tva-amber animate-ping' : 'bg-tva-bone-dim group-hover:bg-tva-amber'
                  }`}
                />
              </div>

              {/* Event Content Card */}
              <div className="p-5 sm:p-6 bg-[#111116] border border-tva-border/70 group-hover:border-tva-amber transition-all duration-300 relative shadow-md">
                
                {/* Header Time & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-tva-border/50 pb-2.5 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-tva-amber font-mono font-bold text-sm tracking-wider">
                      {evt.time}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-neutral-900 border border-tva-border text-tva-bone-dim">
                      {evt.type}
                    </span>
                  </div>

                  <span
                    className={`tva-stamp text-[9px] ${
                      isLive ? 'tva-stamp-red' : 'tva-stamp-amber'
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-display text-2xl sm:text-3xl text-tva-bone group-hover:text-tva-amber transition-colors mb-2">
                  {evt.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-tva-amber/80 mb-2 font-mono">
                  <MapPin size={12} />
                  <span>{evt.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-tva-bone-dim font-body leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
