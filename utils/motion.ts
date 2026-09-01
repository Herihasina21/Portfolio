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

export var MOTION_EASE = "power3.out";
export var MOTION_EASE_IN_OUT = "power3.inOut";
export var MOTION_DURATION = 0.75;
export var MOTION_STAGGER = 0.08;
