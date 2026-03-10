import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Text stagger animation
export const animateTextStagger = (element: HTMLElement | null) => {
  if (!element) return
  
  const chars = element.querySelectorAll('span')
  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.out',
    }
  )
}

// Fade in on scroll animation
export const fadeInOnScroll = (elements: NodeListOf<Element> | Element[]) => {
  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element as HTMLElement,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          markers: false,
        },
      }
    )
  })
}

// Hover animation for buttons/cards
export const setupHoverAnimation = (selector: string) => {
  const elements = document.querySelectorAll(selector)
  
  elements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })
}

// Setup smooth scroll
export const setupSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]')
  
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const href = link.getAttribute('href')
      if (!href) return
      
      const target = document.querySelector(href)
      if (!target) return
      
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: 'power2.inOut',
      })
    })
  })
}

// Stagger in list items
export const staggerListItems = (container: HTMLElement | null) => {
  if (!container) return
  
  const items = container.querySelectorAll('li, > *')
  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    }
  )
}

// Parallax effect
export const setupParallax = (element: HTMLElement | null) => {
  if (!element) return
  
  gsap.to(element, {
    y: () => -window.innerHeight * 0.3,
    scrollTrigger: {
      trigger: element,
      scrub: 0.5,
      markers: false,
    },
  })
}

// Counter animation
export const animateCounter = (
  element: HTMLElement | null,
  start: number,
  end: number,
  duration: number = 2
) => {
  if (!element) return
  
  const obj = { value: start }
  gsap.to(obj, {
    value: end,
    duration,
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString()
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
  })
}
