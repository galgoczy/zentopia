import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#FAFAF7",
        forest: "#0F1F1A",
        "forest-deep": "#081310",
        lime: "#C8FF6B",
        slate: "#5A6F66",
        hairline: "#E8E4D8",
        // punchier palette (the chosen default)
        ember: "#F08947",
        sky: "#5B92FF",
        violet: "#A289FF",
        coral: "#FF6F8C",
        sunshine: "#FFC83A",
      },
      fontFamily: {
        sans: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        pixel: ['var(--font-pixel)', 'system-ui', 'monospace'],
      },
      letterSpacing: {
        wordmark: "-0.035em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "underline-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-1.5deg)" },
          "75%": { transform: "rotate(1.5deg)" },
        },
        "arrow-nudge": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
        "energy-dot": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(200,255,107,0.55)" },
          "50%": { transform: "scale(1.15)", boxShadow: "0 0 0 6px rgba(200,255,107,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 600ms ease-out both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "ticker": "ticker 38s linear infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "cursor-blink": "cursor-blink 1s steps(2) infinite",
        "wiggle": "wiggle 700ms ease-in-out",
        "arrow-nudge": "arrow-nudge 1.4s ease-in-out infinite",
        "energy-dot": "energy-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
