import Link from 'next/link';
import { forwardRef } from 'react';

type Props = Parameters<typeof Link>['0'];

type CustomLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props> & Props;

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ prefetch, ...props }, ref) => {
  return <Link {...props} passHref ref={ref} prefetch={prefetch || false} />;
});

CustomLink.displayName = 'CustomLink';
