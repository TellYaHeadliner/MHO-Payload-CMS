'use client'
import React, { useEffect, useRef } from 'react'

interface BackgroundAudioProps {
  src: string
  type?: string
  className?: string
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  src,
  type = 'audio/wav',
  className = 'w-full md:w-80',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 1

    const tryPlay = (): void => {
      audio.play().catch(() => {
        // Tự động xử lý khi trình duyệt chặn autoplay
      })
    }

    // Thử autoplay khi mount
    tryPlay()

    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'click',
      'keydown',
      'scroll',
      'touchstart',
    ]

    const handleFirstUserInteraction = (): void => {
      tryPlay()
      events.forEach((ev) => document.removeEventListener(ev, handleFirstUserInteraction))
    }

    events.forEach((ev) =>
      document.addEventListener(ev, handleFirstUserInteraction, { passive: true }),
    )

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, handleFirstUserInteraction))
    }
  }, [])

  return (
    <audio ref={audioRef} controls autoPlay loop preload="auto" className={className}>
      <source src={src} type={type} />
    </audio>
  )
}

