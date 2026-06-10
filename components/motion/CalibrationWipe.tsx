"use client";

import { useLayoutEffect, useRef } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "./gsap";

const ART_SRC = "/assets/logo-lime.png";
const ART_SIZE = 240;
const STEP_COLORS = [Z.ember, Z.sky, Z.violet, Z.sunshine];

// Pinned "calibration" interlude: the bonsai resolves from coarse 8-bit
// blocks into the sharp logo as you scroll (canvas re-render at increasing
// resolution), the mono counter runs up, and on desktop four lines fan out
// from it to the four process-step colours — a visual handoff into the
// "how we work" section that follows.
export function CalibrationWipe() {
  const t = useT();
  const sectionRef = useRef<HTMLElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const core = coreRef.current;
    const pct = pctRef.current;
    const canvas = canvasRef.current;
    if (!section || !core || !pct || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    const img = new Image();
    img.src = ART_SRC;

    // Redraw the artwork quantised to `res` blocks: downscale into the
    // offscreen canvas, then upscale without smoothing.
    const draw = (sharpen: number) => {
      if (!ctx2d || !offCtx || !img.complete || !img.naturalWidth) return;
      ctx2d.clearRect(0, 0, ART_SIZE, ART_SIZE);
      if (sharpen >= 1) {
        ctx2d.imageSmoothingEnabled = true;
        ctx2d.drawImage(img, 0, 0, ART_SIZE, ART_SIZE);
        return;
      }
      const res = Math.max(
        7,
        Math.round(7 + (ART_SIZE - 7) * Math.pow(sharpen, 1.7))
      );
      off.width = off.height = res;
      offCtx.clearRect(0, 0, res, res);
      offCtx.drawImage(img, 0, 0, res, res);
      ctx2d.imageSmoothingEnabled = false;
      ctx2d.drawImage(off, 0, 0, res, res, 0, 0, ART_SIZE, ART_SIZE);
    };

    if (prefersReducedMotion()) {
      img.onload = () => draw(1);
      if (img.complete) draw(1);
      return;
    }

    img.onload = () => draw(0);

    const gctx = gsap.context(() => {
      const lines = svgRef.current
        ? gsap.utils.toArray<SVGLineElement>("line[data-fan]", svgRef.current)
        : [];
      const dots = svgRef.current
        ? gsap.utils.toArray<SVGCircleElement>("circle[data-fan]", svgRef.current)
        : [];

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
      if (lines.length) {
        tl.to(
          lines,
          { strokeDashoffset: 0, duration: 0.28, stagger: 0.05, ease: "power1.inOut" },
          0.62
        ).to(
          dots,
          { opacity: 1, duration: 0.08, stagger: 0.05 },
          0.78
        );
      }
    }, section);

    return () => gctx.revert();
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
            className="block w-[150px] md:w-[240px] h-auto"
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

        {/* desktop: four lines fan out to the process-step colours */}
        <svg
          ref={svgRef}
          className="hidden md:block"
          width="520"
          height="120"
          viewBox="0 0 520 120"
          fill="none"
        >
          {STEP_COLORS.map((c, i) => {
            const x2 = 50 + i * 140;
            return (
              <g key={c}>
                <line
                  data-fan
                  x1="260"
                  y1="6"
                  x2={x2}
                  y2="96"
                  stroke={c}
                  strokeWidth="1.5"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
                <circle
                  data-fan
                  cx={x2}
                  cy="102"
                  r="5"
                  fill={c}
                  opacity={0}
                />
              </g>
            );
          })}
        </svg>
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
