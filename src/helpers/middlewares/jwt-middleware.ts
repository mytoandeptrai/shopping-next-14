import { verifyAccessToken, verifyRefreshToken } from '@/helpers/jwt';
import { JWTPayload } from '@/types/jwt.type';
import { NextRequest } from 'next/server';

interface IJwtMiddleware {
  req: NextRequest;
  isJwt: boolean;
}
const jwtAccessTokenMiddleware = async (payload: IJwtMiddleware) => {
  const { isJwt, req } = payload;
  try {
    const token = req.headers.get('authorization');
    const decoded = (await verifyAccessToken(token ?? '')) as JWTPayload;
    req.headers.set('userId', String(decoded._id));
  } catch (error) {
    if (isJwt) {
      throw error;
    }
  }
};

const jwtRefreshTokenMiddleware = (payload: IJwtMiddleware) => {
  const { isJwt, req } = payload;
  try {
    const token = req.headers.get('authorization');
    const decoded = verifyRefreshToken(token ?? '') as JWTPayload;
    req.headers.set('userId', String(decoded._id));
  } catch (error) {
    if (isJwt) {
      throw error;
    }
  }
};

export { jwtAccessTokenMiddleware, jwtRefreshTokenMiddleware };
