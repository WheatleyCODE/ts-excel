import { Actions, ActionsType, IState } from '@types';

export function rootReducer(state: IState, action: Actions): IState {
  switch (action.type) {
    case ActionsType.INIT: {
      return { ...state };
    }

    case ActionsType.TABLE_RESIZE: {
      const { type, id, value } = action.payload;

      return {
        ...state,
        resizeState: {
          col: { ...state.resizeState.col },
          row: { ...state.resizeState.row },

          [type]: {
            ...state.resizeState[type],
            [id]: value
          }
        }
      };
    }

    default: {
      return { ...state };
    }
  }
}
