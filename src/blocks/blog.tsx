import React from "react";
import { MarqueeBlock } from "./marqueeblock/Component";
import { Blog } from "@/payload-types"
import { ContentBlock } from "./contentblock/Component";
import { GalleryBlock } from "./galleryblock/Component";

type LayoutBlock = NonNullable<Blog['layout']>[number]

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
          case "marquee":
            return (
              <div key={key}>
                <MarqueeBlock titleItems={block.title} />
              </div>
            )
          case "content":
            return (
              <div key={key}>
                <ContentBlock {...block} />
              </div>
            )
          case "gallery":
            return (
              <div key={key}>
                <GalleryBlock {...block} />
              </div>
            )
          default:
            return null
        }
      })}
    </React.Fragment>
  )
}
