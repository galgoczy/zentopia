import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";
import { en } from "@/lib/translations/en";
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
  },
};

export default function HomePageEN() {
  return (
    <LangProvider lang="en">
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
