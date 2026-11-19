import { useEffect, useState } from 'react';
import { cn, initials } from '../../lib/utils';

export default function Avatar({ src, name, className, textClassName }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  return (
    <div
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#2a2340,#121212_70%)]',
        className
      )}
    >
      {src && !failed ? (
        <img src={src} alt={name} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <span className={cn('font-semibold tracking-tight text-zinc-100', textClassName)}>{initials(name)}</span>
      )}
    </div>
  );
}
