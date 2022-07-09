import { IWAxiosCreateOptions, WAxiosCreateOptionKeys, IWAxiosResponse } from '@types';
import { wutils } from '@utils';
import { WAxiosBuilder } from './WAxiosBuilder';

export class WAxios {
  private _baseUrl: string | null = null;
  private _locate: string | null = null;

  create(options: IWAxiosCreateOptions): WAxios {
    const axiosBuilder = new WAxiosBuilder();
    const optionKeys = Object.keys(options) as WAxiosCreateOptionKeys[];

    optionKeys.forEach((key) => {
      const methodName = wutils.createWAxiosBuilderMethodName(key);
      axiosBuilder[methodName](options[key]);
    });

    const newAxios = axiosBuilder.build();
    return newAxios;
  }

  get baseUrl(): null | string {
    return this._baseUrl;
  }

  set baseUrl(str: string | null) {
    this._baseUrl = str;
  }

  get locate(): null | string {
    return this._locate;
  }

  set locate(str: string | null) {
    this._locate = str;
  }

  private getUrl(url: string) {
    if (url === '/' && this._baseUrl) return this._baseUrl;

    return this._baseUrl ? this._baseUrl + url : url;
  }

  get<T>(url: string): Promise<IWAxiosResponse<T>> {
    return fetch(this.getUrl(url)) as Promise<IWAxiosResponse<T>>;
  }

  post<T>(url: string, data: object | any[]): Promise<IWAxiosResponse<T>> {
    return fetch(this.getUrl(url), {
      method: 'POST',
      body: JSON.stringify(data)
    }) as Promise<IWAxiosResponse<T>>;
  }
}

export const waxios = new WAxios();
