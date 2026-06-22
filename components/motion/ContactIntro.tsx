"use client";

import { useEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { gsap, prefersReducedMotion } from "./gsap";

const KEY = "zen-booted-contact";

// Per-session flag, independent of the homepage boot, so the contact card
// still plays its intro for direct (QR / business-card) visits.
function pending(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem(KEY) &&
      !prefersReducedMotion()
    );
  } catch {
    return false;
  }
}

// One-shot intro for the contact card, mirroring the homepage boot: a lime
// slit grows down a forest-deep screen while a pixel counter runs up, then
// the two halves part to reveal the page. Skipped for reduced motion.
export function ContactIntro({ flip = false }: { flip?: boolean }) {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pending()) setShow(true);
    else document.documentElement.classList.remove("zen-booting");
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!show || !root) return;

    // Our opaque overlay is up — lift the pre-paint CSS cover.
    document.documentElement.classList.remove("zen-booting");

    const q = gsap.utils.selector(root);
    const pct = root.querySelector<HTMLElement>("[data-pct]");
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          window.sessionStorage.setItem(KEY, "1");
        } catch {
          /* storage unavailable — intro will just replay */
        }
        setShow(false);
      },
    });
    tl.fromTo(
      q("[data-slit]"),
      { scaleY: 0 },
      { scaleY: 1, duration: 0.4, ease: "power3.inOut" }
    )
      .to(
        counter,
        {
          v: 99,
          duration: 0.75,
          ease: "power1.in",
          onUpdate: () => {
            if (pct) pct.textContent = String(Math.round(counter.v)).padStart(2, "0");
          },
        },
        "<"
      )
      .to(q("[data-half-l]"), { xPercent: -103, duration: 0.62, ease: "expo.inOut" }, ">-0.05")
      .to(q("[data-half-r]"), { xPercent: 103, duration: 0.62, ease: "expo.inOut" }, "<")
      .to(q("[data-slit],[data-label]"), { opacity: 0, duration: 0.2 }, "<");

    return () => {
      tl.kill();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none"
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <div
        data-half-l
        className="absolute inset-y-0 left-0 w-1/2 will-change-transform"
        style={{ background: Z.forestDeep }}
      />
      <div
        data-half-r
        className="absolute inset-y-0 right-0 w-1/2 will-change-transform"
        style={{ background: Z.forestDeep }}
      />
      <div
        data-slit
        className="absolute left-1/2 top-0 bottom-0 -ml-px w-0.5 origin-top will-change-transform"
        style={{ background: Z.lime, boxShadow: `0 0 24px ${Z.lime}` }}
      />
      <div
        data-label
        className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-4 font-pixel"
        style={{ fontSize: 10, letterSpacing: "0.3em", color: Z.lime }}
      >
        <span>ZENTOPIA // CONTACT</span>
        <span>
          [<span data-pct>00</span>%]
        </span>
      </div>
    </div>
  );
}
