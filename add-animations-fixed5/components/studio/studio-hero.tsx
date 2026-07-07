import { ContactButton } from "@/components/studio/studio-contact"

export function StudioHero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      {/* Fond : quadrillage + halo */}
      <div className="studio-grid-bg" aria-hidden="true" />
      <div
        className="studio-glow left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Titre principal */}
        <p
          className="animate-hero text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs"
          style={{ animationDelay: "300ms" }}
        >
          Studio web indépendant · Ouvert depuis le 05.07.2026
        </p>
        <h1
          className="animate-hero mt-4 text-5xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground text-balance sm:text-7xl md:text-8xl"
          style={{ animationDelay: "420ms" }}
        >
          Vitrine <span className="text-shimmer">Studio</span>
        </h1>
        <p
          className="animate-hero mt-6 max-w-2xl text-lg font-medium text-foreground/90 text-balance sm:text-xl"
          style={{ animationDelay: "560ms" }}
        >
          Sites vitrines premium pour restaurants, garages, indépendants et commerces locaux.
        </p>
        <p
          className="animate-hero mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base"
          style={{ animationDelay: "680ms" }}
        >
          Nous créons des sites rapides, élégants et pensés pour convertir les visiteurs en
          clients. Design sur mesure, version mobile parfaite, hébergement, maintenance et
          accompagnement inclus.
        </p>

        <div
          className="animate-hero mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "800ms" }}
        >
          <a
            href="#demos"
            className="btn-anim rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
          >
            Voir nos démos
          </a>
          <ContactButton className="btn-anim rounded-full border border-border bg-card/60 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-primary/50">
            Demander mon site
          </ContactButton>
        </div>
      </div>

      {/* Indice de scroll */}
      <div
        className="animate-hero absolute bottom-7 left-1/2 -translate-x-1/2"
        style={{ animationDelay: "1100ms" }}
        aria-hidden="true"
      >
        <div className="scroll-hint text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Défiler
        </div>
      </div>
    </section>
  )
}
