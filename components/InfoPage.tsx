import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const INFO_PAGE_TITLE_ID = 'info-page-title';

const InfoPage: React.FC<InfoPageProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-auto"
      >
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-12 md:px-12 md:py-16 items-start justify-center">
          <h2 id={INFO_PAGE_TITLE_ID} className="font-black text-2xl md:text-3xl uppercase tracking-tighter text-white mb-12 w-full text-left">
            ZИАК // SYSTEM_REPORT
          </h2>

          <div className="font-sans text-sm md:text-base space-y-6 text-gray-300 text-left w-full" style={{ fontFamily: 'var(--font-body)' }}>
            <h3 className="font-black text-lg uppercase tracking-wider mb-6 text-white">
              IL TEAM
            </h3>
            <div className="space-y-1">
              <p className="font-bold text-white">
                Alexandra Tankova | UX Designer &amp; Author
              </p>
              <p className="text-gray-400">Direzione creativa, architettura dell&apos;esperienza e supervisione umana</p>
              <a
                href="https://www.linkedin.com/in/alexandra-tankova/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 underline hover:no-underline text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                aria-label="LinkedIn di Alexandra Tankova (si apre in nuova scheda)"
              >
                LinkedIn
              </a>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-white">Cursor AI</p>
              <p className="text-gray-400">&quot;The Code Monkey&quot; (Sviluppo instancabile sotto dettatura)</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-white">Google AI Studio</p>
              <p className="text-gray-400">&quot;The Brainstormer&quot; (Supporto creativo e logico)</p>
            </div>
          </div>

          <button
            ref={closeRef}
            onClick={onClose}
            className="mt-12 h-[48px] px-6 flex items-center justify-center bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all self-start"
            aria-label="Chiudi Info"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Chiudi</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoPage;
