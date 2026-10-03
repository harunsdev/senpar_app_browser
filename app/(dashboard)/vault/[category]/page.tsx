import { auth } from '@/auth'
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories'
import { notFound } from 'next/navigation'
import { VaultCategoryView } from './_components/vault-category-view'

export const dynamic = 'force-dynamic'

export default async function VaultCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const session = await auth()
  const { category: slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) notFound()

  return <VaultCategoryView categoryKey={cat.key} categorySlug={cat.slug} />
}
