"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Z } from "@/lib/tokens";
import { Wordmark } from "@/components/ui/Wordmark";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { CTAPrimary } from "@/components/ui/CTA";

const NAV_LINKS = [
  { label: "Szolgáltatások", href: "#szolgaltatasok" },
  { label: "Munkák", href: "#munkak" },
  { label: "Folyamat", href: "#folyamat" },
  { label: "GYIK", href: "#gyik" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-300 ${
          scrolled ? "shadow-[0_8px_24px_-16px_rgba(15,31,26,0.18)]" : ""
        }`}
        style={{
          borderBottom: `1px solid ${Z.hairline}`,
          background: "rgba(250,250,247,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-[14px] md:px-14 md:py-5">
          <div className="flex items-center gap-[14px]">
            <Link href="#" aria-label="Zentopia kezdőlap">
              <Wordmark size={22} className="md:[--wm-size:26px]" />
            </Link>
            <span
              className="hidden md:inline-block font-mono"
              style={{
                fontSize: 11,
                color: Z.slate,
                letterSpacing: "0.04em",
                paddingLeft: 14,
                borderLeft: `1px solid ${Z.hairline}`,
              }}
            >
              jövő-technológia. ma.
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="zen-link-underline relative font-sans"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Z.forest,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://labs.zentopia.io"
              className="zen-link-underline group inline-flex items-center gap-1 font-sans"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: Z.slate,
                textDecoration: "none",
              }}
            >
              labs{" "}
              <span
                className="zen-arrow-nudge transition-transform"
                style={{ fontSize: 10 }}
              >
                ↗
              </span>
            </a>
          </div>

          <div className="flex items-center gap-[10px] md:gap-[14px]">
            <LangSwitch />
            <a href="#beszeljunk" className="inline-flex">
              <CTAPrimary size="sm">
                <span className="hidden md:inline">Foglalj időpontot →</span>
                <span className="inline md:hidden">Foglalj →</span>
              </CTAPrimary>
            </a>
            <button
              aria-label="Menü"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-1 transition-transform duration-200 active:scale-90"
            >
              <span
                className="block w-[22px] h-[2px] transition-transform duration-300"
                style={{
                  background: Z.forest,
                  marginBottom: 5,
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-[22px] h-[2px] transition-opacity duration-200"
                style={{
                  background: Z.forest,
                  marginBottom: 5,
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block w-[14px] h-[2px] transition-all duration-300"
                style={{
                  background: Z.forest,
                  width: open ? 22 : 14,
                  transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
          style={{
            maxHeight: open ? 360 : 0,
            opacity: open ? 1 : 0,
            borderTop: open ? `1px solid ${Z.hairline}` : "none",
          }}
        >
          <div className="flex flex-col px-5 py-4 gap-3">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="zen-link-underline font-sans py-1.5"
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: Z.forest,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  animation: open ? `fade-up 360ms ease-out ${60 + i * 40}ms both` : "none",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://labs.zentopia.io"
              className="zen-link-underline inline-flex items-center gap-1 font-sans py-1.5"
              style={{ fontSize: 16, fontWeight: 500, color: Z.slate, textDecoration: "none" }}
            >
              labs <span style={{ fontSize: 11 }}>↗</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
