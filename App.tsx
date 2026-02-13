import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ALPHABET_DATA } from './constants';
import Navigation from './components/Navigation';
import HeroLetter from './components/HeroLetter';
import HistoryIdentity from './components/HistoryIdentity';
import InkGame from './components/InkGame';
import WordSoulModal from './components/WordSoulModal';
import IntroAnimation, { hasSeenIntro, resetIntroSeen } from './components/IntroAnimation';

const THEME_STORAGE_KEY = 'znak-theme';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isWordSoulOpen, setIsWordSoulOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(THEME_STORAGE_KEY) as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleIntroComplete = () => setShowIntro(false);
  const handleRewatchIntro = () => {
    resetIntroSeen();
    setShowIntro(true);
  };

  const currentLetter = ALPHABET_DATA[currentLetterIndex];

  return (
    <>
      {/* Introduzione animata – solo al primo accesso */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* App principale – fade-in fluido dopo l'intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen w-screen bg-[var(--bg-primary)] flex flex-col md:flex-row overflow-hidden text-[var(--text-primary)] font-sans selection:bg-[var(--accent-primary)] selection:text-white"
        style={{ pointerEvents: showIntro ? 'none' : 'auto' }}
      >
        {/* 1. Navigation Sidebar */}
        <Navigation 
        onRewatchIntro={handleRewatchIntro}
        letters={ALPHABET_DATA}
        currentIndex={currentLetterIndex}
        onSelect={setCurrentLetterIndex}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row h-full relative md:ml-[120px] lg:ml-[160px]">
        
        {/* Left/Top: Hero Interaction Area */}
        <div className="w-full md:w-3/5 h-[55vh] md:h-full border-b md:border-b-0 md:border-r border-[var(--border-subtle)] relative">
          <HeroLetter 
            data={currentLetter} 
            onOpenGame={() => setIsGameOpen(true)}
            onOpenWordSoul={() => setIsWordSoulOpen(true)}
          />
        </div>

        {/* Right/Bottom: Narrative & History */}
        <div className="w-full md:w-2/5 h-[45vh] md:h-full bg-[var(--bg-secondary)] overflow-hidden">
          <HistoryIdentity data={currentLetter} />
        </div>
      </div>

      <AnimatePresence>
        {isGameOpen && (
          <InkGame 
            key="ink-game"
            letters={ALPHABET_DATA} 
            onClose={() => setIsGameOpen(false)} 
          />
        )}
        {isWordSoulOpen && currentLetter.wordInAction && (
          <WordSoulModal
            key="word-soul"
            data={currentLetter}
            onClose={() => setIsWordSoulOpen(false)}
          />
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
};

export default App;