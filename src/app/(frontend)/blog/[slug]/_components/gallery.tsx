import Image from "next/image";
import { type Gallery, type Media } from "@/payload-types"


type GalleryImages = NonNullable<Gallery['images']>;
type GalleryImageItem = GalleryImages[number];

interface GalleryProps{
    imageSrc: string;
    alt: string | null | undefined;
    label?: string | null | undefined;
    width?: number;
    height?: number;
}

export default function Gallery({
  imageSrc,
  alt,
  label,
  width,
  height
}: GalleryProps) {
  return (
    <div className="w-full max-w-xs bg-neutral-100 rounded p-4 flex flex-col mx-auto gap-4 group">
        <Image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt={String(alt)}
          src={String(imageSrc)}
          width={width}
          height={height}
        />
      <p className="text-[0.7rem] font-semibold text-neutral-500 uppercase tracking-widest text-center">
        {label}
      </p>
    </div>
  );
}