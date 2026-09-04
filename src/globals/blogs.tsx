
import type { GlobalConfig } from 'payload'
import type { TFunction } from '@payloadcms/translations'

import { anyone } from '@/access/anyone';
import { isLoggedIn } from '@/access/isLoggedIn';

import { MarqueeBlock } from '@/blocks/marqueeblock/config';
import { PostListBlock } from '@/blocks/postlistblock/config';
import { CarouselBlock } from '@/blocks/carouselblock/config';
import { HeroBannerBlock } from "@/blocks/herobannerblock/config"

export const Blogs: GlobalConfig = {
  slug: 'list-blogs',
  // Chỉ có 2 role admin / editor
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  admin: { 
    group: 'Nội dung',
    description: 'Nội dung hiển thị ở trang chủ (hero, social links, danh mục điều hướng). Chỉ 1 bản ghi duy nhất.',
  },
  versions: {
    drafts: {
      autosave: true,
      validate: false
    },
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      admin: {
        position: "main",
        description: "Nơi sắp xếp section của page"
      },
      blocks: [
        MarqueeBlock,
        PostListBlock,
        CarouselBlock,
        HeroBannerBlock
      ],
    },
  ],
}
