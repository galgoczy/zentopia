"use client";

import { useEffect, useState } from "react";
import { Z } from "@/lib/tokens";

export default function CVViewer() {
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Pick once on mount — resizing later won't reload the iframe to avoid
    // a jarring "rebundle" mid-read.
    const isMobile = window.innerWidth < 768;
    setSrc(isMobile ? "/cv/mobile.html" : "/cv/desktop.html");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: Z.offwhite,
        overflow: "hidden",
      }}
    >
      {src && (
        <iframe
          src={src}
          title="Galgóczy Gergely — CV"
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            opacity: loaded ? 1 : 0,
            transition: "opacity 240ms ease-out",
          }}
        />
      )}

      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: Z.slate,
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          [ Loading CV… ]
        </div>
      )}

      {/* Back to /gergo */}
      <a
        href="/gergo"
        aria-label="Back to /gergo"
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(6px)",
          color: Z.forest,
          borderRadius: 999,
          border: `1px solid ${Z.hairline}`,
          textDecoration: "none",
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          boxShadow: "0 2px 12px -4px rgba(15,31,26,0.18)",
        }}
      >
        ← /gergo
      </a>

      {/* Download PDF */}
      <a
        href="/cv/galgoczy-gergely-cv.pdf"
        download
        aria-label="Download CV as PDF"
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          background: Z.lime,
          color: Z.forest,
          borderRadius: 999,
          textDecoration: "none",
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.04em",
          boxShadow: "0 2px 12px -4px rgba(15,31,26,0.25)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2v9m0 0l-3-3m3 3l3-3M3 13h10"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        PDF
      </a>
    </div>
  );
}
