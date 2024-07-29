'use client';

import { useSidebarContext } from '@/contexts/sidebar';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import SidebarList from '@/components/shared/layouts/admin-layout/sidebar/sidebar-list';

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarContext();
  return (
    <div
      aria-expanded={isOpen}
      className={cn('w-72 relative hidden h-screen shrink-0 duration-300 md:block', {
        'w-20': !isOpen,
      })}
    >
      <aside
        className={cn(
          'fixed top-0 z-50 hidden h-screen shrink-0 bg-card transition-[width] duration-300 md:block ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l w-72',
          {
            'w-20': !isOpen,
          }
        )}
      >
        <button
          onClick={toggle}
          aria-label="toggle sidebar"
          className="absolute right-0 top-12 z-20 flex h-7 w-7 items-center justify-center rounded-full border bg-card p-0 ring-offset-1 ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring ltr:right-0 ltr:translate-x-1/2 rtl:left-0 rtl:-translate-x-1/2"
        >
          {isOpen ? (
            <ArrowLeft className="text-foreground rtl:rotate-180" size={18} />
          ) : (
            <ArrowRight className="text-foreground rtl:rotate-180" size={18} />
          )}
        </button>
        <SidebarList isOpen={isOpen} />
      </aside>
    </div>
  );
};

export default Sidebar;
