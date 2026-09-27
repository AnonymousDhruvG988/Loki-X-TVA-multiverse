import React from 'react';

/**
 * 29 — MYSTICAL SPARK SYSTEM
 * Lightweight, reusable CSS spark engine.
 * Tiny, short-lived, sparse, purposeful sparks around interactive TVA elements.
 */
export default function SparkSystem({ color = '#7FCF8A', count = 5, active = true }) {
  if (!active) return null;

  const sparkOffsets = [
    { top: '10%', left: '15%', delay: '0s', size: 3 },
    { top: '25%', right: '12%', delay: '0.2s', size: 2.5 },
    { bottom: '20%', left: '20%', delay: '0.4s', size: 3 },
    { bottom: '15%', right: '18%', delay: '0.1s', size: 2 },
    { top: '50%', right: '8%', delay: '0.3s', size: 2.5 },
    { top: '65%', left: '10%', delay: '0.5s', size: 3 },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {sparkOffsets.map((sp, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-ping opacity-75"
          style={{
            ...sp,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            backgroundColor: color,
            animationDuration: '1.2s',
            animationDelay: sp.delay,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
