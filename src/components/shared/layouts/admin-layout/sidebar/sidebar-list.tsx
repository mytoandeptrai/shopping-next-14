import { sidebarLinks } from '@/components/shared/layouts/admin-layout/sidebar/config';
import SidebarItem from '@/components/shared/layouts/admin-layout/sidebar/sidebar-item';
import { TooltipProvider } from '@/components/ui/tooltip';

type Props = {
  isOpen: boolean;
};

const SidebarList = ({ isOpen }: Props) => {
  return (
    <nav className="max-h-screen overflow-y-auto">
      <div className="sticky top-0 z-10 bg-card">
        <div className="flex items-center gap-2 overflow-hidden border-b px-6 py-5">
          <svg className="w-auto shrink-0" aria-label="logo" height="22" role="img" viewBox="0 0 74 64">
            <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" className="fill-foreground" />
          </svg>
          {isOpen && <span className="whitespace-nowrap text-sm">Toàn thích var</span>}
        </div>
      </div>
      <TooltipProvider delayDuration={200}>
        <div className="flex justify-center text-foreground">
          <ul className="w-full overflow-hidden px-3 py-4">
            {sidebarLinks.map((sidebar, index) => (
              <SidebarItem link={sidebar} key={`sidebar-${index}`} isOpen={isOpen} />
            ))}
          </ul>
        </div>
      </TooltipProvider>
    </nav>
  );
};

export default SidebarList;
