import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const TOAST_DURATION = 3000;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 z-[9999] flex flex-col gap-2 pointer-events-none items-center md:items-start">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`
                flex items-center justify-start gap-3 px-6 py-4 font-semibold text-sm md:text-base tracking-wide text-left min-w-[min(290px,calc(100vw-3rem))]
                rounded-none
                bg-[var(--toast-bg)] text-[var(--toast-text)]
                ${toast.type === 'success' 
                  ? '[--toast-accent:var(--toast-success-accent)]' 
                  : '[--toast-accent:var(--toast-error-accent)]'}
              `}
              style={{ 
                border: '1px solid var(--toast-border)', 
                borderLeftWidth: 4, 
                borderLeftColor: 'var(--toast-accent)',
                boxShadow: 'var(--toast-shadow)'
              }}
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--toast-accent)' }} aria-hidden="true">
                {toast.type === 'success' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </span>
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
