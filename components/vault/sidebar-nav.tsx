'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/lib/categories'
import { Shield, LayoutDashboard } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'

export function SidebarNav() {
  const pathname = usePathname()
  const { t } = useI18n()

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
          <Shield className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold text-white">Senpar</span>
      </div>

      <nav className="flex-1 space-y-1">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            pathname === '/dashboard'
              ? 'bg-teal-600/20 text-teal-400'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          {t('nav.dashboard')}
        </Link>

        {CATEGORIES.map((cat) => {
          const isActive = pathname === `/vault/${cat.slug}`
          return (
            <Link
              key={cat.key}
              href={`/vault/${cat.slug}`}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-teal-600/20 text-teal-400'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              )}
            >
              <cat.icon className="h-4 w-4" />
              {t(`cat.${cat.key}`)}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto border-t border-slate-700 pt-4">
        <p className="px-2 text-xs text-slate-500">
          {t('nav.testModeOnly')}
        </p>
      </div>
    </div>
  )
}
