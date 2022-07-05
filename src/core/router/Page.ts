import { IAppOtions } from '@types';
import { WQuery } from '@wquery';

export abstract class Page {
  constructor(public options: IAppOtions) {}

  abstract getRoot(): WQuery | string;

  abstract initPage(): void;

  abstract destroyPage(): void;
}
