import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageIcon, Upload, X, TriangleAlert } from 'lucide-react';
import Button from '../components/ui/Button';
import { inputCls, inputErrorCls, labelCls } from '../components/ui/styles';
import { useToast } from '../context/ToastContext';
import { cn, compressImage } from '../lib/utils';

export { inputCls };

export function Field({ label, hint, error, children, className, htmlFor }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className={labelCls}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-[12.5px] text-rose-400">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-[12px] text-zinc-600">{hint}</p>
      )}
    </div>
  );
}

export const fieldCls = (error) => cn(inputCls, error && inputErrorCls);

export function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] px-4 py-3">
      <span>
        <span className="block text-sm text-zinc-200">{label}</span>
        {description && <span className="block text-xs text-zinc-500">{description}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300',
          checked ? 'bg-violet-500' : 'bg-white/10'
        )}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          className={cn('absolute top-1 size-4 rounded-full bg-white shadow', checked ? 'right-1' : 'left-1')}
        />
      </button>
    </label>
  );
}

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-2xl' };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={cn(
              'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/[0.08] bg-ink-900 shadow-2xl shadow-black sm:rounded-3xl',
              widths[size]
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
              <div>
                <h2 className="text-base font-semibold text-white">{title}</h2>
                {description && <p className="mt-0.5 text-sm text-zinc-500">{description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Kapat" className="-mr-2 -mt-1">
                <X className="size-4" />
              </Button>
            </div>
            <div className="overflow-y-auto px-6 py-6">{children}</div>
            {footer && (
              <div className="flex justify-end gap-2 border-t border-white/[0.06] bg-ink-950/40 px-6 py-4">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title = 'Emin misiniz?', message, confirmLabel = 'Sil' }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Vazgeç
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-rose-400">
          <TriangleAlert className="size-5" />
        </span>
        <p className="text-sm leading-relaxed text-zinc-400">{message}</p>
      </div>
    </Modal>
  );
}

export function PanelHeader({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-white/[0.04] text-zinc-500">
        <Icon className="size-5" />
      </span>
      <p className="mt-4 font-medium text-zinc-200">{title}</p>
      {text && <p className="mt-1 max-w-xs text-sm text-zinc-500">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function IconButton({ icon: Icon, label, onClick, tone = 'default', disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        'grid size-8 place-items-center rounded-lg text-zinc-500 transition active:scale-90 disabled:pointer-events-none disabled:opacity-30',
        tone === 'danger' ? 'hover:bg-rose-500/10 hover:text-rose-400' : 'hover:bg-white/[0.06] hover:text-white'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function Card({ className, children }) {
  return <div className={cn('rounded-2xl border border-white/[0.06] bg-ink-900/60', className)}>{children}</div>;
}

export function ImageInput({ value, onChange, rounded = 'rounded-xl', maxSize = 1000 }) {
  const fileRef = useRef(null);
  const toast = useToast();
  const isUpload = value?.startsWith('data:');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Geçersiz dosya', 'Lütfen bir görsel dosyası seçin.');
    if (file.size > 8 * 1024 * 1024) return toast.error('Dosya çok büyük', 'En fazla 8 MB yükleyebilirsiniz.');
    try {
      onChange(await compressImage(file, maxSize));
      toast.success('Görsel yüklendi');
    } catch {
      toast.error('Görsel işlenemedi');
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className={cn('grid size-20 shrink-0 place-items-center overflow-hidden border border-white/[0.08] bg-white/[0.03]', rounded)}>
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon className="size-5 text-zinc-600" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <input
          className={inputCls}
          placeholder={isUpload ? 'Yüklenen görsel kullanılıyor' : 'https://… görsel bağlantısı'}
          value={isUpload ? '' : value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
            <Upload className="size-3.5" /> Dosya yükle
          </Button>
          {value && (
            <Button size="sm" variant="ghost" onClick={() => onChange('')}>
              Kaldır
            </Button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
    </div>
  );
}
