"use client"

import { useEffect, useRef } from "react"

/**
 * Fine barre de progression de lecture en haut de page, couleur primaire.
 * Animée en scaleX uniquement (aucun reflow), façon studios créatifs.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let ticking = false

    const update = () => {
      ticking = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.transform = `scaleX(${p.toFixed(4)})`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div ref={barRef} aria-hidden="true" className="scroll-progress" />
}
