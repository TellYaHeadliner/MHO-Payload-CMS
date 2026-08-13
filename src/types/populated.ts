import type { Home, Media, Gallery } from '@/payload-types'

// Ép các field union number|Media thành Media (đã populate)
export type PopulatedHome = Home & {
  background?: {
    type?: ('image' | 'video') | null
    image?: Media | null
  }
  navCategories: Gallery[];
}
