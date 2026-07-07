"use client"

import { useEffect } from "react"

/**
 * Animateur de scroll global "façon shader.se".
 * Anime automatiquement titres, textes, images, boutons et cartes à l'entrée
 * dans le viewport — et rejoue l'animation à chaque passage (montée/descente).
 *
 * Utilise la Web Animations API : aucune classe ni style inline n'est modifié,
 * donc totalement compatible avec les re-rendus React (i18n, navigation).
 * Fonctionne sur mobile et desktop ; respecte prefers-reduced-motion.
 */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

type Preset = {
  keyframes: Keyframe[]
  duration: number
}

const PRESETS: Record<string, Preset> = {
  heading: {
    keyframes: [
      { opacity: 0, transform: "translateY(30px)", filter: "blur(10px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
    ],
    duration: 950,
  },
  text: {
    keyframes: [
      { opacity: 0, transform: "translateY(18px)", filter: "blur(4px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
    ],
    duration: 750,
  },
  media: {
    keyframes: [
      { opacity: 0, transform: "scale(1.05)", filter: "blur(6px)" },
      { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
    ],
    duration: 1100,
  },
  item: {
    keyframes: [
      { opacity: 0, transform: "translateY(14px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    duration: 600,
  },
}

function presetFor(el: Element): keyof typeof PRESETS {
  const tag = el.tagName
  if (tag === "H1" || tag === "H2" || tag === "H3" || tag === "H4") return "heading"
  if (tag === "IMG" || tag === "PICTURE" || tag === "FIGURE" || tag === "SVG") return "media"
  if (tag === "P" || tag === "BLOCKQUOTE") return "text"
  return "item"
}

const SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main p",
  "main li",
  "main blockquote",
  "main img",
  "main figure",
  'main a[class*="rounded-full"]',
  "main button",
  "main table",
  "main input",
  "main select",
  "main textarea",
].join(",")

function shouldSkip(el: Element): boolean {
  // Déjà animé par une animation CSS existante du site (hero, etc.)
  for (const c of Array.from(el.classList)) {
    if (c.startsWith("animate-")) return true
  }
  // Titres gérés par MaskText (mots masqués) : ne pas doubler
  if (el.querySelector(":scope > span > .mask-text, :scope > .mask-text")) return true
  if (el.closest(".mask-text")) return true
  // Éléments animés manuellement (titres "decay" du site studio, etc.)
  if (el.closest("[data-anim-skip]")) return true
  // Éléments d'interface fixes / superpositions
  if (el.closest("header, nav, [role='dialog'], .film-grain, .scroll-progress")) return true
  return false
}

export function ScrollAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!("animate" in Element.prototype)) return

    const animations = new WeakMap<Element, Animation>()
    const seen = new WeakSet<Element>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const anim = animations.get(entry.target)
          if (!anim) continue
          if (entry.isIntersecting) {
            if (anim.playState !== "running" && anim.playState !== "finished") {
              anim.play()
            }
          } else {
            // Hors écran : on remet à zéro pour rejouer au prochain passage
            anim.currentTime = 0
            anim.pause()
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -4% 0px" },
    )

    const bind = () => {
      const els = document.querySelectorAll(SELECTOR)
      // Décalage en cascade par parent commun
      const parentCounter = new Map<Element, number>()
      els.forEach((el) => {
        if (seen.has(el) || shouldSkip(el)) return
        seen.add(el)

        const parent = el.parentElement ?? document.body
        const idx = parentCounter.get(parent) ?? 0
        parentCounter.set(parent, idx + 1)
        const delay = Math.min(idx * 80, 400)

        const preset = PRESETS[presetFor(el)]
        const anim = el.animate(preset.keyframes, {
          duration: preset.duration,
          delay,
          easing: EASE,
          fill: "both",
        })
        anim.pause()
        anim.currentTime = 0
        animations.set(el, anim)
        io.observe(el)
      })
    }

    bind()

    // Re-scanne après navigation client / changement de langue / contenu dynamique
    let rafId = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(bind)
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
