import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { MotionRoot } from "@/components/motion/MotionRoot";
import "./globals.css";

const GA_ID = "G-HYZN0FJ0T4";

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

// Per-locale metadata is set in each route's page.tsx. This layout just
// applies the font variables and the HTML/body chrome.
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
      <head>
        {/* Pre-hydration cover so the hero never flashes before the boot
            intro mounts. BootSequence lifts the class once its own overlay
            is up; the timeout is a failsafe if hydration dies. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var p=location.pathname;var k;if(p==='/'||p==='/en'||p==='/en/')k='zen-booted';else if(p==='/contact'||p==='/contact/')k='zen-booted-contact';else return;if(sessionStorage.getItem(k))return;document.documentElement.classList.add('zen-booting');setTimeout(function(){document.documentElement.classList.remove('zen-booting')},5000);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-offwhite font-sans text-forest antialiased">
        {children}
        <MotionRoot />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
