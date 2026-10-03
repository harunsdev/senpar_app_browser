'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, EyeOff, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { CategoryKey } from '@/lib/categories'
import { useI18n } from '@/components/i18n-provider'

interface VaultEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: CategoryKey
  entry?: any
  onSaved: () => void
}

export function VaultEntryDialog({ open, onOpenChange, category, entry, onSaved }: VaultEntryDialogProps) {
  const { t } = useI18n()
  const [title, setTitle] = useState('')
  const [privacy, setPrivacy] = useState<'PERSONAL' | 'SHARED'>('PERSONAL')
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isEdit = !!entry?.id

  useEffect(() => {
    if (entry) {
      setTitle(entry?.title ?? '')
      setPrivacy(entry?.privacy ?? 'PERSONAL')
      setData(entry?.data ?? {})
    } else {
      setTitle('')
      setPrivacy('PERSONAL')
      setData({})
    }
    setShowPassword(false)
  }, [entry, open])

  const updateData = (key: string, value: string) => {
    setData((prev: Record<string, any>) => ({ ...(prev ?? {}), [key]: value }))
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error(t('dlg.titleRequired'))
      return
    }
    setLoading(true)
    try {
      const url = isEdit ? `/api/vault/${entry.id}` : '/api/vault'
      const method = isEdit ? 'PUT' : 'POST'
      const body: any = { title: title.trim(), data, privacy }
      if (!isEdit) body.category = category

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error ?? 'Failed to save')
      }
      toast.success(isEdit ? t('dlg.updated') : t('dlg.created'))
      onSaved()
      onOpenChange(false)
    } catch (err: any) {
      toast.error(err?.message ?? t('dlg.saveFailed'))
    } finally {
      setLoading(false)
    }
  }

  const renderFields = () => {
    switch (category) {
      case 'PASSWORD':
        return (
          <>
            <div className="space-y-2">
              <Label>{t('f.usernameEmail')}</Label>
              <Input value={data?.username ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('username', e.target.value)} placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.password')}</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={data?.password ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('password', e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('f.website')}</Label>
              <Input value={data?.website ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('website', e.target.value)} placeholder="https://" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.notes')}</Label>
              <Textarea value={data?.notes ?? ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData('notes', e.target.value)} rows={2} />
            </div>
          </>
        )
      case 'DEVICE':
        return (
          <>
            <div className="space-y-2">
              <Label>{t('f.deviceType')}</Label>
              <Select value={data?.type ?? 'other'} onValueChange={(v: string) => updateData('type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">{t('opt.phone')}</SelectItem>
                  <SelectItem value="laptop">{t('opt.laptop')}</SelectItem>
                  <SelectItem value="tablet">{t('opt.tablet')}</SelectItem>
                  <SelectItem value="router">{t('opt.router')}</SelectItem>
                  <SelectItem value="other">{t('opt.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('f.brandModel')}</Label>
              <Input value={data?.brand ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('brand', e.target.value)} placeholder="Apple MacBook Pro" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.serialNumber')}</Label>
              <Input value={data?.serialNumber ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('serialNumber', e.target.value)} placeholder="XXX-XXXX-XXXX" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.osVersion')}</Label>
              <Input value={data?.os ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('os', e.target.value)} placeholder="macOS Sonoma 14.2" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.notes')}</Label>
              <Textarea value={data?.notes ?? ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData('notes', e.target.value)} rows={2} />
            </div>
          </>
        )
      case 'SUBSCRIPTION':
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>{t('f.planTier')}</Label>
                <Input value={data?.plan ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('plan', e.target.value)} placeholder="Premium" />
              </div>
              <div className="space-y-2">
                <Label>{t('f.billingCycle')}</Label>
                <Select value={data?.billingCycle ?? 'monthly'} onValueChange={(v: string) => updateData('billingCycle', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">{t('opt.monthly')}</SelectItem>
                    <SelectItem value="annual">{t('opt.annual')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>{t('f.cost')}</Label>
                <Input value={data?.cost ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('cost', e.target.value)} placeholder="15.99" />
              </div>
              <div className="space-y-2">
                <Label>{t('f.renewalDate')}</Label>
                <Input type="date" value={data?.renewalDate ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('renewalDate', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('f.loginEmail')}</Label>
              <Input value={data?.loginEmail ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('loginEmail', e.target.value)} placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.notes')}</Label>
              <Textarea value={data?.notes ?? ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData('notes', e.target.value)} rows={2} />
            </div>
          </>
        )
      case 'NOTE':
        return (
          <>
            <div className="space-y-2">
              <Label>{t('f.categoryTag')}</Label>
              <Input value={data?.tag ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('tag', e.target.value)} placeholder="WiFi, Insurance, etc." />
            </div>
            <div className="space-y-2">
              <Label>{t('f.content')}</Label>
              <Textarea value={data?.content ?? ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData('content', e.target.value)} rows={5} placeholder={t('f.noteContentPlaceholder')} />
            </div>
          </>
        )
      case 'FAMILY':
        return (
          <>
            <div className="space-y-2">
              <Label>{t('f.relationship')}</Label>
              <Input value={data?.relationship ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('relationship', e.target.value)} placeholder="Spouse, Son, Daughter..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>{t('f.birthday')}</Label>
                <Input type="date" value={data?.birthday ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('birthday', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t('f.phone')}</Label>
                <Input value={data?.phone ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('phone', e.target.value)} placeholder="555-0123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('f.email')}</Label>
              <Input value={data?.email ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('email', e.target.value)} placeholder="family@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{t('f.notes')}</Label>
              <Textarea value={data?.notes ?? ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData('notes', e.target.value)} rows={2} />
            </div>
          </>
        )
      default: return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? t('dlg.editTitle') : t('dlg.addTitle')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('dlg.editDesc') : t('dlg.addDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>{t('dlg.title')}</Label>
            <Input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder={t('dlg.titlePlaceholder')} />
          </div>

          {renderFields()}

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">{t('dlg.shareWithFamily')}</p>
              <p className="text-xs text-muted-foreground">{t('dlg.shareDesc')}</p>
            </div>
            <Switch
              checked={privacy === 'SHARED'}
              onCheckedChange={(checked: boolean) => setPrivacy(checked ? 'SHARED' : 'PERSONAL')}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('dlg.cancel')}</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-teal-600 hover:bg-teal-700">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEdit ? t('dlg.update') : t('dlg.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
