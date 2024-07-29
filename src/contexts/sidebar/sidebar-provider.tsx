'use client';

import { SidebarContextProvider } from '@/contexts/sidebar/sidebar-context';
import { useSidebarStore } from '@/stores/sidebar-store';
import { FCC } from '@/types';

interface ISidebarProviderProps {
  isOpen: boolean;
}

export const SidebarProvider: FCC<ISidebarProviderProps> = ({ children }) => {
  const toggle = useSidebarStore.use.toggle();
  const isOpen = useSidebarStore.use.isOpen();

  return <SidebarContextProvider value={{ isOpen, toggle }}>{children}</SidebarContextProvider>;
};
