// components/Media/index.tsx
import React from 'react'
import Image from 'next/image'
import type { Media as MediaType } from '@/payload-types'

type MediaProps = {
  media: MediaType | string | null | undefined | number
  alt?: string
  className?: string
  imgClassName?: string
  fill?: boolean
  sizes?: string
}

export const Media: React.FC<MediaProps> = ({
  media,
  alt,
  className,
  imgClassName,
  fill = false,
  sizes,
}) => {
  // Nếu chưa populate (chỉ là ID string), không có gì để render
    if (!media || typeof media === 'string' || typeof media === 'number') return null

  const { url, width, height, alt: mediaAlt } = media
  if (!url) return null

  const resolvedAlt = alt || mediaAlt || ''

  return (
    <div className={className}>
      {fill ? (
        <Image
          src={url}
          alt={resolvedAlt}
          fill
          width={width ?? 800}
          height={height ?? 600}
          className={imgClassName ?? 'object-cover'}
        />
      ) : (
        <Image
          src={url}
          alt={resolvedAlt}
          width={width ?? 800}
          height={height ?? 600}
          className={imgClassName ?? 'w-full h-auto'}
        />
      )}
    </div>
  )
}