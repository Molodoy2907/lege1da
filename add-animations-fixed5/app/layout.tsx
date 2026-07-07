import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { FilmGrain } from '@/components/film-grain'
import { MagneticButtons } from '@/components/magnetic-buttons'
import { ScrollAnimator } from '@/components/scroll-animator'
import { ScrollProgress } from '@/components/scroll-progress'
import { PageTransition } from '@/components/page-transition'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Vitrine Studio — Sites vitrines premium pour commerces locaux',
  description:
    'Studio web indépendant. Nous créons des sites rapides, élégants et pensés pour convertir les visiteurs en clients : restaurants, garages, indépendants et commerces locaux. Design sur mesure, hébergement et maintenance inclus.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#131210',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`bg-background ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
        <FilmGrain />
        <ScrollProgress />
        <MagneticButtons />
        <ScrollAnimator />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
