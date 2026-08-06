import { adminOnly } from '@/access/adminOnly';
import { isAdmin } from '@/access/isAdmin';
import { link } from '@/fields/link';
import { AppRenderSpan } from 'next/dist/server/lib/trace/constants';
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'logo',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 7,
    },
  ],
}