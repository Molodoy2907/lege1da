"use client"

import { Clock, MapPin, Navigation } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useI18n } from "@/lib/i18n"
import { RESTAURANT } from "@/lib/reservation"

type HourRow = { day: string; value: string; closed?: boolean }
type AccessRow = { label: string; value: string }

export function InfosPratiques() {
  const { t } = useI18n()
  const hours = t<HourRow[]>("infos.hours")
  const access = t<AccessRow[]>("infos.access")
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.address)}`

  return (
    <section id="infos" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("infos.eyebrow")}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl">{t("infos.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">{t("infos.subtitle")}</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Horaires */}
          <Reveal variant="left">
            <div className="h-full rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-serif text-xl">{t("infos.hoursTitle")}</h3>
              </div>
              <ul className="mx-auto mt-6 max-w-sm divide-y divide-border/70">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-sm text-card-foreground">{h.day}</span>
                    <span
                      className={`text-right text-sm ${h.closed ? "uppercase tracking-wide text-muted-foreground" : "text-foreground/90"}`}
                    >
                      {h.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Accès */}
          <Reveal variant="right">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center justify-center gap-2 text-primary">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-serif text-xl">{t("infos.accessTitle")}</h3>
              </div>
              <ul className="mx-auto mt-6 w-full max-w-sm space-y-4">
                {access.map((a) => (
                  <li key={a.label}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary">{a.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90 text-pretty">{a.value}</p>
                  </li>
                ))}
              </ul>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" /> {t("infos.directions")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
