'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCategoryByKey } from '@/lib/categories'
import { Clock, Eye, EyeOff } from 'lucide-react'
import { SafeDate } from '@/components/safe-format'
import { useI18n } from '@/components/i18n-provider'

interface VaultEntryCardProps {
  entry: {
    id: string
    title: string
    category: string
    privacy: string
    data: any
    updatedAt: string
    user?: { name: string | null; email: string } | null
  }
  onClick?: () => void
}

export function VaultEntryCard({ entry, onClick }: VaultEntryCardProps) {
  const { t } = useI18n()
  const cat = getCategoryByKey(entry?.category ?? '')
  const Icon = cat?.icon
  const data = entry?.data ?? {}

  const getSubtitle = () => {
    switch (entry?.category) {
      case 'PASSWORD': return data?.username ?? ''
      case 'DEVICE': return `${data?.brand ?? ''} • ${data?.type ?? ''}`
      case 'SUBSCRIPTION': return `$${data?.cost ?? '0'}/${data?.billingCycle === 'annual' ? 'yr' : 'mo'}`
      case 'NOTE': return data?.tag ?? 'Note'
      case 'FAMILY': return data?.relationship ?? ''
      default: return ''
    }
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 p-4"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted ${cat?.color ?? ''}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm truncate">{entry?.title ?? 'Untitled'}</h3>
            <Badge
              variant={entry?.privacy === 'SHARED' ? 'default' : 'secondary'}
              className={`text-xs shrink-0 ${entry?.privacy === 'SHARED' ? 'bg-teal-100 text-teal-700 hover:bg-teal-100' : ''}`}
            >
              {entry?.privacy === 'SHARED' ? t('card.shared') : t('card.personal')}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {entry?.category === 'PASSWORD' ? '••••••••' : getSubtitle()}
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <SafeDate date={entry?.updatedAt} options={{ dateStyle: 'medium' }} />
          </div>
        </div>
      </div>
    </Card>
  )
}
