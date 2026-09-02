import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_EASE_IN_OUT,
  MOTION_STAGGER,
  prefersReducedMotion,
  shouldAnimateOnScroll,
} from './motion'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  y?: number
  x?: number
  scale?: number
  stagger?: number
  start?: string
  duration?: number
  ease?: string
  delay?: number
}

type TextStaggerOptions = {
  charSelector?: string
  stagger?: number
  y?: number
  duration?: number
  ease?: string
  timeline?: gsap.core.Timeline
  position?: string | number
}

function canAnimateScroll() {
  return shouldAnimateOnScroll() && !prefersReducedMotion()
}

function scrollTriggerConfig(trigger: Element, start?: string) {
  return {
    trigger: trigger,
    start: start ?? 'top 78%',
    toggleActions: 'play none none none',
  }
}

export function revealOnScroll(
  trigger: Element,
  targets: gsap.TweenTarget,
  options?: RevealOptions,
) {
  if (!canAnimateScroll()) return

  gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options?.y ?? 36,
      x: options?.x ?? 0,
      scale: options?.scale ?? 1,
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: options?.duration ?? MOTION_DURATION,
      stagger: options?.stagger ?? MOTION_STAGGER,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? MOTION_EASE,
      scrollTrigger: scrollTriggerConfig(trigger, options?.start),
    },
  )
}

export function revealSectionHeader(
  section: Element,
  headerSelector: string,
  options?: RevealOptions,
) {
  var header = section.querySelector(headerSelector)
  if (!header) return

  revealOnScroll(section, header, {
    y: options?.y ?? 32,
    duration: options?.duration ?? 0.85,
    start: options?.start ?? 'top 80%',
    ease: MOTION_EASE,
  })
}

export function revealSplitColumns(
  container: Element,
  leftSelector: string,
  rightSelector: string,
) {
  if (!canAnimateScroll()) return

  var left = container.querySelectorAll(leftSelector)
  var right = container.querySelector(rightSelector)
  if (!left.length && !right) return

  var tl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig(container, 'top 74%'),
  })

  if (left.length) {
    tl.fromTo(
      left,
      { opacity: 0, x: -40, y: 24 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: MOTION_EASE,
      },
      0,
    )
  }

  if (right) {
    tl.fromTo(
      right,
      { opacity: 0, x: 40, y: 24 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.85,
        ease: MOTION_EASE,
      },
      left.length ? '-=0.55' : 0,
    )
  }
}

export function animateTimelineSection(
  container: Element,
  entrySelector: string,
  lineSelector: string,
) {
  if (!canAnimateScroll()) return

  var entries = container.querySelectorAll(entrySelector)
  var line = container.querySelector(lineSelector)
  var tl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig(container, 'top 76%'),
  })

  if (line) {
    tl.fromTo(
      line,
      { scaleY: 0, opacity: 0.4 },
      { scaleY: 1, opacity: 1, duration: 1.1, ease: MOTION_EASE_IN_OUT },
      0,
    )
  }

  if (entries.length) {
    tl.fromTo(
      entries,
      { opacity: 0, x: 48, y: 16 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: MOTION_EASE,
      },
      line ? 0.15 : 0,
    )
  }
}

export function animateTextStagger(
  element: HTMLElement | null,
  options?: TextStaggerOptions,
) {
  if (!element || prefersReducedMotion()) return

  var chars = element.querySelectorAll(options?.charSelector ?? 'span')
  if (!chars.length) return

  var fromVars = { opacity: 0, y: options?.y ?? 24 }
  var toVars = {
    opacity: 1,
    y: 0,
    duration: options?.duration ?? 0.72,
    stagger: options?.stagger ?? 0.035,
    ease: options?.ease ?? MOTION_EASE,
  }

  if (options?.timeline) {
    options.timeline.fromTo(chars, fromVars, toVars, options.position ?? 0)
    return options.timeline
  }

  return gsap.fromTo(chars, fromVars, toVars)
}

export function animateModalIn(container: HTMLElement) {
  if (prefersReducedMotion()) return

  var image = container.querySelector('.modal-hero')
  var items = container.querySelectorAll('.modal-animate')
  var tl = gsap.timeline({ defaults: { ease: MOTION_EASE } })

  if (image) {
    tl.fromTo(
      image,
      { opacity: 0, scale: 1.08, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.65 },
      0,
    )
  }

  tl.fromTo(
    items,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.58,
      stagger: 0.08,
    },
    image ? 0.14 : 0,
  )

  return tl
}

