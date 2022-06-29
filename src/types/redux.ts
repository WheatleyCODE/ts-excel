import { IToolbarState } from './Toolbar';

export enum ActionsType {
  INIT = '__INIT__',
  TABLE_RESIZE = 'TABLE_RESIZE',
  CHANGE_TEXT = 'CHANGE_TEXT',
  CHANGE_TITLE = 'CHANGE_TITLE',
  CHANGE_STYLE = 'CHANGE_STYLE',
  STYLES_CURRENT_CELL = 'STYLES_CURRENT_CELL',
  CHANGE_PARCER_DATA = 'CHANGE_PARCER_DATA'
}

export interface IResizeTableACOptions {
  type: 'col' | 'row';
  id: string;
  value: number;
}

interface IActionChangeTitle {
  type: ActionsType.CHANGE_TITLE;
  payload: string;
}

export interface IParcerData {
  formula: string;
  result: string;
}

interface IActionChangeParcerData {
  type: ActionsType.CHANGE_PARCER_DATA;
  payload: { id: string; formula: string; result: string };
}

interface IActionChangeStyle {
  type: ActionsType.CHANGE_STYLE;
  payload: {
    id: string;
    style: { [key: string]: string };
  };
}

interface IActionStylesCurrentCell {
  type: ActionsType.STYLES_CURRENT_CELL;
  payload: {
    styles: { [key: string]: string };
  };
}

interface IActionResizeTable {
  type: ActionsType.TABLE_RESIZE;
  payload: IResizeTableACOptions;
}

interface IActionChangeText {
  type: ActionsType.CHANGE_TEXT;
  payload: {
    id: string;
    string: string;
  };
}

interface IActionInitial {
  type: ActionsType.INIT;
  payload: null;
}

export type Actions =
  | IActionInitial
  | IActionResizeTable
  | IActionChangeText
  | IActionChangeStyle
  | IActionStylesCurrentCell
  | IActionChangeTitle
  | IActionChangeParcerData;

interface IResizeState {
  col: { [propName: string]: number };
  row: { [propName: string]: number };
}

interface ICellsDataState {
  [propName: string]: string;
}

interface ICellStylesState {
  [propName: string]: { [propName: string]: string };
}

export interface IState {
  resizeState: IResizeState;
  cellsDataState: ICellsDataState;
  cellsStylesState: ICellStylesState;
  currentText: string;
  currentCellStyles: IToolbarState;
  title: string;
  parcerData: { [key: string]: IParcerData };
}

export type StateKeys = keyof IState;
export type StateValues = IState[StateKeys];

export interface IUnsubscribe {
  unsubscribe: () => void;
  unsubscribeAll: () => void;
}

export interface IStore {
  subscribe: (callback: () => void) => IUnsubscribe;
  dispatch: (action: Actions) => void;
  getState: () => IState;
}

export type Reducer = (state: IState, action: Actions) => IState;

export interface IFacadeWredux {
  dispatch: (actions: Actions) => void;
  getState: () => IState;
}
