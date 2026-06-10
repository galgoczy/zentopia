"use client";

import { useLayoutEffect, useRef } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion } from "./gsap";

// Oversized brand band before the contact CTA: one solid ZENTOPIA, one
// outlined, drifting sideways with the scroll.
export function GiantWordmark() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      line,
      { xPercent: 2 },
      {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
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
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative overflow-hidden bg-offwhite py-6 md:py-10 select-none"
    >
      <div
        ref={lineRef}
        className="flex w-max items-baseline whitespace-nowrap font-sans font-bold uppercase will-change-transform"
        style={{
          fontSize: "clamp(110px, 22vw, 360px)",
          lineHeight: 0.9,
          letterSpacing: "-0.05em",
          color: Z.forest,
        }}
      >
        <span>Zentopia</span>
        <span
          className="ml-[0.18em]"
          style={{
            WebkitTextStroke: `2px ${Z.forest}`,
            color: "transparent",
          }}
        >
          Zentopia
        </span>
      </div>
    </div>
  );
}
