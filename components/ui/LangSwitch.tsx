"use client";

import { useState } from "react";
import { Z } from "@/lib/tokens";

export function LangSwitch({
  initial = "HU",
  dark = false,
}: {
  initial?: "HU" | "EN";
  dark?: boolean;
}) {
  const [value, setValue] = useState<"HU" | "EN">(initial);
  const fg = dark ? Z.offwhite : Z.forest;
  const mu = dark ? "rgba(250,250,247,0.45)" : "rgba(15,31,26,0.45)";

  const Item = ({ code }: { code: "HU" | "EN" }) => (
    <button
      type="button"
      onClick={() => setValue(code)}
      aria-pressed={value === code}
      className="transition-colors duration-200 hover:opacity-100"
      style={{
        padding: "2px 3px",
        background: "transparent",
        border: "none",
        color: value === code ? fg : mu,
        fontWeight: value === code ? 700 : 500,
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: "0.08em",
        cursor: "pointer",
      }}
    >
      {code}
    </button>
  );

  return (
    <div className="inline-flex items-center gap-[2px]">
      <Item code="HU" />
      <span className="font-mono" style={{ color: mu, fontSize: 11, opacity: 0.7 }}>
        ·
      </span>
      <Item code="EN" />
    </div>
  );
}
