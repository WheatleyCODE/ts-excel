export enum ActionsType {
  INIT = '__INIT__',
  TABLE_RESIZE = 'TABLE_RESIZE',
  CHANGE_TEXT = 'CHANGE_TEXT'
}

export interface IResizeTableACOptions {
  type: 'col' | 'row';
  id: string;
  value: number;
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

export type Actions = IActionInitial | IActionResizeTable | IActionChangeText;

interface IResizeState {
  col: { [propName: string]: number };
  row: { [propName: string]: number };
}

interface ICellsDataState {
  [propName: string]: string;
}

export interface IState {
  resizeState: IResizeState;
  cellsDataState: ICellsDataState;
  currentText: string;
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
