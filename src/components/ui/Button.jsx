import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'bg-zinc-50 text-ink-950 shadow-[inset_0_-2px_0_rgb(0_0_0/0.12),0_8px_30px_-8px_rgb(255_255_255/0.25)] hover:bg-white hover:shadow-[inset_0_-2px_0_rgb(0_0_0/0.12),0_10px_40px_-6px_rgb(167_139_250/0.45)]',
  secondary:
    'border border-white/10 bg-white/[0.03] text-zinc-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white',
  ghost: 'text-zinc-400 hover:bg-white/[0.05] hover:text-white',
  accent:
    'bg-violet-500 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_8px_30px_-8px_rgb(139_92_246/0.8)] hover:bg-violet-400',
  danger: 'bg-rose-500/90 text-white hover:bg-rose-500',
};

const sizes = {
  sm: 'h-8 rounded-lg px-3 text-[13px]',
  md: 'h-10 rounded-xl px-4 text-sm',
  lg: 'h-12 rounded-2xl px-6 text-[15px]',
  icon: 'size-9 rounded-xl',
};

const Button = forwardRef(function Button(
  { as: Comp = 'button', variant = 'primary', size = 'md', className, children, ...props },
  ref
) {
  const extra = Comp === 'button' && !props.type ? { type: 'button' } : {};
  return (
    <Comp ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...extra} {...props}>
      {children}
    </Comp>
  );
});

export default Button;
