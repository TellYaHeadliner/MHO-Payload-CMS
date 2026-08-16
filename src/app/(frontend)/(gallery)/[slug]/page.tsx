import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Title from './_components/title'
import { GalleryLightbox } from '@/components/gallery-box'
import { BackgroundAudio } from '@/components/background-audio';
import type { Audio, Gallery } from "@/payload-types" 
import Link from 'next/link';
import { GetAudioType } from '@/utils/getAudioType';
import { Metadata } from 'next';
import { setMetaData } from '@/utils/setMetadata';

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'gallery',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    locale: 'vi',
    limit: 1,
  })

  const item = result.docs?.[0]

  if (!item) {
    return setMetaData('Không tìm thấy', 'Trang không tồn tại')
  }

  return setMetaData(item.title, item.description)
}

type Args = {
  params: Promise<{ slug: string }>
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

  if (!item) {
    return notFound()
  }

  const getAudioType = new GetAudioType(item)


  return (
    <>
      <Navbar />
        <Title title={item.title} />

      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GalleryLightbox
            images={item.images}
            classImage="gallery-image w-full h-auto group-hover:scale-[1.03] group-hover:opacity-90"
          />
        </div>
      </div>

      <BackgroundAudio
        src={getAudioType.getAudioUrl()}
        type={getAudioType.getAudioMineType()}
        alt={getAudioType.getAudioAlt()}
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
