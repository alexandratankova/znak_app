import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData } from '../types';
import TraceCanvas from './TraceCanvas';
import { useToast } from '../contexts/ToastContext';

interface HeroLetterProps {
  data: LetterData;
  isTraced: boolean;
  onTraceComplete: (letterId: string) => void;
  onOpenGame: () => void;
  onOpenWordSoul: () => void;
}

const HeroLetter: React.FC<HeroLetterProps> = ({ data, isTraced, onTraceComplete, onOpenGame, onOpenWordSoul }) => {
  const [isTracing, setIsTracing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 400, h: 400 });
  const toast = useToast();

  const speakLetter = () => {
    if (isPlaying || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const letterToSpeak = data.char.toLowerCase();
    const utterance = new SpeechSynthesisUtterance(letterToSpeak);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.75;
    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find((v) => v.lang.startsWith('ru')) || voices.find((v) => v.lang.startsWith('uk'));
    if (ruVoice) utterance.voice = ruVoice;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setIsTracing(false);
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  }, [data.id]);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        w: containerRef.current.clientWidth,
        h: containerRef.current.clientHeight
      });
    }
  }, []);

  const handleTraceComplete = () => {
    setIsTracing(false);
    onTraceComplete(data.id);
    toast.showToast('Corretto! Continua così!', 'success');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      
      {/* --- GRID SYSTEM: TOP BAR --- */}
      <div className="h-auto md:h-16 py-4 md:py-0 border-b border-[var(--border-subtle)] flex flex-row justify-between items-center px-6 md:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Fonetica</span>
          <span className="text-lg font-mono font-medium">{data.phonetic}</span>
        </div>
        <button
          onClick={speakLetter}
          disabled={isPlaying}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all disabled:opacity-50 flex-shrink-0"
          aria-label="Ascolta pronuncia"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* --- MAIN CANVAS AREA --- */}
      <div ref={containerRef} className={`flex-1 relative flex flex-col items-center p-8 ${isTraced ? 'overflow-y-auto justify-start' : 'overflow-hidden justify-center'}`}>
        
        {/* Technical Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-[var(--border-subtle)]"></div>
          <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-[var(--border-subtle)]"></div>
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[var(--border-subtle)]"></div>
        </div>

        {/* Metadata Corners */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <span className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Nome</span>
            <span className="text-xl font-bold">{data.name}</span>
        </div>
        <div className="absolute top-6 right-6 md:top-8 md:right-8 text-right">
             <span className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Glagolitico</span>
             <span className="font-glagolitic text-2xl text-[var(--accent-primary)]">{data.glagolitic}</span>
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right">
            <span className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Anno</span>
            <span className="font-mono text-sm">IX Sec.</span>
        </div>

        {/* --- THE LETTER (Font Based) --- */}
        <div className={`relative z-10 flex items-center justify-center select-none flex-shrink-0 ${isTraced ? 'w-[180px] h-[200px] md:w-[220px] md:h-[240px]' : 'w-[300px] h-[350px] md:w-[400px] md:h-[400px]'}`}>
            
            {/* 1. Base Guide (Text) */}
            <motion.div 
               className={`font-display leading-none ${isTraced ? 'text-[8rem] md:text-[10rem]' : 'text-[15rem] md:text-[20rem]'}`}
               animate={{ color: isTraced ? 'var(--text-primary)' : 'var(--text-muted)' }}
               transition={{ duration: 0.8 }}
            >
              {data.char}
            </motion.div>

            {/* 2. Trace Canvas Overlay */}
            <AnimatePresence>
              {!isTraced && isTracing && (
                <TraceCanvas 
                  width={300} 
                  height={350}
                  onComplete={handleTraceComplete}
                />
              )}
            </AnimatePresence>
        </div>

        {/* Hint durante il ricalco */}
        <AnimatePresence>
          {isTracing && data.wordInAction && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 text-xs text-[var(--text-muted)] text-center max-w-xs z-20"
            >
              Completa il ricalco per scoprire come questa lettera prende vita nella parola
            </motion.p>
          )}
        </AnimatePresence>

        {/* Control Group: Gioca & Traccia Buttons */}
        <div className={`z-40 flex items-center gap-4 flex-shrink-0 ${isTraced ? 'mt-4 relative' : 'absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-8 md:left-8'}`}>
           
           {/* Gioca Button */}
           <button
              onClick={onOpenGame}
              className="h-[48px] px-6 flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-full transition-all shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Gioca</span>
            </button>

           {/* Traccia Button - sempre visibile, disabilitato se già ricalcato */}
           {!isTracing && (
               <button 
                 onClick={() => !isTraced && setIsTracing(true)}
                 disabled={isTraced}
                 className={`h-[48px] px-6 flex items-center justify-center rounded-full uppercase text-xs font-bold tracking-widest transition-colors shadow-xl
                   ${isTraced 
                     ? 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed opacity-70' 
                     : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)]'}`}
               >
                 Traccia
               </button>
           )}
        </div>

        {/* Guida Post-Ricalco: CTA per aprire Il cuore della parola */}
        <AnimatePresence>
          {isTraced && data.wordInAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full border-t border-[var(--border-subtle)] mt-6 pt-6 flex flex-col items-center"
            >
              <p className="text-sm md:text-base text-[var(--text-secondary)] text-center mb-4 max-w-md">
                Ora che hai dominato il segno, scopri come prende vita nella parola.
              </p>
              <button
                onClick={onOpenWordSoul}
                className="h-[48px] px-6 flex items-center justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full uppercase text-xs font-bold tracking-widest hover:bg-[var(--accent-primary)] transition-colors shadow-xl"
              >
                SCOPRI LA PAROLA
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroLetter;