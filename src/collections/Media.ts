import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    create: ({ req: { user } }) => Boolean(user?.role === 'admin' || user?.role === 'editor'),
    update: ({ req: { user } }) => Boolean(user?.role === 'admin' || user?.role === 'editor'),
    delete: ({ req: { user } }) => Boolean(user?.role === 'admin'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
