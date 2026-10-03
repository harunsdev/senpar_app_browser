'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { VaultEntryCard } from '@/components/vault/vault-entry-card'
import { VaultEntryDialog } from '@/components/vault/vault-entry-dialog'
import { DeleteConfirmDialog } from '@/components/vault/delete-confirm-dialog'
import { getCategoryByKey, type CategoryKey } from '@/lib/categories'
import { Search, Plus, Inbox } from 'lucide-react'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'

interface VaultCategoryViewProps {
  categoryKey: CategoryKey
  categorySlug: string
}

export function VaultCategoryView({ categoryKey, categorySlug }: VaultCategoryViewProps) {
  const [entries, setEntries] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editEntry, setEditEntry] = useState<any>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteEntry, setDeleteEntry] = useState<any>(null)

  const { t } = useI18n()
  const cat = getCategoryByKey(categoryKey)
  const catLabel = cat ? t(`cat.${cat.key}`) : t('view.category')
  const catDesc = cat ? t(`catDesc.${cat.key}`) : ''

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/vault?category=${categoryKey}`)
      if (res.ok) {
        const data = await res.json()
        setEntries(data ?? [])
      }
    } catch (err) {
      console.error('Failed to fetch entries:', err)
    } finally {
      setLoading(false)
    }
  }, [categoryKey])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const filtered = (entries ?? []).filter((e: any) =>
    (e?.title ?? '').toLowerCase().includes((filter ?? '').toLowerCase())
  )

  const handleEdit = (entry: any) => {
    setEditEntry(entry)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditEntry(null)
    setDialogOpen(true)
  }

  const handleDelete = (entry: any) => {
    setDeleteEntry(entry)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {cat?.icon && <cat.icon className={`h-6 w-6 ${cat?.color ?? ''}`} />}
              {catLabel}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">{catDesc}</p>
          </div>
          <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700 shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            {t('view.addNew')}
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('view.filter', { x: catLabel.toLowerCase() })}
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-10 bg-muted rounded mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </Card>
          ))}
        </div>
      ) : (filtered?.length ?? 0) > 0 ? (
        <Stagger staggerDelay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((entry: any) => (
              <StaggerItem key={entry?.id}>
                <div className="relative group">
                  <VaultEntryCard entry={entry} onClick={() => handleEdit(entry)} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(entry)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          {t('view.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(entry)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t('view.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      ) : (
        <FadeIn delay={0.2}>
          <Card className="p-12 text-center">
            <Inbox className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">{t('view.noEntriesTitle')}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t('view.noEntriesDesc')}</p>
            <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              {t('view.addEntry', { x: catLabel.replace(/s$/, '') })}
            </Button>
          </Card>
        </FadeIn>
      )}

      <VaultEntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={categoryKey}
        entry={editEntry}
        onSaved={fetchEntries}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        entryId={deleteEntry?.id ?? null}
        entryTitle={deleteEntry?.title ?? ''}
        onDeleted={fetchEntries}
      />
    </div>
  )
}
