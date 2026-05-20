// Generate a brand-colored QR pointing at /gergo. SVG so it scales cleanly.
// Forest modules on transparent background — pages decide whether to put a
// white plinth behind it for max scanability.
import QRCode from "qrcode";
import { writeFile } from "node:fs/promises";

const URL = "https://zentopia.io/gergo";

const svg = await QRCode.toString(URL, {
  type: "svg",
  errorCorrectionLevel: "H", // high redundancy — survives the brand styling around it
  margin: 1,
  color: {
    dark: "#0F1F1A",
    light: "#00000000", // transparent
  },
});

await writeFile("public/assets/qr-gergo.svg", svg);
console.log("public/assets/qr-gergo.svg written");
