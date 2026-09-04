import Navbar from '@/components/navbar'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { setMetaData } from '@/utils/setMetadata'
import { notFound } from 'next/navigation'
import Title from './_components/title'
import { RenderBlocks } from '@/blocks/blog';

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
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

  const block = result.docs?.[0]

  if (!block) {
    return notFound()
  }
  
  return (
    <>
      <Navbar />
      <Title title={block.title} />
      <RenderBlocks blocks={block.layout} />
    </>
  )
}
