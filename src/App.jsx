import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SiteLayout from './components/layout/SiteLayout';
import Page from './components/layout/Page';
import Home from './pages/Home';
import References from './pages/References';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
const AdminApp = lazy(() => import('./admin/AdminApp'));

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Gizli kısayol: Ctrl/Cmd + Shift + A → yönetim paneli
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  if (location.pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-zinc-600">Yükleniyor…</div>}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <SiteLayout>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0 })}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page title="Anasayfa"><Home /></Page>} />
          <Route path="/referanslar" element={<Page title="Referanslar"><References /></Page>} />
          <Route path="/hizmetler" element={<Page title="Hizmetler"><Services /></Page>} />
          <Route path="/hakkimda" element={<Page title="Hakkımda"><About /></Page>} />
          <Route path="/iletisim" element={<Page title="İletişim"><Contact /></Page>} />
          <Route path="*" element={<Page title="Sayfa bulunamadı"><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
    </SiteLayout>
  );
}
