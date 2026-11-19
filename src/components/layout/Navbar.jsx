import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { cn, initials } from '../../lib/utils';
import Button from '../ui/Button';

export const NAV_LINKS = [
  { to: '/', label: 'Anasayfa' },
  { to: '/referanslar', label: 'Referanslar' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/hakkimda', label: 'Hakkımda' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const { data } = useData();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          'relative mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 py-2 transition-all duration-500',
          scrolled || open
            ? 'border-white/[0.07] bg-ink-950/75 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border-transparent'
        )}
      >
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-semibold text-white transition group-hover:border-violet-400/40 group-hover:shadow-[0_0_20px_-6px_rgb(167_139_250/0.8)]">
            {initials(data.profile.name)}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-tight text-white">{data.profile.name}</span>
            <span className="block text-xs text-zinc-500">{data.profile.title}</span>
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button as={Link} to="/iletisim" size="sm" variant="secondary" className="hidden md:inline-flex">
            Proje başlat
            <ArrowUpRight className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/[0.07] bg-ink-950/90 p-2 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i }}
              >
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition',
                      isActive ? 'bg-white/[0.06] text-white' : 'text-zinc-400 hover:bg-white/[0.03] hover:text-white'
                    )
                  }
                >
                  {l.label}
                  <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
