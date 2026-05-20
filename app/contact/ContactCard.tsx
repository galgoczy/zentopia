"use client";

import { useId } from "react";
import Image from "next/image";
import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { GlitchTE } from "@/components/ui/GlitchTE";

// Mobile-first digital business card I show in person. The whole sheet is
// rotated 180° so when I hold the phone up to someone facing me, they read
// it right-side-up. The QR is rotation-invariant so it scans either way.

export default function ContactCard() {
  const raw = useId();
  const id = "cc-" + raw.replace(/[^a-z0-9]/gi, "");

  return (
    <div
      className="min-h-screen w-full flex items-stretch justify-center"
      style={{ background: Z.forestDeep }}
    >
      {/* Rotated wrapper — the whole card is upside-down. */}
      <div
        className="relative w-full max-w-[480px] flex flex-col"
        style={{ transform: "rotate(180deg)" }}
      >
        <style>{`
          /* 8s loop, ~150ms glitch flash, kept subtle so it doesn't compete
             with the QR. */
          @keyframes ${id}-shake {
            0%, 94%, 97%, 100% { transform: translate(0,0); filter: none; }
            94.6% { transform: translate(2px, -1px); filter: contrast(1.3); }
            95.2% { transform: translate(-3px, 2px); filter: contrast(1.5) hue-rotate(-6deg); }
            96%   { transform: translate(1px, 0); filter: contrast(1.2); }
          }
          @keyframes ${id}-tear {
            0%, 94%, 97%, 100% { opacity: 0; transform: translate(0); }
            95% { opacity: 0.7; transform: translate(8px, 0); }
            95.6% { opacity: 0.5; transform: translate(-6px, 0); }
          }
          .${id}-shake { animation: ${id}-shake 8s steps(1, end) infinite; }
          .${id}-tear  { animation: ${id}-tear 8s steps(1, end) infinite; clip-path: polygon(0 18%, 100% 18%, 100% 36%, 0 36%); }
          @media (prefers-reduced-motion: reduce) {
            .${id}-shake, .${id}-tear { animation: none !important; }
          }
        `}</style>

        <PixelGrid color="rgba(200,255,107,0.05)" />

        {/* Lime radial glow behind the QR for visual focus */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle, rgba(200,255,107,0.16), transparent 60%)",
          }}
        />

        <div className={`${id}-shake relative flex-1 flex flex-col px-6 pt-8 pb-8`}>
          {/* Header — wordmark */}
          <div className="flex items-center gap-3 mb-7">
            <Image
              src="/assets/logo-lime.png"
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
                fontSize: 26,
                color: Z.offwhite,
                lineHeight: 1,
              }}
            >
              zentopia
            </span>
          </div>

          {/* Avatar + name row */}
          <div className="flex items-center gap-4">
            <picture
              className="shrink-0 block relative overflow-hidden"
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                border: `2px solid ${Z.lime}`,
                boxShadow: `0 0 0 4px ${Z.forestDeep}, 0 0 24px rgba(200,255,107,0.25)`,
              }}
            >
              <source srcSet="/assets/founder.avif" type="image/avif" />
              <source srcSet="/assets/founder.webp" type="image/webp" />
              <img
                src="/assets/founder.jpg"
                alt="Gergely Galgóczy"
                className="block w-full h-full object-cover"
                style={{ objectPosition: "center 28%" }}
              />
            </picture>

            <h1
              className="m-0 font-sans font-bold flex-1 min-w-0"
              style={{
                fontSize: "clamp(32px, 8.5vw, 44px)",
                letterSpacing: "-0.035em",
                color: Z.offwhite,
                lineHeight: 0.98,
              }}
            >
              Gergely
              <br />
              Galgóczy
            </h1>
          </div>

          {/* Two-row info block underneath the avatar/name */}
          <div className="mt-5 flex flex-col gap-1.5">
            <span
              className="font-mono"
              style={{
                fontSize: 14,
                color: "rgba(250,250,247,0.65)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: Z.ember }}>{"//"}</span>{" "}
              founder · AI strategist
            </span>
            <span
              className="font-mono inline-flex items-center flex-wrap gap-2"
              style={{
                fontSize: 14,
                color: Z.offwhite,
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: Z.ember }}>{"//"}</span>
              <span>AI for</span>
              <GlitchTE>YOUR</GlitchTE>
              <span>business</span>
            </span>
          </div>

          {/* QR plinth — white card with brand corner brackets */}
          <div className="relative mt-7 self-center">
            <span
              className="absolute w-3 h-3"
              style={{
                top: -6,
                left: -6,
                borderTop: `2px solid ${Z.lime}`,
                borderLeft: `2px solid ${Z.lime}`,
              }}
            />
            <span
              className="absolute w-3 h-3"
              style={{
                top: -6,
                right: -6,
                borderTop: `2px solid ${Z.lime}`,
                borderRight: `2px solid ${Z.lime}`,
              }}
            />
            <span
              className="absolute w-3 h-3"
              style={{
                bottom: -6,
                left: -6,
                borderBottom: `2px solid ${Z.lime}`,
                borderLeft: `2px solid ${Z.lime}`,
              }}
            />
            <span
              className="absolute w-3 h-3"
              style={{
                bottom: -6,
                right: -6,
                borderBottom: `2px solid ${Z.lime}`,
                borderRight: `2px solid ${Z.lime}`,
              }}
            />
            <a
              href="/gergo"
              aria-label="zentopia.io/gergo — kapcsolat"
              className="block p-4 transition-transform duration-200 active:scale-[0.97]"
              style={{
                background: Z.offwhite,
                borderRadius: 8,
              }}
            >
              <img
                src="/assets/qr-gergo.svg"
                alt="QR — zentopia.io/gergo"
                className="block"
                style={{ width: 220, height: 220, imageRendering: "pixelated" }}
              />
            </a>
            {/* Tear strip — short glitch flash that re-renders the QR shifted.
                Light enough to never break the actual scan. */}
            <div className={`${id}-tear absolute inset-0 pointer-events-none`}>
              <div
                className="p-4"
                style={{
                  background: Z.offwhite,
                  borderRadius: 8,
                }}
              >
                <img
                  src="/assets/qr-gergo.svg"
                  alt=""
                  aria-hidden="true"
                  className="block"
                  style={{ width: 220, height: 220, imageRendering: "pixelated" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 self-center flex flex-col items-center gap-1">
            <span
              className="font-pixel uppercase"
              style={{
                fontSize: 11,
                color: Z.lime,
                letterSpacing: "0.08em",
              }}
            >
              [ Scan me · Szkenneld be ]
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 12,
                color: "rgba(250,250,247,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              zentopia.io/gergo
            </span>
          </div>

          <div className="flex-1" />

          {/* Footer — Budapest pixel pattern */}
          <div className="mt-10 flex items-center justify-between">
            <span
              className="font-pixel uppercase"
              style={{
                fontSize: 10,
                color: "rgba(250,250,247,0.45)",
                letterSpacing: "0.08em",
              }}
            >
              [ MADE WITH 8-BIT LOVE ]
            </span>
            <div className="flex flex-col items-end gap-1">
              <span
                className="font-pixel uppercase"
                style={{
                  fontSize: 10,
                  color: Z.offwhite,
                  letterSpacing: "0.08em",
                }}
              >
                [ Budapest · HU ]
              </span>
              <div
                aria-hidden="true"
                className="grid grid-cols-5 gap-[2px]"
                style={{ gridAutoRows: "5px" }}
              >
                {[
                  1, 1, 0, 1, 1,
                  0, 1, 1, 1, 0,
                  1, 0, 1, 0, 1,
                ].map((v, i) => (
                  <span
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      background: v
                        ? i % 2 === 0
                          ? Z.lime
                          : "rgba(250,250,247,0.5)"
                        : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
