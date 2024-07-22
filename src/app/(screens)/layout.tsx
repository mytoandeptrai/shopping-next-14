'use client';

import { useEffect, useState } from 'react';

export default function ScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isHydration, setIsHydration] = useState(false);

  useEffect(() => {
    setIsHydration(true);
  }, []);

  if (!isHydration) return null;

  return <>{children}</>;
}
