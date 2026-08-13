import { cn } from '@/utils/cn';
import Link from 'next/link';
import { ComponentProps, memo } from 'react';

interface ButtonLinkProps extends ComponentProps<typeof Link>{
  href: string;
  title: string;
}

//
const ButtonLink = ({ href, title, className, ...props}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={cn("px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold uppercase tracking-wider transition-all duration-300", className)}
      {...props}
    >
      {title}
    </Link>
  );
};

export default memo(ButtonLink);