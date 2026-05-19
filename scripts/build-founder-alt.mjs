// Optimize the alt founder portrait to AVIF / WebP / JPEG, same shape as the
// primary founder photo.
import sharp from "sharp";

const SRC = "public/assets/galgoczy-2.png";
const OUT = "public/assets";
const TARGET = 800;

const meta = await sharp(SRC).metadata();
console.log("src", meta.width, "x", meta.height);

await sharp(SRC)
  .resize(TARGET, TARGET, { fit: "cover", position: "center" })
  .avif({ quality: 60, effort: 6 })
  .toFile(`${OUT}/founder-alt.avif`);

await sharp(SRC)
  .resize(TARGET, TARGET, { fit: "cover", position: "center" })
  .webp({ quality: 82 })
  .toFile(`${OUT}/founder-alt.webp`);

await sharp(SRC)
  .resize(TARGET, TARGET, { fit: "cover", position: "center" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/founder-alt.jpg`);

for (const ext of ["avif", "webp", "jpg"]) {
  const s = await import("node:fs/promises").then((m) => m.stat(`${OUT}/founder-alt.${ext}`));
  console.log(`founder-alt.${ext}`, s.size, "bytes");
}
