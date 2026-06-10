"use client";

import { useEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import type { Dict } from "@/lib/translations/hu";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { CTAPrimary } from "@/components/ui/CTA";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

type Step = { n: string; color: string; title: string; time: string; body: string };

const STEP_COLORS = [Z.ember, Z.sky, Z.violet, Z.sunshine];

function buildSteps(t: Dict): Step[] {
  return t.process.steps.map((s, i) => ({
    n: String(i + 1).padStart(2, "0"),
    color: STEP_COLORS[i],
    title: s.title,
    time: s.time,
    body: s.body,
  }));
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setM(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return m;
}

export function Process() {
  const t = useT();
  const STEPS = buildSteps(t);
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = useState(-1);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Mobile: scroll-tied via IntersectionObserver — the highest step that crosses the
  // mid-viewport line is the active one.
  useEffect(() => {
    if (!isMobile) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.idx))
          .filter((n) => !Number.isNaN(n));
        if (visible.length) {
          setActiveIdx((cur) => Math.max(cur, Math.max(...visible)));
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [isMobile]);

  // Desktop: auto-advance every 1.5s, hold 2.8s, reset, repeat.
  useEffect(() => {
    if (isMobile) return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let started = false;

    const startLoop = () => {
      if (started) return;
      started = true;
      let i = -1;
      const tick = () => {
        if (cancelled) return;
        i++;
        if (i >= STEPS.length) {
          timer = setTimeout(() => {
            if (cancelled) return;
            i = -1;
            setActiveIdx(-1);
            timer = setTimeout(tick, 800);
          }, 2800);
          return;
        }
        setActiveIdx(i);
        timer = setTimeout(tick, 1500);
      };
      timer = setTimeout(tick, 500);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startLoop();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(sectionEl);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      io.disconnect();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="folyamat"
      className="relative overflow-hidden bg-offwhite"
    >
      <PixelGrid />
      <div className="relative z-[1] px-5 pt-8 pb-14 md:px-14 md:pt-14 md:pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-14">
          <div className="flex flex-col gap-3.5 max-w-[720px]">
            <Reveal>
              <PixelLabel size={10} className="md:text-[11px]">
                {t.process.label}
              </PixelLabel>
            </Reveal>
            <SplitHeading
              className="m-0 font-sans font-bold"
              style={{
                fontSize: "clamp(44px, 6vw, 72px)",
                letterSpacing: "-0.035em",
                color: Z.forest,
                lineHeight: 1,
              }}
            >
              {t.process.h2}
            </SplitHeading>
          </div>
          <Reveal delay={80} className="md:max-w-[340px]">
            <p
              className="m-0 leading-[1.5] md:text-right"
              style={{
                fontSize: 15,
                color: Z.slate,
              }}
            >
              {t.process.sub}
            </p>
          </Reveal>
        </div>

        {/* Mobile vertical timeline */}
        <div className="flex flex-col md:hidden">
          {STEPS.map((s, i) => {
            const active = i <= activeIdx;
            const isLast = i === STEPS.length - 1;
            const nextActive = i + 1 <= activeIdx;
            return (
              <div
                key={s.n}
                data-idx={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex items-stretch"
              >
                <div className="w-[18px] flex flex-col items-center shrink-0 pt-1">
                  <Node color={s.color} active={active} />
                  {!isLast && (
                    <Connector
                      from={s.color}
                      to={STEPS[i + 1].color}
                      active={nextActive}
                      vertical
                      durationMs={1500}
                    />
                  )}
                </div>
                <StationBody s={s} active={active} mobile />
              </div>
            );
          })}
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:flex flex-row gap-0 items-stretch">
          {STEPS.map((s, i) => {
            const active = i <= activeIdx;
            const isLast = i === STEPS.length - 1;
            const nextActive = i + 1 <= activeIdx;
            return (
              <div key={s.n} className="flex-1 flex flex-col">
                <div className="flex items-center" style={{ height: 20 }}>
                  <Node color={s.color} active={active} />
                  {!isLast && (
                    <Connector
                      from={s.color}
                      to={STEPS[i + 1].color}
                      active={nextActive}
                      durationMs={1300}
                    />
                  )}
                </div>
                <StationBody s={s} active={active} />
              </div>
            );
          })}
        </div>

        <KezdesCard />
      </div>
    </section>
  );
}

function Node({ color, active }: { color: string; active: boolean }) {
  return (
    <div
      className="shrink-0 z-[2] rounded-full"
      style={{
        width: 18,
        height: 18,
        background: active ? color : Z.hairline,
        border: `3px solid ${Z.offwhite}`,
        boxShadow: active
          ? `0 0 0 2px ${color}, 0 0 14px ${color}`
          : `0 0 0 2px ${Z.hairline}`,
        transition: "background 500ms ease, box-shadow 500ms ease",
      }}
    />
  );
}

function Connector({
  from,
  to,
  active,
  vertical = false,
  durationMs,
}: {
  from: string;
  to: string;
  active: boolean;
  vertical?: boolean;
  durationMs: number;
}) {
  const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
  return (
    <div
      className="relative flex-1"
      style={
        vertical
          ? { width: 2, minHeight: 30, background: Z.hairline, marginTop: 4, marginBottom: 4 }
          : { height: 2, background: Z.hairline, marginLeft: 4, marginRight: 4 }
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${vertical ? "to bottom" : "to right"}, ${from}, ${to})`,
          clipPath: active
            ? "inset(0 0 0 0)"
            : vertical
            ? "inset(0 0 100% 0)"
            : "inset(0 100% 0 0)",
          transition: `clip-path ${durationMs}ms ${ease}`,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 8,
          height: 8,
          background: to,
          boxShadow: `0 0 10px ${to}, 0 0 18px ${to}`,
          opacity: active ? 1 : 0,
          ...(vertical
            ? { left: -3, top: active ? "calc(100% - 8px)" : -4 }
            : { top: -3, left: active ? "calc(100% - 8px)" : -4 }),
          transition: `left ${durationMs}ms ${ease}, top ${durationMs}ms ${ease}, opacity 240ms ease`,
        }}
      />
    </div>
  );
}

function StationBody({
  s,
  active,
  mobile = false,
}: {
  s: Step;
  active: boolean;
  mobile?: boolean;
}) {
  const t = useT();
  return (
    <div
      className="flex-1 flex flex-col gap-3 transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0.32,
        padding: mobile ? "0 0 16px 24px" : "24px 16px 0 16px",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="font-mono"
          style={{ fontSize: 11, color: s.color, letterSpacing: "0.08em" }}
        >
          {t.process.stepMonoPrefix} {s.n}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            color: Z.slate,
            padding: "3px 8px",
            border: `1px solid ${Z.hairline}`,
            borderRadius: 3,
            letterSpacing: "0.02em",
          }}
        >
          {s.time}
        </span>
      </div>
      <h3
        className="m-0 font-sans font-bold text-[28px] md:text-[30px]"
        style={{
          letterSpacing: "-0.03em",
          color: Z.forest,
          lineHeight: 1.05,
        }}
      >
        {s.title}
      </h3>
      <p
        className="m-0 leading-[1.5]"
        style={{
          fontSize: mobile ? 14 : 15,
          color: Z.slate,
        }}
      >
        {s.body}
      </p>
    </div>
  );
}

function KezdesCard() {
  const t = useT();
  return (
    <Reveal>
      <div
        className="relative overflow-hidden mt-8 md:mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10"
        style={{
          background: Z.white,
          border: `1px solid ${Z.hairline}`,
          borderRadius: 14,
          padding: "32px 24px",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            width: 80,
            height: 80,
            background: `linear-gradient(225deg, ${Z.lime} 0%, ${Z.lime} 40%, transparent 41%)`,
            opacity: 0.7,
          }}
        />
        <div className="relative flex-1 flex flex-col gap-3 md:p-6">
          <PixelLabel size={9} color={Z.lime} className="md:text-[10px]">
            {t.process.kezdes.label}
          </PixelLabel>
          <h3
            className="m-0 font-sans font-bold"
            style={{
              fontSize: "clamp(26px, 4vw, 36px)",
              letterSpacing: "-0.03em",
              color: Z.forest,
              lineHeight: 1.1,
            }}
          >
            {t.process.kezdes.h3_before}
            <GlitchText cycle={7}>
              <span
                className="inline-block"
                style={{
                  background: Z.lime,
                  padding: "0 0.12em",
                  boxShadow: `3px 3px 0 ${Z.forest}`,
                  color: Z.forest,
                }}
              >
                {t.process.kezdes.h3_highlight}
              </span>
            </GlitchText>
          </h3>
          <p
            className="m-0 leading-[1.5]"
            style={{
              fontSize: 14,
              color: Z.slate,
              maxWidth: 520,
            }}
          >
            {t.process.kezdes.sub}
          </p>
        </div>
        <a href="#beszeljunk" className="md:pr-6">
          <CTAPrimary size="md" className="md:[--cta-size:lg]">
            {t.process.kezdes.cta}
          </CTAPrimary>
        </a>
      </div>
    </Reveal>
  );
}
