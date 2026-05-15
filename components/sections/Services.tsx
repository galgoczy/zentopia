"use client";

import { Z } from "@/lib/tokens";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { CircuitIcon } from "@/components/ui/CircuitIcon";
import { PixelCluster } from "@/components/ui/PixelCluster";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  n: string;
  color: string;
  title: string;
  sub: string;
  body: string;
  icon: "content" | "agents" | "flow" | "webapp" | "consult";
};

const SERVICES: Service[] = [
  { n: "02", color: Z.ember,    title: "AI tartalomgyártás",      sub: "Kreatív kommunikáció",        body: "Social poszt, kampányszöveg, blog, video script, AI képek és kreatív tesztek — gyorsabban, több verzióban.", icon: "content" },
  { n: "01", color: Z.sky,      title: "AI agentek",              sub: "Digitális asszisztensek",     body: "Ügyfélszolgálati, sales, admin, HR vagy dokumentumkezelő AI munkatársak. Saját rendszerre szabva.",          icon: "agents"  },
  { n: "03", color: Z.violet,   title: "Folyamat-automatizáció",  sub: "Ismétlődő munka, eltüntetve", body: "E-mailek, ajánlatkérések, CRM, számlák, riportok automatizálása n8n / Make / Zapier alapon.",            icon: "flow"    },
  { n: "04", color: Z.coral,    title: "AI webappok",             sub: "Egyedi üzleti alkalmazások",  body: "Dashboard-ok, tudásbázisok (RAG), ajánlatkészítő rendszerek, integrált CRM/ERP megoldások.",                icon: "webapp"  },
  { n: "05", color: Z.sunshine, title: "AI tanácsadás",           sub: "Képzés és bevezetés",         body: "AI audit, eszközválasztás, vezetői workshop, csapat-tréning, promptolás, bevezetési roadmap.",               icon: "consult" },
];

export function Services() {
  const featured = SERVICES[1];
  const others = SERVICES.filter((_, i) => i !== 1);

  return (
    <section
      id="szolgaltatasok"
      className="relative overflow-hidden bg-offwhite"
    >
      <PixelGrid />
      <div className="relative z-[1] px-5 py-12 md:px-14 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 md:mb-12">
          <Reveal className="flex flex-col gap-3.5 max-w-[760px]">
            <PixelLabel size={10} className="md:text-[11px]">
              [ 02 ] SZOLGÁLTATÁSOK
            </PixelLabel>
            <h2
              className="m-0 font-sans font-bold"
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                letterSpacing: "-0.035em",
                color: Z.forest,
                lineHeight: 0.98,
              }}
            >
              Amit a Zentopia épít.
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:max-w-[320px]">
            <p
              className="m-0 leading-[1.5] md:text-right"
              style={{
                fontSize: 15,
                color: Z.slate,
              }}
            >
              Öt terület — minden problémára egy konkrét megoldás.
            </p>
          </Reveal>
        </div>

        {/* mobile: stack big featured + 4 small */}
        <div className="flex flex-col gap-3.5 md:hidden">
          <Reveal delay={60}>
            <ServiceCard s={featured} big idx={0} />
          </Reveal>
          {others.map((s, i) => (
            <Reveal key={s.n} delay={120 + i * 70}>
              <ServiceCard s={s} idx={i + 1} />
            </Reveal>
          ))}
        </div>

        {/* desktop: bento grid */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "minmax(180px, auto)",
            gap: 16,
          }}
        >
          <Reveal className="row-span-2 col-span-2">
            <ServiceCard s={featured} big idx={0} />
          </Reveal>
          {others.map((s, i) => (
            <Reveal key={s.n} delay={80 + i * 80}>
              <ServiceCard s={s} idx={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  s,
  big = false,
  idx = 0,
}: {
  s: Service;
  big?: boolean;
  idx?: number;
}) {
  return (
    <div
      className="group zen-card-lift relative overflow-hidden flex flex-col h-full"
      style={{
        background: Z.white,
        border: `1px solid ${Z.hairline}`,
        borderRadius: 12,
        padding: big ? 24 : 22,
        gap: big ? 18 : 14,
        minHeight: big ? 280 : 220,
      }}
    >
      <PixelCluster
        color={s.color}
        pattern="4x4"
        className="absolute top-[10px] right-[10px]"
      />

      <div className="flex items-center gap-2.5">
        <span
          className="font-pixel"
          style={{ fontSize: 10, color: s.color, letterSpacing: "0.04em" }}
        >
          [ {s.n} ]
        </span>
      </div>

      <CircuitIcon
        kind={s.icon}
        color={s.color}
        size={big ? 80 : 52}
        glitchDelay={idx * 1.8}
      />

      <h3
        className="m-0 font-sans font-bold"
        style={{
          fontSize: big ? 28 : 20,
          letterSpacing: "-0.03em",
          color: Z.forest,
          lineHeight: 1.05,
        }}
      >
        {s.title}
      </h3>
      <span
        className="font-mono -mt-2"
        style={{
          fontSize: big ? 13 : 12,
          color: s.color,
          letterSpacing: "0.02em",
          filter: "brightness(0.85)",
        }}
      >
        // {s.sub}
      </span>
      <p
        className="m-0 leading-[1.5] flex-1"
        style={{
          fontSize: big ? 15 : 13,
          color: Z.slate,
        }}
      >
        {s.body}
      </p>
      <a
        href="#"
        className="zen-arrow-host inline-flex items-center gap-1.5 font-sans"
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: Z.forest,
          textDecoration: "none",
        }}
      >
        Olvasd el{" "}
        <span className="zen-arrow-nudge" style={{ color: s.color }}>
          →
        </span>
      </a>
    </div>
  );
}
