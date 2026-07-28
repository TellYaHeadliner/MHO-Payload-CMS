import { CustomTranslationsKeys } from '@/custom-translations';
import { slugField } from '@/fields/slug-field';
import { TFunction } from '@payloadcms/translations';
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
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
      unique: true
    },
    slugField('title'),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>
        return t('categories:parent_label')
      },
      admin: {
        description: 'Bỏ trống nếu đây là danh mục gốc',
      },
    },
  ],
}