"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

// Physical scroll-entrance for cards. "throw": flung in from below with a
// random tilt that settles. "drop": falls from above like a tile clicking
// into place. Random values are generated per instance, so a grid never
// moves in lockstep.
export function ThrowIn({
  children,
  mode = "throw",
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  mode?: "throw" | "drop";
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rand = gsap.utils.random;
    const fromVars =
      mode === "drop"
        ? { y: -120, rotation: rand(-7, 7), opacity: 0 }
        : {
            y: 120,
            x: rand(-60, 60),
            rotation: rand(-10, 10),
            scale: 0.92,
            opacity: 0,
          };
    const tween = gsap.from(el, {
      ...fromVars,
      duration: 0.85,
      delay: (index % 4) * 0.1,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [mode, index]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
