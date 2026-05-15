// 3x3 or 4x4 pixel clusters used in card corners across the design.

export function PixelCluster({
  color,
  pattern = "3x3",
  cellSize = 4,
  className = "",
}: {
  color: string;
  pattern?: "3x3" | "4x4";
  cellSize?: number;
  className?: string;
}) {
  const grid =
    pattern === "4x4"
      ? [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1]
      : [1, 1, 0, 1, 1, 1, 0, 1, 1];
  const cols = pattern === "4x4" ? 4 : 3;
  const px = pattern === "4x4" ? 5 : cellSize;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${px}px)`,
        gridTemplateRows: `repeat(${cols}, ${px}px)`,
        gap: 1,
        opacity: 0.85,
      }}
    >
      {grid.map((v, i) => (
        <span
          key={i}
          style={{
            width: px,
            height: px,
            background: v ? color : "transparent",
          }}
        />
      ))}
    </div>
  );
}
