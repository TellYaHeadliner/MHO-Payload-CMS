import { BackgroundAudio } from '@/components/background-audio';
import { GalleryItem, GalleryLightbox } from '@/components/gallery-box';
import { LightboxGallery } from '@/components/light-box-gallery';
import Navbar from '@/components/navbar'

const url = 'https://www.myhealingosh-gallery.com/'

const GALLERY_DATA: GalleryItem[] = [
  // Nhóm Header Cover / Bookmark (Space-y-4)
  {
    id: 1,
    src: `${url}/gallery/header/1-cover.webp`,
    alt: 'Header 2',
  },
  {
    id: 2,
    src: `${url}/gallery/header/3-cover.webp`,
    alt: 'Header 3',
  },
  {
    id: 3,
    src: `${url}/gallery/header/4-cover.webp`,
    alt: 'Header 9',
  },
  {
    id: 4,
    src: `${url}/gallery/header/bookmark-front.webp`,
    alt: 'Header 10',
  },

  // Nhóm Header Feed (Grid 2 cột)
  {
    id: 5,
    src: `${url}/gallery/header/2-feed.webp`,
    alt: 'Header 1',
  },
  {
    id: 6,
    src: `${url}/gallery/header/feed-2.webp`,
    alt: 'Header 4',
  },
  {
    id: 7,
    src: `${url}/gallery/header/feed-3.webp`,
    alt: 'Header 5',
  },
  {
    id: 8,
    src: `${url}/gallery/header/feed-6-1.webp`,
    alt: 'Header 6',
  },
  {
    id: 9,
    src: `${url}/gallery/header/feed-7.webp`,
    alt: 'Header 7',
  },
  {
    id: 10,
    src: `${url}/gallery/header/reverxe.webp`,
    alt: 'Header 8',
  },
]

const FILTER_GALLERY_DATA_FIRST = GALLERY_DATA.filter((item) => Number(item.id) <= 4)
const FILTER_GALLERY_DATA_SECOND = GALLERY_DATA.filter((item) => Number(item.id) > 4)

const Header = () => {


  return (
    <>
      <Navbar />

      <div className="pt-8 pb-8 px-4 bg-black">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center uppercase tracking-wider">
          Collab
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <div className="space-y-4">
          <GalleryLightbox
            images={FILTER_GALLERY_DATA_FIRST}
            classImage="gallery-image w-full h-auto group-hover:scale-[1.03] group-hover:opacity-90"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GalleryLightbox
            images={FILTER_GALLERY_DATA_SECOND}
            classImage="gallery-image w-full h-auto group-hover:scale-[1.03] group-hover:opacity-90"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
        <div className="bg-white/5 border border-white/15 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 fade-in visible">
          <div className="flex-1">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Now Playing</p>
            <h3 className="text-white text-2xl font-bold uppercase tracking-wider">
              EXO-SC &mdash; 1 Billion Views
            </h3>
          </div>
          <div className="w-full md:w-auto">
            <BackgroundAudio src={`${url}/audio/album-concept.wav`} />
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

export default Header
