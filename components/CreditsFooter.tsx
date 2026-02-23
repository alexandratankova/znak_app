import React from 'react';

interface CreditsFooterProps {
  onOpen: () => void;
  onOpenAuth?: () => void;
  onSignOut?: () => void;
  isLoggedIn?: boolean;
}

const CreditsFooter: React.FC<CreditsFooterProps> = ({ onOpen, onOpenAuth, onSignOut, isLoggedIn }) => (
  <footer className="flex-shrink-0 py-2.5 px-4 flex justify-center md:justify-end items-center gap-[16px] border-t border-[var(--border-subtle)]">
    <button
      type="button"
      onClick={onOpen}
      className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] opacity-30 hover:opacity-100 transition-opacity"
      aria-label="Apri Info"
    >
      INFO
    </button>
    {onOpenAuth && (
      <>
        <span className="font-mono text-[8px] md:text-[10px] text-[var(--text-primary)] opacity-30">|</span>
        <button
          type="button"
          onClick={isLoggedIn ? onSignOut : onOpenAuth}
          className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] opacity-30 hover:opacity-100 transition-opacity"
          aria-label={isLoggedIn ? "Esci dall'account" : "Accedi o registrati"}
        >
          {isLoggedIn ? 'ESCI' : 'ACCOUNT'}
        </button>
      </>
    )}
  </footer>
);

export default CreditsFooter;
