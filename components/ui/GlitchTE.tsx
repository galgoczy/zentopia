"use client";

import { Z } from "@/lib/tokens";

export function GlitchTE({ blockColor = Z.lime }: { blockColor?: string }) {
  return (
    <span
      className="inline-block relative align-baseline"
      style={{
        padding: "0 0.12em",
        background: blockColor,
        color: Z.forest,
        transform: "skewX(-2deg)",
        boxShadow: `4px 4px 0 ${Z.forest}`,
      }}
    >
      <span className="inline-block" style={{ transform: "skewX(2deg)" }}>
        TE
      </span>
    </span>
  );
}
