"use client";

// Full-viewport 8-bit dither texture, barely-there, with a stepped jitter
// so the page never feels like a static screenshot. Pure CSS animation —
// disabled by the global reduced-motion block in globals.css.
const NOISE_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feComponentTransfer><feFuncA type='discrete' tableValues='0 0 0 1'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
);

export function DitherOverlay() {
  return (
    <div
      aria-hidden="true"
      className="zen-dither pointer-events-none fixed z-[110]"
      style={{
        inset: "-60%",
        opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
