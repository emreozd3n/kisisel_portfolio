import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, CircleAlert, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const STYLES = {
  success: { icon: CircleCheck, color: 'text-emerald-400', bar: 'bg-emerald-400/70' },
  error: { icon: CircleAlert, color: 'text-rose-400', bar: 'bg-rose-400/70' },
  info: { icon: Info, color: 'text-violet-300', bar: 'bg-violet-400/70' },
};

const DURATION = 3800;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const push = useCallback(
    (type, title, description) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t.slice(-3), { id, type, title, description }]);
      setTimeout(() => dismiss(id), DURATION);
      return id;
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      success: (title, description) => push('success', title, description),
      error: (title, description) => push('error', title, description),
      info: (title, description) => push('info', title, description),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[250] flex w-[min(92vw,360px)] flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const s = STYLES[t.type];
            const Icon = s.icon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="pointer-events-auto relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-850/95 p-4 pr-10 shadow-2xl shadow-black/60 backdrop-blur-xl"
              >
                <div className="flex gap-3">
                  <Icon className={`mt-0.5 size-[18px] shrink-0 ${s.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-100">{t.title}</p>
                    {t.description && <p className="mt-0.5 text-[13px] leading-snug text-zinc-400">{t.description}</p>}
                  </div>
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="absolute right-2.5 top-2.5 rounded-lg p-1 text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200"
                  aria-label="Kapat"
                >
                  <X className="size-4" />
                </button>
                <motion.span
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: DURATION / 1000, ease: 'linear' }}
                  className={`absolute bottom-0 left-0 h-px w-full origin-left ${s.bar}`}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast, ToastProvider içinde kullanılmalı');
  return ctx;
};
