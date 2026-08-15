import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blog } from '@/collections/Blog'
import { Categories } from '@/collections/Categories'
import { en } from '@payloadcms/translations/languages/en'
import { vi } from '@payloadcms/translations/languages/vi'

import enTrans from '@/locales/en.json'
import { customTranslations } from '@/custom-translations'
import { Gallery } from '@/collections/Gallery'
import { Header } from '@/globals/header'
import { Footer } from '@/globals/footer'
import { Home } from '@/globals/home';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Audio } from './collections/Audio';
// import viTrans from "@/locales/vi.json";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Header, Footer, Home],
  collections: [Users, Media, Blog, Categories, Gallery, Audio],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      // Chỉ định collection nào dùng Vercel Blob làm nơi lưu file
      collections: {
        media: true,
        audio: true
        // ví dụ nếu bạn có nhiều collection upload khác nhau:
        // gallery: {
        //   prefix: 'gallery/', // ảnh sẽ được lưu dưới dạng gallery/<filename>
        // },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN, // lấy từ Vercel Dashboard
      addRandomSuffix: false, // false = giữ nguyên tên file gốc (cẩn thận trùng tên)
      clientUploads: false, 
    }),
  ],
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, vi },
    translations: customTranslations,
  },
  localization: {
    locales: [
      {
        label: 'Tiếng Việt',
        code: 'vi'
      },
      {
        label: 'English',
        code: 'en'
      }
    ],
    defaultLocale: 'en',
    fallback: true
  }
})
