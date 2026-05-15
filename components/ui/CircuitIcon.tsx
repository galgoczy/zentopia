"use client";

import { useId, useMemo } from "react";

type Kind = "content" | "agents" | "flow" | "webapp" | "consult";

export function CircuitIcon({
  kind,
  color,
  size = 64,
  glitch = true,
  glitchDelay = 0,
  glitchCycle = 9,
}: {
  kind: Kind;
  color: string;
  size?: number;
  glitch?: boolean;
  glitchDelay?: number;
  glitchCycle?: number;
}) {
  const stroke = 2.2;
  const term = 3.5;
  const C = color;
  const common = {
    strokeWidth: stroke,
    stroke: C,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const raw = useId();
  const id = "ci-" + raw.replace(/[^a-z0-9]/gi, "");

  const debris = useMemo(() => {
    let s = (id.charCodeAt(2) || 11) * 9301 + 49297;
    const rng = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 7 }, () => ({
      x: 15 + rng() * 70,
      y: 15 + rng() * 70,
      w: 2 + rng() * 3,
    }));
  }, [id]);

  const body = (() => {
    switch (kind) {
      case "content":
        return (
          <>
            <rect x="14" y="14" width="60" height="60" {...common} />
            <line x1="24" y1="30" x2="58" y2="30" {...common} />
            <line x1="24" y1="44" x2="64" y2="44" {...common} />
            <line x1="24" y1="58" x2="50" y2="58" {...common} />
            <circle cx="58" cy="30" r={term} fill={C} />
            <circle cx="64" cy="44" r={term} fill={C} />
            <circle cx="50" cy="58" r={term} fill={C} />
          </>
        );
      case "agents":
        return (
          <>
            <line x1="20" y1="60" x2="44" y2="20" {...common} />
            <line x1="44" y1="20" x2="68" y2="60" {...common} />
            <line x1="20" y1="60" x2="68" y2="60" {...common} />
            <circle cx="20" cy="60" r={term + 2} fill={C} />
            <circle cx="44" cy="20" r={term + 2} fill={C} />
            <circle cx="68" cy="60" r={term + 2} fill={C} />
            <circle cx="44" cy="46" r={term - 0.5} fill={C} />
          </>
        );
      case "flow":
        return (
          <>
            <polyline points="14,30 26,30 26,52 44,52 44,28 60,28 60,58 74,58" {...common} />
            <polyline points="74,58 70,54" {...common} />
            <polyline points="74,58 70,62" {...common} />
            <circle cx="14" cy="30" r={term} fill={C} />
            <circle cx="26" cy="30" r={term - 1} fill={C} />
            <circle cx="26" cy="52" r={term - 1} fill={C} />
            <circle cx="44" cy="52" r={term - 1} fill={C} />
            <circle cx="44" cy="28" r={term - 1} fill={C} />
            <circle cx="60" cy="28" r={term - 1} fill={C} />
            <circle cx="60" cy="58" r={term - 1} fill={C} />
          </>
        );
      case "webapp":
        return (
          <>
            <rect x="14" y="20" width="60" height="48" {...common} />
            <line x1="14" y1="32" x2="74" y2="32" {...common} />
            <circle cx="22" cy="26" r={term - 0.5} fill={C} />
            <circle cx="30" cy="26" r={term - 0.5} fill={C} />
            <rect x="24" y="42" width="20" height="18" {...common} />
            <line x1="50" y1="46" x2="66" y2="46" {...common} />
            <line x1="50" y1="54" x2="62" y2="54" {...common} />
            <circle cx="66" cy="46" r={term} fill={C} />
            <circle cx="62" cy="54" r={term} fill={C} />
          </>
        );
      case "consult":
        return (
          <>
            <rect x="32" y="36" width="24" height="18" rx="2" {...common} />
            <circle cx="38" cy="42" r="1.4" fill={C} />
            <circle cx="46" cy="40" r="1.4" fill={C} />
            <circle cx="51" cy="46" r="1.4" fill={C} />
            <circle cx="40" cy="48" r="1.4" fill={C} />
            <circle cx="48" cy="50" r="1.4" fill={C} />
            <line x1="38" y1="42" x2="46" y2="40" {...common} strokeWidth={1.2} />
            <line x1="46" y1="40" x2="51" y2="46" {...common} strokeWidth={1.2} />
            <line x1="40" y1="48" x2="48" y2="50" {...common} strokeWidth={1.2} />
            <line x1="44" y1="14" x2="44" y2="36" {...common} />
            <line x1="44" y1="54" x2="44" y2="74" {...common} />
            <line x1="14" y1="45" x2="32" y2="45" {...common} />
            <line x1="56" y1="45" x2="74" y2="45" {...common} />
            <polyline points="20,20 28,28 32,36" {...common} />
            <polyline points="68,20 60,28 56,36" {...common} />
            <polyline points="20,68 28,60 32,54" {...common} />
            <polyline points="68,68 60,60 56,54" {...common} />
            <circle cx="44" cy="14" r={term} fill={C} />
            <circle cx="44" cy="74" r={term} fill={C} />
            <circle cx="14" cy="45" r={term} fill={C} />
            <circle cx="74" cy="45" r={term} fill={C} />
            <circle cx="20" cy="20" r={term} fill={C} />
            <circle cx="68" cy="20" r={term} fill={C} />
            <circle cx="20" cy="68" r={term} fill={C} />
            <circle cx="68" cy="68" r={term} fill={C} />
          </>
        );
    }
  })();

  const svgEl = (
    <svg width={size} height={size} viewBox="0 0 88 88" className="block">
      {body}
    </svg>
  );

  if (!glitch) return svgEl;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <style>{`
        @keyframes ${id}-shake {
          0%, 90%, 100% { transform: translate(0,0) scale(1); }
          90.5%         { transform: translate(2px, -1px) scale(1.04); }
          91%           { transform: translate(-2px, 1px) scale(0.96); }
          91.5%         { transform: translate(1px, 0) scale(1.02); }
          92%           { transform: translate(0,0) scale(1); }
        }
        @keyframes ${id}-pix {
          0%, 90%, 100% { filter: none; }
          90.6%         { filter: contrast(2) brightness(1.3) blur(0.4px); }
          91.3%         { filter: contrast(2.4) blur(0.8px); }
          91.8%         { filter: contrast(1.4); }
        }
        @keyframes ${id}-tear1 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.5%              { opacity: 0.9; transform: translate(5px, 0); }
          91%                { opacity: 0.7; transform: translate(-4px, 0); }
        }
        @keyframes ${id}-tear2 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.6%              { opacity: 0.85; transform: translate(-5px, 0); }
          91.1%              { opacity: 0.5;  transform: translate(3px, 0); }
        }
        @keyframes ${id}-debris {
          0%, 90%, 92%, 100% { opacity: 0; transform: scale(0.5); }
          90.6%              { opacity: 1;    transform: scale(1); }
          91.4%              { opacity: 0.4;  transform: scale(1.2); }
        }
        @keyframes ${id}-hover-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06) rotate(-1deg); }
        }
        .${id}-shake  { animation: ${id}-shake  ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; transform-origin: 50% 50%; }
        .${id}-pix    { animation: ${id}-pix    ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; }
        .${id}-tear1  { animation: ${id}-tear1  ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; clip-path: polygon(0 22%, 100% 22%, 100% 42%, 0 42%); }
        .${id}-tear2  { animation: ${id}-tear2  ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; clip-path: polygon(0 58%, 100% 58%, 100% 78%, 0 78%); }
        .${id}-debris { animation: ${id}-debris ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; }
        .group:hover .${id}-host { animation: ${id}-hover-pulse 700ms ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-shake, .${id}-pix, .${id}-tear1, .${id}-tear2, .${id}-debris, .${id}-host { animation: none !important; }
        }
      `}</style>
      <div className={`${id}-shake absolute inset-0`}>
        <div className={`${id}-pix ${id}-host`}>{svgEl}</div>
      </div>
      <div className={`${id}-tear1 absolute inset-0 pointer-events-none`}>{svgEl}</div>
      <div className={`${id}-tear2 absolute inset-0 pointer-events-none`}>{svgEl}</div>
      <div className={`${id}-debris absolute inset-0 pointer-events-none`} aria-hidden="true">
        {debris.map((d, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.w,
              height: d.w,
              background: color,
            }}
          />
        ))}
      </div>
    </div>
  );
}
