import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData } from '../types';
import { useToast } from '../contexts/ToastContext';

interface WordSoulModalProps {
  data: LetterData;
  onClose: () => void;
}

const WORD_SOUL_TITLE_ID = 'word-soul-dialog-title';

const WordSoulModal: React.FC<WordSoulModalProps> = ({ data, onClose }) => {
  const wordData = data.wordInAction;
  const toast = useToast();
  const closeRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    initGame();
  }, [initGame, data.id]);

  useEffect(() => {
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
  }, [onClose]);

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

  useEffect(() => {
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
      toast.showToast('Corretto! Continua così!', 'success');
    } else {
      setShowWrong(true);
      toast.showToast('Riprova', 'error');
      const t = setTimeout(() => setShowWrong(false), 1200);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- toast.showToast is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps -- toast.showToast is stable
  }, [slots, isSolved, wordData]);

  const speakWord = () => {
    if (!wordData || isSpeaking || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const lang = wordData.lang || 'ru-RU';
    const utterance = new SpeechSynthesisUtterance(wordData.word.toLowerCase());
    utterance.lang = lang;
    utterance.rate = 0.7;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(lang.split('-')[0])) 
      || voices.find((v) => v.lang.startsWith('ru')) 
      || voices.find((v) => v.lang.startsWith('uk'));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  if (!wordData) return null;

  const studiedChar = data.char.toLowerCase();
  const wordLetters = wordData.word.split('');
  const introPhrase = wordData.introPhrase || data.soundDescription;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-xl"
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={WORD_SOUL_TITLE_ID}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full max-w-4xl p-6 md:p-12 relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl"
      >
        {/* Header Bar – identico a Ink Game */}
        <div className="flex justify-between items-center mb-10 md:mb-12 border-b-2 border-[var(--accent-primary)] pb-4">
          <h2 id={WORD_SOUL_TITLE_ID} className="font-black text-xl md:text-2xl uppercase tracking-tighter text-[var(--text-primary)]">
            Il cuore della parola
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all"
            aria-label="Chiudi Il cuore della parola"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          {/* Frase poetica introduttiva */}
          <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs mb-6">
            {introPhrase}
          </p>

          {/* Parola cirillica monumentale */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {wordLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`font-display text-5xl md:text-7xl lg:text-8xl leading-none transition-colors ${
                  letter.toLowerCase() === studiedChar
                    ? 'font-bold text-[var(--accent-primary)]'
                    : 'font-light text-[var(--text-primary)]'
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
            Decifra – trascrivi la parola in caratteri latini
          </span>

          {/* Caselle trascrizione (slots) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
            {slots.map((char, i) => (
              <motion.button
                key={i}
                onClick={() => handleSlotClick(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] font-mono text-lg hover:border-[var(--accent-primary)] transition-colors bg-[var(--bg-elevated)]"
              >
                {char || '_'}
              </motion.button>
            ))}
          </div>

          {/* Tiles trascinabili (click) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {tiles.map((tile, i) => (
              <motion.button
                key={`${tile}-${i}`}
                onClick={() => handleTileClick(tile, i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors cursor-grab active:cursor-grabbing"
              >
                {tile}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {isSolved ? (
              <motion.div
                key="solved"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Traduzione */}
                <p className="text-2xl md:text-4xl font-bold text-[var(--text-primary)]">
                  {wordData.meaning}
                </p>

                {/* Spunto culturale */}
                {wordData.explanation && (
                  <div className="max-w-2xl mx-auto px-4 py-4 border-l-2 border-[var(--accent-primary)] bg-[var(--bg-elevated)]/50 text-left">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-2">
                      Spunto culturale
                    </span>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed italic">
                      {wordData.explanation}
                    </p>
                  </div>
                )}

                {/* Pulsante Audio – stesso stile di Gioca, centrato */}
                <div className="w-full flex justify-center">
                  <button
                    onClick={speakWord}
                    disabled={isSpeaking}
                    className="h-[48px] px-6 flex items-center justify-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Ascolta pronuncia"
                  >
                    {isSpeaking ? (
                      <span>...</span>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 8.5a6.5 6.5 0 0 1 13 0c0 4.5-2.5 8-5 10-1.5 1.5-3.5 2.5-5.5 2.5a5.5 5.5 0 0 1-5.5-5.5V8.5" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span>Ascolta la parola</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : !showWrong ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[var(--text-muted)]"
              >
                Clicca sulle lettere per comporle negli spazi e completare la trascrizione fonetica
              </motion.p>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WordSoulModal;
