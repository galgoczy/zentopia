"use client";

import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { GlitchTE } from "@/components/ui/GlitchTE";
import { RotatingSubline } from "@/components/ui/RotatingSubline";
import { CTAPrimary, CTASecondary } from "@/components/ui/CTA";
import { BreathingBonsai } from "@/components/ui/BreathingBonsai";
import { TechStackStrip } from "@/components/ui/TechStackStrip";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden" id="manifesto">
      <PixelGrid />

      <div className="relative z-[1] px-5 pt-9 pb-7 md:px-14 md:pt-[88px] md:pb-16 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-10">
        {/* Bonsai shows above text on mobile, right side on desktop */}
        <BonsaiPanel className="order-1 md:order-2 mx-auto md:mx-0" />

        <div className="order-2 md:order-1 flex flex-col gap-5 md:gap-7 max-w-full md:max-w-[660px]">
          <Reveal>
            <PixelLabel size={10} className="md:text-[11px]">
              [ 00 ] MANIFESTO
            </PixelLabel>
          </Reveal>

          <Reveal delay={60}>
            <h1
              className="font-sans font-bold m-0"
              style={{
                fontSize: "clamp(40px, 8vw, 84px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: Z.forest,
                textWrap: "balance" as any,
              }}
            >
              Jövő-technológia.
              <br />A <GlitchTE /> üzletedben.
              <br />
              Ma.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div
              className="leading-[1.5] inline-flex items-center gap-2.5"
              style={{ fontSize: 14, minHeight: 22 }}
            >
              <span className="zen-led shrink-0" aria-hidden="true" />
              <span
                className="font-mono inline-block"
                style={{
                  color: Z.slate,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                }}
              >
                //
              </span>
              <RotatingSubline
                messages={[
                  "AI a TE vállalkozásodnak.",
                  "Hetek, nem hónapok.",
                  "AI, gondozva.",
                ]}
                color={Z.forest}
                className="text-[14px] md:text-[17px]"
              />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-wrap gap-3 mt-1">
              <a href="#beszeljunk">
                <CTAPrimary size="md" className="md:[--cta-size:lg]">
                  Foglalj 30 perces AI-konzultációt →
                </CTAPrimary>
              </a>
              <a href="#munkak">
                <CTASecondary size="md">Nézd a munkákat</CTASecondary>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-[1] pb-[18px] md:pb-6">
        <TechStackStrip />
      </div>
    </section>
  );
}

function BonsaiPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* desktop corner brackets */}
      <span
        className="hidden md:block absolute top-0 left-0 w-[18px] h-[18px]"
        style={{
          borderTop: `2px solid ${Z.forest}`,
          borderLeft: `2px solid ${Z.forest}`,
        }}
      />
      <span
        className="hidden md:block absolute top-0 right-0 w-[18px] h-[18px]"
        style={{
          borderTop: `2px solid ${Z.forest}`,
          borderRight: `2px solid ${Z.forest}`,
        }}
      />
      <span
        className="hidden md:block absolute bottom-0 left-0 w-[18px] h-[18px]"
        style={{
          borderBottom: `2px solid ${Z.forest}`,
          borderLeft: `2px solid ${Z.forest}`,
        }}
      />
      <span
        className="hidden md:block absolute bottom-0 right-0 w-[18px] h-[18px]"
        style={{
          borderBottom: `2px solid ${Z.forest}`,
          borderRight: `2px solid ${Z.forest}`,
        }}
      />
      <div className="relative p-2 md:p-6">
        <div className="md:hidden">
          <BreathingBonsai size={200} base="forest" />
        </div>
        <div className="hidden md:block">
          <BreathingBonsai size={460} base="forest" />
        </div>
      </div>
      <span
        className="absolute font-mono"
        style={{
          right: 4,
          bottom: -4,
          fontSize: 10,
          color: Z.slate,
          letterSpacing: "0.06em",
        }}
      >
        <span className="md:hidden">circuit_bonsai.v2</span>
      </span>
      <span
        className="hidden md:inline-block absolute font-mono"
        style={{
          right: 12,
          bottom: 6,
          fontSize: 10,
          color: Z.slate,
          letterSpacing: "0.06em",
        }}
      >
        circuit_bonsai.v2
      </span>
    </div>
  );
}
