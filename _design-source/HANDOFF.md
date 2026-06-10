# Zentopia — Handoff Claude Code-hoz

Ez a dokumentum elmondja, hogyan add át a kész design-rendszert Claude Code-nak (vagy bármilyen fejlesztő-AI-nak / fejlesztőnek) implementációra.

---

## 1. Mit kapsz a projektben

```
zentopia/
├── Full Page Mockup.html       ← VIZUÁLIS SPEC (ezt mutasd először)
├── index.html                  ← Design canvas (variációkkal, tweaks panellel)
│
├── shared.jsx                  ← Brand tokens (színek, paletták) + reusable komponensek
│                                  (Wordmark, BreathingBonsai, GlitchText, RotatingSubline,
│                                   PixelGrid, PixelLabel, CTAPrimary, CTASecondary,
│                                   GlitchTE, LangSwitch, TechStackStrip)
│
├── hero-v1.jsx                 ← Hero (Desktop · Grid + Glitch)
├── hero-v2.jsx                 ← Hero (Mobile · Monument)
├── services.jsx                ← [02] Szolgáltatások — Bento
├── problem.jsx                 ← [03] A kérdés — Question grid + typewriter
├── process.jsx                 ← [04] Folyamat — Linear timeline
├── cases.jsx                   ← [05] Munkák — Ledger (dark)
├── founder.jsx                 ← [06] Alapító — Pull-quote
├── faq.jsx                     ← [07] GYIK — Accordion
├── cta.jsx                     ← [08] Beszéljünk — Split form (dark)
├── footer.jsx                  ← Footer — Manifesto-led (dark)
├── full-page.jsx               ← Az összes szekciót egymásra rakó assembler
│
├── assets/
│   ├── logo-forest.png         ← Áramköri bonsai #0F1F1A
│   ├── logo-lime.png           ← Áramköri bonsai #C8FF6B (dark bg overlay)
│   ├── logo-white.png          ← Áramköri bonsai white (dark bg)
│   └── logo-black.png          ← Áramköri bonsai pure black (legal / print)
│
└── uploads/
    ├── zentopia_brand_identity.md   ← BRAND BIBLE (olvasd először!)
    └── zentopia_website_copy.md     ← Teljes copy minden szekcióra
```

---

## 2. Mit írj Claude Code-nak

Másold be ezt a promptot a beszélgetés elejére:

> Mellékelem a kész design-rendszert egy AI-ügynökség weboldalához (Zentopia, magyar nyelvű B2B).
>
> **Először olvasd el ezeket, ebben a sorrendben:**
> 1. `uploads/zentopia_brand_identity.md` — a teljes brand identity (színek, tipográfia, hangzás, animációk)
> 2. `uploads/zentopia_website_copy.md` — minden szekció pontos copy-ja
> 3. `Full Page Mockup.html` — vizuális referencia (mobil + desktop toggle a tetején)
> 4. `shared.jsx` — brand tokenek és újrahasznosítható komponensek
> 5. A többi `.jsx` fájl szekciónkénti komponens-szintű referenciának
>
> **A cél:** építsd újra a `Full Page Mockup.html`-t **Next.js 14 (App Router) + TypeScript + Tailwind CSS** stackben, kifelé pixel-pontosan ugyanazt nyújtva.
>
> **Tartsd meg a következőket pontosan:**
> - Színpaletta hex-kódok (lásd `shared.jsx` `Z` és `Z.palettes` objektumai — a `punchier` paletta a kiválasztott default)
> - Wordmark proporciók (fontMul=0.9, gap=5px, weight=500, tracking=-0.035em)
> - Bonsai "lélegző + glitch" animáció (sweep + shatter sequence, 9 mp ciklus, `prefers-reduced-motion` aware)
> - Process timeline draw animation (1.3s clip-path reveal + leading energy dot) — **mobilon scroll-tied, IntersectionObserver-rel**
> - Typewriter animáció a Problem kérdéseken (42ms/char, staggered 1.8s)
> - Pixel-fade rotating subline a heroban és a footerben
> - 8-bit easter egg a footer jobb alsó sarkában: `[ MADE WITH 8-BIT LOVE ]` Press Start 2P-ben
>
> **Implementation notes:**
> - Mobile-first responsive — a komponensek most `viewport` propot kapnak, ezt Tailwind breakpoint-okkal váltsd ki (`md:` 768px-től desktop layout)
> - HU az alapnyelv, EN váltás később (a `<LangSwitch>` placeholder már bent van; használj `next-intl`-t vagy hasonlót)
> - Fontok Google Fonts-ról: Space Grotesk (400/500/600/700), JetBrains Mono (400/500), Press Start 2P (400)
> - A `<image-slot>` placeholder a Founder portrait helyén — ide majd valódi fotó kerül
> - SEO meta-szövegek a `zentopia_website_copy.md` végén
> - Form (CTA szekcióban) backend nélkül van — kösd egy egyszerű API endpoint-ra (Resend / Formspree / saját)
> - A Process timeline scroll-tied logikája fontos: mobilon `IntersectionObserver`-rel kösd a `activeIdx`-et az aktuálisan látható lépéshez. Desktop-on maradhat auto-progresszió 1.5 mp-enként.

---

## 3. Egy gyors check-list, ha végzett

- [ ] Mobile (375–414px) layout valós eszközön ellenőrizve
- [ ] Bonsai animáció ciklikusan játszik, `prefers-reduced-motion` esetén statikus
- [ ] Process timeline mobilon scroll-tied működik
- [ ] Form `*` kötelező mezőkkel validál, success state van
- [ ] Lighthouse Accessibility ≥ 95
- [ ] HU `<html lang="hu">`, OG image, favicon
- [ ] Easter egg (Press Start 2P footer) megvan
- [ ] Bonsai logo 24px-en (favicon) is felismerhető

---

## 4. Mi van még tisztázandó (fejlesztés előtt)

- **Founder portrait** — szükség lesz egy igazi fotóra Gergőről (jelenleg circuit-DNS placeholder van)
- **Case study képek** — minden esethez 1–2 valódi screenshot / fotó (Selfiemata, Pepper House, Alfie, Nola)
- **labs.zentopia.io** — ez a "labor" külön subdomain lesz?
- **Form backend** — Resend / Postmark / saját SMTP / vagy CMS-be (pl. Sanity, Strapi)?
- **CMS** — case study-k és blog-cikkek statikus markdown-ban vagy headless CMS-ben?
- **Analytics** — Plausible / Umami / Google? GDPR-konform setup kell

Ezeket érdemes Claude Code-dal megbeszélni a kezdés előtt.

---

## 5. Kódminőség / DX javaslatok

- TypeScript strict mode
- ESLint + Prettier
- Husky pre-commit lint+format
- Vercel-re deploy (gyors, ingyenes hobby tier)
- `app/(marketing)/page.tsx` szerű struktúra, mert majd lesznek aloldalak (Munkák / Folyamat / blog stb.)
- A komponenseket szedd szét logikailag: `components/sections/{Hero,Services,Problem,Process,Cases,Founder,Faq,Cta,Footer}/index.tsx`
- Animációk: prefer framer-motion vagy GSAP — saját CSS keyframes-ből indulhatsz (most azzal van), de framer egyszerűbb scroll-tied logikára
