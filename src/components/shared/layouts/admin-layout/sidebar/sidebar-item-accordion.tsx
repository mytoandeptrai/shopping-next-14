import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { CustomLink } from '@/components/custom/custom-link';
import { SidebarLinkItem } from '@/components/shared/layouts/admin-layout/sidebar/config';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
  link: SidebarLinkItem;
  isOpen: boolean;
};

const SidebarItemAccordion = ({ isOpen, link }: Props) => {
  if (!isOpen) {
    return (
      <DropdownMenu>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild className="duration-0">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex h-12 justify-between duration-0 hover:bg-accent focus:bg-accent"
              >
                <link.icon size={25} className="shrink-0 text-accent-foreground" />
                <span className="sr-only">{link.title}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12} className="flex items-center gap-2">
            {link.title}
            <ChevronRight size={16} className="rtl:rotate-180" />
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="bg-red-500" sideOffset={8} side={'left'} align="start">
          <DropdownMenuLabel>{link.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {link.children!.map((child) => (
            <DropdownMenuItem key={child.title + child.href} asChild>
              <CustomLink href={child.hrefAsIs ? child.href : `/admin  ${link.href}${child.href}`}>
                <span> {child.title}</span>
              </CustomLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Accordion key={link.href} type="single" collapsible>
      <AccordionItem value={link.title} className="border-b-0">
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'relative flex h-12 justify-between duration-0 hover:bg-accent focus:bg-accent w-full'
          )}
        >
          <div>
            <link.icon size={25} className="shrink-0 text-accent-foreground" />
          </div>
          <span className="absolute capitalize left-20 text-base"> {link.title}</span>
        </AccordionTrigger>
        <AccordionContent className="mt-3 space-y-2 pb-1 pl-4 pr-1">
          {link.children!.map((child) => (
            <CustomLink
              href={child.hrefAsIs ? child.href : `/dashboard${link.href}${child.href}`}
              key={child.title}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'relative flex h-10 w-full justify-start gap-3 hover:bg-accent focus:bg-accent'
              )}
            >
              <div className="size-2 rounded-full border bg-accent-foreground" />
              <span> {child.title}</span>
            </CustomLink>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarItemAccordion;
