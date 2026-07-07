"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const FAQ = [
  {
    q: "Et si le site ne me plaît pas ?",
    a: "Vous ne payez rien. Le paiement n'a lieu qu'à la livraison d'un site qui vous convient. Nous ajustons jusqu'à ce que ce soit le cas.",
  },
  {
    q: "Que comprennent les 29 €/mois ?",
    a: "L'hébergement rapide et sécurisé, le nom de domaine, les mises à jour techniques et les petites modifications de contenu comme les horaires, le menu, les photos ou les textes.",
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: "Oui, l'abonnement est sans engagement et résiliable à tout moment, sans frais cachés.",
  },
  {
    q: "Est-ce adapté aux petits commerces ?",
    a: "Oui. Le service est pensé pour les restaurants, garages, indépendants, salons, artisans et commerces locaux qui veulent un site propre sans payer une agence chère.",
  },
  {
    q: "Dois-je fournir les textes et les photos ?",
    a: "Si vous avez déjà des photos, nous les utilisons. Sinon, nous pouvons créer une première version avec des visuels adaptés et améliorer ensuite avec vos vrais contenus.",
  },
]

export function StudioFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">FAQ</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Questions fréquentes
        </h2>

        <div className="mt-12 flex flex-col divide-y divide-border border-y border-border">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold text-foreground sm:text-lg">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div className={`faq-panel ${isOpen ? "is-open" : ""}`}>
                  <div>
                    <p className="pb-5 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
