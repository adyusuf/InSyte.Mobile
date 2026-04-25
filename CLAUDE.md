# Mobile — React Native (Phase 2)

> Bu dosya `mobile/` klasöründe çalışırken Claude Code'un okuduğu rehberdir.
> Kök kurallar `../CLAUDE.md`'de.
>
> **NOT: Mobil uygulama Phase 2 — web tamamlanmadan başlanmaz.**
> İlk MVP web odaklı. Mobil ilk sürümde **görüntüleme + bildirim** öncelikli, video yükleme ve rapor onay web'de kalır.

## Phase 2 kapsamı

İlk mobil sürümde olacaklar:

- ✅ Giriş / oturum yönetimi
- ✅ Bildirimler (push) — yeni rapor, AI tamamlandı, onay isteği
- ✅ Video listesi görüntüleme + oynatma
- ✅ Rapor listesi + detay (PDF görüntüleme)
- ✅ Okul / öğretmen / ders programı görüntüleme

İlk mobil sürümde **olmayacaklar**:

- ❌ Video yükleme (web'de)
- ❌ AI'a gönderme tetiklemesi (web'de)
- ❌ Rapor onaylama (web'de — PDF + onay süreci masaüstüne uygun)
- ❌ AI tanımı / kriter / rol yönetimi (admin işleri web'de)

İkinci sürümde mobil video yükleme ve onay işlemleri eklenebilir.

## Stack

- **React Native 0.74+** (yeni mimari — Fabric + TurboModules)
- **Expo (managed)** ile başla
- **TypeScript** — `strict: true`, `any` yasak
- **React Navigation v6+**
- **TanStack Query** — server state (web ile aynı pattern)
- **Zustand** — client state
- **React Hook Form** + **Zod**
- **NativeWind** veya **StyleSheet** (proje başında karar)
- **react-native-video** — video oynatma
- **react-native-pdf** — rapor PDF görüntüleme
- **Reanimated 3** + **Gesture Handler**
- **MMKV** — persistent storage
- **Expo Notifications** — push
- **Sentry** — crash reporting
- **Jest** + **React Native Testing Library**
- **Maestro** — E2E

## Klasör yapısı

```
mobile/
├── src/
│   ├── app/                ← Navigation, providers
│   ├── screens/
│   │   ├── giris/
│   │   ├── dashboard/
│   │   ├── videolar/
│   │   ├── raporlar/
│   │   ├── okullar/
│   │   ├── ogretmenler/
│   │   ├── ders-programi/
│   │   └── bildirimler/
│   ├── features/           ← Web ile paralel
│   ├── components/
│   ├── hooks/
│   ├── lib/                ← API, storage, push, utils
│   ├── types/
│   └── theme/
├── assets/
└── docs/
    ├── platform-farkliliklari.md
    ├── push-bildirim.md
    └── deeplink.md
```

## Tasarım sistemi paylaşımı

- Renk/spacing/font değerleri **web ile aynı tasarım token'larına** dayanır
- `theme/index.ts` web'deki Tailwind config ile elle senkron
- Değişiklik tek yerde unutulmasın — PR şablonunda checklist

## Navigation

- Tipli navigasyon: `RootStackParamList`
- Deeplink yapılandırması: bildirimden direkt rapor detayına vb.

```ts
type RootStackParamList = {
  Dashboard: undefined;
  VideoDetay: { videoId: string };
  RaporDetay: { raporId: string };
};
```

## State ve API

Web ile **birebir aynı pattern**. Sadece transport ortamı değişir.

- React Query: `staleTime` mobilde daha uzun
- Offline desteği için `persistQueryClient` + MMKV adapter
- Resim/video: caching kritik (`expo-image`, `react-native-video`)

## Push bildirim (kritik)

Mobil'in birincil değer önerisi. Bildirim türleri:

- AI inceleme tamamlandı (yetkililere)
- Rapor onay bekliyor (yöneticilere)
- Yeni rapor PDF'i gönderildi (atanan kişilere)
- Token kotası %80 doldu (admin)

Detay: `docs/push-bildirim.md`.

## Erişilebilirlik

- `accessible`, `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`
- Dokunma alanı min 44x44pt (iOS) / 48x48dp (Android)
- VoiceOver / TalkBack manuel test

## Performans

- Yeni mimari (Fabric) açık
- FlashList uzun listelerde
- Hermes açık

## Test

- **Birim:** hook'lar, validator, helper
- **Bileşen:** RNTL
- **E2E (Maestro):** giriş, video listesi → detay, bildirim açma

## Geliştirme akışı

```bash
npm install
npx expo start
npx expo run:ios
npx expo run:android
npm run test
npm run lint
npm run typecheck
```

`.env`:
```
EXPO_PUBLIC_API_URL=http://localhost:5000
```

## Yapma

- ❌ `any` tipi
- ❌ ScrollView içinde uzun liste — FlatList/FlashList
- ❌ `index` as `key`
- ❌ AsyncStorage — MMKV var
- ❌ Phase 1'de video yükleme veya rapor onayı eklemek (web'de)
- ❌ Hard-coded string UI'da
- ❌ "iOS'ta çalışıyor" diye merge — Android da test edilmeden olmaz
