"use client"

import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { Parallax } from "@/components/parallax"
import { useI18n } from "@/lib/i18n"

/**
 * Section chef en pleine largeur (full-bleed).
 * Casse volontairement le rythme centré du reste de la page :
 * texte aligné à gauche, photo plein écran.
 */
export function ChefStory() {
  const { t } = useI18n()

  return (
    <>
      {/* Chef — full bleed, left-aligned */}
      <section id="chef" className="relative border-t border-border">
        <div className="relative min-h-[560px] w-full overflow-hidden md:min-h-[640px]">
          <Parallax speed={-0.12} className="absolute inset-0">
            <Image
              src="/resto/chef.png"
              alt="Antoine Mercier, chef du Comptoir du Marché, dans sa cuisine"
              fill
              sizes="100vw"
              className="scale-110 object-cover object-[70%_center]"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
          <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-center px-6 py-20 md:min-h-[640px]">
            <div className="max-w-xl">
              <Reveal variant="left">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("chef.eyebrow")}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">
                  {t("chef.title")}
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground text-pretty">{t("chef.text1")}</p>
                <blockquote className="mt-6 border-l-2 border-primary pl-5 font-serif text-xl leading-relaxed text-foreground/90 text-pretty">
                  {t("chef.text2")}
                </blockquote>
                <p className="mt-6 font-serif text-lg">{t("chef.name")}</p>
                <p className="text-sm uppercase tracking-[0.2em] text-primary">{t("chef.role")}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
