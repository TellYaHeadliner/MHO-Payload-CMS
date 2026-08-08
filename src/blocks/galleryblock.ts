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
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề gallery',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Lưới (Grid)', value: 'grid' },
        { label: 'Carousel/Slider', value: 'carousel' },
        { label: 'Masonry', value: 'masonry' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 cột', value: '2' },
        { label: '3 cột', value: '3' },
        { label: '4 cột', value: '4' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.layout !== 'carousel',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Hình ảnh',
      minRows: 1,
      maxRows: 20,
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