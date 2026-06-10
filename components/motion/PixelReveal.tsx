"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap";
import { bootPending } from "./bootState";
import { createPixelPainter } from "./pixelate";

// Entrance for static artwork: a canvas copy resolves from coarse 8-bit
// blocks to sharp, then swaps to the live children (e.g. the breathing
// bonsai) on the final frame — same language as the calibration interlude.
export function PixelReveal({
  src,
  size = 460,
  children,
  className = "",
}: {
  src: string;
  size?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const artRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const art = artRef.current;
    const canvas = canvasRef.current;
    if (!art || !canvas) return;

    if (prefersReducedMotion()) {
      gsap.set(canvas, { opacity: 0 });
      return;
    }

    const { img, draw } = createPixelPainter(canvas, src, size);
    gsap.set(art, { opacity: 0 });
    img.onload = () => draw(0);
    if (img.complete) draw(0);

    const state = { p: 0 };
    // Quantising the progress makes the resolve read as distinct 8-bit
    // "frames"; the longer duration lets each stage register.
    const snap = gsap.utils.snap(1 / 24);
    const tl = gsap.timeline({ delay: bootPending() ? 1.35 : 0.25 });
    tl.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.18 })
      .to(state, {
        p: 1,
        duration: 1.45,
        // fast through the first coarse frames, easing off as it sharpens
        ease: "power2.out",
        onUpdate: () => draw(snap(state.p)),
      })
      .set(art, { opacity: 1 })
      .set(canvas, { opacity: 0 });

    return () => {
      tl.kill();
      gsap.set(art, { opacity: 1 });
    };
  }, [src, size]);

  return (
    <div className={`relative ${className}`}>
      <div ref={artRef}>{children}</div>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ imageRendering: "pixelated", opacity: 0 }}
      />
    </div>
  );
}
