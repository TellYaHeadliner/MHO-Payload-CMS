import '@/app/styles.css'
import Link from 'next/link'
export default function NotFound() {
  const urlBg = 'https://www.myhealingosh-gallery.com/gallery/web-icon.webp'

  return (
    <div className="bg-black">
      <div
        className="relative min-h-screen h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${urlBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="inset-0 opacity-100 flex justify-center items-center ">
          <h1 className="font-bold text-9xl text-[#fff] uppercase tracking-wider">Not found</h1>
        </div>
        <Link
          href="/home"
          className="mt-12 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold uppercase tracking-wider transition-all duration-300"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
