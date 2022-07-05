import { Actions, ActionsType, IDashboardState } from '@types';

export function dashboardReducer(state: IDashboardState, action: Actions): IDashboardState {
  const prevState: IDashboardState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionsType.INIT: {
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
}
