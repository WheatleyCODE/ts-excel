import { Emitter, ExcelComponent } from '@core';
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

export interface IButton {
  icon: string;
  isWall: boolean;
  active: boolean;
  modal?: boolean;
  value: IStyle | false;
}

export interface IToolbarState {
  justifyContent: string;
  alignItems: string;
  fontWeight: string;
  textDecoration: string;
  fontStyle: string;
  border: string;
  color: string;
  openColorModal: boolean;
  backgroundColor: string;
  openBackgroundColorModal: boolean;
  dataType: 'ruble' | 'percent' | 'default';
  countZeros: number;
}

export type ToolbarStyles =
  | 'justifyContent'
  | 'alignItems'
  | 'fontWeight'
  | 'textDecoration'
  | 'fontStyle'
  | 'border'
  | 'color'
  | 'backgroundColor'
  | 'dataType';

export const toolbartStyles: ToolbarStyles[] = [
  'justifyContent',
  'alignItems',
  'fontWeight',
  'textDecoration',
  'fontStyle',
  'border',
  'color',
  'backgroundColor',
  'dataType'
];

export interface IStyle {
  [propName: string]: string | boolean;
}

export const initialToolbarState: IToolbarState = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'string',
  border: 'string',
  color: 'string',
  backgroundColor: 'string',
  openColorModal: false,
  openBackgroundColorModal: false,
  dataType: 'default',
  countZeros: 2
};
