import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { slugField } from '@/fields/slug-field'
import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'updatedAt', 'slug', 'status'],
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    components: {
      edit: {
        PreviewButton: '@/components/admin/button-live-preview',
      },
    },
    group: "Nội dung"
  },
  versions: {
    drafts: {
      autosave: true,
      validate: false
    },
    maxPerDoc: 50
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: "Nội dung bài viết",
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: "Miêu tả bài viết",
    },
    slugField('title'),
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'altText',
          type: 'text',
        },
      ],
    },
    {
      name: 'music',
      type: 'group',
      fields: [
        {
          name: 'sourceType', // 👈 đổi từ 'music' thành 'sourceType'
          label: "Loại audio sẽ xuất hiện",
          type: 'select',
          defaultValue: 'upload',
          options: [
            {
              label: "Audio có sẵn",
              value: 'upload',
            },
            {
              label: "Link spotify",
              value: 'url',
            },
          ],
        },
        {
          name: 'audioFile',
          type: 'upload',
          label: "Audio có sẵn",
          relationTo: 'audio',
          admin: {
            condition: (data, siblingData) => siblingData?.sourceType === 'upload', // ✅ khớp tên
          },
        },
        {
          name: 'spotifyUrl',
          label: "Link Spotify",
          type: 'text',
          admin: {
            description: 'Spotify URL',
            condition: (data, siblingData) => siblingData?.sourceType === 'url', // ✅ khớp tên
          },
        },
      ],
    },
  ],
}
