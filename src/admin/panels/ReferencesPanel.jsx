import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Briefcase, ExternalLink, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { ACCENTS } from '../../lib/icons';
import { cn, hostname, isUrl } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Cover from '../../components/ui/Cover';
import { ConfirmDialog, EmptyState, Field, IconButton, ImageInput, Modal, PanelHeader, Toggle, fieldCls, inputCls } from '../ui';

const EMPTY = {
  name: '',
  category: '',
  year: new Date().getFullYear(),
  url: '',
  image: '',
  accent: 'violet',
  description: '',
  featured: false,
};

export default function ReferencesPanel() {
  const { data, add, update, remove, move } = useData();
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);
  const [query, setQuery] = useState('');

  const categories = useMemo(() => Array.from(new Set(data.references.map((r) => r.category).filter(Boolean))), [data.references]);
  const list = data.references.filter((r) =>
    `${r.name} ${r.category}`.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))
  );

  const open = (item) => {
    setEditing(item ?? 'new');
    setForm(item ? { ...EMPTY, ...item } : EMPTY);
    setErrors({});
  };
  const close = () => setEditing(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Proje / marka adı gerekli.';
    if (!isUrl(form.url)) err.url = 'Geçerli bir bağlantı girin (https://…).';
    const year = Number(form.year);
    if (!year || year < 1990 || year > 2100) err.year = 'Geçerli bir yıl girin.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const payload = {
      name: form.name.trim(),
      category: form.category.trim() || 'Diğer',
      year,
      url: form.url.trim(),
      image: form.image,
      accent: form.accent,
      description: form.description.trim(),
      featured: form.featured,
    };
    if (editing === 'new') {
      add('references', payload);
      toast.success('Referans eklendi', `“${payload.name}” Referanslar sayfasında.`);
    } else {
      update('references', editing.id, payload);
      toast.success('Referans güncellendi');
    }
    close();
  };

  return (
    <>
      <PanelHeader
        title="Referanslar"
        description="Tamamladığın projeler ve çalıştığın markalar."
        action={
          <Button onClick={() => open(null)}>
            <Plus className="size-4" /> Yeni referans
          </Button>
        }
      />

      {data.references.length > 0 && (
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-600" />
          <input className={cn(inputCls, 'pl-9')} placeholder="Ara…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}

      {data.references.length === 0 ? (
        <EmptyState icon={Briefcase} title="Henüz referans yok" text="İlk projeni ekleyerek portfolyonu oluştur." action={<Button onClick={() => open(null)}>Referans ekle</Button>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <ul className="divide-y divide-white/[0.05]">
            {list.map((r) => {
              const i = data.references.findIndex((x) => x.id === r.id);
              return (
                <li key={r.id} className="group flex items-center gap-4 p-3 pr-4 transition hover:bg-white/[0.015]">
                  <Cover name={r.name} image={r.image} accent={r.accent} compact className="h-14 w-20 shrink-0 rounded-lg border border-white/[0.06]" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-medium text-zinc-100">
                      <span className="truncate">{r.name}</span>
                      {r.featured && <Star className="size-3.5 shrink-0 fill-amber-300/80 text-amber-300/80" />}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {r.category} · {r.year} ·{' '}
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono hover:text-violet-300">
                        {hostname(r.url)}
                      </a>
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-0.5">
                    <span className="hidden sm:contents">
                      <IconButton icon={ArrowUp} label="Yukarı" disabled={i === 0 || !!query} onClick={() => move('references', r.id, -1)} />
                      <IconButton icon={ArrowDown} label="Aşağı" disabled={i === data.references.length - 1 || !!query} onClick={() => move('references', r.id, 1)} />
                      <IconButton icon={ExternalLink} label="Siteyi aç" onClick={() => window.open(r.url, '_blank', 'noopener')} />
                    </span>
                    <IconButton icon={Pencil} label="Düzenle" onClick={() => open(r)} />
                    <IconButton icon={Trash2} label="Sil" tone="danger" onClick={() => setToDelete(r)} />
                  </div>
                </li>
              );
            })}
            {list.length === 0 && <li className="p-8 text-center text-sm text-zinc-500">“{query}” için sonuç yok.</li>}
          </ul>
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={close}
        size="lg"
        title={editing === 'new' ? 'Yeni referans' : 'Referansı düzenle'}
        footer={
          <>
            <Button variant="ghost" onClick={close}>Vazgeç</Button>
            <Button type="submit" form="reference-form">{editing === 'new' ? 'Ekle' : 'Kaydet'}</Button>
          </>
        }
      >
        <form id="reference-form" onSubmit={submit} className="space-y-5">
          <Cover name={form.name || 'Önizleme'} image={form.image} accent={form.accent} className="aspect-[16/7] rounded-2xl border border-white/[0.06]" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Proje / marka adı" error={errors.name}>
              <input className={fieldCls(errors.name)} value={form.name} onChange={set('name')} />
            </Field>
            <Field label="Site bağlantısı" error={errors.url}>
              <input className={fieldCls(errors.url)} placeholder="https://" value={form.url} onChange={set('url')} />
            </Field>
            <Field label="Kategori">
              <input className={fieldCls()} list="ref-categories" placeholder="Örn. E-ticaret" value={form.category} onChange={set('category')} />
              <datalist id="ref-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Yıl" error={errors.year}>
              <input type="number" className={fieldCls(errors.year)} value={form.year} onChange={set('year')} />
            </Field>
          </div>

          <Field label="Logo / görsel" hint="Görsel eklemezsen markaya özel tipografik bir kapak oluşturulur.">
            <ImageInput value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />
          </Field>

          <Field label="Vurgu rengi">
            <div className="flex gap-2">
              {Object.entries(ACCENTS).map(([key, hex]) => (
                <button
                  key={key}
                  type="button"
                  title={key}
                  onClick={() => setForm((f) => ({ ...f, accent: key }))}
                  className={cn(
                    'size-8 rounded-full border-2 transition active:scale-90',
                    form.accent === key ? 'scale-110 border-white' : 'border-transparent hover:scale-105'
                  )}
                  style={{ background: hex, boxShadow: form.accent === key ? `0 0 16px ${hex}` : undefined }}
                />
              ))}
            </div>
          </Field>

          <Field label="Kısa açıklama">
            <textarea rows={2} className={`${fieldCls()} resize-none`} value={form.description} onChange={set('description')} />
          </Field>

          <Toggle checked={form.featured} onChange={(v) => setForm((f) => ({ ...f, featured: v }))} label="Anasayfada öne çıkar" description="Seçili işler bölümünde ilk 3 öne çıkan gösterilir." />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Referansı sil"
        message={`“${toDelete?.name ?? ''}” kalıcı olarak silinecek.`}
        onConfirm={() => {
          remove('references', toDelete.id);
          toast.success('Referans silindi');
        }}
      />
    </>
  );
}
