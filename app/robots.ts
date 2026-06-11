import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.zentopia.io/sitemap.xml",
    host: "https://www.zentopia.io",
  };
}
