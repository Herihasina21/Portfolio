export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function shouldAnimateOnScroll() {
  if (typeof window === "undefined") {
    return true;
  }

  return !prefersReducedMotion() && window.innerWidth >= 768;
}
