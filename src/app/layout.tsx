import { LatoFont } from '@/assets/local-fonts';
import { siteConfig } from '@/config';
import { Provider } from '@/providers';
import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = `${LatoFont.variable}`;

  return (
    <html lang="en" suppressHydrationWarning className={className}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
