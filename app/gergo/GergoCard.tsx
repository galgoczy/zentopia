"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { GlitchTE } from "@/components/ui/GlitchTE";
import { GlitchText } from "@/components/ui/GlitchText";
import { ContactIntro } from "@/components/motion/ContactIntro";

type Lang = "hu" | "en";

const COPY: Record<Lang, {
  eyebrow: string;
  roles: string;
  taglineBefore: string;
  highlight: string;
  taglineAfter: string;
  vcard: string;
  primaryLabel: string;
  cvLabel: string;
  cvView: string;
  cvViewSub: string;
  cvDownload: string;
  cvDownloadSub: string;
  projectsLabel: string;
  skillMap: string;
  fields: { phone: string; email: string; web: string };
  projects: { selfiemata: string; youtube: string; alfie: string };
}> = {
  hu: {
    eyebrow: "[ 00 ] NÉVJEGY",
    roles: "// alapító · AI stratéga · zentopia",
    taglineBefore: "AI a",
    highlight: "TE",
    taglineAfter: "vállalkozásodnak",
    vcard: "Mentsd el a névjegyem (vCard)",
    primaryLabel: "ELÉRHETŐSÉG",
    cvLabel: "CV / ÖNÉLETRAJZ",
    cvView: "Megnézem online",
    cvViewSub: "reszponzív · HTML",
    cvDownload: "Letöltés PDF-ben",
    cvDownloadSub: "A4 · nyomtatható",
    projectsLabel: "Pár nyilvános projekt",
    skillMap: "Interaktív skill-térkép",
    fields: { phone: "Telefon", email: "Email", web: "Web" },
    projects: {
      selfiemata: "élménypont · AI fotóbox",
      youtube: "AI tartalmak",
      alfie: "iroda · AI munkatárs",
    },
  },
  en: {
    eyebrow: "[ 00 ] CONTACT CARD",
    roles: "// founder · AI strategist · zentopia",
    taglineBefore: "AI for",
    highlight: "YOUR",
    taglineAfter: "business",
    vcard: "Save my contact (vCard)",
    primaryLabel: "GET IN TOUCH",
    cvLabel: "CV / RESUME",
    cvView: "View online",
    cvViewSub: "responsive · HTML",
    cvDownload: "Download as PDF",
    cvDownloadSub: "A4 · print-ready",
    projectsLabel: "A few public projects",
    skillMap: "Interactive Skill Map",
    fields: { phone: "Phone", email: "Email", web: "Web" },
    projects: {
      selfiemata: "experience point · AI photobooth",
      youtube: "AI content",
      alfie: "office · AI coworker",
    },
  },
};

