import type { Metadata } from "next"
import { RESTAURANT } from "@/lib/reservation"

export const metadata: Metadata = {
  title: `La carte · ${RESTAURANT.name}`,
  description: `Découvrez la carte du ${RESTAURANT.name}, bistrot lyonnais : cuisine de marché, quenelles maison, volaille de Bresse et desserts de saison.`,
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children
}
