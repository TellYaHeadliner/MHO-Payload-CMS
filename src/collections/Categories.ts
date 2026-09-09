import { anyone } from '@/access/anyone';
import { isAdmin } from '@/access/isAdmin';
import { CustomTranslationsKeys } from '@/custom-translations';
import { slugField } from '@/fields/slug-field';
import { TFunction } from '@payloadcms/translations';
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'updatedAt'],
    group: 'Quản lý thể loại',
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
      label: "Bài viết",
      required: true,
      unique: true
    },
    slugField('title'),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: "Danh mục mẹ",
      admin: {
        description: 'Bỏ trống nếu đây là danh mục gốc',
      },
    },
  ],
  timestamps: true,
}