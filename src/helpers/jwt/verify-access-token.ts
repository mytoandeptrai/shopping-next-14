import { env } from '@/config';
import JWT from 'jsonwebtoken';

const verifyAccessToken = async (token: string) => {
  try {
    const secret = env.ACCESS_TOKEN_SECRET;

    return JWT.verify(token, secret);
  } catch (error) {
    console.error(`Error while verifying access token: ${error}`);
    throw error;
  }
};

export { verifyAccessToken };
