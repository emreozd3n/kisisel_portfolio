import { useRef, useState } from 'react';
import { Download, KeyRound, RotateCcw, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import { Card, ConfirmDialog, Field, PanelHeader, fieldCls } from '../ui';

export default function SettingsPanel() {
  const { data, setSection, replaceAll, reset } = useData();
  const toast = useToast();
  const fileRef = useRef(null);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [confirmReset, setConfirmReset] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    const err = {};
    if (pw.current !== data.settings.adminPassword) err.current = 'Mevcut şifre hatalı.';
    if (pw.next.length < 6) err.next = 'Yeni şifre en az 6 karakter olmalı.';
    if (pw.next !== pw.confirm) err.confirm = 'Şifreler eşleşmiyor.';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSection('settings', { adminPassword: pw.next });
    setPw({ current: '', next: '', confirm: '' });
    toast.success('Şifre güncellendi');
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolyo-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Yedek indirildi');
  };

  const importData = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed.profile || !Array.isArray(parsed.services)) throw new Error();
      replaceAll(parsed);
      toast.success('Yedek geri yüklendi', 'Tüm içerik güncellendi.');
    } catch {
      toast.error('Geçersiz dosya', 'Bu dosya bir portfolyo yedeği gibi görünmüyor.');
    }
  };

  return (
    <>
      <PanelHeader title="Ayarlar" description="Güvenlik, yedekleme ve sıfırlama." />

      <div className="space-y-4">
        <Card className="p-6">
          <div className="mb-5 flex items-center gap-2">
            <KeyRound className="size-4 text-violet-300" />
            <h2 className="text-sm font-semibold text-white">Panel şifresi</h2>
          </div>
          <form onSubmit={changePassword} className="grid gap-4 sm:grid-cols-3">
            <Field label="Mevcut şifre" error={errors.current}>
              <input type="password" className={fieldCls(errors.current)} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            </Field>
            <Field label="Yeni şifre" error={errors.next}>
              <input type="password" className={fieldCls(errors.next)} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
            </Field>
            <Field label="Yeni şifre (tekrar)" error={errors.confirm}>
              <input type="password" className={fieldCls(errors.confirm)} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
            </Field>
            <div className="sm:col-span-3">
              <Button type="submit" variant="secondary">Şifreyi değiştir</Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-white">Yedekleme</h2>
          <p className="mt-1 text-sm text-zinc-500">Tüm içeriği JSON olarak indir veya daha önce aldığın bir yedeği geri yükle.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={exportData}>
              <Download className="size-4" /> Yedeği indir
            </Button>
            <Button variant="secondary" onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" /> Yedeği geri yükle
            </Button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importData} />
          </div>
        </Card>

        <Card className="border-rose-500/15 p-6">
          <h2 className="text-sm font-semibold text-rose-300">Tehlikeli bölge</h2>
          <p className="mt-1 text-sm text-zinc-500">Tüm içerik varsayılan örnek verilere döner. Bu işlem geri alınamaz.</p>
          <Button variant="danger" className="mt-5" onClick={() => setConfirmReset(true)}>
            <RotateCcw className="size-4" /> Varsayılanlara sıfırla
          </Button>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Tüm veriler sıfırlansın mı?"
        message="Profil, sosyal hesaplar, hizmetler, referanslar ve mesajlar varsayılan hâline döner."
        confirmLabel="Sıfırla"
        onConfirm={() => {
          reset();
          toast.success('Veriler sıfırlandı');
        }}
      />
    </>
  );
}
