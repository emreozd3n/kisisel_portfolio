import { useState } from 'react';
import { ArrowDown, ArrowUp, Clock, Layers, Pencil, Plus, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { SERVICE_ICONS, getServiceIcon } from '../../lib/icons';
import { cn, pad } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { ConfirmDialog, EmptyState, Field, IconButton, Modal, PanelHeader, fieldCls } from '../ui';

const EMPTY = { title: '', icon: 'globe', summary: '', featuresText: '', timeline: '' };

export default function ServicesPanel() {
  const { data, add, update, remove, move } = useData();
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);

  const open = (item) => {
    setEditing(item ?? 'new');
    setForm(item ? { ...item, featuresText: (item.features || []).join('\n') } : EMPTY);
    setErrors({});
  };
  const close = () => setEditing(null);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.title.trim()) err.title = 'Başlık gerekli.';
    if (form.summary.trim().length < 10) err.summary = 'Açıklama en az 10 karakter olmalı.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const payload = {
      title: form.title.trim(),
      icon: form.icon,
      summary: form.summary.trim(),
      timeline: form.timeline.trim(),
      features: form.featuresText.split('\n').map((x) => x.trim()).filter(Boolean),
    };
    if (editing === 'new') {
      add('services', payload);
      toast.success('Hizmet eklendi', `“${payload.title}” Hizmetler sayfasında yayında.`);
    } else {
      update('services', editing.id, payload);
      toast.success('Hizmet güncellendi');
    }
    close();
  };

  return (
    <>
      <PanelHeader
        title="Hizmetler"
        description="Hizmetler sayfasında ve anasayfada listelenen yetenekler."
        action={
          <Button onClick={() => open(null)}>
            <Plus className="size-4" /> Yeni hizmet
          </Button>
        }
      />

      {data.services.length === 0 ? (
        <EmptyState icon={Layers} title="Henüz hizmet yok" text="Sunduğun ilk hizmeti ekle." action={<Button onClick={() => open(null)}>Hizmet ekle</Button>} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {data.services.map((s, i) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <div key={s.id} className="group flex flex-col rounded-2xl border border-white/[0.06] bg-ink-900/60 p-5 transition hover:border-white/[0.12]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-violet-300">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] text-zinc-600">{pad(i + 1)}</p>
                      <p className="font-medium text-white">{s.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 opacity-100 transition lg:opacity-0 lg:group-hover:opacity-100">
                    <IconButton icon={ArrowUp} label="Yukarı" disabled={i === 0} onClick={() => move('services', s.id, -1)} />
                    <IconButton icon={ArrowDown} label="Aşağı" disabled={i === data.services.length - 1} onClick={() => move('services', s.id, 1)} />
                    <IconButton icon={Pencil} label="Düzenle" onClick={() => open(s)} />
                    <IconButton icon={Trash2} label="Sil" tone="danger" onClick={() => setToDelete(s)} />
                  </div>
                </div>
                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">{s.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.features?.slice(0, 4).map((f) => (
                    <span key={f} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-xs text-zinc-400">
                      {f}
                    </span>
                  ))}
                </div>
                {s.timeline && (
                  <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-zinc-500">
                    <Clock className="size-3.5" /> {s.timeline}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={close}
        size="lg"
        title={editing === 'new' ? 'Yeni hizmet' : 'Hizmeti düzenle'}
        footer={
          <>
            <Button variant="ghost" onClick={close}>Vazgeç</Button>
            <Button type="submit" form="service-form">{editing === 'new' ? 'Ekle' : 'Kaydet'}</Button>
          </>
        }
      >
        <form id="service-form" onSubmit={submit} className="space-y-5">
          <Field label="İkon">
            <div className="grid grid-cols-8 gap-2">
              {Object.entries(SERVICE_ICONS).map(([key, Icon]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setForm({ ...form, icon: key })}
                  className={cn(
                    'grid aspect-square place-items-center rounded-xl border transition active:scale-90',
                    form.icon === key
                      ? 'border-violet-400/50 bg-violet-500/15 text-white'
                      : 'border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-zinc-200'
                  )}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
            <Field label="Başlık" error={errors.title}>
              <input className={fieldCls(errors.title)} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Süre" hint="Örn. 2 – 4 hafta">
              <input className={fieldCls()} value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
            </Field>
          </div>
          <Field label="Açıklama" error={errors.summary}>
            <textarea rows={3} className={`${fieldCls(errors.summary)} resize-none`} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          </Field>
          <Field label="Kapsam / özellikler" hint="Her satıra bir madde yaz.">
            <textarea
              rows={5}
              className={fieldCls()}
              placeholder={'Özel arayüz tasarımı\nSEO optimizasyonu'}
              value={form.featuresText}
              onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
            />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Hizmeti sil"
        message={`“${toDelete?.title ?? ''}” hizmeti kalıcı olarak silinecek.`}
        onConfirm={() => {
          remove('services', toDelete.id);
          toast.success('Hizmet silindi');
        }}
      />
    </>
  );
}
