import type { GlobalConfig } from 'payload'
import { anyone, isAdmin } from '../access'

export const SiteSetting: GlobalConfig = {
  slug: 'site-setting',
  label: 'Cấu hình chung',
  admin: { group: 'Trang tĩnh' },
  access: {
    read: anyone,
    update: isAdmin, // chỉ admin được sửa cấu hình toàn site
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Thương hiệu',
          fields: [
            { name: 'siteName', type: 'text', required: true },
            { name: 'tagline', type: 'text' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Liên hệ',
          fields: [
            { name: 'contactEmail', type: 'email' },
            { name: 'contactPhone', type: 'text' },
            { name: 'address', type: 'textarea' },
            {
              name: 'workingHours',
              type: 'text',
              admin: { description: 'VD: Thứ 2 - Thứ 6, 8:00 - 17:00' },
            },
          ],
        },
        {
          label: 'Mạng xã hội',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: ['facebook', 'instagram', 'youtube', 'tiktok', 'zalo', 'linkedin'],
                  required: true,
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Analytics & SEO mặc định',
          fields: [
            { name: 'googleAnalyticsId', type: 'text' },
            { name: 'defaultMetaTitle', type: 'text' },
            { name: 'defaultMetaDescription', type: 'textarea' },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Bảo trì',
          fields: [
            {
              name: 'maintenanceMode',
              type: 'checkbox',
              defaultValue: false,
              label: 'Bật chế độ bảo trì (ẩn site với public)',
            },
            {
              name: 'maintenanceMessage',
              type: 'textarea',
              admin: { condition: (_, siblingData) => siblingData?.maintenanceMode },
            },
          ],
        },
      ],
    },
  ],
}