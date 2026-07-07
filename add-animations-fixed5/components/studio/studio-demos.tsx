import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, UtensilsCrossed, Wrench } from "lucide-react"

const DEMOS = [
  {
    href: "/restaurant",
    label: "Restaurant",
    tag: "Le Comptoir du Marché",
    desc: "Réservation en ligne, menu élégant, programme de fidélité et mise en avant des plats.",
    features: ["Réservation", "Menu", "Fidélité"],
    icon: UtensilsCrossed,
    image: "/demos/restaurant-preview.png",
  },
  {
    href: "/garage",
    label: "Garage",
    tag: "Garage Meunier",
    desc: "Présentation des services, demande de devis, prise de rendez-vous et avis clients.",
    features: ["Services", "Devis", "Avis clients"],
    icon: Wrench,
    image: "/demos/garage-preview.png",
  },
]

export function StudioDemos() {
  return (
    <section
      id="demos"
      className="relative scroll-mt-24 overflow-hidden border-t border-border px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* Halo pour faire ressortir la section */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Nos sites de démonstration
          </span>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            Voici concrètement ce que nous créons pour vous.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            Deux vrais exemples de sites, conçus par notre studio. Cliquez pour les explorer
            comme le ferait l&apos;un de vos clients.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {DEMOS.map((d) => {
            const Icon = d.icon
            return (
              <Link
                key={d.label}
                href={d.href}
                className="demo-card group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-sm"
              >
                {/* Badge DÉMO bien visible */}
                <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
                  Démo · Notre site
                </span>

                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={d.image || "/placeholder.svg"}
                    alt={`Aperçu du site démo ${d.label} réalisé par Vitrine Studio`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="demo-card-img object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="icon-chip flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-bold text-foreground">{d.label}</span>
                      <span className="text-xs text-muted-foreground">{d.tag}</span>
                    </div>
                    <ArrowUpRight
                      className="demo-card-arrow ml-auto h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-4 text-left text-sm leading-relaxed text-muted-foreground text-pretty">
                    {d.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {d.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-foreground/80"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explorer la démo
                    <ArrowUpRight className="demo-card-arrow h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
