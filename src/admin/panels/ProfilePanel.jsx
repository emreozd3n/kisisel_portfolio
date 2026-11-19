import { useState } from 'react';
import { Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { isEmail } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { Card, Field, ImageInput, PanelHeader, Toggle, fieldCls } from '../ui';

export default function ProfilePanel() {
  const { data, setSection } = useData();
  const toast = useToast();
  const [profile, setProfile] = useState(data.profile);
  const [contact, setContact] = useState(data.contact);
  const [errors, setErrors] = useState({});

  const p = (k) => (e) => setProfile((s) => ({ ...s, [k]: e.target.value }));
  const c = (k) => (e) => setContact((s) => ({ ...s, [k]: e.target.value }));

  const dirty = JSON.stringify(profile) !== JSON.stringify(data.profile) || JSON.stringify(contact) !== JSON.stringify(data.contact);

  const save = (e) => {
    e.preventDefault();
    const err = {};
    if (!profile.name.trim()) err.name = 'İsim gerekli.';
    if (!profile.title.trim()) err.title = 'Unvan gerekli.';
    if (!isEmail(contact.email)) err.email = 'Geçerli bir e-posta girin.';
    const since = Number(profile.since);
    if (!since || since < 1950 || since > new Date().getFullYear()) err.since = 'Geçerli bir yıl girin.';
    setErrors(err);
    if (Object.keys(err).length) return toast.error('Kaydedilemedi', 'Lütfen hatalı alanları düzeltin.');
    setSection('profile', { ...profile, since });
    setSection('contact', contact);
    toast.success('Profil güncellendi', 'Değişiklikler sitede yayında.');
  };

  return (
    <form onSubmit={save}>
      <PanelHeader
        title="Profil & İletişim"
        description="Kimlik kartında, anasayfada ve iletişim sayfasında görünen bilgiler."
        action={
          <Button type="submit" disabled={!dirty}>
            <Save className="size-4" /> Değişiklikleri kaydet
          </Button>
        }
      />

      <div className="space-y-4">
        <Card className="p-6">
          <h2 className="mb-5 text-sm font-semibold text-white">Kimlik kartı</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Profil fotoğrafı" className="sm:col-span-2" hint="Kare bir görsel önerilir.">
              <ImageInput value={profile.avatar} onChange={(v) => setProfile((s) => ({ ...s, avatar: v }))} maxSize={600} rounded="rounded-2xl" />
            </Field>
            <Field label="Ad Soyad" error={errors.name}>
              <input className={fieldCls(errors.name)} value={profile.name} onChange={p('name')} />
            </Field>
            <Field label="Unvan" error={errors.title}>
              <input className={fieldCls(errors.title)} value={profile.title} onChange={p('title')} />
            </Field>
            <Field label="Kart konumu" hint="Kartta kısa gösterim, örn. İstanbul, TR">
              <input className={fieldCls()} value={profile.location} onChange={p('location')} />
            </Field>
            <Field label="Başlangıç yılı" error={errors.since}>
              <input type="number" className={fieldCls(errors.since)} value={profile.since} onChange={p('since')} />
            </Field>
            <Field label="Kart numarası">
              <input className={`${fieldCls()} font-mono`} value={profile.idNumber} onChange={p('idNumber')} />
            </Field>
            <div className="sm:self-end">
              <Toggle
                checked={profile.available}
                onChange={(v) => setProfile((s) => ({ ...s, available: v }))}
                label="Yeni projelere açığım"
                description="Kartta yeşil durum göstergesi"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 text-sm font-semibold text-white">Anasayfa karşılama</h2>
          <div className="grid gap-5">
            <Field label="Başlık" hint="Soluk/italik görünmesini istediğin kısmı *yıldız* içine al.">
              <input className={fieldCls()} value={profile.headline} onChange={p('headline')} />
            </Field>
            <Field label="Kısa tanıtım">
              <textarea rows={3} className={`${fieldCls()} resize-none`} value={profile.intro} onChange={p('intro')} />
            </Field>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 text-sm font-semibold text-white">İletişim bilgileri</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="E-posta" error={errors.email}>
              <input className={fieldCls(errors.email)} value={contact.email} onChange={c('email')} />
            </Field>
            <Field label="Telefon">
              <input className={fieldCls()} value={contact.phone} onChange={c('phone')} />
            </Field>
            <Field label="Adres / Konum">
              <input className={fieldCls()} value={contact.location} onChange={c('location')} />
            </Field>
            <Field label="Çalışma saatleri">
              <input className={fieldCls()} value={contact.hours} onChange={c('hours')} />
            </Field>
            <Field label="Yanıt süresi" hint="Örn. 24 saat içinde">
              <input className={fieldCls()} value={contact.responseTime} onChange={c('responseTime')} />
            </Field>
          </div>
        </Card>
      </div>
    </form>
  );
}
