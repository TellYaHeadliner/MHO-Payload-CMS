'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi'
import type { Audio } from '@/payload-types'

type AudioSrc = NonNullable<Audio['url']>

interface BackgroundAudioProps {
  src: AudioSrc
  type?: string
  className?: string
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  src,
  type = 'audio/*',
  className = 'w-full md:w-80',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4 mt-4">
      <div className="bg-white/5 border border-white/15 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 fade-in visible">
        <div className="flex-1">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Now Playing</p>
          <h3 className="text-white text-2xl font-bold uppercase tracking-wider">
            EXO-SC &mdash; 1 Billion Views
          </h3>
        </div>
        <div className="w-full md:w-auto">
          <audio ref={audioRef} controls autoPlay loop preload="auto" className={className}>
            <source src={src} type={type} />
          </audio>
        </div>
      </div>
    </div>
  )
}
