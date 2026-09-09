import type { GlobalConfig  } from 'payload'

import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn';

export const Home: GlobalConfig  = {
  slug: 'home',
  label: 'Home Page',
  admin: { 
    group: 'Nội dung',
    description: 'Nội dung hiển thị ở trang chủ (hero, social links, danh mục điều hướng). Chỉ 1 bản ghi duy nhất.',
  },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  versions: false,
    fields: [
    // ---------- SECTION: HERO ----------
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: true   },
      fields: [
        {
          name: 'background',
          type: 'group',
          label: 'Background',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                { label: 'Ảnh', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
              defaultValue: 'image',
              admin: { layout: 'horizontal' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { condition: (_, sibling) => sibling?.type === 'image' },
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              admin: { condition: (_, sibling) => sibling?.type === 'video' },
            },
            {
              name: 'overlayOpacity',
              type: 'number',
              min: 0,
              max: 100,
              defaultValue: 30,
              admin: { description: 'Độ tối lớp phủ (0-100%) để chữ dễ đọc' },
            },
          ],
        },
        {
          name: 'titleRegular',
          type: 'text',
          required: true,
          defaultValue: 'myhealing',
          admin: { description: 'Phần chữ đứng (không in nghiêng)' },
        },
        {
          name: 'titleItalic',
          type: 'text',
          defaultValue: 'osh',
          admin: { description: 'Phần chữ in nghiêng, ghép liền vào cuối titleRegular' },
        },
      ],
    },
 
    // ---------- SECTION: SOCIAL LINKS ----------
    {
      type: 'collapsible',
      label: 'Social Links',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'socialLinks',
          type: 'array',
          labels: { singular: 'Social Link', plural: 'Social Links' },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'X / Twitter', value: 'twitter' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
 
    // ---------- SECTION: NAVIGATION (các nút Album Concept, Collab, Freebies...) ----------
    {
      type: 'collapsible',
      label: 'Navigation',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'navCategories',
          type: 'relationship',
          relationTo: 'gallery',
          hasMany: true,
          required: true,
          admin: {
            description: 'Chọn các category hiển thị làm nút trên Home, kéo thả để sắp xếp thứ tự',
          },
        },
      ],
    },
  ],
}