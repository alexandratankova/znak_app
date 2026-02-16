import React, { useRef, useEffect } from 'react';
import { LetterData } from '../types';
import { motion } from 'framer-motion';

interface NavigationProps {
  letters: LetterData[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onRewatchIntro?: () => void;
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ letters, currentIndex, onSelect, onRewatchIntro, theme = 'dark', onThemeToggle }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (navRef.current && buttonRefs.current[currentIndex]) {
      const button = buttonRefs.current[currentIndex];
      const nav = navRef.current;
      const topPos = button!.offsetTop - (nav.clientHeight / 2) + (button!.clientHeight / 2);
      
      nav.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <nav aria-label="Navigazione lettere alfabeto" className="h-[80px] w-full md:h-full md:w-[120px] lg:w-[160px] flex-shrink-0 bg-[var(--bg-secondary)] border-b md:border-b-0 md:border-r border-[var(--border-subtle)] md:fixed md:left-0 md:top-0 md:bottom-0 z-40 flex md:flex-col overflow-hidden">
      
      {/* Brand / Logo Area */}
      <div className="hidden md:flex flex-col shrink-0">
         <div className="flex flex-col items-center justify-center py-4 px-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] gap-1">
           <span className="font-black text-xl tracking-tighter text-[var(--text-primary)]">ZИАК</span>
           <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-rose-500/25 text-rose-400' : 'bg-rose-400/35 text-rose-600'}`}>
             beta
           </span>
         </div>
         <div className="flex flex-col items-center gap-1 py-3 px-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
           {onThemeToggle && (
             <button
              onClick={onThemeToggle}
              className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
               aria-label={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
             >
               {theme === 'dark' ? 'Tema chiaro' : 'Tema scuro'}
             </button>
           )}
           {onRewatchIntro && (
             <button
               onClick={onRewatchIntro}
               className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
               aria-label="Rivedi l'introduzione"
             >
               Rivedi intro
             </button>
           )}
         </div>
      </div>

      <div 
        ref={navRef}
        className="flex-1 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar snap-x md:snap-y"
      >
        {letters.map((letter, idx) => (
          <button
            key={letter.id}
            ref={(el) => { buttonRefs.current[idx] = el; }}
            onClick={() => onSelect(idx)}
            aria-label={`Lettera ${letter.name}, ${letter.char}`}
            aria-current={idx === currentIndex ? 'true' : undefined}
            className={`
              relative group flex-shrink-0 snap-center
              w-[80px] h-full md:w-full md:h-[100px]
              flex flex-col items-center justify-center
              transition-colors duration-300
              ${idx === currentIndex ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'}
            `}
          >
            <span className={`font-display text-3xl md:text-4xl leading-none mb-1 ${idx === currentIndex ? 'italic' : ''}`}>
              {letter.char}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              {letter.name}
            </span>
            
            {/* Active Indicator Line */}
            {idx === currentIndex && (
              <motion.div
                layoutId="active-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 md:h-full md:w-1 md:right-auto md:left-0 bg-[var(--accent-primary)]"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;