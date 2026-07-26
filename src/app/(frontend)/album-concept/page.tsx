import { BackgroundAudio } from '@/components/background-audio';
import { FadeInSection } from '@/components/fade-in-section';
import { GalleryItem, GalleryLightbox } from '@/components/gallery-box';
import { LightboxGallery } from '@/components/light-box-gallery';
import Navbar from '@/components/navbar'

const url = 'https://www.myhealingosh-gallery.com/'

const GALLERY_DATA: GalleryItem[] = [
  { id: 1, src: `${url}/gallery/album-concept/blackout.webp`, alt: 'Album Concept 1' },
  { id: 2, src: `${url}/gallery/album-concept/hello-world.webp`, alt: 'Album Concept 2' },
  { id: 3, src: `${url}/gallery/album-concept/tsou.webp`, alt: 'Album Concept 3' },
]

const AlbumConcept = () => {
  return (
    <>
      <Navbar />
      <div className="pt-8 pb-8 px-4 bg-black">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center uppercase tracking-wider">
          Album Concept
        </h1>
      </div>

      {/* Gallery */}
      <main className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <FadeInSection>
          <GalleryLightbox images={GALLERY_DATA} />
        </FadeInSection>
      </main>

      {/* Now Playing */}
      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <div className="bg-white/5 border border-white/15 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 fade-in visible">
          <div className="flex-1">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Now Playing</p>
            <h3 className="text-white text-2xl font-bold uppercase tracking-wider">
              EXO-SC &mdash; 1 Billion Views
            </h3>
          </div>
          <div className="w-full md:w-auto">
            <BackgroundAudio src={`${url}/audio/album-concept.wav`}/>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="bg-black py-12 text-center">
        <a
          href="/home"
          className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold uppercase tracking-wider transition-all"
        >
          Back to Home
        </a>
      </div>

    <LightboxGallery images={GALLERY_DATA} />
    </>
  )
}

export default AlbumConcept
