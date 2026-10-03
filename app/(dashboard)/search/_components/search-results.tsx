'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { VaultEntryCard } from '@/components/vault/vault-entry-card'
import { getCategoryByKey } from '@/lib/categories'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import { useI18n } from '@/components/i18n-provider'
import { SearchX } from 'lucide-react'

interface SearchResultsProps {
  query: string
  results: any[]
}

export function SearchResults({ query, results }: SearchResultsProps) {
  const router = useRouter()
  const { t } = useI18n()
  const count = results?.length ?? 0

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('search.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {query
              ? t('search.resultsFor', { count: String(count), q: query })
              : t('search.empty')}
          </p>
        </div>
      </FadeIn>

      {query && count > 0 ? (
        <Stagger staggerDelay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {results.map((entry: any) => {
              const cat = getCategoryByKey(entry?.category ?? '')
              return (
                <StaggerItem key={entry?.id}>
                  <VaultEntryCard
                    entry={entry}
                    onClick={() => router.push(`/vault/${cat?.slug ?? 'passwords'}`)}
                  />
                </StaggerItem>
              )
            })}
          </div>
        </Stagger>
      ) : query ? (
        <FadeIn delay={0.1}>
          <Card className="p-12 text-center">
            <SearchX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">{t('search.noResultsTitle')}</h3>
            <p className="text-muted-foreground text-sm">
              {t('search.noResultsDesc', { q: query })}
            </p>
          </Card>
        </FadeIn>
      ) : null}
    </div>
  )
}
