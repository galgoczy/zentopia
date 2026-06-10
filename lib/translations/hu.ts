// Central HU dictionary. EN mirrors this shape exactly.

export const hu = {
  nav: {
    tagline: "jövő-technológia. ma.",
    links: {
      services: "Szolgáltatások",
      cases: "Munkák",
      process: "Folyamat",
      faq: "GYIK",
      labs: "labs",
    },
    ctaShort: "Foglalj →",
    ctaLong: "Foglalj időpontot →",
    menuLabel: "Menü",
    labsComing: "// hamarosan",
  },

  hero: {
    label: "[ 00 ] MANIFESTO",
    h1: {
      // The middle line wraps a highlight word inside <GlitchTE> in code.
      // We split the H1 into three runs so each language can shape its own
      // emphasis without changing component structure.
      lineA: "Jövő-technológia.",
      lineB_before: "A ",
      lineB_highlight: "TE",
      lineB_after: " üzletedben.",
      lineC: "Ma.",
    },
    sublines: [
      "AI a TE vállalkozásodnak.",
      "Hetek, nem hónapok.",
      "AI, gondozva.",
    ],
    ctaPrimary: "Foglalj 30 perces AI-konzultációt →",
    ctaSecondary: "Nézd a munkákat",
    bonsaiCaption: "circuit_bonsai.v2",
  },

  tech: {
    label: "// eszközök",
  },

  marquee: {
    items: [
      "AI agentek",
      "Automatizálás",
      "AI tartalom",
      "Webappok",
      "Működő rendszerek",
      "Jövő-technológia. Ma.",
    ],
  },

  calibrate: {
    line: "// RENDSZER KALIBRÁLÁSA",
  },

  services: {
    label: "[ 02 ] SZOLGÁLTATÁSOK",
    h2: "Amit a Zentopia épít.",
    sub: "Öt terület — minden problémára egy konkrét megoldás.",
    miniCta: "Olvasd el",
    items: {
      content: {
        title: "AI tartalomgyártás",
        sub: "Kreatív kommunikáció",
        body: "Social poszt, kampányszöveg, blog, video script, AI képek és kreatív tesztek — gyorsabban, több verzióban.",
      },
      agents: {
        title: "AI agentek",
        sub: "Digitális asszisztensek",
        body: "Ügyfélszolgálati, sales, admin, HR vagy dokumentumkezelő AI munkatársak. Saját rendszerre szabva.",
      },
      flow: {
        title: "Folyamat-automatizáció",
        sub: "Ismétlődő munka, eltüntetve",
        body: "E-mailek, ajánlatkérések, CRM, számlák, riportok automatizálása n8n / Make / Zapier alapon.",
      },
      webapp: {
        title: "AI webappok",
        sub: "Egyedi üzleti alkalmazások",
        body: "Dashboard-ok, tudásbázisok (RAG), ajánlatkészítő rendszerek, integrált CRM/ERP megoldások.",
      },
      consult: {
        title: "AI tanácsadás",
        sub: "Képzés és bevezetés",
        body: "AI audit, eszközválasztás, vezetői workshop, csapat-tréning, promptolás, bevezetési roadmap.",
      },
    },
  },

  problem: {
    label: "[ 03 ] A KÉRDÉS",
    h2: "Ismerős?",
    monoPrefix: "// kérdés",
    items: [
      {
        symbol: "?",
        lines: ["Használnád az AI-t,", "de nem tudod,", "pontosan mire?"],
        sub: "Sok eszköz, sok hype, sok ígéret. De konkrétan?",
      },
      {
        symbol: "$",
        lines: ["Melyik eszköz hozna", "tényleg bevételt?"],
        sub: "Nem trend, nem demo — valódi üzleti hatás.",
      },
      {
        symbol: "⚙",
        lines: ["Hogy tudnál kiváltani", "emberi munkaerőt?"],
        sub: "Vagy felgyorsítani azt, ami már működik.",
      },
    ],
    bridge: {
      eyebrow: "Ismerős kérdések?",
      leadLine: "Akkor jó helyen jársz.",
      highlight: "Megmutatjuk, hogyan találunk rájuk választ →",
      cta: "Mutasd a folyamatot →",
    },
  },

  process: {
    label: "[ 04 ] FOLYAMAT",
    h2: "Hogyan dolgozunk.",
    sub: "Négy lépés. Két hét — három hónap, projekttől függően.",
    stepMonoPrefix: "STEP",
    steps: [
      {
        title: "Audit",
        time: "~1 hét",
        body: "Átnézzük együtt a működésedet. Megkeressük, hol veszítesz időt, és hol térül meg gyorsan az AI.",
      },
      {
        title: "Roadmap",
        time: "~3 nap",
        body: "Megkapod a prioritás-sorrendet. 3-5 konkrét projekt, sorba rakva ROI alapján. Nem 60 oldal PDF.",
      },
      {
        title: "Build",
        time: "2-8 hét",
        body: "A legjobb ROI-pontnál elkezdjük építeni. Iteratívan, heti demókkal. Te látod, mi készül.",
      },
      {
        title: "Skálázás",
        time: "folyamatos",
        body: "A működő rendszert kibővítjük. Új use case-eket integrálunk, mérjük az eredményeket.",
      },
    ],
    kezdes: {
      label: "[ 04.5 ] KEZDÉS",
      h3_before: "Az első lépés mindig az ",
      h3_highlight: "Audit.",
      sub: "Ingyenes 30 perces beszélgetés, ahol megnézzük, hol érdemes elindulni.",
      cta: "Foglalj 30 perces AI-konzultációt →",
    },
  },

  cases: {
    label: "[ 05 ] MUNKÁK",
    h2: "Amit eddig építettünk.",
    sub: "Négy példa projekt — négy iparág — egyetlen filozófia.",
    statRow: [
      ["4", "iparág"],
      ["2 hét", "leggyorsabb projekt"],
      ["100%", "AI-powered"],
      ["1", "enterprise sandbox"],
    ] as [string, string][],
    items: [
      {
        tag: "RENDEZVÉNY · CUSTOM BUILD",
        title: "Élménypont AI Selfiemata",
        sub: "AI fotóbox, ami 10 másodperc alatt űrhajóst csinál bárkiből.",
        stats: [
          ["10mp", "kép / generálás"],
          ["5k+", "kép készült"],
          ["end-to-end", "fejlesztés"],
        ] as [string, string][],
      },
      {
        tag: "VENDÉGLÁTÁS · AUTOMATIZÁCIÓ",
        title: "Pepper House",
        sub: "7-egységes vendéglátó cég teljes AI-vezérelt pénzügyi rendszere.",
        stats: [
          ["7", "egység"],
          ["100%", "AI admin"],
          ["online", "workflow"],
        ] as [string, string][],
      },
      {
        tag: "IRODA · AI AGENT",
        title: "Alfie the Agent",
        sub: "Teljes irodai AI munkatárs számlákkal, naptárral, stratégiával.",
        stats: [
          ["1", "AI munkatárs"],
          ["24/7", "működés"],
          ["NDA", "sandboxed"],
        ] as [string, string][],
      },
      {
        tag: "E-COMMERCE · END-TO-END",
        title: "Nola and Co",
        sub: "Teljes AI-powered webshop 2 hét alatt, töredék fenntartási költséggel.",
        stats: [
          ["2 hét", "build"],
          ["1", "workflow mindenre"],
          ["−90%", "költség"],
        ] as [string, string][],
      },
    ],
    cardLink: "Olvasd el a teljes történetet",
    comingSoon: "// részletek hamarosan",
    footerCta: "Foglalj időpontot Te is! →",
  },

  founder: {
    label: "[ 06 ] ALAPÍTÓ",
    h2: "Helló, Gergő vagyok.",
    role: "// alapító · zentopia",
    bio: [
      "10+ éve dolgozom digitális marketingben — multiknál és KKV-knál egyaránt. Pontosan értem, milyen problémákkal néz szembe egy szervezet, függetlenül a méretétől.",
      "2023-ban megérkezett a generatív AI, és azonnal megéreztem, hogy ez nem egy újabb hype-ciklus. Azóta hands-on építek AI-t — webshopoktól irodai munkatársakig, rendezvénytechnikától pénzügyi adminig. Négy iparág, négy nagyon különböző use case.",
      "Ezért indítottam el a Zentopiát.",
      "A küldetésünk egyszerű: nem AI-stratégiát árulunk PDF-ben — működő rendszereket építünk. Olyanokat, amik ott vannak, dolgoznak, és tényleges különbséget tesznek. Hetek alatt — nem hónapok alatt.",
    ],
    stats: [
      ["10+", "év marketing"],
      ["2023 óta", "AI"],
      ["4", "iparág"],
    ] as [string, string][],
    photoCaption: "// gergő · 2026",
    photoName: "Galgóczy Gergely",
    photoRole: "// alapító",
    photoAlt: "Galgóczy Gergely · Zentopia alapító",
    linkedin: "LinkedIn",
  },

  faq: {
    label: "[ 07 ] GYIK",
    h2: "Gyakori kérdések.",
    sub: "Amit minden első beszélgetésen megkérdeznek.",
    items: [
      { q: "Mennyibe kerül egy AI projekt nálatok?", a: "A projektek 500.000 – 5.000.000 HUF közötti tartományban mozognak, a komplexitás függvényében. Egy ügyfélszolgálati chatbot más nagyságrend, mint egy teljes webshop AI workflow. A pontos árajánlatot az Audit után adjuk, számokkal alátámasztva." },
      { q: "Mennyi időbe telik egy projekt?", a: "A legtöbb build 2–8 hét. A Nola and Co (teljes AI webshop) 2 hét alatt készült el. Egy enterprise AI agent rendszer (mint az Alfie) 6–8 hét. Az időt mindig az Auditban közösen véglegesítjük." },
      { q: "Mi a különbség köztetek és egy ChatGPT bevezetés között?", a: "A ChatGPT egy eszköz. Mi rendszereket építünk, amik konkrét üzleti folyamatokat futtatnak — számlákat dolgoznak fel, ügyfeleket szolgálnak ki, riportokat készítenek. Egy ChatGPT-fiók válaszol, ha kérdezed. Egy zentopia AI rendszer 0-24 dolgozik, integrálva a többi rendszereddel." },
      { q: "Mi van, ha nincs sok adatunk vagy nincs technikai csapatunk?", a: 'Ez a leggyakoribb helyzet a vállalkozásoknál — pont ezért dolgozunk velük. Az Auditban átnézzük, mi van, és mi hiányzik. Sokszor a "nincs adatunk" valójában csak azt jelenti, hogy az adat egy másik rendszerben van. Nem kell technikai csapat — mi vagyunk az.' },
      { q: "Mi van az adataimmal? Biztonságosan kezeled?", a: "Igen. Minden projekt saját, izolált környezetben fut (lásd: Alfie enterprise sandbox). Az ügyfél-adatokat soha nem osztjuk meg AI training-re, harmadik felekkel. GDPR-konform működés, magyar jogi környezet." },
      { q: "Mi van, ha az ingyenes AI-konzultáció után nem akarok veletek dolgozni?", a: "Akkor a térkép a tied. Megmutattuk, hol érdemes elindulnod — akár saját erőből, akár másik partnerrel. Nincs nyomás, nincs follow-up email-spam." },
      { q: 'Mi az a "labs.zentopia.io"?', a: 'Ez a "labor" — itt megosztjuk a tanulságokat, a meghibásodásokat, a kísérleteket. Magyar nyelvű AI-tartalom, ami nem hype, hanem tapasztalat. Iratkozz fel, ha akarsz.' },
    ],
  },

  cta: {
    label: "[ 08 ] BESZÉLJÜNK",
    h2_before: "30 perc, ",
    h2_highlight: "ami megéri.",
    sub: "Egy fél órás beszélgetés, amiben átnézzük együtt, hol érdemes neked AI-zni — és hol nem.",
    form: {
      label: "FOGLALJ IDŐPONTOT",
      caption: "Töltsd ki és 24 órán belül megkeresünk, hogy időpontot egyeztessünk.",
      fields: {
        name: { label: "Név", placeholder: "Hogyan szólítsunk?" },
        email: { label: "Email", placeholder: "pl. neved@cegnev.hu" },
        phone: { label: "Telefonszám", placeholder: "+36 30 123 4567" },
        company: { label: "Cégnév", placeholder: "A vállalkozásod neve" },
        industry: { label: "Iparág", placeholder: "pl. e-commerce, vendéglátás" },
        challenge: {
          label: "Mi a kihívás?",
          placeholder:
            "Szeretnénk az ügyfélszolgálatot AI-jal támogatni, de nem tudjuk hol kezdjük...",
        },
      },
      submit: "Foglalj 30 perces AI-konzultációt →",
      submitting: "Küldés…",
      disclaimer: "* kötelező mező · 100% spam-mentes",
      success: "Köszi! Megkaptuk — 24 órán belül jelentkezünk.",
      errorMissing: "Tölts ki minden kötelező mezőt.",
      errorEmail: "Adj meg egy érvényes email címet.",
      errorGeneric: "Hiba történt. Próbáld újra, vagy írj a team@zentopia.io-ra.",
      errorNotConfigured: "A küldés még nincs beüzemelve. Írj a team@zentopia.io-ra.",
      errorNetwork: "Nem sikerült elküldeni. Próbáld újra, vagy írj a team@zentopia.io-ra.",
    },
    expect: {
      label: "MIRE SZÁMÍTHATSZ",
      steps: [
        { title: "24 órán belül válasz", body: "Email-en jelentkezünk, és kiválasztunk egy közös időpontot." },
        { title: "30 perces Google Meet", body: "Megnézzük a működésedet, kérdezünk konkrétumokat." },
        { title: "Konkrét AI-térkép", body: "3–5 területet jelölünk meg, ahol érdemes elindulnod." },
        { title: "Te döntesz", body: "Ha nálunk akarsz dolgozni, ajánlatot adunk. Ha nem, akkor is tiéd a térkép." },
      ],
    },
    direct: {
      label: "VAGY KÖZVETLENÜL",
    },
  },

  footer: {
    cols: {
      page: {
        label: "OLDAL",
        links: [
          { label: "Szolgáltatások", href: "#szolgaltatasok" },
          { label: "Munkák", href: "#munkak" },
          { label: "Folyamat", href: "#folyamat" },
          { label: "Alapító", href: "#alapito" },
          { label: "GYIK", href: "#gyik" },
        ],
      },
      content: {
        label: "TARTALOM",
        links: [
          { label: "labs.zentopia.io ↗", href: "https://labs.zentopia.io" },
          { label: "Hírlevél", href: "#" },
        ],
      },
      contact: {
        label: "KAPCSOLAT",
        location: "Budapest, HU",
      },
    },
    manifesto: {
      lineA: "Jövő-technológia.",
      lineB: "A Te üzletedben.",
      lineC: "Ma.",
    },
    cta: "Foglalj időpontot →",
    legal: ["Impresszum", "Adatkezelés", "Cookie szabályzat"],
    easterEgg: "[ MADE WITH 8-BIT LOVE ]",
    copyright: "© 2026 Zentopia",
  },

  meta: {
    title: "Zentopia · AI ügynökség, ami működő rendszereket épít",
    description:
      "Egyedi AI megoldások vállalkozásoknak — AI agentek, automatizáció, custom webappok. Hetek alatt, nem hónapok alatt. Magyar AI agency.",
    ogDescription:
      "Egyedi AI megoldások vállalkozásoknak — AI agentek, automatizáció, custom webappok. Hetek alatt, nem hónapok alatt.",
  },
};

export type Dict = typeof hu;
