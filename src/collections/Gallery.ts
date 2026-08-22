import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { TFunction } from '@payloadcms/translations'
import { slugField } from '@/fields/slug-field'
import { CustomTranslationsKeys } from '@/custom-translations'
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
    defaultColumns: ['title', 'description', 'updatedAt', 'slug'],
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    components: {
      edit: {
        PreviewButton: '@/components/admin/button-live-preview',
      },
    },
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
          relationTo: 'audio',
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
