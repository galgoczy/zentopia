"use client";

import { useEffect, useRef, useState } from "react";

// Animates an arbitrary string value: if it contains a number, scrubs from 0 → number.
// Non-numeric values (e.g. "−90%", "folyamatos") are shown immediately when in view.
export function CountUp({
  value,
  duration = 1200,
  className = "",
  style,
}: {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            runScrub();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function runScrub() {
    // Find the first numeric run
    const match = value.match(/(-?\d+(?:[.,]\d+)?)/);
    if (!match) {
      setShown(value);
      return;
    }
    const numStr = match[1].replace(",", ".");
    const target = parseFloat(numStr);
    if (!isFinite(target)) {
      setShown(value);
      return;
    }
    const before = value.slice(0, match.index || 0);
    const after = value.slice((match.index || 0) + match[0].length);
    const isInt = !numStr.includes(".");

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      const formatted = isInt
        ? String(Math.round(v))
        : v.toFixed(numStr.split(".")[1].length);
      setShown(before + formatted + after);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <span ref={ref} className={className} style={style}>
      {shown}
    </span>
  );
}
