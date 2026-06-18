import gsap from 'gsap'
import { prefersReducedMotion } from './motion'

export function animatePillClick(el: HTMLElement) {
  if (prefersReducedMotion()) return

  gsap.fromTo(
    el,
    { scale: 0.92 },
    { scale: 1, duration: 0.35, ease: 'back.out(2.5)' },
  )
}

export function animateGridOut(
  container: HTMLElement,
  selector: string,
  onComplete: () => void,
) {
  if (prefersReducedMotion()) {
    onComplete()
    return
  }

  var items = container.querySelectorAll(selector)
  if (!items.length) {
    onComplete()
    return
  }

  gsap.to(items, {
    opacity: 0,
    scale: 0.82,
    y: -16,
    duration: 0.28,
    stagger: 0.035,
    ease: 'power2.in',
    onComplete: onComplete,
  })
}

export function animateGridIn(container: HTMLElement | null, selector: string) {
  if (!container || prefersReducedMotion()) return

  var items = container.querySelectorAll(selector)
  if (!items.length) return

  gsap.fromTo(
    items,
    { opacity: 0, scale: 0.88, y: 20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.42,
      stagger: 0.05,
      ease: 'power2.out',
    },
  )
}

export function animateCardHover(
  el: HTMLElement,
  entering: boolean,
  lift = -8,
  scale = 1.04,
) {
  if (prefersReducedMotion()) return

  gsap.to(el, {
    y: entering ? lift : 0,
    scale: entering ? scale : 1,
    duration: 0.28,
    ease: 'power2.out',
  })
}
