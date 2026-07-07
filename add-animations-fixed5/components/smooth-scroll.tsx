"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/**
 * Défilement inertiel (façon shader.se) : momentum fluide, easing soigné.
 * Respecte prefers-reduced-motion et n'interfère pas avec les ancres internes.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    })

    // Expose l'instance pour d'éventuels scroll programmés (ancres)
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let raf = 0
    function loop(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Gère les clics sur les ancres internes (#reserver, #menu...) en défilement fluide
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute("href")
      if (!id || id === "#") return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -80 })
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("click", onClick)
      lenis.destroy()
      ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
    }
  }, [])

  return null
}
