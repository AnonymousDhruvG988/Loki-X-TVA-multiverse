// TVA Centralized Web Audio API Synthesizer
// 100% self-contained, zero external network requests, zero broken audio files, instant response.

let audioCtx = null;
let isAudioEnabled = true; // Sound ON by default per user request!
let ambientOsc = null;
let ambientGain = null;
let clockTickInterval = null;
let lastHoverTime = 0;

// Initialize sound preference from localStorage, default to true
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("tva_variant_sound");
  if (saved !== null) {
    isAudioEnabled = saved === "true";
  } else {
    isAudioEnabled = true;
    try {
      localStorage.setItem("tva_variant_sound", "true");
    } catch {}
  }
}

export function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  isAudioEnabled = enabled;
  try {
    localStorage.setItem("tva_variant_sound", String(enabled));
  } catch {}

  if (enabled) {
    getAudioContext();
    startAmbientAudio();
  } else {
    stopAmbientAudio();
  }
}

export function getSoundEnabled() {
  return isAudioEnabled;
}

// Global user interaction listener to unlock AudioContext if browser policy held it suspended
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    if (isAudioEnabled) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      startAmbientAudio();
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
  window.addEventListener("click", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);
}

// 10 — AMBIENT AUDIO: Subconscious TVA drone + low temporal hum + faint clock tick
export function startAmbientAudio() {
  if (!isAudioEnabled || ambientOsc) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Sub-bass drone (48Hz) with lowpass filter
    ambientOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    ambientGain = ctx.createGain();

    ambientOsc.type = "sine";
    ambientOsc.frequency.setValueAtTime(52, ctx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(140, ctx.currentTime);

    // Very quiet ambient level (subconscious)
    ambientGain.gain.setValueAtTime(0.018, ctx.currentTime);

    ambientOsc.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOsc.start();

    // Occasional subtle clock tick every 1.5s
    if (!clockTickInterval) {
      clockTickInterval = setInterval(() => {
        if (!isAudioEnabled) return;
        playClockTick(true);
      }, 1500);
    }
  } catch {
    // Graceful fallback
  }
}

export function stopAmbientAudio() {
  try {
    if (ambientGain && audioCtx) {
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
    }
    setTimeout(() => {
      if (ambientOsc) {
        try { ambientOsc.stop(); } catch {}
        ambientOsc = null;
      }
      ambientGain = null;
    }, 350);

    if (clockTickInterval) {
      clearInterval(clockTickInterval);
      clockTickInterval = null;
    }
  } catch {}
}

// 11 — SOUND INTERACTIONS WITH COOLDOWN TO PREVENT SPAM

// Hover tick: tiny electronic tick (max once every 55ms)
export function playHoverTick() {
  if (!isAudioEnabled) return;
  const now = performance.now();
  if (now - lastHoverTime < 55) return;
  lastHoverTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  } catch {}
}

// TVA Button Click: Short confirmation pulse
export function playClickSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(960, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {}
}

// Clock mechanical tick
export function playClockTick(subtle = false) {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(subtle ? 1400 : 2200, ctx.currentTime);

    gain.gain.setValueAtTime(subtle ? 0.008 : 0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.015);
  } catch {}
}

// Temporal energy pulse
export function playTemporalPulse() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.28);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(350, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.28);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.32);
  } catch {}
}

// TVA Terminal Beep
export function playTerminalBeep() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, ctx.currentTime);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch {}
}

// Major Scene Transition Whoosh
export function playTransitionWhoosh() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.45;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.2);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.45);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.45);
  } catch {}
}

// 25 — INFINITY STONE ARTIFACT RESONANCE
// Unique harmonic tones for each of the six stones
export function playStoneResonance(stoneType = "time") {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const frequencies = {
      space: [440, 660, 880],       // Blue: Open fifth
      mind: [523.25, 659.25, 1046.5], // Yellow: Bright major triad
      reality: [311.13, 466.16, 622.25], // Red: Eerie augmented
      power: [220, 329.63, 440, 880], // Purple: Heavy powerful octaves
      time: [392, 587.33, 783.99, 1174.66], // Green: Temporal crystalline fifths
      soul: [349.23, 440, 523.25, 698.46],  // Orange: Soulful warm major
    };

    const notes = frequencies[stoneType.toLowerCase()] || frequencies.time;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.05 / notes.length, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.6);
    });
  } catch {}
}

// 08 — CINEMATIC BOOT SEQUENCE SOUNDS
export function playBootStageSound(stage) {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (stage === "point") {
      // Tiny pulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } else if (stage === "timeline") {
      // Soft energy crackle
      playTemporalPulse();
    } else if (stage === "clock") {
      // Mechanical tick
      playClockTick(false);
    } else if (stage === "scan") {
      // Scanner sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(1800, now + 0.35);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.38);
    } else if (stage === "reveal") {
      // Deep impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.5);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.5);
    } else if (stage === "alert") {
      // Short TVA alert
      playTerminalBeep();
    } else if (stage === "title") {
      // Cinematic impact
      playAccessGrantedSound();
    }
  } catch {}
}

// TVA Access Granted / Clearance Confirmation
export function playAccessGrantedSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.07, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });
  } catch {}
}

// Contact communication channel pulse
export function playContactPulse() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(750, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
}

// Temporal Glitch Noise Burst
export function playGlitchSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.Q.setValueAtTime(5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.12);
  } catch {}
}

// Cinematic "Entering New Universe" Sound (Deep Sub-Bass Sweep + Dimensional Portal Resonance)
export function playEnteringUniverseSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Sub-bass dimensional drop (from 180Hz down to 42Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 1.2);
    subGain.gain.setValueAtTime(0.18, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.6);

    // 2. Multiverse harmonic triad chord (D, A, F, C)
    const freqs = [146.83, 220.0, 349.23, 523.25, 698.46];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(f, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04 / (i + 1), now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    });

    // 3. Cosmic Shimmer / Whoosh
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(800, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(3200, now + 0.6);
    noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 1.5);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.09, now + 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.5);
  } catch {}
}

// Branch stabilization hum (when branch is hovered in Contact section)
export function playBranchLockSound() {
  if (!isAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {}
}


