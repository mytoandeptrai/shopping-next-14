import SidebarMobile from '@/components/shared/layouts/admin-layout/sidebar/sidebar-mobile';

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <div>
        <div className="md:hidden">
          <SidebarMobile />
        </div>
      </div>
      <div className="flex items-center gap-4"></div>
    </header>
  );
};

export default Header;
