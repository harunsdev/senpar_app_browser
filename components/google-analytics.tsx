import Script from 'next/script'

/**
 * Google Analytics (GA4) via gtag.js. Renders nothing unless a real
 * Measurement ID (G-XXXXXXXXXX) is configured in NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const enabled = !!gaId && /^G-[A-Z0-9]+$/.test(gaId) && !gaId.includes('XXXX')

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
