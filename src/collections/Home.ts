import type { GlobalConfig } from 'payload'
import { anyone, isLoggedIn } from '../access'
import { seoField } from '../fields/seo'

// Global vì trang chủ chỉ có DUY NHẤT 1 bản ghi nội dung.
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Trang chủ',
  admin: { group: 'Trang tĩnh' },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroTitle', type: 'text', required: true },
            { name: 'heroSubtitle', type: 'textarea' },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              name: 'heroButtons',
              type: 'array',
              maxRows: 2,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Giới thiệu',
          fields: [
            { name: 'aboutTitle', type: 'text' },
            { name: 'aboutContent', type: 'textarea' },
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Nội dung nổi bật',
          fields: [
            {
              name: 'featuredPosts',
              type: 'relationship',
              relationTo: 'blog',
              hasMany: true,
              maxRows: 6,
              admin: { description: 'Chọn bài viết hiển thị ở trang chủ' },
            },
            {
              name: 'featuredGallery',
              type: 'relationship',
              relationTo: 'gallery',
              hasMany: true,
              maxRows: 6,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}