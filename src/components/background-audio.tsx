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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    audio.play().catch(() => {})
  }, [src])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const value = Number(e.target.value)
    audio.currentTime = (value / 100) * duration
    setProgress(value)
  }

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
          <div
            className={`flex items-center gap-3 rounded-full bg-white/10 border border-white/15 px-4 py-2 ${className}`}
          >
            <audio ref={audioRef} loop preload="auto" className="hidden">
              <source src={src || ""} type={type} />
            </audio>

            <button
              onClick={togglePlay}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
            </button>

            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-white
                   [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-white"
            />

            <button
              onClick={toggleMute}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:text-white"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
