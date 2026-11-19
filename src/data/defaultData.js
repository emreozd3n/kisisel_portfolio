export const defaultData = {
  profile: {
    name: 'Emre Özden',
    title: 'Full-Stack Developer',
    headline: 'Fikirleri, *özenle işlenmiş* dijital ürünlere dönüştürüyorum.',
    intro:
      'Markalar ve girişimler için hızlı, erişilebilir ve uzun ömürlü web siteleri, web uygulamaları ve otomasyon sistemleri tasarlayıp geliştiriyorum.',
    avatar: '',
    location: 'İstanbul, TR',
    since: 2018,
    available: true,
    idNumber: 'EO-0417-26',
  },

  contact: {
    email: 'merhaba@emreozden.dev',
    phone: '+90 555 000 00 00',
    location: 'Kadıköy, İstanbul',
    hours: 'Hafta içi 09:00 – 18:00',
    responseTime: '24 saat içinde',
  },

  socials: [
    { id: 'soc_ig', platform: 'instagram', label: 'Instagram', handle: '@emreozden', url: 'https://instagram.com/', visible: true },
    { id: 'soc_x', platform: 'x', label: 'X', handle: '@emreozden', url: 'https://x.com/', visible: true },
    { id: 'soc_pin', platform: 'pinterest', label: 'Pinterest', handle: 'emreozden', url: 'https://pinterest.com/', visible: true },
    { id: 'soc_yt', platform: 'youtube', label: 'YouTube', handle: '@emreozden', url: 'https://youtube.com/', visible: true },
    { id: 'soc_gh', platform: 'github', label: 'GitHub', handle: 'emreozden', url: 'https://github.com/', visible: true },
  ],

  services: [
    {
      id: 'srv_web',
      icon: 'globe',
      title: 'Web Sitesi',
      summary:
        'Markanızın karakterini taşıyan, hızlı açılan ve arama motorlarında görünür kurumsal siteler, landing page’ler ve portfolyolar.',
      features: ['Özel arayüz tasarımı', 'SEO & performans optimizasyonu', 'İçerik yönetim paneli', 'Çoklu dil desteği'],
      timeline: '2 – 4 hafta',
    },
    {
      id: 'srv_app',
      icon: 'app',
      title: 'Web Uygulaması',
      summary:
        'Operasyonunuzu tek ekranda toplayan paneller, SaaS ürünleri ve müşteri portalları. Ölçeklenebilir mimari, temiz kod.',
      features: ['Kullanıcı & rol yönetimi', 'API ve veritabanı tasarımı', 'Gerçek zamanlı veri', 'Ödeme entegrasyonu'],
      timeline: '6 – 12 hafta',
    },
    {
      id: 'srv_auto',
      icon: 'workflow',
      title: 'Otomasyon Çözümleri',
      summary:
        'Tekrarlayan işleri yazılıma devredin. Sistemleriniz arasında köprü kuran, raporlayan ve zamandan tasarruf ettiren akışlar.',
      features: ['Süreç analizi', 'API entegrasyonları', 'Zamanlanmış görevler', 'Raporlama & bildirimler'],
      timeline: '1 – 3 hafta',
    },
    {
      id: 'srv_mobile',
      icon: 'smartphone',
      title: 'Mobil Uygulama',
      summary:
        'iOS ve Android için tek kod tabanıyla geliştirilen, doğal his veren ve mağaza yayınına hazır mobil uygulamalar.',
      features: ['React Native / Expo', 'Push bildirimleri', 'Çevrimdışı çalışma', 'App Store & Play yayını'],
      timeline: '8 – 14 hafta',
    },
  ],

  references: [
    {
      id: 'ref_1',
      name: 'Northwind',
      category: 'E-ticaret',
      year: 2025,
      url: 'https://example.com',
      image: '',
      accent: 'amber',
      description: 'Nitelikli kahve markası için abonelik tabanlı e-ticaret deneyimi.',
      featured: true,
    },
    {
      id: 'ref_2',
      name: 'Atlas Lojistik',
      category: 'Web Uygulaması',
      year: 2025,
      url: 'https://example.com',
      image: '',
      accent: 'indigo',
      description: 'Filo ve sevkiyat takibi için gerçek zamanlı operasyon paneli.',
      featured: true,
    },
    {
      id: 'ref_3',
      name: 'Mira Klinik',
      category: 'Kurumsal Site',
      year: 2024,
      url: 'https://example.com',
      image: '',
      accent: 'emerald',
      description: 'Online randevu sistemi entegre edilmiş klinik web sitesi.',
      featured: true,
    },
    {
      id: 'ref_4',
      name: 'Lumen Studio',
      category: 'Portfolyo',
      year: 2024,
      url: 'https://example.com',
      image: '',
      accent: 'violet',
      description: 'Mimarlık stüdyosu için editoryal yaklaşımlı portfolyo.',
      featured: false,
    },
    {
      id: 'ref_5',
      name: 'Pulse',
      category: 'Mobil Uygulama',
      year: 2023,
      url: 'https://example.com',
      image: '',
      accent: 'rose',
      description: 'Antrenman planlama ve ilerleme takibi yapan fitness uygulaması.',
      featured: false,
    },
    {
      id: 'ref_6',
      name: 'Forma',
      category: 'Otomasyon',
      year: 2023,
      url: 'https://example.com',
      image: '',
      accent: 'sky',
      description: 'Mobilya üreticisi için sipariş–üretim–fatura otomasyonu.',
      featured: false,
    },
  ],

  about: {
    intro:
      'Tasarım ile mühendisliğin kesiştiği yerde çalışıyorum. İyi bir ürünün, kullanıcı fark etmeden işini kolaylaştıran ürün olduğuna inanıyorum.',
    story:
      'Yazılıma 2018’de, küçük bir işletmenin stok takibini Excel’den kurtarmak için yazdığım basit bir araçla başladım. O gün bir problemi kodla çözmenin verdiği hissi hâlâ her projede arıyorum.\n\nSonraki yıllarda ajanslarda ve ürün ekiplerinde; e-ticaretten lojistiğe, sağlıktan eğitime kadar farklı sektörlerde onlarca proje geliştirdim. Bugün bağımsız olarak, fikir aşamasından yayına kadar tüm süreci uçtan uca üstleniyorum.\n\nÇalışırken en çok önem verdiğim şey netlik: net bir kapsam, net bir iletişim ve sade, bakımı kolay bir kod tabanı.',
    vision:
      'Hız, erişilebilirlik ve detaylara gösterilen özen bir lüks değil; standart olmalı. Amacım, birlikte çalıştığım her markaya yıllarca güvenle büyütebileceği bir dijital temel bırakmak.',
    skills: [
      { id: 'sk_1', group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { id: 'sk_2', group: 'Backend', items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST & GraphQL', 'Redis'] },
      { id: 'sk_3', group: 'Mobil', items: ['React Native', 'Expo', 'Push Notifications'] },
      { id: 'sk_4', group: 'Araçlar & Altyapı', items: ['Docker', 'Vercel', 'AWS', 'n8n', 'Figma', 'Git'] },
    ],
    experience: [
      {
        id: 'ex_1',
        period: '2023 — Bugün',
        role: 'Bağımsız Full-Stack Geliştirici',
        company: 'Serbest',
        description: 'Girişimler ve KOBİ’ler için uçtan uca ürün geliştirme, danışmanlık ve teknik liderlik.',
      },
      {
        id: 'ex_2',
        period: '2021 — 2023',
        role: 'Senior Frontend Developer',
        company: 'Dijital Ajans',
        description: 'Ulusal markaların web projelerinde arayüz mimarisi ve performans optimizasyonu.',
      },
      {
        id: 'ex_3',
        period: '2018 — 2021',
        role: 'Web Developer',
        company: 'Yazılım Stüdyosu',
        description: 'Kurumsal siteler, yönetim panelleri ve e-ticaret altyapıları geliştirme.',
      },
    ],
  },

  messages: [
    {
      id: 'msg_demo',
      name: 'Deniz Kaya',
      email: 'deniz@ornek.com',
      subject: 'Web Sitesi',
      message: 'Merhaba, kafemiz için yeni bir web sitesi düşünüyoruz. Uygun olduğunuz bir zamanda görüşebilir miyiz?',
      createdAt: '2026-11-12T10:24:00.000Z',
      read: false,
    },
  ],

  settings: {
    adminPassword: 'admin123',
  },
};
