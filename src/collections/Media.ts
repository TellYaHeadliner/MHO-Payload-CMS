import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'
import type { CollectionConfig } from 'payload'

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
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  upload: {
    staticDir: 'media', // thư mục lưu file trên server (nếu không dùng cloud storage)
    // Check sau
    // imageSizes: [
    //   { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
    //   { name: 'card', width: 640, height: 480, position: 'centre' },
    //   { name: 'og', width: 1200, height: 630, position: 'centre' }, // dùng cho social share
    // ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'audio/mp3'],
    focalPoint: true,
    timestamps: true
  },
}
