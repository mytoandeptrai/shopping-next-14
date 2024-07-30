'use client';

import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import SidebarList from '@/components/shared/layouts/admin-layout/sidebar/sidebar-list';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const SidebarMobile = () => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  return (
    <Sheet onOpenChange={setIsOpened} open={isOpened}>
      <SheetTrigger asChild>
        <Button className="size-9 px-1 py-1" variant="ghost" aria-label="toggle sidebar">
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-card p-0">
        <SidebarList isOpen={isOpened} />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
