import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData } from '../types';
import HistoryIdentity from './HistoryIdentity';

interface ExpandableHistoryDrawerProps {
  data: LetterData;
}

const ExpandableHistoryDrawer: React.FC<ExpandableHistoryDrawerProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:hidden absolute bottom-0 left-0 right-0 z-50 flex flex-col">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '85dvh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="overflow-hidden bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] shadow-2xl"
          >
            <div className="h-full overflow-y-auto no-scrollbar">
              <HistoryIdentity data={data} embedded />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center gap-2 py-3 px-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition-colors touch-manipulation"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Chiudi storia e identità' : 'Apri storia e identità'}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          STORIA E IDENTITÀ
        </span>
        <motion.svg
          className="w-4 h-4 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </motion.svg>
      </button>
    </div>
  );
};

export default ExpandableHistoryDrawer;
