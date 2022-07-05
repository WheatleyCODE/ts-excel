import { IAuthResponse, IUser, IWAxiosResponse } from '@types';
import { $api } from '@http';

export class AuthService {
  static async login(email: string, password: string): Promise<IWAxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/login', { email, password });
  }

  static async register(email: string, password: string): Promise<IWAxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/registration', { email, password });
  }

  static async logout(userId: string): Promise<IWAxiosResponse<IUser>> {
    return $api.post<IUser>('/auth/logout', { userId });
  }
}
