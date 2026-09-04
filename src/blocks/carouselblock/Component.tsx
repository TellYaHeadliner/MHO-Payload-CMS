'use client'

// Requires: embla-carousel-react, embla-carousel-autoplay, embla-carousel-fade, lucide-react
// npm i embla-carousel-react embla-carousel-autoplay embla-carousel-fade

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { MoveLeft, MoveRight } from 'lucide-react'
import { Media } from '@/payload-types';

// ------------------------------------------------------------------
// Types — mirror the Payload `CarouselBlock` field config
// ------------------------------------------------------------------

type SlideLink = {
  label?: string | null
  url?: string | null
  openInNewTab?: boolean | null
}

type SlideImage = number | Media

export type CarouselSlide = {
  image: SlideImage
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  link?: SlideLink | null
  id?: string | null
}

export type CarouselBlockProps = {
  slides: CarouselSlide[] | null | undefined
  // Behavior
  loop?: boolean | null
  align?: 'start' | 'center' | 'end' | null
  slidesToShow?: '1' | '2' | '3' | '4' | null
  gap?: number | null
  dragFree?: boolean | null
  effect?: 'slide' | 'fade' | null
  // Autoplay
  autoplay?: boolean | null
  autoplayDelay?: number | null
  stopOnInteraction?: boolean | null
  pauseOnHover?: boolean | null
  // Navigation UI
  showArrows?: boolean | null
  navigationStyle?: 'counter' | 'dots' | 'progress' | 'none' | null
  // Layout
  variant?: 'hero' | 'card' | 'logo' | null
  height?: 'full' | 'large' | 'medium' | null
  overlayOpacity?: number | null
}

const HEIGHT_CLASSES: Record<string, string> = {
  full: 'h-screen',
  large: 'h-[85vh]',
  medium: 'h-[60vh]',
}

const BASIS_CLASSES: Record<string, string> = {
  '1': 'flex-[0_0_100%]',
  '2': 'flex-[0_0_85%] md:flex-[0_0_50%]',
  '3': 'flex-[0_0_85%] md:flex-[0_0_33.3333%]',
  '4': 'flex-[0_0_85%] md:flex-[0_0_25%]',
}

function isPopulatedMedia(image: SlideImage): image is Media {
  return typeof image === 'object' && image !== null
}

function getImageUrl(image?: SlideImage): string | undefined {
  if (image === undefined || image === null) return undefined
  if (!isPopulatedMedia(image)) return undefined // unpopulated relation (just an ID)
  return image.url ?? undefined
}

