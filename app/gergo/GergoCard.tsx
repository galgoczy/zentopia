"use client";

import { useId } from "react";
import Image from "next/image";
import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { GlitchTE } from "@/components/ui/GlitchTE";
import { GlitchText } from "@/components/ui/GlitchText";

type Link = {
  label: string;
  sub?: string;
  href: string;
  mono: string; // mono-style display value (the actual email / URL)
  accent: string;
  external?: boolean;
};

const LINKS: Link[] = [
  {
    label: "Email",
    href: "mailto:gergo@zentopia.io",
    mono: "gergo@zentopia.io",
    accent: Z.ember,
  },
  {
    label: "Telefon",
    href: "tel:+36204680489",
    mono: "+36 20 468 0489",
    accent: Z.sky,
  },
  {
    label: "Zentopia",
    sub: "AI ügynökség",
    href: "https://zentopia.io",
    mono: "zentopia.io",
    accent: Z.lime,
    external: true,
  },
  {
    label: "AI Selfiemata",
    sub: "élménypont · AI fotóbox",
    href: "https://ai.elmeny.hu",
    mono: "ai.elmeny.hu",
    accent: Z.coral,
    external: true,
  },
  {
    label: "YouTube · ChillGuide",
    sub: "AI tartalmak",
    href: "https://youtube.com/@chillguide",
    mono: "youtube.com/@chillguide",
    accent: Z.violet,
    external: true,
  },
  {
    label: "Alfie the Agent",
    sub: "iroda · AI munkatárs",
    href: "mailto:team@zentopia.io",
    mono: "team@zentopia.io",
    accent: Z.sunshine,
  },
];

export default function GergoCard() {
  const raw = useId();
  const id = "gc-" + raw.replace(/[^a-z0-9]/gi, "");

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: Z.offwhite }}
    >
      <PixelGrid />

      <style>{`
        /* 10s subtle glitch on the wrapper — once in a while, never disruptive. */
        @keyframes ${id}-shake {
          0%, 92%, 96%, 100% { transform: translate(0,0); filter: none; }
          93%   { transform: translate(2px, -1px); filter: contrast(1.2); }
          93.5% { transform: translate(-3px, 1px); filter: contrast(1.4) hue-rotate(-6deg); }
          94%   { transform: translate(1px, 0); filter: contrast(1.1); }
        }
        @keyframes ${id}-card-pulse {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        .${id}-shake { animation: ${id}-shake 10s steps(1, end) infinite; }
        .${id}-link:hover .${id}-arrow { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) {
          .${id}-shake { animation: none !important; }
        }
      `}</style>

      <div className={`${id}-shake relative max-w-[720px] mx-auto px-5 pt-10 pb-16 md:px-8 md:pt-16 md:pb-24`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/assets/logo-forest.png"
            alt=""
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain"
          />
          <span
            className="font-sans tracking-wordmark"
            style={{
              fontWeight: 500,
              fontSize: 22,
              color: Z.forest,
              lineHeight: 1,
            }}
          >
            zentopia
          </span>
        </div>

        <span
          className="font-mono inline-block mt-3"
          style={{
            fontSize: 12,
            color: Z.ember,
            letterSpacing: "0.06em",
          }}
        >
          [ 00 ] NÉVJEGY
        </span>

        {/* Name */}
        <h1
          className="m-0 font-sans font-bold mt-3"
          style={{
            fontSize: "clamp(44px, 11vw, 84px)",
            letterSpacing: "-0.04em",
            color: Z.forest,
            lineHeight: 0.96,
          }}
        >
          <GlitchText cycle={12}>Galgóczy</GlitchText>
          <br />
          Gergely
        </h1>

        <div className="mt-4 flex flex-col gap-1.5">
          <span
            className="font-mono"
            style={{
              fontSize: 14,
              color: Z.slate,
              letterSpacing: "0.04em",
            }}
          >
            // alapító · AI stratéga · zentopia
          </span>
          <span
            className="font-mono inline-flex items-center flex-wrap gap-2"
            style={{
              fontSize: 14,
              color: Z.forest,
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ color: Z.ember }}>{"//"}</span>
            <span>AI a</span>
            <GlitchTE>TE</GlitchTE>
            <span>vállalkozásodnak</span>
          </span>
        </div>

        {/* vCard download CTA */}
        <a
          href="/galgoczy.vcf"
          download
          className="zen-cta-primary group inline-flex items-center gap-2 mt-8 rounded-lg font-sans font-bold leading-none tracking-[-0.01em] py-[15px] px-[22px] text-[15px]"
          style={{ background: Z.lime, color: Z.forest }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Mentsd el a névjegyem (vCard)
        </a>

        {/* Link list */}
        <ul className="mt-10 flex flex-col gap-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className={`${id}-link zen-card-lift relative flex items-center gap-4 px-5 py-4 group`}
                style={{
                  background: Z.white,
                  border: `1px solid ${Z.hairline}`,
                  borderRadius: 12,
                  textDecoration: "none",
                  color: Z.forest,
                }}
              >
                {/* Accent stripe on the left */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                  style={{ background: l.accent }}
                />
                <div className="flex flex-col min-w-0 flex-1 pl-2">
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 11,
                      color: l.accent,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {l.label}
                    {l.sub && (
                      <span style={{ color: Z.slate, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                        {" · "}
                        {l.sub}
                      </span>
                    )}
                  </span>
                  <span
                    className="font-sans font-bold truncate"
                    style={{
                      fontSize: 18,
                      color: Z.forest,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {l.mono}
                  </span>
                </div>
                <span
                  className={`${id}-arrow transition-transform duration-200`}
                  style={{ color: l.accent, fontSize: 22 }}
                  aria-hidden="true"
                >
                  {l.external ? "↗" : "→"}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-3">
          <span
            className="font-pixel uppercase"
            style={{
              fontSize: 10,
              color: "rgba(15,31,26,0.45)",
              letterSpacing: "0.08em",
            }}
          >
            [ MADE WITH 8-BIT LOVE ]
          </span>
          <span
            className="font-pixel uppercase"
            style={{
              fontSize: 10,
              color: Z.forest,
              letterSpacing: "0.08em",
            }}
          >
            [ Budapest · HU ]
          </span>
        </div>
      </div>
    </div>
  );
}
