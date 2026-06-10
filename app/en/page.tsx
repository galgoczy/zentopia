import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";
import { en } from "@/lib/translations/en";
import { combinedGraph } from "@/lib/structured-data";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ZenMarquee } from "@/components/motion/ZenMarquee";
import { CalibrationWipe } from "@/components/motion/CalibrationWipe";
import { BootSequence } from "@/components/motion/BootSequence";
import { GiantWordmark } from "@/components/motion/GiantWordmark";
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
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    canonical: "/en",
    languages: {
      hu: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: en.meta.title,
    description: en.meta.ogDescription,
    url: "/en",
    siteName: "Zentopia",
    locale: "en_US",
    alternateLocale: ["hu_HU"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentopia — AI agency that builds working systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default function HomePageEN() {
  return (
    <LangProvider lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedGraph(en, "en")),
        }}
      />
      <main className="bg-offwhite">
        <BootSequence />
        <Nav />
        <Hero />
        <ZenMarquee />
        <Services />
        <Problem />
        <CalibrationWipe />
        <Process />
        <Cases />
        <Founder />
        <Faq />
        <GiantWordmark />
        <Cta />
        <Footer />
      </main>
    </LangProvider>
  );
}
