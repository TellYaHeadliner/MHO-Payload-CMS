import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import type { Header, Gallery } from '@/payload-types'

export const getHeader = unstable_cache(
  async (): Promise<Header> => {
    const payload = await getPayload({ config })
    // depth: 1 là đủ, vì galleryItem chỉ cần populate 1 tầng để lấy title/slug
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 1,
    })
    return header
  },
  ['global_header'],
  {
    tags: ['global_header'],
  },
)

export type GalleryLink = {
  href: string
  label: string
}

// Type khớp đúng với field mới: galleryItem: (number | Gallery)[]
// - "number" khi Payload chưa populate (chưa đủ depth) -> phải lọc bỏ
// - "Gallery" khi đã populate -> lấy title/slug để build href
export const mapGalleryLinks = (galleryItem: Header['galleryItem']): GalleryLink[] => {
  if (!galleryItem) return []

  return galleryItem.reduce<GalleryLink[]>((acc, item) => {
    // Bỏ qua nếu chưa populate (chỉ còn là id dạng number)
    if (typeof item !== 'object' || item === null) return acc

    const doc = item as Gallery

    // slugField có thể null/rỗng nếu bài chưa được đặt slug -> bỏ qua để tránh href lỗi
    if (!doc.slug) return acc

    acc.push({
      href: `/${doc.slug}`,
      label: doc.title,
    })

    return acc
  }, [])
}