export function animateCounter(
  element: HTMLElement | null,
  start: number,
  end: number,
  duration: number = 1.8,
) {
  if (!element) return

  if (!canAnimateScroll()) {
    element.textContent = String(end)
    return
  }

  var obj = { value: start }
  gsap.to(obj, {
    value: end,
    duration: duration,
    ease: MOTION_EASE_IN_OUT,
    onUpdate: function () {
      element.textContent = String(Math.round(obj.value))
    },
    scrollTrigger: scrollTriggerConfig(element, 'top 82%'),
  })
}

export function shakeElement(element: HTMLElement | null) {
  if (!element || prefersReducedMotion()) return

  gsap.fromTo(
    element,
    { x: 0 },
    {
      x: 0,
      duration: 0.5,
      ease: MOTION_EASE,
      keyframes: [
        { x: -10, duration: 0.07 },
        { x: 10, duration: 0.07 },
        { x: -6, duration: 0.07 },
        { x: 6, duration: 0.07 },
        { x: 0, duration: 0.07 },
      ],
    },
  )
}

export function animateCardHover(
  el: HTMLElement,
  entering: boolean,
  lift = -8,
  scale = 1.05,
) {
  if (prefersReducedMotion()) return

  gsap.to(el, {
    y: entering ? lift : 0,
    scale: entering ? scale : 1,
    duration: 0.32,
    ease: MOTION_EASE,
  })
}

export function animatePillClick(el: HTMLElement) {
  if (prefersReducedMotion()) return

  gsap.fromTo(
    el,
    { scale: 0.94 },
    { scale: 1, duration: 0.4, ease: 'back.out(2.4)' },
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
    scale: 0.88,
    y: -20,
    duration: 0.34,
    stagger: 0.04,
    ease: 'power3.in',
    onComplete: onComplete,
  })
}

export function animateGridIn(container: HTMLElement | null, selector: string) {
  if (!container || prefersReducedMotion()) return

  var items = container.querySelectorAll(selector)
  if (!items.length) return

  gsap.fromTo(
    items,
    { opacity: 0, scale: 0.9, y: 28 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.06,
      ease: MOTION_EASE,
    },
  )
}

export function startFloatLoop(
  element: HTMLElement | null,
  options?: {
    y?: number
    duration?: number
    delay?: number
    scale?: number
    opacity?: number
  },
) {
  if (!element || prefersReducedMotion()) return

  gsap.to(element, {
    y: options?.y ?? -10,
    scale: options?.scale,
    opacity: options?.opacity,
    duration: options?.duration ?? 3.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: options?.delay ?? 1.2,
  })
}

export function startDriftLoop(
  element: HTMLElement | null,
  options?: { x?: number; y?: number; duration?: number; delay?: number },
) {
  if (!element || prefersReducedMotion()) return

  gsap.to(element, {
    x: options?.x ?? 16,
    y: options?.y ?? -12,
    duration: options?.duration ?? 7.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: options?.delay ?? 0,
  })
}

export function staggerListItems(container: HTMLElement | null) {
  if (!container) return
  revealOnScroll(container, container.querySelectorAll('li, > *'), {
    y: 24,
    stagger: 0.1,
    start: 'top 80%',
  })
}

export function fadeInOnScroll(elements: NodeListOf<Element> | Element[]) {
  elements.forEach(function (element) {
    revealOnScroll(element, element, { y: 30, start: 'top 82%' })
  })
}

export function setupHoverAnimation(selector: string) {
  if (prefersReducedMotion()) return

  var elements = document.querySelectorAll(selector)
  elements.forEach(function (element) {
    element.addEventListener('mouseenter', function () {
      animateCardHover(element as HTMLElement, true, -5, 1.03)
    })
    element.addEventListener('mouseleave', function () {
      animateCardHover(element as HTMLElement, false)
    })
  })
}

export function setupSmoothScroll() {
  var links = document.querySelectorAll('a[href^="#"]')

  var handleClick = function (e: Event) {
    var link = e.currentTarget as HTMLAnchorElement
    var href = link.getAttribute('href')
    if (!href || href === '#') return

    var target = document.querySelector(href)
    if (!target) return

    e.preventDefault()

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  links.forEach(function (link) {
    link.addEventListener('click', handleClick)
  })

  return function () {
    links.forEach(function (link) {
      link.removeEventListener('click', handleClick)
    })
  }
}

export function setupParallax(element: HTMLElement | null) {
  if (!element || !canAnimateScroll()) return

  gsap.to(element, {
    y: function () {
      return -window.innerHeight * 0.22
    },
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      scrub: 0.6,
    },
  })
}
