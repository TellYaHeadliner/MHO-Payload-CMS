import { Block } from 'payload'

export const HeroBanner: Block = {
  slug: 'herobanner',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners'
  },
  fields: [
      {
      name: 'slides',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Slide', plural: 'Slides' },
      admin: {
        description: 'Mỗi slide = 1 background + nội dung riêng. "01 / 02" ở dưới sẽ tự tính theo số lượng slide.',
      },
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
            { name: 'url', type: 'text', required: true },
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

 
    // --- Slideshow behavior ---
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'autoplayDuration',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData.autoplay,
        description: 'Số giây mỗi slide hiển thị trước khi tự chuyển',
      },
    },
 
    // --- Bottom navigation UI (counter + progress bar + arrows) ---
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: true,
      label: 'Hiện nút mũi tên prev/next',
    },
  ]
}