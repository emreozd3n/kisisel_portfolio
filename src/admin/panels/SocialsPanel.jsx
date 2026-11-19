import { useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Share2, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PLATFORMS, getPlatform } from '../../lib/icons';
import { cn, isUrl } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { ConfirmDialog, EmptyState, Field, IconButton, Modal, PanelHeader, Toggle, fieldCls } from '../ui';

const EMPTY = { platform: 'instagram', label: 'Instagram', handle: '', url: '', visible: true };

export default function SocialsPanel() {
  const { data, add, update, remove, move } = useData();
  const toast = useToast();
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);

  const open = (item) => {
    setEditing(item ?? 'new');
    setForm(item ? { ...EMPTY, ...item } : EMPTY);
    setErrors({});
  };
  const close = () => setEditing(null);

  const pickPlatform = (key) =>
    setForm((f) => {
      const wasDefault = !f.label || f.label === PLATFORMS[f.platform]?.label;
      return { ...f, platform: key, label: wasDefault ? PLATFORMS[key].label : f.label };
    });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.label.trim()) err.label = 'Görünen ad gerekli.';
    if (!isUrl(form.url)) err.url = 'Geçerli bir bağlantı girin (https:// ile başlamalı).';
    setErrors(err);
    if (Object.keys(err).length) return;
    const payload = { ...form, label: form.label.trim(), url: form.url.trim(), handle: form.handle.trim() };
    if (editing === 'new') {
      const { id, ...rest } = payload;
      add('socials', rest);
      toast.success('Hesap eklendi', `${payload.label} kimlik kartına eklendi.`);
    } else {
      update('socials', editing.id, payload);
      toast.success('Hesap güncellendi');
    }
    close();
  };

  return (
    <>
      <PanelHeader
        title="Sosyal Medya"
        description="Kimlik kartında, iletişim sayfasında ve footer’da görünen hesaplar."
        action={
          <Button onClick={() => open(null)}>
            <Plus className="size-4" /> Yeni hesap
          </Button>
        }
      />

      {data.socials.length === 0 ? (
        <EmptyState icon={Share2} title="Henüz hesap yok" text="İlk sosyal medya hesabını ekleyerek başla." action={<Button onClick={() => open(null)}>Hesap ekle</Button>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-left text-xs text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Bağlantı</th>
                <th className="px-4 py-3 font-medium">Durum</th>
                <th className="px-4 py-3 text-right font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {data.socials.map((s, i) => {
                const Icon = getPlatform(s.platform).icon;
                return (
                  <tr key={s.id} className="transition hover:bg-white/[0.015]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-zinc-300">
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-zinc-100">{s.label}</p>
                          <p className="truncate text-xs text-zinc-500">{s.handle || getPlatform(s.platform).label}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden max-w-[260px] px-4 py-3 md:table-cell">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="block truncate font-mono text-xs text-zinc-500 hover:text-violet-300">
                        {s.url}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          update('socials', s.id, { visible: !s.visible });
                          toast.info(s.visible ? `${s.label} gizlendi` : `${s.label} görünür`);
                        }}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition active:scale-95',
                          s.visible ? 'bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15' : 'bg-white/[0.05] text-zinc-500 hover:bg-white/[0.08]'
                        )}
                      >
                        {s.visible ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                        {s.visible ? 'Görünür' : 'Gizli'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-0.5">
                        <IconButton icon={ArrowUp} label="Yukarı taşı" disabled={i === 0} onClick={() => move('socials', s.id, -1)} />
                        <IconButton icon={ArrowDown} label="Aşağı taşı" disabled={i === data.socials.length - 1} onClick={() => move('socials', s.id, 1)} />
                        <IconButton icon={Pencil} label="Düzenle" onClick={() => open(s)} />
                        <IconButton icon={Trash2} label="Sil" tone="danger" onClick={() => setToDelete(s)} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={close}
        title={editing === 'new' ? 'Yeni sosyal medya hesabı' : 'Hesabı düzenle'}
        footer={
          <>
            <Button variant="ghost" onClick={close}>Vazgeç</Button>
            <Button type="submit" form="social-form">{editing === 'new' ? 'Ekle' : 'Kaydet'}</Button>
          </>
        }
      >
        <form id="social-form" onSubmit={submit} className="space-y-5">
          <Field label="Platform">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {Object.entries(PLATFORMS).map(([key, P]) => (
                <button
                  key={key}
                  type="button"
                  title={P.label}
                  onClick={() => pickPlatform(key)}
                  className={cn(
                    'grid aspect-square place-items-center rounded-xl border transition active:scale-90',
                    form.platform === key
                      ? 'border-violet-400/50 bg-violet-500/15 text-white'
                      : 'border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-zinc-200'
                  )}
                >
                  <P.icon className="size-4" />
                </button>
              ))}
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Görünen ad" error={errors.label}>
              <input className={fieldCls(errors.label)} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            </Field>
            <Field label="Kullanıcı adı" hint="İsteğe bağlı, örn. @kullanici">
              <input className={fieldCls()} value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
            </Field>
          </div>
          <Field label="Profil bağlantısı" error={errors.url}>
            <input className={fieldCls(errors.url)} placeholder="https://" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          </Field>
          <Toggle checked={form.visible} onChange={(v) => setForm({ ...form, visible: v })} label="Sitede göster" />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Hesabı sil"
        message={`“${toDelete?.label ?? ''}” hesabı kalıcı olarak silinecek.`}
        onConfirm={() => {
          remove('socials', toDelete.id);
          toast.success('Hesap silindi');
        }}
      />
    </>
  );
}
