import AdminNav from '@/components/shared/layouts/admin-layout/admin-nav';
import SidebarMobile from '@/components/shared/layouts/admin-layout/sidebar/sidebar-mobile';

const AdminHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <div>
        <div className="md:hidden">
          <SidebarMobile />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AdminNav />
      </div>
    </header>
  );
};

export default AdminHeader;
