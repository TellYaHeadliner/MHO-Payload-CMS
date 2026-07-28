import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: ({ t: defaultT }) => defaultT('gallery:title_label'),
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: ({ t: defaultT }) => defaultT('gallery:description_label'),
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
          name: 'music',
          label: ({ t: defaultT }) => defaultT('gallery:music_label'),
          type: 'select',
          defaultValue: 'upload',
          options: [
            {
              label: ({ t: defaultT }) => defaultT('gallery:music_upload_label'),
              value: 'upload',
            },
            {
              label: ({ t: defaultT }) => defaultT('gallery:music_url_label'),
              value: 'url',
            },
          ],
        },
        {
          name: 'audioFile',
          type: 'upload',
          label: ({ t: defaultT }) => defaultT('gallery:music_upload_label'),
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.sourceType === 'upload',
          },
        },
        {
          name: 'spotifyUrl',
          label: ({ t: defaultT }) => defaultT('gallery:music_url_label'),
          type: 'text',
          admin: {
            description: 'Spotify URL',
            condition: (data, siblingData) => siblingData?.sourceType === 'url',
          },
        },
      ],
    },
  ],
}
