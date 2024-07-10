import { env } from '@/config';
import { verifyAccessToken, verifyRefreshToken } from '@/helpers/jwt';
import { JWTPayload } from '@/types/jwt.type';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

interface IJwtMiddleware {
  req: NextRequest;
  isJwt: boolean;
}
const jwtAccessTokenMiddleware = async (payload: IJwtMiddleware) => {
  const { isJwt, req } = payload;
  try {
    const cookieStore = cookies();
    const exitedTokenInCookie = cookieStore.get(env.COOKIE_NAME_TOKEN)?.value;
    const bearerToken = req.headers.get('authorization')?.split(' ');
    const token = exitedTokenInCookie ?? bearerToken?.[1] ?? '';
    const decoded = (await verifyAccessToken(token)) as JWTPayload;
    req.userId = String(decoded._id);
  } catch (error) {
    if (isJwt) {
      throw error;
    }
  }
};

const jwtRefreshTokenMiddleware = async (payload: IJwtMiddleware) => {
  const { isJwt, req } = payload;
  try {
    const token = req.headers.get('authorization');
    const decoded = (await verifyRefreshToken(token ?? '')) as JWTPayload;
    req.headers.set('userId', String(decoded._id));
  } catch (error) {
    if (isJwt) {
      throw error;
    }
  }
};

export { jwtAccessTokenMiddleware, jwtRefreshTokenMiddleware };
