'use client'
import { cn } from '@/utils/cn';
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { type Gallery, type Media } from "@/payload-types"

type GalleryImages = NonNullable<Gallery['images']>;
type GalleryImageItem = GalleryImages[number];

interface GalleryProps {
  images: GalleryImages;
  classImage?: string;
}

export const GalleryLightbox: React.FC<GalleryProps> = ({ images, classImage }) => {
  const [activeImage, setActiveImage] = useState<Media | null>(null)

  const closeLightbox = useCallback((): void => {
    setActiveImage(null)
  }, [])

  useEffect(() => {
    if (!activeImage) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage, closeLightbox])

  const getMedia = (img: GalleryImageItem): Media | null => {
    if (typeof img.image === 'object' && img.image !== null) {
      return img.image as Media
    }
    return null
  }

  return (
    <>
      {/* Grid Hình ảnh */}
      {images.map((img, idx) => {
        const media = getMedia(img)
        console.log(media)
        if (!media?.url) return null

        return (
          <div
            key={img.id ?? idx}
            className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
            onClick={() => setActiveImage(media)}
          >
            <Image
              src={media.url}
              alt={img.altText ?? img.caption ?? media.alt ?? ''}
              width={Number(media.width)}
              height={Number(media.height)}
              loading="lazy"
              className={cn(
                'gallery-image w-full h-auto transition-transform duration-400 ease-in-out group-hover:scale-[1.03] group-hover:opacity-90 select-none',
                classImage
              )}
            />
          </div>
        )
      })}

      {/* Lightbox Modal */}
      {activeImage?.url && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-[92vw] h-[92vh]">
            <Image
              src={activeImage.url}
              alt="Enlarged view"
              fill
              sizes="92vw"
              className="object-contain select-none"
            />
          </div>
        </div>
      )}
    </>
  )
}