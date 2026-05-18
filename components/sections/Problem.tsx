"use client";

import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Typewriter } from "@/components/ui/Typewriter";
import { RasterIcon } from "@/components/ui/RasterIcon";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";

type Problem = {
  n: string;
  color: string;
  iconSrc: string;
  iconAlt: string;
  q: string[];
  sub: string;
};

// 8-bit pixel-art icons in each card's accent color — ember/sky/violet.
const ICON_SRC = [
  "/assets/icon_questionmark.png",
  "/assets/icon_dollarsign.png",
  "/assets/icon_workwheel.png",
];
const ICON_ALT = ["?", "$", "⚙"];

export function Problem() {
  const t = useT();
  const COLORS = [Z.ember, Z.sky, Z.violet];
  const PROBLEMS: Problem[] = t.problem.items.map((p, i) => ({
    n: String(i + 1).padStart(2, "0"),
    color: COLORS[i],
    iconSrc: ICON_SRC[i],
    iconAlt: ICON_ALT[i],
    q: p.lines,
    sub: p.sub,
  }));
  return (
    <section
      id="kerdes"
      className="relative overflow-hidden bg-offwhite"
    >
      <PixelGrid />
      <div className="relative z-[1] px-5 pt-8 pb-14 md:px-14 md:pt-14 md:pb-28">
        <Reveal className="flex flex-col gap-3.5 mb-7 md:mb-12 max-w-[760px]">
          <PixelLabel size={10} className="md:text-[11px]">
            {t.problem.label}
          </PixelLabel>
          <h2
            className="m-0 font-sans font-bold"
            style={{
              fontSize: "clamp(44px, 8vw, 80px)",
              letterSpacing: "-0.035em",
              color: Z.forest,
              lineHeight: 0.98,
            }}
          >
            {t.problem.h2}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <ProblemCard p={p} idx={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <ProblemBridge />
        </Reveal>
      </div>
    </section>
  );
}

function ProblemCard({ p, idx }: { p: Problem; idx: number }) {
  const t = useT();
  return (
    <div
      className="group zen-card-lift flex flex-col overflow-hidden h-full"
      style={{
        background: Z.white,
        border: `1px solid ${Z.hairline}`,
        borderRadius: 12,
        minHeight: 380,
      }}
    >
      <div style={{ height: 5, background: p.color }} />
      <div className="flex flex-col flex-1 gap-5 md:gap-[18px] px-6 pt-7 pb-8 md:px-8 md:pt-9 md:pb-10">
        <div className="flex items-baseline justify-between">
          <span
            className="font-mono uppercase text-[14px] md:text-[11px]"
            style={{
              color: Z.slate,
              letterSpacing: "0.08em",
            }}
          >
            {t.problem.monoPrefix} {p.n}
          </span>
        </div>
        <div className="transition-transform duration-500 group-hover:scale-[1.04] origin-bottom-left flex items-start">
          <RasterIcon
            src={p.iconSrc}
            alt={p.iconAlt}
            color={p.color}
            size={72}
            glitchDelay={idx * 1.8}
            pixelated
          />
        </div>
        <h3
          className="m-0 font-sans font-bold text-[28px] md:text-[30px]"
          style={{
            letterSpacing: "-0.03em",
            color: Z.forest,
            lineHeight: 1.1,
            whiteSpace: "pre-line",
            minHeight: "3.3em",
          }}
        >
          <Typewriter
            text={p.q.join("\n")}
            delay={200 + idx * 1800}
            speed={42}
            cursorColor={p.color}
          />
        </h3>
        <p
          className="m-0 italic leading-[1.5] mt-auto text-[18px] md:text-[15px]"
          style={{
            color: Z.slate,
          }}
        >
          {p.sub}
        </p>
      </div>
    </div>
  );
}

function ProblemBridge() {
  const t = useT();
  return (
    <div
      className="relative overflow-hidden mt-7 md:mt-14"
      style={{
        background: Z.forest,
        color: Z.offwhite,
        borderRadius: 14,
      }}
    >
      <PixelGrid color="rgba(200,255,107,0.06)" />
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-[18px] md:gap-8 px-6 py-9 md:px-14 md:py-14">
        <div className="flex flex-col gap-2 md:gap-3">
          <span
            className="italic"
            style={{
              fontWeight: 400,
              fontSize: 16,
              color: "rgba(250,250,247,0.65)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.problem.bridge.eyebrow}
          </span>
          <span
            className="font-bold"
            style={{
              fontSize: "clamp(22px, 3.2vw, 30px)",
              color: Z.offwhite,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              maxWidth: 720,
            }}
          >
            {t.problem.bridge.leadLine}{" "}
            <span style={{ color: Z.lime }}>{t.problem.bridge.highlight}</span>
          </span>
        </div>
        <a href="#folyamat" className="shrink-0">
          <CTAPrimary size="md" dark className="md:[--cta-size:lg]">
            {t.problem.bridge.cta}
          </CTAPrimary>
        </a>
      </div>
    </div>
  );
}
