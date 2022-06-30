import { IToolbarState } from './Toolbar';

export enum ActionsType {
  INIT = '__INIT__',
  TABLE_RESIZE = 'TABLE_RESIZE',
  CHANGE_TEXT = 'CHANGE_TEXT',
  CHANGE_TITLE = 'CHANGE_TITLE',
  CHANGE_STYLE = 'CHANGE_STYLE',
  STYLES_CURRENT_CELL = 'STYLES_CURRENT_CELL',
  CHANGE_PARSER_DATA = 'CHANGE_PARSER_DATA'
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

export interface IParserData {
  formula: string;
  result: string;
}

interface IActionChangeParserData {
  type: ActionsType.CHANGE_PARSER_DATA;
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
  | IActionChangeParserData;

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
  parserData: { [key: string]: IParserData };
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
