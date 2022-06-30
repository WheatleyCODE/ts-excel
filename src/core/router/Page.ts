import { WQuery } from '@wquery';

export abstract class Page {
  constructor(public param: string) {}

  abstract getRoot(): WQuery | string;

  abstract initPage(): void;

  abstract destroyPage(): void;
}
