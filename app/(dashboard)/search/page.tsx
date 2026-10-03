import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { SearchResults } from './_components/search-results'

export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? '').trim()

  const session = await auth()
  const userId = session?.user?.id ?? ''

  let results: any[] = []

  if (query) {
    const entries = await prisma.vaultEntry.findMany({
      where: {
        OR: [{ userId }, { privacy: 'SHARED' }],
      },
      orderBy: { updatedAt: 'desc' },
    })

    const lower = query.toLowerCase()

    results = (entries ?? [])
      .filter((e: any) => {
        const dataValues = Object.values(e?.data ?? {})
          .filter((v) => typeof v === 'string' || typeof v === 'number')
          .map(String)
          .join(' ')
        const haystack = [e?.title ?? '', e?.category ?? '', dataValues]
          .join(' ')
          .toLowerCase()
        return haystack.includes(lower)
      })
      .map((e: any) => ({
        id: e.id,
        title: e.title,
        category: e.category,
        privacy: e.privacy,
        data: e.data,
        updatedAt: e.updatedAt?.toISOString?.() ?? '',
      }))
  }

  return <SearchResults query={query} results={results} />
}
