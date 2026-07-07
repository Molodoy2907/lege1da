"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, type ReactNode } from "react"

// Rejoue une animation d'entrée à chaque changement de route.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove("page-transition")
    // force reflow pour relancer l'animation
    void el.offsetWidth
    el.classList.add("page-transition")
    // remonte en douceur en haut de page
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div ref={ref} className="page-transition">
      {children}
    </div>
  )
}
