import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { useData } from '../context/DataContext';
import ReferenceCard from '../components/ReferenceCard';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { cn } from '../lib/utils';

export default function References() {
  const { data } = useData();
  const [filter, setFilter] = useState('Tümü');

  const categories = useMemo(
    () => ['Tümü', ...Array.from(new Set(data.references.map((r) => r.category).filter(Boolean)))],
    [data.references]
  );
  const list = filter === 'Tümü' ? data.references : data.references.filter((r) => r.category === filter);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-36 md:pt-44">
      <SectionHeader
        index="01"
        eyebrow="Referanslar"
        title={
          <>
            Birlikte çalıştığım markalar <span className="text-zinc-500">ve hayata geçirdiğimiz işler.</span>
          </>
        }
        description="Her proje farklı bir problemle başladı. Aşağıda, yayında olan çalışmaların bir seçkisini bulabilirsiniz."
      />

      {categories.length > 2 && (
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 active:scale-95',
                  filter === c ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                )}
              >
                {filter === c && (
                  <motion.span
                    layoutId="ref-filter"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>
      )}

      {list.length === 0 ? (
        <div className="mt-16 grid place-items-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
          <FolderOpen className="size-8 text-zinc-600" />
          <p className="mt-4 text-sm text-zinc-500">Henüz referans eklenmemiş.</p>
        </div>
      ) : (
        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ReferenceCard item={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
