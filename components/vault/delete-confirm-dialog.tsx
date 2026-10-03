'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useI18n } from '@/components/i18n-provider'

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entryId: string | null
  entryTitle: string
  onDeleted: () => void
}

export function DeleteConfirmDialog({ open, onOpenChange, entryId, entryTitle, onDeleted }: DeleteConfirmDialogProps) {
  const { t } = useI18n()
  const handleDelete = async () => {
    if (!entryId) return
    try {
      const res = await fetch(`/api/vault/${entryId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success(t('del.deleted'))
      onDeleted()
      onOpenChange(false)
    } catch {
      toast.error(t('del.failed'))
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            {t('del.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('del.confirm', { x: entryTitle })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('del.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {t('del.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
