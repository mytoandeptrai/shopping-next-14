import { env } from '@/config';
import { JWTPayload } from '@/types/jwt.type';
import JWT from 'jsonwebtoken';

const signRefreshToken = (payload: JWTPayload) => {
  try {
    const secret = env.REFRESH_TOKEN_SECRET;

    const options = {
      expiresIn: env.REFRESH_TOKEN_EXPIRED,
    };

    return JWT.sign(payload, secret, options);
  } catch (error) {
    console.error(`Error while signing refresh token: ${error}`);
    return undefined;
  }
};

export { signRefreshToken };
