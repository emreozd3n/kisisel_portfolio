import Reveal from './Reveal';
import { eyebrowCls } from './styles';
import { cn } from '../../lib/utils';

export default function SectionHeader({ index, eyebrow, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <Reveal>
          <p className={eyebrowCls}>
            {index && <span className="text-violet-300/80">{index}</span>}
            {index && <span className="mx-2 text-zinc-700">/</span>}
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400">{description}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.15}>{action}</Reveal>}
    </div>
  );
}
