"use client"

import { useEffect, useState } from "react"
import { CONTACT_EVENT } from "@/components/studio/studio-contact"

const NAV = [
  { href: "#demos", label: "Démos" },
  { href: "#prix", label: "Prix" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
]

export function StudioHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold uppercase tracking-tight text-foreground sm:text-base">
            Vitrine
          </span>
          <span className="text-sm font-bold uppercase tracking-tight text-primary sm:text-base">
            Studio
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link text-sm text-foreground/75">
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(CONTACT_EVENT))}
          className="btn-anim rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground sm:px-5 sm:text-sm"
        >
          Demander mon site
        </button>
      </div>
    </header>
  )
}
