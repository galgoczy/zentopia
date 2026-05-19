"use client";

import { useState } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

type Case = {
  n: string;
  tag: string;
  title: string;
  sub: string;
  stats: [string, string][];
  color: string;
  visual: "photo" | "ledger" | "agent" | "shop";
};

const CASE_COLORS = [Z.coral, Z.sunshine, Z.sky, Z.violet];
const CASE_VISUALS: Case["visual"][] = ["photo", "ledger", "agent", "shop"];

export function Cases() {
  const t = useT();
  const CASES: Case[] = t.cases.items.map((c, i) => ({
    n: String(i + 1).padStart(2, "0"),
    tag: c.tag,
    title: c.title,
    sub: c.sub,
    stats: c.stats,
    color: CASE_COLORS[i],
    visual: CASE_VISUALS[i],
  }));
  const TOTAL_STATS = t.cases.statRow;
  return (
    <section
      id="munkak"
      className="relative overflow-hidden"
      style={{
        background: Z.forest,
        color: Z.offwhite,
      }}
    >
      <PixelGrid color="rgba(200,255,107,0.05)" />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: -200,
          left: -100,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(200,255,107,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-[1] px-5 py-14 md:px-14 md:py-[104px]">
        <CasesHeader />
        <StatRow />
        <div className="h-7 md:h-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.n} delay={i * 80}>
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
        <div className="flex justify-start md:justify-end mt-8 md:mt-12">
          <a href="#beszeljunk">
            <CTAPrimary size="md" dark className="md:[--cta-size:lg]">
              {t.cases.footerCta}
            </CTAPrimary>
          </a>
        </div>
      </div>
    </section>
  );
}

function CasesHeader() {
  const t = useT();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 md:mb-10">
      <Reveal className="flex flex-col gap-3.5 max-w-[760px]">
        <PixelLabel size={10} color={Z.lime} className="md:text-[11px]">
          {t.cases.label}
        </PixelLabel>
        <h2
          className="m-0 font-sans font-bold"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            letterSpacing: "-0.04em",
            color: Z.offwhite,
            lineHeight: 0.98,
          }}
        >
          {t.cases.h2}
        </h2>
      </Reveal>
      <Reveal delay={80} className="md:max-w-[340px]">
        <p
          className="m-0 leading-[1.5] md:text-right"
          style={{
            fontSize: 15,
            color: "rgba(250,250,247,0.65)",
          }}
        >
          {t.cases.sub}
        </p>
      </Reveal>
    </div>
  );
}

function StatRow() {
  const t = useT();
  const TOTAL_STATS = t.cases.statRow;
  const muted = "rgba(250,250,247,0.55)";
  const border = "rgba(250,250,247,0.10)";
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0"
      style={{
        padding: "20px 0",
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
      }}
    >
      {TOTAL_STATS.map(([v, l], i) => (
        <div
          key={i}
          className="flex flex-col gap-1.5"
          style={{
            padding: "0 4px",
            borderLeft: i > 0 ? `1px solid ${border}` : "none",
          }}
        >
          <CountUp
            value={v}
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              color: Z.offwhite,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          />
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              color: muted,
              letterSpacing: "0.06em",
            }}
          >
            // {l}
          </span>
        </div>
      ))}
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  const t = useT();
  const muted = "rgba(250,250,247,0.62)";
  const border = "rgba(250,250,247,0.10)";
  const [showComing, setShowComing] = useState(false);
  return (
    <div
      className="group zen-card-lift relative overflow-hidden flex flex-col flex-1 h-full"
      style={{
        background: "rgba(250,250,247,0.035)",
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: 22,
        gap: 16,
      }}
    >
      <CaseVisual kind={c.visual} color={c.color} />

      <div className="flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-mono"
            style={{ fontSize: 10, color: c.color, letterSpacing: "0.08em" }}
          >
            {c.tag}
          </span>
          <span
            className="font-pixel"
            style={{ fontSize: 10, color: muted, letterSpacing: "0.04em" }}
          >
            [ {c.n} ]
          </span>
        </div>
        <h3
          className="m-0 font-sans font-bold transition-colors duration-300 group-hover:!text-[color:var(--accent)] text-[28px] md:text-[30px]"
          style={
            {
              letterSpacing: "-0.03em",
              color: Z.offwhite,
              lineHeight: 1.05,
              "--accent": c.color,
            } as React.CSSProperties
          }
        >
          {c.title}
        </h3>
        <p
          className="m-0 leading-[1.5] flex-1"
          style={{ fontSize: 14, color: muted }}
        >
          {c.sub}
        </p>
      </div>

      <div
        className="grid grid-cols-3 gap-2 pt-3.5"
        style={{ borderTop: `1px solid ${border}` }}
      >
        {c.stats.map(([v, l], i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <CountUp
              value={v}
              className="font-sans font-bold"
              style={{
                fontSize: 16,
                color: c.color,
                letterSpacing: "-0.02em",
              }}
            />
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 9,
                color: muted,
                letterSpacing: "0.04em",
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center flex-wrap gap-3 mt-1">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowComing(true);
          }}
          className="zen-arrow-host inline-flex items-center gap-1.5 font-sans cursor-pointer bg-transparent border-0 p-0"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: Z.offwhite,
            letterSpacing: "-0.01em",
          }}
        >
          {t.cases.cardLink}{" "}
          <span className="zen-arrow-nudge" style={{ color: c.color }}>
            →
          </span>
        </button>
        <span
          aria-live="polite"
          className="font-mono transition-all duration-300 ease-out"
          style={{
            fontSize: 11,
            color: c.color,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: showComing ? 1 : 0,
            transform: showComing ? "translateX(0)" : "translateX(-6px)",
            pointerEvents: "none",
          }}
        >
          {t.cases.comingSoon}
        </span>
      </div>
    </div>
  );
}

