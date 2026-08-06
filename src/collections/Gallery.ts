import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { TFunction } from '@payloadcms/translations'
import type { CollectionConfig } from 'payload'
import { CustomTranslationsKeys } from '@/custom-translations'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>
        return t('gallery:title_label')
      },
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>
        return t('gallery:description_label')
      },
    },
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
          label: ({ t: defaultT }) => {
            const t = defaultT as TFunction<CustomTranslationsKeys>
            return t('gallery:music_label')
          },
          type: 'select',
          defaultValue: 'upload',
          options: [
            {
              label: ({ t: defaultT }) => {
                const t = defaultT as TFunction<CustomTranslationsKeys>
                return t('gallery:music_upload_label')
              },
              value: 'upload',
            },
            {
              label: ({ t: defaultT }) => {
                const t = defaultT as TFunction<CustomTranslationsKeys>
                return t('gallery:music_url_label')
              },
              value: 'url',
            },
          ],
        },
        {
          name: 'audioFile',
          type: 'upload',
          label: ({ t: defaultT }) => {
            const t = defaultT as TFunction<CustomTranslationsKeys>
            return t('gallery:music_upload_label')
          },
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.sourceType === 'upload', // ✅ khớp tên
          },
        },
        {
          name: 'spotifyUrl',
          label: ({ t: defaultT }) => {
            const t = defaultT as TFunction<CustomTranslationsKeys>
            return t('gallery:music_url_label')
          },
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
