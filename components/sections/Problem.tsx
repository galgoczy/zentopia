"use client";

import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Typewriter } from "@/components/ui/Typewriter";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";

type Problem = {
  n: string;
  color: string;
  symbol: string;
  q: string[];
  sub: string;
};

const PROBLEMS: Problem[] = [
  { n: "01", color: Z.ember,  symbol: "?", q: ["Használnád az AI-t,", "de nem tudod,", "pontosan mire?"], sub: "Sok eszköz, sok hype, sok ígéret. De konkrétan?" },
  { n: "02", color: Z.sky,    symbol: "$", q: ["Melyik eszköz hozna", "tényleg bevételt?"],                sub: "Nem trend, nem demo — valódi üzleti hatás." },
  { n: "03", color: Z.violet, symbol: "⚙", q: ["Hogy tudnál kiváltani", "emberi munkaerőt?"],              sub: "Vagy felgyorsítani azt, ami már működik." },
];

export function Problem() {
  return (
    <section
      id="kerdes"
      className="relative overflow-hidden bg-offwhite"
    >
      <PixelGrid />
      <div className="relative z-[1] px-5 py-12 md:px-14 md:py-24">
        <Reveal className="flex flex-col gap-3.5 mb-7 md:mb-12 max-w-[760px]">
          <PixelLabel size={10} className="md:text-[11px]">
            [ 03 ] A KÉRDÉS
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
            Ismerős?
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
      <div className="flex flex-col flex-1 gap-[14px] md:gap-[18px] px-5 pt-[22px] pb-6 md:px-8 md:pt-9 md:pb-10">
        <div className="flex items-baseline justify-between">
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              color: Z.slate,
              letterSpacing: "0.08em",
            }}
          >
            // kérdés {p.n}
          </span>
        </div>
        <div
          className="font-sans font-bold transition-transform duration-500 group-hover:scale-[1.04] origin-bottom-left"
          style={{
            fontSize: "clamp(60px, 9vw, 104px)",
            color: p.color,
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            height: "clamp(51px, 8vw, 88px)",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {p.symbol}
        </div>
        <h3
          className="m-0 font-sans font-bold"
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
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
          className="m-0 italic leading-[1.5] mt-auto"
          style={{
            fontSize: 14,
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
            Ismerős kérdések?
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
            Akkor jó helyen jársz.{" "}
            <span style={{ color: Z.lime }}>
              Megmutatjuk, hogyan találunk rájuk választ →
            </span>
          </span>
        </div>
        <a href="#folyamat" className="shrink-0">
          <CTAPrimary size="md" dark className="md:[--cta-size:lg]">
            Mutasd a folyamatot →
          </CTAPrimary>
        </a>
      </div>
    </div>
  );
}
