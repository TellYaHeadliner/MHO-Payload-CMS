import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { sources } from 'next/dist/compiled/webpack/webpack';
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.myhealingosh-gallery.com',
        pathname: '/gallery/**'
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // true = 308 (vĩnh viễn), false = 307 (tạm thời)
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
