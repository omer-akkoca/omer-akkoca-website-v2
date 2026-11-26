# Ömer Akkoca — kişisel site

Ömer Akkoca'nın CV tarzı kişisel web sitesi: özgeçmiş (deneyim, yetenekler, eğitim), okunan kitaplar ve izlenen film/tiyatro listesi. TR/EN dil desteği ve açık/koyu tema içerir.

Teknolojiler: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, i18next, Firebase (Firestore), Vercel.

## Kurulum

```bash
npm install
cp .env.example .env.local   # değerleri doldurun
npm run dev                  # http://localhost:3000
```

## Ortam değişkenleri

| Değişken | Açıklama |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitenin gerçek adresi (canonical, sitemap ve robots için) |
| `FIREBASE_*` | Firestore bağlantısı (yalnızca sunucuda kullanılır) |

## Komutlar

- `npm run dev`: geliştirme sunucusu
- `npm run build`: production build (TypeScript kontrolü dahil)
- `npm start`: production build'i çalıştırır
- `npm run lint`: ESLint
