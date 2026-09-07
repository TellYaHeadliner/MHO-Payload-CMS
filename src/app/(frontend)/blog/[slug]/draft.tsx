import Navbar from '@/components/navbar';
import type { Blog } from '@/payload-types'
import { useLivePreview } from '@payloadcms/live-preview-react'
import Title from './_components/title';
import { RenderBlocks } from '@/blocks/blog';

export function PostClient({ initialData }: { initialData: Blog }) {
  const { data } = useLivePreview<Blog>({
    initialData,
    serverURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`, // URL của Payload Server (nếu tách biệt frontend/backend)
    depth: 2,
  })

  return (
    <>
      <Navbar />
      <Title title={data.title} />
      <RenderBlocks blocks={data.layout} />
    </>
  )
}
