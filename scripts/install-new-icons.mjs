// Resize the user-provided manually-cropped icons down to a 256×256 retina-
// ready canvas (artwork is already centered and tightly cropped — no trim
// needed). Save under canonical names without the _new suffix.
import sharp from "sharp";
import { unlink } from "node:fs/promises";

const MAP = [
  ["icon_content_new.png",     "icon_content.png"],
  ["icon_agents_new.png",      "icon_agents.png"],   // pluralized vs. old "icon_agent.png"
  ["icon_automation_new.png",  "icon_automation.png"],
  ["icon_app_new.png",         "icon_app.png"],
  ["icon_consulting_new.png",  "icon_consulting.png"],
];

const SIZE = 256;

for (const [from, to] of MAP) {
  const src = `public/assets/${from}`;
  const dst = `public/assets/${to}`;
  await sharp(src)
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(dst);
  const stat = await import("node:fs/promises").then((m) => m.stat(dst));
  console.log(to, stat.size, "bytes");
  // Drop the staging _new file once we've successfully written the canonical one
  await unlink(src);
}

// Old singular "icon_agent.png" is replaced by plural "icon_agents.png"
try {
  await unlink("public/assets/icon_agent.png");
  console.log("removed legacy icon_agent.png");
} catch {}
