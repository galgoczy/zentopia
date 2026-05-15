"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Z } from "@/lib/tokens";

export function LangSwitch({ dark = false }: { dark?: boolean }) {
  const current = useLang();
  const fg = dark ? Z.offwhite : Z.forest;
  const mu = dark ? "rgba(250,250,247,0.45)" : "rgba(15,31,26,0.45)";

  const Item = ({ code, href }: { code: "HU" | "EN"; href: string }) => {
    const active = current === code.toLowerCase();
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className="transition-colors duration-200 hover:opacity-100"
        style={{
          padding: "2px 3px",
          color: active ? fg : mu,
          fontWeight: active ? 700 : 500,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          textDecoration: "none",
        }}
      >
        {code}
      </Link>
    );
  };

  return (
    <div className="inline-flex items-center gap-[2px]">
      <Item code="HU" href="/" />
      <span className="font-mono" style={{ color: mu, fontSize: 11, opacity: 0.7 }}>
        ·
      </span>
      <Item code="EN" href="/en" />
    </div>
  );
}
