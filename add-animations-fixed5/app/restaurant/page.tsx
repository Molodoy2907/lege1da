"use client"

import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { ReservationWidget } from "@/components/reservation-widget"
import { GiftCard } from "@/components/gift-card"
import { Reveal } from "@/components/reveal"
import { MaskText } from "@/components/mask-text"
import { Parallax } from "@/components/parallax"
import { ChefStory } from "@/components/chef-story"
import { StatsBand } from "@/components/stats-band"
import { DemoContact } from "@/components/demo-contact"
import { Faq } from "@/components/faq"
import { RESTAURANT, CARTE, LOYALTY_THRESHOLD, LOYALTY_REWARD, eur } from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"
import { Clock, Ban, TrendingUp, Sparkles, Wine, Utensils, ArrowRight, Gift, MapPin, ShieldCheck } from "lucide-react"

const EXP_ICONS = [Utensils, Wine, Sparkles]
const ADV_ICONS = [Ban, Clock, TrendingUp]

// Trois plats signatures pour le teaser de la carte
const signatures = CARTE.flatMap((s) => s.items.filter((i) => i.signature)).slice(0, 3)

export default function Page() {
  const { t } = useI18n()
  const experience = t<{ title: string; text: string }[]>("experience.items")
  const advantages = t<{ title: string; text: string }[]>("owner.advantages")
  const giftBullets = t<string[]>("gift.bullets")
  const privatBullets = t<string[]>("privat.bullets")

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[86vh] min-h-[600px] w-full overflow-hidden">
          <Parallax speed={-0.18} className="absolute inset-0">
            <Image
              src="/resto/hero.png"
              alt="Salle du restaurant Le Comptoir du Marché"
              fill
              priority
              sizes="100vw"
              className="animate-slow-zoom scale-110 object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-28 pb-12 text-center">
            <p className="animate-hero text-xs uppercase tracking-[0.35em] text-primary sm:text-sm">
              {RESTAURANT.type} · {RESTAURANT.city}
            </p>
            <MaskText
              as="h1"
              text={RESTAURANT.name}
              wordDelay={90}
              start={150}
              className="hero-mask mt-4 font-serif text-5xl leading-[1.05] text-balance sm:text-6xl md:text-7xl"
            />
            <p
              className="animate-hero mt-5 max-w-xl text-base text-foreground/95 text-pretty [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-lg"
              style={{ animationDelay: "350ms" }}
            >
              {t("hero.tagline")}
            </p>
            <div
              className="animate-hero mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "500ms" }}
            >
              <Link
                href="#reserver"
                className="btn-anim rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
              >
                {t("hero.ctaReserve")}
              </Link>
              <Link
                href="/restaurant/menu"
                className="btn-anim rounded-full border border-primary/70 bg-background/40 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-md hover:bg-background/70"
              >
                {t("hero.ctaMenu")}
              </Link>
            </div>

            {/* Facts strip */}
            <div
              className="animate-hero mt-8 grid w-full max-w-md grid-cols-2 gap-2.5"
              style={{ animationDelay: "650ms" }}
            >
              {[
                { icon: Clock, label: t("hero.factHoursLabel"), value: RESTAURANT.hours, span: "" },
                { icon: MapPin, label: t("hero.factLocationLabel"), value: RESTAURANT.address, span: "" },
                {
                  icon: ShieldCheck,
                  label: t("hero.factBookingLabel"),
                  value: t("hero.factBookingValue"),
                  span: "col-span-2",
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className={`card-hover flex h-full flex-col items-center justify-center gap-1 rounded-xl border border-border/60 bg-background/40 px-3 py-3 text-center backdrop-blur-md ${f.span}`}
                >
                  <div className="flex items-center gap-1.5">
                    <f.icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <p className="text-[9px] uppercase tracking-[0.18em] text-primary">{f.label}</p>
                  </div>
                  <p className="text-xs leading-tight text-foreground/90 text-pretty">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section id="reserver" className="mx-auto max-w-2xl px-6 py-20">
        <Reveal>
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("reserve.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl text-balance sm:text-4xl">{t("reserve.title")}</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground text-pretty">{t("reserve.subtitle")}</p>
          </div>
        </Reveal>
        <Reveal delay={120} variant="scale">
          <ReservationWidget />
        </Reveal>
      </section>

      {/* L'expérience */}
      <section id="experience" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("experience.eyebrow")}</p>
              <MaskText
                as="h2"
                text={t("experience.title")}
                className="mt-3 block font-serif text-3xl leading-tight text-balance sm:text-4xl md:text-5xl"
              />
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
                {t("experience.intro", { name: RESTAURANT.name })}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {experience.map((e, i) => {
              const Icon = EXP_ICONS[i]
              return (
                <Reveal key={e.title} delay={i * 90} variant="up" className="h-full">
                  <div className="card-hover flex h-full flex-col items-center bg-card p-8 text-center">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-serif text-4xl text-primary/40">{`0${i + 1}`}</span>
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mt-8 font-serif text-2xl">{e.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{e.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* La carte (teaser) */}
      <section id="carte" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal variant="left">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("carte.eyebrow")}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl">{t("carte.title")}</h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">{t("carte.subtitle")}</p>
                <ul className="mx-auto mt-8 max-w-sm space-y-5">
                  {signatures.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3">
                      <span className="font-serif text-lg text-card-foreground">{item.name}</span>
                      <span className="mx-1 h-px flex-1 border-b border-dotted border-border" aria-hidden="true" />
                      <span className="shrink-0 font-serif text-lg text-primary">{eur(item.price)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/restaurant/menu"
                  className="btn-anim mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
                >
                  {t("carte.cta")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal variant="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
                <Parallax speed={-0.12} className="absolute inset-0">
                  <Image
                    src="/resto/service.jpg"
                    alt="Dressage d'un plat au Comptoir du Marché"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="scale-110 object-cover"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Le chef — La maison */}
      <ChefStory />

      {/* Chiffres clés */}
      <StatsBand />

      {/* Fidélité */}
      <section id="fidelite" className="border-t border-border bg-card py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal variant="scale">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-primary">{t("loyalty.eyebrow")}</p>
            <h2 className="mt-3 font-serif text-3xl text-balance sm:text-4xl">
              {t("loyalty.title", { n: LOYALTY_THRESHOLD, reward: eur(LOYALTY_REWARD) })}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
              {t("loyalty.subtitle", { n: LOYALTY_THRESHOLD, reward: eur(LOYALTY_REWARD) })}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex items-center justify-center gap-3">
              {Array.from({ length: LOYALTY_THRESHOLD }).map((_, i) => {
                const last = i === LOYALTY_THRESHOLD - 1
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border text-sm font-medium ${
                        last
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {last ? <Gift className="h-5 w-5" aria-hidden="true" /> : `${i + 1}`}
                    </div>
                    {!last && <span className="h-px w-6 bg-border" aria-hidden="true" />}
                  </div>
                )
              })}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t("loyalty.caption")}</p>
          </Reveal>
        </div>
      </section>

      {/* Offrir un bon cadeau */}
      <section id="offrir" className="border-t border-border py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <Reveal variant="left">
            <div className="text-center">
              <p className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-primary">
                <Gift className="h-4 w-4" aria-hidden="true" /> {t("gift.eyebrow")}
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl">{t("gift.title")}</h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">{t("gift.text")}</p>
              <ul className="mx-auto mt-6 inline-block space-y-3 text-left text-sm">
                {giftBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="right">
            <GiftCard />
          </Reveal>
        </div>
      </section>

      {/* Privatisation */}
      <section id="privatisation" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal variant="left">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("privat.eyebrow")}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-balance sm:text-4xl">{t("privat.title")}</h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">{t("privat.text")}</p>
                <ul className="mx-auto mt-6 inline-block space-y-3 text-left text-sm">
                  {privatBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:contact@lecomptoirdumarche.fr?subject=${encodeURIComponent(t("privat.mailSubject"))}`}
                  className="btn-anim mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
                >
                  {t("privat.cta")}
                </a>
              </div>
            </Reveal>
            <Reveal variant="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
                <Parallax speed={-0.12} className="absolute inset-0">
                  <Image
                    src="/resto/soir.jpg"
                    alt="Ambiance du soir pour un événement privé"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="scale-110 object-cover"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq />

      {/* Pitch propriétaire */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">{t("owner.eyebrow")}</p>
              <h2 className="mt-2 font-serif text-3xl text-balance sm:text-4xl">{t("owner.title")}</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">{t("owner.subtitle")}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {advantages.map((a, i) => {
              const Icon = ADV_ICONS[i]
              return (
                <Reveal key={a.title} delay={i * 90} variant="up">
                  <div className="card-hover flex h-full flex-col items-center rounded-2xl border border-border bg-background p-6 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{a.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <Link
                href="/restaurant/dashboard"
                className="btn-anim inline-flex rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
              >
                {t("owner.cta")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Démo — vos coordonnées */}
      <DemoContact />

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
          <p className="font-serif text-2xl">{RESTAURANT.name}</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <Link href="/restaurant/menu" className="nav-link">
              {t("footer.menu")}
            </Link>
            <Link href="#reserver" className="nav-link">
              {t("footer.reserve")}
            </Link>
            <Link href="#faq" className="nav-link">
              {t("footer.faq")}
            </Link>
            <Link href="#offrir" className="nav-link">
              {t("footer.gift")}
            </Link>
            <Link href="#privatisation" className="nav-link">
              {t("footer.privat")}
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">{RESTAURANT.address}</p>
          <p className="text-sm text-muted-foreground">{RESTAURANT.hours}</p>
          <p className="text-sm text-muted-foreground">{RESTAURANT.phone}</p>
        </div>
      </footer>
    </main>
  )
}
