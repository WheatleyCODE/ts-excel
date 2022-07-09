export interface IWAxiosCreateOptions {
  baseUrl?: string;
  locate?: 'client' | 'server';
}

export interface IWAxiosResponse<T = any> extends Response {
  json: () => Promise<T>;
}

export type WAxiosCreateOptionKeys = keyof IWAxiosCreateOptions;

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
