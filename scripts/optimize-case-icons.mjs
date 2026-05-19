// Optimize the 4 case-study PNG illustrations: aggressive trim of the white
// frame, alpha cleanup, square-pad the bbox so the artwork fills the slot,
// then resize to 256×256. Save under kind-based canonical names that
// Cases.tsx can look up directly.
import sharp from "sharp";
import { unlink } from "node:fs/promises";

const MAP = [
  ["aiselfie_thin.png", "case-photo.png"],   // kind: "photo"  (Selfiemata)
  ["pepper_thin.png",   "case-ledger.png"],  // kind: "ledger" (Pepper House)
  ["alfie_thin.png",    "case-agent.png"],   // kind: "agent"  (Alfie)
  ["nola_thin.png",     "case-shop.png"],    // kind: "shop"   (Nola)
];

const CANVAS = 256;
const MARGIN = 8;
const TARGET = CANVAS - MARGIN * 2; // 240

for (const [from, to] of MAP) {
  const src = `public/assets/${from}`;
  const dst = `public/assets/${to}`;

  // 1) Trim the near-white frame
  const trimmed = await sharp(src)
    .trim({ threshold: 12, background: "#FFFFFF" })
    .toBuffer({ resolveWithObject: true });

  // 2) Make any remaining near-white pixel fully transparent
  const { data: raw, info: rawInfo } = await sharp(trimmed.data)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < raw.length; i += 4) {
    if (raw[i] > 245 && raw[i + 1] > 245 && raw[i + 2] > 245) {
      raw[i + 3] = 0;
    }
  }

  // 3) Re-trim by alpha so the new transparency clears any residual border
  const reTrimmed = await sharp(raw, {
    raw: { width: rawInfo.width, height: rawInfo.height, channels: 4 },
  })
    .png()
    .toBuffer()
    .then((buf) =>
      sharp(buf).trim({ threshold: 5 }).toBuffer({ resolveWithObject: true })
    );

  // 4) Square the bbox: pad shorter axis with transparent so the artwork
  //    will fill the slot in object-fit:contain without leaving DOM padding.
  const { width: w, height: h } = reTrimmed.info;
  const side = Math.max(w, h);
  const squared = await sharp(reTrimmed.data)
    .extend({
      top: Math.floor((side - h) / 2),
      bottom: Math.ceil((side - h) / 2),
      left: Math.floor((side - w) / 2),
      right: Math.ceil((side - w) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // 5) Resize the squared artwork to TARGET, composite onto a CANVAS canvas
  //    with the uniform breathing MARGIN.
  const scaled = await sharp(squared)
    .resize(TARGET, TARGET, { fit: "fill" })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: CANVAS,
      height: CANVAS,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: scaled, top: MARGIN, left: MARGIN }])
    .png({ compressionLevel: 9 })
    .toFile(dst);

  const stat = await import("node:fs/promises").then((m) => m.stat(dst));
  console.log(
    `${from} (${w}×${h}) → ${to} (${CANVAS}×${CANVAS}) ${stat.size} bytes`
  );

  // Drop the staging _thin source now that the canonical PNG is in place
  await unlink(src);
}
