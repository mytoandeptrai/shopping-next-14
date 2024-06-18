export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  APP_URL: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  MONGO_URL: process.env.NEXT_PUBLIC_MONGODB_URL ?? '',
  ACCESS_TOKEN_SECRET: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET ?? '',
  ACCESS_TOKEN_EXPIRED: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRED ?? '1h',
  REFRESH_TOKEN_SECRET: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET ?? '',
  REFRESH_TOKEN_EXPIRED: process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRED ?? '45h',
};

export const isServer = typeof window === 'undefined';
