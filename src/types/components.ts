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
