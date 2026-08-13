import { memo } from 'react';
import { cn } from '@/utils/cn';

interface TitleProps extends React.ComponentProps<'h1'>{
    titleRegular: string;
    titleItalic?: string | null;
}

const Title = ({titleRegular, titleItalic, className, ...props}: TitleProps) => {
  return (
    <h1 className={cn("font-['Inter','Helvetica_Neue',Arial,sans-serif] font-bold tracking-[-0.01em] leading-nonetext text-white antialiased text-[32px] md:text-[64px]", className)} {...props}>
        {titleRegular}
        { titleItalic ? <span className="italic">
            {titleItalic}
        </span> : null
        }
    </h1>
  );
};

export default memo(Title);