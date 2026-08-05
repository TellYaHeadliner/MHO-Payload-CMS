import type { CollectionConfig } from 'payload'
import type { TFunction } from '@payloadcms/translations'

import { CustomTranslationsKeys } from '@/custom-translations'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields/slug-field';

export const Blog: CollectionConfig = {
  slug: 'blog',
  // Chỉ có 2 role admin / editor
  access: {
    create: ({ req: { user } }) => Boolean(user?.role === 'admin' || user?.role === 'editor'),
    update: ({ req: { user } }) => Boolean(user?.role === 'admin' || user?.role === 'editor'),
    delete: ({ req: { user } }) => Boolean(user?.role === 'admin'),
  },
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
    slugField('title'),
    {
      name: 'description',
      type: 'text',
      required: true,
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>
        return t('createblog:description_label')
      },
    },
    {
      name: 'summary',
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>
        return t('createblog:summary_label')
      },
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
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
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
