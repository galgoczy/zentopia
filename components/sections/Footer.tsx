"use client";

import { useState } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Wordmark } from "@/components/ui/Wordmark";
import { RotatingSubline } from "@/components/ui/RotatingSubline";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";

type Col = { label: string; links: { label: string; href: string }[] };

export function Footer() {
  const t = useT();
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: Z.forestDeep,
        color: Z.offwhite,
      }}
    >
      <PixelGrid color="rgba(200,255,107,0.04)" />
      <div className="relative z-[1] px-5 pt-14 pb-7 md:px-14 md:pt-24 md:pb-9">
        {/* Manifesto block */}
        <Reveal>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 md:pb-16"
            style={{ borderBottom: "1px solid rgba(250,250,247,0.10)" }}
          >
            <div className="flex flex-col gap-[18px]">
              <BrandBlock />
              <h3
                className="m-0 font-sans font-bold"
                style={{
                  fontSize: "clamp(40px, 6vw, 72px)",
                  letterSpacing: "-0.045em",
                  color: Z.offwhite,
                  lineHeight: 0.96,
                  maxWidth: 760,
                }}
              >
                {t.footer.manifesto.lineA}
                <br />
                {t.footer.manifesto.lineB}
                <br />
                <span style={{ color: Z.lime }}>{t.footer.manifesto.lineC}</span>
              </h3>
            </div>
            <a href="#beszeljunk">
              <CTAPrimary size="md" dark className="md:[--cta-size:lg]">
                {t.footer.cta}
              </CTAPrimary>
            </a>
          </div>
        </Reveal>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-7 md:gap-10 py-8 md:py-12">
          <FooterLinkCol col={t.footer.cols.page} />
          <FooterLinkCol col={t.footer.cols.content} />
          <div
            className="flex flex-col gap-3.5"
            style={{ gridColumn: "1 / -1" }}
          >
            <PixelLabel size={10} color={Z.lime}>
              {t.footer.cols.contact.label}
            </PixelLabel>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:team@zentopia.io"
                className="zen-link-underline font-sans w-fit"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: Z.offwhite,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                team@zentopia.io
              </a>
              <span
                className="font-sans"
                style={{
                  fontSize: 13,
                  color: "rgba(250,250,247,0.55)",
                }}
              >
                {t.footer.cols.contact.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-6 pt-6"
          style={{ borderTop: "1px solid rgba(250,250,247,0.10)" }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              color: "rgba(250,250,247,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            {t.footer.copyright}
          </span>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            {t.footer.legal.map((l) => (
              <a
                key={l}
                href="#"
                className="zen-link-underline font-sans"
                style={{
                  fontSize: 12,
                  color: "rgba(250,250,247,0.55)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <EasterEgg />
        </div>
      </div>
    </footer>
  );
}

function FooterLinkCol({ col }: { col: Col }) {
  const t = useT();
  const [labsHinted, setLabsHinted] = useState(false);
  return (
    <div className="flex flex-col gap-3.5">
      <PixelLabel size={10} color={Z.lime}>
        {col.label}
      </PixelLabel>
      <div className="flex flex-col gap-2.5">
        {col.links.map((l) => {
          if (l.href.includes("labs.zentopia.io")) {
            return (
              <span key={l.label} className="inline-flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setLabsHinted(true)}
                  className="zen-link-underline font-sans w-fit bg-transparent border-0 p-0 cursor-pointer text-left"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(250,250,247,0.85)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {l.label}
                </button>
                <span
                  aria-live="polite"
                  className="font-mono transition-all duration-300 ease-out"
                  style={{
                    fontSize: 10,
                    color: Z.lime,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    opacity: labsHinted ? 1 : 0,
                    transform: labsHinted ? "translateX(0)" : "translateX(-6px)",
                    pointerEvents: "none",
                  }}
                >
                  {t.nav.labsComing}
                </span>
              </span>
            );
          }
          return (
            <a
              key={l.label}
              href={l.href}
              className="zen-link-underline font-sans w-fit"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(250,250,247,0.85)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {l.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function BrandBlock() {
  const t = useT();
  return (
    <div className="flex flex-col gap-4 max-w-[360px]">
      <Wordmark size={32} iconVariant="white" color={Z.offwhite} />
      <div className="flex flex-col gap-2">
        <span
          className="font-mono inline-flex items-baseline gap-1.5"
          style={{
            fontSize: 13,
            color: Z.lime,
            letterSpacing: "0.02em",
            minHeight: "1.5em",
          }}
        >
          <span>{"//"}</span>
          <RotatingSubline
            messages={t.hero.sublines}
            intervalMs={4000}
            color={Z.lime}
            className="text-[13px]"
          />
        </span>
        <p
          className="m-0 leading-[1.55] max-w-[320px]"
          style={{
            fontSize: 13,
            color: "rgba(250,250,247,0.55)",
          }}
        >
          {t.footer.manifesto.lineA} {t.footer.manifesto.lineB} {t.footer.manifesto.lineC}
        </p>
      </div>
    </div>
  );
}

function EasterEgg() {
  const t = useT();
  return (
    <span
      className="font-pixel whitespace-nowrap select-none transition-colors duration-500 hover:!text-lime cursor-default"
      style={{
        fontSize: 9,
        color: "rgba(250,250,247,0.35)",
        letterSpacing: "0.06em",
      }}
      title="zentopia · 8-bit love"
    >
      {t.footer.easterEgg}
    </span>
  );
}
