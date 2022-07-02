export interface ISelectOptions {
  emit?: boolean;
  clear?: boolean;
}

export enum ResizeType {
  COL = 'col',
  ROW = 'row'
}
export interface ICellId {
  row: number;
  col: number;
}

export interface IWithWidthFromOptions {
  letter: string;
  index: number;
  width: number;
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
