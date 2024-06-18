import { Inter as FontInter, Poppins as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const fontInter = FontInter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const fontSerif = fontSans;
