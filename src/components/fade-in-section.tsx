'use client'
import React, { useEffect, useRef, useState, ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  threshold?: number
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const domRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (domRef.current) {
              observer.unobserve(domRef.current)
            }
          }
        })
      },
      { threshold },
    )

    const currentEl = domRef.current
    if (currentEl) {
      observer.observe(currentEl)
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl)
      }
    }
  }, [threshold])

  return (
    <div
      ref={domRef}
      className={`transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  )
}
