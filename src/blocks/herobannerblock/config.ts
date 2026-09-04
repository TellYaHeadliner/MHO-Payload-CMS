import { Block } from 'payload'

export const HeroBannerBlock: Block = {
  slug: 'herobanner',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners'
  },
  interfaceName: 'HeroBannerBlock',
  fields: [
      {
      name: 'slides',
      type: 'array',
      maxRows: 1,
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Text nhỏ phía trên title',
          admin: { placeholder: 'vd: 1ST MINI ALBUM' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { placeholder: 'vd: COLLECTION: DAWN' },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          admin: { placeholder: 'Mô tả ngắn 1-2 dòng' },
        },
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'VIEW CONCEPT' },
            { name: 'url', type: 'text'},
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
 
    // --- Overlay gradient (top sáng -> bottom tối) ---
    {
      name: 'overlayStyle',
      type: 'select',
      options: [
        { label: 'Gradient (tối dần từ dưới lên)', value: 'gradient-bottom' },
        { label: 'Flat overlay', value: 'flat' },
        { label: 'None', value: 'none' },
      ],
      defaultValue: 'gradient-bottom',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 70,
      min: 0,
      max: 100,
      admin: {
        condition: (_, siblingData) => siblingData.overlayStyle !== 'none',
        description: 'Độ đậm của overlay/gradient tại điểm tối nhất (%)',
      },
    },
 
    // --- Layout & content position ---
    {
      name: 'contentAlignment',
      type: 'select',
      options: [
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
      defaultValue: 'bottom-left',
    },
  ]
}