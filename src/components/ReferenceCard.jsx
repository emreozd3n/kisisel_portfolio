import { ArrowUpRight } from 'lucide-react';
import Cover from './ui/Cover';
import { hostname } from '../lib/utils';

export default function ReferenceCard({ item }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-900/60 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
      <Cover name={item.name} image={item.image} accent={item.accent} className="aspect-[16/10] border-b border-white/[0.05]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
          <span>{item.category}</span>
          <span>{item.year}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.name}</h3>
        {item.description && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>}
        <div className="mt-auto pt-6">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-zinc-300 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              Siteye Git
              <span className="hidden font-mono text-xs text-zinc-600 transition group-hover/btn:text-zinc-400 sm:inline">
                {hostname(item.url)}
              </span>
            </span>
            <span className="grid size-7 place-items-center rounded-lg bg-white/[0.05] transition-all duration-300 group-hover/btn:rotate-45 group-hover/btn:bg-violet-500 group-hover/btn:text-white">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-rotate-45" />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
