import type { Metadata, Viewport } from 'next'
import { DM_Sans, Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getSiteUrl } from '@/lib/site'
import JsonLd from '@/components/JsonLd'
import { Providers } from './providers'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
})

const siteUrl = getSiteUrl()

const ogImage = {
  url: '/assets/herihasina.jpeg',
  width: 1200,
  height: 1200,
  alt: 'Herihasina Michael Rakotoarivony — Développeur Fullstack Junior',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Herihasina Michael Rakotoarivony | Développeur Fullstack Junior',
    template: '%s | Herihasina Michael Rakotoarivony',
  },
  description:
    'Portfolio de Herihasina Michael Rakotoarivony — développeur fullstack junior. Applications web et mobiles modernes, performantes et centrées sur l’expérience utilisateur.',
  keywords: [
    'Herihasina Michael',
    'Rakotoarivony',
    'portfolio',
    'développeur fullstack junior',
    'Next.js',
    'React',
    'web developer',
  ],
  authors: [{ name: 'Herihasina Michael Rakotoarivony' }],
  creator: 'Herihasina Michael Rakotoarivony',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: 'Herihasina Michael Rakotoarivony — Portfolio',
    title: 'Herihasina Michael Rakotoarivony | Développeur Fullstack Junior',
    description:
      'Applications web et mobiles modernes, performantes et centrées sur l’expérience utilisateur.',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herihasina Michael Rakotoarivony | Développeur Fullstack Junior',
    description:
      'Portfolio — développeur fullstack junior, applications web et mobiles modernes.',
    images: [ogImage.url],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f4f5' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${dmSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <JsonLd />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
