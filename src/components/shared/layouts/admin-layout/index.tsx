import { SidebarProvider } from '@/contexts/sidebar';
import { FCC } from '@/types';
import { cookies } from 'next/headers';

import AdminHeader from '@/components/shared/layouts/admin-layout/admin-header';
import Sidebar from '@/components/shared/layouts/admin-layout/sidebar';

const AdminLayout: FCC = ({ children }) => {
  const isOpen = cookies().get('my_sidebar')?.value === 'true' ? true : false;

  return (
    <SidebarProvider isOpen={isOpen}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex w-full flex-col">
          <AdminHeader />
          <main className="container flex-grow py-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
