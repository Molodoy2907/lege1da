"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Users,
  CalendarDays,
  Clock,
  Check,
  BadgePercent,
  Minus,
  Plus,
  UtensilsCrossed,
  Store,
  ArrowLeft,
  User,
  X,
  Bell,
  CreditCard,
  Sparkles,
  ShieldCheck,
} from "lucide-react"
import {
  buildServices,
  loadDiscounts,
  PARTY_SIZES,
  MAX_PARTY,
  frenchDates,
  eur,
  eur2,
  PREORDER_MENU,
  PREORDER_CATEGORIES,
  CARTE,
  GROUP_DEPOSIT_PER_COVER,
  LARGE_GROUP_THRESHOLD,
  RESTAURANT,
  recordVisit,
  getVisitCount,
  loyaltyRewardForVisit,
  LOYALTY_THRESHOLD,
  LOYALTY_REWARD,
  saveWaitlistEntry,
  type Slot,
  type DiscountMap,
} from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"

type Step =
  | "party"
  | "party-large"
  | "date"
  | "time"
  | "preorder"
  | "menu"
  | "contact"
  | "deposit"
  | "done"
  | "cancelled"
  | "waitlist"
  | "waitlist-done"
type Mode = "sur-place" | "none"

export function ReservationWidget() {
  const { t, menu } = useI18n()
  const catLabelToId = Object.fromEntries(CARTE.map((s) => [s.label, s.id]))
  const dates = useMemo(() => frenchDates(7), [])
  const [discounts, setDiscounts] = useState<DiscountMap>({})
  const [step, setStep] = useState<Step>("party")
  const [party, setParty] = useState<number | null>(null)
  const [dateIso, setDateIso] = useState<string | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)
  const [mode, setMode] = useState<Mode | null>(null)
  const [qty, setQty] = useState<Record<string, number>>({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [depositPaid, setDepositPaid] = useState(false)
  const [visitNumber, setVisitNumber] = useState(0)
  // Liste d'attente (créneau complet)
  const [waitSlot, setWaitSlot] = useState<Slot | null>(null)
  const [waitName, setWaitName] = useState("")
  const [waitPhone, setWaitPhone] = useState("")

  // Charge la grille de réductions configurée par le restaurateur
  useEffect(() => {
    setDiscounts(loadDiscounts())
  }, [])

  const services = useMemo(() => buildServices(discounts), [discounts])
  const selectedDate = dates.find((d) => d.iso === dateIso)
  const isLargeGroup = (party ?? 0) >= LARGE_GROUP_THRESHOLD

  function reset() {
    setStep("party")
    setParty(null)
    setDateIso(null)
    setSlot(null)
    setMode(null)
    setQty({})
    setFirstName("")
    setLastName("")
    setPhone("")
    setEmail("")
    setDepositPaid(false)
    setVisitNumber(0)
    setWaitSlot(null)
    setWaitName("")
    setWaitPhone("")
  }

  function setQ(id: string, delta: number) {
    setQty((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta)
      const copy = { ...prev }
      if (next === 0) delete copy[id]
      else copy[id] = next
      return copy
    })
  }

  const preorderTotal = PREORDER_MENU.reduce((s, i) => s + (qty[i.id] || 0) * i.price, 0)
  const discountPct = slot?.promo ?? 0
  const preorderDiscount = discountPct && preorderTotal ? Math.round(preorderTotal * (discountPct / 100)) : 0
  const deposit = isLargeGroup ? (party ?? 0) * GROUP_DEPOSIT_PER_COVER : 0
  const preorderCount = Object.values(qty).reduce((s, n) => s + n, 0)
  const contactValid =
    firstName.trim().length > 1 && lastName.trim().length > 1 && (phone.trim().length > 5 || email.includes("@"))
  const loyaltyReward = loyaltyRewardForVisit(visitNumber)
  // Aperçu de fidélité en direct pendant la saisie du téléphone
  const upcomingVisit = phone.trim().length > 5 ? getVisitCount(phone) + 1 : 0

  const stepIndex = ["party", "date", "time", "preorder", "contact"].indexOf(
    step === "party-large" ? "party" : step === "menu" ? "preorder" : step === "deposit" ? "contact" : step,
  )

  // Enregistre la visite (fidélité) puis affiche la confirmation
  function goToDone() {
    setVisitNumber(recordVisit(phone))
    setStep("done")
  }

  function submitContact() {
    if (isLargeGroup) setStep("deposit")
    else goToDone()
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="font-serif text-lg text-card-foreground">{t("widget.title")}</p>
          <p className="text-xs text-muted-foreground">
            {RESTAURANT.name} · {RESTAURANT.city}
          </p>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {t("widget.badge")}
        </span>
      </div>

      {/* Progress */}
      {!["done", "cancelled", "waitlist", "waitlist-done"].includes(step) && (
        <div className="flex gap-1.5 px-5 pt-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= stepIndex ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      )}

      <div className="p-5">
        {/* Step 1: party size */}
        {step === "party" && (
          <div className="animate-fade-up">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <Users className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.party.title")}
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {PARTY_SIZES.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    if (n === 6) {
                      setParty(6)
                      setStep("party-large")
                    } else {
                      setParty(n)
                      setStep("date")
                    }
                  }}
                  className="flex h-14 items-center justify-center rounded-xl border border-border bg-background text-lg font-medium text-foreground transition-all hover:border-accent hover:bg-secondary active:scale-95"
                >
                  {n === 6 ? "6+" : n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1b: large group exact count */}
        {step === "party-large" && (
          <div className="animate-fade-up">
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <Users className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.partyLarge.title")}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">{t("widget.partyLarge.sub")}</p>
            <div className="flex items-center justify-center gap-6 rounded-2xl border border-border bg-background py-6">
              <button
                onClick={() => setParty((p) => Math.max(LARGE_GROUP_THRESHOLD, (p ?? 6) - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent active:scale-95"
                aria-label={t("widget.partyLarge.less")}
              >
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="min-w-16 text-center font-serif text-4xl text-card-foreground">{party}</span>
              <button
                onClick={() => setParty((p) => Math.min(MAX_PARTY, (p ?? 6) + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent active:scale-95"
                aria-label={t("widget.partyLarge.more")}
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/70 p-3 text-xs text-secondary-foreground">
              <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {t("widget.partyLarge.depositHint", {
                  per: eur(GROUP_DEPOSIT_PER_COVER),
                  total: eur((party ?? 6) * GROUP_DEPOSIT_PER_COVER),
                })}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setParty(null)
                  setStep("party")
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
              </button>
              <button
                onClick={() => setStep("date")}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
              >
                {t("widget.partyLarge.continue")}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: date */}
        {step === "date" && (
          <div className="animate-fade-up">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.date.title")}
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {dates.map((d) => (
                <button
                  key={d.iso}
                  onClick={() => {
                    setDateIso(d.iso)
                    setStep("time")
                  }}
                  className="flex flex-col items-center gap-0.5 rounded-xl border border-border bg-background py-3 transition-all hover:border-accent hover:bg-secondary active:scale-95"
                >
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                  <span className="text-lg font-medium text-foreground">{d.num}</span>
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(isLargeGroup ? "party-large" : "party")}
              className="mt-4 flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
            </button>
          </div>
        )}

        {/* Step 3: time */}
        {step === "time" && (
          <div className="animate-fade-up">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.time.title")}
            </p>
            <div className="flex items-start gap-2 rounded-xl bg-accent/10 p-3 text-xs text-card-foreground">
              <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{t("widget.time.discountHint")}</span>
            </div>
            {services.map((service) => (
              <div key={service.id} className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {service.label}
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {service.slots.map((s) => (
                    <button
                      key={s.time}
                      onClick={() => {
                        if (s.full) {
                          setWaitSlot(s)
                          setStep("waitlist")
                        } else {
                          setSlot(s)
                          setStep("preorder")
                        }
                      }}
                      className={`relative flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-all active:scale-95 ${
                        s.full
                          ? "border-dashed border-border bg-muted/40 text-muted-foreground hover:border-accent/60 hover:text-accent"
                          : s.promo
                            ? "border-accent bg-accent/10 text-accent hover:bg-accent/20"
                            : "border-border bg-background text-foreground hover:border-accent hover:bg-secondary"
                      }`}
                    >
                      {s.time}
                      {s.full ? (
                        <span className="absolute -right-1.5 -top-1.5 flex items-center gap-0.5 rounded-full bg-secondary px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
                          <Bell className="h-2.5 w-2.5" aria-hidden="true" /> {t("widget.time.full")}
                        </span>
                      ) : (
                        s.promo && (
                          <span className="absolute -right-1.5 -top-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold text-accent-foreground">
                            -{s.promo}%
                          </span>
                        )
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Bell className="h-3 w-3 text-accent" aria-hidden="true" /> {t("widget.time.waitlistNote")}
            </p>
            <button
              onClick={() => setStep("date")}
              className="mt-3 flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
            </button>
          </div>
        )}

        {/* Step 4: pre-order choice */}
        {step === "preorder" && (
          <div className="animate-fade-up">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <UtensilsCrossed className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.preorder.title")}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">{t("widget.preorder.sub")}</p>
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setMode("sur-place")
                  setStep("menu")
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-all hover:border-accent hover:bg-secondary active:scale-[0.99]"
              >
                <Store className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-foreground">{t("widget.preorder.onArrival")}</span>
                  <span className="block text-xs text-muted-foreground">{t("widget.preorder.onArrivalSub")}</span>
                </span>
              </button>
              <button
                onClick={() => {
                  setMode("none")
                  setQty({})
                  setStep("contact")
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-all hover:border-accent hover:bg-secondary active:scale-[0.99]"
              >
                <UtensilsCrossed className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-foreground">{t("widget.preorder.onSite")}</span>
                  <span className="block text-xs text-muted-foreground">{t("widget.preorder.onSiteSub")}</span>
                </span>
              </button>
            </div>
            <button
              onClick={() => setStep("time")}
              className="mt-4 flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
            </button>
          </div>
        )}

        {/* Step 5: pre-order menu (redesigned, grouped by category) */}
        {step === "menu" && (
          <div className="animate-fade-up">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <UtensilsCrossed className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("widget.menu.title")}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">{t("widget.menu.sub")}</p>

            <div className="space-y-5">
              {PREORDER_CATEGORIES.map((cat) => {
                const items = PREORDER_MENU.filter((i) => i.cat === cat)
                if (items.length === 0) return null
                return (
                  <div key={cat}>
                    <p className="mb-2.5 flex items-center gap-2 font-serif text-base text-card-foreground">
                      {catLabelToId[cat] ? t(`sections.${catLabelToId[cat]}`) : cat}
                      <span className="h-px flex-1 bg-border" aria-hidden="true" />
                    </p>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const count = qty[item.id] || 0
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 rounded-2xl border bg-background px-3.5 py-3 transition-colors ${
                              count > 0 ? "border-accent/60" : "border-border"
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground text-pretty">
                                {menu(item.id, { name: item.name }).name}
                              </p>
                              <p className="mt-0.5 text-sm text-accent">{eur2(item.price)}</p>
                            </div>
                            {count === 0 ? (
                              <button
                                onClick={() => setQ(item.id, 1)}
                                className="rounded-lg border border-accent/50 bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition-all hover:bg-accent hover:text-accent-foreground active:scale-90"
                              >
                                {t("widget.menu.add")}
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setQ(item.id, -1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground active:scale-90"
                                  aria-label={t("widget.menu.removeOne")}
                                >
                                  <Minus className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <span className="w-4 text-center text-sm font-medium text-foreground">{count}</span>
                                <button
                                  onClick={() => setQ(item.id, 1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground active:scale-90"
                                  aria-label={t("widget.menu.addOne")}
                                >
                                  <Plus className="h-4 w-4" aria-hidden="true" />
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {preorderCount > 0 && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3 text-sm">
                <span className="text-secondary-foreground">
                  {t("widget.menu.items", { n: preorderCount, s: preorderCount > 1 ? "s" : "" })}
                </span>
                <span className="font-medium text-card-foreground">{eur2(preorderTotal)}</span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setStep("preorder")}
                className="flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
              </button>
              <button
                onClick={() => setStep("contact")}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
              >
                {preorderCount > 0
                  ? t("widget.menu.continue", { total: eur2(preorderTotal) })
                  : t("widget.menu.skip")}
              </button>
            </div>
          </div>
        )}

        {/* Step 6: contact */}
        {step === "contact" && (
          <div className="animate-fade-up">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <User className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.contact.title")}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">{t("widget.contact.sub")}</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t("widget.contact.first")}
                  autoComplete="given-name"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t("widget.contact.last")}
                  autoComplete="family-name"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                />
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("widget.contact.phone")}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("widget.contact.email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Aperçu fidélité */}
            {upcomingVisit > 0 && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-accent/10 p-3 text-xs text-card-foreground">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {loyaltyRewardForVisit(upcomingVisit) > 0 ? (
                  <span>
                    {t("widget.contact.loyaltyReward", { n: upcomingVisit, reward: eur(LOYALTY_REWARD) })}
                  </span>
                ) : (
                  <span>
                    {t("widget.contact.loyaltyProgress", {
                      n: upcomingVisit,
                      left: LOYALTY_THRESHOLD - (upcomingVisit % LOYALTY_THRESHOLD || LOYALTY_THRESHOLD),
                      reward: eur(LOYALTY_REWARD),
                    })}
                  </span>
                )}
              </div>
            )}

            <p className="mt-3 text-[11px] text-muted-foreground">
              {t("widget.contact.smsNote", { email: email.includes("@") ? t("widget.contact.andEmail") : "" })}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(mode === "none" ? "preorder" : "menu")}
                className="flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
              </button>
              <button
                onClick={submitContact}
                disabled={!contactValid}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLargeGroup ? t("widget.contact.confirmLarge") : t("widget.contact.confirm")}
              </button>
            </div>
          </div>
        )}

        {/* Step 6b: deposit gate (large groups) */}
        {step === "deposit" && (
          <div className="animate-fade-up">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.deposit.title")}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">
              {t("widget.deposit.sub", { n: LARGE_GROUP_THRESHOLD })}
            </p>
            <div className="space-y-2 rounded-2xl border border-border bg-background p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("widget.deposit.line", { n: party ?? 0, per: eur(GROUP_DEPOSIT_PER_COVER) })}
                </span>
                <span className="text-card-foreground">{eur(deposit)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-medium">
                <span className="text-card-foreground">{t("widget.deposit.toPay")}</span>
                <span className="text-accent">{eur(deposit)}</span>
              </div>
              <p className="pt-1 text-[11px] text-muted-foreground">{t("widget.deposit.refundNote")}</p>
            </div>

            <label className="mt-3 flex cursor-pointer items-start gap-2 rounded-xl bg-secondary/50 p-3 text-xs text-secondary-foreground">
              <input
                type="checkbox"
                checked={depositPaid}
                onChange={(e) => setDepositPaid(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.79_0.13_76)]"
              />
              <span>{t("widget.deposit.consent", { total: eur(deposit) })}</span>
            </label>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setStep("contact")}
                className="flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
              </button>
              <button
                onClick={goToDone}
                disabled={!depositPaid}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CreditCard className="h-4 w-4" aria-hidden="true" /> {t("widget.deposit.pay", { total: eur(deposit) })}
              </button>
            </div>
          </div>
        )}

        {/* Step 7: confirmation */}
        {step === "done" && (
          <div className="confirm-stagger text-center">
            <div className="confirm-ring mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
              <svg viewBox="0 0 56 56" className="h-16 w-16" aria-hidden="true">
                <circle
                  className="confirm-circle"
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                />
                <path
                  className="confirm-tick"
                  d="M16 29l8 8 16-18"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-serif text-2xl text-card-foreground">{t("widget.done.title")}</p>
            <p className="mt-1 text-sm text-accent">
              {t("widget.done.forName", { name: `${firstName} ${lastName}` })}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {party} {party === 1 ? t("widget.done.person") : t("widget.done.people")} · {selectedDate?.day}{" "}
              {selectedDate?.num} {selectedDate?.month} · {slot?.time}
            </p>

            {/* mode */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-secondary-foreground">
              {mode === "sur-place" && <Store className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
              {mode === "none" && <UtensilsCrossed className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
              {mode === "sur-place" && t("widget.done.onArrival")}
              {mode === "none" && t("widget.done.onSite")}
            </div>

            {/* Récapitulatif : uniquement des montants réels */}
            {(preorderCount > 0 || discountPct > 0 || deposit > 0 || loyaltyReward > 0) && (
              <div className="mt-5 space-y-2 rounded-2xl bg-secondary/40 p-4 text-left text-sm">
                {preorderCount > 0 && (
                  <>
                    <div className="mb-1 space-y-1 border-b border-border pb-2">
                      {PREORDER_MENU.filter((i) => qty[i.id]).map((i) => (
                        <div key={i.id} className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {qty[i.id]} × {menu(i.id, { name: i.name }).name}
                          </span>
                          <span>{eur2(qty[i.id] * i.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("widget.done.preorder")}</span>
                      <span className="text-card-foreground">{eur2(preorderTotal)}</span>
                    </div>
                  </>
                )}
                {discountPct > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>{t("widget.done.discount", { n: discountPct })}</span>
                    <span>{preorderDiscount > 0 ? `-${eur(preorderDiscount)}` : t("widget.done.discountApplied")}</span>
                  </div>
                )}
                {loyaltyReward > 0 && (
                  <div className="flex justify-between text-accent">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.done.loyalty", { n: visitNumber })}
                    </span>
                    <span>-{eur(loyaltyReward)}</span>
                  </div>
                )}
                {deposit > 0 && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t("widget.done.depositPaid")}</span>
                    <span>{eur(deposit)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2 font-medium">
                  <span className="text-card-foreground">{t("widget.done.commission")}</span>
                  <span className="text-accent">0 €</span>
                </div>
              </div>
            )}

            <p className="mt-4 text-xs text-muted-foreground text-pretty">
              {deposit > 0 ? t("widget.done.depositConfirmed") : t("widget.done.free")}
              {t("widget.done.smsNote", {
                email: email.includes("@") ? t("widget.done.bySmsEmail") : t("widget.done.bySms"),
              })}
            </p>

            <button
              onClick={reset}
              className="mt-5 w-full rounded-xl bg-accent py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              {t("widget.done.newReservation")}
            </button>
            <button
              onClick={() => setStep("cancelled")}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.done.cancel")}
            </button>
          </div>
        )}

        {/* Cancelled */}
        {step === "cancelled" && (
          <div className="animate-pop-in text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <X className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="font-serif text-xl text-card-foreground">{t("widget.cancelled.title")}</p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground text-pretty">
              {t("widget.cancelled.sub", { deposit: deposit > 0 ? t("widget.cancelled.depositRefund") : "" })}
            </p>
            <button
              onClick={reset}
              className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              {t("widget.cancelled.new")}
            </button>
          </div>
        )}

        {/* Waitlist form */}
        {step === "waitlist" && (
          <div className="animate-fade-up">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-card-foreground">
              <Bell className="h-4 w-4 text-accent" aria-hidden="true" /> {t("widget.waitlist.title")} · {waitSlot?.time}
            </p>
            <p className="mb-4 text-xs text-muted-foreground">{t("widget.waitlist.sub")}</p>
            <div className="space-y-3">
              <input
                value={waitName}
                onChange={(e) => setWaitName(e.target.value)}
                placeholder={t("widget.waitlist.name")}
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
              <input
                value={waitPhone}
                onChange={(e) => setWaitPhone(e.target.value)}
                placeholder={t("widget.waitlist.phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setStep("time")}
                className="flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t("widget.back")}
              </button>
              <button
                onClick={() => {
                  saveWaitlistEntry({
                    name: waitName,
                    phone: waitPhone,
                    dateIso: dateIso ?? "",
                    time: waitSlot?.time ?? "",
                    party: party ?? 2,
                    at: Date.now(),
                  })
                  setStep("waitlist-done")
                }}
                disabled={waitName.trim().length < 2 || waitPhone.trim().length < 6}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("widget.waitlist.confirm")}
              </button>
            </div>
          </div>
        )}

        {/* Waitlist confirmation */}
        {step === "waitlist-done" && (
          <div className="animate-pop-in text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <Bell className="h-7 w-7 text-accent" aria-hidden="true" />
            </div>
            <p className="font-serif text-xl text-card-foreground">{t("widget.waitlistDone.title")}</p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground text-pretty">
              {t("widget.waitlistDone.sub", { time: waitSlot?.time ?? "" })}
            </p>
            <button
              onClick={reset}
              className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              {t("widget.waitlistDone.back")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
