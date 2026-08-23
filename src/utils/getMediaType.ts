// utils/getMediaUrl.ts
import type { Media } from '@/payload-types'

export function getMediaUrl(media: number | Media | null | undefined): string {
  if (!media) return '';
  if (typeof media === 'number') return ''; // chưa populate, không có url
  return media.url ?? '';
}

export function getMediaAlt(media: number | Media | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'number') return fallback;
  return media.alt ?? fallback;
}

export function getMediaWidth(media: number | Media | null | undefined): number {
  if (!media || typeof media === 'number') return 0;
  return media.width ?? 0;
}

export function getMediaHeight(media: number | Media | null | undefined): number {
  if (!media || typeof media === 'number') return 0;
  return media.height ?? 0;
}