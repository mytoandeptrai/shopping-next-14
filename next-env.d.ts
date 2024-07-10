// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/types/global" />

import 'next/server';

declare module 'next/server' {
  interface NextRequest {
    userId?: string;
  }
}
