import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'login' | 'register';

const AUTH_MODAL_TITLE_ID = 'auth-modal-title';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  onSignUp: (email: string, password: string) => Promise<{ error: Error | null }>;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSignIn, onSignUp }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const reset = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        const { error: err } = await onSignIn(email, password);
        if (err) setError(err.message);
        else onClose();
      } else {
        const { error: err } = await onSignUp(email, password);
        if (err) setError(err.message);
        else {
          setSuccessMessage('Controlla la tua email per confermare l\'account.');
          reset();
          setTimeout(() => setMode('login'), 2000);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        key="auth-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        role="presentation"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={AUTH_MODAL_TITLE_ID}
          className="w-full max-w-md p-6 md:p-12 relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl"
        >
          <div className="flex justify-between items-center mb-10 border-b-2 border-[var(--accent-primary)] pb-4">
            <h2 id={AUTH_MODAL_TITLE_ID} className="font-black text-xl md:text-2xl uppercase tracking-tighter text-[var(--text-primary)]">
              {mode === 'login' ? 'Accedi' : 'Registrati'}
            </h2>
            <button
              ref={closeRef}
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all"
              aria-label="Chiudi"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          {successMessage && (
            <p className="mb-4 text-sm text-[var(--accent-primary)]">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
            </div>
            {error && <p className="text-sm text-[var(--feedback-error)]">{error}</p>}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="h-[48px] px-6 flex items-center justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)] rounded-full uppercase text-xs font-bold tracking-widest transition-colors shadow-xl disabled:opacity-50"
              >
                {loading ? '...' : mode === 'login' ? 'Accedi' : 'Registrati'}
              </button>
              <button
                type="button"
                onClick={switchMode}
                className="h-[48px] px-6 flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-full transition-all shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-widest">{mode === 'login' ? 'Registrati' : 'Accedi'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
