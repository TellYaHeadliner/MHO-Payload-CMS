import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery Blocks',
  },
  admin: {
    disableBlockName: true, // ẩn ô "blockName" và chữ Untitled đi kèm
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Hình ảnh',
      maxRows: 1,
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