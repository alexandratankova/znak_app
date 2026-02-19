import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditsFooterProps {
  onOpen: () => void;
}

export const CreditsFooter: React.FC<CreditsFooterProps> = ({ onOpen }) => (
  <footer className="flex-shrink-0 py-2.5 px-4 flex justify-center md:justify-end border-t border-[var(--border-subtle)]">
    <button
      type="button"
      onClick={onOpen}
      className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] opacity-30 hover:opacity-100 transition-opacity"
      aria-label="Apri Credits"
    >
      INFO // CREDITS
    </button>
  </footer>
);

const CREDITS_TITLE_ID = 'credits-dialog-title';

const Credits: React.FC<{ isOpen: boolean; onClose: () => void; theme?: 'dark' | 'light' }> = ({ isOpen, onClose, theme = 'dark' }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  return (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] backdrop-blur-xl flex items-center justify-center p-6"
        style={{ backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)' }}
        role="presentation"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={CREDITS_TITLE_ID}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-2xl flex flex-col gap-8 p-8 md:p-10 ${theme === 'light' ? 'bg-white text-black rounded-lg' : ''}`}
        >
          <h2 id={CREDITS_TITLE_ID} className={`font-black text-2xl md:text-3xl uppercase tracking-tighter ${theme === 'light' ? 'text-black' : 'text-[var(--text-primary)]'}`}>
            ZИАК // SYSTEM_REPORT
          </h2>

          <div className={`font-sans text-sm md:text-base space-y-6 ${theme === 'light' ? 'text-gray-600' : 'text-[var(--text-secondary)]'}`} style={{ fontFamily: 'var(--font-body)' }}>
            <h3 className={`font-black text-lg uppercase tracking-wider mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-[var(--text-primary)]'}`}>
              IL TEAM
            </h3>
            <div className="space-y-1">
              <p className={`font-bold ${theme === 'light' ? 'text-black' : 'text-[var(--text-primary)]'}`}>
                Alexandra Tankova | UX Designer &amp; Author
              </p>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-[var(--text-secondary)]'}>Direzione creativa, architettura dell&apos;esperienza e supervisione umana</p>
              <a
                href="https://www.linkedin.com/in/alexandra-tankova/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block mt-2 underline hover:no-underline ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]'}`}
                aria-label="LinkedIn di Alexandra Tankova (si apre in nuova scheda)"
              >
                LinkedIn
              </a>
            </div>

            <div className="space-y-1">
              <p className={`font-bold ${theme === 'light' ? 'text-black' : 'text-[var(--text-primary)]'}`}>Cursor AI</p>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-[var(--text-secondary)]'}>&quot;The Code Monkey&quot; (Sviluppo instancabile sotto dettatura)</p>
            </div>

            <div className="space-y-1">
              <p className={`font-bold ${theme === 'light' ? 'text-black' : 'text-[var(--text-primary)]'}`}>Google AI Studio</p>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-[var(--text-secondary)]'}>&quot;The Brainstormer&quot; (Supporto creativo e logico)</p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`self-start h-[48px] px-6 flex items-center justify-center rounded-full transition-all shadow-sm ${theme === 'light' ? 'bg-black text-white hover:bg-gray-800 border border-black' : 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]'}`}
            aria-label="Chiudi credits"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Chiudi</span>
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};

export default Credits;
