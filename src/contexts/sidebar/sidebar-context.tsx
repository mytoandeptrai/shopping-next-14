'use client';

import { createSafeContext } from '@/lib/create-safe-context';

type SidebarContextProps = {
  isOpen: boolean;
  toggle: () => void;
};

export const [SidebarContextProvider, useSidebarContext] = createSafeContext<SidebarContextProps>(
  'SidebarContextProvider component was not found in tree'
);
