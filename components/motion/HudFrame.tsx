"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

const LIGHT = "rgba(250,250,247,0.55)";
const LIGHT_SOFT = "rgba(250,250,247,0.32)";

// Fixed HUD chrome around the viewport. Rendered in a mix-blend-difference
// layer so it self-inverts over dark sections — no per-section logic needed.
export function HudFrame() {
  const barRef = useRef<HTMLDivElement | null>(null);

  // Thin scroll-progress line along the bottom edge of the frame.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          scrub: 0.4,
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] mix-blend-difference"
    >
      {/* hairline frame */}
      <div
        className="absolute inset-[8px] md:inset-[12px]"
        style={{ border: `1px solid ${LIGHT_SOFT}` }}
      />
      {/* corner ticks */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      {/* micro labels — desktop only */}
      <span
        className="hidden md:block absolute font-pixel"
        style={{
          left: 26,
          bottom: 17,
          fontSize: 8,
          letterSpacing: "0.22em",
          color: LIGHT,
        }}
      >
        ZENTOPIA // SYS.OK
      </span>
      <span
        className="hidden md:block absolute font-pixel"
        style={{
          right: 26,
          bottom: 17,
          fontSize: 8,
          letterSpacing: "0.22em",
          color: LIGHT,
        }}
      >
        [ ZEN.MODE: ON ]
      </span>
      {/* scroll progress along the bottom frame edge */}
      <div
        ref={barRef}
        className="absolute origin-left"
        style={{
          left: 8,
          right: 8,
          bottom: 8,
          height: 2,
          background: LIGHT,
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const v = pos[0] === "t" ? "top" : "bottom";
  const h = pos[1] === "l" ? "left" : "right";
  return (
    <span
      className="absolute w-[14px] h-[14px] md:w-[18px] md:h-[18px]"
      style={{
        [v]: "8px",
        [h]: "8px",
        [`border${v[0].toUpperCase()}${v.slice(1)}`]: `2px solid ${LIGHT}`,
        [`border${h[0].toUpperCase()}${h.slice(1)}`]: `2px solid ${LIGHT}`,
      }}
    />
  );
}
