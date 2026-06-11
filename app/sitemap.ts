import type { MetadataRoute } from "next";

const SITE = "https://www.zentopia.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          hu: `${SITE}/`,
          en: `${SITE}/en`,
        },
      },
    },
    {
      url: `${SITE}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          hu: `${SITE}/`,
          en: `${SITE}/en`,
        },
      },
    },
  ];
}
