import { Marquee } from '@/components/shadcn-space/animations/marquee'

type MarqueeItem = {
  id?: string | null
  text: string
}

interface MarqueeProps {
  titleItems: MarqueeItem[] | undefined | null;
  separator?: React.ReactNode
}

export default function MarqueeText({ titleItems, separator = '/' }: MarqueeProps) {
  return (
    <>
      <Marquee
        className="w-full bg-[#F9E900] text-[#0A0A0A] py-4 border-b border-outline font-display-lg text-3xl uppercase tracking-wider mx-0!"
        pauseOnHover
      >
        {titleItems?.map((item) => (
          <div key={item.id} className="flex items-center whitespace-nowrap gap-4">
            <span>{item.text}</span>
            {separator && <span className="opacity-60">{separator}</span>}
          </div>
        ))}
      </Marquee>
    </>
  )
}
