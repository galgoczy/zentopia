"use client";

import { useEffect, useRef, useState } from "react";

export function Typewriter({
  text,
  delay = 0,
  speed = 42,
  cursorColor = "currentColor",
  className = "",
  startWhenVisible = true,
}: {
  text: string;
  delay?: number;
  speed?: number;
  cursorColor?: string;
  className?: string;
  startWhenVisible?: boolean;
}) {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const [activated, setActivated] = useState(!startWhenVisible);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!startWhenVisible) return;
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActivated(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startWhenVisible]);

  useEffect(() => {
    if (!activated) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const tick = () => {
      if (cancelled) return;
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };

    const start = setTimeout(tick, delay);
    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [activated, text, delay, speed]);

  return (
    <span ref={hostRef} className={className}>
      <span style={{ whiteSpace: "pre-line" }}>{shown}</span>
      <span
        aria-hidden="true"
        className="inline-block align-[-0.10em] ml-1"
        style={{
          width: "0.55em",
          height: "0.9em",
          background: cursorColor,
          animation: done ? "tw-blink 1s steps(2, end) infinite" : "none",
        }}
      />
      <style>{`
        @keyframes tw-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
      `}</style>
    </span>
  );
}
