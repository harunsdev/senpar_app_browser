'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { type Locale, DEFAULT_LOCALE, translate } from '@/lib/i18n'

const STORAGE_KEY = 'senpar.locale'

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, vars?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Default locale on both server and first client render to avoid hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (stored === 'da' || stored === 'en') {
        setLocaleState(stored)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    try {
      document.documentElement.lang = l
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      document.documentElement.lang = locale
    } catch {
      /* ignore */
    }
  }, [locale])

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => translate(locale, key, vars),
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    // Fallback so components don't crash if used outside provider.
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key: string, vars?: Record<string, string>) => translate(DEFAULT_LOCALE, key, vars),
    }
  }
  return ctx
}