export default function GergoCard() {
  const raw = useId();
  const id = "gc-" + raw.replace(/[^a-z0-9]/gi, "");
  // Default to EN (covers the "no info" case); switch to HU only when the
  // browser/system language is Hungarian. The user can still toggle manually.
  const [lang, setLang] = useState<Lang>("en");
  const [userPicked, setUserPicked] = useState(false);

  useEffect(() => {
    if (userPicked) return;
    const langs =
      typeof navigator !== "undefined"
        ? [navigator.language, ...(navigator.languages || [])]
        : [];
    const isHu = langs.some((l) => l?.toLowerCase().startsWith("hu"));
    setLang(isHu ? "hu" : "en");
  }, [userPicked]);

  const pick = (code: Lang) => {
    setUserPicked(true);
    setLang(code);
  };

  const t = COPY[lang];

  const primary = [
    { label: t.fields.phone, href: "tel:+36204680489", value: "+36 20 468 0489", external: false },
    { label: t.fields.email, href: "mailto:gergo@zentopia.io", value: "gergo@zentopia.io", external: false },
    { label: t.fields.web, href: "https://www.zentopia.io", value: "zentopia.io", external: true },
  ];

  const projects = [
    {
      label: "AI Selfiemata",
      sub: t.projects.selfiemata,
      href: "https://ai.elmeny.hu",
      value: "ai.elmeny.hu",
      accent: Z.coral,
    },
    {
      label: "YouTube · ChillGuide",
      sub: t.projects.youtube,
      href: "https://youtube.com/@chillguide",
      value: "youtube.com/@chillguide",
      accent: Z.violet,
    },
    {
      label: "Alfie the Agent",
      sub: t.projects.alfie,
      href: "mailto:team@zentopia.io",
      value: "team@zentopia.io",
      accent: Z.sunshine,
    },
  ];

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: Z.offwhite }}
    >
      <ContactIntro />
      <PixelGrid />

      <style>{`
        @keyframes ${id}-shake {
          0%, 92%, 96%, 100% { transform: translate(0,0); filter: none; }
          93%   { transform: translate(2px, -1px); filter: contrast(1.2); }
          93.5% { transform: translate(-3px, 1px); filter: contrast(1.4) hue-rotate(-6deg); }
          94%   { transform: translate(1px, 0); filter: contrast(1.1); }
        }
        .${id}-shake { animation: ${id}-shake 10s steps(1, end) infinite; }
        .${id}-row:hover .${id}-arrow { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) {
          .${id}-shake { animation: none !important; }
        }
      `}</style>

      <div className={`${id}-shake relative max-w-[720px] mx-auto px-5 pt-6 pb-16 md:px-8 md:pt-10 md:pb-24`}>
        {/* Top bar — wordmark + language switch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-forest.png"
              alt=""
              width={36}
              height={36}
              priority
              className="w-9 h-9 object-contain"
            />
            <span
              className="font-sans tracking-wordmark"
              style={{ fontWeight: 500, fontSize: 22, color: Z.forest, lineHeight: 1 }}
            >
              zentopia
            </span>
          </div>

          <div className="inline-flex items-center gap-[2px]">
            {(["hu", "en"] as Lang[]).map((code, i) => (
              <span key={code} className="inline-flex items-center">
                {i === 1 && (
                  <span
                    className="font-mono"
                    style={{ color: "rgba(15,31,26,0.4)", fontSize: 11, opacity: 0.7, padding: "0 2px" }}
                  >
                    ·
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => pick(code)}
                  aria-pressed={lang === code}
                  className="transition-colors duration-200"
                  style={{
                    padding: "2px 3px",
                    background: "transparent",
                    border: "none",
                    color: lang === code ? Z.forest : "rgba(15,31,26,0.4)",
                    fontWeight: lang === code ? 700 : 500,
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                  }}
                >
                  {code.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
        </div>

        <span
          className="font-mono inline-block mt-6"
          style={{ fontSize: 12, color: Z.ember, letterSpacing: "0.06em" }}
        >
          {t.eyebrow}
        </span>

        {/* Avatar + name row */}
        <div className="mt-3 flex items-center gap-5">
          <picture
            className="shrink-0 block relative overflow-hidden"
            style={{
              width: 108,
              height: 108,
              borderRadius: "50%",
              border: `2px solid ${Z.ember}`,
              boxShadow: `0 0 0 4px ${Z.offwhite}, 0 6px 32px -8px rgba(15,31,26,0.18)`,
            }}
          >
            <source srcSet="/assets/founder.avif" type="image/avif" />
            <source srcSet="/assets/founder.webp" type="image/webp" />
            <img
              src="/assets/founder.jpg"
              alt="Galgóczy Gergely"
              className="block w-full h-full object-cover"
              style={{ objectPosition: "center 28%" }}
            />
          </picture>

          <h1
            className="m-0 font-sans font-bold flex-1 min-w-0"
            style={{
              fontSize: "clamp(36px, 9vw, 72px)",
              letterSpacing: "-0.04em",
              color: Z.forest,
              lineHeight: 0.96,
            }}
          >
            <GlitchText cycle={12}>Galgóczy</GlitchText>
            <br />
            Gergely
          </h1>
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <span
            className="font-mono"
            style={{ fontSize: 14, color: Z.slate, letterSpacing: "0.04em" }}
          >
            {t.roles}
          </span>
          <span
            className="font-mono inline-flex items-center flex-wrap gap-2"
            style={{ fontSize: 14, color: Z.forest, letterSpacing: "0.04em" }}
          >
            <span style={{ color: Z.ember }}>{"//"}</span>
            <span>{t.taglineBefore}</span>
            <GlitchTE>{t.highlight}</GlitchTE>
            <span>{t.taglineAfter}</span>
          </span>
        </div>

        {/* Primary actions — vCard download + the interactive skill map (showcase) */}
        <div className="flex flex-wrap items-center gap-3 mt-7">
          <a
            href="/galgoczy.vcf"
            download
            className="zen-cta-primary group inline-flex items-center gap-2 rounded-lg font-sans font-bold leading-none tracking-[-0.01em] py-[15px] px-[22px] text-[15px]"
            style={{ background: Z.lime, color: Z.forest }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.vcard}
          </a>
          <a
            href="/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="zen-arrow-host group inline-flex items-center gap-2 rounded-lg font-sans font-bold leading-none tracking-[-0.01em] py-[15px] px-[22px] text-[15px] transition-[background,border-color] duration-200 hover:bg-[rgba(162,137,255,0.1)]"
            style={{ background: "transparent", color: Z.forest, border: `2px solid ${Z.violet}` }}
          >
            <span aria-hidden="true" style={{ color: Z.violet, fontSize: 15, lineHeight: 1 }}>◉</span>
            {t.skillMap}
            <span className="zen-arrow-nudge" aria-hidden="true" style={{ color: Z.violet }}>↗</span>
          </a>
        </div>

        {/* Primary contact block — phone / email / web in one card */}
        <div className="mt-7">
          <span
            className="font-pixel uppercase"
            style={{ fontSize: 10, color: Z.ember, letterSpacing: "0.08em" }}
          >
            {t.primaryLabel}
          </span>
          <div
            className="mt-4 overflow-hidden relative"
            style={{
              background: Z.white,
              border: `1px solid ${Z.hairline}`,
              borderRadius: 14,
            }}
          >
            {/* Single lime accent stripe — one unifying color for the whole block */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: Z.lime }}
            />
            {primary.map((p, i) => (
              <a
                key={p.href}
                href={p.href}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                className={`${id}-row group relative flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[rgba(15,31,26,0.025)]`}
                style={{
                  textDecoration: "none",
                  color: Z.forest,
                  borderTop: i > 0 ? `1px solid ${Z.hairline}` : "none",
                }}
              >
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 11, color: Z.slate, letterSpacing: "0.08em" }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="font-sans font-bold truncate"
                    style={{ fontSize: 19, color: Z.forest, letterSpacing: "-0.02em" }}
                  >
                    {p.value}
                  </span>
                </div>
                <span
                  className={`${id}-arrow transition-transform duration-200`}
                  style={{ color: Z.slate, fontSize: 22 }}
                  aria-hidden="true"
                >
                  {p.external ? "↗" : "→"}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Projects section */}
        <div className="mt-8">
          <span
            className="font-pixel uppercase"
            style={{ fontSize: 10, color: Z.ember, letterSpacing: "0.08em" }}
          >
            {t.projectsLabel}
          </span>
        </div>
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {projects.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${id}-row zen-card-lift relative flex items-center gap-4 px-5 py-4 group h-full`}
                style={{
                  background: Z.white,
                  border: `1px solid ${Z.hairline}`,
                  borderRadius: 12,
                  textDecoration: "none",
                  color: Z.forest,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                  style={{ background: l.accent }}
                />
                <div className="flex flex-col min-w-0 flex-1 pl-2">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 11, color: l.accent, letterSpacing: "0.08em" }}
                  >
                    {l.label}
                    <span style={{ color: Z.slate, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                      {" · "}
                      {l.sub}
                    </span>
                  </span>
                  <span
                    className="font-sans font-bold truncate"
                    style={{ fontSize: 18, color: Z.forest, letterSpacing: "-0.02em" }}
                  >
                    {l.value}
                  </span>
                </div>
                <span
                  className={`${id}-arrow transition-transform duration-200`}
                  style={{ color: l.accent, fontSize: 22 }}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* CV / Resume block — view online + download PDF */}
        <div className="mt-8">
          <span
            className="font-pixel uppercase"
            style={{ fontSize: 10, color: Z.ember, letterSpacing: "0.08em" }}
          >
            {t.cvLabel}
          </span>
          <div
            className="mt-4 overflow-hidden relative"
            style={{
              background: Z.white,
              border: `1px solid ${Z.hairline}`,
              borderRadius: 14,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: Z.sky }}
            />
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className={`${id}-row group relative flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[rgba(15,31,26,0.025)]`}
              style={{ textDecoration: "none", color: Z.forest }}
            >
              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: 11, color: Z.slate, letterSpacing: "0.08em" }}
                >
                  {t.cvViewSub}
                </span>
                <span
                  className="font-sans font-bold truncate"
                  style={{ fontSize: 19, color: Z.forest, letterSpacing: "-0.02em" }}
                >
                  {t.cvView}
                </span>
              </div>
              <span
                className={`${id}-arrow transition-transform duration-200`}
                style={{ color: Z.slate, fontSize: 22 }}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
            <a
              href="/cv/galgoczy-gergely-cv.pdf"
              download
              className={`${id}-row group relative flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[rgba(15,31,26,0.025)]`}
              style={{
                textDecoration: "none",
                color: Z.forest,
                borderTop: `1px solid ${Z.hairline}`,
              }}
            >
              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: 11, color: Z.slate, letterSpacing: "0.08em" }}
                >
                  {t.cvDownloadSub}
                </span>
                <span
                  className="font-sans font-bold truncate"
                  style={{ fontSize: 19, color: Z.forest, letterSpacing: "-0.02em" }}
                >
                  {t.cvDownload}
                </span>
              </div>
              <span
                className={`${id}-arrow transition-transform duration-200`}
                style={{ color: Z.slate, fontSize: 22 }}
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-3">
          <span
            className="font-pixel uppercase"
            style={{ fontSize: 10, color: "rgba(15,31,26,0.45)", letterSpacing: "0.08em" }}
          >
            [ MADE WITH 8-BIT LOVE ]
          </span>
          <span
            className="font-pixel uppercase"
            style={{ fontSize: 10, color: Z.forest, letterSpacing: "0.08em" }}
          >
            [ Budapest · HU ]
          </span>
        </div>
      </div>
    </div>
  );
}
