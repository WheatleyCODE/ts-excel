import { ExcelComponent } from '@core';
export class IComponent extends ExcelComponent {
  static classNames = ['', ''];

  toHTML() {
    return '';
  }
}

export enum ResizeType {
  COL = 'col',
  ROW = 'row'
}

export interface IComOptions {
  name: string;
  listeners: string[];
}

export interface IWQueryListeners {
  [name: string]: () => void;
}

export interface IOptions {
  components: typeof IComponent[];
}
