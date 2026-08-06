import { anyone } from '@/access/anyone';
import { isAdmin } from '@/access/isAdmin';
import { isLoggedIn } from '@/access/isLoggedIn';
import { CustomTranslationsKeys } from '@/custom-translations';
import { slugField } from '@/fields/slug-field';
import { is } from '@payloadcms/db-postgres/drizzle';
import { TFunction } from '@payloadcms/translations';
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'updatedAt'],
    group: 'Nội dung',
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
  timestamps: true,
}