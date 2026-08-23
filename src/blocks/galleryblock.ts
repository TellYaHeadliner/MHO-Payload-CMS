import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'images',
      type: 'group',
      label: 'Hình ảnh',
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
          label: 'Chú thích',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt text',
          admin: {
            description: 'Dùng cho SEO và accessibility',
          },
        },
      ],
    },
  ],
}