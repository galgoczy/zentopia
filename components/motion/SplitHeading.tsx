"use client";

import { useLayoutEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// Scroll-triggered line-mask reveal for plain-text headings. Splits the
// rendered text into natural lines (re-splitting after fonts load) and
// slides each line up from behind its mask with a stagger.
export function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  style,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    // Split only once webfonts are in, otherwise line breaks shift.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          tween = gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
          return tween;
        },
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [children]);

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
