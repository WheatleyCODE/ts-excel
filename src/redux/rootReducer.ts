import { Actions, IState } from '@types';

export function rootReducer(state: IState, action: Actions): IState {
  return { ...state };
}
