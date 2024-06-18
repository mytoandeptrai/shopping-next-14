import { env } from '@/config';
import { JWTPayload } from '@/types/jwt.type';
import JWT from 'jsonwebtoken';

const signAccessToken = (payload: JWTPayload) => {
  try {
    const secret = env.ACCESS_TOKEN_SECRET;

    const options = {
      expiresIn: env.ACCESS_TOKEN_EXPIRED,
    };

    return JWT.sign(payload, secret, options);
  } catch (error) {
    console.error(`Error while signing access token: ${error}`);
    return undefined;
  }
};

export { signAccessToken };
