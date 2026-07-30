import type { Field } from 'payload'

// Group field SEO tái sử dụng cho Blog, Gallery, Home...
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'metaTitle', type: 'text', maxLength: 70 },
    { name: 'metaDescription', type: 'textarea', maxLength: 160 },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'noIndex', type: 'checkbox', defaultValue: false, label: 'Ẩn khỏi công cụ tìm kiếm' },
  ],
}