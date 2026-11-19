import Navbar from './Navbar';
import Footer from './Footer';

export default function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Arka plan: tek, kontrollü bir ışık kaynağı */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-22rem] h-[44rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(109_76_221/0.16),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
