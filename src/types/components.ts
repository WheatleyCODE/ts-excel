import { ExcelComponent } from '@components/ExcelComponent/ExcelComponent';
import { Emitter, Parser } from '@core';
import { WRedux } from '@redux';
import { WQuery } from '@wquery';
import { StateKeys } from './redux';

export class IComponent extends ExcelComponent {
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

export enum ResizeType {
  COL = 'col',
  ROW = 'row'
}

export interface ISelectOptions {
  emit?: boolean;
  clear?: boolean;
}

export enum EventKeys {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_LEFT = 'ArrowLeft',
  ENTER = 'Enter',
  TAB = 'Tab'
}

export const celectKeys = [
  EventKeys.ARROW_UP,
  EventKeys.ARROW_DOWN,
  EventKeys.ARROW_LEFT,
  EventKeys.ARROW_RIGHT,
  EventKeys.ENTER,
  EventKeys.TAB
] as string[];

export interface ICellId {
  row: number;
  col: number;
}

export interface IWithWidthFromOptions {
  letter: string;
  index: number;
  width: number;
}
export interface IExcelComOptions {
  emitter: Emitter;
  wredux: WRedux;
  parser: Parser;
}
export interface IComOptions extends IExcelComOptions {
  name: string;
  listeners: string[];
  subscribe?: StateKeys[];
}

export interface IWQueryListeners {
  [name: string]: () => void;
}

export interface IOptions {
  components: typeof IComponent[];
  wredux: WRedux;
}
