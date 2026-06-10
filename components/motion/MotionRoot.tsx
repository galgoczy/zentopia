"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { HudFrame } from "./HudFrame";
import { PixelCursor } from "./PixelCursor";
import { DitherOverlay } from "./DitherOverlay";
import { GlitchPixels } from "./GlitchPixels";

// Mounted once in the root layout: drives Lenis smooth scroll, keeps
// ScrollTrigger in sync with it, and renders the global HUD chrome.
export function MotionRoot() {
  const pathname = usePathname();
  // The /cv route is a plain document viewer — leave it untouched.
  const bare = pathname?.startsWith("/cv");

  useEffect(() => {
    if (bare || prefersReducedMotion()) return;

    const lenis = new Lenis({
      // Anchor links scroll through Lenis; offset clears the sticky nav.
      anchors: { offset: -64 },
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [bare]);

  if (bare) return null;
  return (
    <>
      <HudFrame />
      <PixelCursor />
      <DitherOverlay />
      <GlitchPixels />
    </>
  );
}
