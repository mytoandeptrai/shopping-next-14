import { Icons } from '@/assets/icons';
import { siteConfig } from '@/config';

import { ModeToggle } from '@/components/common/mode-toggle';

export default async function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Icons.user className="h-16 w-16" />
        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">{siteConfig.name}</h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
        </p>
        <div className="flex gap-2">
          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
