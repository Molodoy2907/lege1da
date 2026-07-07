"use client"

import { Mail, ArrowUpRight, Sparkles, Check, ShieldCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { DEMO } from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/**
 * Bloc "Site de démonstration" + VOS coordonnées.
 * Modifiez la config DEMO dans lib/reservation.ts pour mettre vos infos.
 */
export function DemoContact() {
  const { t } = useI18n()
  if (!DEMO.enabled) return null

  return (
    <section id="demo" className="border-t border-border bg-card py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal variant="scale">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t("demoContact.badge")}
          </span>
          <h2 className="mt-5 font-serif text-3xl text-balance sm:text-4xl">{t("demoContact.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
            {t("demoContact.text", { studio: DEMO.studio })}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mx-auto mt-10 max-w-lg">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{t("demoContact.includedTitle")}</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 text-left sm:grid-cols-2">
              {t<string[]>("demoContact.included").map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="mx-auto mt-10 max-w-lg text-left">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-primary">{t("demoContact.compareTitle")}</p>
            <div className="mt-4">
              {t<{ label: string; price: string; oldPrice?: string; highlight?: boolean; note?: string }[]>("demoContact.compareRows").map(
                (row, i, rows) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 py-3 ${i < rows.length - 1 ? "border-b border-border/60" : ""}`}
                  >
                    <span className={`text-sm ${row.highlight ? "font-medium text-primary" : "text-muted-foreground"}`}>
                      {row.label}
                      {row.note && (
                        <span className="ml-2 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                          {row.note}
                        </span>
                      )}
                    </span>
                    <span className="flex items-baseline gap-2">
                      {row.oldPrice && (
                        <span className="font-serif text-base text-muted-foreground line-through">{row.oldPrice}</span>
                      )}
                      <span
                        className={`font-serif ${row.highlight ? "text-2xl font-medium text-primary" : "text-lg text-foreground/85"}`}
                      >
                        {row.price}
                      </span>
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-border bg-background/60 px-6 py-5 text-left">
            <p className="font-serif text-lg text-primary">{t("demoContact.whyCheapTitle")}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85 text-pretty">{t("demoContact.whyCheapText")}</p>
            <p className="mt-3 text-xs text-muted-foreground text-pretty">{t("demoContact.whyCheapNote")}</p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-2.5 rounded-2xl border border-primary/40 bg-primary/10 px-5 py-3.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground text-pretty">{t("demoContact.paymentBanner")}</p>
          </div>

          <div className="mx-auto mt-4 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="card-hover relative rounded-2xl border border-primary/25 bg-background/60 px-6 py-5 text-center">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                {t("demoContact.launchBadge")}
              </span>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t("demoContact.priceSetupLabel")}</p>
              <p className="mt-2 flex items-baseline justify-center gap-2.5">
                <span className="font-serif text-xl text-muted-foreground line-through">{t("demoContact.priceSetupOld")}</span>
                <span className="font-serif text-4xl text-primary">{t("demoContact.priceSetupValue")}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t("demoContact.priceSetupNote")}</p>
            </div>
            <div className="card-hover rounded-2xl border border-border bg-background/60 px-6 py-5 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t("demoContact.priceMonthlyLabel")}</p>
              <p className="mt-2 font-serif text-3xl text-foreground">{t("demoContact.priceMonthlyValue")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("demoContact.priceMonthlyNote")}</p>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground text-pretty">{t("demoContact.priceHint")}</p>
        </Reveal>

        <Reveal delay={95}>
          <div className="mx-auto mt-12 max-w-lg">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-primary">{t("demoContact.stepsTitle")}</p>
            <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {t<{ title: string; text: string }[]>("demoContact.steps").map((step, i) => (
                <li key={step.title} className="flex flex-col items-center gap-2.5 text-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-serif text-base text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground text-balance">{step.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground text-pretty">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-lg text-left">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-primary">{t("demoContact.faqTitle")}</p>
            <div className="mt-4">
              {t<{ q: string; a: string }[]>("demoContact.faq").map((item, i, items) => (
                <details key={item.q} className={`group py-3 ${i < items.length - 1 ? "border-b border-border/60" : ""}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${DEMO.email}?subject=${encodeURIComponent("Je veux un site comme la démo")}`}
              className="btn-anim inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {DEMO.email}
            </a>
            {DEMO.whatsapp && (
              <a
                href={DEMO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-anim inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-medium text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            )}
            {DEMO.link && (
              <a
                href={DEMO.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {DEMO.linkLabel} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{t("demoContact.disclaimer")}</p>
        </Reveal>
      </div>
    </section>
  )
}
