import {
  KeyRound,
  Monitor,
  CreditCard,
  StickyNote,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type CategoryKey = 'PASSWORD' | 'DEVICE' | 'SUBSCRIPTION' | 'NOTE' | 'FAMILY'

export interface CategoryConfig {
  key: CategoryKey
  label: string
  slug: string
  icon: LucideIcon
  color: string
  description: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'PASSWORD',
    label: 'Passwords',
    slug: 'passwords',
    icon: KeyRound,
    color: 'text-teal-600',
    description: 'Manage saved passwords and credentials',
  },
  {
    key: 'DEVICE',
    label: 'Devices',
    slug: 'devices',
    icon: Monitor,
    color: 'text-blue-600',
    description: 'Track family devices and their info',
  },
  {
    key: 'SUBSCRIPTION',
    label: 'Subscriptions',
    slug: 'subscriptions',
    icon: CreditCard,
    color: 'text-purple-600',
    description: 'Keep track of active subscriptions',
  },
  {
    key: 'NOTE',
    label: 'Secure Notes',
    slug: 'notes',
    icon: StickyNote,
    color: 'text-amber-600',
    description: 'Store sensitive notes securely',
  },
  {
    key: 'FAMILY',
    label: 'Family',
    slug: 'family',
    icon: Users,
    color: 'text-rose-600',
    description: 'Family member information',
  },
]

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategoryByKey(key: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.key === key)
}
