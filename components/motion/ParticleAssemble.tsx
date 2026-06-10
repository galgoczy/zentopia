"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion } from "./gsap";
import { bootPending } from "./bootState";

type Particle = {
  tx: number; // resting position inside the host, in %
  ty: number;
  sx: number; // scatter offset it converges from, in px
  sy: number;
  size: number;
  color: string;
};

// Entrance for the hero bonsai: a cloud of pixels converges onto the logo
// while the artwork itself sharpens from a blur, then the pixels burn off.
export function ParticleAssemble({
  children,
  count = 42,
}: {
  children: React.ReactNode;
  count?: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo<Particle[]>(() => {
    const colors = [Z.lime, Z.lime, Z.lime, Z.forest, Z.ember];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    return Array.from({ length: count }, () => ({
      tx: rnd(8, 92),
      ty: rnd(8, 92),
      sx: rnd(-220, 220),
      sy: rnd(-180, 180),
      size: Math.round(rnd(3, 7)),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const art = root.querySelector<HTMLElement>("[data-art]");
    const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", root);
    if (!art) return;

    if (prefersReducedMotion()) {
      gsap.set(dots, { opacity: 0 });
      return;
    }

    const bootDelay = bootPending() ? 1.25 : 0.15;
    const tl = gsap.timeline({ delay: bootDelay });
    tl.from(dots, {
      x: (i) => particles[i].sx,
      y: (i) => particles[i].sy,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: { each: 0.012, from: "random" },
    })
      .fromTo(
        art,
        { opacity: 0, filter: "blur(14px) saturate(0.5)", scale: 0.94 },
        {
          opacity: 1,
          filter: "blur(0px) saturate(1)",
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
        },
        "-=0.45"
      )
      .to(
        dots,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power1.in",
          stagger: { each: 0.008, from: "random" },
        },
        "-=0.55"
      );

    return () => {
      tl.kill();
    };
  }, [particles]);

  return (
    <div ref={rootRef} className="relative">
      <div data-art className="will-change-transform">
        {children}
      </div>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            data-dot
            className="absolute"
            style={{
              left: `${p.tx}%`,
              top: `${p.ty}%`,
              width: p.size,
              height: p.size,
              background: p.color,
            }}
          />
        ))}
      </div>
    </div>
  );
}
