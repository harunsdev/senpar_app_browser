export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createSchema = z.object({
  category: z.enum(['PASSWORD', 'DEVICE', 'SUBSCRIPTION', 'NOTE', 'FAMILY']),
  title: z.string().min(1),
  data: z.record(z.any()),
  privacy: z.enum(['PERSONAL', 'SHARED']).default('PERSONAL'),
})

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const category = url.searchParams.get('category')
  const search = url.searchParams.get('search')

  const where: any = {
    OR: [
      { userId: session.user.id },
      { privacy: 'SHARED' },
    ],
  }
  if (category) where.category = category
  if (search) where.title = { contains: search, mode: 'insensitive' }

  const entries = await prisma.vaultEntry.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  })
  return NextResponse.json(entries)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors?.[0]?.message ?? 'Invalid input' }, { status: 400 })
    }
    const entry = await prisma.vaultEntry.create({
      data: {
        userId: session.user.id,
        category: parsed.data.category,
        title: parsed.data.title,
        data: parsed.data.data,
        privacy: parsed.data.privacy,
      },
    })
    return NextResponse.json(entry, { status: 201 })
  } catch (err: any) {
    console.error('Create vault entry error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
