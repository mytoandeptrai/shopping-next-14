import { env } from '@/config';
import JWT from 'jsonwebtoken';

const verifyRefreshToken = async (token: string) => {
  try {
    const secret = env.REFRESH_TOKEN_SECRET;

    return JWT.verify(token, secret);
  } catch (error) {
    console.error(`Error while verifying refresh token: ${error}`);
    throw error;
  }
};

export { verifyRefreshToken };
