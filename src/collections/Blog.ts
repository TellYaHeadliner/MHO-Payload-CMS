import type { CollectionConfig } from 'payload'
import type { TFunction } from '@payloadcms/translations'
import type { Field } from 'payload'

import { CustomTranslationsKeys } from "@/custom-translations"

export const Blog: CollectionConfig = {
  slug: 'blog',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>
        return t('createblog:title_label')
      },
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'conceptTheme',
      type: 'select',
      options: [
        {
          label: 'Minimalist',
          value: 'minimalist',
        },
        {
          label: 'Vintage',
          value: 'vintage',
        },
        {
          label: 'Dark Mood',
          value: 'dark-mood',
        },
        {
          label: 'Healing Nature',
          value: 'healing-nature',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'gallery',
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
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}