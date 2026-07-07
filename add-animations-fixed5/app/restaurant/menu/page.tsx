"use client"

import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Reveal } from "@/components/reveal"
import { CARTE, MENU_FORMULES, RESTAURANT, eur } from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"
import { ArrowLeft, Star } from "lucide-react"

export default function MenuPage() {
  const { t, menu, note } = useI18n()
  const formuleLabels = t<{ label: string; detail: string; days: string }[]>("formules")

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
          <Image
            src="/resto/cuisine.jpg"
            alt="La cuisine du Comptoir du Marché"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary sm:text-sm">
              {t("menuPage.eyebrow", { city: RESTAURANT.city })}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-none text-balance sm:text-6xl">{t("menuPage.title")}</h1>
            <p className="mt-4 max-w-md text-sm text-muted-foreground text-pretty">{t("menuPage.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="mb-8 text-center font-serif text-2xl sm:text-3xl">{t("menuPage.formulesTitle")}</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {MENU_FORMULES.map((f, i) => {
              const loc = formuleLabels[i] ?? { label: f.label, detail: f.detail, days: f.days }
              return (
                <Reveal key={f.label} delay={i * 90} variant="up">
                  <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
                    <p className="font-serif text-lg text-card-foreground">{loc.label}</p>
                    <p className="mt-2 text-sm text-muted-foreground text-pretty">{loc.detail}</p>
                    <p className="mt-4 font-serif text-3xl text-primary">{eur(f.price)}</p>
                    <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">{loc.days}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Carte détaillée */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          {CARTE.map((section, si) => (
            <div key={section.id} className={si > 0 ? "mt-16" : ""}>
              <Reveal>
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="font-serif text-3xl text-balance sm:text-4xl">
                    {t(`sections.${section.id}`)}
                  </h2>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                </div>
                {section.note && (
                  <p className="-mt-4 mb-8 text-xs italic text-muted-foreground">{note(section.id, section.note)}</p>
                )}
              </Reveal>
              <ul className="space-y-7">
                {section.items.map((item, i) => {
                  const loc = menu(item.id, { name: item.name, desc: item.desc })
                  return (
                  <Reveal key={item.id} as="li" delay={i * 60} variant="up">
                    <div className="flex items-baseline gap-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 font-serif text-lg text-card-foreground">
                          {loc.name}
                          {item.signature && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                              <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" /> {t("menuPage.signature")}
                            </span>
                          )}
                        </p>
                      </div>
                      <span
                        className="mx-1 h-px flex-1 translate-y-[-2px] border-b border-dotted border-border"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 font-serif text-lg text-primary">{eur(item.price)}</span>
                    </div>
                    <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty">
                      {loc.desc}
                    </p>
                  </Reveal>
                  )
                })}
              </ul>
            </div>
          ))}

          <Reveal>
            <p className="mt-16 text-center text-xs italic text-muted-foreground text-pretty">{t("menuPage.note")}</p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={80}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href="/restaurant#reserver"
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                {t("menuPage.ctaReserve")}
              </Link>
              <Link
                href="/restaurant"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("menuPage.backHome")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
          <p className="font-serif text-2xl">{RESTAURANT.name}</p>
          <p className="text-sm text-muted-foreground">{RESTAURANT.address}</p>
          <p className="text-sm text-muted-foreground">{RESTAURANT.hours}</p>
          <p className="text-sm text-muted-foreground">{RESTAURANT.phone}</p>
        </div>
      </footer>
    </main>
  )
}
