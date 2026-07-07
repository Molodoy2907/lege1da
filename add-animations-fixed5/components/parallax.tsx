"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Parallaxe légère pilotée au scroll (rAF throttlé, transform uniquement).
 * `speed` négatif => l'élément monte plus lentement que le scroll (effet profondeur).
 */
export function Parallax({
  children,
  speed = -0.12,
  className = "",
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let ticking = false
    let raf = 0

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // Position relative du centre de l'élément dans le viewport (-1 .. 1)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      const offset = progress * speed * 100
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
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
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}
