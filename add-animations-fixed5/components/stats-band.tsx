"use client"

import { useEffect, useRef, useState } from "react"
import { useI18n } from "@/lib/i18n"

type Stat = { value: number; suffix: string; label: string }

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setN(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      // easeOutExpo — démarre vite, ralentit à la fin
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setN(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return n
}

function StatItem({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) return
    const t = window.setTimeout(() => setStarted(true), delay)
    return () => window.clearTimeout(t)
  }, [active, delay])

  const n = useCountUp(stat.value, started)

  return (
    <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
      <p className="font-serif text-4xl text-primary sm:text-5xl">
        {n}
        <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
      </p>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
    </div>
  )
}

/**
 * Bandeau de chiffres clés avec compteurs animés au scroll.
 */
export function StatsBand() {
  const { t } = useI18n()
  const stats = t<Stat[]>("stats.items")
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section aria-label={t("stats.aria")} className="border-t border-border bg-card">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border/60 px-6 py-8 sm:grid-cols-4"
      >
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} active={active} delay={i * 150} />
        ))}
      </div>
    </section>
  )
}
