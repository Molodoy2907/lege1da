"use client"

import { useState } from "react"
import { Gift, Check, Copy, ArrowLeft } from "lucide-react"
import { GIFT_AMOUNTS, makeGiftCode, RESTAURANT, eur } from "@/lib/reservation"

type Step = "choose" | "done"

export function GiftCard() {
  const [step, setStep] = useState<Step>("choose")
  const [amount, setAmount] = useState<number>(GIFT_AMOUNTS[2])
  const [recipient, setRecipient] = useState("")
  const [sender, setSender] = useState("")
  const [message, setMessage] = useState("")
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)

  function buy() {
    setCode(makeGiftCode())
    setStep("done")
  }

  function copyCode() {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-accent" aria-hidden="true" />
          <p className="font-serif text-lg text-card-foreground">Offrir un bon cadeau</p>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Valable 1 an
        </span>
      </div>

      <div className="p-5">
        {step === "choose" && (
          <div className="animate-fade-up">
            {/* Aperçu de la carte */}
            <div className="relative mb-5 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-secondary to-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-lg text-card-foreground">{RESTAURANT.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-accent">Bon cadeau</p>
                </div>
                <Gift className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-6 font-serif text-4xl text-primary">{eur(amount)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {recipient ? `Pour ${recipient}` : "À valoir sur place ou à emporter"}
              </p>
            </div>

            <p className="mb-2 text-sm font-medium text-card-foreground">Montant</p>
            <div className="grid grid-cols-4 gap-2.5">
              {GIFT_AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-all active:scale-95 ${
                    amount === a
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {eur(a)}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Nom du destinataire"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
              <input
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="De la part de"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message (facultatif)"
                rows={2}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
              />
            </div>

            <button
              onClick={buy}
              disabled={recipient.trim().length < 2 || sender.trim().length < 2}
              className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Payer {eur(amount)}
            </button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Envoi par e-mail immédiat, à imprimer ou à transférer.
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="animate-pop-in text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-7 w-7 text-accent" aria-hidden="true" />
            </div>
            <p className="font-serif text-xl text-card-foreground">Bon cadeau prêt !</p>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              {eur(amount)} pour {recipient}, de la part de {sender}.
            </p>

            <button
              onClick={copyCode}
              className="mx-auto mt-5 flex items-center gap-3 rounded-2xl border border-primary/30 bg-secondary/60 px-5 py-3 transition-colors hover:border-accent"
            >
              <span className="font-mono text-lg tracking-widest text-primary">{code}</span>
              {copied ? (
                <Check className="h-4 w-4 text-accent" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
            </button>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {copied ? "Code copié !" : "Cliquez pour copier le code cadeau"}
            </p>

            <button
              onClick={() => {
                setStep("choose")
                setRecipient("")
                setSender("")
                setMessage("")
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Offrir un autre bon
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
