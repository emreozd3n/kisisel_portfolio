import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { getPlatform } from '../lib/icons';
import { cn } from '../lib/utils';
import Avatar from './ui/Avatar';

function Barcode({ value }) {
  const bars = useMemo(
    () => Array.from(`${value}${value}`).map((c, i) => ((c.charCodeAt(0) * (i + 7)) % 4) + 1),
    [value]
  );
  return (
    <div className="flex h-7 items-stretch gap-[2px]" aria-hidden>
      {bars.map((w, i) => (
        <span key={i} style={{ width: w }} className={i % 3 === 0 ? 'bg-zinc-300/60' : 'bg-zinc-500/40'} />
      ))}
    </div>
  );
}

function Chip() {
  return (
    <div className="relative h-8 w-11 overflow-hidden rounded-md border border-white/15 bg-linear-to-br from-zinc-300/25 via-zinc-500/10 to-zinc-300/20">
      <span className="absolute inset-y-0 left-1/3 w-px bg-white/15" />
      <span className="absolute inset-y-0 right-1/3 w-px bg-white/15" />
      <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
      <span className="absolute inset-[30%] rounded-sm border border-white/15" />
    </div>
  );
}

export default function IdCard({ profile, socials }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 20, active: false });

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 9, ry: (px - 0.5) * 11, mx: px * 100, my: py * 100, active: true });
  };
  const reset = () => setT({ rx: 0, ry: 0, mx: 50, my: 20, active: false });

  const visible = socials.filter((s) => s.visible);

  return (
    <div className="relative mx-auto w-full max-w-[372px] [perspective:1400px] lg:pt-16">
      {/* Askı — yalnızca geniş ekranda, kart yan sütundayken */}
      <div aria-hidden className="absolute left-1/2 top-[-12rem] hidden h-[15.25rem] w-6 -translate-x-1/2 lg:block">
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#1c1830_0_3px,#241f3d_3px_6px)] opacity-90 [mask-image:linear-gradient(to_bottom,transparent,#000_45%)]" />
        <div className="absolute -bottom-1 left-1/2 h-5 w-9 -translate-x-1/2 rounded-md border border-white/15 bg-linear-to-b from-zinc-500 to-zinc-800 shadow-lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, rotate: -7, y: -40 }}
        animate={{ opacity: 1, rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 55, damping: 9, mass: 1.1, delay: 0.25 }}
        style={{ transformOrigin: '50% -60px' }}
      >
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={reset}
          style={{
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
            transition: t.active ? 'transform 90ms linear' : 'transform 700ms cubic-bezier(.22,1,.36,1)',
            transformStyle: 'preserve-3d',
          }}
          className="neon-ring rounded-[28px]"
        >
          <article className="glass relative overflow-hidden rounded-[28px] bg-ink-900/40 p-6">
            {/* Işık yansıması */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: t.active ? 1 : 0.55,
                background: `radial-gradient(520px circle at ${t.mx}% ${t.my}%, rgb(167 139 250 / 0.16), transparent 42%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-500"
              style={{
                opacity: t.active ? 0.5 : 0,
                background: `linear-gradient(${105 + t.ry * 4}deg, transparent 30%, rgb(129 140 248 / 0.35) 45%, rgb(52 211 153 / 0.25) 52%, transparent 65%)`,
              }}
            />

            <div className="relative">
              {/* Askı yuvası */}
              <div className="mx-auto mb-6 h-1.5 w-14 rounded-full bg-black/80 shadow-[inset_0_1px_2px_rgb(0_0_0/0.9),0_1px_0_rgb(255_255_255/0.08)]" />

              <div lang="en" className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgb(167_139_250)]" />
                  Digital ID
                </span>
                <span>No. {profile.idNumber}</span>
              </div>

              <div className="mt-7 flex items-start justify-between">
                <div className="relative">
                  <Avatar
                    src={profile.avatar}
                    name={profile.name}
                    className="size-[88px] rounded-2xl ring-1 ring-white/10"
                    textClassName="text-2xl"
                  />
                  <span
                    className={cn(
                      'absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-ink-950 ring-1 ring-white/10'
                    )}
                    title={profile.available ? 'Yeni projelere açık' : 'Şu an dolu'}
                  >
                    <span className="relative flex size-2">
                      {profile.available && (
                        <span className="absolute inset-0 animate-pulse-soft rounded-full bg-emerald-400" />
                      )}
                      <span
                        className={cn('relative size-2 rounded-full', profile.available ? 'bg-emerald-400' : 'bg-zinc-500')}
                      />
                    </span>
                  </span>
                </div>
                <Chip />
              </div>

              <h2 className="mt-6 text-[26px] font-semibold leading-none tracking-[-0.03em] text-white">
                {profile.name}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">{profile.title}</p>

              <div className="my-6 border-t border-dashed border-white/10" />

              <dl className="grid grid-cols-3 gap-3">
                {[
                  { k: 'Konum', v: profile.location, icon: MapPin },
                  { k: 'Since', v: profile.since },
                  { k: 'Durum', v: profile.available ? 'Müsait' : 'Dolu' },
                ].map((m) => (
                  <div key={m.k} className="min-w-0">
                    <dt lang={m.k === 'Since' ? 'en' : undefined} className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-600">{m.k}</dt>
                    <dd
                      className={cn(
                        'mt-1 truncate text-[13px] font-medium',
                        m.k === 'Durum' && profile.available ? 'text-emerald-300' : 'text-zinc-200'
                      )}
                    >
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>

              {visible.length > 0 && (
                <div className="mt-6">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-zinc-600">Bağlantılar</p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {visible.map((s) => {
                      const P = getPlatform(s.platform);
                      const Icon = P.icon;
                      return (
                        <li key={s.id} className="group/icon relative">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/[0.12] hover:text-white hover:shadow-[0_8px_24px_-6px_rgb(139_92_246/0.7)] active:scale-95"
                          >
                            <Icon className="size-[17px]" />
                          </a>
                          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-ink-950 px-2 py-1 text-[11px] text-zinc-200 opacity-0 transition duration-200 group-hover/icon:translate-y-0 group-hover/icon:opacity-100">
                            {s.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="mt-7 flex items-end justify-between gap-6">
                <Barcode value={profile.idNumber} />
                <div lang="en" className="shrink-0 text-right font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-zinc-600">
                  <div>Valid thru</div>
                  <div className="text-zinc-400">∞ / ∞</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </div>
  );
}
