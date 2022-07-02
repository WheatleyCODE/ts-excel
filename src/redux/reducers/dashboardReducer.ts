import { Actions, ActionsType, IState } from '@types';

export function dashboardReducer(state: IState, action: Actions): IState {
  const prevState: IState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionsType.INIT: {
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
}
