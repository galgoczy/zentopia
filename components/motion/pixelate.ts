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

  const draw = (sharpen: number) => {
    if (!ctx || !offCtx || !img.complete || !img.naturalWidth) return;
    ctx.clearRect(0, 0, size, size);
    if (sharpen >= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, size, size);
      return;
    }
    const res = Math.max(7, Math.round(7 + (size - 7) * Math.pow(sharpen, 1.7)));
    off.width = off.height = res;
    offCtx.clearRect(0, 0, res, res);
    offCtx.drawImage(img, 0, 0, res, res);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, 0, 0, res, res, 0, 0, size, size);
  };

  return { img, draw };
}
