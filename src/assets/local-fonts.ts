import localFont from 'next/font/local';

export const LatoFont = localFont({
  src: [
    {
      path: '../../public/fonts/Lato-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lato-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Lato-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lato-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-lato',
});
