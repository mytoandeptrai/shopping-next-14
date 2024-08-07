export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload extends ILoginPayload {
  confirmPassword: string;
}

export interface ILoginResponse {
  code: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    name: string;
    role: string;
    root: boolean;
  };
}

export interface IRegisterResponse extends Omit<ILoginResponse, 'data'> {
  data: {
    token: string;
    user: {
      email: string;
      name: string;
      role: string;
      root: boolean;
    };
  };
}

export interface IRenewTokenResponse {
  code: string;
  message: string;
  data: {
    newAccessToken: string;
    newRefreshToken: string;
  };
}
