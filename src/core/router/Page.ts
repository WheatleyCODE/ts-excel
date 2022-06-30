import { WQuery } from '@wquery';

export abstract class Page {
  constructor(private params: string[]) {}

  abstract getRoot(): WQuery | string;

  abstract initPage(): void;

  abstract destroyPage(): void;
}
