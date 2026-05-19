"use client";

import { useId } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

const accent = Z.ember;

export function Founder() {
  const t = useT();
  const BIO = t.founder.bio;
  const beforeQuote = BIO.slice(0, 2);
  const quote = BIO[2];
  const afterQuote = [BIO[3]];

  return (
    <section
      id="alapito"
      className="relative overflow-hidden bg-offwhite"
    >
      <PixelGrid />
      <div className="relative z-[1] px-5 pt-14 pb-8 md:px-14 md:pt-[104px] md:pb-14">
        <Reveal className="flex flex-col gap-3.5 mb-8 md:mb-12 max-w-[720px]">
          <PixelLabel size={10} color={accent} className="md:text-[11px]">
            {t.founder.label}
          </PixelLabel>
          <h2
            className="m-0 font-sans font-bold"
            style={{
              fontSize: "clamp(44px, 6vw, 72px)",
              letterSpacing: "-0.04em",
              color: Z.forest,
              lineHeight: 0.98,
            }}
          >
            {t.founder.h2}
          </h2>
          <span
            className="font-mono"
            style={{
              fontSize: 13,
              color: accent,
              letterSpacing: "0.04em",
            }}
          >
            {t.founder.role}
          </span>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-7 md:gap-14 items-start">
          <Reveal className="flex-1 flex flex-col gap-6 max-w-full md:max-w-[720px]">
            {beforeQuote.map((p, i) => (
              <p
                key={i}
                className="m-0 leading-[1.55]"
                style={{ fontSize: 15, color: Z.slate }}
              >
                {p}
              </p>
            ))}

            <blockquote
              className="relative m-0"
              style={{
                padding: "20px 0 20px 24px",
                borderLeft: `4px solid ${accent}`,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute font-pixel"
                style={{
                  left: 24,
                  top: -14,
                  fontSize: 12,
                  color: accent,
                  background: Z.offwhite,
                  padding: "0 8px",
                  letterSpacing: "0.04em",
                }}
              >
                &quot;
              </span>
              <p
                className="m-0 font-sans font-bold"
                style={{
                  fontSize: "clamp(28px, 4vw, 44px)",
                  letterSpacing: "-0.035em",
                  color: Z.forest,
                  lineHeight: 1.05,
                }}
              >
                {quote}
              </p>
            </blockquote>

            {afterQuote.map((p, i) => (
              <p
                key={i}
                className="m-0 leading-[1.55]"
                style={{ fontSize: 15, color: Z.slate }}
              >
                {p}
              </p>
            ))}

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="zen-arrow-host inline-flex items-center gap-1.5 font-sans w-fit"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: Z.forest,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {t.founder.linkedin}{" "}
              <span className="zen-arrow-nudge" style={{ color: accent }}>
                ↗
              </span>
            </a>
          </Reveal>

          <Reveal
            delay={120}
            className="w-full md:w-[340px] flex flex-col gap-6 shrink-0"
          >
            <PortraitCard />
            <StatStrip />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PortraitCard() {
  const t = useT();
  const raw = useId();
  const id = "fp-" + raw.replace(/[^a-z0-9]/gi, "");
  return (
    <div
      className="group relative overflow-hidden flex flex-col gap-3 shrink-0 zen-card-lift"
      style={{
        width: "100%",
        maxWidth: 360,
        background: Z.white,
        border: `1px solid ${Z.hairline}`,
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 6,
          border: `1px solid ${accent}40`,
        }}
      >
        <style>{`
          /* 4s cycle: ~2.8s original, ~0.2s glitch in, ~0.8s alt (cyborg),
             ~0.2s glitch out. Bigger amplitude than the 5s pass —
             chunkier shake, wider tear translations, contrast spike. */
          @keyframes ${id}-orig {
            0%, 70%   { opacity: 1; }
            72%, 95%  { opacity: 0; }
            100%      { opacity: 1; }
          }
          @keyframes ${id}-alt {
            0%, 70%   { opacity: 0; }
            72%, 95%  { opacity: 1; }
            100%      { opacity: 0; }
          }
          @keyframes ${id}-shake {
            0%, 68%, 76%, 93%, 100% { transform: translate(0, 0) scale(1); filter: none; }
            69%   { transform: translate(5px, -3px) scale(1.04); filter: contrast(1.4) brightness(1.2); }
            70%   { transform: translate(-7px, 2px) scale(0.96); filter: contrast(1.6) hue-rotate(-8deg); }
            71%   { transform: translate(4px, 0) scale(1.03); filter: contrast(1.2) brightness(1.1); }
            72%   { transform: translate(-2px, 1px) scale(1.01); filter: none; }
            94%   { transform: translate(-5px, 3px) scale(1.04); filter: contrast(1.4) brightness(1.2); }
            95%   { transform: translate(7px, -2px) scale(0.96); filter: contrast(1.6) hue-rotate(8deg); }
            96%   { transform: translate(-4px, 0) scale(1.03); filter: contrast(1.2) brightness(1.1); }
          }
          @keyframes ${id}-tear-top {
            0%, 68%, 76%, 93%, 100% { opacity: 0; transform: translate(0); }
            69%   { opacity: 0.95; transform: translate(14px, 0); }
            70%   { opacity: 0.8;  transform: translate(-10px, 0); }
            71%   { opacity: 0.5;  transform: translate(6px, 0); }
            94%   { opacity: 0.95; transform: translate(-14px, 0); }
            95%   { opacity: 0.8;  transform: translate(10px, 0); }
            96%   { opacity: 0.5;  transform: translate(-6px, 0); }
          }
          @keyframes ${id}-tear-bot {
            0%, 68%, 76%, 93%, 100% { opacity: 0; transform: translate(0); }
            69.5% { opacity: 0.85; transform: translate(-12px, 0); }
            70.5% { opacity: 0.7;  transform: translate(8px, 0); }
            94.5% { opacity: 0.85; transform: translate(12px, 0); }
            95.5% { opacity: 0.7;  transform: translate(-8px, 0); }
          }
          .${id}-orig  { animation: ${id}-orig  4s steps(1, end) infinite; }
          .${id}-alt   { animation: ${id}-alt   4s steps(1, end) infinite; }
          .${id}-shake { animation: ${id}-shake 4s steps(1, end) infinite; }
          .${id}-tear-top { animation: ${id}-tear-top 4s steps(1, end) infinite; clip-path: polygon(0 14%, 100% 14%, 100% 44%, 0 44%); }
          .${id}-tear-bot { animation: ${id}-tear-bot 4s steps(1, end) infinite; clip-path: polygon(0 56%, 100% 56%, 100% 84%, 0 84%); }
          @media (prefers-reduced-motion: reduce) {
            .${id}-orig, .${id}-alt, .${id}-shake, .${id}-tear-top, .${id}-tear-bot { animation: none !important; }
            .${id}-alt { opacity: 0 !important; }
          }
        `}</style>

        <div className={`${id}-shake absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]`}>
          <picture>
            <source srcSet="/assets/founder.avif" type="image/avif" />
            <source srcSet="/assets/founder.webp" type="image/webp" />
            <img
              src="/assets/founder.jpg"
              alt={t.founder.photoAlt}
              className={`${id}-orig absolute inset-0 w-full h-full object-cover`}
            />
          </picture>
          <picture>
            <source srcSet="/assets/founder-alt.avif" type="image/avif" />
            <source srcSet="/assets/founder-alt.webp" type="image/webp" />
            <img
              src="/assets/founder-alt.jpg"
              alt=""
              aria-hidden="true"
              className={`${id}-alt absolute inset-0 w-full h-full object-cover`}
            />
          </picture>
        </div>

        {/* CRT-tear bands — show the OTHER image clipped into a horizontal band
            for ~100ms at each swap moment. Top band shows alt (during orig→alt
            transition this gives a "preview" of the cyborg), bottom band shows
            orig (during alt→orig transition). */}
        <picture>
          <source srcSet="/assets/founder-alt.avif" type="image/avif" />
          <source srcSet="/assets/founder-alt.webp" type="image/webp" />
          <img
            src="/assets/founder-alt.jpg"
            alt=""
            aria-hidden="true"
            className={`${id}-tear-top absolute inset-0 w-full h-full object-cover pointer-events-none`}
          />
        </picture>
        <picture>
          <source srcSet="/assets/founder.avif" type="image/avif" />
          <source srcSet="/assets/founder.webp" type="image/webp" />
          <img
            src="/assets/founder.jpg"
            alt=""
            aria-hidden="true"
            className={`${id}-tear-bot absolute inset-0 w-full h-full object-cover pointer-events-none`}
          />
        </picture>
        {/* warm ember tint overlay on hover, very subtle */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${accent}26, transparent 60%)`,
            mixBlendMode: "overlay",
          }}
        />
        {/* pixel-grid overlay, faint, signature brand element */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, ${accent}1f 1px, transparent 1px), linear-gradient(to bottom, ${accent}1f 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
            mixBlendMode: "overlay",
          }}
        />
        {/* mono caption stamp in the brand style */}
        <span
          className="absolute font-mono"
          style={{
            bottom: 10,
            left: 12,
            fontSize: 9,
            color: Z.forest,
            letterSpacing: "0.06em",
            background: "rgba(250,250,247,0.9)",
            padding: "3px 6px",
            borderRadius: 2,
          }}
        >
          {t.founder.photoCaption}
        </span>
      </div>
      <div
        className="flex items-center justify-between"
        style={{ padding: "0 4px" }}
      >
        <span
          className="font-sans font-bold"
          style={{
            fontSize: 16,
            color: Z.forest,
            letterSpacing: "-0.02em",
          }}
        >
          {t.founder.photoName}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            color: accent,
            letterSpacing: "0.04em",
          }}
        >
          {t.founder.photoRole}
        </span>
      </div>
    </div>
  );
}

function StatStrip() {
  const t = useT();
  return (
    <div
      className="grid grid-cols-3 gap-0"
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        borderTop: `1px solid ${Z.hairline}`,
        borderBottom: `1px solid ${Z.hairline}`,
      }}
    >
      {t.founder.stats.map(([val, lbl], i) => (
        <div
          key={i}
          className="flex flex-col gap-1"
          style={{
            paddingLeft: i === 0 ? 0 : 12,
            paddingRight: 6,
            borderLeft: i > 0 ? `1px solid ${Z.hairline}` : "none",
          }}
        >
          <CountUp
            value={val}
            className="font-sans font-bold"
            style={{
              fontSize: 24,
              color: accent,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          />
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 10,
              color: Z.slate,
              letterSpacing: "0.06em",
            }}
          >
            {lbl}
          </span>
        </div>
      ))}
    </div>
  );
}
