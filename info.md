# Proje Bilgileri

Portfolyo sitesi ve yönetim paneli hazır, sorunsuz derleniyor. Geliştirme sunucusu **http://localhost:5173** adresinde çalışır.

Tarayıcıda yapılan testte konsol hatası çıkmadı. Denenen ve çalışan akışlar:
- Beş sayfa arasında geçiş.
- İletişim formu: boş gönderince hata mesajları çıkıyor, doğru doldurulunca başarı ekranı geliyor.
- Panele giriş, yeni referans ekleme (bildirim çıkıyor), gelen mesajın panelde görünmesi.
- Yeni referansın sitedeki Referanslar sayfasında belirmesi.

Ekran görüntülerinde iki görsel sorun görüldü ve düzeltildi:
- **Kimlik kartı yazıları:** Sayfa Türkçe olduğu için kartın üstündeki İngilizce etiketler "DİGİTAL ID", "VALİD THRU" diye yanlış büyük harfe çevriliyordu.
- **Kart askısı:** Dar ekranlarda askı şeridi yukarıdaki istatistiklerin üstüne taşıyordu. Artık sadece geniş ekranda, kart sağ sütundayken görünüyor.

## Çalıştırma

```bash
npm install
npm run dev
```

PowerShell'de `npm` komutu engellenirse `npm.cmd run dev` kullanın.

## Neler var

- **Teknoloji:** Vite + React 19, Tailwind CSS v4, Framer Motion, Lucide ikonları (sosyal medya logoları react-icons'tan). Fontlar Plus Jakarta Sans ve JetBrains Mono.
- **Sayfalar:** `/`, `/referanslar`, `/hizmetler`, `/hakkimda`, `/iletisim`, `/admin`
- **Kimlik kartı:** [IdCard.jsx](src/components/IdCard.jsx). İçinde şunlar var:
  - fareyle eğilen 3D kart ve imleci takip eden ışık yansıması
  - kenarda dönen ince neon çizgi
  - askıdan sallanarak gelen giriş animasyonu
  - müsaitlik göstergesi ve barkod
- **Yönetim paneli:** `/admin` adresinden ya da her sayfada `Ctrl + Shift + A` ile açılıyor.
  - **Sosyal medya, hizmetler, referanslar:** ekleme, düzenleme, silme ve sıralama. Sosyal hesaplar ayrıca gizlenebiliyor.
  - **Profil ve Hakkımda:** bilgiler, avatar ve metinler düzenlenebiliyor.
  - **Mesajlar:** iletişim formundan gelenler burada okunuyor.
  - **Ayarlar:** şifre değiştirme, JSON yedek alma/geri yükleme, sıfırlama.
  - Her işlemde bildirim, silmeden önce onay penceresi var.
- **Veri:** Her şey tarayıcıda (localStorage) saklanıyor; [DataContext.jsx](src/context/DataContext.jsx) yönetiyor. Değişiklikler anında görünüyor, site başka bir sekmede açıksa orada da güncelleniyor.

## Bilmeniz gerekenler

- **Panel şifresi:** Varsayılan şifre `admin123`. Bu giriş gerçek bir güvenlik sağlamıyor, çünkü şifre tarayıcıda tutuluyor. Siteyi yayına alırken Supabase ya da Firebase gibi gerçek bir backend gerekir. Veri işlemleri tek dosyada toplandığı için bu geçiş kolay.
- **Örnek içerik:** İsim (Emre Özden), iletişim bilgileri ve referanslar yer tutucu. Bağlantıların hepsi `example.com`'a gidiyor. Hepsini panelden düzenleyebilirsiniz.
- **Görseller:** Bir referansa görsel eklemezseniz markaya özel yazılı bir kapak üretiliyor. Yüklenen görseller tarayıcı depolamasını doldurmasın diye otomatik küçültülüyor.

Kurulum, klasör yapısı ve yayına alma notları [README.md](README.md) dosyasında.

Claude Opus 5.5