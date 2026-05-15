import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zentopia.io"),
  title: "Zentopia · AI ügynökség, ami működő rendszereket épít",
  description:
    "Egyedi AI megoldások vállalkozásoknak — AI agentek, automatizáció, custom webappok. Hetek alatt, nem hónapok alatt. Magyar AI agency.",
  openGraph: {
    title: "Zentopia · AI ügynökség, ami működő rendszereket épít",
    description:
      "Egyedi AI megoldások vállalkozásoknak — AI agentek, automatizáció, custom webappok. Hetek alatt, nem hónapok alatt.",
    url: "https://zentopia.io",
    siteName: "Zentopia",
    locale: "hu_HU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hu"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${pressStart.variable}`}
    >
      <body className="bg-offwhite font-sans text-forest antialiased">{children}</body>
    </html>
  );
}
