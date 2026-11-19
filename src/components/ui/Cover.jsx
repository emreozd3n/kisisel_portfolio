import { useEffect, useState } from 'react';
import { ACCENTS } from '../../lib/icons';
import { cn } from '../../lib/utils';

/** Referans görseli; görsel yoksa markaya özel tipografik kapak üretir. */
export default function Cover({ name, image, accent = 'violet', className, compact = false }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [image]);
  const color = ACCENTS[accent] ?? ACCENTS.violet;

  if (image && !failed) {
    return (
      <div className={cn('relative overflow-hidden bg-ink-900', className)}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-ink-900', className)}>
      <div
        className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-100 opacity-80"
        style={{
          background: `radial-gradient(110% 90% at 90% 0%, ${color}38, transparent 55%), radial-gradient(70% 60% at 0% 100%, ${color}1c, transparent 60%)`,
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 grid place-items-center px-4">
        <span
          className={cn(
            'text-center font-semibold tracking-[-0.045em] text-white/90 transition duration-700 ease-out group-hover:scale-[1.04]',
            compact ? 'text-sm' : 'text-3xl'
          )}
        >
          {name}
        </span>
      </div>
      {!compact && (
        <span
          className="absolute left-5 top-5 size-1.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 14px 2px ${color}` }}
        />
      )}
    </div>
  );
}
