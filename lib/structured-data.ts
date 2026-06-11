// Schema.org JSON-LD generators. Lives in /lib so both HU and EN pages can
// reuse the same shapes — the only locale-aware piece is FAQPage (questions
// + answers come from the dictionary).

import type { Dict } from "./translations/hu";
import type { Lang } from "./i18n";

const SITE = "https://www.zentopia.io";
const OG = `${SITE}/og-image.png`;

export function organizationSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Zentopia",
    legalName: "Zentopia",
    url: SITE,
    logo: `${SITE}/assets/logo-forest.png`,
    image: OG,
    email: "team@zentopia.io",
    description:
      lang === "hu"
        ? "Magyar AI ügynökség, ami egyedi, működő AI rendszereket épít vállalkozásoknak — AI agentek, automatizáció, custom webappok. Hetek alatt, nem hónapok alatt."
        : "Hungarian AI agency building custom, working AI systems for businesses — AI agents, automation, custom webapps. In weeks, not months.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
    founder: {
      "@id": `${SITE}/#founder`,
    },
    knowsAbout: [
      "Artificial intelligence",
      "AI agents",
      "Workflow automation",
      "Retrieval-augmented generation",
      "n8n",
      "OpenAI",
      "Anthropic",
      "LangChain",
    ],
    areaServed: { "@type": "Country", name: "HU" },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#founder`,
    name: "Galgóczy Gergely",
    givenName: "Gergely",
    familyName: "Galgóczy",
    jobTitle: "Founder",
    image: `${SITE}/assets/founder.jpg`,
    worksFor: { "@id": `${SITE}/#organization` },
    knowsAbout: [
      "Generative AI",
      "AI agents",
      "AI strategy",
      "Digital marketing",
      "Process automation",
      "RAG systems",
    ],
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: lang === "hu" ? SITE : `${SITE}/en`,
    name: "Zentopia",
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: lang === "hu" ? "hu-HU" : "en-US",
  };
}

export function faqSchema(t: Dict, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}${lang === "hu" ? "" : "/en"}#faq`,
    inLanguage: lang === "hu" ? "hu-HU" : "en-US",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function combinedGraph(t: Dict, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(lang),
      personSchema(),
      websiteSchema(lang),
      faqSchema(t, lang),
    ],
  };
}
