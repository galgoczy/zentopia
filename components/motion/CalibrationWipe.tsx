"use client";

import { useLayoutEffect, useRef } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { BreathingBonsai } from "@/components/ui/BreathingBonsai";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

// Pinned "calibration" interlude between sections: the page locks for a
// beat while the bonsai scales up through a crosshair and a mono counter
// runs 0→100, then the page releases. Scroll-scrubbed, so the visitor's
// hand drives the whole moment.
export function CalibrationWipe() {
  const t = useT();
  const sectionRef = useRef<HTMLElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const core = coreRef.current;
    const pct = pctRef.current;
    if (!section || !core || !pct || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const v = Math.min(99, Math.round(self.progress * 110));
            pct.textContent = String(v).padStart(2, "0");
          },
        },
      });
      tl.fromTo(
        core,
        { scale: 0.15, opacity: 0.4 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 1 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative overflow-hidden flex items-center justify-center h-[72vh] md:h-screen"
      style={{ background: Z.forestDeep }}
    >
      {/* dashed measurement grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(250,250,247,0.6) 0 1px, transparent 1px 72px), repeating-linear-gradient(0deg, rgba(250,250,247,0.6) 0 1px, transparent 1px 72px)`,
        }}
      />
      {/* crosshair */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px"
        style={{ background: "rgba(200,255,107,0.28)" }}
      />
      <div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{ background: "rgba(200,255,107,0.28)" }}
      />

      <div ref={coreRef} className="relative flex flex-col items-center gap-5 will-change-transform">
        <div
          className="relative p-5"
          style={{ border: `1px solid rgba(200,255,107,0.35)` }}
        >
          <CornerTick x="l" y="t" />
          <CornerTick x="r" y="t" />
          <CornerTick x="l" y="b" />
          <CornerTick x="r" y="b" />
          <div className="md:hidden">
            <BreathingBonsai size={150} base="lime" glitchCycle={6} />
          </div>
          <div className="hidden md:block">
            <BreathingBonsai size={230} base="lime" glitchCycle={6} />
          </div>
        </div>
        <div
          className="font-mono flex items-center gap-3"
          style={{ fontSize: 12, letterSpacing: "0.18em", color: Z.lime }}
        >
          <span>{t.calibrate.line}</span>
          <span>
            [<span ref={pctRef}>00</span>%]
          </span>
        </div>
      </div>
    </section>
  );
}

function CornerTick({ x, y }: { x: "l" | "r"; y: "t" | "b" }) {
  return (
    <span
      className="absolute w-[10px] h-[10px]"
      style={{
        [x === "l" ? "left" : "right"]: -1,
        [y === "t" ? "top" : "bottom"]: -1,
        [`border${y === "t" ? "Top" : "Bottom"}`]: `2px solid ${Z.lime}`,
        [`border${x === "l" ? "Left" : "Right"}`]: `2px solid ${Z.lime}`,
      }}
    />
  );
}
