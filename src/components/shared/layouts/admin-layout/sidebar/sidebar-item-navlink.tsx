'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { CustomLink } from '@/components/custom/custom-link';
import { SidebarLinkItem } from '@/components/shared/layouts/admin-layout/sidebar/config';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
  link: SidebarLinkItem;
  isOpen: boolean;
};

const SidebarItemNavLink = ({ isOpen, link }: Props) => {
  const pathname = usePathname();
  const isActive = `/admin${link.href}` === pathname;

  const href = link.hrefAsIs ? link.href : `/admin${link.href}`;

  if (!isOpen) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild className="duration-0">
          <CustomLink
            href={href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'relative flex h-12 justify-start hover:bg-accent focus:bg-accent',
              isActive && 'bg-muted'
            )}
          >
            <link.icon size={20} className="shrink-0 text-accent-foreground" />
          </CustomLink>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12} className="flex items-center gap-2">
          {link.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <CustomLink
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'relative flex h-12 justify-start hover:bg-accent focus:bg-accent',
        isActive && 'group bg-accent text-primary'
      )}
      href={href}
    >
      <link.icon size={20} className="shrink-0 text-accent-foreground group-[]:text-primary" />
      <span className="absolute capitalize left-20 text-base">{link.title}</span>
    </CustomLink>
  );
};

export default SidebarItemNavLink;
