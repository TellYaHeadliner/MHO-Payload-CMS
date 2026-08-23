import { Blog } from "@/payload-types";

type LayoutBlock = NonNullable<Blog['layout']>[number];
type MarqueeBlock = Extract<LayoutBlock, { blockType: 'marquee' }>;
type GalleryBlock = Extract<LayoutBlock, { blockType: 'gallery' }>;
type ContentBlock = Extract<LayoutBlock, { blockType: 'content' }>;

export function isBlock(
  block: LayoutBlock
): block is MarqueeBlock | GalleryBlock | ContentBlock {
  return (
    block.blockType === 'marquee' ||
    block.blockType === 'gallery' ||
    block.blockType === 'content'
  );
}