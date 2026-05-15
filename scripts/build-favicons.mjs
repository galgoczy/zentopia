// Build favicon set from the existing forest-color bonsai logo.
// Outputs to app/ so Next.js 14 App Router serves them automatically.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/assets/logo-forest.png";
const APP = "app";

await mkdir(APP, { recursive: true });

// /icon.png — small favicon, transparent background (renders well in light and dark UA)
await sharp(SRC)
  .resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(`${APP}/icon.png`);

// /apple-icon.png — 180x180, opaque off-white background tile (iOS requires opaque)
const bg = await sharp({
  create: { width: 180, height: 180, channels: 4, background: { r: 250, g: 250, b: 247, alpha: 1 } },
})
  .png()
  .toBuffer();

const bonsai = await sharp(SRC)
  .resize(140, 140, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(bg)
  .composite([{ input: bonsai, gravity: "center" }])
  .png()
  .toFile(`${APP}/apple-icon.png`);

console.log("generated app/icon.png and app/apple-icon.png");
