import { IWAxiosResponse, IExcelState } from '@types';
import { $api } from '@http';

export class UserService {
  static fetchAllExcels(id: string): Promise<IWAxiosResponse<IExcelState[]>> {
    return $api.get<IExcelState[]>(`/excels/${id}`);
  }

  static fetchExcel(id: number): Promise<IWAxiosResponse<IExcelState>> {
    return $api.get<IExcelState>(`/excel/${id}`);
  }
}
