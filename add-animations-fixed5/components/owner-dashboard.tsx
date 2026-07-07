"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  PiggyBank,
  Users,
  TrendingUp,
  CalendarCheck,
  BellRing,
  Percent,
  UtensilsCrossed,
  Ban,
  Check,
  Calculator,
} from "lucide-react"
import {
  eur,
  eur2,
  loadDiscounts,
  saveDiscounts,
  DISCOUNT_OPTIONS,
  LUNCH_TIMES,
  DINNER_TIMES,
  AVG_TICKET,
  PLATFORM_FEE_PER_COVER,
  RESTAURANT,
  type DiscountMap,
} from "@/lib/reservation"
import { useI18n } from "@/lib/i18n"

const TODAY_BOOKINGS = [
  { time: "12:30", name: "M. Bernard", party: 2, promo: false, preorder: false },
  { time: "13:30", name: "Fam. Lefèvre", party: 4, promo: false, preorder: true },
  { time: "14:00", name: "Mme Roux", party: 2, promo: true, preorder: false },
  { time: "14:30", name: "M. Petit", party: 3, promo: true, preorder: true },
  { time: "19:00", name: "Table Girard", party: 6, promo: true, preorder: true },
  { time: "19:30", name: "M. Moreau", party: 5, promo: false, preorder: false },
  { time: "20:30", name: "Fam. Dubois", party: 4, promo: false, preorder: false },
  { time: "21:30", name: "Mme Simon", party: 2, promo: true, preorder: true },
]

const WEEK_COVERS = [38, 52, 44, 61, 88, 96, 47]
const WEEK_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const

const HEATMAP_TIMES = ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"]
const HEATMAP: { dayKey: (typeof WEEK_KEYS)[number]; values: number[] }[] = [
  { dayKey: "mon", values: [55, 80, 20, 60, 85, 35] },
  { dayKey: "tue", values: [50, 75, 15, 55, 80, 30] },
  { dayKey: "wed", values: [60, 85, 25, 65, 88, 40] },
  { dayKey: "thu", values: [65, 90, 30, 70, 92, 45] },
  { dayKey: "fri", values: [80, 98, 45, 85, 100, 70] },
  { dayKey: "sat", values: [85, 100, 55, 90, 100, 80] },
  { dayKey: "sun", values: [70, 92, 35, 60, 78, 30] },
]

const MONTH_COVERS = 426
const MONTH_PREORDER_COVERS = 118
const MONTH_NOSHOW_AVOIDED = 14
const SUBSCRIPTION = 79

function heatColor(v: number): string {
  if (v >= 90) return "bg-primary text-primary-foreground"
  if (v >= 70) return "bg-primary/70 text-primary-foreground"
  if (v >= 45) return "bg-primary/40 text-foreground"
  if (v >= 25) return "bg-primary/20 text-foreground"
  return "bg-destructive/25 text-foreground"
}

