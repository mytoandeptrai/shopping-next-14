'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SidebarMobile = () => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  return <div>SidebarMobile</div>;
};

export default SidebarMobile;
