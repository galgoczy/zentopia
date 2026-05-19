// Re-process case-photo.png with a tight bbox (no square-padding) so the
// camera artwork fills the PNG canvas — when the browser does
// object-fit:contain into a wider-than-tall slot, it'll be height-limited
// by the slot directly instead of by transparent padding baked into the PNG.
import sharp from "sharp";
import { unlink } from "node:fs/promises";

const SRC = "public/assets/aiselfie_thin.png";
const DST = "public/assets/case-photo.png";

// Target the longest side. The PNG ends up landscape/portrait to match the
// artwork's natural aspect ratio with an 8px transparent breathing border.
const LONGEST = 256;
const MARGIN = 8;

// 1) Trim near-white frame
const trimmed = await sharp(SRC)
  .trim({ threshold: 12, background: "#FFFFFF" })
  .toBuffer({ resolveWithObject: true });

// 2) Whiten remaining near-white pixels
const { data: raw, info: rawInfo } = await sharp(trimmed.data)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < raw.length; i += 4) {
  if (raw[i] > 245 && raw[i + 1] > 245 && raw[i + 2] > 245) raw[i + 3] = 0;
}

// 3) Re-trim by alpha — tight to actual artwork
const reTrimmed = await sharp(raw, {
  raw: { width: rawInfo.width, height: rawInfo.height, channels: 4 },
})
  .png()
  .toBuffer()
  .then((buf) =>
    sharp(buf).trim({ threshold: 5 }).toBuffer({ resolveWithObject: true })
  );

const { width: w, height: h } = reTrimmed.info;

// 4) Scale the longer side to LONGEST - 2*MARGIN, keep aspect ratio.
const target = LONGEST - MARGIN * 2;
const scale = target / Math.max(w, h);
const newW = Math.round(w * scale);
const newH = Math.round(h * scale);

const scaled = await sharp(reTrimmed.data)
  .resize(newW, newH, { fit: "fill" })
  .png()
  .toBuffer();

// 5) Composite onto an (newW + 2*MARGIN) × (newH + 2*MARGIN) transparent
//    canvas. Final PNG has tight margin around the actual artwork.
const canvasW = newW + MARGIN * 2;
const canvasH = newH + MARGIN * 2;

await sharp({
  create: {
    width: canvasW,
    height: canvasH,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: scaled, top: MARGIN, left: MARGIN }])
  .png({ compressionLevel: 9 })
  .toFile(DST);

const stat = await import("node:fs/promises").then((m) => m.stat(DST));
console.log(
  `case-photo.png ${canvasW}×${canvasH} (artwork ${newW}×${newH}), ${stat.size} bytes`
);

await unlink(SRC);
