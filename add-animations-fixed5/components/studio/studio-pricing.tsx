import { Check } from "lucide-react"

const COMPARISON = [
  {
    name: "Agence web",
    price: "1 500 € – 4 000 €",
    note: "Délais longs, forfaits rigides",
    highlight: false,
  },
  {
    name: "Freelance",
    price: "500 € – 1 500 €",
    note: "Qualité et suivi variables",
    highlight: false,
  },
  {
    name: "Vitrine Studio",
    price: "79 €",
    old: "429 €",
    note: "Offre de lancement · paiement à la livraison",
    highlight: true,
  },
]

const WHY_POINTS = [
  "Nous acceptons un nombre limité de projets par mois pour soigner chaque site.",
  "Vous payez uniquement à la livraison de votre site.",
  "0 € d'avance.",
  "Le tarif est bas parce que c'est une offre de lancement, pas parce que le site est bas de gamme.",
]

export function StudioPricing() {
  return (
    <section id="prix" className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">Prix</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
          Combien coûte un site comme celui-ci ?
        </h2>

        {/* Comparaison */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {COMPARISON.map((c) => (
            <div
              key={c.name}
              className={
                c.highlight
                  ? "card-hover relative flex flex-col gap-2 rounded-2xl border-2 border-primary bg-primary p-7 text-primary-foreground shadow-[0_24px_70px_-24px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                  : "card-hover flex flex-col gap-2 rounded-2xl border border-border bg-card p-7"
              }
            >
              {c.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  Recommandé
                </span>
              )}
              <p
                className={`text-sm font-semibold uppercase tracking-wide ${
                  c.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {c.name}
              </p>
              <p className="flex items-baseline gap-2.5">
                {c.old && (
                  <span className="text-lg font-medium text-primary-foreground/60 line-through">
                    {c.old}
                  </span>
                )}
                <span
                  className={`text-3xl font-bold tracking-tight ${
                    c.highlight ? "text-primary-foreground" : "text-card-foreground"
                  }`}
                >
                  {c.price}
                </span>
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  c.highlight ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {c.note}
              </p>
            </div>
          ))}
        </div>

        {/* Pourquoi un prix si bas */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
              Pourquoi un prix si bas ?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              Nous venons de lancer Vitrine Studio. Ce tarif de lancement nous permet de constituer
              nos premières références, de recueillir des avis clients et de construire un
              portfolio solide. Une fois les premières places réservées, le prix repassera à 429 €.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {WHY_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Offre de lancement */}
          <div className="flex flex-col gap-4">
            <div className="card-hover rounded-2xl border border-primary/40 bg-card p-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
                Offre de lancement
              </p>
              <h4 className="mt-3 text-lg font-semibold text-card-foreground">Création du site</h4>
              <p className="mt-2 flex items-baseline gap-3">
                <span className="text-lg text-muted-foreground line-through">429 €</span>
                <span className="text-4xl font-bold tracking-tight text-primary">79 €</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Paiement unique, à la livraison.</p>
            </div>
            <div className="card-hover rounded-2xl border border-border bg-card p-7">
              <h4 className="text-lg font-semibold text-card-foreground">
                Hébergement et maintenance
              </h4>
              <p className="mt-2">
                <span className="text-4xl font-bold tracking-tight text-card-foreground">29 €</span>
                <span className="text-sm text-muted-foreground">/mois</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Sans engagement. Résiliable à tout moment.
              </p>
            </div>
            <p className="rounded-2xl border border-border bg-secondary px-6 py-4 text-sm font-medium leading-relaxed text-foreground text-pretty">
              Moins cher qu&apos;un seul mois de commissions sur une plateforme de réservation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
