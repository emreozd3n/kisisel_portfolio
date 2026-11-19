import { cn } from '../../lib/utils';

/** İmleç konumunu CSS değişkenine yazan, kenarı ışıldayan kart. */
export default function SpotlightCard({ as: Comp = 'div', className, children, ...props }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Comp
      onMouseMove={onMove}
      className={cn(
        'spotlight rounded-3xl border border-white/[0.06] bg-ink-900/60 transition-colors duration-500 hover:border-white/[0.1]',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
