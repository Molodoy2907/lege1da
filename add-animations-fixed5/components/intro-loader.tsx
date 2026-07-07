"use client"

import { useEffect, useState } from "react"
import { RESTAURANT } from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"

const LETTER_STAGGER = 0.045
const LETTER_START = 0.35
const EXIT_AT = 2400
const REMOVE_AT = 3400

export function IntroLoader() {
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Empêche le défilement pendant l'intro
    document.body.style.overflow = "hidden"

    // Compteur de progression 0 → 100 avec accélération douce
    const start = performance.now()
    const duration = EXIT_AT - 300
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      // easeOutCubic pour un compteur naturel
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const finish = window.setTimeout(() => {
      setDone(true)
      // Déclenche les animations du hero au moment où le rideau se lève
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

  if (removed || !mounted) return null

  const words = RESTAURANT.name.split(" ")
  let letterIndex = 0

  return (
    <div className={`intro-loader ${done ? "is-done" : ""}`} aria-hidden="true">
      <div className="intro-inner flex flex-col items-center px-6">
        <p className="intro-word text-[10px] uppercase tracking-[0.45em] text-primary sm:text-xs">
          <span style={{ animationDelay: "0.15s" }}>{t("loader.tagline")}</span>
        </p>

        <h1 className="mt-5 flex flex-wrap justify-center gap-x-[0.35em] font-serif text-4xl text-foreground sm:text-6xl md:text-7xl">
          {words.map((word, wi) => (
            <span key={word + wi} className="whitespace-nowrap">
              {word.split("").map((ch, ci) => {
                const delay = LETTER_START + letterIndex++ * LETTER_STAGGER
                return (
                  <span key={ci} className="intro-letter-mask">
                    <span
                      className="intro-letter"
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {ch}
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </h1>

        <div className="mt-10 flex w-48 flex-col items-center gap-3 sm:w-64">
          <div className="h-px w-full overflow-hidden bg-border">
            <div
              className="intro-progress h-full bg-primary"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="intro-word font-serif text-sm tabular-nums text-muted-foreground">
            <span style={{ animationDelay: "0.5s" }}>{progress}</span>
          </span>
        </div>
      </div>

      {/* Ornement discret en bas */}
      <p className="intro-word absolute bottom-8 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span style={{ animationDelay: "0.8s" }}>MMXXVI</span>
      </p>
    </div>
  )
}
