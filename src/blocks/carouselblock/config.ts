import { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carousel',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels'
  },
  fields: [
    // ============================================
    // 1. SLIDES (nội dung từng slide)
    // ============================================
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      labels: { singular: 'Slide', plural: 'Slides' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
 
    // ============================================
    // 2. CAROUSEL BEHAVIOR (map trực tiếp sang Embla options)
    // ============================================
    {
      type: 'collapsible',
      label: 'Carousel Behavior',
      fields: [
        {
          name: 'loop',
          type: 'checkbox',
          defaultValue: true,
          label: 'Lặp vô hạn (loop)',
        },
        {
          name: 'align',
          type: 'select',
          defaultValue: 'start',
          options: [
            { label: 'Start', value: 'start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'end' },
          ],
        },
        {
          name: 'slidesToShow',
          type: 'select',
          defaultValue: '1',
          label: 'Số slide hiện cùng lúc (desktop)',
          options: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
          ],
        },
        {
          name: 'gap',
          type: 'number',
          defaultValue: 16,
          label: 'Khoảng cách giữa các slide (px)',
        },
        {
          name: 'dragFree',
          type: 'checkbox',
          defaultValue: false,
          label: 'Kéo tự do (không snap cứng)',
        },
        {
          name: 'effect',
          type: 'select',
          defaultValue: 'slide',
          options: [
            { label: 'Slide (trượt)', value: 'slide' },
            { label: 'Fade (mờ dần)', value: 'fade' },
          ],
        },
      ],
    },
 
    // ============================================
    // 3. AUTOPLAY
    // ============================================
    {
      type: 'collapsible',
      label: 'Autoplay',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'autoplayDelay',
          type: 'number',
          defaultValue: 6,
          label: 'Thời gian mỗi slide (giây)',
          admin: { condition: (_, sib) => sib.autoplay },
        },
        {
          name: 'stopOnInteraction',
          type: 'checkbox',
          defaultValue: false,
          label: 'Dừng hẳn khi user kéo tay',
          admin: { condition: (_, sib) => sib.autoplay },
        },
        {
          name: 'pauseOnHover',
          type: 'checkbox',
          defaultValue: true,
          admin: { condition: (_, sib) => sib.autoplay },
        },
      ],
    },
 
    // ============================================
    // 4. NAVIGATION UI (arrows, dots, counter, progress bar)
    // ============================================
    {
      type: 'collapsible',
      label: 'Navigation UI',
      fields: [
        {
          name: 'showArrows',
          type: 'checkbox',
          defaultValue: true,
          label: 'Hiện nút mũi tên prev/next',
        },
        {
          name: 'navigationStyle',
          type: 'select',
          defaultValue: 'counter',
          label: 'Kiểu hiển thị vị trí slide',
          options: [
            { label: 'Số đếm (01/02)', value: 'counter' },
            { label: 'Dots (chấm tròn)', value: 'dots' },
            { label: 'Progress bar', value: 'progress' },
            { label: 'Không hiện', value: 'none' },
          ],
        },
      ],
    },
 
    // ============================================
    // 5. LAYOUT / STYLE
    // ============================================
    {
      type: 'collapsible',
      label: 'Layout',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'hero',
          label: 'Loại carousel',
          options: [
            { label: 'Hero (full width, overlay text)', value: 'hero' },
            { label: 'Card slider (nhiều item, có border)', value: 'card' },
            { label: 'Logo wall (nhỏ, không overlay)', value: 'logo' },
          ],
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'full',
          admin: { condition: (_, sib) => sib.variant === 'hero' },
          options: [
            { label: 'Full screen', value: 'full' },
            { label: 'Large (85vh)', value: 'large' },
            { label: 'Medium (60vh)', value: 'medium' },
          ],
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          defaultValue: 70,
          min: 0,
          max: 100,
          admin: { condition: (_, sib) => sib.variant === 'hero' },
        },
      ],
    },
  ],
}