"use client";

import { useLayoutEffect, useRef } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

// Full-bleed statement band: bold uppercase items looping endlessly on a
// forest strip. Scroll velocity nudges the loop speed so the band feels
// wired to the page, not a screensaver.
export function ZenMarquee() {
  const t = useT();
  const items = t.marquee.items;
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (prefersReducedMotion()) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3);
        gsap.to(tween, {
          timeScale: boost,
          duration: 0.4,
          overwrite: true,
        });
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

  const chunk = (key: string) => (
    <div
      key={key}
      aria-hidden={key === "b"}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-sans font-bold uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(20px, 3.2vw, 34px)",
              letterSpacing: "-0.02em",
              color: Z.offwhite,
              padding: "0 0.7em",
            }}
          >
            {item}
          </span>
          <span
            className="font-pixel"
            style={{ fontSize: 12, color: Z.lime }}
          >
            //
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: Z.forest, padding: "16px 0" }}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {chunk("a")}
        {chunk("b")}
      </div>
    </div>
  );
}
