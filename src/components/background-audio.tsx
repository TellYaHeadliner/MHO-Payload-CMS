'use client'
import React, { useEffect, useRef, useState } from 'react'
import type { Audio } from '@/payload-types'

type AudioSrc = NonNullable<Audio['url']>

interface BackgroundAudioProps {
  src: AudioSrc | null | undefined;
  alt: string | null | undefined;
  type?: string | null;
  className?: string
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  src,
  alt,
  type = 'audio/wav',
  className = 'w-full md:w-80',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)  
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4 mt-4">
      <div className="bg-white/5 border border-white/15 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 fade-in visible">
        <div className="flex-1">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
            { isPlaying === true ? "Now playing" : "Paused"}
          </p>
          <h3 className="text-white text-2xl font-bold uppercase tracking-wider">
            {alt}
          </h3>
        </div>
        <div className="w-full md:w-auto">
          <audio 
            ref={audioRef} 
            controls 
            autoPlay 
            loop 
            preload="auto" 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={className}>
            <source src={String(src)} type={String(type)} />
          </audio>
        </div>
      </div>
    </div>
  )
}
