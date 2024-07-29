import type { LucideIcon } from 'lucide-react';
import {
  CircleXIcon,
  ClipboardPenIcon,
  ComponentIcon,
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListOrderedIcon,
  LockIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  TicketSlashIcon,
  UsersIcon,
} from 'lucide-react';

type NavLink = {
  title: string;
  icon: LucideIcon;
  href: string;
  hrefAsIs?: boolean;
};

export type SidebarLinkItem = NavLink & {
  children?: Omit<NavLink, 'icon' | 'children'>[];
  type?: never;
};

export type SidebarLink =
  | SidebarLinkItem
  | {
      type: 'divider';
      title: string;
    };

export const sidebarLinks: SidebarLink[] = [
  {
    type: 'divider',
    title: 'products',
  },
  {
    title: 'products',
    icon: LayoutDashboardIcon,
    href: '/products',
    children: [
      {
        title: 'list',
        href: '/list',
      },
      {
        title: 'add',
        href: '/add',
      },
    ],
  },
  {
    type: 'divider',
    title: 'orders',
  },
  {
    title: 'orders',
    icon: ListOrderedIcon,
    href: '/orders',
    children: [
      {
        title: 'list',
        href: '/list',
      },
    ],
  },
  {
    title: 'details',
    icon: ListCollapseIcon,
    href: '/details',
  },
  {
    title: 'users',
    icon: UsersIcon,
    href: '/users',
  },
  {
    title: 'reviews',
    icon: ClipboardPenIcon,
    href: '/reviews',
  },
  {
    title: 'sliders',
    icon: SlidersHorizontalIcon,
    href: '/sliders',
  },
  {
    title: 'banners',
    icon: TicketSlashIcon,
    href: '/banners',
  },
  {
    title: 'customers',
    icon: UsersIcon,
    href: '/customers',
    children: [
      {
        title: 'list',
        href: '/list',
      },
      {
        title: 'add',
        href: '/customers/add',
      },
    ],
  },
  {
    title: 'components',
    icon: ComponentIcon,
    href: '/components',
    children: [
      {
        title: 'statistics',
        href: '/statistics',
      },
      {
        title: 'tables',
        href: '/table',
      },
      {
        title: 'cards',
        href: '/cards',
      },
      {
        title: 'forms',
        href: '/form',
      },
    ],
  },
  {
    type: 'divider',
    title: 'pages',
  },
  {
    title: 'auth',
    icon: LockIcon,
    href: '/auth',
    children: [
      {
        title: 'login',
        href: '/login',
        hrefAsIs: true,
      },
      {
        title: 'signup',
        href: '/signup',
        hrefAsIs: true,
      },
      {
        title: 'reset_password',
        href: '/forgot-password',
        hrefAsIs: true,
      },
    ],
  },
  {
    title: 'error',
    icon: CircleXIcon,
    href: '/error',
    children: [
      {
        title: '404',
        href: '/404',
      },
      {
        title: '500',
        href: '/500',
      },
    ],
  },
  {
    title: 'settings',
    icon: SettingsIcon,
    href: '/settings',
  },
];
