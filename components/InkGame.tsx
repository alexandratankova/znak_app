import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData, GameState } from '../types';

interface InkGameProps {
  letters: LetterData[];
  onClose: () => void;
}

const InkGame: React.FC<InkGameProps> = ({ letters, onClose }) => {
  const [targetLetter, setTargetLetter] = useState<LetterData | null>(null);
  const [options, setOptions] = useState<LetterData[]>([]);
  const [gameState, setGameState] = useState<GameState>('playing');
  
  // Initialize Round
  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  };

  const handleOptionClick = (selected: LetterData) => {
    if (gameState !== 'playing') return;

    if (selected.id === targetLetter?.id) {
      setGameState('success');
      setTimeout(startNewRound, 2000);
    } else {
      setGameState('error');
      setTimeout(() => setGameState('playing'), 800);
    }
  };

  if (!targetLetter) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-xl"
    >
      <div className="w-full max-w-4xl p-6 md:p-12 relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-12 border-b-2 border-[var(--accent-primary)] pb-4">
           <h2 className="font-black text-xl md:text-2xl uppercase tracking-tighter text-[var(--text-primary)]">
             The Ink Game
           </h2>
           <button 
             onClick={onClose}
             className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all"
             aria-label="Chiudi"
           >
             ✕
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

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  aspect-square flex items-center justify-center
                  border-2 text-6xl md:text-8xl font-display
                  transition-all duration-300
                  ${gameState === 'success' && option.id === targetLetter.id 
                    ? 'bg-[var(--accent-secondary)] text-[var(--bg-primary)] border-[var(--accent-secondary)]'
                    : gameState === 'error' && option.id !== targetLetter.id 
                      ? 'opacity-20 border-transparent' 
                      : 'bg-transparent border-[var(--border-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)]'}
                `}
              >
                {option.char}
              </motion.button>
            ))}
          </div>

          <div className="h-16 mt-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {gameState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[var(--accent-secondary)] text-[var(--bg-primary)] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider"
                >
                  Corretto
                </motion.div>
              )}
              {gameState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[var(--accent-primary)] font-bold uppercase tracking-widest text-xs"
                >
                  Riprova
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InkGame;