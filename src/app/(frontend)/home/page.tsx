import { getPayload } from 'payload';
import configPromise from '@payload-config'
import Title from './_components/title';
import Socialmedia from './_components/socialmedia';
import { PopulatedHome } from '@/types/populated';
import ButtonLink from './_components/buttonlink';
import { Gallery } from '@/payload-types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "𝙢𝙮 𝙝𝙚𝙖𝙡𝙞𝙣𝙜 𝙤𝙨𝙝",
    description: 'Home of 𝙢𝙮 𝙝𝙚𝙖𝙡𝙞𝙣𝙜 𝙤𝙨𝙝'
}

async function Home() {

  const payload = await getPayload({ config: configPromise })

  const home = await payload.findGlobal({
    slug: 'home', // slug của global, khai báo trong payload.config.ts
    depth: 2,     // quan trọng: để populate ảnh, video, media relations
  }) as PopulatedHome 

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background - Web Icon */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${home.background?.image?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      {/* Logo */}
      <div className="relative z-10 mb-8">
        <Title
          titleRegular={home.titleRegular}
          titleItalic={home.titleItalic}
        />
      </div>
      {/* Social Icons */}
      <div className="relative z-10 mb-12 flex gap-6">
        {home.socialLinks?.map((socialLink) => (
          <Socialmedia
            href={socialLink.url}
            icon={socialLink.platform}
            key={socialLink.id}
          />
        ))}
      </div>
      {/* Navigation Links */}
      <nav className="relative z-10 flex flex-wrap justify-center gap-4 px-5 xl:px-10">
        {
          home.navCategories?.map((nav: Gallery) => (
            <ButtonLink
              href={nav.slug}
              title={nav.title}
              key={nav.id}
            />
          ))
        }
      </nav>
    </div>
  )
}

export default Home
