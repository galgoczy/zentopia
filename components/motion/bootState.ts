import { prefersReducedMotion } from "./gsap";

const BOOT_KEY = "zen-booted";

// True while the boot intro is still due this session — other intro
// animations (hero mask lines) wait for it so they aren't spent behind
// the overlay.
export function bootPending(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem(BOOT_KEY) &&
      !prefersReducedMotion()
    );
  } catch {
    return false;
  }
}

export function markBooted() {
  try {
    window.sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* storage unavailable — boot will just replay */
  }
}
