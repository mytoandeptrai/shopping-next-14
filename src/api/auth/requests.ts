import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
  IRenewTokenResponse,
} from '@/api/auth/types';
import { clientInstance } from '@/api/client-instance';

export const reNewTokenRequest = async (refreshToken: string): Promise<IRenewTokenResponse> => {
  const json = {
    refreshToken,
  };
  const response: IRenewTokenResponse = await clientInstance
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

export const registerRequest = async (json: IRegisterPayload): Promise<IRegisterResponse> => {
  const response: IRegisterResponse = await clientInstance
    .post('api/auth/register', {
      json,
    })
    .json();

  return response;
};
