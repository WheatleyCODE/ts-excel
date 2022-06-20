import { WQuery } from '@wquery';
import { IComOptions } from '@types';
import { DomListener } from './DomListener';

export abstract class ExcelComponent extends DomListener {
  constructor($el: WQuery, options: IComOptions = { name: 'ExcelComponent', listeners: [] }) {
    super($el, options);
  }

  abstract toHTML(): string;

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
