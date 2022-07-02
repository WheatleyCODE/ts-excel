import { IAppOtions } from '@types';
import { WQuery } from '@wquery';

export abstract class Page {
  constructor(public param: string, public options: IAppOtions) {}

  abstract getRoot(): WQuery | string;

  abstract initPage(): void;

  abstract destroyPage(): void;
}
