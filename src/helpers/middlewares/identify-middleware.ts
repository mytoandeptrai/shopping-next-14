import { userRepository } from '@/models/repository';
import { IUser } from '@/models/type';
import { NextRequest } from 'next/server';

const identifyRolesMiddleware = (identifyVal: string, user: IUser | null) => {
  if (!user) return 'Not user authorized';

  if (identifyVal === 'admin' && user.role !== 'admin') {
    return 'No permission to operate';
  }

  if (identifyVal === 'root' && !user.root) {
    return 'No permission to operate, only super administrators can operate';
  }

  return undefined;
};

const identifyMiddleware = async (request: NextRequest, identifyVal = 'user', isJWT = false) => {
  if (identifyVal === 'user' && !isJWT) return;

  try {
    const userId = request.headers.get('userId');
    const user = await userRepository.getOne({ _id: userId ?? '' });
    const authorized = identifyRolesMiddleware(identifyVal, user);
    if (authorized) {
      throw new Error(authorized);
    }
  } catch (error) {
    throw new Error('Internal server error');
  }
};

export { identifyMiddleware };
