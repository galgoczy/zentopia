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

export default function HomePage() {
  return (
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
  );
}
