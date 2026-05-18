// Tight crop + size-to-fit: trim every non-content pixel, then scale the
// longest side to (CANVAS - 2*MARGIN), then composite onto a fixed-size
// transparent canvas. All icons end up the same outer size with a uniform
// small breathing margin, no matter their original aspect ratio.
import sharp from "sharp";

const ICONS = [
  "icon_content",
  "icon_agent",
  "icon_automation",
  "icon_app",
  "icon_consulting",
];

const CANVAS = 256;
const MARGIN = 8;
const TARGET = CANVAS - MARGIN * 2; // 240

for (const name of ICONS) {
  const src = `public/assets/${name}.png`;

  // 1) Trim near-white frame.
  const trimmed = await sharp(src)
    .trim({ threshold: 12, background: "#FFFFFF" })
    .toBuffer({ resolveWithObject: true });

  // 2) Replace any remaining near-white pixel with full transparency so the
  //    icon sits cleanly on the off-white site background.
  const rawAfterWhitening = await sharp(trimmed.data)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { data: pixels, info: rawInfo } = rawAfterWhitening;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] > 245 && pixels[i + 1] > 245 && pixels[i + 2] > 245) {
      pixels[i + 3] = 0;
    }
  }
  // Re-trim using alpha so any newly-transparent border doesn't leave dead
  // space around the actual artwork. Round-trip through PNG so subsequent
  // sharp pipelines can decode the buffer normally.
  const cleaned = await sharp(pixels, {
    raw: { width: rawInfo.width, height: rawInfo.height, channels: 4 },
  })
    .png()
    .toBuffer()
    .then((buf) =>
      sharp(buf)
        .trim({ threshold: 5 })
        .toBuffer({ resolveWithObject: true })
    );

  // 3) Square the bbox: pad the shorter dimension with transparent pixels so
  //    the artwork sits inside a square and will fill the rendered img box
  //    in the browser (object-fit:contain on a square box). No content loss.
  const { width: w, height: h } = cleaned.info;
  const side = Math.max(w, h);
  const squared = await sharp(cleaned.data)
    .extend({
      top: Math.floor((side - h) / 2),
      bottom: Math.ceil((side - h) / 2),
      left: Math.floor((side - w) / 2),
      right: Math.ceil((side - w) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // 4) Resize the square to TARGET, composite centered onto CANVAS canvas
  //    so all icons end up the same size with a uniform breathing margin.
  const resized = await sharp(squared)
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
    .composite([{ input: resized, top: MARGIN, left: MARGIN }])
    .png({ compressionLevel: 9 })
    .toFile(src);

  const stat = await import("node:fs/promises").then((m) => m.stat(src));
  console.log(name, `(${w}×${h} → squared ${side}×${side} → ${TARGET}×${TARGET} on ${CANVAS}) →`, stat.size, "bytes");
}
