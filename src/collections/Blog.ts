import { ContentBlock } from '../blocks/contentblock/config';
import type { CollectionConfig } from 'payload'
import type { TFunction } from '@payloadcms/translations'

import { CustomTranslationsKeys } from '@/custom-translations'
import { slugField } from '@/fields/slug-field';
import { isAdminOrEditor } from '@/access/isAdminOrEditor';
import { isAdmin } from '@/access/isAdmin';
import { MarqueeBlock } from '@/blocks/marqueeblock/config';
import { GalleryBlock } from '@/blocks/galleryblock/config';


export const Blog: CollectionConfig = {
  slug: 'blog',
  // Chỉ có 2 role admin / editor
  access: {
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    components: {
      edit: {
        PreviewButton: '@/components/admin/button-live-preview',
      },
    },
    group: 'Nội dung',
  },
  versions: {
    drafts: {
      autosave: true,
      validate: false
    },
    maxPerDoc: 50
  },
  fields: [

    {
      name: 'title',
      type: 'text',
      label: "Tiêu đề bài viết",
      required: true,
    },
    slugField('title'),
    {
      name: 'imageBlog',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Ảnh sẽ đại diện trên danh sách blog'
      }
    },
    {
      name: 'description',
      type: 'text',
      label: "Nội dung miêu tả",
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
    {
      name: 'layout',
      type: 'blocks',
      admin: {
        position: "main",
        description: "Nơi sắp xếp section của page"
      },
      blocks: [
        ContentBlock,
        MarqueeBlock,
        GalleryBlock
      ],
    },
  ],
}
