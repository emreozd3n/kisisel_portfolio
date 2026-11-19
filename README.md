# Kişisel Portfolyo + Yönetim Paneli

Koyu temalı, minimalist kişisel portfolyo sitesi ve içerik yönetim paneli.
**Vite + React 19 · Tailwind CSS v4 · Framer Motion · Lucide / React Icons · React Router**

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # üretim çıktısı → dist/
npm run preview
```

> Windows PowerShell'de `npm` script hatası alırsanız `npm.cmd run dev` kullanın.

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | Karşılama + Dijital Kimlik Kartı, seçili işler, hizmet özeti |
| `/referanslar` | Kategori filtreli referans grid'i, "Siteye Git" bağlantıları |
| `/hizmetler` | Hizmet kartları + çalışma süreci |
| `/hakkimda` | Hikâye, vizyon, yetenekler, deneyim |
| `/iletisim` | İletişim bilgileri + validasyonlu mesaj formu |
| `/admin` | Yönetim paneli (kısayol: `Ctrl + Shift + A`) |

## Yönetim Paneli

Varsayılan şifre: **`admin123`** (Ayarlar sekmesinden değiştirilebilir).

- Profil & iletişim bilgileri, avatar yükleme
- Hakkımda: hikâye, vizyon, yetenek grupları, deneyimler
- Sosyal medya: ekle / düzenle / sil / gizle / sırala
- Hizmetler: ekle / düzenle / sil / sırala, ikon seçimi
- Referanslar: ekle / düzenle / sil / sırala, görsel yükleme, öne çıkarma
- Mesajlar: iletişim formundan gelenler, okundu/okunmadı, yanıtla
- Ayarlar: şifre, JSON yedek al / geri yükle, sıfırla

## Veri katmanı

Tüm içerik `src/context/DataContext.jsx` üzerinden yönetilir ve `localStorage`'a kaydedilir.
Değişiklikler anında arayüze, açık olan diğer sekmelere de (`storage` olayı) yansır.
Başlangıç içeriği: `src/data/defaultData.js`.

> ⚠️ Panel kimlik doğrulaması bir **simülasyondur** (şifre tarayıcıda tutulur). Gerçek yayında
> gerçek bir backend (ör. Supabase, Firebase, Next.js API + veritabanı) ve sunucu taraflı
> kimlik doğrulama kullanın; `DataContext` içindeki `add/update/remove` fonksiyonları
> API çağrılarıyla kolayca değiştirilebilir.

## Klasör yapısı

```
src/
  admin/            AdminApp (giriş + kabuk), ui.jsx, panels/*
  components/       IdCard, ReferenceCard, layout/*, ui/*
  context/          DataContext, ToastContext
  data/             defaultData.js
  lib/              utils.js, icons.js
  pages/            Home, References, Services, About, Contact, NotFound
```

## Yayına alma

SPA olduğu için sunucuda tüm yolların `index.html`'e yönlendirilmesi gerekir
(Netlify: `_redirects` → `/* /index.html 200`, Vercel bunu otomatik yapar).
