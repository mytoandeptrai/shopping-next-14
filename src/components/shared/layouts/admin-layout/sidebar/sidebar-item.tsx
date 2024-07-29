'use client';

import { motion } from 'framer-motion';

import { SidebarLink } from '@/components/shared/layouts/admin-layout/sidebar/config';
import SidebarItemAccordion from '@/components/shared/layouts/admin-layout/sidebar/sidebar-item-accordion';
import SidebarItemNavLink from '@/components/shared/layouts/admin-layout/sidebar/sidebar-item-navlink';

type Props = {
  isOpen: boolean;
  link: SidebarLink;
};

const SidebarItem = ({ isOpen, link }: Props) => {
  const { title, type } = link;

  if (type === 'divider') {
    if (!isOpen) return null;
    return (
      <li className="my-3">
        <div className="block text-xs font-semibold uppercase text-accent-foreground/70">{title}</div>
      </li>
    );
  }

  if (link.children) {
    return (
      <motion.li transition={{ duration: 0.3 }} layout="position" className="relative mb-2">
        <SidebarItemAccordion isOpen={isOpen} link={link} />
      </motion.li>
    );
  }

  return (
    <motion.li transition={{ duration: 0.3 }} layout="position" className="relative mb-2">
      <SidebarItemNavLink isOpen={isOpen} link={link} />
    </motion.li>
  );
};

export default SidebarItem;
