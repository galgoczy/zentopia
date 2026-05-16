// Build /public/og-image.png — 1200x630 social card.
// Composition: forest bonsai right, brand wordmark + tagline left, lime accent
// pill, brand corner brackets, off-white pixel-grid background.
//
// Sharp+resvg can't load Space Grotesk reliably from a fresh container, so
// the text uses a system-fallback font-family. The brand identity carries
// through color + composition + bonsai.

import sharp from "sharp";

const W = 1200;
const H = 630;
const PAD = 80;

const FOREST = "#0F1F1A";
const OFFWHITE = "#FAFAF7";
const LIME = "#C8FF6B";
const SLATE = "#5A6F66";

// Pre-resize the bonsai PNG with a transparent background.
const bonsai = await sharp("public/assets/logo-forest.png")
  .resize(420, 420, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .toBuffer();

// Compose everything else as one big SVG so text and lines render in one pass.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,31,26,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${OFFWHITE}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Corner brackets (top-left, top-right, bottom-left, bottom-right) -->
  <path d="M 40 60 L 40 40 L 60 40" fill="none" stroke="${FOREST}" stroke-width="3" stroke-linecap="square"/>
  <path d="M ${W - 60} 40 L ${W - 40} 40 L ${W - 40} 60" fill="none" stroke="${FOREST}" stroke-width="3" stroke-linecap="square"/>
  <path d="M 40 ${H - 60} L 40 ${H - 40} L 60 ${H - 40}" fill="none" stroke="${FOREST}" stroke-width="3" stroke-linecap="square"/>
  <path d="M ${W - 60} ${H - 40} L ${W - 40} ${H - 40} L ${W - 40} ${H - 60}" fill="none" stroke="${FOREST}" stroke-width="3" stroke-linecap="square"/>

  <!-- Pixel label "[ 00 ] MANIFESTO" — small mono-ish text top-left -->
  <text x="${PAD}" y="${PAD + 30}" font-family="monospace" font-size="16" letter-spacing="2" fill="${FOREST}" font-weight="700">[ 00 ] MANIFESTO</text>

  <!-- Wordmark big -->
  <text x="${PAD}" y="${PAD + 130}" font-family="-apple-system, 'Helvetica Neue', Arial, sans-serif" font-size="96" font-weight="700" letter-spacing="-3" fill="${FOREST}">zentopia</text>

  <!-- Tagline lines -->
  <text x="${PAD}" y="${PAD + 220}" font-family="-apple-system, 'Helvetica Neue', Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="-1.5" fill="${FOREST}">Jövő-technológia.</text>
  <text x="${PAD}" y="${PAD + 272}" font-family="-apple-system, 'Helvetica Neue', Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="-1.5" fill="${FOREST}">A TE üzletedben.</text>
  <text x="${PAD}" y="${PAD + 324}" font-family="-apple-system, 'Helvetica Neue', Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="-1.5" fill="${FOREST}">Ma.</text>

  <!-- Lime accent pill bottom-left -->
  <g transform="translate(${PAD}, ${H - 130})">
    <rect x="-4" y="-4" width="368" height="60" fill="${FOREST}"/>
    <rect x="0" y="0" width="360" height="56" fill="${LIME}"/>
    <text x="22" y="38" font-family="-apple-system, 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="-0.5" fill="${FOREST}">Hetek, nem hónapok →</text>
  </g>

  <!-- Mono caption bottom-right -->
  <text x="${W - PAD}" y="${H - 50}" font-family="monospace" font-size="14" letter-spacing="1" fill="${SLATE}" text-anchor="end">circuit_bonsai.v2 · zentopia.io</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([
    {
      input: bonsai,
      top: Math.floor((H - 420) / 2) - 10,
      left: W - 420 - 60,
    },
  ])
  .png({ quality: 92 })
  .toFile("public/og-image.png");

const stat = await import("node:fs/promises").then((m) => m.stat("public/og-image.png"));
console.log("public/og-image.png", stat.size, "bytes");
