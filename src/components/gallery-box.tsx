'use client'
import { cn } from '@/utils/cn';
import React, { useState, useEffect, useCallback } from 'react'

export interface GalleryItem {
  id: string | number
  src: string
  alt: string
}

interface GalleryProps {
  images: GalleryItem[]
  classImage?: string;
}

export const GalleryLightbox: React.FC<GalleryProps> = ({ images, classImage }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null)

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

    // Lock scroll body khi mở modal
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage, closeLightbox])

  return (
    <>
      {/* Grid Hình ảnh */}
      {images.map((img) => (
        <div
          key={img.id}
          className="group overflow-hidden rounded-sm cursor-pointer"
          onClick={() => setActiveImage(img.src)}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className={cn('gallery-image w-full h-auto transition-transform duration-400 ease-in-out group-hover:scale-[1.03] group-hover:opacity-90 select-none', classImage)}
          />
        </div>
      ))}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={activeImage}
            alt="Enlarged view"
            className="max-h-[92vh] max-w-[92vw] object-contain select-none"
          />
        </div>
      )}
    </>
  )
}
