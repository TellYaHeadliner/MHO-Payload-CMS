// utilities/formatSlug.ts
import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase()

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    // If the user typed a custom slug, format it safely
    if (typeof value === 'string' && value?.trim()) {
      return format(value)
    }

    // On creation, if no slug is provided, generate it from the fallback field (e.g., 'title')
    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }
