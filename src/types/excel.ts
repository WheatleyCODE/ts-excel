import { ExcelComponent } from '@components/Excel/ExcelComponent';
import { Emitter, Parser, WReduxSubscriber } from '@core';
import { WRedux } from '@redux';
import { WQuery } from '@wquery';
import { StateKeys } from './redux';

export class IExcelComponent extends ExcelComponent {
  static classNames = ['', ''];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'IComponent',
      listeners: [],
      subscribe: [],
      ...options
    });
  }

  toHTML() {
    return '';
  }
}

export interface IExcelComOptions {
  emitter: Emitter;
  wredux: WRedux;
  parser: Parser;
}
export interface IExcelOptions extends IExcelComOptions {
  name: string;
  listeners: string[];
  subscribe?: StateKeys[];
}

export interface IExcOptions {
  components: typeof IExcelComponent[];
  wredux: WRedux;
  emitter: Emitter;
  wreduxSubscriber: WReduxSubscriber;
}
