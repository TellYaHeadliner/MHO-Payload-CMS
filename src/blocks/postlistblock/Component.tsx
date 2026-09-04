import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MoveLeft, MoveRight } from 'lucide-react'

import type { Blog, Media, PostListBlock as PostListBlockProps } from '@/payload-types'

export type PopulatedPostListBlock = Omit<PostListBlockProps, 'selectedArticles'> & {
  selectedArticles?: Blog[] | null
}

export const PostListBlock = ({
  selectedArticles,
  labelNameofList
}: PopulatedPostListBlock) => {
  if (!selectedArticles || selectedArticles.length === 0) {
    return (
      <section className="max-w-[1280px] mx-auto px-[20px] md:px-[40px] mb-[120px]">
        <div className="flex flex-col items-center justify-center gap-4 border-t border-b border-[#222222] py-24 text-center">
          <span className="font-mono text-[12px] leading-[16px] tracking-[0.1em] font-medium text-[#888888]">
            CHƯA CÓ BÀI VIẾT
          </span>
          <p className="text-[18px] leading-[32px] text-[#888888] max-w-[420px]">
            Hiện chưa có bài viết nào trong mục này. Nội dung sẽ xuất hiện ở đây ngay khi được đăng.
          </p>
        </div>
      </section>
    )
  }
  return (
    <section className="max-w-[1280px] mx-auto px-[20px] md:px-[40px] mb-[120px]">
      <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-bold text-white uppercase mb-4 group-hover:text-[#888888] transition-colors duration-300 mt-10 pb-5 border-b border-[#222222]">
        {labelNameofList}
      </h2>
      <div className="flex flex-col gap-12 pt-12">
        {selectedArticles.map((article, index) => {
          const image = article.imageBlog as Media | null

          return (
            <article
              key={article.id ?? index}
              className="group flex flex-col md:flex-row gap-8 items-center border-b border-[#222222] pb-12"
            >
              {/* Text side */}
              <div className="w-full md:w-1/2 order-2 md:order-1 pr-0 md:pr-12">

                <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-bold text-white uppercase mb-4 group-hover:text-[#888888] transition-colors duration-300">
                  {article.title}
                </h2>

                {article.description && (
                  <p className="text-[18px] leading-[32px] text-[#888888] mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                )}

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center space-x-2 border-b border-white pb-1 group-hover:opacity-80 transition-opacity"
                >
                  <span className="font-mono text-[12px] leading-[16px] tracking-[0.1em] font-medium text-white">
                    ĐỌC TIẾP
                  </span>
                  <MoveRight className="w-4 h-4 text-white" />
                </Link>
              </div>

              {/* Image side */}
              <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden bg-[#0e0e0e] order-1 md:order-2">
                {image?.url && (
                  <Image
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 grayscale group-hover:grayscale-0"
                    src={image.url}
                    alt={image.alt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
