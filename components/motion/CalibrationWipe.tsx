"use client";

import { useLayoutEffect, useRef } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "./gsap";
import { createPixelPainter } from "./pixelate";

const ART_SRC = "/assets/logo-lime.png";
const ART_SIZE = 240;

// Pinned "calibration" interlude: the bonsai resolves from coarse 8-bit
// blocks into the sharp logo as you scroll (canvas re-render at increasing
// resolution) while the mono counter runs up.
export function CalibrationWipe() {
  const t = useT();
  const sectionRef = useRef<HTMLElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const core = coreRef.current;
    const pct = pctRef.current;
    const canvas = canvasRef.current;
    if (!section || !core || !pct || !canvas) return;

    const { img, draw } = createPixelPainter(canvas, ART_SRC, ART_SIZE);

    if (prefersReducedMotion()) {
      img.onload = () => draw(1);
      if (img.complete) draw(1);
      return;
    }

    img.onload = () => draw(0);

    const gctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const v = Math.min(99, Math.round(self.progress * 120));
            pct.textContent = String(v).padStart(2, "0");
            // sharpen over the first 70% of the pin
            draw(Math.min(1, self.progress / 0.7));
          },
        },
      });

      tl.fromTo(
        core,
        { scale: 0.82, opacity: 0.45 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.55 }
      );
    }, section);

    return () => gctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative overflow-hidden flex items-center justify-center h-svh md:h-screen"
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

      <div
        ref={coreRef}
        className="relative flex flex-col items-center gap-5 will-change-transform"
      >
        <div
          className="relative p-5"
          style={{ border: `1px solid rgba(200,255,107,0.35)` }}
        >
          <CornerTick x="l" y="t" />
          <CornerTick x="r" y="t" />
          <CornerTick x="l" y="b" />
          <CornerTick x="r" y="b" />
          <canvas
            ref={canvasRef}
            width={ART_SIZE}
            height={ART_SIZE}
            className="block w-[210px] md:w-[240px] h-auto"
            style={{ imageRendering: "pixelated" }}
          />
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
