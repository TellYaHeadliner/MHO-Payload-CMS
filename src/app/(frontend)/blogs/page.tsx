import Header from '@/components/header'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/blogs';

type Args = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    isDraft?: string
  }>
}

export default async function Blog({ params, searchParams }: Args) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug: 'list-blogs',
    depth: 2,
    populate: {
    blog: {
      title: true,
      slug: true,
      description: true,
      categories: true,
      imageBlog: true,
    },
  },
  })
  
  return (
    <>
      <Header />
      <RenderBlocks blocks={global?.layout} />
    </>
  )
}
