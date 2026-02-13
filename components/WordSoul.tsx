import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData } from '../types';

interface WordSoulProps {
  data: LetterData;
}

const WordSoul: React.FC<WordSoulProps> = ({ data }) => {
  const wordData = data.wordInAction;
  const [slots, setSlots] = useState<string[]>([]);
  const [tiles, setTiles] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const initGame = useCallback(() => {
    if (!wordData) return;
    const target = wordData.phonetic.toLowerCase();
    const targetChars = target.split('');
    const distractorChars = ['x', 'q', 'w', 'k', 'p'].filter((c) => !target.includes(c));
    const distractorCount = Math.min(3, distractorChars.length);
    const allTiles = [...targetChars, ...distractorChars.slice(0, distractorCount)];
    setSlots(new Array(targetChars.length).fill(''));
    setTiles(allTiles.sort(() => Math.random() - 0.5));
    setIsSolved(false);
    setShowWrong(false);
  }, [wordData]);

  React.useEffect(() => {
    initGame();
  }, [initGame, data.id]);

  const handleTileClick = (tile: string, tileIndex: number) => {
    const firstEmpty = slots.findIndex((s) => s === '');
    if (firstEmpty === -1) return;
    const newSlots = [...slots];
    newSlots[firstEmpty] = tile;
    const newTiles = tiles.filter((_, i) => i !== tileIndex);
    setSlots(newSlots);
    setTiles(newTiles);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (slots[slotIndex] === '') return;
    const char = slots[slotIndex];
    const newSlots = [...slots];
    newSlots[slotIndex] = '';
    setSlots(newSlots);
    setTiles([...tiles, char]);
  };

  React.useEffect(() => {
    if (!wordData || isSolved) return;
    const target = wordData.phonetic.toLowerCase().trim();
    if (slots.length !== target.length || !slots.every((s) => s !== '')) {
      setShowWrong(false);
      return;
    }
    const guess = slots.join('').toLowerCase().trim();
    if (guess === target) {
      setShowWrong(false);
      setIsSolved(true);
    } else {
      setShowWrong(true);
      const t = setTimeout(() => setShowWrong(false), 1200);
      return () => clearTimeout(t);
    }
  }, [slots, isSolved, wordData]);

  const speakWord = () => {
    if (!wordData || isSpeaking || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordData.word.toLowerCase());
    utterance.lang = 'ru-RU';
    utterance.rate = 0.7;
    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find((v) => v.lang.startsWith('ru')) || voices.find((v) => v.lang.startsWith('uk'));
    if (ruVoice) utterance.voice = ruVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  if (!wordData) return null;

  const studiedChar = data.char.toLowerCase();
  const wordLetters = wordData.word.split('');

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      {/* Parola esplosa – tipografia monumentale */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {wordLetters.map((letter, i) => (
          <span
            key={i}
            className={`font-display text-4xl md:text-6xl lg:text-7xl leading-none transition-colors ${
              letter.toLowerCase() === studiedChar
                ? 'font-bold text-[var(--accent-primary)]'
                : 'font-light text-[var(--text-muted)]'
            }`}
          >
            {letter}
          </span>
        ))}
      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">
        The Decipher
      </span>

      {/* Caselle trascrizione */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {slots.map((char, i) => (
          <button
            key={i}
            onClick={() => handleSlotClick(i)}
            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] font-mono text-lg hover:border-[var(--accent-primary)] transition-colors"
          >
            {char || '_'}
          </button>
        ))}
      </div>

      {/* Tiles trascinabili (click) */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tiles.map((tile, i) => (
          <button
            key={`${tile}-${i}`}
            onClick={() => handleTileClick(tile, i)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
          >
            {tile}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showWrong ? (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-sm font-bold text-[var(--feedback-error)] tracking-wide">
              Riprova
            </p>
          </motion.div>
        ) : isSolved ? (
          <motion.div
            key="solved"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-sm font-bold text-[var(--feedback-success)] tracking-wide mb-3">
              Corretto! Continua così!
            </p>
            <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              {wordData.meaning}
            </p>
            <button
              onClick={speakWord}
              disabled={isSpeaking}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors disabled:opacity-50"
              aria-label="Ascolta parola"
            >
              {isSpeaking ? (
                <span className="text-sm font-bold uppercase">...</span>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-sm font-bold uppercase">Ascolta</span>
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[var(--text-muted)]"
          >
            Trascrivi la parola in caratteri latini
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordSoul;
