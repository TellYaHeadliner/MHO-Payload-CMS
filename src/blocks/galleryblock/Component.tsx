// blocks/Gallery/Component.tsx
import React from 'react'
import { Media } from '@/components/media'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ images }) => {
  if (!images?.length) return null

  return (
    <div className="max-w-7xl mx-auto px-3 my-6 md:px-5 pb-4">
      <div className="flex flex-wrap">
        {images.map((item, i) => (
          <figure key={item.id ?? i} className="overflow-hidden rounded-lg">
            <Media
              media={item.image}
              alt={String(item.alt)}
              imgClassName="w-full h-auto object-cover"
            />
            {item.caption && (
              <figcaption className="mt-2 text-md text-gray-500 text-center">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}