import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const INTRO_STORAGE_KEY = 'living-script-intro-seen';

export function hasSeenIntro(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(INTRO_STORAGE_KEY) === '1';
}

export function resetIntroSeen(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(INTRO_STORAGE_KEY);
}

interface IntroAnimationProps {
  onComplete: () => void;
}

const DURATION = 15;
const FADE_OUT_DURATION = 1.2;

// Alfabeto cirillico (uppercase)
const CYRILLIC_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  const hasCalledComplete = useRef(false);

  const handleSkip = () => {
    localStorage.setItem(INTRO_STORAGE_KEY, '1');
    setIsExiting(true);
  };

  const handleComplete = () => {
    localStorage.setItem(INTRO_STORAGE_KEY, '1');
    setIsExiting(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setSkipVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isExiting) {
      const timer = setTimeout(handleComplete, DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [isExiting]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: FADE_OUT_DURATION, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isExiting && !hasCalledComplete.current) {
          hasCalledComplete.current = true;
          onComplete();
        }
      }}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-black"
      data-theme="dark"
    >
      {/* Lettere cirilliche in background – fade + scorrimento */}
      <CyrillicScrollRows />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: skipVisible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-50 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
        aria-label="Salta intro"
      >
        Salta intro
      </motion.button>

      <div className="flex-1 flex items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-6 md:gap-8 z-10 text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-lg md:text-xl lg:text-2xl tracking-tight text-white/85"
            style={{ letterSpacing: '-0.02em' }}
          >
            Dalla penna dei monaci alle corone degli Zar
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-[var(--text-primary)]"
            style={{ letterSpacing: '-0.04em' }}
          >
            Questo è ZИАК – la tua guida nell&apos;alfabeto cirillico
          </motion.span>
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleSkip}
            className="mt-6 h-[48px] px-6 flex items-center justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full uppercase text-xs font-bold tracking-widest hover:bg-[var(--accent-primary)] hover:text-black transition-colors shadow-xl"
            aria-label="Inizia ora"
          >
            INIZIA ORA
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Righe di lettere cirilliche – apparizione con fade, poi scorrimento
function CyrillicScrollRows() {
  const letters = CYRILLIC_ALPHABET.split('');
  const rows = [
    { opacity: 0.1, size: 72, speed: 32, y: '25%', dir: 1 },
    { opacity: 0.14, size: 96, speed: 38, y: '50%', dir: -1 },
    { opacity: 0.08, size: 64, speed: 35, y: '75%', dir: 1 },
  ];
  const scrollDistance = 1100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {rows.map((row, idx) => (
        <motion.div
          key={idx}
          className="absolute left-0 right-0 flex items-center gap-12 md:gap-16 whitespace-nowrap will-change-transform"
          style={{
            top: row.y,
            transform: 'translateY(-50%)',
          }}
          animate={{ x: row.dir > 0 ? [0, -scrollDistance] : [-scrollDistance, 0] }}
          transition={{
            duration: row.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {(letters as string[]).concat(letters, letters, letters, letters).map((char, i) => (
            <span
              key={`${idx}-${i}`}
              className="select-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: `${row.size}px`,
                color: 'transparent',
                WebkitTextStroke: `1px rgba(245,245,245,${row.opacity})`,
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default IntroAnimation;
