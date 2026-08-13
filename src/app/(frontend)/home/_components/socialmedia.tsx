import Link from 'next/link';
import { ComponentProps, memo } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { IconType } from "react-icons";

import { cn } from '@/utils/cn';

type SocialIcon =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "pinterest"
  | "twitter";

const socialIconMap: Record<SocialIcon, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  pinterest: FaPinterestP,
  "twitter": FaXTwitter,
};

interface SocialMediaProps extends ComponentProps<typeof Link>{
    href: string;
    icon: SocialIcon;
}

const SocialMedia = ({href, icon, className}: SocialMediaProps) => {
  const Icon = socialIconMap[icon];

  return (
    <Link
      href={href}
      target="_blank"
      className={cn("text-white/70 hover:text-white transition-colors", className)}
    >
        <Icon className="w-8 h-8" />
    </Link>
  );
};

export default memo(SocialMedia);