import { env } from '@/config/env';

export const siteConfig = {
  name: 'Next 14 Template',
  author: 'mytoan-deptrai',
  description: 'Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup.',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'shadcn/ui'],
  url: {
    base: env.APP_URL,
  },
  links: {
    github: 'https://github.com/mytoandeptrai',
  },
};
