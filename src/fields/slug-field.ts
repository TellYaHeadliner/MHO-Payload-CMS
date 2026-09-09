// fields/slug.ts
import type { Field } from 'payload'
import { formatSlug } from '@/utils/formatSlug'
import { TFunction } from '@payloadcms/translations';
import { CustomTranslationsKeys } from '@/custom-translations';

type SlugFieldFactory = (fallbackField?: string) => Field

export const slugField: SlugFieldFactory = (fallbackField = 'title') => ({
  name: 'slug',
  type: 'text',
  label: "Slug",
  required: true,
  unique: true, // Ensures DB indexing and optimization
  index: true, // Speeds up lookups
  admin: {
    description: 'Auto-generated from the title if left blank.',
    components: {
      Field: "@/components/admin/slug-field-with-button",
    }
  },
  hooks: {
    beforeChange: [formatSlug(fallbackField)],
  },
})
