"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SplitHeading } from "@/components/motion/SplitHeading";

type Case = {
  n: string;
  tag: string;
  title: string;
  sub: string;
  stats: [string, string][];
  color: string;
  visual: "photo" | "ledger" | "agent" | "shop";
  href?: string;
};

const CASE_COLORS = [Z.coral, Z.sunshine, Z.sky, Z.violet];
const CASE_VISUALS: Case["visual"][] = ["photo", "ledger", "agent", "shop"];
// Optional outbound URL per case. If set, the "Olvasd el…" link navigates;
// if undefined, the link reveals an inline "// részletek hamarosan" notice.
const CASE_HREFS: (string | undefined)[] = [
  "https://ai.elmeny.hu",  // Selfiemata
  undefined,               // Pepper House
  undefined,               // Alfie
  "https://nolaandco.hu",  // Nola and Co
];

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
    href: CASE_HREFS[i],
  }));
  const TOTAL_STATS = t.cases.statRow;
  const sectionRef = useRef<HTMLElement | null>(null);

  // Colour wash: the section's forest background fades in from the page
  // offwhite as it scrolls into view, instead of a hard edge.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      section,
      { backgroundColor: Z.offwhite },
      {
        backgroundColor: Z.forest,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 92%",
          end: "top 45%",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
        {/* Mobile: stacked cards */}
        <div className="grid grid-cols-1 gap-3.5 md:hidden">
          {CASES.map((c, i) => (
            <Reveal key={c.n} delay={i * 80}>
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
        {/* Desktop: pinned horizontal rail */}
        <HorizontalRail cases={CASES} />
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

// Desktop-only: the card row pins to the viewport and the vertical scroll
// drives it sideways (Volta-style "foundry rail"), with a lime progress
// line underneath. Falls back to nothing below md — the mobile grid covers it.
function HorizontalRail({ cases }: { cases: Case[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!wrap || !track || !bar) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const dist = () => track.scrollWidth - wrap.clientWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "center 55%",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "center 55%",
              end: () => "+=" + dist(),
              scrub: 0.7,
            },
          }
        );
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className="hidden md:block">
      <div ref={trackRef} className="flex w-max items-stretch gap-5 will-change-transform">
        {cases.map((c) => (
          <div key={c.n} className="w-[42vw] max-w-[600px] shrink-0 flex">
            <CaseCard c={c} />
          </div>
        ))}
      </div>
      <div
        className="mt-6"
        style={{ height: 2, background: "rgba(250,250,247,0.12)" }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{ background: Z.lime, transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

function CasesHeader() {
  const t = useT();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 md:mb-10">
      <div className="flex flex-col gap-3.5 max-w-[760px]">
        <Reveal>
          <PixelLabel size={10} color={Z.lime} className="md:text-[11px]">
            {t.cases.label}
          </PixelLabel>
        </Reveal>
        <SplitHeading
          className="m-0 font-sans font-bold"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            letterSpacing: "-0.04em",
            color: Z.offwhite,
            lineHeight: 0.98,
          }}
        >
          {t.cases.h2}
        </SplitHeading>
      </div>
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
        {c.href ? (
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="zen-arrow-host inline-flex items-center gap-1.5 font-sans zen-link-underline"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: Z.offwhite,
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            {t.cases.cardLink}{" "}
            <span className="zen-arrow-nudge" style={{ color: c.color }}>
              ↗
            </span>
          </a>
        ) : (
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
        )}
        <span
          aria-live="polite"
          className="font-mono transition-all duration-300 ease-out"
          style={{
            fontSize: 11,
            color: c.color,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: !c.href && showComing ? 1 : 0,
            transform: !c.href && showComing ? "translateX(0)" : "translateX(-6px)",
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
  const ICON_SRC: Record<Case["visual"], string> = {
    photo: "/assets/case-photo.png",
    ledger: "/assets/case-ledger.png",
    agent: "/assets/case-agent.png",
    shop: "/assets/case-shop.png",
  };

  return (
    <div
      className="zen-pixel-corners relative w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.015]"
      style={{
        height: 184,
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
      <img
        src={ICON_SRC[kind]}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:rotate-[-1deg] ${
          kind === "photo" ? "p-6" : "p-4"
        }`}
        draggable={false}
      />
      <span aria-hidden="true" className="zen-glare" />
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
