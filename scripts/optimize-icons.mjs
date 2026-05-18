// Trim white background, resize to 256x256 retina-ready, optimize.
import sharp from "sharp";

const ICONS = [
  "icon_content",
  "icon_agent",
  "icon_automation",
  "icon_app",
  "icon_consulting",
];

for (const name of ICONS) {
  const src = `public/assets/${name}.png`;
  // Trim near-white pixels, then resize. Use a high threshold so any
  // off-white fringe gets cleared too.
  const buf = await sharp(src)
    .trim({ threshold: 12, background: "#FFFFFF" })
    .resize(256, 256, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    // Make white pixels fully transparent — the source has a solid white bg.
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(async ({ data, info }) => {
      // Walk pixels, set alpha = 0 where R+G+B all > 245.
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245) {
          data[i + 3] = 0;
        }
      }
      await sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
      })
        .png({ compressionLevel: 9 })
        .toFile(src);
    });

  const stat = await import("node:fs/promises").then((m) => m.stat(src));
  console.log(name, "→", stat.size, "bytes");
}
