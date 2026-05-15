"use client";

import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Wordmark } from "@/components/ui/Wordmark";
import { RotatingSubline } from "@/components/ui/RotatingSubline";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";

type Col = { label: string; links: { label: string; href: string }[] };

const COLS: Record<"oldal" | "tartalom", Col> = {
  oldal: {
    label: "OLDAL",
    links: [
      { label: "Szolgáltatások", href: "#szolgaltatasok" },
      { label: "Munkák", href: "#munkak" },
      { label: "Folyamat", href: "#folyamat" },
      { label: "Alapító", href: "#alapito" },
      { label: "GYIK", href: "#gyik" },
    ],
  },
  tartalom: {
    label: "TARTALOM",
    links: [
      { label: "labs.zentopia.io ↗", href: "https://labs.zentopia.io" },
      { label: "Hírlevél", href: "#" },
    ],
  },
};

const LEGAL = ["Impresszum", "Adatkezelés", "Cookie szabályzat"];

export function Footer() {
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
                Jövő-technológia.
                <br />
                A Te üzletedben.
                <br />
                <span style={{ color: Z.lime }}>Ma.</span>
              </h3>
            </div>
            <a href="#beszeljunk">
              <CTAPrimary size="md" dark className="md:[--cta-size:lg]">
                Foglalj időpontot →
              </CTAPrimary>
            </a>
          </div>
        </Reveal>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-7 md:gap-10 py-8 md:py-12">
          <FooterLinkCol col={COLS.oldal} />
          <FooterLinkCol col={COLS.tartalom} />
          <div
            className="flex flex-col gap-3.5"
            style={{ gridColumn: "1 / -1" }}
          >
            <PixelLabel size={10} color={Z.lime}>
              KAPCSOLAT
            </PixelLabel>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:hello@zentopia.io"
                className="zen-link-underline font-sans w-fit"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: Z.offwhite,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                hello@zentopia.io
              </a>
              <span
                className="font-sans"
                style={{
                  fontSize: 13,
                  color: "rgba(250,250,247,0.55)",
                }}
              >
                Budapest, HU
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
            © 2026 Zentopia
          </span>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            {LEGAL.map((l) => (
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
  return (
    <div className="flex flex-col gap-3.5">
      <PixelLabel size={10} color={Z.lime}>
        {col.label}
      </PixelLabel>
      <div className="flex flex-col gap-2.5">
        {col.links.map((l) => (
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
        ))}
      </div>
    </div>
  );
}

function BrandBlock() {
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
            messages={[
              "AI a TE vállalkozásodnak.",
              "Hetek, nem hónapok.",
              "AI, gondozva.",
            ]}
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
          Jövő-technológia. A Te üzletedben. Ma.
        </p>
      </div>
    </div>
  );
}

function EasterEgg() {
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
      [ MADE WITH 8-BIT LOVE ]
    </span>
  );
}
