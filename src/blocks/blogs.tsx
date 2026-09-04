import React from 'react'
import { MarqueeBlock } from './marqueeblock/Component'
import { ListBlog, Blog } from '@/payload-types'

import { HeroBannerBlock } from './herobannerblock/Component'
import { PostListBlock, type PopulatedPostListBlock } from './postlistblock/Component'
import { CarouselBlock } from './carouselblock/Component'

type LayoutBlock = NonNullable<ListBlog['layout']>[number]

type Props = {
  blocks: LayoutBlock[] | null | undefined
}

export const RenderBlocks: React.FC<Props> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <React.Fragment>
      {blocks.map((block, index) => {
        const key = block.id ?? index

        switch (block.blockType) {
          case 'marquee':
            return (
              <div key={key}>
                <MarqueeBlock titleItems={block.title} />
              </div>
            )
          case 'herobanner':
            return (
              <div key={key}>
                <HeroBannerBlock slides={block.slides} />
              </div>
            )
          case 'carousel':
            return (
              <div key={key}>
                <CarouselBlock
                  slides={block.slides}
                  loop={block.loop}
                  align={block.align}
                  slidesToShow={block.slidesToShow}
                  gap={block.gap}
                  dragFree={block.dragFree}
                  effect={block.effect}
                  autoplay={block.autoplay}
                  autoplayDelay={block.autoplayDelay}
                  stopOnInteraction={block.stopOnInteraction}
                  pauseOnHover={block.pauseOnHover}
                  showArrows={block.showArrows}
                  navigationStyle={block.navigationStyle}
                  variant={block.variant}
                  height={block.height}
                  overlayOpacity={block.overlayOpacity}
                />
              </div>
            )
          case 'postlistblock':
            return (
              <div key={key}>
                <PostListBlock
                  {...block}
                  selectedArticles={block.selectedArticles?.filter(
                    (article): article is Blog => typeof article !== 'number',
                  )}
                />
              </div>
            )
          default:
            return null
        }
      })}
    </React.Fragment>
  )
}
