import Navbar from '@/components/navbar'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { setMetaData } from '@/utils/setMetadata'
import { notFound } from 'next/navigation'
import Title from './_components/title'
import { isBlock } from '@/utils/isBlock'
import MarqueeText from '@/components/shadcn-space/marquee/marquee-text'
import Gallery from './_components/gallery'
import { GalleryBlock } from '@/blocks/galleryblock'
import { getMediaHeight, getMediaUrl, getMediaWidth } from '@/utils/getMediaType'

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
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
  searchParams: Promise<{
    isDraft?: string
  }>
}

export default async function Blog({ params, searchParams }: Args) {
  const { slug } = await params
  const { isDraft } = await searchParams
  const isDraftMode = isDraft === 'true'
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    draft: isDraftMode,
    locale: 'vi',
    limit: 1,
  })

  const item = result.docs?.[0]

  if (!item) {
    return notFound()
  }
  return (
    <>
      <Navbar />
      <Title title={item.title} />
      {item.layout?.filter(isBlock).map((block) => {
        switch (block.blockType) {
          case 'marquee':
            return <MarqueeText key={block.id} titleItems={block.title} />
          case 'gallery':
            return (
              <div key={block.id} className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
                <Gallery
                  key={block.id}
                  imageSrc={getMediaUrl(block.images.image)}
                  alt={block.images.alt ?? ''}
                  width={getMediaWidth(block.images.image)}
                  height={getMediaHeight(block.images.image)}
                />
              </div>
            )
        }
      })}
    </>
  )
}
