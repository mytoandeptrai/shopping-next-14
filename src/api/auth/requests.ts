import { ILoginPayload, ILoginResponse, IRegisterPayload } from '@/api/auth/types';
import { clientInstance } from '@/api/client-instance';

export const reNewTokenRequest = async (refreshToken: string) => {
  const json = {
    refreshToken,
  };
  const response = await clientInstance
    .post('api/auth/renew-token', {
      json,
    })
    .json();

  return response;
};

export const loginRequest = async (json: ILoginPayload): Promise<ILoginResponse> => {
  const response: ILoginResponse = await clientInstance.post('api/auth/login', { json }).json();

  return response;
};

export const registerRequest = async (json: IRegisterPayload) => {
  const response = await clientInstance
    .post('api/auth/register', {
      json,
    })
    .json();

  return response;
};
