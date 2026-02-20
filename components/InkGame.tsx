import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LetterData, GameState } from '../types';
import { useToast } from '../contexts/ToastContext';

interface InkGameProps {
  letters: LetterData[];
  onClose: () => void;
}

const INK_GAME_TITLE_ID = 'ink-game-dialog-title';

const InkGame: React.FC<InkGameProps> = ({ letters, onClose }) => {
  const toast = useToast();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [targetLetter, setTargetLetter] = useState<LetterData | null>(null);
  const [options, setOptions] = useState<LetterData[]>([]);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [wrongSelectedId, setWrongSelectedId] = useState<string | null>(null);
  
  // Initialize Round
  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!targetLetter) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        prevFocus?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      prevFocus?.focus();
    };
  }, [onClose, targetLetter]);

  const startNewRound = () => {
    const randomIdx = Math.floor(Math.random() * letters.length);
    const target = letters[randomIdx];
    
    // Create options (Target + 2 random distractors)
    const otherLetters = letters.filter(l => l.id !== target.id);
    const distractors = otherLetters.sort(() => 0.5 - Math.random()).slice(0, 2);
    const shuffledOptions = [target, ...distractors].sort(() => 0.5 - Math.random());

    setTargetLetter(target);
    setOptions(shuffledOptions);
    setGameState('playing');
    setWrongSelectedId(null);
  };

  const handleOptionClick = (selected: LetterData) => {
    if (gameState !== 'playing') return;

    if (selected.id === targetLetter?.id) {
      setGameState('success');
      setWrongSelectedId(null);
      toast.showToast('Corretto! Continua così!', 'success');
      setTimeout(startNewRound, 2000);
    } else {
      setWrongSelectedId(selected.id);
      setGameState('error');
      toast.showToast('Riprova', 'error');
      setTimeout(() => {
        setGameState('playing');
        setWrongSelectedId(null);
      }, 800);
    }
  };

  if (!targetLetter) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={INK_GAME_TITLE_ID}
        className="w-full max-w-4xl p-6 md:p-12 relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl"
      >
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-12 border-b-2 border-[var(--accent-primary)] pb-4">
           <h2 id={INK_GAME_TITLE_ID} className="font-black text-xl md:text-2xl uppercase tracking-tighter text-[var(--text-primary)]">
             The Ink Game
           </h2>
           <button 
             ref={closeRef}
             onClick={onClose}
             className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all"
             aria-label="Chiudi The Ink Game"
           >
             <span aria-hidden="true">✕</span>
           </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs mb-8">
            Abbina il suono alla forma
          </p>
          
          <div className="mb-16">
            <p className="font-display text-5xl md:text-6xl italic text-[var(--text-primary)] leading-tight">
              "{targetLetter.soundDescription}"
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8" role="group" aria-label="Scegli la lettera corrispondente al suono">
            {options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Scegli lettera ${option.char} (${option.name})`}
                className={`
                  aspect-square flex items-center justify-center
                  border-2 text-6xl md:text-8xl font-display
                  transition-all duration-300
                  ${gameState === 'success' && option.id === targetLetter.id 
                    ? 'bg-[var(--feedback-success)] text-[var(--feedback-success-fg)] border-[var(--feedback-success)]'
                    : gameState === 'error' && option.id === wrongSelectedId 
                      ? 'bg-[var(--feedback-error)]/20 border-2 border-[var(--feedback-error)]' 
                      : 'bg-transparent border-[var(--border-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)]'}
                `}
              >
                {option.char}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InkGame;