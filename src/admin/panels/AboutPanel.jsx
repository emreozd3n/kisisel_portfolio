import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { uid } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { Card, Field, IconButton, PanelHeader, fieldCls } from '../ui';

export default function AboutPanel() {
  const { data, setSection } = useData();
  const toast = useToast();
  const [about, setAbout] = useState(() => ({
    ...data.about,
    skills: data.about.skills.map((s) => ({ ...s, itemsText: s.items.join(', ') })),
  }));

  const set = (k) => (e) => setAbout((a) => ({ ...a, [k]: e.target.value }));
  const setSkill = (id, patch) => setAbout((a) => ({ ...a, skills: a.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  const setExp = (id, patch) => setAbout((a) => ({ ...a, experience: a.experience.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));

  const save = (e) => {
    e.preventDefault();
    const skills = about.skills
      .filter((s) => s.group.trim())
      .map(({ itemsText, ...s }) => ({
        ...s,
        items: itemsText.split(',').map((x) => x.trim()).filter(Boolean),
      }));
    const experience = about.experience.filter((x) => x.role.trim());
    setSection('about', { intro: about.intro, story: about.story, vision: about.vision, skills, experience });
    toast.success('Hakkımda sayfası güncellendi');
  };

  return (
    <form onSubmit={save}>
      <PanelHeader
        title="Hakkımda"
        description="Hikâyen, vizyonun, yetenek setin ve deneyimlerin."
        action={
          <Button type="submit">
            <Save className="size-4" /> Kaydet
          </Button>
        }
      />

      <div className="space-y-4">
        <Card className="space-y-5 p-6">
          <Field label="Giriş cümlesi" hint="Sayfanın büyük başlığı olarak görünür.">
            <textarea rows={2} className={`${fieldCls()} resize-none`} value={about.intro} onChange={set('intro')} />
          </Field>
          <Field label="Kişisel hikâye" hint="Paragrafları boş bir satırla ayır.">
            <textarea rows={9} className={`${fieldCls()} leading-relaxed`} value={about.story} onChange={set('story')} />
          </Field>
          <Field label="Vizyon">
            <textarea rows={3} className={`${fieldCls()} resize-none`} value={about.vision} onChange={set('vision')} />
          </Field>
        </Card>

        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Yetenek grupları</h2>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setAbout((a) => ({ ...a, skills: [...a.skills, { id: uid('sk'), group: '', itemsText: '' }] }))}
            >
              <Plus className="size-3.5" /> Grup ekle
            </Button>
          </div>
          <div className="space-y-3">
            {about.skills.map((s) => (
              <div key={s.id} className="grid items-start gap-3 sm:grid-cols-[180px_1fr_auto]">
                <input className={fieldCls()} placeholder="Grup adı" value={s.group} onChange={(e) => setSkill(s.id, { group: e.target.value })} />
                <input
                  className={fieldCls()}
                  placeholder="Virgülle ayır: React, Next.js, …"
                  value={s.itemsText}
                  onChange={(e) => setSkill(s.id, { itemsText: e.target.value })}
                />
                <div className="pt-1">
                  <IconButton icon={Trash2} label="Grubu sil" tone="danger" onClick={() => setAbout((a) => ({ ...a, skills: a.skills.filter((x) => x.id !== s.id) }))} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Deneyim</h2>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                setAbout((a) => ({
                  ...a,
                  experience: [...a.experience, { id: uid('ex'), period: '', role: '', company: '', description: '' }],
                }))
              }
            >
              <Plus className="size-3.5" /> Deneyim ekle
            </Button>
          </div>
          <div className="space-y-4">
            {about.experience.map((x) => (
              <div key={x.id} className="rounded-xl border border-white/[0.06] p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <input className={fieldCls()} placeholder="Dönem (2023 — Bugün)" value={x.period} onChange={(e) => setExp(x.id, { period: e.target.value })} />
                  <input className={fieldCls()} placeholder="Rol" value={x.role} onChange={(e) => setExp(x.id, { role: e.target.value })} />
                  <input className={fieldCls()} placeholder="Şirket" value={x.company} onChange={(e) => setExp(x.id, { company: e.target.value })} />
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <textarea
                    rows={2}
                    className={`${fieldCls()} resize-none`}
                    placeholder="Kısa açıklama"
                    value={x.description}
                    onChange={(e) => setExp(x.id, { description: e.target.value })}
                  />
                  <IconButton icon={Trash2} label="Deneyimi sil" tone="danger" onClick={() => setAbout((a) => ({ ...a, experience: a.experience.filter((y) => y.id !== x.id) }))} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </form>
  );
}
