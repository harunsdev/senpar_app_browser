'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, LogOut, User, PanelLeft } from 'lucide-react'
import { LanguageSwitcher } from '@/components/vault/language-switcher'
import { useI18n } from '@/components/i18n-provider'

export function TopBar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useI18n()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onToggleSidebar}
      >
        <PanelLeft className="h-5 w-5" />
      </Button>

      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('topbar.searchPlaceholder')}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-1">
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white text-sm font-medium">
                {session?.user?.name?.[0]?.toUpperCase() ?? <User className="h-4 w-4" />}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{session?.user?.name ?? t('topbar.user')}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email ?? ''}</p>
            </div>
            <DropdownMenuItem
              onClick={() => signOut({ redirectTo: '/login' })}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('topbar.signOut')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
