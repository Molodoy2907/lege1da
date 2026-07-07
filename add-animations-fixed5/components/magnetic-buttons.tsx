"use client"

import { useEffect } from "react"

/**
 * Effet "magnétique" global façon shader.se : les boutons/CTA sont légèrement
 * attirés par le curseur au survol, puis reviennent en place avec un ressort.
 * Implémenté par délégation d'événements : aucun composant du site n'est modifié.
 * Désactivé sur tactile et si prefers-reduced-motion.
 */
const MAGNET_SELECTOR = 'a[href], button:not([disabled])'
const MAX_PULL = 5 // px — subtil et élégant
const SCOPE = 32 // rayon d'attraction autour de l'élément

export function MagneticButtons() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let active: HTMLElement | null = null
    let raf = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0

    const eligible = (el: HTMLElement) => {
      // Uniquement les CTA en pilule et boutons — pas les liens de texte du footer/nav
      const cls = el.className
      return typeof cls === "string" && cls.includes("rounded-full")
    }

    const loop = () => {
      if (!active) return
      curX += (targetX - curX) * 0.2
      curY += (targetY - curY) * 0.2
      active.style.translate = `${curX.toFixed(2)}px ${curY.toFixed(2)}px`
      raf = requestAnimationFrame(loop)
    }

    const release = (el: HTMLElement) => {
      cancelAnimationFrame(raf)
      el.style.transition = "translate 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
      el.style.translate = "0px 0px"
      window.setTimeout(() => {
        el.style.transition = ""
        el.style.translate = ""
      }, 480)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(MAGNET_SELECTOR) as HTMLElement | null
      if (!el || el === active || !eligible(el)) return
      if (active) release(active)
      active = el
      curX = 0
      curY = 0
      el.style.transition = ""
      raf = requestAnimationFrame(loop)
    }

    const onMoveWin = (e: MouseEvent) => {
      if (!active) return
      const rect = active.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const inside =
        e.clientX > rect.left - SCOPE &&
        e.clientX < rect.right + SCOPE &&
        e.clientY > rect.top - SCOPE &&
        e.clientY < rect.bottom + SCOPE
      if (!inside) {
        const el = active
        active = null
        release(el)
        return
      }
      targetX = (dx / (rect.width / 2 + SCOPE)) * MAX_PULL
      targetY = (dy / (rect.height / 2 + SCOPE)) * MAX_PULL
    }

    window.addEventListener("mouseover", onOver, { passive: true })
    window.addEventListener("mousemove", onMoveWin, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousemove", onMoveWin)
      if (active) {
        active.style.transition = ""
        active.style.translate = ""
      }
    }
  }, [])

  return null
}
