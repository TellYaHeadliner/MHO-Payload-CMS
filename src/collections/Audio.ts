import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor';

export const Audio: CollectionConfig = {
  slug: 'audio',
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
    staticDir: 'media', // thư mục lưu file trên server (nếu không dùng cloud storage)
    mimeTypes: ['audio/*', 'audio/wav', 'audio/x-wav', 'audio/wave'],
    pasteURL: false
  },
}
