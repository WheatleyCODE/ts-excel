export enum ActionsType {
  INIT = '__INIT__',
  TABLE_RESIZE = 'TABLE_RESIZE'
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

interface IActionInitial {
  type: ActionsType.INIT;
  payload: null;
}

export type Actions = IActionInitial | IActionResizeTable;

interface IResizeState {
  col: { [propName: string]: number };
  row: { [propName: string]: number };
}

export interface IState {
  resizeState: IResizeState;
}

export interface IUnsubscribe {
  unsubscribe: () => void;
}

export interface IStore {
  subscribe: (callback: () => void) => IUnsubscribe;
  dispatch: (action: Actions) => void;
  getState: () => IState;
}

export type Reducer = (state: IState, action: Actions) => IState;
