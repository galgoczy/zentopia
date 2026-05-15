"use client";

import { Z } from "@/lib/tokens";

const TOOLS = [
  "OpenAI",
  "Anthropic",
  "n8n",
  "OpenClaw",
  "Hermes Agent",
  "Midjourney",
  "Kling",
  "Gemini Nano Banana",
];

export function TechStackStrip({ dark = false }: { dark?: boolean }) {
  const fg = dark ? "rgba(250,250,247,0.62)" : Z.slate;
  const border = dark ? "rgba(250,250,247,0.10)" : Z.hairline;
  const body = dark ? Z.offwhite : Z.forest;

  // duplicate the list for an infinite ticker
  const list = [...TOOLS, ...TOOLS];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
      }}
    >
      <div className="flex items-center gap-6 md:gap-8 py-4 md:py-5">
        <span
          className="font-mono uppercase shrink-0 pl-5 md:pl-8"
          style={{ fontSize: 11, color: fg, letterSpacing: "0.08em", opacity: 0.85 }}
        >
          // eszközök
        </span>
        <div className="flex w-max gap-8 md:gap-10 whitespace-nowrap animate-ticker">
          {list.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="font-sans tracking-[-0.01em] transition-opacity duration-300 hover:opacity-100"
              style={{
                fontWeight: 500,
                fontSize: 16,
                color: body,
                opacity: 0.85,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
