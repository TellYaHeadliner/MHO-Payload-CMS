'use client'

// Requires: embla-carousel-react, embla-carousel-autoplay
// npm i embla-carousel-react embla-carousel-autoplay
//
// Adjust this import to wherever your Payload config generates types.
import type { HeroBannerBlock as HeroBannerBlockType, Media } from '@/payload-types'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { MoveLeft, MoveRight } from 'lucide-react'

// `slides` on the generated type is `{...}[] | null | undefined`.
// Pull the element type back out instead of redeclaring it (and never wrap it in `[...]`,
// that makes it a 1-tuple, which is what caused the earlier type error).
type HeroSlide = NonNullable<HeroBannerBlockType['slides']>[number]

export type HeroBannerBlockProps = Omit<HeroBannerBlockType, 'id' | 'blockName' | 'blockType'>

const AUTOPLAY_DELAY_MS = 6000

function getImageUrl(image: HeroSlide['backgroundImage']): string | undefined {
  if (!image) return undefined
  if (typeof image === 'number') return undefined // unpopulated relation — depth:0 fetch
  return (image as Media).url ?? undefined
}

function getImageAlt(image: HeroSlide['backgroundImage'], fallback?: string | null): string {
  if (image && typeof image !== 'number') {
    const alt = (image as Media).alt
    if (alt) return alt
  }
  return fallback ?? ''
}

const CONTENT_ALIGNMENT_CLASSES: Record<string, string> = {
  'bottom-left': 'items-start justify-end text-left pb-16',
  center: 'items-center justify-center text-center',
  left: 'items-start justify-center text-left',
}

export function HeroBannerBlock({
  slides,
  overlayStyle = 'gradient-bottom',
  overlayOpacity = 70,
  contentAlignment = 'bottom-left',
}: HeroBannerBlockProps) {
  const safeSlides = useMemo(() => slides ?? [], [slides])

  const plugins = useMemo(
    () => [Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnMouseEnter: true })],
    [],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [snapList, setSnapList] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setSnapList(emblaApi.scrollSnapList())
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  if (!safeSlides.length) return null

  const alignmentClass = CONTENT_ALIGNMENT_CLASSES[contentAlignment ?? 'bottom-left']

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {safeSlides.map((slide, i) => {
            const url = getImageUrl(slide.backgroundImage)
            const alt = getImageAlt(slide.backgroundImage, slide.title)

            return (
              <div key={slide.id ?? i} className="relative flex-[0_0_100%] min-w-0 h-full">
                {url ? (
                  <img src={url} alt={alt} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                )}

                {overlayStyle === 'gradient-bottom' && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, rgba(0,0,0,${(overlayOpacity ?? 70) / 100}) 0%, rgba(0,0,0,0) 60%)`,
                    }}
                  />
                )}
                {overlayStyle === 'flat' && (
                  <div
                    className="absolute inset-0 bg-black pointer-events-none"
                    style={{ opacity: (overlayOpacity ?? 70) / 100 }}
                  />
                )}

                <div
                  className={`absolute inset-0 flex flex-col px-[20px] md:px-[40px] max-w-[1280px] mx-auto ${alignmentClass}`}
                >
                  {slide.eyebrow && (
                    <span className="font-mono text-[12px] leading-[16px] tracking-[0.1em] font-medium text-[#888888] mb-4">
                      {slide.eyebrow}
                    </span>
                  )}
                  <h2 className="text-white text-[40px] md:text-[64px] leading-[1.05] font-semibold max-w-[720px] mb-4">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className="text-[#cccccc] text-[16px] leading-[24px] max-w-[540px] mb-6">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.button?.url && slide.button?.label && (
                    <a
                      href={slide.button.url}
                      target={slide.button.openInNewTab ? '_blank' : undefined}
                      rel={slide.button.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="inline-flex w-fit items-center border border-white/40 text-white px-6 py-3 text-[14px] tracking-[0.05em] hover:bg-white hover:text-black transition-colors"
                    >
                      {slide.button.label}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {safeSlides.length > 1 && (
        <>
          <div className="absolute bottom-8 right-[20px] md:right-[40px] z-10 flex space-x-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <MoveLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <MoveRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-8 left-[20px] md:left-[40px] z-10 flex items-center space-x-2">
            {snapList.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === selectedIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HeroBannerBlock