function getImageAlt(image: SlideImage | undefined, fallback?: string | null): string {
  if (image !== undefined && image !== null && isPopulatedMedia(image) && image.alt) {
    return image.alt
  }
  return fallback ?? ''
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

export function CarouselBlock({
  slides = [],
  loop = true,
  align = 'start',
  slidesToShow = '1',
  gap = 16,
  dragFree = false,
  effect = 'slide',
  autoplay = true,
  autoplayDelay = 6,
  stopOnInteraction = false,
  pauseOnHover = true,
  showArrows = true,
  navigationStyle = 'counter',
  variant = 'hero',
  height = 'full',
  overlayOpacity = 70,
}: CarouselBlockProps) {
  const plugins = useMemo(() => {
    const list: any[] = []
    if (autoplay) {
      list.push(
        Autoplay({
          delay: (autoplayDelay ?? 6) * 1000,
          stopOnInteraction: !!stopOnInteraction,
          stopOnMouseEnter: !!pauseOnHover,
        }),
      )
    }
    if (effect === 'fade') list.push(Fade())
    return list
  }, [autoplay, autoplayDelay, stopOnInteraction, pauseOnHover, effect])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: !!loop,
      align: align ?? 'start',
      dragFree: !!dragFree,
    },
    plugins,
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [progress, setProgress] = useState(0)

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  const onScroll = useCallback((api: NonNullable<typeof emblaApi>) => {
    setProgress(Math.min(1, Math.max(0, api.scrollProgress())))
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('scroll', onScroll)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
      emblaApi.off('scroll', onScroll)
    }
  }, [emblaApi, onSelect, onScroll])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  if (!slides?.length) return null

  const isHero = variant === 'hero'
  const basisClass = isHero ? 'flex-[0_0_100%]' : BASIS_CLASSES[slidesToShow ?? '1']

  const Arrows = () =>
    !showArrows ? null : (
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!loop && !canPrev}
          aria-label="Previous"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            isHero
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-[#222222] text-white hover:bg-[#0e0e0e]'
          }`}
        >
          <MoveLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!loop && !canNext}
          aria-label="Next"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            isHero
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-[#222222] text-white hover:bg-[#0e0e0e]'
          }`}
        >
          <MoveRight className="w-5 h-5" />
        </button>
      </div>
    )

  const Indicator = () => {
    if (navigationStyle === 'none' || slides.length <= 1) return null
    if (navigationStyle === 'counter') {
      return (
        <span className="font-mono text-[12px] tracking-[0.1em] text-[#888888]">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      )
    }
    if (navigationStyle === 'dots') {
      return (
        <div className="flex items-center space-x-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === selectedIndex ? 'bg-white' : 'bg-[#444444]'
              }`}
            />
          ))}
        </div>
      )
    }
    // progress
    return (
      <div className="w-full max-w-[240px] h-[1px] bg-[#222222]">
        <div
          className="h-full bg-white transition-[width] duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    )
  }

  return (
    <section className="w-full overflow-hidden">
      {/* Header row: title slot lives in the parent page, arrows live here for non-hero variants */}
      {!isHero && showArrows && (
        <div className="px-[20px] md:px-[40px] mb-8 max-w-[1280px] mx-auto flex justify-end items-end">
          <Arrows />
        </div>
      )}

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex" style={{ gap: `${gap ?? 16}px` }}>
            {slides.map((slide, i) => {
              const url = getImageUrl(slide.image)
              const alt = getImageAlt(slide.image, slide.title)

              return (
                <div key={i} className={`${basisClass} min-w-0 group`}>
                  {isHero && (
                    <div className={`relative w-full ${HEIGHT_CLASSES[height ?? 'full']}`}>
                      {url ? (
                        <img src={url} alt={alt} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                      )}
                      <div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: ((overlayOpacity ?? 70) / 100) * 0.65 }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end px-[20px] md:px-[40px] pb-16 max-w-[1280px] mx-auto">
                        {slide.eyebrow && (
                          <span className="font-mono text-[12px] leading-[16px] tracking-[0.1em] font-medium text-[#888888] mb-4">
                            {slide.eyebrow}
                          </span>
                        )}
                        {slide.title && (
                          <h2 className="text-white text-[40px] md:text-[64px] leading-[1.05] font-semibold max-w-[720px] mb-4">
                            {slide.title}
                          </h2>
                        )}
                        {slide.description && (
                          <p className="text-[#cccccc] text-[16px] leading-[24px] max-w-[540px] mb-6">
                            {slide.description}
                          </p>
                        )}
                        {slide.link?.url && slide.link?.label && (
                          <a
                            href={slide.link.url}
                            target={slide.link.openInNewTab ? '_blank' : undefined}
                            rel={slide.link.openInNewTab ? 'noopener noreferrer' : undefined}
                            className="inline-flex w-fit items-center border border-white/40 text-white px-6 py-3 text-[14px] tracking-[0.05em] hover:bg-white hover:text-black transition-colors"
                          >
                            {slide.link.label}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {variant === 'card' && (
                    <div className="cursor-pointer">
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0e0e0e] mb-4">
                        {url ? (
                          <img
                            src={url}
                            alt={alt}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                        )}
                      </div>
                      {slide.eyebrow && (
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="font-mono text-[12px] leading-[16px] tracking-[0.1em] font-medium text-[#888888]">
                            {slide.eyebrow}
                          </span>
                        </div>
                      )}
                      {slide.title && (
                        <h3 className="text-[24px] leading-[32px] font-semibold text-white uppercase group-hover:text-[#888888] transition-colors duration-300">
                          {slide.title}
                        </h3>
                      )}
                    </div>
                  )}

                  {variant === 'logo' && (
                    <div className="relative w-full aspect-[16/9] md:aspect-[3/2] flex items-center justify-center bg-[#0e0e0e] px-8">
                      {url ? (
                        <img
                          src={url}
                          alt={alt}
                          className="max-h-[48px] w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Hero variant: arrows + indicator overlay the image, bottom corners */}
        {isHero && (
          <>
            <div className="absolute bottom-8 right-[20px] md:right-[40px] z-10">
              <Arrows />
            </div>
            <div className="absolute bottom-8 left-[20px] md:left-[40px] z-10">
              <Indicator />
            </div>
          </>
        )}
      </div>

      {/* Non-hero variants: indicator sits below the track */}
      {!isHero && (
        <div className="mt-6 px-[20px] md:px-[40px] max-w-[1280px] mx-auto">
          <Indicator />
        </div>
      )}
    </section>
  )
}

export default CarouselBlock