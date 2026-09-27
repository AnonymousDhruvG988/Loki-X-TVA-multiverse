import React from 'react';
import { Calendar, Clock, MapPin, Award, Users, ShieldCheck } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export default function EventDetails({ eventData, onSetCursor }) {
  const cards = [
    {
      label: 'TEMPORAL SCHEDULE',
      value: eventData.details.date,
      subValue: eventData.details.duration,
      icon: <Calendar className="text-tva-amber" size={20} />,
      stamp: 'OFFICIAL DATE',
      stampColor: 'tva-stamp-amber',
      barcode: '|||| | ||| || ||| |',
    },
    {
      label: 'NEXUS COORDINATES',
      value: 'BENNETT UNIVERSITY',
      subValue: eventData.details.venue,
      icon: <MapPin className="text-tva-orange" size={20} />,
      stamp: 'SECTOR-616',
      stampColor: 'tva-stamp-green',
      barcode: '|| |||| | || ||| ||',
    },
    {
      label: 'BOUNTY ALLOCATION',
      value: '₹1,50,000+',
      subValue: 'Grants, Protocol Bounties & TVA Gear',
      icon: <Award className="text-tva-amber" size={20} />,
      stamp: 'BOUNTY SECURED',
      stampColor: 'tva-stamp-amber',
      barcode: '||| || | |||| || |',
    },
    {
      label: 'SYNDICATE CLEARANCE',
      value: eventData.details.teamSize,
      subValue: eventData.details.registrationStatus,
      icon: <Users className="text-emerald-400" size={20} />,
      stamp: 'OPEN TO ALL',
      stampColor: 'tva-stamp-green',
      barcode: '| ||| || |||| | ||',
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-8 max-w-7xl mx-auto z-10 font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            onMouseEnter={() => {
              onSetCursor?.('link');
              playClickSound();
            }}
            onMouseLeave={() => onSetCursor?.('default')}
            className="group relative p-6 bg-[#111116] border border-tva-border/70 hover:border-tva-amber bg-tva-surface/40 hover:bg-tva-panel transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-amber-sm"
          >
            {/* Top Barcode and Stamp */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] tracking-widest text-tva-bone-dim font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                {c.barcode}
              </span>
              <span className={`tva-stamp ${c.stampColor} text-[8px]`}>
                {c.stamp}
              </span>
            </div>

            {/* Icon & Label */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-tva-bone-dim">
                {c.icon}
                <span className="tracking-wider">{c.label}</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl text-tva-bone group-hover:text-tva-amber transition-colors tracking-wide">
                {c.value}
              </div>
              <div className="text-xs text-tva-bone-dim/90 font-mono">
                {c.subValue}
              </div>
            </div>

            {/* Bottom Archival Sprocket Accent */}
            <div className="mt-6 pt-3 border-t border-dashed border-tva-border/50 flex items-center justify-between text-[9px] text-tva-bone-dim">
              <span>INDEX: 0{i + 1}</span>
              <span>VERIFIED SEC-616</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
