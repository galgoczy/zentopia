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

  // The sticky nav is taller than one fixed number can capture (78px on
  // desktop, 66px on mobile). Publish its measured height so both the CSS
  // scroll-padding and the Lenis anchor offset below land a section's top
  // edge just under the nav rather than behind it.
  useEffect(() => {
    if (bare) return;
    const nav = document.querySelector("nav");
    if (!nav) return;
    const sync = () =>
      document.documentElement.style.setProperty(
        "--zen-nav-h",
        `${Math.round(nav.getBoundingClientRect().height)}px`
      );
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [bare]);

  useEffect(() => {
    if (bare || prefersReducedMotion()) return;

    const lenis = new Lenis();

    // Anchor links scroll through Lenis. Handled here rather than via Lenis's
    // `anchors` option so the offset can track the nav's live height.
    const navOffset = () =>
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--zen-nav-h"),
        10
      ) || 78;

    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href^='#']");
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -navOffset() });
      history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onAnchorClick);

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onAnchorClick);
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
