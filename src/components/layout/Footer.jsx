import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { getPlatform } from '../../lib/icons';
import { eyebrowCls } from '../ui/styles';
import { NAV_LINKS } from './Navbar';

export default function Footer() {
  const { data } = useData();
  const { contact, socials, profile } = data;
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const localTime = new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  }).format(now);

  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className={eyebrowCls}>Bir sonraki adım</p>
            <h3 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
              Aklınızda bir proje mi var? <span className="text-zinc-500">Konuşalım.</span>
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="link-underline group mt-6 inline-flex items-center gap-1.5 pb-1 text-lg text-zinc-200 hover:text-white"
            >
              {contact.email}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <p className={eyebrowCls}>Sayfalar</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline pb-0.5 text-sm text-zinc-400 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={eyebrowCls}>Sosyal</p>
            <ul className="mt-5 space-y-3">
              {socials
                .filter((s) => s.visible)
                .map((s) => {
                  const Icon = getPlatform(s.platform).icon;
                  return (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-sm text-zinc-400 transition hover:text-white"
                      >
                        <Icon className="size-3.5 text-zinc-500 transition group-hover:text-violet-300" />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/[0.05] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {now.getFullYear()} {profile.name}. Tüm hakları saklıdır.
          </p>
          <p className="font-mono">
            {contact.location.split(',').pop().trim()} — {localTime} <span className="text-zinc-700">GMT+3</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
