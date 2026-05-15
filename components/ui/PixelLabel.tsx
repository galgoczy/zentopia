import { Z } from "@/lib/tokens";

export function PixelLabel({
  children,
  color = Z.ember,
  size = 11,
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`font-pixel uppercase whitespace-nowrap leading-none zen-pixel-hover inline-block ${className}`}
      style={{
        color,
        fontSize: size,
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </span>
  );
}
