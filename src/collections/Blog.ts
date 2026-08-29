import { ContentBlock } from '../blocks/contentblock/config';
import type { CollectionConfig } from 'payload'
import type { TFunction } from '@payloadcms/translations'

import { CustomTranslationsKeys } from '@/custom-translations'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields/slug-field';
import { isAdminOrEditor } from '@/access/isAdminOrEditor';
import { isAdmin } from '@/access/isAdmin';
import { MarqueeBlock } from '@/blocks/marqueeblock/config';
import { HeroBanner } from '@/blocks/herobanner/config';
import { GalleryBlock } from '@/blocks/galleryblock/config';
import { CarouselBlock } from '@/blocks/carouselblock/config';

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
      localized: true,
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
      localized: true
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
