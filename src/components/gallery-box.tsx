'use client'
import { cn } from '@/utils/cn';
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { type Gallery, type Media } from "@/payload-types"

type GalleryImages = NonNullable<Gallery['images']>;
type GalleryImageItem = GalleryImages[number];

interface GalleryProps {
  images: GalleryImages | undefined | null;
  classImage?: string;
}

export const GalleryLightbox: React.FC<GalleryProps> = ({ images, classImage }) => {
  const [activeImage, setActiveImage] = useState<Media | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string | number>>(new Set())
  const [lightboxLoaded, setLightboxLoaded] = useState(false)

  const closeLightbox = useCallback((): void => {
    setActiveImage(null)
  }, [])

  const handleImageLoad = useCallback((id: string | number) => {
    setLoadedImages((prev) => new Set(prev).add(id))
  }, [])

  const openLightbox = useCallback((media: Media) => {
    setLightboxLoaded(false)
    setActiveImage(media)
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
      {images?.map((img, idx) => {
        const media = getMedia(img)
        if (!media?.url) return null

        return (
          <div
            key={img.id ?? idx}
            className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
            onClick={() => setActiveImage(media)}
          >
            {/* Skeleton */}
            {!loadedImages.has(img.id ?? idx) && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}

            <Image
              src={media.url}
              alt={img.altText ?? img.caption ?? media.alt ?? ''}
              width={Number(media.width)}
              height={Number(media.height)}
              loading="eager"
              onLoad={() => handleImageLoad(img.id ?? idx)}
              className={cn(
                'gallery-image cursor-pointer w-full h-auto transition-transform duration-400 ease-in-out group-hover:scale-[1.03] group-hover:opacity-90 select-none',
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
          {!lightboxLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-800" />
          )}

          <div className="relative w-[92vw] h-[92vh]">
            <Image
              src={activeImage.url}
              alt="Enlarged view"
              fill
              sizes="92vw"
              onLoad={() => setLightboxLoaded(true)}
              className="object-contain select-none transition-opacity duration-300"
            />
          </div>
        </div>
      )}
    </>
  )
}