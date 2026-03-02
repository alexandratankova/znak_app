import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ALPHABET_DATA } from './constants';
import Navigation from './components/Navigation';
import HeroLetter from './components/HeroLetter';
import HistoryIdentity from './components/HistoryIdentity';
import InkGame from './components/InkGame';
import WordSoulModal from './components/WordSoulModal';
import IntroAnimation, { hasSeenIntro, resetIntroSeen } from './components/IntroAnimation';
import CreditsFooter from './components/CreditsFooter';
import InfoPage from './components/InfoPage';
import ExpandableHistoryDrawer from './components/ExpandableHistoryDrawer';
import AuthModal from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';
import { useUserProgress } from './hooks/useUserProgress';

const THEME_STORAGE_KEY = 'znak-theme';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isWordSoulOpen, setIsWordSoulOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [localTracedLetterIds, setLocalTracedLetterIds] = useState<Set<string>>(() => new Set());

  const { user, signIn, signUp, signOut } = useAuth();
  const { tracedLetterIds: remoteTracedIds, addTracedLetter } = useUserProgress(user?.id);

  const tracedLetterIds = user ? remoteTracedIds : localTracedLetterIds;
  const handleTraceComplete = useCallback(
    (letterId: string) => {
      if (user) {
        addTracedLetter(letterId);
      } else {
        setLocalTracedLetterIds((prev) => new Set(prev).add(letterId));
      }
    },
    [user, addTracedLetter]
  );

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
  const isLetterTraced = tracedLetterIds.has(currentLetter.id);

  return (
    <>
      {/* Skip link – primo elemento focusabile per tastiera (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-[100] -translate-y-32 rounded bg-[var(--accent-primary)] px-4 py-2 text-sm font-bold text-black opacity-0 transition-transform focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
      >
        Salta al contenuto principale
      </a>

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
        className="h-screen w-screen bg-[var(--bg-primary)] flex flex-col overflow-hidden text-[var(--text-primary)] font-sans selection:bg-[var(--accent-primary)] selection:text-white"
        style={{ pointerEvents: showIntro ? 'none' : 'auto' }}
      >
        {/* Contenuto principale: Nav + Workspace (flex-1, gap costante sopra il footer) */}
        <main id="main-content" className="flex-1 flex flex-col md:flex-row min-h-0" tabIndex={-1} aria-label="Contenuto principale">
          <h1 className="sr-only">ZИАК - La tua guida nell&apos;alfabeto cirillico</h1>
          <Navigation
            onRewatchIntro={handleRewatchIntro}
            letters={ALPHABET_DATA}
            currentIndex={currentLetterIndex}
            onSelect={setCurrentLetterIndex}
            theme={theme}
            onThemeToggle={toggleTheme}
          />

          <div className="flex-1 flex flex-col md:flex-row relative md:ml-[120px] lg:ml-[160px] min-h-0 overflow-hidden">
            <div className="w-full h-[80dvh] md:flex-none md:w-3/5 md:h-full border-b md:border-b-0 md:border-r border-[var(--border-subtle)] relative">
              <HeroLetter
                data={currentLetter}
                isTraced={isLetterTraced}
                onTraceComplete={handleTraceComplete}
                onOpenGame={() => setIsGameOpen(true)}
                onOpenWordSoul={() => setIsWordSoulOpen(true)}
              />
            </div>

            <div className="hidden md:block md:w-2/5 h-full bg-[var(--bg-secondary)] overflow-hidden">
              <HistoryIdentity data={currentLetter} />
            </div>

            <ExpandableHistoryDrawer data={currentLetter} />
          </div>
        </main>

        {/* Footer Credits + Account — in flow, gap costante dall'area interattiva */}
        <CreditsFooter
          onOpen={() => setIsInfoOpen(true)}
        />

        <InfoPage isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSignIn={signIn}
        onSignUp={signUp}
      />
    </motion.div>
    </>
  );
};

export default App;