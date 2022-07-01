import { Page } from '@core/router/Page';
import { WQuery } from '@wquery';

export class IPage extends Page {
  getRoot(): WQuery | string {
    return '';
  }

  initPage(): void {}
  destroyPage(): void {}
}

export interface IRoutes {
  path: string;
  Page: typeof IPage;
}
