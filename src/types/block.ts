// types/blocks.ts
export interface ContentBlockType {
  id: string;
  blockType: 'content';
  blockName: string | null;
  richText: any; // có thể type chi tiết hơn theo Lexical schema
}

export interface MarqueeBlockType {
  id: string;
  blockType: 'marquee';
  blockName: string | null;
  speed: 'slow' | 'normal' | 'fast';
  title: { id: string; text: string }[];
}

export interface GalleryBlockType {
  id: string;
  blockType: 'gallery';
  blockName: string | null;
  images: any; // có thể type chi tiết ảnh nếu cần
}

export type LayoutBlock = ContentBlockType | MarqueeBlockType | GalleryBlockType;