"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"
import { useI18n } from "@/lib/i18n"
import { Plus } from "lucide-react"

type FaqItem = { q: string; a: string }

export function Faq() {
  const { t } = useI18n()
  const items = t<FaqItem[]>("faq.items")
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("faq.eyebrow")}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">
              {t("faq.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">{t("faq.subtitle")}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/40"
                  >
                    <span className="font-serif text-lg text-card-foreground text-pretty">{item.q}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">{item.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
