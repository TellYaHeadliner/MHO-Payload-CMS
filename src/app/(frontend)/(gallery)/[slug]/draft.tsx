import Navbar from '@/components/navbar';
import type { Gallery } from '@/payload-types'
import { useLivePreview } from '@payloadcms/live-preview-react'
import Title from './_components/title';
import { GalleryLightbox } from '@/components/gallery-box';
import { BackgroundAudio } from '@/components/background-audio';
import { Link } from '@payloadcms/ui';
import { GetAudioType } from '@/utils/getAudioType';
import Footer from '@/components/footer';

export function PostClient({ initialData }: { initialData: Gallery }) {
  const { data } = useLivePreview<Gallery>({
    initialData,
    serverURL: `${process.env.SERVER_URL}`, // URL của Payload Server (nếu tách biệt frontend/backend)
    depth: 2,
  })

  const getAudioType = new GetAudioType(data)

  return (
    <>
      <Navbar />
      <Title title={data.title} />

      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GalleryLightbox
            images={data.images}
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
      <Footer />
    </>
  )
}
