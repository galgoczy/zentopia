// Resize 8-bit pixel-art Problem icons to 256x256 with nearest-neighbor so
// the pixel grid stays crisp at the target render sizes.
import sharp from "sharp";

const ICONS = ["icon_questionmark", "icon_dollarsign", "icon_workwheel"];
const SIZE = 256;

for (const name of ICONS) {
  const src = `public/assets/${name}.png`;
  await sharp(src)
    .resize(SIZE, SIZE, {
      fit: "contain",
      kernel: "nearest",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(src + ".tmp");
  await import("node:fs/promises").then((m) => m.rename(src + ".tmp", src));
  const stat = await import("node:fs/promises").then((m) => m.stat(src));
  console.log(name, stat.size, "bytes");
}
