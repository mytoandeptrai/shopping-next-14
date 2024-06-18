import { FCC } from '@/types';

import { ThemeProvider } from '@/components/theme-provider';

interface Props {}

const Provider: FCC<Props> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      {children}
    </ThemeProvider>
  );
};

export default Provider;
