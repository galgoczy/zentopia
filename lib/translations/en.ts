import type { Dict } from "./hu";

export const en: Dict = {
  nav: {
    tagline: "future tech. today.",
    links: {
      services: "Services",
      cases: "Work",
      process: "Process",
      faq: "FAQ",
      labs: "labs",
    },
    ctaShort: "Book →",
    ctaLong: "Book a session →",
    menuLabel: "Menu",
    labsComing: "// coming soon",
  },

  hero: {
    label: "[ 00 ] MANIFESTO",
    h1: {
      lineA: "Future tech.",
      lineB_before: "In ",
      lineB_highlight: "YOUR",
      lineB_after: " business.",
      lineC: "Today.",
    },
    sublines: [
      "AI for YOUR business.",
      "Weeks, not months.",
      "AI, tended carefully.",
    ],
    ctaPrimary: "Book a 30-min AI session →",
    ctaSecondary: "See the work",
    bonsaiCaption: "circuit_bonsai.v2",
  },

  tech: {
    label: "// tools",
  },

  marquee: {
    items: [
      "AI agents",
      "Automation",
      "AI content",
      "Web apps",
      "Working systems",
      "Future tech. Today.",
    ],
  },

  calibrate: {
    line: "// CALIBRATING SYSTEM",
  },

  services: {
    label: "[ 02 ] SERVICES",
    h2: "What Zentopia builds.",
    sub: "Five areas — one concrete solution per problem.",
    miniCta: "Read more",
    items: {
      content: {
        title: "AI content",
        sub: "Creative communication",
        body: "Social posts, campaign copy, blogs, video scripts, AI imagery and creative tests — faster, in more variants.",
      },
      agents: {
        title: "AI agents",
        sub: "Digital assistants",
        body: "Support, sales, admin, HR or document-handling AI workers. Tailored to your own systems.",
      },
      flow: {
        title: "Process automation",
        sub: "Repetitive work, gone",
        body: "Email, RFQs, CRM, invoicing, reporting — automated on n8n / Make / Zapier.",
      },
      webapp: {
        title: "AI webapps",
        sub: "Custom business apps",
        body: "Dashboards, knowledge bases (RAG), proposal builders, integrated CRM/ERP solutions.",
      },
      consult: {
        title: "AI consulting",
        sub: "Training & rollout",
        body: "AI audit, tool selection, executive workshop, team training, prompting, rollout roadmap.",
      },
    },
  },

  problem: {
    label: "[ 03 ] THE QUESTION",
    h2: "Sound familiar?",
    monoPrefix: "// question",
    items: [
      {
        symbol: "?",
        lines: ["You'd use AI,", "but you don't know", "for what, exactly?"],
        sub: "Lots of tools, lots of hype, lots of promises. But concretely?",
      },
      {
        symbol: "$",
        lines: ["Which tool would actually", "bring in revenue?"],
        sub: "Not a trend, not a demo — real business impact.",
      },
      {
        symbol: "⚙",
        lines: ["How could you replace", "human labor?"],
        sub: "Or speed up what's already working.",
      },
    ],
    bridge: {
      eyebrow: "Familiar questions?",
      leadLine: "Then you're in the right place.",
      highlight: "We'll show you how to find the answers →",
      cta: "Show me the process →",
    },
  },

  process: {
    label: "[ 04 ] PROCESS",
    h2: "How we work.",
    sub: "Four steps. Two weeks to three months, depending on the project.",
    stepMonoPrefix: "STEP",
    steps: [
      {
        title: "Audit",
        time: "~1 week",
        body: "We walk through your operation together. We find where you're losing time, and where AI pays back fastest.",
      },
      {
        title: "Roadmap",
        time: "~3 days",
        body: "You get the priority order. 3–5 concrete projects, ranked by ROI. Not a 60-page PDF.",
      },
      {
        title: "Build",
        time: "2–8 weeks",
        body: "We start building at the best ROI point. Iteratively, with weekly demos. You see what's being made.",
      },
      {
        title: "Scale",
        time: "ongoing",
        body: "We expand the working system. Integrate new use cases, measure outcomes.",
      },
    ],
    kezdes: {
      label: "[ 04.5 ] START",
      h3_before: "The first step is always the ",
      h3_highlight: "Audit.",
      sub: "A free 30-minute conversation where we look at where it makes sense to start.",
      cta: "Book a 30-min AI session →",
    },
  },

  cases: {
    label: "[ 05 ] WORK",
    h2: "What we've built so far.",
    sub: "Four projects — four industries — one philosophy.",
    statRow: [
      ["4", "industries"],
      ["2 weeks", "fastest project"],
      ["100%", "AI-powered"],
      ["1", "enterprise sandbox"],
    ] as [string, string][],
    items: [
      {
        tag: "EVENTS · CUSTOM BUILD",
        title: "Élménypont AI Selfiemata",
        sub: "An AI photobooth that turns anyone into an astronaut in 10 seconds.",
        stats: [
          ["10s", "per image"],
          ["5k+", "images generated"],
          ["end-to-end", "development"],
        ] as [string, string][],
      },
      {
        tag: "HOSPITALITY · AUTOMATION",
        title: "Pepper House",
        sub: "Full AI-driven financial system for a 7-unit hospitality group.",
        stats: [
          ["7", "units"],
          ["100%", "AI admin"],
          ["online", "workflow"],
        ] as [string, string][],
      },
      {
        tag: "OFFICE · AI AGENT",
        title: "Alfie the Agent",
        sub: "A complete office AI worker handling invoices, calendar and strategy.",
        stats: [
          ["1", "AI worker"],
          ["24/7", "uptime"],
          ["NDA", "sandboxed"],
        ] as [string, string][],
      },
      {
        tag: "E-COMMERCE · END-TO-END",
        title: "Nola and Co",
        sub: "A full AI-powered webshop in 2 weeks, at a fraction of the running cost.",
        stats: [
          ["2 weeks", "build"],
          ["1", "workflow for all"],
          ["−90%", "cost"],
        ] as [string, string][],
      },
    ],
    cardLink: "Read the full story",
    comingSoon: "// details coming soon",
    footerCta: "Book your session too! →",
  },

  founder: {
    label: "[ 06 ] FOUNDER",
    h2: "Hi, I'm Gergő.",
    role: "// founder · zentopia",
    bio: [
      "10+ years in digital marketing — at multinationals and SMBs alike. I know exactly what kinds of problems an organization faces, regardless of size.",
      "In 2023 generative AI landed, and I felt immediately that this wasn't another hype cycle. Since then I've been hands-on building AI — from webshops to office workers, event tech to financial admin. Four industries, four very different use cases.",
      "That's why I started Zentopia.",
      "Our mission is simple: we don't sell AI strategy in PDFs — we build working systems. Ones that are there, doing the work, making a real difference. In weeks — not months.",
    ],
    stats: [
      ["10+", "years marketing"],
      ["since 2023", "AI"],
      ["4", "industries"],
    ] as [string, string][],
    photoCaption: "// gergő · 2026",
    photoName: "Gergely Galgóczy",
    photoRole: "// founder",
    photoAlt: "Gergely Galgóczy · Zentopia founder",
    linkedin: "LinkedIn",
  },

  faq: {
    label: "[ 07 ] FAQ",
    h2: "Frequently asked questions.",
    sub: "What everyone asks in the first conversation.",
    items: [
      {
        q: "How much does an AI project cost?",
        a: "Projects range from roughly €1,300 to €13,000, depending on complexity. A support chatbot is a different order of magnitude than a full webshop AI workflow. We give the exact quote after the Audit, backed by numbers.",
      },
      {
        q: "How long does a project take?",
        a: "Most builds take 2–8 weeks. Nola and Co (full AI webshop) was done in 2 weeks. An enterprise AI agent system (like Alfie) is 6–8 weeks. We finalize the timeline together during the Audit.",
      },
      {
        q: "What's the difference between you and just rolling out ChatGPT?",
        a: "ChatGPT is a tool. We build systems that run concrete business processes — they handle invoices, serve customers, generate reports. A ChatGPT account answers when you ask it. A Zentopia AI system works 24/7, integrated with the rest of your stack.",
      },
      {
        q: "What if we don't have much data or a technical team?",
        a: "That's the most common situation — exactly why we work with these companies. In the Audit we walk through what's there and what's missing. Usually \"no data\" really means \"the data is in another system\". You don't need a tech team — we are one.",
      },
      {
        q: "What about my data? Is it handled safely?",
        a: "Yes. Every project runs in its own isolated environment (see: Alfie enterprise sandbox). Customer data is never shared for AI training or with third parties. GDPR-compliant operation, EU jurisdiction.",
      },
      {
        q: "What if I don't want to work with you after the free AI session?",
        a: "Then the map is yours. We showed you where it makes sense to start — on your own, or with another partner. No pressure, no follow-up spam.",
      },
      {
        q: 'What is "labs.zentopia.io"?',
        a: 'The "lab" — where we share lessons, failures, experiments. Hungarian-language AI content that isn\'t hype but lived experience. Subscribe if you want.',
      },
    ],
  },

  cta: {
    label: "[ 08 ] LET'S TALK",
    h2_before: "30 minutes, ",
    h2_highlight: "well spent.",
    sub: "A half-hour conversation where we look together at where AI is worth it for you — and where it isn't.",
    form: {
      label: "BOOK A SESSION",
      caption: "Fill this in and we'll reach out within 24 hours to schedule a time.",
      fields: {
        name: { label: "Name", placeholder: "What should we call you?" },
        email: { label: "Email", placeholder: "e.g. you@company.com" },
        phone: { label: "Phone", placeholder: "+1 555 123 4567" },
        company: { label: "Company", placeholder: "Your business name" },
        industry: { label: "Industry", placeholder: "e.g. e-commerce, hospitality" },
        challenge: {
          label: "What's the challenge?",
          placeholder:
            "We'd like to support customer service with AI, but we don't know where to start...",
        },
      },
      submit: "Book a 30-min AI session →",
      submitting: "Sending…",
      disclaimer: "* required · 100% spam-free",
      success: "Thanks! We got it — we'll be in touch within 24 hours.",
      errorMissing: "Please fill in all required fields.",
      errorEmail: "Please enter a valid email address.",
      errorGeneric: "Something went wrong. Try again, or email team@zentopia.io.",
      errorNotConfigured: "Sending isn't wired up yet. Email team@zentopia.io.",
      errorNetwork: "Couldn't send. Try again, or email team@zentopia.io.",
    },
    expect: {
      label: "WHAT TO EXPECT",
      steps: [
        { title: "Reply within 24 hours", body: "We get in touch by email and pick a time together." },
        { title: "30-minute Google Meet", body: "We look at your operation and ask concrete questions." },
        { title: "Concrete AI map", body: "We flag 3–5 areas where it makes sense to start." },
        { title: "You decide", body: "If you want to work with us, we'll send an offer. If not, the map is still yours." },
      ],
    },
    direct: {
      label: "OR DIRECTLY",
    },
  },

  footer: {
    cols: {
      page: {
        label: "PAGES",
        links: [
          { label: "Services", href: "#szolgaltatasok" },
          { label: "Work", href: "#munkak" },
          { label: "Process", href: "#folyamat" },
          { label: "Founder", href: "#alapito" },
          { label: "FAQ", href: "#gyik" },
        ],
      },
      content: {
        label: "CONTENT",
        links: [
          { label: "labs.zentopia.io ↗", href: "https://labs.zentopia.io" },
          { label: "Newsletter", href: "#" },
        ],
      },
      contact: {
        label: "CONTACT",
        location: "Budapest, HU",
      },
    },
    manifesto: {
      lineA: "Future tech.",
      lineB: "In your business.",
      lineC: "Today.",
    },
    cta: "Book a session →",
    legal: ["Imprint", "Privacy", "Cookie policy"],
    easterEgg: "[ MADE WITH 8-BIT LOVE ]",
    copyright: "© 2026 Zentopia",
  },

  meta: {
    title: "Zentopia · AI agency that builds working systems",
    description:
      "Custom AI solutions for businesses — AI agents, automation, custom webapps. In weeks, not months. AI agency from Budapest.",
    ogDescription:
      "Custom AI solutions for businesses — AI agents, automation, custom webapps. In weeks, not months.",
  },
};
