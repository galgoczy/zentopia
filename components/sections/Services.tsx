"use client";

import { Z } from "@/lib/tokens";
import { useT } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { RasterIcon } from "@/components/ui/RasterIcon";
import { PixelCluster } from "@/components/ui/PixelCluster";
import { Reveal } from "@/components/ui/Reveal";

type Kind = "content" | "agents" | "flow" | "webapp" | "consult";

type Service = {
  n: string;
  color: string;
  title: string;
  sub: string;
  body: string;
  icon: Kind;
};

const ICON_SRC: Record<Kind, string> = {
  content: "/assets/icon_content.png",
  agents: "/assets/icon_agents.png",
  flow: "/assets/icon_automation.png",
  webapp: "/assets/icon_app.png",
  consult: "/assets/icon_consulting.png",
};

export function Services() {
  const t = useT();
  const SERVICES: Service[] = [
    { n: "02", color: Z.ember,    icon: "content", ...t.services.items.content },
    { n: "01", color: Z.sky,      icon: "agents",  ...t.services.items.agents },
    { n: "03", color: Z.violet,   icon: "flow",    ...t.services.items.flow },
    { n: "04", color: Z.coral,    icon: "webapp",  ...t.services.items.webapp },
    { n: "05", color: Z.sunshine, icon: "consult", ...t.services.items.consult },
  ];

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
              {t.services.label}
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
              {t.services.h2}
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
              {t.services.sub}
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
  const t = useT();
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

      <RasterIcon
        src={ICON_SRC[s.icon]}
        alt={s.title}
        color={s.color}
        size={big ? 120 : 64}
        glitchDelay={idx * 1.8}
      />

      <h3
        className="m-0 font-sans font-bold text-[28px] md:text-[30px]"
        style={{
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
        {t.services.miniCta}{" "}
        <span className="zen-arrow-nudge" style={{ color: s.color }}>
          →
        </span>
      </a>
    </div>
  );
}
