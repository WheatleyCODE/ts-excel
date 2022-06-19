import { WQuery } from '@wquery';
import { DomListener } from './DomListener';

export abstract class ExcelComponent extends DomListener {
  constructor($el: WQuery) {
    super($el);
  }

  abstract toHTML(): string;
}
