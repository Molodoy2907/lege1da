
const STEPS = [
  {
    num: "01",
    title: "Vous nous écrivez",
    text: "Parlez-nous de votre établissement en quelques lignes. Réponse sous 24 h.",
  },
  {
    num: "02",
    title: "Nous créons votre site",
    text: "Design sur mesure, textes et photos intégrés. Vous validez chaque étape.",
  },
  {
    num: "03",
    title: "Vous payez à la livraison",
    text: "Votre site est en ligne, il vous plaît, c'est seulement là que vous payez.",
  },
]

export function StudioProcess() {
  return (
    <section id="process" className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">Process</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Comment ça marche
        </h2>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <li
              key={s.num}
              className="card-hover flex flex-col gap-4 rounded-2xl border border-border bg-card p-7"
            >
              <span className="step-num text-4xl font-bold tracking-tight text-primary/70">{s.num}</span>
              <h3 className="text-lg font-semibold text-card-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
