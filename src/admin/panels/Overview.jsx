import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Inbox, Layers, Share2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../lib/utils';
import { Card, PanelHeader } from '../ui';

export default function Overview() {
  const { data } = useData();
  const unread = data.messages.filter((m) => !m.read).length;

  const stats = [
    { label: 'Referanslar', value: data.references.length, icon: Briefcase, to: '/admin/referanslar' },
    { label: 'Hizmetler', value: data.services.length, icon: Layers, to: '/admin/hizmetler' },
    { label: 'Sosyal hesaplar', value: data.socials.length, icon: Share2, to: '/admin/sosyal' },
    { label: 'Okunmamış mesaj', value: unread, icon: Inbox, to: '/admin/mesajlar', highlight: unread > 0 },
  ];

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';

  return (
    <>
      <PanelHeader
        title={`${greet}, ${data.profile.name.split(' ')[0]}.`}
        description="Sitendeki tüm içerikleri buradan yönetebilirsin. Değişiklikler anında yayına yansır."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group rounded-2xl border border-white/[0.06] bg-ink-900/60 p-5 transition hover:-translate-y-0.5 hover:border-white/[0.12]"
          >
            <div className="flex items-center justify-between">
              <s.icon className={`size-4 ${s.highlight ? 'text-violet-300' : 'text-zinc-500'}`} />
              <ArrowUpRight className="size-4 text-zinc-700 transition group-hover:text-zinc-300" />
            </div>
            <p className="mt-6 text-3xl font-semibold tracking-tight text-white">{s.value}</p>
            <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Son mesajlar</h2>
            <Link to="/admin/mesajlar" className="text-xs text-zinc-500 hover:text-white">
              Tümü →
            </Link>
          </div>
          {data.messages.length === 0 ? (
            <p className="mt-6 text-sm text-zinc-500">Henüz mesaj yok.</p>
          ) : (
            <ul className="mt-4 divide-y divide-white/[0.05]">
              {data.messages.slice(0, 4).map((m) => (
                <li key={m.id} className="flex items-start gap-3 py-3">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${m.read ? 'bg-zinc-700' : 'bg-violet-400'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-medium text-zinc-200">{m.name}</span>
                      <span className="shrink-0 text-xs text-zinc-600">{formatDate(m.createdAt)}</span>
                    </p>
                    <p className="truncate text-sm text-zinc-500">{m.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-white">Hızlı ipuçları</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-500">
            <li>
              Panele her yerden <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-300">Ctrl</kbd> +{' '}
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-300">Shift</kbd> +{' '}
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-300">A</kbd> ile ulaşabilirsin.
            </li>
            <li>Başlıkta bir ifadeyi <span className="font-mono text-zinc-300">*yıldız*</span> içine alırsan soluk ve italik görünür.</li>
            <li>Siteyi başka bir sekmede açık tut — buradaki değişiklikler orada da anında güncellenir.</li>
            <li>Ayarlar sekmesinden tüm içeriği JSON olarak yedekleyebilirsin.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
