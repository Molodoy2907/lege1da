"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Phone, Mail, X, ArrowUpRight } from "lucide-react"

export const CONTACT_EVENT = "vs:open-contact"

const CONTACT = {
  phoneDisplay: "+33 7 80 26 21 82",
  phoneHref: "tel:+33780262182",
  whatsapp:
    "https://wa.me/33780262182?text=" +
    encodeURIComponent("Bonjour, je souhaite un site comme vos démos."),
  email: "contact@vitrine-studio.eu",
  emailHref:
    "mailto:contact@vitrine-studio.eu?subject=" + encodeURIComponent("Demande de site"),
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function ContactButton({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONTACT_EVENT))}
      className={className}
    >
      {children}
    </button>
  )
}

export function StudioContact() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(CONTACT_EVENT, onOpen)
    return () => window.removeEventListener(CONTACT_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div
      className="contact-overlay fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />

      <div className="contact-card relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          Contact
        </span>

        <h2 id="contact-title" className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          Parlons de votre site.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Réponse rapide, sans engagement. Choisissez le moyen le plus simple pour vous.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-primary bg-primary px-4 py-3.5 text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="text-sm font-bold">WhatsApp</span>
              <span className="text-xs opacity-80">Le plus rapide — réponse en direct</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={CONTACT.phoneHref}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-background/50 px-4 py-3.5 text-foreground transition-colors hover:border-primary/50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Phone className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="text-sm font-bold">Téléphone</span>
              <span className="text-xs text-muted-foreground">{CONTACT.phoneDisplay}</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={CONTACT.emailHref}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-background/50 px-4 py-3.5 text-foreground transition-colors hover:border-primary/50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="text-sm font-bold">Email</span>
              <span className="truncate text-xs text-muted-foreground">{CONTACT.email}</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
