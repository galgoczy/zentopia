// Build public/galgoczy.vcf — vCard 3.0 with an embedded base64 photo.
// The photo is the founder headshot, resized small so the .vcf stays light.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const photo = await sharp("public/assets/founder.jpg")
  .resize(400, 400, { fit: "cover", position: "center" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toBuffer();

const b64 = photo.toString("base64");

// vCard 3.0 line folding: continuation lines begin with a single space,
// fold at 75 octets (RFC 2426). Most parsers accept unfolded too, but fold
// to be safe across iOS / Android / Outlook.
function fold(line) {
  const out = [];
  let first = true;
  let rest = line;
  while (rest.length > (first ? 75 : 74)) {
    const take = first ? 75 : 74;
    out.push((first ? "" : " ") + rest.slice(0, take));
    rest = rest.slice(take);
    first = false;
  }
  out.push((first ? "" : " ") + rest);
  return out.join("\r\n");
}

const lines = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:Galgóczy Gergely",
  "N:Galgóczy;Gergely;;;",
  "ORG:Zentopia",
  "TITLE:Founder · AI strategist",
  "EMAIL;TYPE=INTERNET,PREF:gergo@zentopia.io",
  "TEL;TYPE=CELL,VOICE:+36204680489",
  "URL:https://www.zentopia.io",
  "URL:https://www.zentopia.io/gergo",
  "ADR;TYPE=WORK:;;Budapest;;;;HU",
  fold(`PHOTO;ENCODING=b;TYPE=JPEG:${b64}`),
  "END:VCARD",
];

const vcf = lines.join("\r\n") + "\r\n";
await writeFile("public/galgoczy.vcf", vcf, "utf8");

const bytes = Buffer.byteLength(vcf, "utf8");
console.log(`public/galgoczy.vcf written — ${bytes} bytes (photo ${photo.length} bytes)`);
