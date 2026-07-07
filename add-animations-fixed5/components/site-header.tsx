"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { RESTAURANT } from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"
import { LangSwitch } from "@/components/lang-switch"

export function SiteHeader() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  const NAV = [
    { href: "/restaurant#reserver", label: t("nav.reserve") },
    { href: "/restaurant/menu", label: t("nav.menu") },
    { href: "/restaurant#fidelite", label: t("nav.loyalty") },
    { href: "/restaurant#offrir", label: t("nav.gift") },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center px-4 py-3">
        {/* left: language switch + nav (desktop) */}
        <div className="col-start-1 flex items-center gap-5 justify-self-start">
          <LangSwitch />
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="nav-link text-sm text-foreground/80">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* center brand */}
        <Link href="/restaurant" className="col-start-2 flex flex-col items-center justify-center text-center">
          <span className="font-serif text-lg leading-none text-foreground md:text-xl">{RESTAURANT.name}</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-accent">Bistrot · {RESTAURANT.city}</span>
        </Link>

        {/* right action */}
        <div className="col-start-3 flex items-center justify-end gap-3">
          <Link
            href="/restaurant/dashboard"
            className="nav-link hidden text-xs text-muted-foreground lg:block"
          >
            {t("nav.ownerSpace")}
          </Link>
          <a
            href="#reserver"
            className="btn-anim rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground"
          >
            {t("nav.book")}
          </a>
        </div>
      </div>
    </header>
  )
}
