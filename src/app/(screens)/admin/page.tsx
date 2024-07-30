import { ROUTES } from '@/constants/routes';
import { redirect } from 'next/navigation';

export default async function Home() {
  return redirect(ROUTES.ADMIN_PRODUCT_LIST);
}
