"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion } from "./gsap";

type Spec = {
  left: string;
  top: string;
  size: number;
  color: string;
  driftX: number; // px of parallax travel over the full page scroll
  driftY: number;
  lag: number; // scrub smoothing — different per pixel, so they trail apart
};

const COLORS = [Z.lime, Z.lime, Z.ember, Z.sky, Z.violet, Z.coral, Z.sunshine];
const COUNT = 12;

function makeSpecs(): Spec[] {
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  return Array.from({ length: COUNT }, () => ({
    left: `${rnd(3, 97).toFixed(1)}%`,
    top: `${rnd(4, 94).toFixed(1)}%`,
    size: Math.round(rnd(3, 7)),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    driftX: rnd(-160, 160),
    driftY: rnd(-420, 420),
    lag: rnd(0.5, 2.2),
  }));
}

// A loose swarm of stray pixels living between the content and the HUD
// frame: each one parallaxes in its own direction at its own pace as you
// scroll, and occasionally glitch-jumps with a flicker.
export function GlitchPixels() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // Specs are random, so generate them client-side only to keep SSR markup stable.
  const [specs, setSpecs] = useState<Spec[] | null>(null);

  useEffect(() => {
    setSpecs(makeSpecs());
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !specs || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-px]");
      els.forEach((el, i) => {
        const s = specs[i];
        gsap.to(el, {
          x: s.driftX,
          y: s.driftY,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: s.lag },
        });
        // glitch-jump loop: sudden teleports with a flicker
        const jump = gsap.timeline({
          repeat: -1,
          repeatDelay: gsap.utils.random(1.6, 4.5),
          delay: gsap.utils.random(0, 3),
        });
        jump
          .set(el, {
            xPercent: () => gsap.utils.random(-500, 500),
            yPercent: () => gsap.utils.random(-300, 300),
            opacity: 0.2,
          })
          .set(el, { opacity: 0.65 }, "+=0.07")
          .set(el, { xPercent: 0, yPercent: 0 }, "+=0.14")
          .set(el, { opacity: 0.5 }, "+=0.05");
      });
    }, root);

    return () => ctx.revert();
  }, [specs]);

  if (!specs) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[115] hidden md:block"
    >
      {specs.map((p, i) => (
        <span
          key={i}
          data-px
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.5,
            boxShadow: `0 0 8px ${p.color}66`,
          }}
        />
      ))}
    </div>
  );
}
