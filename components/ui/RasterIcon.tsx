"use client";

import { useId, useMemo } from "react";

// Raster equivalent of CircuitIcon — takes a PNG/WEBP src instead of rendering
// SVG paths, but keeps the exact same glitch/shake/tear/debris cycle so the
// icons feel like they belong to the same family.

export function RasterIcon({
  src,
  alt = "",
  color,
  size = 64,
  glitch = true,
  glitchDelay = 0,
  glitchCycle = 9,
}: {
  src: string;
  alt?: string;
  /** Section accent color — used for the lime-style pixel debris. */
  color: string;
  size?: number;
  glitch?: boolean;
  glitchDelay?: number;
  glitchCycle?: number;
}) {
  const raw = useId();
  const id = "ri-" + raw.replace(/[^a-z0-9]/gi, "");

  const debris = useMemo(() => {
    let s = (id.charCodeAt(2) || 11) * 9301 + 49297;
    const rng = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 7 }, () => ({
      x: 15 + rng() * 70,
      y: 15 + rng() * 70,
      w: 2 + rng() * 3,
    }));
  }, [id]);

  const img = (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="block"
      style={{ objectFit: "contain" }}
      draggable={false}
    />
  );

  if (!glitch) return img;

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
        <div className={`${id}-pix ${id}-host`}>{img}</div>
      </div>
      <div className={`${id}-tear1 absolute inset-0 pointer-events-none`}>{img}</div>
      <div className={`${id}-tear2 absolute inset-0 pointer-events-none`}>{img}</div>
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
