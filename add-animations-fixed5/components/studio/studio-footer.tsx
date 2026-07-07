import Link from "next/link"

const LINKS = [
  { href: "/restaurant", label: "Restaurant" },
  { href: "/garage", label: "Garage" },
  { href: "#prix", label: "Prix" },
  { href: "#faq", label: "FAQ" },
]

export function StudioFooter() {
  return (
    <footer className="relative border-t border-border px-4 py-16 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold uppercase tracking-tight text-foreground">
              Vitrine
            </span>
            <span className="text-lg font-bold uppercase tracking-tight text-primary">Studio</span>
            <span className="mb-px h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sites vitrines premium pour commerces locaux.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Liens du site" className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Explorer
            </p>
            {LINKS.map((l) =>
              l.href.startsWith("#") ? (
                <a key={l.label} href={l.href} className="nav-link w-fit text-sm text-foreground/80">
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="nav-link w-fit text-sm text-foreground/80"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
            <a
              href="mailto:contact@vitrine-studio.eu"
              className="nav-link w-fit text-sm text-foreground/80"
            >
              contact@vitrine-studio.eu
            </a>
            <a
              href="https://wa.me/33780262182?text=Je%20veux%20un%20site%20comme%20la%20d%C3%A9mo"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link w-fit text-sm text-foreground/80"
            >
              WhatsApp · +33 7 80 26 21 82
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Vitrine Studio. Tous droits réservés.</p>
        <p>Ouvert depuis le 05.07.2026 · vitrine-studio.eu</p>
      </div>
    </footer>
  )
}
