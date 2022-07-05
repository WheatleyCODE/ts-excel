import { IUser, IWAxiosResponse } from '@types';
import { $api } from '@http';

export class UserService {
  static fetchAllUsers(): Promise<IWAxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static fetchUser(id: number): Promise<IWAxiosResponse<IUser>> {
    return $api.get<IUser>(`/users/${id}`);
  }
}
