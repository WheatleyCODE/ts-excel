import { IToolbarState } from './Toolbar';

export enum ActionsType {
  INIT = '__INIT__',
  TABLE_RESIZE = 'TABLE_RESIZE',
  CHANGE_TEXT = 'CHANGE_TEXT',
  CHANGE_TITLE = 'CHANGE_TITLE',
  CHANGE_STYLE = 'CHANGE_STYLE',
  STYLES_CURRENT_CELL = 'STYLES_CURRENT_CELL',
  CHANGE_PARSER_DATA = 'CHANGE_PARSER_DATA',
  CHANGE_OPEN_DATE = 'CHANGE_OPEN_DATE',
  CREATE_TABLE = 'CREATE_TABLE',
  CREATE_TABLE_PRESET = 'CREATE_TABLE_PRESET',
  SET_CURRENT_EXCEL_STATE = 'SET_CURRENT_EXCEL_STATE',
  SAVE_CURRENT_EXCEL_STATE = 'SAVE_CURRENT_EXCEL_STATE',
  REMOVE_CURRENT_EXCEL_STATE = 'REMOVE_CURRENT_EXCEL_STATE'
}

export interface IResizeTableOptions {
  type: 'col' | 'row';
  id: string;
  value: number;
}

interface IActionRemoveCurrentExcelState {
  type: ActionsType.REMOVE_CURRENT_EXCEL_STATE;
  payload: number;
}
interface IActionSaveCurrentExcelState {
  type: ActionsType.SAVE_CURRENT_EXCEL_STATE;
  payload: IExcelState;
}
interface IActionSetCurrentExcelState {
  type: ActionsType.SET_CURRENT_EXCEL_STATE;
  payload: IExcelState;
}

interface IActionCreateTable {
  type: ActionsType.CREATE_TABLE;
  payload: number;
}

interface IActionCreateTablePreset {
  type: ActionsType.CREATE_TABLE_PRESET;
  payload: {
    id: number;
    excel: IExcelState;
  };
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

interface IActionChangeOpenDate {
  type: ActionsType.CHANGE_OPEN_DATE;
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
  payload: IResizeTableOptions;
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
  | IActionChangeParserData
  | IActionChangeOpenDate
  | IActionCreateTable
  | IActionSetCurrentExcelState
  | IActionSaveCurrentExcelState
  | IActionCreateTablePreset
  | IActionRemoveCurrentExcelState;

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

export interface IExcelState {
  id: number;
  resizeState: IResizeState;
  cellsDataState: ICellsDataState;
  cellsStylesState: ICellStylesState;
  currentText: string;
  currentCellStyles: IToolbarState;
  title: string;
  parserData: { [key: string]: IParserData };
  openDate: string;
}
export interface IDashboardState {
  current: number;
  excels: IExcelState[];
}

export interface ICombinedState {
  excelState: IExcelState;
  dashboardState: IDashboardState;
}

export type ExcelStateKeys = keyof IExcelState;
export type CombinedStateKeys = keyof ICombinedState;
export type ExcelStateValues = IExcelState[ExcelStateKeys];

export interface IUnsubscribe {
  unsubscribe: () => void;
  unsubscribeAll: () => void;
}

export interface IStore {
  subscribe: (callback: () => void) => IUnsubscribe;
  dispatch: (action: Actions) => void;
  getState: () => ICombinedState;
}

export type combinedReducer = (state: ICombinedState, action: Actions) => ICombinedState;

export interface IFacadeWredux {
  dispatch: (actions: Actions) => void;
  getState: () => ICombinedState;
}
