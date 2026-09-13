'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { GalleryLink } from '@/utils/getHeader'

type MobileNavProps = {
  galleryItems: GalleryLink[]
  pushContent?: boolean
}

const MobileNav = ({ galleryItems, pushContent = false }: MobileNavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isPushContent, setIsPushContent] = useState<boolean>(pushContent)

  const openNav = () => {
    setMobileOpen((prev) => !prev);
    setIsPushContent((prev) => !prev)
  }
  return (
    <>
      <button
        className="md:hidden absolute top-3 right-5 text-white shrink-0"
        onClick={openNav}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <X className="w-6 h-6" strokeWidth={1.5} />
        ) : (
          <Menu className="w-6 h-6" strokeWidth={1.5} />
        )}
      </button>

      <div
        className={`md:hidden z-9999 left-0 right-0 max-h-[calc(100dvh-4rem)] bg-black overflow-y-auto overscroll-contain border-t border-white/10 ${
          isPushContent
            ? `relative transition-[max-height] duration-300 ease-in-out ${mobileOpen ? 'max-h-[calc(100dvh-4rem)]' : 'max-h-0 border-t-0'}`
            : `absolute top-full transition-[opacity,transform,visibility] duration-200 ease-in-out ${
                mobileOpen
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible pointer-events-none -translate-y-2 border-t-0 opacity-0'
              }`
        }`}
      >
        <div className="px-5 py-2 flex flex-col">
          {galleryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white text-sm uppercase tracking-wider py-3 border-b border-white/5 last:border-b-0 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default MobileNav
