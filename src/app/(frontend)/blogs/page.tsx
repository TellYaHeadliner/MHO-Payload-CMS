import Navbar from '@/components/navbar'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/blogs';
import { PopulatedHome } from '@/types/populated';
import { homedir } from 'node:os';

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
      <Navbar />
      <RenderBlocks blocks={global?.layout} />
    </>
  )
}
