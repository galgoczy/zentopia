// Canvas pixel-resolve painter, shared by the calibration interlude and
// the hero bonsai entrance: draws `src` quantised to a block resolution
// that follows `sharpen` (0 = coarse 8-bit, 1 = the original image).
export function createPixelPainter(
  canvas: HTMLCanvasElement,
  src: string,
  size: number
) {
  const ctx = canvas.getContext("2d");
  const off = document.createElement("canvas");
  const offCtx = off.getContext("2d");
  const img = new Image();
  img.src = src;

  const blit = (res: number, alpha: number) => {
    if (!ctx || !offCtx) return;
    off.width = off.height = res;
    offCtx.clearRect(0, 0, res, res);
    offCtx.drawImage(img, 0, 0, res, res);
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = alpha;
    ctx.drawImage(off, 0, 0, res, res, 0, 0, size, size);
    ctx.globalAlpha = 1;
  };

  const draw = (sharpen: number) => {
    if (!ctx || !offCtx || !img.complete || !img.naturalWidth) return;
    ctx.clearRect(0, 0, size, size);
    if (sharpen >= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, size, size);
      return;
    }
    // Fractional resolution: blend the two neighbouring pixel grids so the
    // resolve climbs through many small steps instead of hard jumps.
    const rf = 7 + (size - 7) * Math.pow(sharpen, 1.7);
    const r0 = Math.max(7, Math.floor(rf));
    const frac = rf - r0;
    blit(r0, 1);
    if (frac > 0.02 && r0 + 1 <= size) blit(r0 + 1, frac);
  };

  return { img, draw };
}
