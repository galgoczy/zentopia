"use client";

import Image from "next/image";

type Variant = "forest" | "lime" | "white" | "black";

const SRC: Record<Variant, string> = {
  forest: "/assets/logo-forest.png",
  lime: "/assets/logo-lime.png",
  white: "/assets/logo-white.png",
  black: "/assets/logo-black.png",
};

export function Wordmark({
  size = 28,
  iconVariant = "forest",
  color = "#0F1F1A",
  className = "",
}: {
  size?: number;
  iconVariant?: Variant;
  color?: string;
  className?: string;
}) {
  const fontMul = 0.9;
  const gap = 5;
  const fontSize = Math.round(size * fontMul * 100) / 100;

  return (
    <span
      className={`inline-flex items-center transition-transform duration-300 ease-out hover:-translate-y-px ${className}`}
      style={{ gap, color }}
    >
      <Image
        src={SRC[iconVariant]}
        alt="Zentopia"
        width={size}
        height={size}
        priority
        style={{ width: size, height: size, objectFit: "contain", display: "block" }}
      />
      <span
        className="font-sans leading-none tracking-wordmark"
        style={{ fontWeight: 500, fontSize, color }}
      >
        zentopia
      </span>
    </span>
  );
}
