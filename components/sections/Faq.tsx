"use client";

import { useEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Reveal } from "@/components/ui/Reveal";

type Item = { q: string; a: string };

const accent = Z.ember;

export function Faq() {
  const t = useT();
  const FAQ = t.faq.items;
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      id="gyik"
      className="relative overflow-hidden bg-offwhite"
    >
      <PixelGrid />
      <div className="relative z-[1] px-5 pt-9 pb-16 md:px-14 md:pt-16 md:pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <Reveal className="flex flex-col gap-3.5 max-w-[760px]">
            <PixelLabel size={10} className="md:text-[11px]">
              {t.faq.label}
            </PixelLabel>
            <h2
              className="m-0 font-sans font-bold"
              style={{
                fontSize: "clamp(44px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: Z.forest,
                lineHeight: 0.98,
              }}
            >
              {t.faq.h2}
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:max-w-[320px]">
            <p
              className="m-0 leading-[1.5] md:text-right"
              style={{ fontSize: 15, color: Z.slate }}
            >
              {t.faq.sub}
            </p>
          </Reveal>
        </div>

        <div className="max-w-full md:max-w-[1080px]">
          {FAQ.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              idx={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  idx,
  isOpen,
  onToggle,
}: {
  item: Item;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (contentRef.current) setMaxH(contentRef.current.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [item.a]);

  return (
    <div
      className="group"
      style={{
        borderTop: idx === 0 ? `1px solid ${Z.hairline}` : "none",
        borderBottom: `1px solid ${Z.hairline}`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full bg-transparent border-none flex items-center justify-between gap-4 text-left cursor-pointer font-inherit transition-colors duration-200"
        style={{
          padding: "20px 4px",
        }}
      >
        <div className="flex items-baseline gap-4 flex-1">
          <span
            className="font-mono shrink-0"
            style={{
              fontSize: 11,
              color: accent,
              letterSpacing: "0.08em",
              width: 24,
            }}
          >
            0{idx + 1}.
          </span>
          <span
            className="font-sans font-bold"
            style={{
              fontSize: 17,
              color: Z.forest,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {item.q}
          </span>
        </div>
        <span
          className="inline-flex items-center justify-center shrink-0 rounded-full"
          style={{
            width: 28,
            height: 28,
            border: `1.5px solid ${isOpen ? accent : Z.forest}`,
            color: isOpen ? accent : Z.forest,
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition:
              "transform 320ms cubic-bezier(0.4, 0, 0.2, 1), color 220ms, border-color 220ms, background 220ms",
            background: isOpen ? `${accent}1a` : "transparent",
          }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? maxH : 0,
          overflow: "hidden",
          transition: "max-height 380ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={contentRef}
          className="leading-[1.6]"
          style={{
            padding: "0 4px 24px 44px",
            fontSize: 15,
            color: Z.slate,
            maxWidth: 920,
            transform: isOpen ? "translateY(0)" : "translateY(-6px)",
            opacity: isOpen ? 1 : 0,
            transition:
              "transform 380ms cubic-bezier(0.4, 0, 0.2, 1), opacity 280ms ease",
            transitionDelay: isOpen ? "60ms" : "0ms",
          }}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}
