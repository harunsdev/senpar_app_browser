import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { SessionProvider } from 'next-auth/react'
import { I18nProvider } from '@/components/i18n-provider'
import { GoogleAnalytics } from '@/components/google-analytics'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Senpar — Family Information Vault',
  description: 'A secure vault for family information. TEST MODE — demo purposes only.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          src="https://apps.abacus.ai/chatllm/appllm-lib.js"
          strategy="afterInteractive"
        />
        <GoogleAnalytics />
        <SessionProvider>
          <I18nProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster />
              <ChunkLoadErrorHandler />
            </ThemeProvider>
          </I18nProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
