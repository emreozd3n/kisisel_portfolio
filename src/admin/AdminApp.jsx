import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Eye,
  EyeOff,
  Inbox,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Settings,
  Share2,
  User,
  BookOpen,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { cn, initials } from '../lib/utils';
import Button from '../components/ui/Button';
import { inputCls } from '../components/ui/styles';
import Overview from './panels/Overview';
import ProfilePanel from './panels/ProfilePanel';
import AboutPanel from './panels/AboutPanel';
import SocialsPanel from './panels/SocialsPanel';
import ServicesPanel from './panels/ServicesPanel';
import ReferencesPanel from './panels/ReferencesPanel';
import MessagesPanel from './panels/MessagesPanel';
import SettingsPanel from './panels/SettingsPanel';

const AUTH_KEY = 'portfolio:admin-auth';

function Login({ onSuccess }) {
  const { data } = useData();
  const toast = useToast();
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    if (pw === data.settings.adminPassword) {
      sessionStorage.setItem(AUTH_KEY, '1');
      toast.success('Hoş geldin', 'Yönetim paneline giriş yapıldı.');
      onSuccess();
    } else {
      setShake((s) => s + 1);
      toast.error('Hatalı şifre', 'Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="pointer-events-none fixed left-1/2 top-[-20rem] h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(109_76_221/0.14),transparent)]" />
      <motion.form
        key={shake}
        onSubmit={submit}
        initial={shake ? { x: 0 } : { opacity: 0, y: 16 }}
        animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: shake ? 0.4 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full max-w-sm rounded-3xl p-8"
      >
        <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-violet-300">
          <Lock className="size-5" />
        </span>
        <h1 className="mt-6 text-xl font-semibold tracking-tight text-white">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-zinc-500">Devam etmek için şifrenizi girin.</p>
        <div className="relative mt-6">
          <input
            autoFocus
            type={show ? 'text' : 'password'}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Şifre"
            className={cn(inputCls, 'pr-11')}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 hover:text-white"
            aria-label={show ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <Button type="submit" className="mt-4 w-full">
          Giriş yap
        </Button>
        <p className="mt-6 text-center text-xs text-zinc-600">
          Varsayılan şifre: <span className="font-mono text-zinc-400">admin123</span>
        </p>
        <Link to="/" className="mt-2 block text-center text-xs text-zinc-500 hover:text-white">
          ← Siteye dön
        </Link>
      </motion.form>
    </div>
  );
}

export default function AdminApp() {
  const { data } = useData();
  const toast = useToast();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  const unread = data.messages.filter((m) => !m.read).length;

  const NAV = [
    { to: '/admin', label: 'Genel Bakış', icon: LayoutDashboard, end: true },
    { to: '/admin/profil', label: 'Profil & İletişim', icon: User },
    { to: '/admin/hakkimda', label: 'Hakkımda', icon: BookOpen },
    { to: '/admin/sosyal', label: 'Sosyal Medya', icon: Share2, count: data.socials.length },
    { to: '/admin/hizmetler', label: 'Hizmetler', icon: Layers, count: data.services.length },
    { to: '/admin/referanslar', label: 'Referanslar', icon: Briefcase, count: data.references.length },
    { to: '/admin/mesajlar', label: 'Mesajlar', icon: Inbox, badge: unread },
    { to: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
  ];

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    toast.info('Çıkış yapıldı');
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/90 backdrop-blur-xl lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 px-5 py-4 lg:py-6">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-semibold text-white">
                {initials(data.profile.name)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">Yönetim</p>
                <p className="text-xs text-zinc-500">{data.profile.name}</p>
              </div>
            </div>
            <div className="flex gap-1 lg:hidden">
              <Button as={Link} to="/" variant="ghost" size="icon" aria-label="Siteyi görüntüle">
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Çıkış yap">
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  cn(
                    'relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] transition-colors duration-200',
                    isActive ? 'text-white' : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-200'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="admin-nav"
                        className="absolute inset-0 rounded-xl border border-white/[0.07] bg-white/[0.05]"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <n.icon className={cn('relative size-4', isActive && 'text-violet-300')} />
                    <span className="relative whitespace-nowrap">{n.label}</span>
                    {n.badge > 0 && (
                      <span className="relative ml-auto rounded-full bg-violet-500 px-1.5 py-px text-[10.5px] font-semibold text-white">
                        {n.badge}
                      </span>
                    )}
                    {!n.badge && n.count !== undefined && (
                      <span className="relative ml-auto hidden font-mono text-[11px] text-zinc-600 lg:inline">{n.count}</span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden space-y-1 border-t border-white/[0.06] p-3 lg:block">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] text-zinc-500 transition hover:bg-white/[0.03] hover:text-white"
            >
              <ArrowUpRight className="size-4" /> Siteyi görüntüle
            </Link>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-300"
            >
              <LogOut className="size-4" /> Çıkış yap
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="profil" element={<ProfilePanel />} />
            <Route path="hakkimda" element={<AboutPanel />} />
            <Route path="sosyal" element={<SocialsPanel />} />
            <Route path="hizmetler" element={<ServicesPanel />} />
            <Route path="referanslar" element={<ReferencesPanel />} />
            <Route path="mesajlar" element={<MessagesPanel />} />
            <Route path="ayarlar" element={<SettingsPanel />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
