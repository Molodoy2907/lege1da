"use client"

import { useI18n, type Lang } from "@/lib/i18n"

const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
]

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <div
      className={`lang-switch inline-flex items-center rounded-full border border-border bg-background/60 p-0.5 text-xs font-medium ${className}`}
      data-lang={lang}
      role="group"
      aria-label="Language"
    >
      <span className="lang-thumb" aria-hidden="true" />
      {LANGS.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`relative z-10 min-w-9 rounded-full px-2.5 py-1 transition-colors duration-300 ${
              active
                ? l.code === "en"
                  ? "text-background"
                  : "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
