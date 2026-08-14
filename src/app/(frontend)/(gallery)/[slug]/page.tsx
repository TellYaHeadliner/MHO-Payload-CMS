import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Title from './_components/title'
import { GalleryLightbox } from '@/components/gallery-box'
import { LightboxGallery } from '@/components/light-box-gallery'

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
      <LightboxGallery images={item.images} />
    </>
  )
}
