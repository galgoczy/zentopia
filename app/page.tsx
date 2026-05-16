import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";
import { hu } from "@/lib/translations/hu";
import { combinedGraph } from "@/lib/structured-data";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Cases } from "@/components/sections/Cases";
import { Founder } from "@/components/sections/Founder";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://zentopia.io"),
  title: hu.meta.title,
  description: hu.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      hu: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: hu.meta.title,
    description: hu.meta.ogDescription,
    url: "/",
    siteName: "Zentopia",
    locale: "hu_HU",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentopia — AI ügynökség, ami működő rendszereket épít",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: hu.meta.title,
    description: hu.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <LangProvider lang="hu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedGraph(hu, "hu")),
        }}
      />
      <main className="bg-offwhite">
        <Nav />
        <Hero />
        <Services />
        <Problem />
        <Process />
        <Cases />
        <Founder />
        <Faq />
        <Cta />
        <Footer />
      </main>
    </LangProvider>
  );
}
