import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditsProps {
  onOpen: () => void;
}

export const CreditsFooter: React.FC<CreditsProps> = ({ onOpen }) => (
  <footer className="flex-shrink-0 py-2.5 px-4 flex justify-center md:justify-end border-t border-[var(--border-subtle)]">
    <button
      type="button"
      onClick={onOpen}
      className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] opacity-30 hover:opacity-100 transition-opacity focus:outline-none focus:ring-0"
      aria-label="Apri Credits"
    >
      INFO // CREDITS
    </button>
  </footer>
);

const Credits: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] backdrop-blur-xl flex items-center justify-center p-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl flex flex-col gap-8"
        >
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tighter text-[var(--text-primary)]">
            ZИАК // SYSTEM_REPORT
          </h2>

          <div className="font-mono text-sm md:text-base space-y-6 text-[var(--text-secondary)]">
            <p className="font-black text-[var(--text-primary)] uppercase tracking-wider mb-3 opacity-60">
              TEAM:
            </p>
            <div>
              <p className="font-black text-[var(--text-primary)] uppercase tracking-wider mb-1">
                ALEXANDRA TANKOVA
              </p>
              <p className="opacity-90">&quot;The Puppet Master&quot; (Concept, Design & Human Intelligence).</p>
            </div>

            <div>
              <p className="font-black text-[var(--text-primary)] uppercase tracking-wider mb-1">
                CURSOR AI
              </p>
              <p className="opacity-90">&quot;The Code Monkey&quot; (Sviluppo instancabile sotto dettatura).</p>
            </div>

            <div>
              <p className="font-black text-[var(--text-primary)] uppercase tracking-wider mb-1">
                GOOGLE AI STUDIO
              </p>
              <p className="opacity-90">&quot;The Brainstormer&quot; (Supporto creativo e logico).</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="self-start h-[48px] px-6 flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-full transition-all shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Chiudi</span>
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Credits;
