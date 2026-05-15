"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
  threshold = 0.18,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Cmp = As as any;
  return (
    <Cmp
      ref={ref as any}
      className={`zen-reveal ${shown ? "zen-in" : ""} ${className}`}
      style={{ ["--reveal-delay" as any]: `${delay}ms` }}
    >
      {children}
    </Cmp>
  );
}
