import { WAxios } from './WAxios';

export class WAxiosBuilder {
  waxios: WAxios;

  constructor() {
    this.waxios = new WAxios();
  }

  addBaseUrl(url: string): this {
    this.waxios.baseUrl = url;
    return this;
  }

  addLocate(url: string): this {
    this.waxios.locate = url;
    return this;
  }

  build(): WAxios {
    return this.waxios;
  }
}
