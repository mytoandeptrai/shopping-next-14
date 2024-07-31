'use client';

import { FCC } from '@/types';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const BackButton: FCC = () => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <Button
      prefixElement={
        <ArrowLeftIcon className="text-gray-500 mr-3 rounded-2xl w-7 h-7 p-1 lg:w-8 lg:h-8 md:p-1.5 active:scale-95 bg-gray-50" />
      }
      title="Back"
      className="mx-3 my-2"
      onClick={onClick}
    >
      BackButton
    </Button>
  );
};

export default BackButton;
