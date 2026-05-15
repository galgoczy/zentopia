"use client";

import { useId, useMemo } from "react";
import { Z } from "@/lib/tokens";

type Base = "forest" | "white" | "black" | "lime";

const SRC: Record<Base, string> = {
  forest: "/assets/logo-forest.png",
  white: "/assets/logo-white.png",
  black: "/assets/logo-black.png",
  lime: "/assets/logo-lime.png",
};

export function BreathingBonsai({
  size = 320,
  base = "forest",
  glowLime = true,
  sweepSeconds = 4.5,
  glitch = true,
  glitchCycle = 9,
}: {
  size?: number;
  base?: Base;
  glowLime?: boolean;
  sweepSeconds?: number;
  glitch?: boolean;
  glitchCycle?: number;
}) {
  const raw = useId();
  const id = "bb-" + raw.replace(/[^a-z0-9]/gi, "");
  const baseSrc = SRC[base];

  const debris = useMemo(() => {
    let s = (id.charCodeAt(2) || 11) * 9301 + 49297;
    const rng = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 14 }, () => ({
      x: 12 + rng() * 76,
      y: 14 + rng() * 70,
      w: 3 + rng() * 6,
    }));
  }, [id]);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      aria-label="Zentopia bonsai"
    >
      <style>{`
        @keyframes ${id}-sweep {
          0%   { -webkit-mask-position: 0 140%;        mask-position: 0 140%; opacity: 0.0; }
          15%  { opacity: 0.95; }
          85%  { opacity: 0.95; }
          100% { -webkit-mask-position: 0 -40%;        mask-position: 0 -40%; opacity: 0.0; }
        }
        @keyframes ${id}-breath {
          0%,100% { filter: drop-shadow(0 0 0px rgba(200,255,107,0.0)); }
          50%     { filter: drop-shadow(0 0 18px rgba(200,255,107,0.55)); }
        }
        @keyframes ${id}-shake {
          0%, 90%, 100% { transform: translate(0,0) scale(1); }
          90.5%         { transform: translate(3px, -2px) scale(1.025); }
          91%           { transform: translate(-4px, 1px) scale(0.975); }
          91.5%         { transform: translate(2px, 1px) scale(1.015); }
          92%           { transform: translate(-1px, 0) scale(0.99); }
          92.5%         { transform: translate(0, 0) scale(1); }
        }
        @keyframes ${id}-pixelate {
          0%, 90%, 100% { filter: none; }
          90.6%         { filter: contrast(2.4) brightness(1.4) blur(0.5px); }
          91%           { filter: contrast(3.2) brightness(1.1) blur(1.2px); }
          91.6%         { filter: contrast(1.8) blur(0.6px); }
          92%           { filter: contrast(1.3); }
        }
        @keyframes ${id}-tear1 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.4%              { opacity: 0.85; transform: translate(8px, 0); }
          90.9%              { opacity: 0.7;  transform: translate(-6px, 0); }
          91.4%              { opacity: 0.6;  transform: translate(3px, 0); }
        }
        @keyframes ${id}-tear2 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.5%              { opacity: 0.9; transform: translate(-9px, 0); }
          91.0%              { opacity: 0.6; transform: translate(5px, 0); }
          91.5%              { opacity: 0.4; transform: translate(-2px, 0); }
        }
        @keyframes ${id}-tear3 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.6%              { opacity: 0.75; transform: translate(6px, 0); }
          91.1%              { opacity: 0.55; transform: translate(-3px, 0); }
        }
        @keyframes ${id}-debris {
          0%, 90%, 92%, 100% { opacity: 0; transform: scale(0.6); }
          90.5%              { opacity: 1;    transform: scale(1.0); }
          91.2%              { opacity: 0.55; transform: scale(1.15); }
          91.8%              { opacity: 0;    transform: scale(0.7); }
        }
        .${id}-breath { animation: ${id}-breath ${sweepSeconds * 1.2}s ease-in-out infinite; }
        .${id}-pixelate { animation: ${id}-pixelate ${glitchCycle}s steps(1,end) infinite; }
        .${id}-overlay {
          -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 85%);
                  mask-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 85%);
          -webkit-mask-size: 100% 220%;
                  mask-size: 100% 220%;
          -webkit-mask-repeat: no-repeat;
                  mask-repeat: no-repeat;
          animation: ${id}-sweep ${sweepSeconds}s ease-in-out infinite;
        }
        ${glitch ? `
          .${id}-shake   { animation: ${id}-shake   ${glitchCycle}s steps(1,end) infinite; transform-origin: 50% 50%; }
          .${id}-tear1   { animation: ${id}-tear1   ${glitchCycle}s steps(1,end) infinite; clip-path: polygon(0 18%, 100% 18%, 100% 38%, 0 38%); }
          .${id}-tear2   { animation: ${id}-tear2   ${glitchCycle}s steps(1,end) infinite; clip-path: polygon(0 46%, 100% 46%, 100% 60%, 0 60%); }
          .${id}-tear3   { animation: ${id}-tear3   ${glitchCycle}s steps(1,end) infinite; clip-path: polygon(0 72%, 100% 72%, 100% 88%, 0 88%); }
          .${id}-debris  { animation: ${id}-debris  ${glitchCycle}s steps(1,end) infinite; }
        ` : ''}
        @media (prefers-reduced-motion: reduce) {
          .${id}-overlay, .${id}-breath, .${id}-shake, .${id}-pixelate,
          .${id}-tear1, .${id}-tear2, .${id}-tear3, .${id}-debris { animation: none !important; }
        }
      `}</style>

      <div className={glitch ? `${id}-shake absolute inset-0` : "absolute inset-0"}>
        <img
          src={baseSrc}
          className={`${id}-breath ${glitch ? `${id}-pixelate` : ""} absolute inset-0 w-full h-full object-contain`}
          alt=""
        />
        {glowLime && (
          <img
            src="/assets/logo-lime.png"
            className={`${id}-overlay absolute inset-0 w-full h-full object-contain`}
            alt=""
          />
        )}
      </div>

      {glitch && (
        <>
          <img
            src="/assets/logo-lime.png"
            className={`${id}-tear1 absolute inset-0 w-full h-full object-contain pointer-events-none`}
            style={{ mixBlendMode: "screen" }}
            alt=""
          />
          <img
            src={baseSrc}
            className={`${id}-tear2 absolute inset-0 w-full h-full object-contain pointer-events-none`}
            alt=""
          />
          <img
            src="/assets/logo-lime.png"
            className={`${id}-tear3 absolute inset-0 w-full h-full object-contain pointer-events-none`}
            style={{ mixBlendMode: "screen" }}
            alt=""
          />

          <div className={`${id}-debris absolute inset-0 pointer-events-none`} aria-hidden="true">
            {debris.map((d, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: `${(d.w / 100) * size}px`,
                  height: `${(d.w / 100) * size}px`,
                  background: Z.lime,
                  boxShadow: `0 0 4px ${Z.lime}`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