function CaseVisual({
  kind,
  color,
}: {
  kind: Case["visual"];
  color: string;
}) {
  const stroke = {
    strokeWidth: 1.5,
    stroke: color,
    fill: "none" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const inner = (() => {
    if (kind === "photo")
      return (
        <g>
          <rect x="20" y="34" width="160" height="92" rx="3" {...stroke} />
          <circle cx="100" cy="80" r="22" {...stroke} strokeWidth={2} />
          <circle cx="100" cy="80" r="10" {...stroke} />
          <line x1="40" y1="46" x2="62" y2="46" {...stroke} />
          <line x1="158" y1="46" x2="168" y2="46" {...stroke} />
          <circle cx="40" cy="46" r="2" fill={color} />
          <circle cx="168" cy="46" r="2" fill={color} />
        </g>
      );
    if (kind === "ledger")
      return (
        <g>
          <line x1="20" y1="44" x2="180" y2="44" {...stroke} />
          <line x1="20" y1="64" x2="180" y2="64" {...stroke} />
          <line x1="20" y1="84" x2="140" y2="84" {...stroke} />
          <line x1="20" y1="104" x2="160" y2="104" {...stroke} />
          <line x1="20" y1="124" x2="100" y2="124" {...stroke} />
          <circle cx="180" cy="44" r="2.5" fill={color} />
          <circle cx="180" cy="64" r="2.5" fill={color} />
          <circle cx="140" cy="84" r="2.5" fill={color} />
          <circle cx="160" cy="104" r="2.5" fill={color} />
          <circle cx="100" cy="124" r="2.5" fill={color} />
        </g>
      );
    if (kind === "agent")
      return (
        <g>
          {/* Back-most head — faintest, smallest. Drawn first so it sits behind. */}
          <ellipse cx="148" cy="84" rx="20" ry="26" {...stroke} opacity={0.32} />
          <path d="M 168 79 L 174 84 L 168 89" {...stroke} opacity={0.32} />
          <circle cx="148" cy="113" r="2" fill={color} opacity={0.32} />

          {/* Middle head */}
          <ellipse cx="103" cy="82" rx="22" ry="28" {...stroke} opacity={0.55} />
          <path d="M 125 77 L 131 82 L 125 87" {...stroke} opacity={0.55} />
          <circle cx="103" cy="112" r="2.4" fill={color} opacity={0.55} />

          {/* Front head — biggest, with brain detail + headset arc */}
          <ellipse cx="55" cy="80" rx="26" ry="32" {...stroke} strokeWidth={2} />
          <path d="M 81 75 L 87 80 L 81 85" {...stroke} strokeWidth={2} />
          {/* Mouth indent */}
          <line x1="74" y1="92" x2="78" y2="92" {...stroke} />
          {/* Headset arc + earpiece terminal */}
          <path d="M 32 68 Q 55 46 80 68" {...stroke} strokeWidth={2} />
          <circle cx="32" cy="68" r="3" fill={color} />
          {/* Brain pixel detail inside the front head */}
          <rect x="44" y="68" width="22" height="16" rx="1" {...stroke} />
          <circle cx="49" cy="72" r="1.2" fill={color} />
          <circle cx="55" cy="71" r="1.2" fill={color} />
          <circle cx="60" cy="75" r="1.2" fill={color} />
          <circle cx="62" cy="80" r="1.2" fill={color} />
          <circle cx="52" cy="79" r="1.2" fill={color} />
          {/* Terminal dot at the chin */}
          <circle cx="55" cy="113" r="3" fill={color} />
        </g>
      );
    return (
      <g>
        <polyline points="40,40 60,40 70,108 160,108" {...stroke} strokeWidth={2} />
        <circle cx="86" cy="124" r="6" {...stroke} />
        <circle cx="146" cy="124" r="6" {...stroke} />
        <rect x="70" y="56" width="100" height="42" {...stroke} />
        <line x1="80" y1="72" x2="120" y2="72" {...stroke} />
        <line x1="80" y1="84" x2="140" y2="84" {...stroke} />
        <circle cx="160" cy="56" r="3" fill={color} />
        <circle cx="120" cy="72" r="2" fill={color} />
        <circle cx="140" cy="84" r="2" fill={color} />
      </g>
    );
  })();

  return (
    <div
      className="relative w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.015]"
      style={{
        height: 160,
        borderRadius: 8,
        background: `${color}1a`,
        border: `1px solid ${color}40`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${color}1c 1px, transparent 1px), linear-gradient(to bottom, ${color}1c 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />
      <svg
        viewBox="0 0 200 160"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:rotate-[-1deg]"
      >
        {inner}
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-2.5 right-2.5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 4px)",
          gridTemplateRows: "repeat(3, 4px)",
          gap: 1,
        }}
      >
        {[1, 1, 0, 1, 1, 1, 0, 1, 1].map((v, i) => (
          <span
            key={i}
            style={{
              width: 4,
              height: 4,
              background: v ? color : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}
