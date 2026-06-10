"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap";
import { bootPending } from "./bootState";

// Wraps one line of arbitrary JSX in an overflow mask and slides it up into
// view. Used where the line structure is explicit (e.g. the hero H1), so
// nested components like the glitch highlight survive untouched.
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el || prefersReducedMotion()) return;
    // If the boot intro is about to play, hold the reveal until it lifts.
    const bootDelay = bootPending() ? 1.25 : 0;
    const tween = gsap.fromTo(
      el,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, ease: "expo.out", delay: delay + bootDelay }
    );
    return () => {
      tween.kill();
    };
  }, [delay]);

  return (
    // The padding/negative-margin pair keeps tight line-heights from
    // clipping ascenders and descenders inside the overflow mask.
    <span
      className={`block overflow-hidden ${className}`}
      style={{ padding: "0.12em 0", margin: "-0.12em 0" }}
    >
      <span ref={innerRef} className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}
