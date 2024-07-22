import { FCC } from '@/types';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

interface Props {}

const Provider: FCC<Props> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      {children}
      <TailwindIndicator />
    </ThemeProvider>
  );
};

export default Provider;
