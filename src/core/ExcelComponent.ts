import { DomListener } from './DomListener';

export abstract class ExcelComponent extends DomListener {
  constructor($el: Element) {
    super($el);
  }

  abstract toHTML(): string;
}
