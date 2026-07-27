import type { CollectionConfig } from 'payload'

export const AlbumConcept: CollectionConfig = {
  slug: 'album-concept',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text'
    },
    
  ],
}
