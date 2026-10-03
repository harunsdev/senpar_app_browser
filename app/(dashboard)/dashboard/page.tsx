import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { DashboardContent } from './_components/dashboard-content'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id ?? ''

  const entries = await prisma.vaultEntry.findMany({
    where: {
      OR: [
        { userId },
        { privacy: 'SHARED' },
      ],
    },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  })

  const counts = {
    PASSWORD: 0,
    DEVICE: 0,
    SUBSCRIPTION: 0,
    NOTE: 0,
    FAMILY: 0,
  }
  for (const e of entries ?? []) {
    if (counts[e.category as keyof typeof counts] !== undefined) {
      counts[e.category as keyof typeof counts]++
    }
  }

  const recentEntries = (entries ?? []).slice(0, 8).map((e: any) => ({
    id: e.id,
    title: e.title,
    category: e.category,
    privacy: e.privacy,
    data: e.data,
    updatedAt: e.updatedAt?.toISOString?.() ?? '',
  }))

  return <DashboardContent counts={counts} recentEntries={recentEntries} />
}