export function OwnerDashboard() {
  const { t } = useI18n()
  const [discounts, setDiscounts] = useState<DiscountMap>({})
  const [savedFlash, setSavedFlash] = useState(false)

  // ---- Earnings calculator state ----
  const [coversPerDay, setCoversPerDay] = useState(60)
  const [openDays, setOpenDays] = useState(26)
  const [platformShare, setPlatformShare] = useState(45) // %
  const [commissionRate, setCommissionRate] = useState(PLATFORM_FEE_PER_COVER)
  const [calcTicket, setCalcTicket] = useState(AVG_TICKET)

  useEffect(() => {
    setDiscounts(loadDiscounts())
  }, [])

  function setDiscount(time: string, value: number) {
    setDiscounts((prev) => {
      const next = { ...prev }
      if (value === 0) delete next[time]
      else next[time] = value
      saveDiscounts(next)
      return next
    })
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 1500)
  }

  const coversToday = TODAY_BOOKINGS.reduce((s, b) => s + b.party, 0)
  const revenue = coversToday * AVG_TICKET
  const commissionSaved = MONTH_COVERS * PLATFORM_FEE_PER_COVER
  const promoCovers = TODAY_BOOKINGS.filter((b) => b.promo).reduce((s, b) => s + b.party, 0)
  const preorderRevenue = MONTH_PREORDER_COVERS * 12.5
  const noshowSaved = MONTH_NOSHOW_AVOIDED * AVG_TICKET * 2
  const maxCovers = Math.max(...WEEK_COVERS)
  const marginRecovered = commissionSaved + noshowSaved + preorderRevenue * 0.15

  // ---- Calculator derived values ----
  const calc = useMemo(() => {
    const monthlyCovers = coversPerDay * openDays
    const platformCovers = monthlyCovers * (platformShare / 100)
    const commissionAvoided = platformCovers * commissionRate
    // pre-order upside: assume 25% of direct covers pre-order, +8% ticket uplift
    const preorderUpside = monthlyCovers * 0.25 * calcTicket * 0.08
    const monthly = commissionAvoided + preorderUpside
    return {
      commissionAvoided,
      preorderUpside,
      monthly,
      yearly: monthly * 12,
    }
  }, [coversPerDay, openDays, platformShare, commissionRate, calcTicket])

  const cards = [
    { icon: Users, label: t("dash.cards.coversToday"), value: String(coversToday), sub: t("dash.cards.reservations", { n: TODAY_BOOKINGS.length }) },
    { icon: TrendingUp, label: t("dash.cards.revenueToday"), value: eur(revenue), sub: t("dash.cards.avgTicket", { v: eur(AVG_TICKET) }) },
    { icon: PiggyBank, label: t("dash.cards.commissionSaved"), value: eur(commissionSaved), sub: t("dash.cards.vsPlatform") },
    { icon: UtensilsCrossed, label: t("dash.cards.preorderRevenue"), value: eur(preorderRevenue), sub: t("dash.cards.preorderCovers", { n: MONTH_PREORDER_COVERS }) },
    { icon: CalendarCheck, label: t("dash.cards.offPeakFilled"), value: `${promoCovers} ${t("dash.cards.covers")}`, sub: t("dash.cards.offPeakSub") },
    { icon: Ban, label: t("dash.cards.noshow"), value: `${MONTH_NOSHOW_AVOIDED}`, sub: t("dash.cards.noshowSub", { v: eur(noshowSaved) }) },
  ]

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5">
          <div>
            <p className="font-serif text-lg text-card-foreground">{RESTAURANT.name}</p>
            <p className="text-xs text-muted-foreground">{t("dash.brand")}</p>
          </div>
          <Link
            href="/restaurant"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("dash.site")}
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className="animate-fade-up rounded-2xl border border-border bg-card p-4"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <c.icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
              <p className="font-serif text-2xl text-card-foreground">{c.value}</p>
              <p className="mt-1 text-xs font-medium text-foreground">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Earnings calculator */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg text-card-foreground">{t("dash.calc.title")}</p>
              <p className="text-xs text-muted-foreground text-pretty">{t("dash.calc.subtitle")}</p>
            </div>
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-2">
            {/* sliders */}
            <div className="space-y-5">
              <CalcSlider
                label={t("dash.calc.coversPerDay")}
                value={coversPerDay}
                min={10}
                max={200}
                step={5}
                display={String(coversPerDay)}
                onChange={setCoversPerDay}
              />
              <CalcSlider
                label={t("dash.calc.openDays")}
                value={openDays}
                min={15}
                max={31}
                step={1}
                display={String(openDays)}
                onChange={setOpenDays}
              />
              <CalcSlider
                label={t("dash.calc.platformShare")}
                value={platformShare}
                min={0}
                max={100}
                step={5}
                display={`${platformShare}%`}
                onChange={setPlatformShare}
              />
              <CalcSlider
                label={t("dash.calc.commissionRate")}
                value={commissionRate}
                min={1}
                max={6}
                step={0.5}
                display={eur2(commissionRate)}
                onChange={setCommissionRate}
              />
              <CalcSlider
                label={t("dash.calc.avgTicket")}
                value={calcTicket}
                min={15}
                max={90}
                step={1}
                display={eur(calcTicket)}
                onChange={setCalcTicket}
              />
            </div>

            {/* result */}
            <div className="flex flex-col rounded-2xl bg-primary/10 p-5">
              <p className="text-sm font-medium text-card-foreground">{t("dash.calc.resultTitle")}</p>
              <p className="mt-1 font-serif text-4xl text-primary tabular-nums">{eur(calc.monthly)}</p>
              <p className="mt-1 text-xs text-muted-foreground text-pretty">
                {t("dash.calc.resultSub", { yearly: eur(calc.yearly) })}
              </p>

              <div className="mt-5 space-y-2 border-t border-primary/20 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dash.calc.breakdownCommission")}</span>
                  <span className="font-medium text-card-foreground tabular-nums">{eur(calc.commissionAvoided)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dash.calc.breakdownPreorder")}</span>
                  <span className="font-medium text-card-foreground tabular-nums">{eur(calc.preorderUpside)}</span>
                </div>
              </div>

              <p className="mt-auto pt-4 text-[11px] text-muted-foreground text-pretty">{t("dash.calc.note")}</p>
            </div>
          </div>
        </section>

        {/* Discount scheduler */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="font-serif text-lg text-card-foreground">{t("dash.discounts.title")}</p>
            </div>
            {savedFlash && (
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> {t("dash.discounts.saved")}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">{t("dash.discounts.text")}</p>

          {[
            { label: t("dash.discounts.lunch"), times: LUNCH_TIMES },
            { label: t("dash.discounts.dinner"), times: DINNER_TIMES },
          ].map((group) => (
            <div key={group.label} className="mt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{group.label}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                {group.times.map((time) => {
                  const current = discounts[time] || 0
                  return (
                    <div
                      key={time}
                      className={`rounded-xl border p-2.5 text-center transition-colors ${
                        current > 0 ? "border-primary/40 bg-primary/10" : "border-border bg-background"
                      }`}
                    >
                      <p className="text-sm font-medium text-foreground">{time}</p>
                      <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                        {DISCOUNT_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setDiscount(time, opt)}
                            aria-pressed={current === opt}
                            className={`h-6 min-w-6 rounded-md px-1 text-[11px] font-medium transition-colors ${
                              current === opt
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground hover:bg-secondary/70"
                            }`}
                          >
                            {opt === 0 ? "—" : `${opt}%`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Heatmap */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <p className="font-serif text-lg text-card-foreground">{t("dash.heatmap.title")}</p>
          <p className="mb-4 text-sm text-muted-foreground text-pretty">{t("dash.heatmap.text")}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 text-center">
              <thead>
                <tr>
                  <th className="w-12" />
                  {HEATMAP_TIMES.map((tm) => (
                    <th key={tm} className="px-1 pb-1 text-[11px] font-medium text-muted-foreground">
                      {tm}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP.map((row) => (
                  <tr key={row.dayKey}>
                    <td className="pr-1 text-right text-[11px] font-medium text-muted-foreground">
                      {t(`dash.days.${row.dayKey}`)}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i}>
                        <div
                          className={`flex h-8 items-center justify-center rounded-md text-[10px] font-medium ${heatColor(v)}`}
                          title={`${t(`dash.days.${row.dayKey}`)} ${HEATMAP_TIMES[i]} · ${v}%`}
                        >
                          {v}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          {/* Bookings list */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <p className="font-serif text-lg text-card-foreground">{t("dash.bookings.title")}</p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BellRing className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {t("dash.bookings.smsActive")}
                </span>
              </div>
              <ul className="divide-y divide-border">
                {TODAY_BOOKINGS.map((b) => (
                  <li key={b.time + b.name} className="flex items-center gap-3 px-5 py-3">
                    <span className="w-14 shrink-0 font-medium text-card-foreground">{b.time}</span>
                    <span className="flex-1 text-sm text-foreground">{b.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {b.party} {t("dash.bookings.people")}
                    </span>
                    {b.preorder && (
                      <span className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-foreground">
                        {t("dash.bookings.preorder")}
                      </span>
                    )}
                    {b.promo && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary">
                        {t("dash.bookings.offPeak")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Week chart + margin */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-serif text-lg text-card-foreground">{t("dash.week.title")}</p>
              <p className="mb-5 text-xs text-muted-foreground">
                {t("dash.week.total", { n: WEEK_COVERS.reduce((s, c) => s + c, 0) })}
              </p>
              <div className="flex items-stretch justify-between gap-2" style={{ height: "160px" }}>
                {WEEK_COVERS.map((covers, i) => (
                  <div key={WEEK_KEYS[i]} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/85 transition-all"
                        style={{
                          height: `${(covers / maxCovers) * 100}%`,
                          animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
                        }}
                        title={`${covers}`}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{t(`dash.days.${WEEK_KEYS[i]}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/8 p-5">
              <p className="text-sm font-medium text-card-foreground">{t("dash.margin.title")}</p>
              <p className="mt-1 font-serif text-3xl text-primary">{eur(marginRecovered)}</p>
              <p className="mt-1 text-xs text-muted-foreground text-pretty">
                {t("dash.margin.note", { price: eur2(SUBSCRIPTION) })}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function CalcSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm text-foreground">{label}</label>
        <span className="font-serif text-base text-primary tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[oklch(0.79_0.13_76)]"
        aria-label={label}
      />
    </div>
  )
}
