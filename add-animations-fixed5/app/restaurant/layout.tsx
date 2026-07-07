import type { Metadata } from 'next'
import { LanguageProvider } from '@/lib/i18n'
import { IntroLoader } from '@/components/intro-loader'
import { DemoBar } from '@/components/demo-bar'

export const metadata: Metadata = {
  title: 'Table Directe — réservation directe sans commission pour restaurants',
  description:
    "Vos clients réservent directement chez vous, sans commission de plateforme. Remplissez vos heures creuses, réduisez les no-shows et gardez 100 % de votre chiffre. Menu numérique inclus.",
}

export default function RestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <IntroLoader />
      {children}
      <DemoBar />
    </LanguageProvider>
  )
}
