import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import Avatar from '../components/ui/Avatar';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { eyebrowCls } from '../components/ui/styles';

export default function About() {
  const { data } = useData();
  const { profile, about, contact } = data;
  const paragraphs = about.story.split(/\n\s*\n/).filter(Boolean);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-36 md:pt-44">
      <div className="grid gap-16 lg:grid-cols-[300px_1fr] lg:gap-24">
        {/* Sol: sabit profil */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Avatar
              src={profile.avatar}
              name={profile.name}
              className="aspect-[4/5] w-full max-w-[300px] rounded-3xl ring-1 ring-white/10"
              textClassName="text-6xl"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6">
              <p className="text-lg font-semibold tracking-tight text-white">{profile.name}</p>
              <p className="text-sm text-zinc-500">{profile.title}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-zinc-400">
                <MapPin className="size-3.5" />
                {contact.location}
              </p>
              <Button as={Link} to="/iletisim" variant="secondary" size="sm" className="mt-6">
                Birlikte çalışalım
                <ArrowUpRight className="size-3.5" />
              </Button>
            </div>
          </Reveal>
        </aside>

        {/* Sağ: hikâye */}
        <div>
          <Reveal>
            <p className={eyebrowCls}>
              <span className="text-violet-300/80">03</span>
              <span className="mx-2 text-zinc-700">/</span>Hakkımda
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-white">
              {about.intro}
            </h1>
          </Reveal>

          <div className="mt-12 max-w-2xl space-y-6 text-[17px] leading-[1.8] text-zinc-400">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-white' : ''}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {about.vision && (
            <Reveal>
              <figure className="relative mt-16 border-l border-violet-400/40 pl-8">
                <p className={eyebrowCls}>Vizyon</p>
                <blockquote className="mt-4 text-2xl font-light leading-snug tracking-[-0.02em] text-zinc-100">
                  “{about.vision}”
                </blockquote>
              </figure>
            </Reveal>
          )}

          {about.skills.length > 0 && (
            <div className="mt-24">
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Yetenek seti</h2>
              </Reveal>
              <div className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {about.skills.map((g, i) => (
                  <Reveal key={g.id} delay={i * 0.04}>
                    <div className="grid gap-4 py-6 sm:grid-cols-[180px_1fr]">
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 sm:pt-1.5">{g.group}</p>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((it) => (
                          <li
                            key={it}
                            className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-sm text-zinc-300 transition hover:border-violet-400/30 hover:text-white"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {about.experience.length > 0 && (
            <div className="mt-24">
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Deneyim</h2>
              </Reveal>
              <ol className="mt-8 space-y-2">
                {about.experience.map((e, i) => (
                  <Reveal as="li" key={e.id} delay={i * 0.05}>
                    <div className="group grid gap-2 rounded-2xl p-5 transition-colors duration-300 hover:bg-white/[0.025] sm:grid-cols-[160px_1fr] sm:-mx-5">
                      <p className="font-mono text-xs text-zinc-500 sm:pt-1">{e.period}</p>
                      <div>
                        <p className="font-medium text-white">
                          {e.role} <span className="font-normal text-zinc-500">· {e.company}</span>
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{e.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
