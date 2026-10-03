export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  data: z.record(z.any()).optional(),
  privacy: z.enum(['PERSONAL', 'SHARED']).optional(),
})

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const entry = await prisma.vaultEntry.findUnique({ where: { id } })
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (entry.userId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const body = await req.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors?.[0]?.message ?? 'Invalid input' }, { status: 400 })
    }
    const updated = await prisma.vaultEntry.update({
      where: { id },
      data: parsed.data,
    })
    return NextResponse.json(updated)
  } catch (err: any) {
    console.error('Update vault entry error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const entry = await prisma.vaultEntry.findUnique({ where: { id } })
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (entry.userId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.vaultEntry.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
