'use client'
import React, { useState, useEffect, useCallback } from 'react'

// 1. Định nghĩa Type cho dữ liệu ảnh
export interface GalleryImage {
  id: string | number
  src: string
  alt: string
}

interface LightboxGalleryProps {
  images: GalleryImage[]
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({ images }) => {
  // State lưu URL ảnh đang mở (null = đang đóng Lightbox)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // --- Hàm tương đương openLightbox(src) ---
  const openLightbox = (src: string): void => {
    setActiveImage(src)
  }

  // --- Hàm tương đương closeLightbox() ---
  const closeLightbox = useCallback((): void => {
    setActiveImage(null)
  }, [])

  // --- Tự động quản lý Khóa Scroll & Bấm phím Esc ---
  useEffect(() => {
    // Nếu không mở ảnh thì không làm gì cả
    if (!activeImage) return

    // Đóng khi bấm phím Escape (Esc)
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    // Khóa cuộn trang (Tương đương: document.body.style.overflow = 'hidden')
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    // Clean-up function: Tự động chạy khi đóng ảnh (activeImage về null)
    // (Tương đương: document.body.style.overflow = '')
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage, closeLightbox])

  return (
    <>
      {/* Danh sách ảnh trong Gallery */}
      <div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/95 p-4 cursor-zoom-out">
        {images.map((img) => (
          <div
            key={img.id}
            className="group overflow-hidden rounded-sm cursor-pointer"
            onClick={() => openLightbox(img.src)} // Gọi hàm mở Lightbox
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto transition-transform duration-400 group-hover:scale-[1.03] group-hover:opacity-90 select-none"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Chỉ render khi activeImage có giá trị) */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          onClick={closeLightbox} // Click ra ngoài nền đen để đóng
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
