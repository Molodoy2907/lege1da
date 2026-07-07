"use client"

import { useEffect, useState } from "react"

const LETTER_STAGGER = 0.045
const LETTER_START = 0.12
const COUNT_DURATION = 1200
const EXIT_AT = 1650
const REMOVE_AT = 2650

/**
 * Écran de chargement Vitrine Studio : lettres qui montent une à une,
 * compteur 0 → 100, puis rideau qui se lève. Joué une fois par session.
 */
export function StudioPreloader() {
  const [mounted, setMounted] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      document.documentElement.classList.add("intro-done")
      setSkipped(true)
      return
    }
    setMounted(true)
    document.body.style.overflow = "hidden"

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const finish = window.setTimeout(() => {
      setDone(true)
      document.documentElement.classList.add("intro-done")
    }, EXIT_AT)
    const remove = window.setTimeout(() => {
      setRemoved(true)
      document.body.style.overflow = ""
    }, REMOVE_AT)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(finish)
      window.clearTimeout(remove)
      document.body.style.overflow = ""
    }
  }, [])

  if (skipped || removed || !mounted) return null

  const words = "Vitrine Studio".split(" ")
  let letterIndex = 0

  return (
    <div className={`intro-loader studio ${done ? "is-done" : ""}`} aria-hidden="true">
      <div className="intro-bg-grid" />
      <div className="intro-bg-glow" />
      <div className="intro-inner flex flex-col items-center px-6">
        <p className="intro-word text-[10px] uppercase tracking-[0.45em] text-primary sm:text-xs">
          <span style={{ animationDelay: "0.15s" }}>Studio web indépendant</span>
        </p>

        <h1 className="mt-5 flex flex-wrap justify-center gap-x-[0.3em] text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {words.map((word, wi) => (
            <span key={word + wi} className="whitespace-nowrap">
              {word.split("").map((ch, ci) => {
                const delay = LETTER_START + letterIndex++ * LETTER_STAGGER
                return (
                  <span key={ci} className="intro-letter-mask">
                    <span className="intro-letter" style={{ animationDelay: `${delay}s` }}>
                      {ch}
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </h1>

        <p className="intro-word mt-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs">
          <span style={{ animationDelay: "1.1s" }}>Ouverture 05.07.2026</span>
        </p>

        <div className="mt-10 flex w-52 flex-col items-center gap-3 sm:w-72">
          <div className="flex w-full items-baseline justify-between">
            <span className="intro-word text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span style={{ animationDelay: "0.4s" }}>Chargement</span>
            </span>
            <span className="intro-word text-sm font-semibold tabular-nums text-primary">
              <span style={{ animationDelay: "0.5s" }}>{progress}%</span>
            </span>
          </div>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-border/70">
            <div
              className="intro-progress h-full rounded-full bg-primary"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>

      <p className="intro-word absolute bottom-8 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span style={{ animationDelay: "0.8s" }}>vitrine-studio.eu</span>
      </p>
    </div>
  )
}
