import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { eventData } from './data/eventData';
import { setSoundEnabled, getSoundEnabled, playTerminalBeep, playGlitchSound } from './utils/soundEffects';
import { globalPointer } from './utils/pointer';

// Cinematic Components
import MovieIntro from './components/MovieIntro';
import TVANav from './components/TVANav';
import TemporalBackground from './components/TemporalBackground';
import Hero from './components/Hero';
import CaseBriefing from './components/CaseBriefing';
import EventDetails from './components/EventDetails';
import TimelineBranches from './components/TimelineBranches';
import MultiverseMap from './components/MultiverseMap';
import InfinityStones from './components/InfinityStones';
import Highlights from './components/Highlights';
import Schedule from './components/Schedule';
import SystemStatus from './components/SystemStatus';
import Personnel from './components/Personnel';
import Registration from './components/Registration';
import TemporalContact from './components/TemporalContact';
import TVATerminalAuth from './components/TVATerminalAuth';
import Epilogue from './components/Epilogue';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import EasterEggs from './components/EasterEggs';
import LokiCinematicCharacter from './components/LokiCinematicCharacter';
import TVAClockAgent from './components/TVAClockAgent';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [soundActive, setSoundActive] = useState(getSoundEnabled()); // Sound ON by default per user request
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isGlitchMode, setIsGlitchMode] = useState(false);
  const [isEpilogueOpen, setIsEpilogueOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  // Decoupled zero-latency cursor updater - zero re-renders of App tree!
  const handleSetCursor = useCallback((state) => {
    globalPointer.setCursorShape(state);
  }, []);

  // Toggle sound
  const handleToggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  // Section 40: Glitch Mode (2-second temporal system instability)
  const triggerGlitchMode = () => {
    if (isGlitchMode) return;
    playGlitchSound();
    setIsGlitchMode(true);
    setTimeout(() => setIsGlitchMode(false), 2200);
  };

  // Keyboard shortcuts: '~' for Terminal, 'g' or 'G' for Glitch Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        playTerminalBeep();
        setIsTerminalOpen((prev) => !prev);
      } else if ((e.key === 'g' || e.key === 'G') && !isTerminalOpen && e.target.tagName !== 'INPUT') {
        triggerGlitchMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, isGlitchMode]);

  const scrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestartTimeline = () => {
    setIsEpilogueOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative min-h-screen bg-[#050706] text-[#E8E2D0] selection:bg-[#7FCF8A] selection:text-black ${
      isGlitchMode ? 'temporal-glitch-mode' : ''
    }`}>
      
      {/* Zero-Latency Custom Desktop Cursor */}
      <CustomCursor />

      {/* Global CRT Scanlines Background Layer */}
      <div className="fixed inset-0 crt-scanlines opacity-25 pointer-events-none z-30" />

      {/* Glitch Mode Instability Alert Banner */}
      {isGlitchMode && (
        <div className="fixed top-16 inset-x-0 z-50 flex justify-center pointer-events-none animate-pulse">
          <div className="px-4 py-1.5 bg-[#FF3366] text-black font-mono font-bold text-xs uppercase tracking-widest border border-white shadow-[0_0_20px_#FF3366]">
            ⚠️ TEMPORAL ANOMALY ACTIVE // SECTION 40 GLITCH MODE
          </div>
        </div>
      )}

      {/* SECTION 06 & 07: CINEMATIC MOVIE TITLE OPENING BOOT SEQUENCE */}
      <AnimatePresence>
        {!introCompleted && (
          <MovieIntro onComplete={() => setIntroCompleted(true)} />
        )}
      </AnimatePresence>

      {/* SECTION 29 & 30: TVA TEMPORAL ACCESS LOGIN / NEW VARIANT SIGNUP MODAL */}
      <TVATerminalAuth
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onSetCursor={handleSetCursor}
      />

      {/* CINEMATIC EPILOGUE (TIMELINE STABILIZATION & POWER-DOWN) */}
      <Epilogue
        isOpen={isEpilogueOpen}
        onRestart={handleRestartTimeline}
        onClose={() => setIsEpilogueOpen(false)}
      />

      {/* Main Living TVA Movie/Website Experience */}
      <div className={`transition-opacity duration-1000 ${introCompleted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Living Ambient Loom Threads & Embers */}
        <TemporalBackground />

        {/* 05 & 06: Living 2.5D Cinematic Loki Character (Present across all stages) */}
        <LokiCinematicCharacter />

        {/* Section 28: Minimal TVA Terminal Header Navigation */}
        <TVANav
          soundEnabled={soundActive}
          onToggleSound={handleToggleSound}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAuth={handleOpenAuth}
          onSetCursor={handleSetCursor}
        />

        {/* MAIN BODY SCENES (Section 20 & 69: Cinematic Scene Flow) */}
        <main className="relative z-10">
          {/* Scene 01: Hero (Poster Composition + 3D The Variant Centerpiece + TVA Clock) */}
          <Hero
            eventData={eventData}
            onSetCursor={handleSetCursor}
            onRegisterClick={scrollToRegistration}
            onTriggerGlitch={triggerGlitchMode}
          />

          {/* Quick-Scan Verified Case Parameters */}
          <EventDetails
            eventData={eventData}
            onSetCursor={handleSetCursor}
          />

          {/* Scene 02: Case File 26229 (TVA Physical Evidence Dossier & Redactions) */}
          <CaseBriefing
            eventData={eventData}
            onSetCursor={handleSetCursor}
          />

          {/* Scene 03: Sacred Timeline & Timeline Collision Tracks */}
          <TimelineBranches
            branches={eventData.branches}
            onSetCursor={handleSetCursor}
          />

          {/* Live Multiverse Map (Temporal Radar) */}
          <MultiverseMap
            onSetCursor={handleSetCursor}
          />

          {/* Scene 04: The Infinity Timeline (Six Primordial Relics Orbiting Singularity) */}
          <InfinityStones
            onSetCursor={handleSetCursor}
          />

          {/* Scene 05: Variant Capabilities (Tactical Amenities & Bounties) */}
          <Highlights
            highlights={eventData.highlights}
            onSetCursor={handleSetCursor}
          />

          {/* Scene 06: Temporal Sequence (36-Hour Chronology) */}
          <Schedule
            schedule={eventData.schedule}
            onSetCursor={handleSetCursor}
          />

          {/* Loom Diagnostics & Oscilloscope Telemetry */}
          <SystemStatus
            onSetCursor={handleSetCursor}
          />

          {/* Authorized Personnel (Patrons, Mentors, Judges) */}
          <Personnel
            personnel={eventData.personnel}
            onSetCursor={handleSetCursor}
          />

          {/* Registration Climax & Variant Pass Generator */}
          <Registration
            eventData={eventData}
            onSetCursor={handleSetCursor}
            onTriggerEpilogue={() => setIsEpilogueOpen(true)}
          />

          {/* Scene 07: Open a Temporal Channel (Communications Hub & Unfolding Strings) */}
          <TemporalContact
            onSetCursor={handleSetCursor}
          />
        </main>

        {/* Bureaucratic Archival Footer (Branch Convergence & Ending Movie Scene) */}
        <Footer onSetCursor={handleSetCursor} />

        {/* Secret Easter Egg TemPad Terminal Modal */}
        <EasterEggs
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onRegisterClick={scrollToRegistration}
          onTriggerGlitch={triggerGlitchMode}
        />

        {/* HOLOGRAPHIC TVA CLOCK AI AGENT ("MISS MINUTES" STYLE TEMPORAL GUIDE) */}
        <TVAClockAgent
          onOpenAuth={handleOpenAuth}
          onTriggerGlitch={triggerGlitchMode}
          onSetCursor={handleSetCursor}
        />
      </div>
    </div>
  );
}
