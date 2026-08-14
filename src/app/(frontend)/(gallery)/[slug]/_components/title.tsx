import { memo } from 'react';
import { cn } from '@/utils/cn';

interface TitleProps extends React.ComponentProps<'h1'>{
    title: string;
}

const Title = ({title, className, ...props}: TitleProps) => {
  return (
    <div className="pt-8 pb-8 px-4 bg-black" {...props}>
      <h1 className={cn('text-5xl md:text-6xl font-bold text-white text-center uppercase tracking-wider')}>
        {title}
      </h1>
    </div>
  );
};

export default memo(Title);