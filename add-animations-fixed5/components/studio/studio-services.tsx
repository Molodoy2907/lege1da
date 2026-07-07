import { LayoutTemplate, Eye, PhoneCall, Wrench } from "lucide-react"

const SERVICES = [
  {
    icon: LayoutTemplate,
    title: "Sites vitrines premium",
    text: "Sites modernes, rapides et crédibles pour présenter votre activité.",
  },
  {
    icon: Eye,
    title: "Démos sur mesure",
    text: "Nous créons une première version visuelle pour vous montrer le potentiel avant de travailler ensemble.",
  },
  {
    icon: PhoneCall,
    title: "Conversion locale",
    text: "Chaque section pousse le visiteur vers une action simple : appeler, réserver, demander un devis.",
  },
  {
    icon: Wrench,
    title: "Maintenance incluse",
    text: "Hébergement, petites modifications, sécurité et suivi technique.",
  },
]

export function StudioServices() {
  return (
    <section className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">
          Ce que nous faisons
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
          Nous créons des sites qui donnent envie de réserver, appeler et acheter.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="card-hover flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="icon-chip flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-card-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
