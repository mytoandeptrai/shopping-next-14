'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { CustomLink } from '@/components/custom/custom-link';
import { SidebarLinkItem } from '@/components/shared/layouts/admin-layout/sidebar/config';
import { buttonVariants } from '@/components/ui/button';

type Props = {
  link: SidebarLinkItem;
  isOpen: boolean;
};

const SidebarItemNavLink = ({ isOpen, link }: Props) => {
  const pathname = usePathname();
  const isActive = `/admin${link.href}` === pathname;

  const href = link.hrefAsIs ? link.href : `/admin${link.href}`;

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
      <span className="absolute capitalize left-20">{link.title}</span>
    </CustomLink>
  );
};

export default SidebarItemNavLink;
