'use client'

import { useI18n } from '@/components/i18n-provider'

export function TestModeBanner() {
  const { t } = useI18n()
  return (
    <div className="rounded-lg border border-amber-300/30 bg-amber-50 px-4 py-2.5 text-center">
      <p className="text-sm font-medium text-amber-800">
        {t('banner.testMode')}
      </p>
    </div>
  )
}
