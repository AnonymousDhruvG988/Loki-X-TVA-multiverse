import React, { useRef, useEffect, useState } from 'react';
import { AlertTriangle, Radio } from 'lucide-react';
import { playHoverTick, playClickSound, playTemporalPulse } from '../utils/soundEffects';

/**
 * AtomicResonanceWidget
 * High-performance 3D atomic orbital simulation mimicking quantum electron shells
 * with continuous multi-axial 3D precession, glowing orbital rings, traveling electrons,
 * and TVA chronometer reticles.
 */
export default function AtomicResonanceWidget() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [frequency, setFrequency] = useState(44.8);
  const [entropy, setEntropy] = useState(0.0038);
  const [isPulseActive, setIsPulseActive] = useState(false);

  const isHoveredRef = useRef(false);
  const mouseTiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pulseRef = useRef({ active: false, radius: 0, maxRadius: 110, alpha: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 224;
    let height = 224;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 224;
      height = rect.height || 224;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    resize();
    window.addEventListener('resize', resize);

    // 5 Distinct Atomic Orbital Shells with Faster Kinetic Precession & Speed
    const orbits = [
      {
        color: '#7FCF8A',
        glowColor: 'rgba(127, 207, 138, 0.95)',
        major: 84,
        minor: 42,
        rx: 1.1, ry: 0.4, rz: 0.6,
        drx: 0.016, dry: 0.022, drz: 0.014,
        electronAngle: 0,
        electronSpeed: 0.072,
        electronSize: 3.5,
        trail: []
      },
      {
        color: '#F5A623',
        glowColor: 'rgba(245, 166, 35, 0.95)',
        major: 80,
        minor: 34,
        rx: 0.5, ry: 1.3, rz: -0.8,
        drx: -0.018, dry: 0.015, drz: 0.019,
        electronAngle: Math.PI * 0.7,
        electronSpeed: -0.065,
        electronSize: 3.2,
        trail: []
      },
      {
        color: '#34D399',
        glowColor: 'rgba(52, 211, 153, 0.95)',
        major: 90,
        minor: 48,
        rx: -0.8, ry: 0.7, rz: 1.2,
        drx: 0.015, dry: -0.018, drz: 0.021,
        electronAngle: Math.PI * 1.3,
        electronSpeed: 0.058,
        electronSize: 3.8,
        trail: []
      },
      {
        color: '#E5A93C',
        glowColor: 'rgba(229, 169, 60, 0.9)',
        major: 72,
        minor: 28,
        rx: 1.4, ry: -0.9, rz: -0.3,
        drx: -0.014, dry: -0.020, drz: 0.017,
        electronAngle: Math.PI * 0.2,
        electronSpeed: 0.085,
        electronSize: 2.8,
        trail: []
      },
      {
        color: '#00F0FF',
        glowColor: 'rgba(0, 240, 255, 0.95)',
        major: 76,
        minor: 38,
        rx: -0.3, ry: -1.2, rz: 0.9,
        drx: 0.022, dry: 0.014, drz: -0.019,
        electronAngle: Math.PI * 1.8,
        electronSpeed: -0.068,
        electronSize: 3.0,
        trail: []
      }
    ];

    let radarAngle = 0;
    let corePulse = 0;
    let time = 0;

    // 3D rotation & projection math
    const project = (x, y, z, rx, ry, rz, cx, cy, tiltX, tiltY) => {
      // 1. Local orbit Euler rotation
      // Rot around X
      let y1 = y * Math.cos(rx) - z * Math.sin(rx);
      let z1 = y * Math.sin(rx) + z * Math.cos(rx);
      // Rot around Y
      let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      // Rot around Z
      let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      let z3 = z2;

      // 2. Parallax mouse tilt
      let y4 = y3 * Math.cos(tiltX) - z3 * Math.sin(tiltX);
      let z4 = y3 * Math.sin(tiltX) + z3 * Math.cos(tiltX);
      let x5 = x3 * Math.cos(tiltY) + z4 * Math.sin(tiltY);
      let z5 = -x3 * Math.sin(tiltY) + z4 * Math.cos(tiltY);

      // 3. Perspective divide
      const fov = 320;
      const scale = fov / (fov + z5);
      return {
        x: cx + x5 * scale,
        y: cy + y4 * scale,
        z: z5,
        scale
      };
    };

    const render = () => {
      time += 0.016;
      radarAngle += 0.006;
      corePulse += 0.04;

      // Smooth mouse tilt lerp
      const tilt = mouseTiltRef.current;
      tilt.x += (tilt.targetX - tilt.x) * 0.08;
      tilt.y += (tilt.targetY - tilt.y) * 0.08;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // -------------------------------------------------------------
      // 1. BACKGROUND TVA RADAR / CHRONOMETER RETICLE
      // -------------------------------------------------------------
      ctx.save();
      ctx.lineWidth = 1;

      // Outer dashed circle
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.strokeStyle = '#245C46';
      ctx.setLineDash([4, 6]);
      ctx.globalAlpha = 0.35;
      ctx.stroke();

      // Middle calibration circle with angle ticks
      ctx.beginPath();
      ctx.arc(cx, cy, 76, 0, Math.PI * 2);
      ctx.strokeStyle = '#7FCF8A';
      ctx.setLineDash([8, 4]);
      ctx.globalAlpha = 0.45;
      ctx.stroke();

      // Inner faint reference circle
      ctx.beginPath();
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.strokeStyle = '#F5A623';
      ctx.setLineDash([3, 5]);
      ctx.globalAlpha = 0.3;
      ctx.stroke();

      // Rotating Radar Sweeper Line (very faint)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(radarAngle) * 95, cy + Math.sin(radarAngle) * 95);
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.25)';
      ctx.setLineDash([]);
      ctx.stroke();

      // Cardinal tick marks
      ctx.strokeStyle = 'rgba(127, 207, 138, 0.5)';
      const tickRadii = [93, 97];
      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * tickRadii[0], cy + Math.sin(ang) * tickRadii[0]);
        ctx.lineTo(cx + Math.cos(ang) * tickRadii[1], cy + Math.sin(ang) * tickRadii[1]);
        ctx.stroke();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. EXPANDING QUANTUM PULSE SHOCKWAVE (if active)
      // -------------------------------------------------------------
      const pulse = pulseRef.current;
      if (pulse.active) {
        pulse.radius += 2.2;
        pulse.alpha = Math.max(0, 1 - pulse.radius / pulse.maxRadius);
        if (pulse.radius >= pulse.maxRadius) {
          pulse.active = false;
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(127, 207, 138, ${pulse.alpha * 0.9})`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#7FCF8A';
          ctx.stroke();
          ctx.restore();
        }
      }

      // -------------------------------------------------------------
      // 3. 3D ATOMIC ORBITAL RINGS & MOVING ELECTRONS
      // -------------------------------------------------------------
      const speedMult = isHoveredRef.current ? 1.6 : 1.0;

      orbits.forEach((orbit) => {
        // Continuous 3D Precession (organic random drift of orbital planes)
        orbit.rx += orbit.drx * speedMult;
        orbit.ry += orbit.dry * speedMult;
        orbit.rz += orbit.drz * speedMult;

        // Advance electron angle along orbital perimeter
        orbit.electronAngle += orbit.electronSpeed * speedMult;

        // Sample points along ellipse in 3D
        const stepCount = 64;
        const projectedPoints = [];

        for (let i = 0; i <= stepCount; i++) {
          const theta = (i / stepCount) * Math.PI * 2;
          const ex = Math.cos(theta) * orbit.major;
          const ey = Math.sin(theta) * orbit.minor;
          const p = project(ex, ey, 0, orbit.rx, orbit.ry, orbit.rz, cx, cy, tilt.x, tilt.y);
          projectedPoints.push(p);
        }

        // Draw 3D projected orbital ellipse
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(projectedPoints[0].x, projectedPoints[0].y);
        for (let i = 1; i < projectedPoints.length; i++) {
          ctx.lineTo(projectedPoints[i].x, projectedPoints[i].y);
        }
        ctx.closePath();

        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.75;
        ctx.shadowBlur = isHoveredRef.current ? 16 : 8;
        ctx.shadowColor = orbit.glowColor;
        ctx.stroke();
        ctx.restore();

        // Calculate current electron 3D position
        const eeX = Math.cos(orbit.electronAngle) * orbit.major;
        const eeY = Math.sin(orbit.electronAngle) * orbit.minor;
        const elPos = project(eeX, eeY, 0, orbit.rx, orbit.ry, orbit.rz, cx, cy, tilt.x, tilt.y);

        // Update phosphor trail
        orbit.trail.unshift({ x: elPos.x, y: elPos.y, z: elPos.z });
        if (orbit.trail.length > 12) orbit.trail.pop();

        // Draw trail
        for (let t = 1; t < orbit.trail.length; t++) {
          const tp = orbit.trail[t];
          const trailAlpha = (1 - t / orbit.trail.length) * 0.45;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, Math.max(1, orbit.electronSize * (1 - t / orbit.trail.length)), 0, Math.PI * 2);
          ctx.fillStyle = orbit.color;
          ctx.globalAlpha = trailAlpha;
          ctx.fill();
        }

        // Draw glowing electron bead
        ctx.save();
        ctx.beginPath();
        const beadRadius = Math.max(1.8, orbit.electronSize * elPos.scale);
        ctx.arc(elPos.x, elPos.y, beadRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 14;
        ctx.shadowColor = orbit.glowColor;
        ctx.fill();

        // Electron outer halo
        ctx.beginPath();
        ctx.arc(elPos.x, elPos.y, beadRadius * 1.9, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.restore();
      });

      // -------------------------------------------------------------
      // 4. CENTRAL TEMPORAL SINGULARITY NUCLEUS
      // -------------------------------------------------------------
      ctx.save();
      const coreR = 18 + Math.sin(corePulse) * 2.5;

      // Outer radial aura
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR * 1.8);
      grad.addColorStop(0, 'rgba(127, 207, 138, 0.45)');
      grad.addColorStop(0.5, 'rgba(36, 92, 70, 0.3)');
      grad.addColorStop(1, 'rgba(9, 13, 11, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Solid central core disc
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#090D0B';
      ctx.strokeStyle = '#7FCF8A';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#7FCF8A';
      ctx.stroke();
      ctx.fill();

      ctx.stroke();
      ctx.fill();

      // Pulsing central atom nucleus spark
      ctx.beginPath();
      const sparkR = 3.5 + Math.sin(corePulse * 2) * 1.2;
      ctx.arc(cx, cy, sparkR, 0, Math.PI * 2);
      ctx.fillStyle = '#A8E6A3';
      ctx.fill();
      ctx.restore();
      ctx.restore();

      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Handle cursor 3D parallax tilt
  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseTiltRef.current.targetY = normX * 0.4;
    mouseTiltRef.current.targetX = -normY * 0.4;
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    mouseTiltRef.current.targetX = 0;
    mouseTiltRef.current.targetY = 0;
    setFrequency(44.8);
    setEntropy(0.0038);
  };

  const handlePointerEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
    playHoverTick();
    setFrequency(72.4);
    setEntropy(0.0019);
  };

  const handleTriggerPulse = () => {
    playClickSound();
    playTemporalPulse();
    pulseRef.current = { active: true, radius: 10, maxRadius: 110, alpha: 1 };
    setIsPulseActive(true);
    setTimeout(() => setIsPulseActive(false), 500);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleTriggerPulse}
      className="p-6 bg-[#090D0B] border border-tva-border relative overflow-hidden flex flex-col items-center justify-center cursor-crosshair group select-none transition-colors duration-300 hover:border-[#7FCF8A]/60 shadow-lg"
    >
      {/* Background ambient CRT scanlines & grid */}
      <div className="absolute inset-0 crt-scanlines opacity-10 pointer-events-none" />
      <div className="absolute top-2 left-2 text-[9px] font-mono text-tva-bone-dim/40 pointer-events-none">
        REF: SYS-RUTHERFORD-BOHR // 616
      </div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-tva-amber/70 pointer-events-none flex items-center gap-1">
        <Radio size={10} className={isHovered ? 'animate-pulse text-[#7FCF8A]' : ''} />
        {isHovered ? 'EXCITED' : 'STABLE'}
      </div>

      {/* HEADER STATUS */}
      <div className="w-full flex items-center justify-between text-xs text-tva-bone-dim mb-2 z-10">
        <span className="flex items-center gap-1.5 text-[#7FCF8A] font-mono tracking-wider font-bold">
          <AlertTriangle size={14} className={isHovered ? 'animate-bounce' : ''} /> ANOMALY RESONANCE
        </span>
        <span className="text-[11px] font-mono transition-colors duration-300 text-tva-amber font-semibold">
          {frequency.toFixed(1)} Hz // {isHovered ? 'QUANTUM LOCK' : 'HARMONIC'}
        </span>
      </div>

      {/* 2-COLUMN SCI-FI COCKPIT: LEFT FUTURISTIC TERMINAL SCRIPT + RIGHT FAST 3D ATOM */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full items-center my-1 z-10">
        {/* LEFT: FUTURISTIC LIVE STREAMING TERMINAL SCRIPT */}
        <div className="md:col-span-5 p-3 bg-[#050706] border border-tva-border/70 font-mono text-[9px] text-[#7FCF8A] leading-relaxed space-y-1 relative overflow-hidden rounded-sm shadow-inner">
          <div className="flex items-center justify-between border-b border-tva-border/40 pb-1 mb-1 text-[8px] text-tva-bone-dim">
            <span className="text-tva-amber font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7FCF8A] animate-ping" />
              TVA TELEMETRY CORE
            </span>
            <span className="text-[#00F0FF] animate-pulse">0x616_LIVE</span>
          </div>

          <div className="space-y-0.5">
            <div className="text-tva-bone-dim">&gt; INIT_ATOM_ORBITALS() ... <span className="text-[#7FCF8A]">OK</span></div>
            <div>&gt; CHRONO_SPIN: <span className="text-tva-amber font-bold">+8.42 rad/s</span></div>
            <div>&gt; SHELL_FLUX: <span className="text-[#00F0FF]">1.21 GW</span></div>
            <div>&gt; SYMMETRY: <span className="text-[#34D399]">99.98% HARMONIC</span></div>
            <div>&gt; PARADOX_DAMPING: <span className="text-tva-amber">80% LOCK</span></div>
            <div className="text-[8px] text-tva-bone-dim/70 truncate">&gt; VECTOR: [x:{frequency.toFixed(1)}, y:{entropy.toFixed(4)}]</div>
            <div className="text-tva-amber flex items-center gap-1">
              <span>&gt; STREAM: {isHovered ? 'ACCELERATED' : 'NOMINAL'}</span>
              <span className="w-1.5 h-2.5 bg-[#7FCF8A] animate-pulse inline-block" />
            </div>
          </div>

          {/* Equalizer Waveform Bars */}
          <div className="flex items-end gap-0.5 h-3.5 pt-1 border-t border-tva-border/30">
            {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#7FCF8A]/80 transition-all duration-150 rounded-t-xs"
                style={{
                  height: `${isHovered ? Math.min(100, h * 1.25) : h * 0.75}%`,
                  opacity: 0.6 + (i % 3) * 0.15
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: FAST 3D ATOMIC ORBITAL CANVAS */}
        <div className="md:col-span-7 relative w-full h-52 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ width: '224px', height: '208px' }}
          />

          {/* Hover Hint Overlay */}
          <div className="absolute bottom-0 text-[8px] font-mono text-tva-bone-dim/50 tracking-widest uppercase pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            [CLICK TO PULSE SINGULARITY]
          </div>
        </div>
      </div>

      {/* FOOTER METRIC READOUT */}
      <div className="mt-3 text-center font-mono text-[11px] tracking-wider transition-colors duration-300 text-[#7FCF8A] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#7FCF8A] inline-block animate-ping" />
        QUANTUM ENTROPY: {entropy.toFixed(4)} ζ // {isHovered ? 'RESONANCE STABILIZED' : 'STABILIZATION ACTIVE'}
      </div>
    </div>
  );
}
