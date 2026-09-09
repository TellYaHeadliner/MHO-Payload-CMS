import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor';

export const Media: CollectionConfig = {
  slug: 'media',
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Bắt buộc cho SEO & accessibility' },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Hình ảnh chung', value: 'general' },
        { label: 'Blog', value: 'blog' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Logo / Branding', value: 'branding' },
      ],
      defaultValue: 'general',
    },
  ],
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'filesize', 'updatedAt'],
    group: 'Lưu trữ',
  },
  access: {
    read: anyone, // ảnh cần public để hiển thị ngoài site
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    disableLocalStorage: true,
    staticDir: 'media', // thư mục lưu file trên server (nếu không dùng cloud storage)
    mimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg', 'image/svg', 'image/webp', 'audio/*'],
    focalPoint: true,
    crop: true,
    pasteURL: false
  },
}
