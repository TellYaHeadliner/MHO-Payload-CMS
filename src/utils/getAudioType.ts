import { Audio } from './../payload-types'
import { Gallery } from '@/payload-types'

export class GetAudioType {
    private gallery: Gallery

    constructor(gallery: Gallery) {
      this.gallery = gallery
    }

    getAudioUrl(): string | null | undefined {
        const audioFile = this.gallery.music?.audioFile

        if (audioFile && typeof audioFile === 'object') {
          return audioFile.url
        }

        return null // chưa populate (chỉ là id number) hoặc null
    }

    getAudioMineType(): string | null | undefined { 
        const audioFile = this.gallery.music?.audioFile 
        if (audioFile && typeof audioFile === 'object') {
          return audioFile.mimeType
        }   
        return null // chưa populate (chỉ là id number) hoặc null
    }

    getAudioAlt(): string | undefined {
        const audioFile = this.gallery.music?.audioFile 
        if (audioFile && typeof audioFile === 'object') {
            return audioFile.alt
        }
    }
}
