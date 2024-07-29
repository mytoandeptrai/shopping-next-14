import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import Cookies from 'js-cookie';
import { create } from 'zustand';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarState extends SidebarProps {
  toggle: () => void;
}

const isOpen = Cookies.get('my_sidebar') === 'true' ? true : false;

const useBaseSidebarStore = create<SidebarState>((set) => ({
  isOpen,
  toggle: () => {
    return set((state) => {
      const isOpen = state.isOpen;
      Cookies.set('my_sidebar', String(!isOpen), {
        path: '/',
        expires: 7,
      });

      return {
        isOpen: !isOpen,
      };
    });
  },
}));

export const useSidebarStore = createSelectorFunctions(useBaseSidebarStore);
