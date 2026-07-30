import type { GlobalConfig, Field } from 'payload'
import { anyone, isLoggedIn } from '../access'

// 1 menu item, cho phép link nội bộ (page) hoặc link ngoài (custom URL)
const navItem: Field = {
  name: 'items',
  type: 'array',
  labels: { singular: 'Mục menu', plural: 'Các mục menu' },
  fields: [
    { name: 'label', type: 'text', required: true },
    {
      name: 'linkType',
      type: 'radio',
      defaultValue: 'custom',
      options: [
        { label: 'Đường dẫn tuỳ chỉnh', value: 'custom' },
        { label: 'Bài viết Blog', value: 'blog' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData?.linkType === 'custom' },
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: 'blog',
      admin: { condition: (_, siblingData) => siblingData?.linkType === 'blog' },
    },
    { name: 'newTab', type: 'checkbox', defaultValue: false, label: 'Mở tab mới' },
  ],
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Điều hướng (Menu)',
  admin: { group: 'Trang tĩnh' },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Header', fields: [{ ...navItem, name: 'headerItems' }] },
        { label: 'Footer', fields: [{ ...navItem, name: 'footerItems' }] },
      ],
    },
  ],
}