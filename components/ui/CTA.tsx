"use client";

import { Z } from "@/lib/tokens";

type Size = "sm" | "md" | "lg";

// size="md" scales up to "lg" on md: breakpoint to match the original responsive sizes.
const PRIMARY_PAD: Record<Size, string> = {
  sm: "py-3 px-[18px] text-[13px]",
  md: "py-[15px] px-[22px] text-[15px] md:py-[18px] md:px-7 md:text-base",
  lg: "py-[18px] px-7 text-base",
};
const SECONDARY_PAD: Record<Size, string> = {
  sm: "py-2.5 px-4 text-[13px]",
  md: "py-[13px] px-5 text-[15px] md:py-4 md:px-[26px] md:text-base",
  lg: "py-4 px-[26px] text-base",
};

export function CTAPrimary({
  children,
  size = "md",
  dark = false,
  type = "button",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  size?: Size;
  dark?: boolean;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`zen-cta-primary zen-pixel-corners inline-flex items-center gap-2 font-bold leading-none tracking-[-0.01em] ${PRIMARY_PAD[size]} ${className}`}
      style={{
        background: Z.lime,
        color: Z.forest,
        // filter survives the corner clip-path, box-shadow would not
        filter: dark
          ? "drop-shadow(0 8px 24px rgba(200,255,107,0.45))"
          : undefined,
      }}
    >
      {children}
    </button>
  );
}

export function CTASecondary({
  children,
  size = "md",
  dark = false,
  type = "button",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  size?: Size;
  dark?: boolean;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}) {
  const fg = dark ? Z.offwhite : Z.forest;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`zen-cta-secondary inline-flex items-center gap-2 rounded-lg font-bold leading-none tracking-[-0.01em] border-2 bg-transparent ${SECONDARY_PAD[size]} ${className}`}
      style={{ borderColor: fg, color: fg }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = dark
          ? "rgba(250,250,247,0.08)"
          : "rgba(15,31,26,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}
