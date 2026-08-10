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
    group: 'Nội dung',
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
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre'
      },
      {
        name: 'card',
        width: 700,
        height: 1024,
        position: 'center'
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre'
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg','image/svg', 'image/webp','audio/mp3'],
    focalPoint: true,
    crop: true,
    pasteURL: false
  },
}
