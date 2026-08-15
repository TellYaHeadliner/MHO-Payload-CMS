import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Title from './_components/title'
import { GalleryLightbox } from '@/components/gallery-box'
import { BackgroundAudio } from '@/components/background-audio';
import type { Gallery } from "@/payload-types" 
import Link from 'next/link';

type Args = {
  params: Promise<{ slug: string }>
}

function getAudioFileSrc(gallery: Gallery): string | null {
  const audioFile = gallery.music?.audioFile;

  console.log(audioFile)
  if (audioFile && typeof audioFile === 'object') {
    console.log(audioFile.url)
    return audioFile.url ?? null; // tuỳ Audio type có field `url` không, xem lại definition
  }


  return null; // chưa populate (chỉ là id number) hoặc null
}

export default async function Gallery({ params }: Args) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'gallery',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    draft,
    locale: 'vi',
    limit: 1,
  })

  const item = result.docs?.[0]
  console.log(item)

  if (!item) {
    return notFound()
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <Title title={item.title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GalleryLightbox
            images={item.images}
            classImage="gallery-image w-full h-auto group-hover:scale-[1.03] group-hover:opacity-90"
          />
        </div>
      </div>

      <BackgroundAudio
        src={getAudioFileSrc(item) ?? ''}
      />

      {/* Back to Home */}
      <div className="bg-black py-12 text-center">
        <Link
          href="/home"
          className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold uppercase tracking-wider transition-all"
        >
          Back to Home
        </Link>
      </div>

    </>
  )
}
