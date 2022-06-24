interface IColState {
  [x: string]: number;
}

export enum ActionsType {
  INIT = '__INIT__'
}

interface IActionInitial {
  type: ActionsType.INIT;
}

export type Actions = IActionInitial;

export interface IUnsubscribe {
  unsubscribe: () => void;
}

export interface IState {
  colState: IColState;
}

export interface IStore {
  subscribe: (callback: () => void) => IUnsubscribe;
  dispatch: (action: Actions) => void;
  getState: () => IState;
}

export type Reducer = (state: IState, action: Actions) => IState;
