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

import { Gallery } from '@/collections/Gallery'
import { Home } from '@/globals/home';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Audio } from './collections/Audio';
import { Blogs } from './globals/blogs';


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },

    livePreview: {
      url: `${process.env.SERVER_URL}`, 
      collections: ['pages'],
      breakpoints: [
        {
          label: 'PC',
          name: 'pc',
          width: 1920,
          height: 1080
        }
      ]
    },
    
  },
  cors: [String(process.env.NEXT_PUBLIC_SERVER_URL)],
  globals: [Home, Blogs],
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
      },
      token: process.env.BLOB_READ_WRITE_TOKEN, // lấy từ Vercel Dashboard
      addRandomSuffix: false, // false = giữ nguyên tên file gốc (cẩn thận trùng tên)
      clientUploads: false, 
    }),
  ],
})
