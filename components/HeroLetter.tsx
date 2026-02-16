import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
  const [justCompletedTrace, setJustCompletedTrace] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 400, h: 400 });
  const [soundIconTop, setSoundIconTop] = useState<number | null>(null);
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
    setJustCompletedTrace(false);
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  }, [data.id]);

  useLayoutEffect(() => {
    if (!isPlaying || !letterRef.current) return;
    const rect = letterRef.current.getBoundingClientRect();
    const gap = 32;
    const iconHeight = 32;
    setSoundIconTop(rect.top - gap - iconHeight);
  }, [isPlaying]);

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
    setJustCompletedTrace(true);
    onTraceComplete(data.id);
    toast.showToast('Ottimo lavoro! Ora scopri la parola.', 'success');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      
      {/* --- GRID SYSTEM: TOP BAR --- */}
      <div className="h-auto md:h-16 py-4 md:py-0 border-b border-[var(--border-subtle)] flex flex-row justify-between items-center px-6 md:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Fonetica</span>
          <span className="text-lg font-mono font-medium">{data.phonetic}</span>
        </div>
      </div>

      {/* --- MAIN CANVAS AREA --- */}
      <div ref={containerRef} className={`flex-1 relative flex flex-col items-center p-6 md:p-8 ${isTraced ? 'overflow-y-auto justify-start' : 'overflow-hidden justify-start md:justify-center'}`}>
        
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
             <span className="font-glagolitic text-3xl text-[var(--accent-primary)]">{data.glagolitic}</span>
        </div>

        {/* Mobile: lettera + hint + pulsanti; desktop: md:contents */}
        <div className="flex flex-col items-center justify-center gap-2 md:contents">
        {/* --- THE LETTER (Font Based) --- */}
        <div ref={letterRef} className={`relative z-10 flex items-center justify-center select-none flex-shrink-0 ${isTraced ? 'w-[180px] h-[200px] md:w-[220px] md:h-[240px]' : 'w-[300px] h-[350px] md:w-[400px] md:h-[400px]'}`}>
            
            <button type="button" onClick={speakLetter} disabled={isPlaying} className={`md:hidden absolute inset-0 z-20 touch-manipulation ${isTracing ? 'pointer-events-none' : 'cursor-pointer'}`} aria-label="Ascolta pronuncia" />
            
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="fixed left-1/2 -translate-x-1/2 z-[100] md:hidden"
                  style={{ top: soundIconTop ?? 0 }}
                >
                  <div className="flex items-end justify-center gap-1 h-8">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div key={i} className="w-1 bg-[var(--accent-primary)] rounded-full"
                        animate={{ height: [8, 20, 8] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
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
                  onError={() => toast.showToast('Tracciamento interrotto. Riprova con più precisione.', 'error')}
                />
              )}
            </AnimatePresence>
        </div>

        <AnimatePresence>
          {isTracing && data.wordInAction && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mt-4 md:mt-0 md:absolute md:bottom-28 md:left-1/2 md:-translate-x-1/2 text-xs text-[var(--text-muted)] text-center max-w-xs z-20 w-full"
            >
              Completa il ricalco per scoprire come questa lettera prende vita nella parola
            </motion.p>
          )}
        </AnimatePresence>

        <div className={`z-40 flex items-center gap-3 flex-shrink-0 ${isTraced ? 'mt-2 md:mt-4 relative' : 'relative mt-2 md:mt-4 md:absolute md:bottom-8 md:left-8 md:mt-0'}`}>
           
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
        </div>

        <button onClick={speakLetter} disabled={isPlaying}
          className="hidden md:flex absolute bottom-8 right-8 z-40 h-[48px] w-[48px] items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all shadow-sm disabled:opacity-50"
          aria-label="Ascolta pronuncia"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
          )}
        </button>

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
                {justCompletedTrace
                  ? 'Ora che hai dominato il segno, scopri come prende vita nella parola.'
                  : 'Hai già dominato il segno. Scopri come prende vita nella parola.'}
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