"use client";

import { useEffect, useState } from "react";
import { Z } from "@/lib/tokens";

export function RotatingSubline({
  messages,
  intervalMs = 3500,
  color = Z.slate,
  className = "",
}: {
  messages: string[];
  intervalMs?: number;
  color?: string;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setI((x) => (x + 1) % messages.length);
        setFading(false);
      }, 280);
    }, intervalMs);
    return () => clearInterval(t);
  }, [messages.length, intervalMs]);

  return (
    <span
      className={`inline-block font-mono ${className}`}
      style={{
        color,
        transition: "filter 280ms ease, opacity 280ms ease",
        filter: fading ? "blur(6px) contrast(0.4)" : "blur(0) contrast(1)",
        opacity: fading ? 0.3 : 1,
      }}
    >
      {messages[i]}
    </span>
  );
}
