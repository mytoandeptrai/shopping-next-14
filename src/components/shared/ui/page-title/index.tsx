import { FCC } from '@/types';

import BackButton from '@/components/shared/ui/back-button';
import { Separator } from '@/components/ui/separator';

type Props = {
  title: string;
};

const PageTitle: FCC<Props> = ({ title, children }) => {
  return (
    <>
      <div className="flex items-center py-1">
        <div className="lg:hidden">
          <BackButton />
        </div>
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">{title}</h1>
      </div>
      <Separator className="h-2 bg-gray-100 mb-4 lg:hidden " />
      {children}
    </>
  );
};

export default PageTitle;
