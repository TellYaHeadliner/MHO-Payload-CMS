import type { Gallery } from '@/payload-types'

type SpotifyEmbedProps = {
  audio: Gallery['music']
}

function isSafeSpotifyEmbed(html: string): boolean {
  // Chỉ chấp nhận nếu là 1 thẻ iframe trỏ đúng domain open.spotify.com
  const iframeRegex = /^<iframe[^>]+src="https:\/\/open\.spotify\.com\/embed\/[^"]+"[^>]*><\/iframe>$/
  return iframeRegex.test(html.trim())
}

export default function SpotifyEmbed({ audio }: SpotifyEmbedProps) {
  if (!audio || audio.sourceType !== 'url' || !audio.spotifyUrl) return null
  if (!isSafeSpotifyEmbed(audio.spotifyUrl)) return null

  return (
    <div
      className="spotify-embed-wrapper"
      dangerouslySetInnerHTML={{ __html: audio.spotifyUrl }}
    />
  )
}