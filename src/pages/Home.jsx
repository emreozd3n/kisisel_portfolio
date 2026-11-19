import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getServiceIcon } from '../lib/icons';
import { parseEmphasis, pad } from '../lib/utils';
import IdCard from '../components/IdCard';
import ReferenceCard from '../components/ReferenceCard';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  const { data } = useData();
  const { profile, socials, services, references, about } = data;

  const years = new Date().getFullYear() - Number(profile.since || new Date().getFullYear());
  const featured = (references.filter((r) => r.featured).length ? references.filter((r) => r.featured) : references).slice(0, 3);
  const stack = about.skills.flatMap((s) => s.items);

  const stats = [
    { value: `${years}+`, label: 'Yıllık deneyim' },
    { value: pad(references.length), label: 'Tamamlanan proje' },
    { value: pad(services.length), label: 'Uzmanlık alanı' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pt-44">
        <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] py-1 pl-2 pr-3.5 text-xs text-zinc-400">
                <span className="relative flex size-2">
                  {profile.available && <span className="absolute inset-0 animate-pulse-soft rounded-full bg-emerald-400" />}
                  <span className={`relative size-2 rounded-full ${profile.available ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                </span>
                {profile.available ? 'Yeni projeler için müsait' : 'Şu an yeni proje alınmıyor'}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="mt-7 text-[clamp(2.5rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white"
            >
              {parseEmphasis(profile.headline).map((p, i) =>
                p.muted ? (
                  <span key={i} className="font-light italic text-zinc-500">
                    {p.text}
                  </span>
                ) : (
                  <span key={i}>{p.text}</span>
                )
              )}
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="mt-7 max-w-lg text-[16px] leading-relaxed text-zinc-400">
              {profile.intro}
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="mt-10 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/referanslar" size="lg">
                Çalışmaları incele
                <ArrowRight className="size-4" />
              </Button>
              <Button as={Link} to="/iletisim" size="lg" variant="secondary">
                İletişime geç
              </Button>
            </motion.div>

            <motion.dl {...fadeUp(0.32)} className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-white/[0.06] pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-white">{s.value}</dd>
                  <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </motion.dl>
          </div>

          <IdCard profile={profile} socials={socials} />
        </div>
      </section>

      {/* TEKNOLOJİ BANDI */}
      <section className="border-y border-white/[0.05] py-6">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap text-sm text-zinc-500">
                {s}
                <span className="size-1 rounded-full bg-zinc-700" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇİLİ İŞLER */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHeader
          index="01"
          eyebrow="Seçili işler"
          title="Son dönemde üzerinde çalıştığım projeler."
          action={
            <Link to="/referanslar" className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
              Tüm referanslar
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06} className="h-full">
              <ReferenceCard item={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* HİZMETLER ÖZETİ */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHeader index="02" eyebrow="Neler yapıyorum" title="Fikirden yayına, tek elden." />
        <ul className="mt-12 border-t border-white/[0.06]">
          {services.map((s, i) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <Reveal as="li" key={s.id} delay={i * 0.04}>
                <Link
                  to="/hizmetler"
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-white/[0.06] py-7 transition-colors md:grid-cols-[4rem_1fr_1.2fr_auto]"
                >
                  <span className="font-mono text-xs text-zinc-600 transition group-hover:text-violet-300">{pad(i + 1)}</span>
                  <span className="flex items-center gap-4">
                    <Icon className="size-5 text-zinc-500 transition group-hover:text-white" />
                    <span className="text-xl font-medium tracking-tight text-zinc-200 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white md:text-2xl">
                      {s.title}
                    </span>
                  </span>
                  <span className="hidden text-sm leading-relaxed text-zinc-500 md:block">{s.summary}</span>
                  <span className="grid size-10 place-items-center rounded-full border border-white/[0.08] text-zinc-500 transition-all duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-500/10 group-hover:text-white">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-ink-900/70 px-8 py-16 md:px-16">
            <div className="absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.25),transparent)]" />
            <div className="bg-grid absolute inset-0 opacity-40" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-xl text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
                İyi bir proje, iyi bir sohbetle başlar.
              </h2>
              <Button as={Link} to="/iletisim" size="lg" variant="accent">
                Mesaj gönder
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
