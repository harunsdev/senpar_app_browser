'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { VaultEntryCard } from '@/components/vault/vault-entry-card'
import { CATEGORIES } from '@/lib/categories'
import { FadeIn, Stagger, StaggerItem, HoverLift } from '@/components/ui/animate'
import { useI18n } from '@/components/i18n-provider'
import Link from 'next/link'

interface DashboardContentProps {
  counts: Record<string, number>
  recentEntries: any[]
}

export function DashboardContent({ counts, recentEntries }: DashboardContentProps) {
  const router = useRouter()
  const { t } = useI18n()

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('dash.welcomeTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dash.welcomeSubtitle')}</p>
        </div>
      </FadeIn>

      {/* Category summary cards */}
      <Stagger staggerDelay={0.08}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <StaggerItem key={cat.key}>
              <HoverLift>
                <Link href={`/vault/${cat.slug}`}>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-3 ${cat.color}`}>
                        <cat.icon className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-bold">{counts?.[cat.key] ?? 0}</p>
                      <p className="text-sm text-muted-foreground">{t(`cat.${cat.key}`)}</p>
                    </CardContent>
                  </Card>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </div>
      </Stagger>

      {/* Recent items */}
      <FadeIn delay={0.3}>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('dash.recentItems')}</h2>
          </div>
          {(recentEntries?.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {(recentEntries ?? []).map((entry: any) => {
                const cat = CATEGORIES.find((c) => c.key === entry?.category)
                return (
                  <VaultEntryCard
                    key={entry?.id}
                    entry={entry}
                    onClick={() => router.push(`/vault/${cat?.slug ?? 'passwords'}`)}
                  />
                )
              })}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">{t('dash.noEntries')}</p>
            </Card>
          )}
        </div>
      </FadeIn>
    </div>
  )
}
