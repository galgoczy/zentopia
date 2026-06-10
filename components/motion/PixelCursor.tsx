"use client";

import { useEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion, isFinePointer } from "./gsap";

const INTERACTIVE =
  "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor]";

// Pixel-crosshair cursor: four corner brackets trailing the pointer with a
// lime dot leading at the centre. Fine-pointer devices only; the native
// cursor is hidden via the `zen-cursor` class on <html>.
export function PixelCursor() {
  const [enabled, setEnabled] = useState(false);
  const bracketsRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const brackets = bracketsRef.current;
    const dot = dotRef.current;
    if (!enabled || !brackets || !dot) return;

    document.documentElement.classList.add("zen-cursor");

    // Brackets trail lazily, the dot keeps tight to the pointer.
    const bx = gsap.quickTo(brackets, "x", { duration: 0.34, ease: "expo.out" });
    const by = gsap.quickTo(brackets, "y", { duration: 0.34, ease: "expo.out" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.set([brackets, dot], { x: e.clientX, y: e.clientY });
        gsap.to([brackets, dot], { opacity: 1, duration: 0.25 });
      }
      bx(e.clientX);
      by(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const onLeave = () => {
      visible = false;
      gsap.to([brackets, dot], { opacity: 0, duration: 0.25 });
    };
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      brackets.classList.toggle("is-active", Boolean(hit));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("zen-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[140]">
      <div
        ref={bracketsRef}
        className="zen-cursor-root absolute left-0 top-0 opacity-0 mix-blend-exclusion"
      >
        <span className="zc-bracket zc-tl" />
        <span className="zc-bracket zc-tr" />
        <span className="zc-bracket zc-bl" />
        <span className="zc-bracket zc-br" />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 opacity-0"
        style={{
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          background: Z.lime,
          boxShadow: `0 0 0 1px rgba(15,31,26,0.35)`,
        }}
      />
    </div>
  );
}
