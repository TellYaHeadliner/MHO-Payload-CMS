import Link from 'next/link'
import { FaFacebook, FaInstagram } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { getHeader, mapGalleryLinks } from '@/utils/getHeader'
import type { Header as HeaderType } from '@/payload-types'
import MobileNav from './headermobile'

const socialIconMap: Record<NonNullable<HeaderType['socialLinks']>[number]['platform'], IconType> =
  {
    facebook: FaFacebook,
    instagram: FaInstagram,
  }

type HeaderProps = {
  pushMobileNav?: boolean
}

const Header = async ({ pushMobileNav = false }: HeaderProps) => {
  const headerData = await getHeader()

  const { logo, socialLinks } = headerData
  const galleryItems = mapGalleryLinks(headerData.galleryItem)

  return (
    <nav className="bg-black border-b border-white/10 relative">
      <div className="flex items-center justify-between px-5 py-3 md:px-6 xl:px-10 md:py-6">
        {/* Left: logo + socials */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href={logo.href || '/'} className="flex items-center">
            <h1 className="font-bold tracking-[-0.01em] leading-none text-white antialiased text-[16px] md:text-[16px] whitespace-nowrap">
              {logo.text}
              <span className="italic">{logo.highlightText}</span>
            </h1>
          </Link>
          {socialLinks?.map((social) => {
            const Icon = socialIconMap[social.platform]
            return (
              <Link
                key={social.id ?? social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={social.platform}
              >
                <Icon className="w-5 h-5" />
              </Link>
            )
          })}
        </div>

        {/* Right: desktop nav - toàn bộ mục Gallery dàn trải, tối đa 7, render sẵn ở server */}
        <div className="hidden md:flex items-center flex-wrap justify-end gap-x-6 gap-y-2 lg:gap-x-8">
          {galleryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white text-xs lg:text-sm uppercase tracking-wider whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {/* Phần duy nhất cần client-side interactivity */}
      <MobileNav galleryItems={galleryItems} pushContent={pushMobileNav} />
    </nav>
  )
}

export default Header
