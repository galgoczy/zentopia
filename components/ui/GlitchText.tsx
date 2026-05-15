"use client";

import { useId } from "react";

export function GlitchText({
  children,
  cycle = 9,
  delay = 0,
}: {
  children: React.ReactNode;
  cycle?: number;
  delay?: number;
}) {
  const raw = useId();
  const id = "gt-" + raw.replace(/[^a-z0-9]/gi, "");
  return (
    <span className="relative inline-block">
      <style>{`
        @keyframes ${id}-shake {
          0%, 90%, 100% { transform: translate(0,0) scale(1); }
          90.5%         { transform: translate(2px, -1px) scale(1.02); }
          91%           { transform: translate(-2px, 1px) scale(0.98); }
          91.5%         { transform: translate(1px, 0) scale(1.01); }
          92%           { transform: translate(0,0) scale(1); }
        }
        @keyframes ${id}-tear1 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.5%              { opacity: 0.9; transform: translate(5px, 0); }
          91%                { opacity: 0.55; transform: translate(-4px, 0); }
        }
        @keyframes ${id}-tear2 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.6%              { opacity: 0.85; transform: translate(-5px, 0); }
          91.1%              { opacity: 0.5;  transform: translate(3px, 0); }
        }
        .${id}-shake { animation: ${id}-shake ${cycle}s steps(1,end) ${delay}s infinite; display: inline-block; }
        .${id}-tear1 { animation: ${id}-tear1 ${cycle}s steps(1,end) ${delay}s infinite; clip-path: polygon(0 22%, 100% 22%, 100% 42%, 0 42%); position: absolute; inset: 0; pointer-events: none; }
        .${id}-tear2 { animation: ${id}-tear2 ${cycle}s steps(1,end) ${delay}s infinite; clip-path: polygon(0 58%, 100% 58%, 100% 80%, 0 80%); position: absolute; inset: 0; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-shake, .${id}-tear1, .${id}-tear2 { animation: none !important; }
        }
      `}</style>
      <span className={`${id}-shake`}>{children}</span>
      <span className={`${id}-tear1`} aria-hidden="true">{children}</span>
      <span className={`${id}-tear2`} aria-hidden="true">{children}</span>
    </span>
  );
}
