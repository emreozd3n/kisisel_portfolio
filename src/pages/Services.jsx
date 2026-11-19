import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, Compass, PenTool, Code, Rocket } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getServiceIcon } from '../lib/icons';
import { pad } from '../lib/utils';
import SectionHeader from '../components/ui/SectionHeader';
import SpotlightCard from '../components/ui/SpotlightCard';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const PROCESS = [
  { icon: Compass, title: 'Keşif', text: 'Hedefleri, kullanıcıları ve kısıtları birlikte netleştiriyoruz. Sonunda net bir kapsam ve takvim var.' },
  { icon: PenTool, title: 'Tasarım', text: 'Akışlar ve arayüzler; önce iskelet, sonra detay. Her adımda onayınızla ilerliyoruz.' },
  { icon: Code, title: 'Geliştirme', text: 'Haftalık demolarla şeffaf ilerleme. Test edilmiş, belgelenmiş, bakımı kolay kod.' },
  { icon: Rocket, title: 'Yayın & Destek', text: 'Canlıya alım, ölçümleme ve yayın sonrası destek. Ürün büyüdükçe yanınızdayım.' },
];

export default function Services() {
  const { data } = useData();

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-36 md:pt-44">
        <SectionHeader
          index="02"
          eyebrow="Hizmetler"
          title={
            <>
              İhtiyacınıza göre şekillenen, <span className="text-zinc-500">uçtan uca çözümler.</span>
            </>
          }
          description="Küçük bir tanıtım sitesinden karmaşık bir operasyon paneline kadar; her projeye aynı özen ve aynı mühendislik disipliniyle yaklaşıyorum."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {data.services.map((s, i) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <Reveal key={s.id} delay={(i % 2) * 0.08} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-8">
                  <div className="flex items-start justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.06] to-transparent text-violet-300 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-xs text-zinc-600">{pad(i + 1)}</span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.025em] text-white">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{s.summary}</p>

                  {s.features?.length > 0 && (
                    <ul className="mt-7 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-400/80" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-8">
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-5 text-sm">
                    <span className="flex items-center gap-2 text-zinc-500">
                      <Clock className="size-4" />
                      {s.timeline || 'Projeye göre'}
                    </span>
                    <Link
                      to="/iletisim"
                      state={{ subject: s.title }}
                      className="group/link inline-flex items-center gap-1 text-zinc-300 transition hover:text-white"
                    >
                      Teklif al
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHeader index="—" eyebrow="Süreç" title="Nasıl çalışıyorum?" />
        <ol className="relative mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.07} className="group bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900">
              <div className="flex items-center justify-between">
                <p.icon className="size-5 text-zinc-500 transition group-hover:text-violet-300" />
                <span className="font-mono text-[11px] text-zinc-600">Adım {pad(i + 1)}</span>
              </div>
              <h3 className="mt-10 text-lg font-medium text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{p.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/[0.06] p-8 sm:flex-row sm:items-center">
            <p className="text-lg text-zinc-300">
              Projenizi bir listede bulamadınız mı? <span className="text-zinc-500">Yine de yazın.</span>
            </p>
            <Button as={Link} to="/iletisim">
              Görüşme planla
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
