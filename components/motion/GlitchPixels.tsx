"use client";

import { useLayoutEffect, useRef } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion } from "./gsap";

type Spec = {
  left: string;
  top: string;
  size: number;
  color: string;
  drift: number; // px of parallax travel over the full page scroll
};

const PIXELS: Spec[] = [
  { left: "7%", top: "24%", size: 5, color: Z.lime, drift: -260 },
  { left: "93%", top: "16%", size: 4, color: Z.ember, drift: -180 },
  { left: "85%", top: "64%", size: 6, color: Z.sky, drift: -340 },
  { left: "12%", top: "78%", size: 4, color: Z.violet, drift: -150 },
  { left: "48%", top: "8%", size: 3, color: Z.coral, drift: -220 },
  { left: "68%", top: "88%", size: 5, color: Z.lime, drift: -300 },
];

// A handful of stray pixels living between the content and the HUD frame:
// they drift upward with the scroll at different speeds and occasionally
// glitch-jump sideways.
export function GlitchPixels() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-px]");
      els.forEach((el, i) => {
        gsap.to(el, {
          y: PIXELS[i].drift,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.2 },
        });
        // glitch-jump loop: sudden sideways teleports with a flicker
        const jump = gsap.timeline({
          repeat: -1,
          repeatDelay: gsap.utils.random(1.8, 4.2),
          delay: gsap.utils.random(0, 3),
        });
        jump
          .set(el, { x: () => gsap.utils.random(-26, 26), opacity: 0.25 })
          .set(el, { opacity: 0.7 }, "+=0.07")
          .set(el, { x: () => gsap.utils.random(-10, 10) }, "+=0.12")
          .set(el, { opacity: 0.5 }, "+=0.05");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[115] hidden md:block"
    >
      {PIXELS.map((p, i) => (
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
