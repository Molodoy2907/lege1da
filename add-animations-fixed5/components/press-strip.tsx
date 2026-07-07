"use client"

import { useI18n } from "@/lib/i18n"

export function PressStrip() {
  const { t } = useI18n()
  const items = t<string[]>("press.items")

  return (
    <section className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t("press.eyebrow")}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {items.map((name) => (
            <li
              key={name}
              className="font-serif text-lg text-foreground/70 transition-colors hover:text-foreground sm:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
