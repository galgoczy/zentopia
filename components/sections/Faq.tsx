"use client";

import { useEffect, useRef, useState } from "react";
import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { Reveal } from "@/components/ui/Reveal";

type Item = { q: string; a: string };

const FAQ: Item[] = [
  { q: "Mennyibe kerül egy AI projekt nálatok?", a: "A projektek 500.000 – 5.000.000 HUF közötti tartományban mozognak, a komplexitás függvényében. Egy ügyfélszolgálati chatbot más nagyságrend, mint egy teljes webshop AI workflow. A pontos árajánlatot az Audit után adjuk, számokkal alátámasztva." },
  { q: "Mennyi időbe telik egy projekt?", a: "A legtöbb build 2–8 hét. A Nola and Co (teljes AI webshop) 2 hét alatt készült el. Egy enterprise AI agent rendszer (mint az Alfie) 6–8 hét. Az időt mindig az Auditban közösen véglegesítjük." },
  { q: "Mi a különbség köztetek és egy ChatGPT bevezetés között?", a: "A ChatGPT egy eszköz. Mi rendszereket építünk, amik konkrét üzleti folyamatokat futtatnak — számlákat dolgoznak fel, ügyfeleket szolgálnak ki, riportokat készítenek. Egy ChatGPT-fiók válaszol, ha kérdezed. Egy zentopia AI rendszer 0-24 dolgozik, integrálva a többi rendszereddel." },
  { q: "Mi van, ha nincs sok adatunk vagy nincs technikai csapatunk?", a: 'Ez a leggyakoribb helyzet a vállalkozásoknál — pont ezért dolgozunk velük. Az Auditban átnézzük, mi van, és mi hiányzik. Sokszor a "nincs adatunk" valójában csak azt jelenti, hogy az adat egy másik rendszerben van. Nem kell technikai csapat — mi vagyunk az.' },
  { q: "Mi van az adataimmal? Biztonságosan kezeled?", a: "Igen. Minden projekt saját, izolált környezetben fut (lásd: Alfie enterprise sandbox). Az ügyfél-adatokat soha nem osztjuk meg AI training-re, harmadik felekkel. GDPR-konform működés, magyar jogi környezet." },
  { q: "Mi van, ha az ingyenes AI-konzultáció után nem akarok veletek dolgozni?", a: "Akkor a térkép a tied. Megmutattuk, hol érdemes elindulnod — akár saját erőből, akár másik partnerrel. Nincs nyomás, nincs follow-up email-spam." },
  { q: 'Mi az a "labs.zentopia.io"?', a: 'Ez a "labor" — itt megosztjuk a tanulságokat, a meghibásodásokat, a kísérleteket. Magyar nyelvű AI-tartalom, ami nem hype, hanem tapasztalat. Iratkozz fel, ha akarsz.' },
];

const accent = Z.ember;

export function Faq() {
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
              [ 07 ] GYIK
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
              Gyakori kérdések.
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:max-w-[320px]">
            <p
              className="m-0 leading-[1.5] md:text-right"
              style={{ fontSize: 15, color: Z.slate }}
            >
              Amit minden első beszélgetésen megkérdeznek.
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
