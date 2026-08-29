// blocks/Content/Component.tsx
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = ({ richText }) => {
  if (!richText) return null

  return (
    <div className="container max-w-7xl mx-auto px-3 my-6 md:px-5 pb-4">
      <RichText 
        data={richText} 
        className="text-white"
      />
    </div>
  )
}